'use client';

import { useState } from 'react';
import { Clock, Users, TrendingUp, Award } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { ReputationBadge } from './ReputationBadge';
import { VoteModal } from './VoteModal';
import { formatAddress, formatTokenAmount, calculateTimeRemaining } from '../lib/utils';
import type { PollWithVotes } from '../lib/types';

interface PollCardProps {
  poll: PollWithVotes;
  variant?: 'active' | 'closed';
}

export function PollCard({ poll, variant }: PollCardProps) {
  const [showVoteModal, setShowVoteModal] = useState(false);
  const timeRemaining = calculateTimeRemaining(poll.expiryTimestamp);
  const isExpired = !poll.isActive;

  return (
    <>
      <Card className={`p-6 space-y-4 ${isExpired ? 'opacity-75' : ''}`}>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>by {formatAddress(poll.creatorAddress)}</span>
              <ReputationBadge tier="silver" />
              {poll.category && (
                <span className="bg-gray-800 px-2 py-1 rounded text-xs">
                  {poll.category}
                </span>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-100 leading-tight">
              {poll.question}
            </h3>
          </div>
          
          {isExpired && poll.outcome && (
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <Award className="w-4 h-4" />
              <span>Decided</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {poll.options.map((option, index) => {
            const isLeading = option === poll.leadingOption;
            const isWinner = option === poll.outcome;
            
            return (
              <div
                key={index}
                className={`p-3 rounded-md border transition-colors duration-200 ${
                  isWinner
                    ? 'border-green-500 bg-green-500/10'
                    : isLeading
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 bg-gray-800/50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-100">{option}</span>
                  {(isLeading || isWinner) && (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-700">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{poll.totalVotes} votes</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>{formatTokenAmount(poll.totalStake)} staked</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{timeRemaining}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {!isExpired ? (
              <Button
                size="sm"
                onClick={() => setShowVoteModal(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Vote
              </Button>
            ) : (
              <Button variant="outline" size="sm">
                View Results
              </Button>
            )}
          </div>
        </div>
      </Card>

      {showVoteModal && (
        <VoteModal
          poll={poll}
          onClose={() => setShowVoteModal(false)}
        />
      )}
    </>
  );
}
