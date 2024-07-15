'use client';

import { useEffect, useState } from 'react';
import { Section, Cell, List, Placeholder } from '@telegram-apps/telegram-ui';
import { useInitData, type User } from '@telegram-apps/sdk-react';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingStage, setLoadingStage] = useState(0); // 0: fetching user data, 1: verifying, 2: getting things ready
  const [progress, setProgress] = useState(0);
  const initData = useInitData();

  useEffect(() => {
    if (initData && initData.user) {
      setUser(initData.user);
    }
  }, [initData]);

  useEffect(() => {
    if (loadingStage < 3) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 1;
          } else {
            clearInterval(interval);
            setLoadingStage((prevStage) => prevStage + 1);
            setProgress(0);
            return 0;
          }
        });
      }, 20); // Adjust the speed as necessary
      return () => clearInterval(interval);
    }
  }, [loadingStage]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Placeholder
            header="Loading"
            description="Fetching user data..."
          >
            <progress style={{ width: '100%' }} value={progress} max="100" />
          </Placeholder>
        </div>
      </div>
    );
  }

  if (loadingStage < 3) {
    let header = '';
    let description = '';

    if (loadingStage === 0) {
      header = 'Fetching User Data';
      description = 'Please wait...';
    } else if (loadingStage === 1) {
      header = 'Verifying Information';
      description = 'Please wait...';
    } else if (loadingStage === 2) {
      header = 'Getting Things Ready';
      description = 'Please wait...';
    }

    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Placeholder
            header={header}
            description={description}
          >
            <progress style={{ width: '100%' }} value={progress} max="100" />
          </Placeholder>
        </div>
      </div>
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
