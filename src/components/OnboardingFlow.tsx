import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useBinder } from '@/store/binderStore';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, BadgeCheck, Image, User, Flame, Check } from 'lucide-react';

const STEPS = ['Connect', 'Verify', 'Photos', 'About You', 'Done'];

export function OnboardingFlow({ open, onComplete }: { open: boolean; onComplete: () => void }) {
  const { wallet, localProfile } = useBinder();
  const [step, setStep] = useState(0);
  if (!open) return null;
  const { profile, updateProfile } = localProfile;

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0A0B0F] p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-1">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-[#0052FF]' : 'bg-white/10'}`} />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            {step === 0 && (
              <div className="space-y-6 text-center">
                <Flame size={48} className="mx-auto text-[#0052FF]" />
                <h1 className="font-display text-3xl font-bold">Welcome to Binder</h1>
                <p className="text-white/50">Onchain dating for the Base community. Your reputation is your dating resume.</p>
                <Button className="w-full gap-2 transition-all duration-200 hover:scale-[1.02]" onClick={() => { if (!wallet.isConnected) wallet.connect(); next(); }}>
                  <Wallet size={18} /> {wallet.isConnected ? 'Continue' : 'Connect Wallet'}
                </Button>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-6 text-center">
                <BadgeCheck size={48} className="mx-auto text-emerald-400" />
                <h1 className="font-display text-2xl font-bold">Verify your identity</h1>
                <p className="text-white/50">We resolved your onchain credentials:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="default">you.base.eth</Badge>
                  <Badge variant="success"><BadgeCheck size={12} /> Coinbase Verified</Badge>
                  <Badge variant="secondary">18 POAPs</Badge>
                  <Badge variant="secondary">34 NFTs</Badge>
                </div>
                <Button className="w-full transition-all duration-200 hover:scale-[1.02]" onClick={next}>Looks good</Button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6 text-center">
                <Image size={48} className="mx-auto text-[#0052FF]" />
                <h1 className="font-display text-2xl font-bold">Add your photos</h1>
                <div className="grid grid-cols-2 gap-3">
                  {profile.photos.map((p, i) => (
                    <img key={i} src={p} className="aspect-square w-full rounded-xl object-cover" />
                  ))}
                </div>
                <Button className="w-full transition-all duration-200 hover:scale-[1.02]" onClick={next}>Continue</Button>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <User size={48} className="mx-auto text-[#0052FF]" />
                <h1 className="text-center font-display text-2xl font-bold">About you</h1>
                <Input placeholder="Display name" value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} />
                <textarea placeholder="Write a bio..." value={profile.bio} onChange={(e) => updateProfile({ bio: e.target.value })} rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]" />
                <Button className="w-full transition-all duration-200 hover:scale-[1.02]" onClick={next}>Continue</Button>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-6 text-center">
                <motion.div initial={{ scale: 0.6 }} animate={{ scale: [0.6, 1.1, 1] }} transition={{ duration: 0.5 }} className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20"><Check size={32} className="text-emerald-400" /></motion.div>
                <h1 className="font-display text-3xl font-bold">You're all set!</h1>
                <p className="text-white/50">Time to find your onchain match.</p>
                <Button className="w-full transition-all duration-200 hover:scale-[1.02]" onClick={onComplete}>Start swiping</Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
