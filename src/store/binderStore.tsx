import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Profile } from '@/lib/types';
import { useMatches } from '@/hooks/useMatches';
import { useChat } from '@/hooks/useChat';
import { useFilters } from '@/hooks/useFilters';
import { useLocalProfile } from '@/hooks/useLocalProfile';
import { useWallet } from '@/hooks/useWallet';

interface BinderCtx {
  matches: ReturnType<typeof useMatches>;
  chat: ReturnType<typeof useChat>;
  filtersHook: ReturnType<typeof useFilters>;
  localProfile: ReturnType<typeof useLocalProfile>;
  wallet: ReturnType<typeof useWallet>;
  matchModal: Profile | null;
  showMatch: (p: Profile) => void;
  closeMatch: () => void;
  likesToday: number;
  bumpLikes: () => void;
}

const Ctx = createContext<BinderCtx | null>(null);

export function BinderProvider({ children }: { children: React.ReactNode }) {
  const matches = useMatches();
  const chat = useChat();
  const filtersHook = useFilters();
  const localProfile = useLocalProfile();
  const wallet = useWallet();
  const [matchModal, setMatchModal] = useState<Profile | null>(null);
  const [likesToday, setLikesToday] = useState(7);

  const showMatch = useCallback((p: Profile) => {
    matches.addMatch(p);
    setMatchModal(p);
  }, [matches]);
  const closeMatch = useCallback(() => setMatchModal(null), []);
  const bumpLikes = useCallback(() => setLikesToday((n) => n + 1), []);

  return (
    <Ctx.Provider value={{ matches, chat, filtersHook, localProfile, wallet, matchModal, showMatch, closeMatch, likesToday, bumpLikes }}>
      {children}
    </Ctx.Provider>
  );
}

export function useBinder() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useBinder must be inside BinderProvider');
  return ctx;
}
