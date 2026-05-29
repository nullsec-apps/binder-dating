import { ProfileEditor } from '@/components/ProfileEditor';
import { motion } from 'framer-motion';

export function ProfilePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-5xl p-4 md:p-8">
      <h1 className="mb-6 font-display text-2xl font-bold">My Profile</h1>
      <ProfileEditor />
    </motion.div>
  );
}
