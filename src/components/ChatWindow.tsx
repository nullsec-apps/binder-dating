import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Send, Coins, MessageCircle } from 'lucide-react';
import { useBinder } from '@/store/binderStore';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export function ChatWindow({ matchId }: { matchId?: string }) {
  const { matches, chat } = useBinder();
  const [text, setText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const match = matches.matches.find((m) => m.id === matchId);

  useEffect(() => { if (matchId) chat.ensureConversation(matchId); }, [matchId, chat]);
  const conv = matchId ? chat.getConversation(matchId) : undefined;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [conv?.messages.length, chat.typing]);

  if (!matchId || !match) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-white/40">
        <MessageCircle size={32} strokeWidth={1.5} />
        <p className="text-sm">Select a conversation</p>
      </div>
    );
  }

  const send = () => { if (text.trim()) { chat.sendMessage(matchId, text); setText(''); } };
  const tip = () => toast.success(`Sent 0.005 ETH tip to ${match.profile.name} on Base ⚡`);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-white/10 p-3">
        <Avatar className="h-10 w-10"><AvatarImage src={match.profile.photos[0]} /></Avatar>
        <div>
          <p className="font-medium leading-none">{match.profile.name}</p>
          <p className="text-xs text-emerald-400">online · {match.profile.basename}</p>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto p-4">
        {conv?.messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={cn('flex', msg.fromMe ? 'justify-end' : 'justify-start')}>
            <div className={cn('max-w-[75%] rounded-2xl px-3.5 py-2 text-sm', msg.fromMe ? 'bg-[#0052FF] text-white' : 'bg-white/10 text-white')}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {chat.typing && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-2xl bg-white/10 px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50" style={{ animationDelay: '0ms' }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50" style={{ animationDelay: '150ms' }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-white/10 p-3">
        <Button size="icon" variant="ghost" className="transition-colors duration-200 hover:text-amber-300" onClick={tip} title="Send onchain tip"><Coins size={20} strokeWidth={1.5} /></Button>
        <Input placeholder="Say gm..." className="flex-1" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} />
        <Button size="icon" className="transition-all duration-200 hover:scale-105" onClick={send}><Send size={18} strokeWidth={2} /></Button>
      </div>
    </div>
  );
}
