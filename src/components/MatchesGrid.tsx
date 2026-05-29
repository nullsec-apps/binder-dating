import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';
import { useBinder } from '@/store/binderStore';
import { relativeTime } from '@/lib/format';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function MatchesGrid() {
  const { matches } = useBinder();
  const navigate = useNavigate();

  if (matches.matches.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 py-20 text-center text-white/40">
        <Heart size={32} strokeWidth={1.5} />
        <p className="font-display text-lg">No matches yet</p>
        <p className="text-sm">Start swiping to find your onchain match</p>
        <Button className="mt-2 transition-all duration-200 hover:scale-105" onClick={() => navigate('/discover')}>Start swiping</Button>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {matches.matches.map((m, idx) => (
        <motion.div key={m.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.04 }}>
          <Card className="group overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
            <div className="relative aspect-square">
              <img src={m.profile.photos[0]} alt={m.profile.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              {m.unread > 0 && <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#0052FF] text-[10px] font-bold">{m.unread}</span>}
              <div className="absolute bottom-2 left-3 right-3">
                <p className="font-display text-sm font-semibold">{m.profile.name}, {m.profile.age}</p>
                <p className="text-[10px] text-white/50">{relativeTime(m.matchedAt)}</p>
              </div>
            </div>
            <div className="p-3">
              <div className="mb-2 flex flex-wrap gap-1">
                {m.sharedInterests.map((s) => <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>)}
              </div>
              <Button size="sm" variant="secondary" className="w-full gap-1.5 transition-all duration-200" onClick={() => { matches.markRead(m.id); navigate('/chats?match=' + m.id); }}>
                <MessageCircle size={14} strokeWidth={1.5} /> Say gm
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
