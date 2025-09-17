'use client';

import { TrendingUp, Clock, Users } from 'lucide-react';
import { Card } from './ui/Card';
import { formatTokenAmount, calculateTimeRemaining } from '../lib/utils';

const trendingPolls = [
  {
    id: '1',
    question: 'Community Rewards Distribution',
    totalStake: 2450.75,
    totalVotes: 89,
    timeRemaining: Date.now() + 86400000 * 3,
    category: 'Treasury'
  },
  {
    id: '2',
    question: 'Premier Polls Feature Launch',
    totalStake: 1890.25,
    totalVotes: 67,
    timeRemaining: Date.now() + 86400000 * 2,
    category: 'Development'
  },
  {
    id: '3',
    question: 'Derivative Features Implementation',
    totalStake: 1234.50,
    totalVotes: 45,
    timeRemaining: Date.now() + 86400000,
    category: 'Development'
  },
  {
    id: '4',
    question: 'Gaming polls Integration',
    totalStake: 987.25,
    totalVotes: 34,
    timeRemaining: Date.now() + 86400000 * 5,
    category: 'Community'
  }
];

export function TrendingPolls() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-accent" />
        <h2 className="text-xl font-semibold text-textPrimary">Trending polls</h2>
      </div>

      <div className="space-y-3">
        {trendingPolls.map((poll, index) => (
          <Card key={poll.id} className="p-4 hover:bg-surface/80 transition-colors duration-200 cursor-pointer">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-sm text-textSecondary">{poll.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-textPrimary">
                    {formatTokenAmount(poll.totalStake)}
                  </div>
                  <div className="text-xs text-textSecondary">staked</div>
                </div>
              </div>

              <h3 className="text-sm font-medium text-textPrimary leading-tight">
                {poll.question}
              </h3>

              <div className="flex items-center justify-between text-xs text-textSecondary">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{poll.totalVotes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{calculateTimeRemaining(poll.timeRemaining)}</span>
                </div>
              </div>

              {/* Progress visualization */}
              <div className="h-1 bg-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((poll.totalStake / 3000) * 100, 100)}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 text-center">
        <div className="space-y-2">
          <div className="text-2xl">🎯</div>
          <h3 className="font-medium text-textPrimary">Create Your Poll</h3>
          <p className="text-sm text-textSecondary">
            Start engaging your community with stake-weighted decisions
          </p>
        </div>
      </Card>
    </div>
  );
}
