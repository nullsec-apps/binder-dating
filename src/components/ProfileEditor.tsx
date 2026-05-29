import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useBinder } from '@/store/binderStore';
import { ProfileCard } from './ProfileCard';
import { OnchainVerificationBadge } from './OnchainVerificationBadge';
import { useOnchainProfile } from '@/hooks/useOnchainProfile';
import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import type { Profile } from '@/lib/types';

export function ProfileEditor() {
  const { localProfile, wallet } = useBinder();
  const { profile, updateProfile } = localProfile;
  const { badges } = useOnchainProfile(wallet.address);
  const [newInterest, setNewInterest] = useState('');

  const preview: Profile = {
    id: 'me', name: profile.name, age: profile.age, basename: profile.basename, address: wallet.address || '0x0',
    bio: profile.bio, distanceKm: 0, gender: 'nonbinary', photos: profile.photos.length ? profile.photos : ['https://i.pravatar.cc/600?img=12'],
    interests: profile.interests, prompts: profile.prompts, badges, walletAgeDays: 766, poapCount: 18, nftCount: 34,
  };

  const addInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      updateProfile({ interests: [...profile.interests, newInterest.trim()] });
      setNewInterest('');
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader><CardTitle>Edit Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1 block text-xs text-white/50">Display name</label>
              <Input value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-xs text-white/50">Age</label>
                <Input type="number" value={profile.age} onChange={(e) => updateProfile({ age: Number(e.target.value) })} />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs text-white/50">Basename</label>
                <Input value={profile.basename} onChange={(e) => updateProfile({ basename: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/50">Bio</label>
              <textarea value={profile.bio} onChange={(e) => updateProfile({ bio: e.target.value })} rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]" />
            </div>
            <div>
              <label className="mb-2 block text-xs text-white/50">Interests</label>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {profile.interests.map((i) => (
                  <Badge key={i} variant="secondary" className="cursor-pointer transition-colors duration-200 hover:bg-rose-500/20" onClick={() => updateProfile({ interests: profile.interests.filter((x) => x !== i) })}>
                    {i} <X size={11} strokeWidth={2} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input placeholder="Add interest" value={newInterest} onChange={(e) => setNewInterest(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addInterest()} />
                <Button size="icon" variant="secondary" className="transition-all duration-200 hover:scale-105" onClick={addInterest}><Plus size={18} /></Button>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs text-white/50">Onchain Credentials</label>
              <div className="flex flex-wrap gap-1.5">
                {badges.map((b) => <OnchainVerificationBadge key={b.id} badge={b} />)}
              </div>
            </div>
            <Button className="w-full transition-all duration-200 hover:scale-[1.02]" onClick={() => toast.success('Profile saved')}>Save</Button>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
          <CardContent>
            <div className="mx-auto aspect-[3/4] w-full max-w-xs">
              <ProfileCard profile={preview} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
