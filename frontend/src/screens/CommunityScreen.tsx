import React, { useState } from 'react';
import { MessageCircle, Trophy, Send, Heart, Crown, Medal, Award, Flame } from 'lucide-react';

const CommunityScreen = () => {
  const [activeTab, setActiveTab] = useState('Chat');
  const [newMessage, setNewMessage] = useState('');

  const posts = [
    {
      user: 'Sarah Chen',
      initials: 'SC',
      time: '2m ago',
      content: 'Just finished Toy Story in Spanish! The vocabulary was perfect for beginners 🎬',
      likes: 12,
      isLiked: false,
      badge: 'crown',
      streak: 28
    },
    {
      user: 'Miguel Rodriguez',
      initials: 'MR',
      time: '15m ago',
      content: 'Does anyone know where I can watch Finding Nemo with French subtitles?',
      likes: 5,
      isLiked: true,
      badge: 'medal',
      streak: 21
    },
    {
      user: 'Emma Thompson',
      initials: 'ET',
      time: '1h ago',
      content: 'Tip: Use the \'Export to Anki\' feature after each lesson. It\'s been a game changer for retention! 🧠',
      likes: 23,
      isLiked: false,
      badge: 'award',
      streak: 19
    }
  ];

  const leaderboard = [
    { 
      rank: 1, 
      name: 'Sarah Chen', 
      points: 2847, 
      streak: 28, 
      change: '+5',
      badge: 'crown',
      avatar: 'SC',
      level: 'Expert'
    },
    { 
      rank: 2, 
      name: 'Miguel Rodriguez', 
      points: 2651, 
      streak: 21, 
      change: '+2',
      badge: 'medal',
      avatar: 'MR',
      level: 'Advanced'
    },
    { 
      rank: 3, 
      name: 'Emma Thompson', 
      points: 2398, 
      streak: 19, 
      change: '-1',
      badge: 'award',
      avatar: 'ET',
      level: 'Advanced'
    },
    { 
      rank: 4, 
      name: 'You', 
      points: 1847, 
      streak: 12, 
      change: '+3',
      isCurrentUser: true,
      avatar: 'YU',
      level: 'Intermediate'
    },
    { 
      rank: 5, 
      name: 'Akira Tanaka', 
      points: 1654, 
      streak: 15, 
      change: '0',
      avatar: 'AT',
      level: 'Intermediate'
    },
  ];

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'crown': return Crown;
      case 'medal': return Medal;
      case 'award': return Award;
      default: return null;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'crown': return 'text-warning';
      case 'medal': return 'text-gray-400';
      case 'award': return 'text-orange-500';
      default: return 'text-muted-foreground';
    }
  };

  const getRankChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-success';
    if (change.startsWith('-')) return 'text-destructive';
    return 'text-muted-foreground';
  };

  // Enhanced Chat Post Component
  const ChatPost = ({ post, index }: { post: any; index: number }) => {
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likeCount, setLikeCount] = useState(post.likes);
    const BadgeIcon = getBadgeIcon(post.badge);

    const handleLike = () => {
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    };

    return (
      <div 
        className="mobile-card mx-4 mb-4 animate-fade-in-up"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Enhanced avatar with badge */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl cinematic-gradient flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {post.initials}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
              </div>
              {BadgeIcon && (
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-card border-2 border-background flex items-center justify-center">
                  <BadgeIcon className={`w-3 h-3 ${getBadgeColor(post.badge)}`} />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              {/* Enhanced header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-callout font-bold text-content-primary">
                    {post.user}
                  </h3>
                  <div className="flex items-center gap-1 bg-warning/10 px-2 py-0.5 rounded-lg">
                    <Flame className="w-3 h-3 text-warning" />
                    <span className="text-caption font-bold text-warning">{post.streak}</span>
                  </div>
                </div>
                <span className="text-caption text-content-secondary">
                  {post.time}
                </span>
              </div>
              
              {/* Enhanced message content */}
              <p className="text-body text-content-primary mb-4 leading-relaxed">
                {post.content}
              </p>
              
              {/* Enhanced interaction buttons */}
              <div className="flex items-center gap-6">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 transition-all duration-300 hover:scale-110 ${
                    isLiked ? 'text-destructive' : 'text-content-secondary hover:text-destructive'
                  }`}
                >
                  <Heart className={`w-5 h-5 transition-all duration-300 ${isLiked ? 'fill-current scale-110' : ''}`} />
                  <span className="text-footnote font-semibold tabular-nums">{likeCount}</span>
                </button>
                
                <button className="flex items-center gap-2 text-content-secondary hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-footnote font-semibold">Reply</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Leaderboard Entry
  const LeaderboardEntry = ({ user, index }: { user: any; index: number }) => {
    const BadgeIcon = getBadgeIcon(user.badge);
    
    return (
      <div 
        className={`mobile-card mx-4 mb-3 animate-fade-in-up ${
          user.isCurrentUser ? 'ring-2 ring-primary bg-primary/5' : ''
        }`}
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        <div className="p-5">
          <div className="flex items-center gap-4">
            {/* Enhanced rank indicator */}
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm ${
              user.rank === 1 ? 'bg-gradient-to-br from-warning to-orange-400 text-white shadow-lg' :
              user.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-lg' :
              user.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-lg' :
              'bg-muted/30 text-content-secondary'
            }`}>
              #{user.rank}
              {user.rank <= 3 && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
              )}
            </div>
            
            {/* Enhanced avatar */}
            <div className="relative">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                user.isCurrentUser ? 'cinematic-gradient' : 'bg-gradient-to-br from-primary to-primary/80'
              }`}>
                {user.avatar}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
              </div>
              {BadgeIcon && (
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-card border-2 border-background flex items-center justify-center">
                  <BadgeIcon className={`w-3 h-3 ${getBadgeColor(user.badge)}`} />
                </div>
              )}
            </div>
            
            {/* Enhanced user info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-callout font-bold ${
                    user.isCurrentUser ? 'text-primary' : 'text-content-primary'
                  }`}>
                    {user.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-footnote text-content-secondary">
                      {user.points.toLocaleString()} points
                    </p>
                    <span className="text-caption text-content-secondary">•</span>
                    <span className="text-footnote font-medium text-content-secondary">
                      {user.level}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  {/* Streak indicator */}
                  <div className="flex items-center justify-end gap-1 mb-1">
                    <Flame className="w-4 h-4 text-warning" />
                    <span className="text-footnote font-bold text-content-primary tabular-nums">
                      {user.streak}
                    </span>
                  </div>
                  
                  {/* Rank change */}
                  <div className={`text-caption font-semibold ${getRankChangeColor(user.change)}`}>
                    {user.change !== '0' && user.change}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-full bg-bg-canvas">
      {/* Enhanced header */}
      <div className="relative px-6 py-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-warning/5 via-transparent to-primary/5" />
        <div className="relative z-10">
          <h1 className="text-large-title font-black text-content-primary mb-3 animate-fade-in-up">
            Community
          </h1>
          <p className="text-body text-content-secondary leading-relaxed animate-fade-in-up stagger-1">
            Connect with fellow learners around the world
          </p>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-warning/20 to-primary/20 blur-xl" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-success/20 blur-xl" />
      </div>

      {/* Enhanced tab navigation */}
      <div className="px-4 mb-8 animate-fade-in-up stagger-2">
        <div className="mobile-card p-2 bg-card/80 backdrop-blur-sm">
          <div className="flex">
            <button
              onClick={() => setActiveTab('Chat')}
              className={`flex-1 flex items-center justify-center py-4 rounded-xl transition-all duration-300 ${
                activeTab === 'Chat' 
                  ? 'bg-primary text-white shadow-lg scale-105' 
                  : 'text-content-secondary hover:text-content-primary hover:bg-primary/5'
              }`}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span className="text-callout font-semibold">Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('Leaderboard')}
              className={`flex-1 flex items-center justify-center py-4 rounded-xl transition-all duration-300 ${
                activeTab === 'Leaderboard' 
                  ? 'bg-warning text-white shadow-lg scale-105' 
                  : 'text-content-secondary hover:text-content-primary hover:bg-warning/5'
              }`}
            >
              <Trophy className="w-5 h-5 mr-2" />
              <span className="text-callout font-semibold">Leaderboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced content */}
      <div className="flex-1 pb-8">
        {activeTab === 'Chat' ? (
          <div className="space-y-4">
            {/* Chat posts */}
            {posts.map((post, index) => (
              <ChatPost key={index} post={post} index={index} />
            ))}
            
            {/* Enhanced message input */}
            <div className="sticky bottom-24 mx-4 animate-fade-in-up">
              <div className="mobile-card p-4 bg-card/95 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl cinematic-gradient flex items-center justify-center text-white font-bold text-sm">
                    YU
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                  </div>
                  <input
                    type="text"
                    placeholder="Share your progress or ask for help..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="input-ios flex-1 text-body"
                  />
                  <button 
                    className="w-12 h-12 rounded-2xl cinematic-gradient text-white hover:scale-105 transition-transform shadow-lg flex items-center justify-center"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Leaderboard header */}
            <div className="px-4 mb-6 animate-fade-in-up">
              <div className="mobile-card p-6 bg-gradient-to-r from-warning/10 to-primary/10 border-warning/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-headline font-bold text-content-primary mb-1">
                      Weekly Rankings
                    </h3>
                    <p className="text-footnote text-content-secondary">
                      Top learners this week
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-title-2 font-bold text-warning">🏆</div>
                    <div className="text-caption text-content-secondary">This Week</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Leaderboard entries */}
            {leaderboard.map((user, index) => (
              <LeaderboardEntry key={index} user={user} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityScreen;