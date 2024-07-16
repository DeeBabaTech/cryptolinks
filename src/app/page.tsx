'use client';

import { useEffect, useState } from 'react';
import { Section, Cell, List, Placeholder, Avatar, Tabbar, Spinner } from '@telegram-apps/telegram-ui';
import { useInitData, type User } from '@telegram-apps/sdk-react';

// Define navigation tabs
const tabs = [
  { id: 'profile', text: 'Profile', Icon: () => <Avatar size={24} src="https://avatars.githubusercontent.com/u/84640980?v=4" /> },
  { id: 'settings', text: 'Settings', Icon: () => <span>⚙️</span> },
  { id: 'notifications', text: 'Notifications', Icon: () => <span>🔔</span> },
];

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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <Tabbar>
        {tabs.map(({ id, text, Icon }) => (
          <Tabbar.Item
            key={id}
            text={text}
            selected={id === 'profile'} // Set the initial selected tab here
            onClick={() => {
              // Handle tab click logic (navigate to different sections)
            }}
          >
            <Icon />
          </Tabbar.Item>
        ))}
      </Tabbar>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center">
        {loadingStage < 3 && !user && (
          <div className="flex items-center justify-center min-h-screen w-full">
            <div className="text-center">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                }}
              >
                <Spinner size="m" />
              </div>
            </div>
          </div>
        )}

        {user && loadingStage >= 3 && (
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
        )}
      </div>
    </div>
  );
}
