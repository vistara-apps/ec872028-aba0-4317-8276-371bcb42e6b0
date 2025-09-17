'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, BarChart3, PieChart, Calendar, Award, Target, Zap } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface AnalyticsData {
  totalPolls: number;
  activePolls: number;
  totalVotes: number;
  totalStaked: number;
  averageParticipation: number;
  topCategories: Array<{ name: string; count: number; percentage: number }>;
  votingTrends: Array<{ date: string; votes: number; stake: number }>;
  reputationDistribution: Array<{ tier: string; count: number; percentage: number }>;
  pollPerformance: Array<{
    pollId: string;
    question: string;
    totalVotes: number;
    totalStake: number;
    participationRate: number;
    outcome: string;
  }>;
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockData: AnalyticsData = {
        totalPolls: 156,
        activePolls: 23,
        totalVotes: 2847,
        totalStaked: 45678.50,
        averageParticipation: 68.5,
        topCategories: [
          { name: 'Governance', count: 45, percentage: 28.8 },
          { name: 'Community', count: 38, percentage: 24.4 },
          { name: 'Development', count: 32, percentage: 20.5 },
          { name: 'Marketing', count: 25, percentage: 16.0 },
          { name: 'Treasury', count: 16, percentage: 10.3 }
        ],
        votingTrends: [
          { date: '2024-01-01', votes: 45, stake: 1250 },
          { date: '2024-01-02', votes: 67, stake: 1890 },
          { date: '2024-01-03', votes: 52, stake: 1450 },
          { date: '2024-01-04', votes: 78, stake: 2100 },
          { date: '2024-01-05', votes: 89, stake: 2350 }
        ],
        reputationDistribution: [
          { tier: 'Bronze', count: 1250, percentage: 65.2 },
          { tier: 'Silver', count: 450, percentage: 23.4 },
          { tier: 'Gold', count: 220, percentage: 11.4 }
        ],
        pollPerformance: [
          {
            pollId: 'poll_1',
            question: 'Should we implement quadratic voting?',
            totalVotes: 145,
            totalStake: 3450,
            participationRate: 78.5,
            outcome: 'Yes'
          },
          {
            pollId: 'poll_2',
            question: 'Which feature should we prioritize?',
            totalVotes: 98,
            totalStake: 2100,
            participationRate: 65.2,
            outcome: 'Analytics Dashboard'
          },
          {
            pollId: 'poll_3',
            question: 'Should we increase minimum stake?',
            totalVotes: 76,
            totalStake: 1800,
            participationRate: 52.1,
            outcome: 'Keep Current'
          }
        ]
      };

      setData(mockData);
      setLoading(false);
    };

    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textSecondary">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-textSecondary">Failed to load analytics data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex gap-2">
        {(['7d', '30d', '90d'] as const).map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTimeRange(range)}
          >
            {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
          </Button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-textPrimary">{data.totalPolls}</p>
              <p className="text-sm text-textSecondary">Total Polls</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-textPrimary">{data.totalVotes.toLocaleString()}</p>
              <p className="text-sm text-textSecondary">Total Votes</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-textPrimary">{data.totalStaked.toLocaleString()}</p>
              <p className="text-sm text-textSecondary">Total Staked</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Target className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-textPrimary">{data.averageParticipation}%</p>
              <p className="text-sm text-textSecondary">Avg Participation</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Poll Categories</h3>
          <div className="space-y-3">
            {data.topCategories.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <span className="text-textPrimary">{category.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-textSecondary w-12 text-right">
                    {category.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Reputation Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Reputation Distribution</h3>
          <div className="space-y-3">
            {data.reputationDistribution.map((tier) => (
              <div key={tier.tier} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className={`w-4 h-4 ${
                    tier.tier === 'Gold' ? 'text-yellow-400' :
                    tier.tier === 'Silver' ? 'text-gray-400' : 'text-orange-400'
                  }`} />
                  <span className="text-textPrimary">{tier.tier}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-border rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{ width: `${tier.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-textSecondary w-12 text-right">
                    {tier.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Voting Trends */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">Voting Trends</h3>
        <div className="space-y-4">
          {data.votingTrends.map((trend, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-textSecondary" />
                <span className="text-textPrimary">{trend.date}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-textPrimary">{trend.votes}</p>
                  <p className="text-xs text-textSecondary">Votes</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-textPrimary">{trend.stake.toLocaleString()}</p>
                  <p className="text-xs text-textSecondary">Staked</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Performing Polls */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">Top Performing Polls</h3>
        <div className="space-y-4">
          {data.pollPerformance.map((poll) => (
            <div key={poll.pollId} className="border border-border rounded-lg p-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-textPrimary mb-2">{poll.question}</h4>
                  <div className="flex items-center gap-4 text-sm text-textSecondary">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {poll.totalVotes} votes
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {poll.totalStake.toLocaleString()} staked
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {poll.participationRate}% participation
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                    {poll.outcome}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

