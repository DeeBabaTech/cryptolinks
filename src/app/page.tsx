'use client';

import { useEffect, useState } from 'react';
import { Section, Cell, List, Placeholder, Avatar } from '@telegram-apps/telegram-ui';
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
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="text-center" style={{ marginTop: '2rem' }}>
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

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Avatar
        size={96}
        src={user.photoUrl || 'https://avatars.githubusercontent.com/u/84640980?v=4'} // Default image if photoUrl is not available
      />
      <List className="w-full mt-4">
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
    </div>
  );
}
