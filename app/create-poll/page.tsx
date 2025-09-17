'use client';

import { AppShell } from '../../components/AppShell';
import { CreatePollForm } from '../../components/CreatePollForm';

export default function CreatePollPage() {
  return (
    <AppShell>
      <div className="container py-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-textPrimary mb-2">
              Create New Poll
            </h1>
            <p className="text-textSecondary">
              Create a stake-weighted poll for your community. Set your question,
              options, and parameters to engage participants with crypto incentives.
            </p>
          </div>

          <CreatePollForm />
        </div>
      </div>
    </AppShell>
  );
}

