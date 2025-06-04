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
    <div className="flex flex-col min-h-full bg-bg-canvas">
      {/* Header */}
      <div className="px-6 py-8 text-center">
        <h1 className="text-large-title font-bold text-content-primary mb-2">
          Community
        </h1>
        <p className="text-body text-content-secondary">
          Connect with fellow learners
        </p>
      </div>

      {/* Tab Navigation - Apple HIG: Segmented control */}
      <div className="px-4 mb-6">
        <div className="bg-card rounded-xl p-1 flex">
          <button
            onClick={() => setActiveTab('Chat')}
            className={`flex-1 flex items-center justify-center py-3 rounded-lg transition-all duration-200 ${
              activeTab === 'Chat' 
                ? 'bg-accent-solid text-white shadow-sm' 
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            <MessageCircle size={20} className="mr-2" />
            <span className="text-callout font-medium">Chat</span>
          </button>
          <button
            onClick={() => setActiveTab('Leaderboard')}
            className={`flex-1 flex items-center justify-center py-3 rounded-lg transition-all duration-200 ${
              activeTab === 'Leaderboard' 
                ? 'bg-accent-solid text-white shadow-sm' 
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            <Trophy size={20} className="mr-2" />
            <span className="text-callout font-medium">Leaderboard</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        {activeTab === 'Chat' ? (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div key={index} className="card-ios mx-4">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent-solid rounded-full flex items-center justify-center text-white font-semibold text-footnote">
                      {post.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-callout font-semibold text-content-primary">
                          {post.user}
                        </h3>
                        <span className="text-caption text-content-secondary">
                          {post.time}
                        </span>
                      </div>
                      <p className="text-body text-content-primary mb-3 leading-relaxed">
                        {post.content}
                      </p>
                      <button className="flex items-center gap-1 text-content-secondary hover:text-state-error transition-colors">
                        <span className="text-footnote">❤️</span>
                        <span className="text-footnote font-medium">{post.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Message Input */}
            <div className="card-ios mx-4">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Share your progress or ask for help..."
                    className="input-ios flex-1 text-body"
                  />
                  <button className="bg-accent-solid text-white p-3 rounded-xl hover:opacity-80 transition-opacity">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 px-4">
            {leaderboard.map((user, index) => (
              <div key={index} className={`card-ios ${
                user.isCurrentUser ? 'ring-2 ring-accent-solid bg-accent-solid bg-opacity-5' : ''
              }`}>
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-content-secondary bg-opacity-10 rounded-full flex items-center justify-center">
                      <span className="text-footnote font-bold text-content-secondary">
                        #{user.rank}
                      </span>
                    </div>
                    <div className="w-10 h-10 bg-accent-solid rounded-full flex items-center justify-center text-white font-semibold text-footnote">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-callout font-semibold text-content-primary">
                        {user.name}
                      </h3>
                      <p className="text-footnote text-content-secondary">
                        {user.points.toLocaleString()} points
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-spark">🔥</span>
                      <span className="text-footnote font-medium text-content-secondary">
                        {user.streak}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityScreen;
