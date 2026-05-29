import type { OnchainBadge } from '../lib/types';

export function useOnchainProfile(address?: string) {
  if (!address) return { badges: [] as OnchainBadge[], loading: false };
  const badges: OnchainBadge[] = [
    { id: 'bn', type: 'basename', label: 'you.base.eth', detail: 'Owns the you.base.eth Basename onchain' },
    { id: 'cb', type: 'coinbase-verified', label: 'Coinbase Verified', detail: 'Verified through Coinbase onchain attestation' },
    { id: 'wa', type: 'wallet-age', label: '2.1yr wallet', detail: 'Wallet active for 766 days' },
    { id: 'poap', type: 'poap', label: '18 POAPs', detail: 'Collected 18 proof-of-attendance tokens' },
    { id: 'nft', type: 'nft', label: '34 NFTs', detail: 'Holds 34 NFTs across collections' },
  ];
  return { badges, loading: false };
}
