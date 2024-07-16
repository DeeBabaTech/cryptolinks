import React from 'react';
import { List, Section, Cell, Avatar } from '@telegram-apps/telegram-ui';

const Profile = ({ user }) => {
  return (
    <List className="w-full mt-4">
      <Section header={`Welcome, ${user.firstName}!`}>
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <Avatar
              className="animated-avatar"
              fallbackIcon={<span>👤</span>}
              size={96}
              src={user.photoUrl || '/user.png'} // Use user.png from public folder if no photoUrl
            />
            {user.isPremium && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white rounded-full p-1 text-xs">
                ⭐
              </div>
            )}
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">
              {user.firstName} {user.lastName}
              {user.isPremium && <span className="text-blue-500"> ⭐</span>}
            </div>
            <div className="text-gray-500">@{user.username}</div>
          </div>
          <div className="flex mt-4 space-x-4">
            <div className="text-center">
              <div className="font-bold">Followers</div>
              <div className="text-gray-500">123</div> {/* Replace with actual data */}
            </div>
            <div className="text-center">
              <div className="font-bold">Following</div>
              <div className="text-gray-500">456</div> {/* Replace with actual data */}
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Invite More
            </button>
          </div>
        </div>
      </Section>
      <Section header="Your Details">
        <Cell subtitle="">
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
};

export default Profile;
