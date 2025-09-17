'use client';

import { useState } from 'react';
import { Wallet, User, LogOut } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { ReputationBadge } from './ReputationBadge';
import { formatAddress, formatTokenAmount, getReputationTier } from '../lib/utils';

export function WalletConnector() {
  const [isConnected, setIsConnected] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // Mock user data
  const mockUser = {
    address: '0x1234567890123456789012345678901234567890',
    balance: {
      DEGEN: 1250.75,
      WETH: 0.45
    },
    reputation: 750,
    pollsCreated: 12,
    pollsVoted: 89
  };

  const handleConnect = async () => {
    // Simulate wallet connection
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setShowProfile(false);
  };

  if (!isConnected) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <Button onClick={handleConnect} className="bg-blue-600 hover:bg-blue-700 shadow-lg">
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40">
        <Button
          onClick={() => setShowProfile(!showProfile)}
          variant="outline"
          className="bg-gray-800/80 backdrop-blur-sm shadow-lg"
        >
          <User className="w-4 h-4 mr-2" />
          {formatAddress(mockUser.address)}
        </Button>
      </div>

      {showProfile && (
        <div className="fixed bottom-16 right-4 z-40">
          <Card className="w-80 p-4 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-100">
                      {formatAddress(mockUser.address)}
                    </p>
                    <ReputationBadge tier={getReputationTier(mockUser.reputation)} />
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleDisconnect}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Token Balances</p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-100">DEGEN</span>
                      <span className="text-sm font-medium text-gray-100">
                        {formatTokenAmount(mockUser.balance.DEGEN)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-100">WETH</span>
                      <span className="text-sm font-medium text-gray-100">
                        {formatTokenAmount(mockUser.balance.WETH)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Activity</p>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-100">
                        {mockUser.pollsCreated}
                      </p>
                      <p className="text-xs text-gray-400">Polls Created</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-100">
                        {mockUser.pollsVoted}
                      </p>
                      <p className="text-xs text-gray-400">Votes Cast</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Reputation Score</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((mockUser.reputation / 1000) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-100">
                      {mockUser.reputation}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
