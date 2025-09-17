'use client';

import { useParams } from 'next/navigation';
import { AppShell } from '../../../components/AppShell';
import { UserProfile } from '../../../components/UserProfile';

export default function ProfilePage() {
  const params = useParams();
  const address = params.address as string;

  return (
    <AppShell>
      <div className="container py-6">
        <UserProfile address={address} />
      </div>
    </AppShell>
  );
}

