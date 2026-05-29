import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useBinder } from '@/store/binderStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

export function MatchModal() {
  const { matchModal, closeMatch, localProfile } = useBinder();
  const navigate = useNavigate();
  const fired = useRef(false);

  useEffect(() => {
    if (matchModal && !fired.current) {
      fired.current = true;
      const end = Date.now() + 800;
      const colors = ['#0052FF', '#ffffff', '#34d399'];
      (function frame() {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
    if (!matchModal) fired.current = false;
  }, [matchModal]);

  return (
    <AnimatePresence>
      {matchModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <motion.h1 initial={{ scale: 0.6 }} animate={{ scale: [0.6, 1.15, 1] }} transition={{ duration: 0.6 }}
              className="font-display text-4xl font-extrabold text-[#0052FF] sm:text-5xl">It's a Match!</motion.h1>
            <p className="text-white/60">You and {matchModal.name} liked each other onchain ⚡</p>
            <div className="flex items-center">
              <motion.div initial={{ x: -120, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}>
                <Avatar className="h-24 w-24 border-4 border-[#0052FF]"><AvatarImage src={localProfile.profile.photos[0]} /></Avatar>
              </motion.div>
              <motion.div initial={{ x: 120, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} className="-ml-4">
                <Avatar className="h-24 w-24 border-4 border-emerald-400"><AvatarImage src={matchModal.photos[0]} /></Avatar>
              </motion.div>
            </div>
            <div className="flex gap-3">
              <Button className="transition-all duration-200 hover:scale-105" onClick={() => { const id = 'm-' + matchModal.id; closeMatch(); navigate('/chats?match=' + id); }}>Message now</Button>
              <Button variant="outline" className="transition-all duration-200" onClick={closeMatch}>Keep swiping</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
