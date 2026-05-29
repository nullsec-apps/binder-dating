import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useBinder } from '@/store/binderStore';
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Row({ label, desc, value, onChange }: { label: string; desc?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div><p className="text-white/80">{label}</p>{desc && <p className="text-xs text-white/40">{desc}</p>}</div>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}

export function SettingsPanel() {
  const { wallet } = useBinder();
  const navigate = useNavigate();
  const [s, setS] = useState({ push: true, matchAlerts: true, msgAlerts: false, hideBalance: true, incognito: false, discoverable: true });
  const set = (k: keyof typeof s) => (v: boolean) => setS((p) => ({ ...p, [k]: v }));

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-2xl space-y-6">
      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Row label="Push notifications" value={s.push} onChange={set('push')} />
          <Separator />
          <Row label="New match alerts" desc="When someone matches you" value={s.matchAlerts} onChange={set('matchAlerts')} />
          <Separator />
          <Row label="Message alerts" value={s.msgAlerts} onChange={set('msgAlerts')} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Privacy</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Row label="Hide wallet balance" desc="Keep your ETH balance private" value={s.hideBalance} onChange={set('hideBalance')} />
          <Separator />
          <Row label="Incognito mode" desc="Only people you like see you" value={s.incognito} onChange={set('incognito')} />
          <Separator />
          <Row label="Show me in discovery" value={s.discoverable} onChange={set('discoverable')} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Account</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full transition-all duration-200" onClick={() => { wallet.disconnect(); toast('Wallet disconnected'); navigate('/discover'); }}>Disconnect Wallet</Button>
          <Button variant="destructive" className="w-full transition-all duration-200" onClick={() => toast.error('Account deletion requires confirmation')}>Delete Account</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
