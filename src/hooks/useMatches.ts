import { useState, useCallback, useEffect } from 'react';
import type { Match, Profile } from '../lib/types';

const KEY = 'binder_matches';

function load(): Match[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(matches)); } catch {}
  }, [matches]);

  const addMatch = useCallback((p: Profile) => {
    setMatches((prev) => {
      if (prev.some((m) => m.profile.id === p.id)) return prev;
      const shared = p.interests.slice(0, 2);
      return [{
        id: `m-${p.id}`,
        profile: p,
        matchedAt: Date.now(),
        sharedInterests: shared,
        unread: 1,
      }, ...prev];
    });
  }, []);

  const markRead = useCallback((id: string) => {
    setMatches((prev) => prev.map((m) => (m.id === id ? { ...m, unread: 0 } : m)));
  }, []);

  const incUnread = useCallback((id: string) => {
    setMatches((prev) => prev.map((m) => (m.id === id ? { ...m, unread: m.unread + 1 } : m)));
  }, []);

  return { matches, addMatch, markRead, incUnread };
}
