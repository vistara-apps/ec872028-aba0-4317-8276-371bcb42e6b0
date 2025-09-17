# StakedVotes - Smarter Community Decisions with Crypto-Powered Polling

A community polling platform for DAOs and communities, enhancing engagement and decision integrity through crypto-weighted voting and verified outcomes.

## Features

- **Stake-Weighted Voting**: Users stake DEGEN/WETH to vote, with voting power proportional to their stake
- **Reputation System**: Users earn reputation points based on consistent, positive participation
- **On-Chain Verified Outcomes**: Poll results are recorded immutably on the Base blockchain
- **Premium Analytics & Insights**: Detailed dashboards showing poll performance and community engagement
- **User/Community Profiles**: Profiles showcasing voting history, reputation scores, and staked tokens

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base Network
- **Wallet Integration**: MiniKit + OnchainKit
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your OnchainKit API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key for Base network integration

## Architecture

The app follows a modular component architecture with:

- **Core Components**: AppShell, Header, Navigation
- **Poll Components**: PollCard, PollList, VoteModal
- **UI Components**: Button, Card, Input with consistent design system
- **Utility Functions**: Address formatting, token calculations, reputation management

## Design System

- **Colors**: Dark theme with accent colors for crypto-native feel
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing scale (xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 24px)
- **Components**: Reusable UI components with variants

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
