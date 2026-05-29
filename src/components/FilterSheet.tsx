import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBinder } from '@/store/binderStore';
import type { Filters } from '@/lib/types';

function Slider({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))}
      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#0052FF]" />
  );
}

export function FilterSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { filtersHook } = useBinder();
  const { filters, setFilters } = filtersHook;
  const set = (p: Partial<Filters>) => setFilters((f) => ({ ...f, ...p }));

  const genders: { v: Filters['gender']; l: string }[] = [
    { v: 'all', l: 'Everyone' }, { v: 'female', l: 'Women' }, { v: 'male', l: 'Men' }, { v: 'nonbinary', l: 'Nonbinary' },
  ];

  return (
    <>
      <div className={cn('fixed inset-0 z-40 bg-black/60 transition-opacity duration-300', open ? 'opacity-100' : 'pointer-events-none opacity-0')} onClick={onClose} />
      <div className={cn('fixed right-0 top-0 z-50 h-full w-full max-w-sm overflow-y-auto border-l border-white/10 bg-[#0A0B0F] p-6 transition-transform duration-300', open ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Discovery Filters</h2>
          <Button size="icon" variant="ghost" className="transition-colors duration-200" onClick={onClose}><X size={20} strokeWidth={2} /></Button>
        </div>
        <Separator className="my-4" />
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex justify-between text-sm"><span className="text-white/70">Show me</span></div>
            <div className="grid grid-cols-2 gap-2">
              {genders.map((g) => (
                <Button key={g.v} variant={filters.gender === g.v ? 'default' : 'outline'} size="sm" className="transition-all duration-200" onClick={() => set({ gender: g.v })}>{g.l}</Button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm text-white/70"><span>Age range</span><span className="text-white">{filters.ageRange[0]}–{filters.ageRange[1]}</span></div>
            <Slider value={filters.ageRange[0]} min={18} max={filters.ageRange[1]} onChange={(v) => set({ ageRange: [v, filters.ageRange[1]] })} />
            <div className="mt-2"><Slider value={filters.ageRange[1]} min={filters.ageRange[0]} max={60} onChange={(v) => set({ ageRange: [filters.ageRange[0], v] })} /></div>
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm text-white/70"><span>Max distance</span><span className="text-white">{filters.maxDistanceKm} km</span></div>
            <Slider value={filters.maxDistanceKm} min={1} max={100} onChange={(v) => set({ maxDistanceKm: v })} />
          </div>
          <Separator />
          <p className="font-display text-sm font-semibold text-[#0052FF]">Onchain Filters</p>
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-white/80">Coinbase verified only</p><p className="text-xs text-white/40">Verified attestation required</p></div>
            <Switch checked={filters.verifiedOnly} onCheckedChange={(v) => set({ verifiedOnly: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-white/80">Must hold NFTs</p><p className="text-xs text-white/40">At least one collection</p></div>
            <Switch checked={filters.mustHoldNft} onCheckedChange={(v) => set({ mustHoldNft: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-white/80">Shared token holdings</p><p className="text-xs text-white/40">Prioritize overlap</p></div>
            <Switch checked={filters.sharedTokens} onCheckedChange={(v) => set({ sharedTokens: v })} />
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm text-white/70"><span>Min wallet age</span><span className="text-white">{(filters.minWalletAgeDays / 365).toFixed(1)} yr</span></div>
            <Slider value={filters.minWalletAgeDays} min={0} max={1460} onChange={(v) => set({ minWalletAgeDays: v })} />
          </div>
          <Button className="w-full transition-all duration-200 hover:scale-[1.02]" onClick={onClose}>Apply filters</Button>
        </div>
      </div>
    </>
  );
}
