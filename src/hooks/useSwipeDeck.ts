import { useState, useCallback, useMemo, useEffect } from 'react';
import type { Profile } from '../lib/types';
import { generateProfiles } from '../lib/sampleProfiles';

export function useSwipeDeck(filterFn?: (p: Profile[]) => Profile[], onMatch?: (p: Profile) => void) {
  const [pool, setPool] = useState<Profile[]>(() => generateProfiles(24));
  const [index, setIndex] = useState(0);
  const [lastAction, setLastAction] = useState<{ profile: Profile; idx: number } | null>(null);

  const filtered = useMemo(() => (filterFn ? filterFn(pool) : pool), [pool, filterFn]);
  const deck = useMemo(() => filtered.slice(index, index + 3), [filtered, index]);
  const current = deck[0] || null;

  useEffect(() => {
    if (index >= filtered.length - 2 && filtered.length > 0) {
      setPool((prev) => [...prev, ...generateProfiles(12)]);
    }
  }, [index, filtered.length]);

  const advance = useCallback((p: Profile) => {
    setLastAction({ profile: p, idx: index });
    setIndex((i) => i + 1);
  }, [index]);

  const like = useCallback((p: Profile) => {
    advance(p);
    if (Math.random() < 0.45) onMatch?.(p);
  }, [advance, onMatch]);

  const pass = useCallback((p: Profile) => advance(p), [advance]);

  const superlike = useCallback((p: Profile) => {
    advance(p);
    if (Math.random() < 0.75) onMatch?.(p);
  }, [advance, onMatch]);

  const rewind = useCallback(() => {
    if (lastAction && index > 0) {
      setIndex(lastAction.idx);
      setLastAction(null);
    }
  }, [lastAction, index]);

  const refill = useCallback(() => setPool((prev) => [...prev, ...generateProfiles(12)]), []);

  return { deck, current, like, pass, superlike, rewind, refill, remaining: filtered.length - index };
}
