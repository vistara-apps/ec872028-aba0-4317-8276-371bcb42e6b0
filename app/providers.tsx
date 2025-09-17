'use client';

import { MiniKitProvider } from '@coinbase/minikit';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base, mainnet } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

const config = createConfig({
  chains: [base, mainnet],
  connectors: [
    coinbaseWallet({
      appName: 'StakedVotes',
      appLogoUrl: '/logo.png',
    }),
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    }),
  ],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <MiniKitProvider
        chain={base}
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ''}
      >
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ''}
          chain={base}
        >
          {children}
        </OnchainKitProvider>
      </MiniKitProvider>
    </WagmiProvider>
  );
}
