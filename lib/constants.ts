export const SUPPORTED_TOKENS = {
  DEGEN: {
    symbol: 'DEGEN',
    name: 'Degen',
    decimals: 18,
    color: 'text-purple-400',
  },
  WETH: {
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: 18,
    color: 'text-blue-400',
  },
} as const;

export const POLL_CATEGORIES = [
  'Governance',
  'Community',
  'Development',
  'Marketing',
  'Treasury',
  'General',
] as const;

export const REPUTATION_THRESHOLDS = {
  BRONZE: 0,
  SILVER: 500,
  GOLD: 1000,
} as const;

export const DEFAULT_POLL_DURATION = 24; // hours
export const MIN_STAKE_AMOUNT = 0.1;
export const MAX_POLL_OPTIONS = 6;
export const MIN_POLL_OPTIONS = 2;
