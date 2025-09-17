'use client';

import { AppShell } from '../../components/AppShell';
import { AnalyticsDashboard } from '../../components/AnalyticsDashboard';

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-textPrimary mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-textSecondary">
            Comprehensive insights into poll performance, community engagement, and voting trends.
          </p>
        </div>

        <AnalyticsDashboard />
      </div>
    </AppShell>
  );
}

