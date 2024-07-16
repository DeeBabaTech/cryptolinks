'use client';

import { useEffect, useState } from 'react';
import { Section, Cell, List, Tabbar, Spinner, Avatar } from '@telegram-apps/telegram-ui';
import { useInitData, type User } from '@telegram-apps/sdk-react';

// Define navigation tabs
const tabs = [
  { id: 'profile', text: 'Profile', Icon: () => <Avatar size={24} src="https://avatars.githubusercontent.com/u/84640980?v=4" /> },
  { id: 'dailyRewards', text: 'Daily Rewards', Icon: () => <span style={{ fontSize: '24px' }} >🎁</span> },
  { id: 'tasks', text: 'Tasks', Icon: () => <span style={{ fontSize: '24px' }}>📋</span> },
];

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingStage, setLoadingStage] = useState(0); // 0: fetching user data, 1: verifying, 2: getting things ready
  const [progress, setProgress] = useState(0);
  const [currentTab, setCurrentTab] = useState(tabs[0].id);
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
      }, 3000); // Adjust the speed as necessary
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
            selected={id === currentTab} // Set the selected tab here
            onClick={() => setCurrentTab(id)}
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
          <div className="w-full mt-4">
            {currentTab === 'profile' && (
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
            )}

            {currentTab === 'dailyRewards' && (
              <div className="text-center">
                <h2>Daily Rewards</h2>
                <p>Earn points by logging in daily!</p>
              </div>
            )}

            {currentTab === 'tasks' && (
              <div className="text-center">
                <h2>Tasks</h2>
                <p>Complete tasks to earn rewards!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
