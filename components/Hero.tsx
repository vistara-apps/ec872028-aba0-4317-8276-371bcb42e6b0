'use client';

import { Button } from './ui/Button';
import { Plus, TrendingUp } from 'lucide-react';

export function Hero() {
  return (
    <section className="text-center space-y-6 py-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-100 leading-tight">
          Smarter Community Decisions<br />
          with Crypto-Powered Polling
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Community-driven governance for DAOs and communities
        </p>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Enhance engagement and decision integrity through crypto-weighted voting
          and verified outcomes. Stake DEGEN/WETH to participate in polls that matter.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
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
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-gray-400">Stake Rewards</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-gray-400">Verified Outcomes</span>
        </div>
      </div>
    </section>
  );
}
