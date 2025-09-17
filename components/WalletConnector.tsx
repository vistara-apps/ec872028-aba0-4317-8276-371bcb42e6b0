'use client';

import Link from 'next/link';
import { Wallet, User, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { formatAddress } from '../lib/utils';
import { useWallet } from '../lib/hooks/useWallet';

export function WalletConnector() {
  const {
    isConnected,
    address,
    isConnecting,
    connectWallet,
    disconnectWallet
  } = useWallet();

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  if (!isConnected) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="bg-primary hover:bg-primary/90 shadow-lg"
        >
          <Wallet className="w-4 h-4 mr-2" />
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <Card className="p-4 shadow-lg bg-surface/95 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-textSecondary">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Wallet not connected</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40">
        <Link href={`/profile/${address}`}>
          <Button
            variant="outline"
            className="bg-surface/80 backdrop-blur-sm shadow-lg"
          >
            <User className="w-4 h-4 mr-2" />
            {formatAddress(address)}
          </Button>
        </Link>
      </div>
    </>
  );
}
