'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Users, TrendingUp, Award, Share2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { ReputationBadge } from './ReputationBadge';
import { VoteModal } from './VoteModal';
import { formatAddress, formatTokenAmount, calculateTimeRemaining } from '../lib/utils';
import type { PollWithVotes } from '../lib/types';

interface PollDetailsProps {
  pollId: string;
}

export function PollDetails({ pollId }: PollDetailsProps) {
  const [poll, setPoll] = useState<PollWithVotes | null>(null);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPollDetails = async () => {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockPoll: PollWithVotes = {
        pollId,
        creatorAddress: '0x1234567890123456789012345678901234567890',
        question: 'Should we implement quadratic voting for better governance?',
        options: [
          'Yes, implement immediately',
          'Yes, but with a trial period',
          'No, keep current system',
          'Need more research'
        ],
        creationTimestamp: Date.now() - 86400000 * 2, // 2 days ago
        expiryTimestamp: Date.now() + 86400000 * 5, // 5 days from now
        totalStake: 2847.50,
        isActive: true,
        category: 'Governance',
        outcome: undefined,
        votes: [
          {
            voteId: 'vote_1',
            pollId,
            voterAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
            optionChosen: 'Yes, implement immediately',
            stakeAmount: 150,
            timestamp: Date.now() - 86400000,
            reputationAtVote: 750
          },
          {
            voteId: 'vote_2',
            pollId,
            voterAddress: '0x9876543210987654321098765432109876543210',
            optionChosen: 'Yes, but with a trial period',
            stakeAmount: 200,
            timestamp: Date.now() - 43200000,
            reputationAtVote: 680
          }
        ],
        totalVotes: 45,
        leadingOption: 'Yes, implement immediately'
      };

      setPoll(mockPoll);
      setLoading(false);
    };

    fetchPollDetails();
  }, [pollId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textSecondary">Loading poll details...</p>
        </div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="text-center py-12">
        <p className="text-textSecondary">Poll not found</p>
        <Link href="/">
          <Button className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const timeRemaining = calculateTimeRemaining(poll.expiryTimestamp);
  const isExpired = !poll.isActive;

  // Calculate vote distribution
  const voteDistribution = poll.options.map(option => {
    const votes = poll.votes.filter(vote => vote.optionChosen === option);
    const totalStakeForOption = votes.reduce((sum, vote) => sum + vote.stakeAmount, 0);
    const percentage = poll.totalStake > 0 ? (totalStakeForOption / poll.totalStake) * 100 : 0;

    return {
      option,
      votes: votes.length,
      totalStake: totalStakeForOption,
      percentage
    };
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-textSecondary mb-1">
            <span>Poll #{poll.pollId}</span>
            <span>•</span>
            <span>{poll.category}</span>
            <span>•</span>
            <span>Created {new Date(poll.creationTimestamp).toLocaleDateString()}</span>
          </div>
          <h1 className="text-2xl font-bold text-textPrimary">{poll.question}</h1>
        </div>
        <Button variant="outline" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>

      {/* Poll Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-textSecondary" />
              <span className="text-textPrimary">{poll.totalVotes} votes</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-textSecondary" />
              <span className="text-textPrimary">{formatTokenAmount(poll.totalStake)} staked</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-textSecondary" />
              <span className="text-textPrimary">{timeRemaining}</span>
            </div>
          </div>

          {isExpired && poll.outcome && (
            <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Decided: {poll.outcome}</span>
            </div>
          )}
        </div>

        {/* Creator Info */}
        <div className="flex items-center gap-3 p-3 bg-surface/50 rounded-lg">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm text-textPrimary">
              Created by {formatAddress(poll.creatorAddress)}
            </p>
            <ReputationBadge tier="silver" />
          </div>
        </div>
      </Card>

      {/* Vote Options */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">Vote Options</h3>
        <div className="space-y-4">
          {voteDistribution.map((option, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border transition-colors duration-200 ${
                option.option === poll.leadingOption
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-surface/50'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-textPrimary">{option.option}</span>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-textSecondary">{option.votes} votes</span>
                  <span className="text-textSecondary">{formatTokenAmount(option.totalStake)} staked</span>
                  <span className="font-medium text-textPrimary">{option.percentage.toFixed(1)}%</span>
                </div>
              </div>

              <div className="w-full bg-border rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    option.option === poll.leadingOption ? 'bg-primary' : 'bg-accent'
                  }`}
                  style={{ width: `${option.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {!isExpired && (
          <div className="mt-6 pt-6 border-t border-border">
            <Button
              onClick={() => setShowVoteModal(true)}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Cast Your Vote
            </Button>
          </div>
        )}
      </Card>

      {/* Recent Votes */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">Recent Votes</h3>
        {poll.votes.length > 0 ? (
          <div className="space-y-4">
            {poll.votes.slice(0, 10).map((vote) => (
              <div key={vote.voteId} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-surface rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-textSecondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-textPrimary">
                      {formatAddress(vote.voterAddress)}
                    </p>
                    <p className="text-xs text-textSecondary">
                      {new Date(vote.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-textPrimary">{vote.optionChosen}</p>
                  <div className="flex items-center gap-2 text-xs text-textSecondary">
                    <span>{formatTokenAmount(vote.stakeAmount)} staked</span>
                    <span>•</span>
                    <span>Rep: {vote.reputationAtVote}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-textSecondary text-center py-8">No votes yet</p>
        )}
      </Card>

      {/* Vote Modal */}
      {showVoteModal && (
        <VoteModal
          poll={poll}
          onClose={() => setShowVoteModal(false)}
        />
      )}
    </div>
  );
}

