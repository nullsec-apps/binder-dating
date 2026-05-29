import { SwipeDeck } from '@/components/SwipeDeck';
import { LiveActivityPanel } from '@/components/LiveActivityPanel';
import { motion } from 'framer-motion';

export function DiscoverPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center gap-6 p-4 md:p-8">
      <div className="flex flex-1 justify-center">
        <SwipeDeck />
      </div>
      <aside className="hidden w-80 shrink-0 xl:block">
        <LiveActivityPanel />
      </aside>
    </motion.div>
  );
}
