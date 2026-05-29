import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import { useBinder } from '@/store/binderStore';
import { cn } from '@/lib/utils';
import { relativeTime } from '@/lib/format';
import { useState } from 'react';

export function ChatList({ activeId, onSelect }: { activeId?: string; onSelect: (id: string) => void }) {
  const { matches, chat } = useBinder();
  const [q, setQ] = useState('');

  const filtered = matches.matches.filter((m) => m.profile.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="flex h-full flex-col">
      <div className="relative p-3">
        <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40" strokeWidth={1.5} />
        <Input placeholder="Search chats" className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 p-8 text-center text-white/40">
            <Search size={24} strokeWidth={1.5} />
            <p className="text-sm">No conversations yet. Match to chat!</p>
          </div>
        )}
        {filtered.map((m) => {
          const conv = chat.getConversation(m.id);
          const last = conv?.messages[conv.messages.length - 1];
          return (
            <button key={m.id} onClick={() => onSelect(m.id)}
              className={cn('flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors duration-200', activeId === m.id ? 'bg-white/10' : 'hover:bg-white/5')}>
              <div className="relative">
                <Avatar className="h-12 w-12"><AvatarImage src={m.profile.photos[0]} /></Avatar>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0A0B0F] bg-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate font-medium">{m.profile.name}</p>
                  <span className="text-[10px] text-white/40">{relativeTime(m.matchedAt)}</span>
                </div>
                <p className="truncate text-xs text-white/50">{last ? last.text : 'Say gm to start'}</p>
              </div>
              {m.unread > 0 && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#0052FF]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
