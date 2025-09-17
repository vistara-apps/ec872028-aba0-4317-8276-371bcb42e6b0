'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, TrendingUp, Users, Calendar, Award, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { ReputationBadge } from './ReputationBadge';
import { formatAddress, formatTokenAmount, getReputationTier } from '../lib/utils';
import type { User, PollWithVotes } from '../lib/types';

interface UserProfileProps {
  address: string;
}

export function UserProfile({ address }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userPolls, setUserPolls] = useState<PollWithVotes[]>([]);
  const [userVotes, setUserVotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in production, this would come from on-chain data and APIs
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        walletAddress: address,
        reputationScore: 750,
        stakedAmount: 1250.75,
        stakedToken: 'DEGEN',
        pollHistory: ['poll_1', 'poll_2', 'poll_3']
      };

      const mockPolls: PollWithVotes[] = [
        {
          pollId: 'poll_1',
          creatorAddress: address,
          question: 'Should we implement quadratic voting?',
          options: ['Yes', 'No', 'Maybe'],
          creationTimestamp: Date.now() - 86400000 * 7,
          expiryTimestamp: Date.now() - 86400000 * 2,
          totalStake: 500,
          isActive: false,
          outcome: 'Yes',
          category: 'Governance',
          votes: [],
          totalVotes: 25,
          leadingOption: 'Yes'
        },
        {
          pollId: 'poll_2',
          creatorAddress: address,
          question: 'Which feature should we prioritize?',
          options: ['Mobile App', 'Analytics Dashboard', 'API Improvements'],
          creationTimestamp: Date.now() - 86400000 * 14,
          expiryTimestamp: Date.now() - 86400000 * 7,
          totalStake: 750,
          isActive: false,
          outcome: 'Analytics Dashboard',
          category: 'Development',
          votes: [],
          totalVotes: 40,
          leadingOption: 'Analytics Dashboard'
        }
      ];

      const mockVotes = [
        {
          pollId: 'poll_external_1',
          option: 'Yes',
          stakeAmount: 50,
          timestamp: Date.now() - 86400000 * 3,
          reputationAtVote: 700
        },
        {
          pollId: 'poll_external_2',
          option: 'Community Events',
          stakeAmount: 25,
          timestamp: Date.now() - 86400000 * 5,
          reputationAtVote: 720
        }
      ];

      setUser(mockUser);
      setUserPolls(mockPolls);
      setUserVotes(mockVotes);
      setLoading(false);
    };

    fetchUserData();
  }, [address]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textSecondary">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-textSecondary">User not found</p>
        <Link href="/">
          <Button className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const reputationTier = getReputationTier(user.reputationScore);
  const totalStaked = user.stakedAmount;
  const totalPollsCreated = userPolls.length;
  const totalVotesCast = userVotes.length;

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
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">User Profile</h1>
          <p className="text-textSecondary">{formatAddress(user.walletAddress)}</p>
        </div>
      </div>

      {/* Profile Overview */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-semibold text-textPrimary">
                  {formatAddress(user.walletAddress)}
                </h2>
                <ReputationBadge tier={reputationTier} />
              </div>
              <p className="text-textSecondary">
                Member since {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-lg font-semibold text-textPrimary">
                  {user.reputationScore}
                </span>
              </div>
              <p className="text-xs text-textSecondary">Reputation</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-lg font-semibold text-textPrimary">
                  {formatTokenAmount(totalStaked)}
                </span>
              </div>
              <p className="text-xs text-textSecondary">Total Staked</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-lg font-semibold text-textPrimary">
                  {totalPollsCreated}
                </span>
              </div>
              <p className="text-xs text-textSecondary">Polls Created</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="w-4 h-4 text-purple-400" />
                <span className="text-lg font-semibold text-textPrimary">
                  {totalVotesCast}
                </span>
              </div>
              <p className="text-xs text-textSecondary">Votes Cast</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Reputation Progress */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">Reputation Progress</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-textPrimary">Current Tier: {reputationTier}</span>
            <span className="text-sm text-textSecondary">{user.reputationScore} points</span>
          </div>
          <div className="w-full bg-border rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((user.reputationScore / 1000) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-textSecondary">
            <span>Bronze (0)</span>
            <span>Silver (500)</span>
            <span>Gold (1000+)</span>
          </div>
        </div>
      </Card>

      {/* Created Polls */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">Created Polls</h3>
        {userPolls.length > 0 ? (
          <div className="space-y-4">
            {userPolls.map((poll) => (
              <div key={poll.pollId} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-textPrimary mb-2">{poll.question}</h4>
                    <div className="flex items-center gap-4 text-sm text-textSecondary">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(poll.creationTimestamp).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {formatTokenAmount(poll.totalStake)} staked
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {poll.totalVotes} votes
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {poll.outcome && (
                      <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                        {poll.outcome}
                      </span>
                    )}
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-textSecondary text-center py-8">No polls created yet</p>
        )}
      </Card>

      {/* Recent Votes */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">Recent Votes</h3>
        {userVotes.length > 0 ? (
          <div className="space-y-4">
            {userVotes.map((vote, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-textPrimary">{vote.option}</p>
                    <p className="text-sm text-textSecondary">
                      Poll #{vote.pollId} • {new Date(vote.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-textPrimary">
                      {formatTokenAmount(vote.stakeAmount)} staked
                    </p>
                    <p className="text-sm text-textSecondary">
                      Rep: {vote.reputationAtVote}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-textSecondary text-center py-8">No votes cast yet</p>
        )}
      </Card>
    </div>
  );
}

