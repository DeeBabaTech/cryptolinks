'use client';

import { useEffect, useState } from 'react';
import { Section, Cell, List, Placeholder } from '@telegram-apps/telegram-ui';
import { useInitData, type User } from '@telegram-apps/sdk-react';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const initData = useInitData();

  useEffect(() => {
    if (initData && initData.user) {
      setUser(initData.user);
    }
  }, [initData]);

  if (!user) {
    return (
      <Placeholder
        header="Loading"
        description="Fetching user data..."
      >
        <img
          alt="Loading"
          src="https://xelene.me/telegram.gif"
          style={{ display: 'block', width: '144px', height: '144px' }}
        />
      </Placeholder>
    );
  }

  return (
    <List>
      <Section header={`Welcome, ${user.firstName}!`}>
        <Cell subtitle="Here are your details:">
          <div><strong>ID:</strong> {user.id}</div>
          <div><strong>Username:</strong> {user.username}</div>
          <div><strong>First Name:</strong> {user.firstName}</div>
          <div><strong>Last Name:</strong> {user.lastName}</div>
          <div><strong>Language Code:</strong> {user.languageCode}</div>
          <div><strong>Is Premium:</strong> {user.isPremium ? 'Yes' : 'No'}</div>
        </Cell>
      </Section>
    </List>
  );
}
