
import React, { useState } from 'react';
import { MessageSquare, Trophy } from 'lucide-react';
import LeaderboardCard from '../components/LeaderboardCard';
import CommunityPost from '../components/CommunityPost';

const CommunityScreen = () => {
  const [activeTab, setActiveTab] = useState('leaderboard');

  const leaderboardData = [
    { rank: 1, name: 'Maria García', points: 2847, avatar: '👩‍🎓', streak: 28 },
    { rank: 2, name: 'Alex Chen', points: 2651, avatar: '👨‍💻', streak: 21 },
    { rank: 3, name: 'Sophie Martin', points: 2398, avatar: '👩‍🎨', streak: 19 },
    { rank: 4, name: 'You', points: 1847, avatar: '🙋‍♂️', streak: 12, isCurrentUser: true },
    { rank: 5, name: 'James Wilson', points: 1654, avatar: '👨‍🔬', streak: 15 },
  ];

  const communityPosts = [
    {
      id: 1,
      user: 'Maria García',
      avatar: '👩‍🎓',
      time: '2h ago',
      content: 'Just finished my first Breaking Bad episode in Spanish! The slang is challenging but so rewarding 🎉',
      likes: 24,
      comments: 8,
      movie: 'Breaking Bad',
    },
    {
      id: 2,
      user: 'Alex Chen',
      avatar: '👨‍💻',
      time: '4h ago',
      content: 'Anyone else struggling with German pronunciation in Dark? Any tips for the "ü" sound?',
      likes: 15,
      comments: 12,
      movie: 'Dark',
    },
    {
      id: 3,
      user: 'Sophie Martin',
      avatar: '👩‍🎨',
      time: '6h ago',
      content: 'Amélie is perfect for beginners! The French is so beautiful and clear 💕',
      likes: 31,
      comments: 6,
      movie: 'Amélie',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="p-5 pt-16">
          <h1 className="text-3xl font-bold text-black mb-1">Community</h1>
          <p className="text-gray-500">Learn together with fellow movie lovers</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex mx-5 mt-5 bg-white rounded-xl p-1 shadow-sm">
          <button
            className={`flex-1 flex items-center justify-center py-3 rounded-lg transition-colors ${
              activeTab === 'leaderboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('leaderboard')}
          >
            <Trophy size={20} className="mr-1.5" />
            <span className="font-medium text-sm">Leaderboard</span>
          </button>

          <button
            className={`flex-1 flex items-center justify-center py-3 rounded-lg transition-colors ${
              activeTab === 'feed' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('feed')}
          >
            <MessageSquare size={20} className="mr-1.5" />
            <span className="font-medium text-sm">Community Feed</span>
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 px-5 pb-8">
          {activeTab === 'leaderboard' ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-black">This Week's Leaders</h2>
                <button className="text-blue-600 font-medium">View All Time</button>
              </div>
              
              {leaderboardData.map((user, index) => (
                <LeaderboardCard key={index} user={user} />
              ))}
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-black">Recent Activity</h2>
                <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                  + New Post
                </button>
              </div>
              
              {communityPosts.map((post) => (
                <CommunityPost key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityScreen;
