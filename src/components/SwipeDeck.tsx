import { Button } from '@/components/ui/button';
import { X, Heart, Star, RotateCcw, Sparkles } from 'lucide-react';
import { ProfileCard } from './ProfileCard';
import { useSwipeDeck } from '@/hooks/useSwipeDeck';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useBinder } from '@/store/binderStore';
import type { Profile } from '@/lib/types';
import toast from 'react-hot-toast';

export function SwipeDeck() {
  const { filtersHook, showMatch, bumpLikes } = useBinder();
  const { deck, like, pass, superlike, rewind } = useSwipeDeck(filtersHook.applyFilters, showMatch);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const [dragX, setDragX] = useState(0);

  const top = deck[0];

  const fling = useCallback((dir: 'left' | 'right' | 'up', cb: () => void) => {
    const target = dir === 'left' ? -400 : dir === 'right' ? 400 : 0;
    animate(x, target, { duration: 0.3, onComplete: () => { x.set(0); setDragX(0); cb(); } });
  }, [x]);

  const handleLike = useCallback((p: Profile) => { bumpLikes(); fling('right', () => like(p)); }, [fling, like, bumpLikes]);
  const handlePass = useCallback((p: Profile) => fling('left', () => pass(p)), [fling, pass]);
  const handleSuper = useCallback((p: Profile) => { toast('⭐ Superliked!', { icon: '⭐' }); fling('up', () => superlike(p)); }, [fling, superlike]);

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      <div className="relative aspect-[3/4] w-full">
        {deck.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 text-white/40">
            <Sparkles size={32} strokeWidth={1.5} className="animate-pulse" />
            <p className="font-display text-lg">You're all caught up</p>
            <p className="text-sm">Loading more onchain matches...</p>
          </motion.div>
        )}
        {deck.map((p, i) => {
          const isTop = i === 0;
          if (i > 2) return null;
          return (
            <motion.div
              key={p.id}
              className="absolute inset-0"
              style={isTop ? { x, rotate } : {}}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isTop ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 - i * 0.04, y: i * 12 }}
              drag={isTop ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDrag={(_, info) => setDragX(info.offset.x)}
              onDragEnd={(_, info) => {
                if (info.offset.x > 120) handleLike(p);
                else if (info.offset.x < -120) handlePass(p);
                else { animate(x, 0, { type: 'spring', stiffness: 300 }); setDragX(0); }
              }}
              whileTap={isTop ? { cursor: 'grabbing' } : {}}
            >
              <ProfileCard profile={p} dragX={isTop ? dragX : 0} />
            </motion.div>
          );
        })}
      </div>
      <div className="flex items-center gap-4">
        <Button size="icon" variant="outline" className="h-12 w-12 rounded-full text-white/60 transition-all duration-200 hover:scale-110" onClick={rewind}>
          <RotateCcw size={20} strokeWidth={1.5} />
        </Button>
        <Button size="icon" variant="outline" className="h-14 w-14 rounded-full border-rose-500/40 text-rose-400 transition-all duration-200 hover:scale-110 hover:bg-rose-500/10" disabled={!top} onClick={() => top && handlePass(top)}>
          <X size={24} strokeWidth={2} />
        </Button>
        <Button size="icon" variant="outline" className="h-12 w-12 rounded-full border-amber-400/40 text-amber-300 transition-all duration-200 hover:scale-110 hover:bg-amber-400/10" disabled={!top} onClick={() => top && handleSuper(top)}>
          <Star size={20} strokeWidth={2} />
        </Button>
        <Button size="icon" className="h-14 w-14 rounded-full bg-emerald-500 transition-all duration-200 hover:scale-110 hover:bg-emerald-600" disabled={!top} onClick={() => top && handleLike(top)}>
          <Heart size={24} strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}
