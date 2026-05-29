import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import type { OnchainBadge } from '@/lib/types';
import { BadgeCheck, Image, Calendar, Ticket, Hexagon } from 'lucide-react';

const ICONS = {
  'basename': Hexagon,
  'nft': Image,
  'poap': Ticket,
  'coinbase-verified': BadgeCheck,
  'wallet-age': Calendar,
} as const;

export function OnchainVerificationBadge({ badge }: { badge: OnchainBadge }) {
  const Icon = ICONS[badge.type] || BadgeCheck;
  const variant = badge.type === 'coinbase-verified' ? 'success' : badge.type === 'basename' ? 'default' : 'secondary';
  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant={variant as any} className="transition-all duration-200 hover:scale-105 hover:shadow-[0_0_12px_rgba(0,82,255,0.4)]">
          <Icon size={12} strokeWidth={2} />
          {badge.label}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>{badge.detail}</TooltipContent>
    </Tooltip>
  );
}
