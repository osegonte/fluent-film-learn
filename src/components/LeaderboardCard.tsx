
import React from 'react';
import { Flame } from 'lucide-react';

interface LeaderboardCardProps {
  user: {
    rank: number;
    name: string;
    points: number;
    avatar: string;
    streak: number;
    isCurrentUser?: boolean;
  };
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ user }) => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-600';
    if (rank === 2) return 'text-gray-500';
    if (rank === 3) return 'text-orange-600';
    return 'text-gray-400';
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-yellow-50';
    if (rank === 2) return 'bg-gray-50';
    if (rank === 3) return 'bg-orange-50';
    return 'bg-gray-50';
  };

  return (
    <div className={`bg-white rounded-xl p-4 mb-3 shadow-sm ${
      user.isCurrentUser ? 'ring-2 ring-blue-200 bg-blue-50' : ''
    }`}>
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getRankBg(user.rank)}`}>
          <span className={`font-bold text-sm ${getRankColor(user.rank)}`}>
            #{user.rank}
          </span>
        </div>
        
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-xl">{user.avatar}</span>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-black">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.points.toLocaleString()} points</p>
        </div>
        
        <div className="flex items-center">
          <Flame size={16} className="text-orange-500 mr-1" />
          <span className="text-sm font-medium text-gray-700">{user.streak}</span>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;
