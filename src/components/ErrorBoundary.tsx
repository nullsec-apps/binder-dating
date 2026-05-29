import React from 'react';
import { Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface State { hasError: boolean; }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(e: any) { console.error('Binder error:', e); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-[#0A0B0F] p-6 text-center">
          <Flame size={40} className="text-[#0052FF]" strokeWidth={1.5} />
          <h1 className="font-display text-2xl font-bold text-white">Something went sideways</h1>
          <p className="max-w-sm text-sm text-white/50">A block got reorged. Reload to find your next match.</p>
          <Button onClick={() => window.location.reload()}>Reload Binder</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
