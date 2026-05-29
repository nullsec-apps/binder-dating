import { useState, useCallback } from 'react';
import type { Filters, Profile } from '../lib/types';

const DEFAULT_FILTERS: Filters = {
  ageRange: [21, 40],
  maxDistanceKm: 80,
  gender: 'all',
  verifiedOnly: false,
  minWalletAgeDays: 0,
  mustHoldNft: false,
  sharedTokens: false,
};

export function useFilters() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const applyFilters = useCallback((profiles: Profile[]): Profile[] => {
    return profiles.filter((p) => {
      if (p.age < filters.ageRange[0] || p.age > filters.ageRange[1]) return false;
      if (p.distanceKm > filters.maxDistanceKm) return false;
      if (filters.gender !== 'all' && p.gender !== filters.gender) return false;
      if (filters.verifiedOnly && !p.badges.some((b) => b.type === 'coinbase-verified')) return false;
      if (p.walletAgeDays < filters.minWalletAgeDays) return false;
      if (filters.mustHoldNft && p.nftCount === 0) return false;
      return true;
    });
  }, [filters]);

  return { filters, setFilters, applyFilters };
}
