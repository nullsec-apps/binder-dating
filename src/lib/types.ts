export type BadgeType = 'basename' | 'nft' | 'poap' | 'coinbase-verified' | 'wallet-age';

export interface OnchainBadge {
  id: string;
  type: BadgeType;
  label: string;
  detail: string;
}

export interface Prompt { q: string; a: string; }

export interface Profile {
  id: string;
  name: string;
  age: number;
  basename: string;
  address: string;
  bio: string;
  distanceKm: number;
  gender: 'female' | 'male' | 'nonbinary';
  photos: string[];
  interests: string[];
  prompts: Prompt[];
  badges: OnchainBadge[];
  walletAgeDays: number;
  poapCount: number;
  nftCount: number;
}

export interface Match {
  id: string;
  profile: Profile;
  matchedAt: number;
  sharedInterests: string[];
  unread: number;
}

export interface ChatMessage {
  id: string;
  matchId: string;
  fromMe: boolean;
  text: string;
  ts: number;
}

export interface Conversation {
  matchId: string;
  messages: ChatMessage[];
}

export interface Filters {
  ageRange: [number, number];
  maxDistanceKm: number;
  gender: 'all' | 'female' | 'male' | 'nonbinary';
  verifiedOnly: boolean;
  minWalletAgeDays: number;
  mustHoldNft: boolean;
  sharedTokens: boolean;
}

export interface LocalProfile {
  name: string;
  age: number;
  bio: string;
  basename: string;
  photos: string[];
  interests: string[];
  prompts: Prompt[];
  onboarded: boolean;
}
