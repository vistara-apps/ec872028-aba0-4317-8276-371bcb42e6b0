'use client';

import { useParams } from 'next/navigation';
import { AppShell } from '../../../components/AppShell';
import { PollDetails } from '../../../components/PollDetails';

export default function PollDetailsPage() {
  const params = useParams();
  const pollId = params.id as string;

  return (
    <AppShell>
      <div className="container py-6">
        <PollDetails pollId={pollId} />
      </div>
    </AppShell>
  );
}

