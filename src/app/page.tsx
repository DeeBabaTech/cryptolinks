'use client';

import { useEffect, useState } from 'react';
import { Section, Cell, List, Placeholder } from '@telegram-apps/telegram-ui';
import { useInitData, type User } from '@telegram-apps/sdk-react';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showPremiumCheck, setShowPremiumCheck] = useState(false);
  const initData = useInitData();

  useEffect(() => {
    if (initData && initData.user) {
      setUser(initData.user);
      setTimeout(() => setShowWelcome(true), 1000); // Show welcome message after 1 second
    }
  }, [initData]);

  useEffect(() => {
    if (showWelcome) {
      setTimeout(() => setShowPremiumCheck(true), 2000); // Show premium check animation after 2 seconds
    }
  }, [showWelcome]);

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

  if (!showWelcome) {
    return (
      <Placeholder
        header="Welcome!"
        description="Getting things ready..."
      >
        <img
          alt="Welcome"
          src="https://xelene.me/welcome.gif" // Add a welcome gif if you have one
          style={{ display: 'block', width: '144px', height: '144px' }}
        />
      </Placeholder>
    );
  }

  if (!showPremiumCheck) {
    return (
      <Placeholder
        header="Checking Premium Status"
        description="Please wait..."
      >
        <img
          alt="Checking"
          src="https://xelene.me/checking.gif" // Add a premium check gif if you have one
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
