
import React, { useState } from 'react';
import { MessageCircle, Trophy, Send } from 'lucide-react';

const CommunityScreen = () => {
  const [activeTab, setActiveTab] = useState('Chat');

  const posts = [
    {
      user: 'Sarah Chen',
      initials: 'SC',
      time: '2m ago',
      content: 'Just finished Toy Story in Spanish! The vocabulary was perfect for beginners 🎬',
      likes: 12
    },
    {
      user: 'Miguel Rodriguez',
      initials: 'MR',
      time: '15m ago',
      content: 'Does anyone know where I can watch Finding Nemo with French subtitles?',
      likes: 5
    },
    {
      user: 'Emma Thompson',
      initials: 'ET',
      time: '1h ago',
      content: 'Tip: Use the \'Export to Anki\' feature after each lesson. It\'s been a game changer for retention! 🧠',
      likes: 23
    },
    {
      user: 'Akira Tanaka',
      initials: 'AT',
      time: '2h ago',
      content: '45-day streak achieved! This app makes learning so addictive 🔥',
      likes: 18
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', points: 2847, streak: 28 },
    { rank: 2, name: 'Miguel Rodriguez', points: 2651, streak: 21 },
    { rank: 3, name: 'Emma Thompson', points: 2398, streak: 19 },
    { rank: 4, name: 'You', points: 1847, streak: 12, isCurrentUser: true },
    { rank: 5, name: 'Akira Tanaka', points: 1654, streak: 15 },
  ];

  return (
    <div className="flex flex-col h-full bg-canvas">
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-8 pt-16 text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">Community</h1>
          <p className="text-secondary">Connect with fellow learners</p>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 mb-6">
          <div className="bg-card rounded-xl p-1 border border-default flex">
            <button
              onClick={() => setActiveTab('Chat')}
              className={`flex-1 flex items-center justify-center py-3 rounded-lg transition-colors ${
                activeTab === 'Chat' 
                  ? 'bg-royalBlue-500 text-white' 
                  : 'text-secondary hover:text-primary'
              }`}
            >
              <MessageCircle size={20} className="mr-2" />
              <span className="font-medium">Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('Leaderboard')}
              className={`flex-1 flex items-center justify-center py-3 rounded-lg transition-colors ${
                activeTab === 'Leaderboard' 
                  ? 'bg-royalBlue-500 text-white' 
                  : 'text-secondary hover:text-primary'
              }`}
            >
              <Trophy size={20} className="mr-2" />
              <span className="font-medium">Leaderboard</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-8">
          {activeTab === 'Chat' ? (
            <div className="space-y-4">
              {posts.map((post, index) => (
                <div key={index} className="bg-card rounded-xl p-4 border border-default">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-royalBlue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {post.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-primary">{post.user}</h3>
                        <span className="text-xs text-secondary">{post.time}</span>
                      </div>
                      <p className="text-primary mb-3 leading-relaxed">{post.content}</p>
                      <button className="flex items-center gap-1 text-secondary hover:text-primary transition-colors">
                        <span className="text-sm">❤️</span>
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Message Input */}
              <div className="bg-card rounded-xl p-4 border border-default">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Share your progress or ask for help..."
                    className="flex-1 bg-slate-800 dark:bg-slate-600 text-primary placeholder-secondary px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-royalBlue-500"
                  />
                  <button className="bg-navy-900 text-white p-3 rounded-xl hover:bg-royalBlue-500 transition-colors">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div key={index} className={`bg-card rounded-xl p-4 border border-default ${
                  user.isCurrentUser ? 'ring-2 ring-royalBlue-500 bg-royalBlue-500 bg-opacity-5' : ''
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-slate-800 dark:bg-slate-600 rounded-full flex items-center justify-center">
                      <span className="font-bold text-sm text-secondary">#{user.rank}</span>
                    </div>
                    <div className="w-10 h-10 bg-royalBlue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">{user.name}</h3>
                      <p className="text-sm text-secondary">{user.points.toLocaleString()} points</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-persimmon-500">🔥</span>
                      <span className="text-sm font-medium text-secondary">{user.streak}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityScreen;
