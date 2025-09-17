import { AppShell } from '../components/AppShell';
import { Hero } from '../components/Hero';
import { PollList } from '../components/PollList';
import { TrendingPolls } from '../components/TrendingPolls';

export default function HomePage() {
  return (
    <AppShell>
      <div className="container py-6 space-y-8">
        <Hero />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PollList />
          </div>
          <div className="lg:col-span-1">
            <TrendingPolls />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
