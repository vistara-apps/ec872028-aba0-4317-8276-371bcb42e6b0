'use client';

import { Button } from './ui/Button';
import { Plus, TrendingUp } from 'lucide-react';

export function Hero() {
  return (
    <section className="text-center space-y-6 py-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-textPrimary leading-tight">
          Create your crestfy your<br />
          Decision-Making & Polls
        </h1>
        
        <p className="text-lg text-textSecondary max-w-2xl mx-auto">
          Community-driven Community Governances
        </p>
        
        <p className="text-textSecondary max-w-2xl mx-auto">
          This web3 the community's due turns governance looking polls 
          your entity owner and for community to go each the objects 
          the trades DEGEN ton verification can monitors and WETH 
          decentralized trusting.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full">
          <Plus className="w-4 h-4 mr-2" />
          Create Poll
        </Button>
        
        <Button variant="outline" className="px-6 py-3 rounded-full">
          <TrendingUp className="w-4 h-4 mr-2" />
          View Polls
        </Button>
      </div>

      <div className="flex justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full"></div>
          <span className="text-textSecondary">Pool Rewards</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-textSecondary">Features</span>
        </div>
      </div>
    </section>
  );
}
