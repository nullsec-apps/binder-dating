import type { Profile, OnchainBadge } from './types';

const FIRST_NAMES_F = ['Sarah', 'Maya', 'Elena', 'Zoe', 'Priya', 'Aria', 'Luna', 'Chloe', 'Nadia', 'Ivy'];
const FIRST_NAMES_M = ['Jaden', 'Marcus', 'Leo', 'Kai', 'Diego', 'Theo', 'Ravi', 'Felix', 'Omar', 'Noah'];
const FIRST_NAMES_NB = ['River', 'Sky', 'Sage', 'Ash', 'Rowan'];

const INTERESTS = ['DeFi', 'NFTs', 'DAOs', 'Onchain Art', 'Memecoins', 'ZK Proofs', 'Base Builders', 'Farcaster', 'Gaming', 'Climbing', 'Coffee', 'Vinyl', 'Yoga', 'Travel', 'Photography', 'Cooking', 'Running', 'Hackathons'];

const BIOS = [
  'Building onchain in SF. Will trade you alpha for a good ramen rec.',
  'Smart contract dev by day, degen by night. Looking for my co-founder in life.',
  'Collected my first NFT in 2021 and never looked back. Lets mint memories.',
  'Farcaster poster, DeFi farmer, terrible at flirting onchain.',
  'I touch grass occasionally. Mostly between blocks.',
  'POAP maximalist. If you went to ETHDenver we probably already matched IRL.',
  'Base native. gm is my love language.',
  'Quant turned artist. I make generative pieces and overthink everything.',
  'Looking for someone to debug my heart. Solidity preferred.',
  'DAO contributor, dog person, sourdough enthusiast.'
];

const PROMPTS_POOL = [
  { q: 'My ideal first date is', a: 'Coffee then a long walk talking about why L2s won.' },
  { q: 'Best onchain memory', a: 'Minting at mint price and actually flipping it. Once.' },
  { q: 'I will fall for you if', a: 'You can explain account abstraction without a whiteboard.' },
  { q: 'A green flag I look for', a: 'You read the docs before asking in Discord.' },
  { q: 'My most controversial take', a: 'Memecoins are art and I will not elaborate.' },
];

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function sample<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}
function randAddr(): string {
  const hex = '0123456789abcdef';
  let s = '0x';
  for (let i = 0; i < 40; i++) s += hex[Math.floor(Math.random() * 16)];
  return s;
}

function buildBadges(walletAgeDays: number, poapCount: number, nftCount: number, basename: string): OnchainBadge[] {
  const badges: OnchainBadge[] = [];
  badges.push({ id: 'bn', type: 'basename', label: basename, detail: `Owns the ${basename} Basename onchain` });
  if (Math.random() > 0.4) badges.push({ id: 'cb', type: 'coinbase-verified', label: 'Coinbase Verified', detail: 'Verified through Coinbase onchain attestation' });
  badges.push({ id: 'wa', type: 'wallet-age', label: `${(walletAgeDays / 365).toFixed(1)}yr wallet`, detail: `Wallet active for ${walletAgeDays} days` });
  if (poapCount > 0) badges.push({ id: 'poap', type: 'poap', label: `${poapCount} POAPs`, detail: `Collected ${poapCount} proof-of-attendance tokens` });
  if (nftCount > 0) badges.push({ id: 'nft', type: 'nft', label: `${nftCount} NFTs`, detail: `Holds ${nftCount} NFTs across collections` });
  return badges;
}

export function generateProfiles(count = 24): Profile[] {
  const profiles: Profile[] = [];
  for (let i = 0; i < count; i++) {
    const genderRoll = Math.random();
    const gender: Profile['gender'] = genderRoll < 0.45 ? 'female' : genderRoll < 0.9 ? 'male' : 'nonbinary';
    const name = gender === 'female' ? rand(FIRST_NAMES_F) : gender === 'male' ? rand(FIRST_NAMES_M) : rand(FIRST_NAMES_NB);
    const basename = `${name.toLowerCase()}${randInt(1, 999)}.base.eth`;
    const walletAgeDays = randInt(120, 1800);
    const poapCount = randInt(0, 42);
    const nftCount = randInt(0, 80);
    const photoCount = randInt(2, 4);
    const photos = Array.from({ length: photoCount }, (_, p) =>
      `https://i.pravatar.cc/600?img=${(i * 5 + p) % 70 + 1}`
    );
    profiles.push({
      id: `p-${i}-${Math.random().toString(36).slice(2, 7)}`,
      name,
      age: randInt(21, 39),
      basename,
      address: randAddr(),
      bio: rand(BIOS),
      distanceKm: randInt(1, 80),
      gender,
      photos,
      interests: sample(INTERESTS, randInt(3, 5)),
      prompts: sample(PROMPTS_POOL, 2),
      badges: buildBadges(walletAgeDays, poapCount, nftCount, basename),
      walletAgeDays,
      poapCount,
      nftCount,
    });
  }
  return profiles;
}

export const SAMPLE_PROMPTS = [
  'My ideal first date is',
  'Best onchain memory',
  'I will fall for you if',
  'A green flag I look for',
];
