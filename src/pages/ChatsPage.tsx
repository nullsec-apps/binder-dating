import { useState, useEffect } from 'react';
import { ChatList } from '@/components/ChatList';
import { ChatWindow } from '@/components/ChatWindow';
import { useSearchParams } from 'react-router-dom';

export function ChatsPage() {
  const [params] = useSearchParams();
  const [activeId, setActiveId] = useState<string | undefined>(params.get('match') || undefined);

  useEffect(() => {
    const m = params.get('match');
    if (m) setActiveId(m);
  }, [params]);

  return (
    <div className="flex h-full">
      <div className={`w-full border-r border-white/10 sm:w-80 ${activeId ? 'hidden sm:block' : ''}`}>
        <ChatList activeId={activeId} onSelect={setActiveId} />
      </div>
      <div className={`flex-1 ${activeId ? 'block' : 'hidden sm:block'}`}>
        <ChatWindow matchId={activeId} />
      </div>
    </div>
  );
}
