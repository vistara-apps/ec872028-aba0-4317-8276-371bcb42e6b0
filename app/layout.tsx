import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StakedVotes - Smarter Community Decisions',
  description: 'A community polling platform for DAOs and communities, enhancing engagement and decision integrity through crypto-weighted voting.',
  keywords: ['DAO', 'voting', 'governance', 'crypto', 'Base', 'DEGEN', 'WETH'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
