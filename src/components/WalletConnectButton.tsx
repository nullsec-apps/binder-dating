import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, ChevronDown, LogOut, Copy } from 'lucide-react';
import { useBinder } from '@/store/binderStore';
import { truncateAddress, formatEth } from '@/lib/format';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export function WalletConnectButton() {
  const { wallet } = useBinder();
  const [open, setOpen] = useState(false);

  if (!wallet.isConnected) {
    return (
      <div className="flex items-center gap-2">
        <Button size="sm" className="gap-2 transition-all duration-200 hover:scale-105" onClick={() => { wallet.connect(); toast.success('Wallet connected'); }}>
          <Wallet size={16} strokeWidth={2} />
          Connect
        </Button>
      </div>
    );
  }

  return (
    <div className="relative flex items-center gap-2">
      <Badge variant="success" className="hidden sm:inline-flex">Base</Badge>
      <Button size="sm" variant="secondary" className="gap-2 transition-all duration-200" onClick={() => setOpen((o) => !o)}>
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="max-w-[120px] truncate">{wallet.basename || truncateAddress(wallet.address)}</span>
        <ChevronDown size={14} strokeWidth={2} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </Button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }} transition={{ duration: 0.18 }}
              className="absolute right-0 top-11 z-50 w-60 rounded-xl border border-white/10 bg-[#13151c] p-3 shadow-2xl">
              <div className="px-2 py-1">
                <p className="font-display text-sm font-semibold">{wallet.basename}</p>
                <p className="text-xs text-white/40">{truncateAddress(wallet.address)}</p>
              </div>
              <div className="my-2 flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                <span className="text-xs text-white/50">Balance</span>
                <span className="text-sm font-medium">{formatEth(wallet.balance)}</span>
              </div>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 transition-colors duration-200" onClick={() => { navigator.clipboard.writeText(wallet.address || ''); toast.success('Address copied'); }}>
                <Copy size={15} strokeWidth={1.5} /> Copy address
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-rose-400 transition-colors duration-200 hover:text-rose-300" onClick={() => { wallet.disconnect(); setOpen(false); toast('Disconnected'); }}>
                <LogOut size={15} strokeWidth={1.5} /> Disconnect
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
