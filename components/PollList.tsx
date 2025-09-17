'use client';

import { useState } from 'react';
import { PollCard } from './PollCard';
import { Button } from './ui/Button';
import { Filter } from 'lucide-react';
import type { PollWithVotes } from '../lib/types';

// Mock data for demonstration
const mockPolls: PollWithVotes[] = [
  {
    pollId: '1',
    creatorAddress: '0x1234...5678',
    question: 'Should we implement a new governance token?',
    options: ['Yes, implement immediately', 'Yes, but with modifications', 'No, keep current system'],
    creationTimestamp: Date.now() - 86400000, // 1 day ago
    expiryTimestamp: Date.now() + 86400000 * 2, // 2 days from now
    totalStake: 1250.5,
    isActive: true,
    category: 'Governance',
    votes: [],
    totalVotes: 45,
    leadingOption: 'Yes, but with modifications'
  },
  {
    pollId: '2',
    creatorAddress: '0x8765...4321',
    question: 'Which marketing strategy should we prioritize?',
    options: ['Social media campaigns', 'Influencer partnerships', 'Community events', 'Content creation'],
    creationTimestamp: Date.now() - 43200000, // 12 hours ago
    expiryTimestamp: Date.now() + 86400000, // 1 day from now
    totalStake: 890.25,
    isActive: true,
    category: 'Marketing',
    votes: [],
    totalVotes: 32,
    leadingOption: 'Community events'
  },
  {
    pollId: '3',
    creatorAddress: '0x9999...1111',
    question: 'Should we increase the minimum stake requirement?',
    options: ['Yes, increase to 1 DEGEN', 'Keep current 0.1 DEGEN', 'Decrease to 0.05 DEGEN'],
    creationTimestamp: Date.now() - 172800000, // 2 days ago
    expiryTimestamp: Date.now() - 3600000, // 1 hour ago (expired)
    totalStake: 2100.75,
    isActive: false,
    category: 'Governance',
    votes: [],
    totalVotes: 78,
    leadingOption: 'Keep current 0.1 DEGEN',
    outcome: 'Keep current 0.1 DEGEN'
  }
];

export function PollList() {
  const [filter, setFilter] = useState<'all' | 'active' | 'closed'>('all');
  const [category, setCategory] = useState<string>('all');

  const filteredPolls = mockPolls.filter(poll => {
    if (filter === 'active' && !poll.isActive) return false;
    if (filter === 'closed' && poll.isActive) return false;
    if (category !== 'all' && poll.category !== category) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-2xl font-semibold text-textPrimary">Active Polls</h2>
        
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'active' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button
            variant={filter === 'closed' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('closed')}
          >
            Closed
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredPolls.map((poll) => (
          <PollCard key={poll.pollId} poll={poll} />
        ))}
      </div>

      {filteredPolls.length === 0 && (
        <div className="text-center py-12">
          <p className="text-textSecondary">No polls found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
