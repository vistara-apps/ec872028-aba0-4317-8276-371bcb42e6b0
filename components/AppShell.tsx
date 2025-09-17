'use client';

import { useState } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { WalletConnector } from './WalletConnector';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header onMenuToggle={() => setIsNavOpen(!isNavOpen)} />

      {/* Mobile Navigation Overlay */}
      {isNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsNavOpen(false)}
          />
          <div className="absolute top-0 left-0 w-64 h-full bg-gray-800 border-r border-gray-700">
            <Navigation onClose={() => setIsNavOpen(false)} />
          </div>
        </div>
      )}

      <main className="pb-16 lg:pb-0">
        {children}
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden">
        <Navigation />
      </div>

      {/* Wallet Connector */}
      <WalletConnector />
    </div>
  );
}
