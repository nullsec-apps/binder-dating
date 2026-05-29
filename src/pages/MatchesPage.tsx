import { MatchesGrid } from '@/components/MatchesGrid';
import { motion } from 'framer-motion';

export function MatchesPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-5xl p-4 md:p-8">
      <h1 className="mb-6 font-display text-2xl font-bold">Your Matches</h1>
      <MatchesGrid />
    </motion.div>
  );
}
