import { useState, useEffect, useCallback } from 'react';
import type { LocalProfile } from '../lib/types';

const KEY = 'binder_profile';

const DEFAULT: LocalProfile = {
  name: 'Alex',
  age: 28,
  bio: 'Onchain builder, coffee snob, weekend climber. Looking for someone to mint memories with.',
  basename: 'you.base.eth',
  photos: ['https://i.pravatar.cc/600?img=12', 'https://i.pravatar.cc/600?img=33'],
  interests: ['DeFi', 'NFTs', 'Climbing', 'Coffee'],
  prompts: [
    { q: 'My ideal first date is', a: 'Coffee then a walk debating L2 roadmaps.' },
    { q: 'A green flag I look for', a: 'You actually read the whitepaper.' },
  ],
  onboarded: false,
};

function load(): LocalProfile {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
  } catch { return DEFAULT; }
}

export function useLocalProfile() {
  const [profile, setProfile] = useState<LocalProfile>(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(profile)); } catch {}
  }, [profile]);

  const updateProfile = useCallback((p: Partial<LocalProfile>) => {
    setProfile((prev) => ({ ...prev, ...p }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setProfile((prev) => ({ ...prev, onboarded: true }));
  }, []);

  return { profile, updateProfile, completeOnboarding };
}
