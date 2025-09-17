'use client';

import { useState } from 'react';
import { X, TrendingUp, Lock } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { SUPPORTED_TOKENS } from '../lib/constants';
import { formatTokenAmount, calculateVotingPower } from '../lib/utils';
import type { PollWithVotes } from '../lib/types';

interface VoteModalProps {
  poll: PollWithVotes;
  onClose: () => void;
}

export function VoteModal({ poll, onClose }: VoteModalProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState<'DEGEN' | 'WETH'>('DEGEN');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userReputation = 750; // Mock user reputation
  const votingPower = stakeAmount ? calculateVotingPower(parseFloat(stakeAmount), userReputation) : 0;

  const handleVote = async () => {
    if (!selectedOption || !stakeAmount) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with the actual blockchain transaction
      console.log('Vote submitted:', {
        pollId: poll.pollId,
        option: selectedOption,
        stake: stakeAmount,
        token: selectedToken,
        votingPower
      });
      
      onClose();
    } catch (error) {
      console.error('Vote failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-gray-100">Cast Your Vote</h2>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-100 mb-2">{poll.question}</h3>
              <p className="text-sm text-gray-400">
                Select your preferred option and stake tokens to vote
              </p>
            </div>

            {/* Option Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-100">Choose Option</label>
              <div className="space-y-2">
                {poll.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedOption(option)}
                    className={`w-full p-3 text-left rounded-md border transition-colors duration-200 ${
                      selectedOption === option
                        ? 'border-blue-500 bg-blue-500/10 text-gray-100'
                        : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Token Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-100">Stake Token</label>
              <div className="flex gap-2">
                {Object.entries(SUPPORTED_TOKENS).map(([key, token]) => (
                  <Button
                    key={key}
                    variant={selectedToken === key ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedToken(key as 'DEGEN' | 'WETH')}
                    className="flex-1"
                  >
                    {token.symbol}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stake Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-100">Stake Amount</label>
              <Input
                type="number"
                placeholder="0.0"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                min="0.1"
                step="0.1"
              />
              <p className="text-xs text-gray-400">
                Minimum stake: 0.1 {selectedToken}
              </p>
            </div>

            {/* Voting Power Display */}
            {votingPower > 0 && (
              <Card className="p-3 bg-blue-500/5 border-blue-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-100">Voting Power</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-500">
                    {formatTokenAmount(votingPower, 2)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Based on your stake and reputation ({userReputation} points)
                </p>
              </Card>
            )}

            {/* Security Notice */}
            <Card className="p-3 bg-green-500/5 border-green-500/20">
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-100">Secure Voting</p>
                  <p className="text-xs text-gray-400">
                    Your vote will be recorded on-chain and cannot be changed once submitted.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleVote}
              disabled={!selectedOption || !stakeAmount || isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Submitting...' : 'Cast Vote'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
