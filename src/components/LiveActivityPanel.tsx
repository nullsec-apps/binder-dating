import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp, Heart, Zap } from 'lucide-react';
import { useBinder } from '@/store/binderStore';
import { relativeTime } from '@/lib/format';
import { motion } from 'framer-motion';

const TRENDING = [
  { name: 'Based Punks', members: 1240, emoji: 'P' },
  { name: 'Onchain Summer', members: 980, emoji: 'O' },
  { name: 'Farcaster Frens', members: 760, emoji: 'F' },
];

const RECENT = [
  { name: 'Maya', img: 'https://i.pravatar.cc/100?img=5', ago: Date.now() - 200000 },
  { name: 'Leo', img: 'https://i.pravatar.cc/100?img=14', ago: Date.now() - 600000 },
  { name: 'Zoe', img: 'https://i.pravatar.cc/100?img=9', ago: Date.now() - 1200000 },
];

export function LiveActivityPanel() {
  const { likesToday, matches } = useBinder();
  const dailyGoal = 25;
  const pct = Math.min((likesToday / dailyGoal) * 100, 100);

  return (
    <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
      <Card className="transition-all duration-200">
        <CardHeader><CardTitle className="flex items-center gap-2"><Activity size={18} strokeWidth={1.5} /> Live Activity</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {RECENT.map((r) => (
            <div key={r.name} className="flex items-center gap-3">
              <Avatar className="h-9 w-9"><AvatarImage src={r.img} /></Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm"><span className="font-medium">{r.name}</span> matched nearby</p>
                <p className="text-xs text-white/40">{relativeTime(r.ago)}</p>
              </div>
              <Heart size={14} className="text-rose-400" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp size={18} strokeWidth={1.5} /> Trending Communities</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {TRENDING.map((t) => (
            <div key={t.name} className="flex items-center gap-3 rounded-lg p-1 transition-colors duration-200 hover:bg-white/5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0052FF]/20 font-display font-bold text-[#0052FF]">{t.emoji}</div>
              <div className="flex-1"><p className="text-sm font-medium">{t.name}</p><p className="text-xs text-white/40">{t.members.toLocaleString()} dating here</p></div>
              <Badge variant="secondary" className="text-[10px]"><Zap size={10} /> hot</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Your Stats</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-1.5 flex justify-between text-sm"><span className="text-white/60">Daily likes</span><span className="font-medium">{likesToday}/{dailyGoal}</span></div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#0052FF] transition-all duration-500" style={{ width: `${pct}%` }} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/5 p-3 text-center transition-colors duration-200 hover:bg-white/10"><p className="font-display text-2xl font-bold">{matches.matches.length}</p><p className="text-xs text-white/40">Matches</p></div>
            <div className="rounded-xl bg-white/5 p-3 text-center transition-colors duration-200 hover:bg-white/10"><p className="font-display text-2xl font-bold text-emerald-400">94%</p><p className="text-xs text-white/40">Response rate</p></div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
