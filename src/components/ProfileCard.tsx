import { Card } from '@/components/ui/card';
import type { Profile } from '@/lib/types';
import { OnchainVerificationBadge } from './OnchainVerificationBadge';
import { Badge } from '@/components/ui/badge';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function ProfileCard({ profile, dragX }: { profile?: Profile; dragX?: number }) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);

  if (!profile) {
    return (
      <Card className="flex h-full w-full items-center justify-center text-white/40">
        No more profiles
      </Card>
    );
  }

  const likeOpacity = dragX && dragX > 0 ? Math.min(dragX / 100, 1) : 0;
  const nopeOpacity = dragX && dragX < 0 ? Math.min(-dragX / 100, 1) : 0;

  return (
    <Card className="relative h-full w-full select-none overflow-hidden">
      <div className="relative h-full w-full">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-white/5" />}
        <img src={profile.photos[photoIdx]} alt={profile.name} onLoad={() => setLoaded(true)} className={cn('h-full w-full object-cover transition-opacity duration-300', loaded ? 'opacity-100' : 'opacity-0')} draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/20" />

        <div className="absolute left-0 right-0 top-3 flex gap-1.5 px-4">
          {profile.photos.map((_, i) => (
            <div key={i} className={cn('h-1 flex-1 rounded-full transition-colors duration-200', i === photoIdx ? 'bg-white' : 'bg-white/30')} />
          ))}
        </div>
        {profile.photos.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); setLoaded(false); setPhotoIdx((p) => Math.max(0, p - 1)); }} className="absolute left-0 top-0 h-full w-1/3" aria-label="prev" />
            <button onClick={(e) => { e.stopPropagation(); setLoaded(false); setPhotoIdx((p) => Math.min(profile.photos.length - 1, p + 1)); }} className="absolute right-0 top-0 h-full w-1/3" aria-label="next" />
            <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-white/30"><ChevronLeft size={20} /></div>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white/30"><ChevronRight size={20} /></div>
          </>
        )}

        <div className="pointer-events-none absolute left-6 top-16 -rotate-12 rounded-lg border-4 border-emerald-400 px-4 py-1 font-display text-3xl font-extrabold text-emerald-400" style={{ opacity: likeOpacity }}>LIKE</div>
        <div className="pointer-events-none absolute right-6 top-16 rotate-12 rounded-lg border-4 border-rose-500 px-4 py-1 font-display text-3xl font-extrabold text-rose-500" style={{ opacity: nopeOpacity }}>NOPE</div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end gap-2">
            <h2 className="font-display text-2xl font-bold leading-none">{profile.name}</h2>
            <span className="text-xl text-white/80">{profile.age}</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-sm text-white/60">
            <MapPin size={13} strokeWidth={1.5} /> {profile.distanceKm} km away
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-white/80">{profile.bio}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {profile.badges.slice(0, 3).map((b) => <OnchainVerificationBadge key={b.id} badge={b} />)}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {profile.interests.slice(0, 4).map((i) => (
              <Badge key={i} variant="outline" className="text-[10px]">{i}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
