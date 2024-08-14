import { useState, useEffect } from 'react';

const ranks = [
  { name: "Newbie", icon: "🌱", points: 0 },
  { name: "Explorer", icon: "🌍", points: 100 },
  { name: "Airdropper", icon: "✈️", points: 200 },
  { name: "Enthusiast", icon: "🚀", points: 300 },
  { name: "Hodler", icon: "💎", points: 400 },
  { name: "Trader", icon: "📈", points: 500 },
  { name: "Miner", icon: "⛏️", points: 600 },
  { name: "Validator", icon: "🔗", points: 700 },
  { name: "Whale", icon: "🐋", points: 800 },
  { name: "Satoshi", icon: "🔱", points: 900 }
];

export default function TapToEarnTab() {
  const [totalPoints, setTotalPoints] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [canClaim, setCanClaim] = useState(false);
  const [lastClaimTime, setLastClaimTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const storedPoints = localStorage.getItem('totalPoints');
    const storedTime = localStorage.getItem('lastClaimTime');

    if (storedPoints) {
      setTotalPoints(parseInt(storedPoints)); // Retrieve and set total points from localStorage
    }

    if (storedTime) {
      const parsedTime = new Date(storedTime);
      setLastClaimTime(parsedTime);
      const elapsedTime = (new Date() - parsedTime) / 1000 / 3600; // Convert ms to hours
      if (elapsedTime < 12) {
        setCanClaim(false);
        setTimeLeft(12 - elapsedTime);
        setProgressPercentage((elapsedTime / 12) * 100);
        setIsSpinning(true);
      } else {
        setCanClaim(true);
        setTimeLeft(0);
        setProgressPercentage(100);
        setIsSpinning(false);
      }
    }
  }, []);

  // Determine the user's level based on totalPoints
  const userLevel = ranks.find(rank => totalPoints >= rank.points);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTap = () => {
    if (!canClaim && !isSpinning) {
      setIsSpinning(true);
      setProgressPercentage(0);
      const progressInterval = setInterval(() => {
        setProgressPercentage(prev => {
          const newProgress = prev + (100 / (12 * 3600)); // Increment per second
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setIsSpinning(false);
            setCanClaim(true);
            setTimeLeft(0);
          }
          return newProgress;
        });
      }, 1000); // Update progress every second
    }
  };

  const handleClaim = () => {
    if (canClaim) {
      const now = new Date();
      const newTotalPoints = totalPoints + 5;
      setTotalPoints(newTotalPoints);
      localStorage.setItem('totalPoints', newTotalPoints.toString());
      setLastClaimTime(now);
      localStorage.setItem('lastClaimTime', now.toISOString());
      setCanClaim(false);
      setProgressPercentage(0);
      setTimeLeft(12);
      setIsSpinning(true);
    }
  };

  const formatTimeLeft = (hours) => {
    const hrs = Math.floor(hours);
    const mins = Math.floor((hours - hrs) * 60);
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-white font-sans">
      {/* Display total points */}
      <div className="text-center mt-8 mb-4">
        <h2 className="text-4xl font-bold mb-2">{totalPoints} Points</h2>
        <p className="text-lg mb-4">Tap the avatar to collect rewards!</p>
        
        {/* User Level Display with Click to Open Modal */}
        <div 
          className="flex items-center justify-center space-x-2 mb-2 cursor-pointer"
          onClick={openModal}
        >
          <span className="text-2xl">{userLevel?.icon}</span>
          <span className="text-lg font-semibold">{userLevel?.name}</span>
        </div>
      </div>

      {/* Avatar section with click handling and spinning animation */}
      <div className="relative rounded-lg p-4 mb-8 cursor-pointer">
        <div
          className={`w-36 h-36 rounded-full overflow-hidden ${isSpinning ? 'animate-spin' : ''}`}
          onClick={handleTap}
        >
          <img
            src="/coin.webp" // Replace with your image path relative to the public directory
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Token collection progress */}
      <div className="flex items-center justify-center w-full mb-8">
        <div className="bg-gray-800 w-64 rounded-full h-8 overflow-hidden relative">
          <div
            className="bg-blue-500 h-full text-center text-white font-bold absolute inset-y-0 left-0"
            style={{ width: `${progressPercentage}%` }}
          >
            {progressPercentage.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Claim Reward button */}
      <div className="flex flex-col items-center justify-center text-center">
        <button
          className={`py-2 px-4 rounded-lg focus:outline-none ${canClaim ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-500 text-gray-300'}`}
          onClick={handleClaim}
          disabled={!canClaim}
        >
          {canClaim ? 'Claim Reward' : `Come back in ${formatTimeLeft(timeLeft)}`}
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-gray-900">
            <h2 className="text-xl font-bold mb-4">All Ranks</h2>
            <div className="grid gap-2">
              {ranks.map((rank, index) => (
                <div 
                  key={index} 
                  className={`p-2 rounded-md flex items-center space-x-2 ${rank.name === userLevel.name ? 'bg-blue-500 text-white' : 'bg-gray-800 text-white'}`}
                >
                  <span>{rank.icon}</span>
                  <span>{rank.name}</span>
                  <span className="ml-auto text-xs text-gray-400">{rank.points} XP</span>
                </div>
              ))}
            </div>
            <button
              className="mt-4 py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
