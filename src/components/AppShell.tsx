import { NavLink, Outlet } from 'react-router-dom';
import { Flame, Heart, MessageCircle, User, Settings, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { WalletConnectButton } from './WalletConnectButton';
import { useState } from 'react';
import { FilterSheet } from './FilterSheet';
import { MatchModal } from './MatchModal';
import { OnboardingFlow } from './OnboardingFlow';
import { useBinder } from '@/store/binderStore';

const NAV = [
  { to: '/discover', label: 'Discover', icon: Flame },
  { to: '/matches', label: 'Matches', icon: Heart },
  { to: '/chats', label: 'Chats', icon: MessageCircle },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function AppShell() {
  const [filterOpen, setFilterOpen] = useState(false);
  const { localProfile, matches } = useBinder();
  const logoUrl = (window as any).__NULLSEC__?.logoUrl;
  const totalUnread = matches.matches.reduce((a, m) => a + m.unread, 0);

  return (
    <div className="flex h-screen w-full overflow-hidden overflow-x-hidden bg-[#0A0B0F]">
      <aside className="hidden w-20 shrink-0 flex-col items-center border-r border-white/10 py-6 md:flex">
        <div className="mb-8">
          {logoUrl ? (
            <img src={logoUrl} className="h-8 w-8" style={{ filter: 'brightness(0) invert(1)' }} alt="Binder" />
          ) : (
            <Flame size={28} className="text-[#0052FF]" strokeWidth={2} />
          )}
        </div>
        <nav className="flex flex-1 flex-col items-center gap-2">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} title={label}
              className={({ isActive }) => cn('relative flex h-12 w-12 flex-col items-center justify-center rounded-xl transition-all duration-200', isActive ? 'bg-[#0052FF] text-white' : 'text-white/50 hover:scale-105 hover:bg-white/5 hover:text-white')}>
              <Icon size={22} strokeWidth={1.75} />
              {to === '/chats' && totalUnread > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold tracking-tight">Binder</span>
            <span className="hidden text-xs text-white/40 sm:inline">onchain dating for Base</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="transition-colors duration-200" onClick={() => setFilterOpen(true)}><SlidersHorizontal size={20} strokeWidth={1.5} /></Button>
            <WalletConnectButton />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-20 md:pb-0"><Outlet /></main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-white/10 bg-[#0A0B0F] md:hidden">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) => cn('relative flex flex-col items-center gap-0.5 text-[10px] transition-colors duration-200', isActive ? 'text-[#0052FF]' : 'text-white/50')}>
            <Icon size={22} strokeWidth={1.75} />
            {to === '/chats' && totalUnread > 0 && <span className="absolute right-1 top-0 h-2 w-2 rounded-full bg-rose-500" />}
            {label}
          </NavLink>
        ))}
      </nav>

      <FilterSheet open={filterOpen} onClose={() => setFilterOpen(false)} />
      <MatchModal />
      <OnboardingFlow open={!localProfile.profile.onboarded} onComplete={localProfile.completeOnboarding} />
    </div>
  );
}
