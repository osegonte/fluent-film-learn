import React from 'react';
import { 
  User, Settings, Crown, Bell, HelpCircle, LogOut, ChevronRight, 
  Edit3, Flame, Trophy, Clock, BookOpen, Star, Languages,
  Shield, Palette, Volume2, Download
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfileScreen = () => {
  const { logout, user } = useAuth();
  
  const profileStats = [
    { 
      label: 'Words Learned', 
      value: '1,247',
      icon: BookOpen,
      color: 'primary',
      change: '+24 this week'
    },
    { 
      label: 'Movies Completed', 
      value: '8',
      icon: Trophy,
      color: 'warning',
      change: '+2 this month'
    },
    { 
      label: 'Study Time', 
      value: '47h 23m',
      icon: Clock,
      color: 'success',
      change: '+3h this week'
    },
    { 
      label: 'Current Streak', 
      value: '12 days',
      icon: Flame,
      color: 'destructive',
      change: 'Personal best!'
    },
  ];

  const menuItems = [
    {
      icon: Crown,
      title: 'Upgrade to Premium',
      subtitle: 'Unlock unlimited movies and features',
      isPremium: true,
      badge: 'Popular',
      color: 'warning'
    },
    {
      icon: Settings,
      title: 'Learning Settings',
      subtitle: 'Customize your learning experience',
      color: 'primary'
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Manage daily reminders and updates',
      color: 'success'
    },
    {
      icon: Languages,
      title: 'Languages',
      subtitle: 'Manage your learning languages',
      color: 'primary'
    },
    {
      icon: Palette,
      title: 'Appearance',
      subtitle: 'Theme and display preferences',
      color: 'purple'
    },
    {
      icon: Volume2,
      title: 'Audio Settings',
      subtitle: 'Voice and sound preferences',
      color: 'blue'
    },
    {
      icon: Download,
      title: 'Offline Content',
      subtitle: 'Download lessons for offline use',
      color: 'green'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      subtitle: 'Account security and privacy settings',
      color: 'red'
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      color: 'muted'
    },
  ];

  const languages = [
    { 
      name: 'Spanish', 
      level: 'Intermediate B1', 
      progress: 65, 
      flag: '🇪🇸',
      wordsLearned: 847,
      nextMilestone: 'Advanced'
    },
    { 
      name: 'French', 
      level: 'Beginner A2', 
      progress: 30, 
      flag: '🇫🇷',
      wordsLearned: 234,
      nextMilestone: 'Intermediate'
    },
    { 
      name: 'German', 
      level: 'Beginner A1', 
      progress: 15, 
      flag: '🇩🇪',
      wordsLearned: 89,
      nextMilestone: 'A2 Level'
    },
  ];

  const getIconColor = (color: string) => {
    switch (color) {
      case 'primary': return 'text-primary';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      case 'destructive': return 'text-destructive';
      case 'purple': return 'text-purple-500';
      case 'blue': return 'text-blue-500';
      case 'green': return 'text-green-500';
      case 'red': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getBgColor = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-primary/10';
      case 'warning': return 'bg-warning/10';
      case 'success': return 'bg-success/10';
      case 'destructive': return 'bg-destructive/10';
      case 'purple': return 'bg-purple-500/10';
      case 'blue': return 'bg-blue-500/10';
      case 'green': return 'bg-green-500/10';
      case 'red': return 'bg-red-500/10';
      default: return 'bg-muted/10';
    }
  };

  // Enhanced Stats Card
  const StatsCard = ({ stat, index }: { stat: any; index: number }) => (
    <div 
      className="mobile-card p-6 text-center animate-scale-in group hover:scale-105 transition-transform"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform ${getBgColor(stat.color)}`}>
        <stat.icon className={`w-7 h-7 ${getIconColor(stat.color)}`} />
      </div>
      <div className={`text-title-1 font-black mb-2 tabular-nums ${getIconColor(stat.color)}`}>
        {stat.value}
      </div>
      <div className="text-footnote font-semibold text-content-primary mb-1">{stat.label}</div>
      <div className="text-caption text-content-secondary">{stat.change}</div>
    </div>
  );

  // Enhanced Menu Item
  const MenuItem = ({ item, index }: { item: any; index: number }) => (
    <button 
      className={`w-full p-5 flex items-center hover:bg-muted/5 transition-all duration-300 group animate-fade-in-up ${
        index < menuItems.length - 1 ? 'border-b border-border/30' : ''
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center flex-1 gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
          item.isPremium ? 'cinematic-gradient shadow-lg' : getBgColor(item.color)
        }`}>
          {item.isPremium && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
          )}
          <item.icon className={`w-6 h-6 ${item.isPremium ? 'text-white' : getIconColor(item.color)} relative z-10`} />
        </div>
        
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-callout font-bold text-content-primary">{item.title}</h3>
            {item.badge && (
              <span className="bg-warning text-white text-caption px-2 py-0.5 rounded-full font-semibold">
                {item.badge}
              </span>
            )}
          </div>
          <p className="text-footnote text-content-secondary leading-relaxed">{item.subtitle}</p>
        </div>
      </div>
      
      <ChevronRight className="w-5 h-5 text-content-secondary group-hover:text-content-primary transition-colors" />
    </button>
  );

  // Enhanced Language Card
  const LanguageCard = ({ language, index }: { language: any; index: number }) => (
    <div 
      className="mobile-card p-5 animate-fade-in-up group hover:scale-105 transition-transform"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl">{language.flag}</div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-headline font-bold text-content-primary">{language.name}</h3>
            <span className="text-footnote font-semibold text-primary">{language.level}</span>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-footnote text-content-secondary">
              {language.wordsLearned} words learned
            </span>
            <span className="text-caption text-content-secondary">
              Next: {language.nextMilestone}
            </span>
          </div>
          
          <div className="progress-enhanced h-3">
            <div 
              className="progress-fill animate-progress-fill" 
              style={{ 
                '--progress-width': `${language.progress}%`,
                width: `${language.progress}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-bg-canvas">
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Enhanced profile header */}
        <div className="relative px-6 py-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5" />
          <div className="relative z-10">
            {/* Profile avatar with gradient */}
            <div className="relative inline-block mb-6 animate-scale-in">
              <div className="w-24 h-24 rounded-3xl cinematic-gradient flex items-center justify-center mx-auto shadow-xl">
                <User className="w-12 h-12 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
              </div>
              
              {/* Edit button */}
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-card border-2 border-background rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Edit3 className="w-4 h-4 text-primary" />
              </button>
            </div>
            
            <h1 className="text-title-1 font-black text-content-primary mb-2 animate-fade-in-up">
              {user?.name || 'John Doe'}
            </h1>
            <p className="text-body text-content-secondary mb-6 animate-fade-in-up stagger-1">
              Intermediate Learner • Level B1
            </p>
            
            <button className="btn-primary animate-fade-in-up stagger-2">
              Edit Profile
            </button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-success/20 blur-xl" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-warning/20 to-primary/20 blur-xl" />
        </div>

        {/* Enhanced stats grid */}
        <div className="px-4 mb-8">
          <div className="grid grid-cols-2 gap-4">
            {profileStats.map((stat, index) => (
              <StatsCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>

        {/* Enhanced languages section */}
        <div className="px-4 mb-8">
          <div className="mb-6 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Languages className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-title-2 font-bold text-content-primary">
                Learning Languages
              </h2>
            </div>
            <p className="text-body text-content-secondary">
              Your language learning progress
            </p>
          </div>
          
          <div className="space-y-4">
            {languages.map((language, index) => (
              <LanguageCard key={language.name} language={language} index={index} />
            ))}
            
            {/* Add language button */}
            <button className="mobile-card p-5 w-full text-center text-primary hover:bg-primary/5 transition-colors animate-fade-in-up">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Languages className="w-4 h-4 text-primary" />
                </div>
                <span className="text-callout font-bold">Add New Language</span>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced achievements preview */}
        <div className="px-4 mb-8">
          <div className="mobile-card p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-warning/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h3 className="text-headline font-bold text-content-primary">Recent Achievement</h3>
                  <p className="text-footnote text-content-secondary">Keep up the great work!</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-content-secondary" />
            </div>
            
            <div className="bg-gradient-to-r from-warning/10 to-orange-500/10 p-4 rounded-2xl border border-warning/20">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🔥</div>
                <div>
                  <h4 className="text-callout font-bold text-content-primary">Week Warrior</h4>
                  <p className="text-footnote text-content-secondary">7-day learning streak completed</p>
                </div>
                <div className="ml-auto bg-warning text-white text-caption px-2 py-1 rounded-lg font-semibold">
                  Earned
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced menu items */}
        <div className="px-4 mb-8">
          <div className="mb-6 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-muted/20 flex items-center justify-center">
                <Settings className="w-4 h-4 text-muted-foreground" />
              </div>
              <h2 className="text-title-2 font-bold text-content-primary">
                Settings & More
              </h2>
            </div>
            <p className="text-body text-content-secondary">
              Customize your CineFluent experience
            </p>
          </div>
          
          <div className="mobile-card overflow-hidden">
            {menuItems.map((item, index) => (
              <MenuItem key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Enhanced sign out */}
        <div className="px-4 pb-8">
          <button 
            onClick={logout}
            className="mobile-card p-5 w-full flex items-center justify-center hover:bg-destructive/5 transition-colors group animate-fade-in-up"
          >
            <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <LogOut className="w-6 h-6 text-destructive" />
            </div>
            <span className="text-callout font-bold text-destructive">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;