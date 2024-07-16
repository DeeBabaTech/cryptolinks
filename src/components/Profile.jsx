import React, { useState } from 'react';
import { List, Avatar } from '@telegram-apps/telegram-ui';
import AvatarSelector from './AvatarSelector';
import Modal from './Modal';

// Function to determine level based on points
const getLevel = (points) => {
  if (points >= 900) return "Icon";
  if (points >= 800) return "Legend";
  if (points >= 700) return "Hero";
  if (points >= 600) return "Master";
  if (points >= 500) return "Champion";
  if (points >= 400) return "Ambassador";
  if (points >= 300) return "Influencer";
  if (points >= 200) return "Contributor";
  if (points >= 100) return "Explorer";
  return "Novice";
};

// Array of all levels
const levels = [
  { name: "Novice", icon: "🌱" },
  { name: "Explorer", icon: "🌍" },
  { name: "Contributor", icon: "🛠️" },
  { name: "Influencer", icon: "🌟" },
  { name: "Ambassador", icon: "🕊️" },
  { name: "Champion", icon: "🏆" },
  { name: "Master", icon: "🧙‍♂️" },
  { name: "Hero", icon: "🦸‍♂️" },
  { name: "Legend", icon: "🌠" },
  { name: "Icon", icon: "🔱" }
];

const Profile = ({ user }) => {
  const userPoints = 450; // Replace with actual points
  const userStage = getLevel(userPoints);

  const [selectedAvatar, setSelectedAvatar] = useState(user.photoUrl || '/avatars/default.png');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setIsModalOpen(false); // Close the modal after selecting an avatar
    // Save the selected avatar to the user's profile (e.g., via an API call)
  };

  const handleLevelClick = () => {
    setModalContent(
      <div>
        <div className="font-bold mb-4">All Levels</div>
        <div className="grid gap-2">
          {levels.map((level, index) => (
            <div 
              key={index} 
              className={`p-2 rounded-md flex items-center space-x-2 ${level.name === userStage ? 'bg-blue-500 text-white' : 'bg-gray-800 text-white'}`}
            >
              <span>{level.icon}</span>
              <span>{level.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
    setIsModalOpen(true);
  };

  const handleAvatarClick = () => {
    setModalContent(
      <AvatarSelector onSelect={handleAvatarSelect} />
    );
    setIsModalOpen(true);
  };

  return (
    <List className="w-full mt-4 p-4 shadow-md rounded-lg">
      <div className="flex flex-col items-center">
        {/* Profile Avatar and Premium Badge */}
        <div className="relative mb-4" onClick={handleAvatarClick}>
          <Avatar
            className="animated-avatar cursor-pointer border-2 border-gray-300 rounded-full"
            fallbackIcon={<span>👤</span>}
            size={96}
            src={selectedAvatar}
          />
          {user.isPremium && (
            <div className="absolute top-0 right-0 bg-blue-500 text-white rounded-full p-1 text-xs">
              ⭐
            </div>
          )}
        </div>

        {/* User Information */}
        <div className="text-center mb-4">
          <div className="text-lg font-bold">
            {user.firstName} {user.lastName}
            {user.isPremium && <span className="text-blue-500"> ⭐</span>}
          </div>
          <div className="text-gray-500">@{user.username}</div>
          <div className="text-sm text-gray-700 mt-2 cursor-pointer" onClick={handleLevelClick}>
            Level: {getLevel(userPoints)}
          </div>
        </div>

        {/* Follow Information */}
        <div className="flex mb-4 space-x-4">
          <div className="text-center">
            <div className="font-bold">Followers</div>
            <div className="text-gray-500">123</div> {/* Replace with actual data */}
          </div>
          <div className="text-center">
            <div className="font-bold">Following</div>
            <div className="text-gray-500">456</div> {/* Replace with actual data */}
          </div>
        </div>

        {/* Invite Button */}
        <div className="mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Invite More
          </button>
        </div>

        {/* Achievements */}
        <div className="w-full mb-4">
          <div className="text-center font-bold mb-2">Achievements</div>
          <div className="text-center">🏆 <strong>Points Earned:</strong> {userPoints}</div> {/* Replace with actual data */}
          <div className="text-center">🥇 <strong>Top Rank:</strong> #1</div> {/* Replace with actual data */}
        </div>

        {/* Recent Activity */}
        <div className="w-full mb-4">
          <div className="text-center font-bold mb-2">Recent Activity</div>
          <div className="text-center">✔️ Completed daily reward task</div> {/* Replace with actual data */}
          <div className="text-center">✔️ Followed new user @example</div> {/* Replace with actual data */}
        </div>
      </div>

      {/* Levels/Avatar Selection Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {modalContent}
        </Modal>
      )}
    </List>
  );
};

export default Profile;
