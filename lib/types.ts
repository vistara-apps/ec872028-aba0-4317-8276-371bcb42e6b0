export interface User {
  walletAddress: string;
  reputationScore: number;
  stakedAmount: number;
  stakedToken: 'DEGEN' | 'WETH';
  pollHistory: string[];
}

export interface Poll {
  pollId: string;
  creatorAddress: string;
  question: string;
  options: string[];
  creationTimestamp: number;
  expiryTimestamp: number;
  totalStake: number;
  outcome?: string;
  onChainRecordHash?: string;
  isActive: boolean;
  category?: string;
}

export interface Vote {
  voteId: string;
  pollId: string;
  voterAddress: string;
  optionChosen: string;
  stakeAmount: number;
  timestamp: number;
  reputationAtVote: number;
}

export interface PollWithVotes extends Poll {
  votes: Vote[];
  userVote?: Vote;
  totalVotes: number;
  leadingOption?: string;
}

export type ReputationTier = 'bronze' | 'silver' | 'gold';

export interface CreatePollData {
  question: string;
  options: string[];
  duration: number; // in hours
  minStake: number;
  category: string;
}
