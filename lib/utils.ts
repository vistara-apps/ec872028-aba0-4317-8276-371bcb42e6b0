import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ReputationTier } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatTokenAmount(amount: number, decimals: number = 4): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function getReputationTier(score: number): ReputationTier {
  if (score >= 1000) return 'gold';
  if (score >= 500) return 'silver';
  return 'bronze';
}

export function getReputationColor(tier: ReputationTier): string {
  switch (tier) {
    case 'gold':
      return 'text-yellow-400';
    case 'silver':
      return 'text-gray-300';
    case 'bronze':
      return 'text-orange-400';
    default:
      return 'text-gray-400';
  }
}

export function calculateTimeRemaining(expiryTimestamp: number): string {
  const now = Date.now();
  const remaining = expiryTimestamp - now;
  
  if (remaining <= 0) return 'Expired';
  
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function calculateVotingPower(stakeAmount: number, reputationScore: number): number {
  // Base voting power is stake amount, with reputation multiplier
  const reputationMultiplier = 1 + (reputationScore / 1000) * 0.5; // Max 50% bonus
  return stakeAmount * reputationMultiplier;
}
