'use client';

import { Award, Star, Trophy } from 'lucide-react';
import { getReputationColor } from '../lib/utils';
import type { ReputationTier } from '../lib/types';

interface ReputationBadgeProps {
  tier: ReputationTier;
  size?: 'sm' | 'md' | 'lg';
}

export function ReputationBadge({ tier, size = 'sm' }: ReputationBadgeProps) {
  const getIcon = () => {
    switch (tier) {
      case 'gold':
        return Trophy;
      case 'silver':
        return Award;
      case 'bronze':
        return Star;
      default:
        return Star;
    }
  };

  const getLabel = () => {
    switch (tier) {
      case 'gold':
        return 'Gold';
      case 'silver':
        return 'Silver';
      case 'bronze':
        return 'Bronze';
      default:
        return 'Bronze';
    }
  };

  const Icon = getIcon();
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`inline-flex items-center gap-1 ${getReputationColor(tier)}`}>
      <Icon className={sizeClasses[size]} />
      <span className={`font-medium ${textSizeClasses[size]}`}>
        {getLabel()}
      </span>
    </div>
  );
}
