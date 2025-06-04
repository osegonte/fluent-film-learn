import React from 'react';
import { Flame, Target, Clock, Trophy, Star, TrendingUp, Calendar, Award } from 'lucide-react';

const ProgressScreen = () => {
  const weeklyActivity = [
    [1, 2, 0, 1, 3, 2, 1],
    [2, 1, 1, 0, 2, 3, 2],
    [1, 3, 2, 1, 1, 2, 0],
    [0, 1, 2, 3, 1, 2, 1],
    [2, 1, 0, 1, 2, 1, 3],
  ];

  const achievements = [
    {
      title: 'First Movie',
      description: 'Complete your first movie',
      status: 'Earned',
      icon: '🎬',
      color: 'primary',
      earnedDate: '2 days ago'
    },
    {
      title: 'Week Warrior',
      description: '7-day learning streak',
      status: 'Earned',
      icon: '🔥',
      color: 'warning',
      earnedDate: '1 week ago'
    },
    {
      title: 'Vocabulary Master',
      description: 'Learn 500 new words',
      status: 'In Progress',
      icon: '📚',
      color: 'success',
      progress: 69
    },
    {
      title: 'Polyglot',
      description: 'Study 3 different languages',
      status: 'Locked',
      icon: '🌍',
      color: 'muted'
    }
  ];

  const weeklyStats = [
    { day: 'Mon', lessons: 2, time: 35 },
    { day: 'Tue', lessons: 1, time: 18 },
    { day: 'Wed', lessons: 3, time: 42 },
    { day: 'Thu', lessons: 0, time: 0 },
    { day: 'Fri', lessons: 2, time: 28 },
    { day: 'Sat', lessons: 1, time: 15 },
    { day: 'Sun', lessons: 2, time: 31 }
  ];

  const getActivityColor = (value: number) => {
    if (value === 0) return 'bg-muted/30';
    if (value === 1) return 'bg-success/40';
    if (value === 2) return 'bg-success/70';
    return 'bg-success';
  };

  const getActivityIntensity = (value: number) => {
    if (value === 0) return 'opacity-30';
    if (value === 1) return 'opacity-60';
    if (value === 2) return 'opacity-80';
    return 'opacity-100';
  };

  // Enhanced Achievement Card
  const AchievementCard = ({ achievement, index }: { achievement: any; index: number }) => (
    <div 
      className={`mobile-card p-4 animate-fade-in-up relative overflow-hidden ${
        achievement.status === 'Locked' ? 'opacity-60' : ''
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {achievement.status === 'Earned' && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-warning/20 to-transparent" />
      )}
      
      <div className="flex items-start gap-4">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl relative ${
          achievement.status === 'Earned' ? 'cinematic-gradient shadow-lg' :
          achievement.status === 'In Progress' ? 'bg-success/20' :
          'bg-muted/20'
        }`}>
          {achievement.status === 'Earned' && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
          )}
          <span className="relative z-10 filter drop-shadow-sm">
            {achievement.icon}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-callout font-bold text-content-primary">
                {achievement.title}
              </h4>
              <p className="text-footnote text-content-secondary leading-relaxed">
                {achievement.description}
              </p>
            </div>
            
            {achievement.status === 'Earned' && (
              <div className="flex items-center gap-1 bg-warning/10 px-2 py-1 rounded-lg">
                <Trophy className="w-3 h-3 text-warning" />
                <span className="text-caption font-bold text-warning">Earned</span>
              </div>
            )}
          </div>
          
          {achievement.status === 'In Progress' && (
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-caption text-content-secondary">Progress</span>
                <span className="text-caption font-bold text-content-primary">{achievement.progress}%</span>
              </div>
              <div className="progress-enhanced h-2">
                <div 
                  className="progress-fill animate-progress-fill" 
                  style={{ 
                    '--progress-width': `${achievement.progress}%`,
                    width: `${achievement.progress}%` 
                  }}
                />
              </div>
            </div>
          )}
          
          {achievement.earnedDate && (
            <p className="text-caption text-content-secondary mt-2">
              {achievement.earnedDate}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // Enhanced Stats Card
  const StatsCard = ({ icon: Icon, title, value, subtitle, color, index }: any) => (
    <div 
      className="mobile-card p-6 text-center animate-scale-in group hover:scale-105 transition-transform"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform ${
        color === 'warning' ? 'bg-warning/20' :
        color === 'primary' ? 'bg-primary/20' :
        color === 'success' ? 'bg-success/20' :
        'bg-muted/20'
      }`}>
        <Icon className={`w-7 h-7 ${
          color === 'warning' ? 'text-warning' :
          color === 'primary' ? 'text-primary' :
          color === 'success' ? 'text-success' :
          'text-muted-foreground'
        }`} />
      </div>
      <div className={`text-title-1 font-black mb-2 tabular-nums ${
        color === 'warning' ? 'text-warning' :
        color === 'primary' ? 'text-primary' :
        color === 'success' ? 'text-success' :
        'text-content-primary'
      }`}>
        {value}
      </div>
      <div className="text-footnote font-semibold text-content-primary mb-1">{title}</div>
      <div className="text-caption text-content-secondary">{subtitle}</div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-full bg-bg-canvas">
      {/* Enhanced header */}
      <div className="relative px-6 py-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-transparent to-primary/5" />
        <div className="relative z-10">
          <h1 className="text-large-title font-black text-content-primary mb-3 animate-fade-in-up">
            Your Progress
          </h1>
          <p className="text-body text-content-secondary leading-relaxed animate-fade-in-up stagger-1">
            Track your learning journey and celebrate milestones
          </p>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-success/20 to-primary/20 blur-xl" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-warning/20 to-success/20 blur-xl" />
      </div>

      {/* Enhanced main stats */}
      <div className="px-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            icon={Flame}
            title="Day Streak"
            value="23"
            subtitle="Keep the fire burning!"
            color="warning"
            index={0}
          />
          <StatsCard
            icon={Star}
            title="Words Learned"
            value="347"
            subtitle="Building vocabulary"
            color="primary"
            index={1}
          />
        </div>
      </div>

      {/* Enhanced weekly goal */}
      <div className="px-4 mb-8">
        <div className="mobile-card p-6 animate-fade-in-up stagger-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-headline font-bold text-content-primary">Weekly Goal</h3>
              <p className="text-footnote text-content-secondary">5 lessons per week</p>
            </div>
            <div className="text-right">
              <div className="text-title-2 font-bold text-primary tabular-nums">3/5</div>
              <div className="text-caption text-content-secondary">lessons</div>
            </div>
          </div>
          
          <div className="progress-enhanced mb-3">
            <div 
              className="progress-fill animate-progress-fill" 
              style={{ 
                '--progress-width': '60%',
                width: '60%' 
              }}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-footnote text-content-secondary">
              2 more lessons to reach your goal
            </p>
            <div className="flex items-center gap-1 text-primary">
              <TrendingUp className="w-4 h-4" />
              <span className="text-footnote font-semibold">On track</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced learning activity heatmap */}
      <div className="px-4 mb-8">
        <div className="mobile-card p-6 animate-fade-in-up stagger-3">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-success/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="text-headline font-bold text-content-primary">Learning Activity</h3>
              <p className="text-footnote text-content-secondary">Last 5 weeks</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-7 gap-2 text-caption text-content-secondary mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="text-center font-medium">{day}</div>
              ))}
            </div>
            
            {weeklyActivity.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-2">
                {week.map((value, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`aspect-square rounded-lg ${getActivityColor(value)} ${getActivityIntensity(value)} transition-all duration-300 hover:scale-110 cursor-pointer`}
                    title={`${value} lessons`}
                  />
                ))}
              </div>
            ))}
            
            <div className="flex items-center justify-between text-caption text-content-secondary mt-6 pt-4 border-t border-border/30">
              <span className="font-medium">Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded bg-muted/30" />
                <div className="w-3 h-3 rounded bg-success/40" />
                <div className="w-3 h-3 rounded bg-success/70" />
                <div className="w-3 h-3 rounded bg-success" />
              </div>
              <span className="font-medium">More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced weekly breakdown */}
      <div className="px-4 mb-8">
        <div className="mobile-card p-6 animate-fade-in-up stagger-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-headline font-bold text-content-primary">This Week</h3>
              <p className="text-footnote text-content-secondary">Daily breakdown</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {weeklyStats.map((day, index) => (
              <div key={day.day} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-caption font-bold ${
                    day.lessons > 0 ? 'bg-primary text-white' : 'bg-muted/30 text-muted-foreground'
                  }`}>
                    {day.day.charAt(0)}
                  </div>
                  <span className="text-callout font-medium text-content-primary">{day.day}</span>
                </div>
                
                <div className="flex items-center gap-4 text-footnote">
                  <div className="text-center">
                    <div className="font-bold text-content-primary tabular-nums">{day.lessons}</div>
                    <div className="text-content-secondary">lessons</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-content-primary tabular-nums">{day.time}m</div>
                    <div className="text-content-secondary">studied</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced achievements */}
      <div className="px-4 pb-10">
        <div className="mb-6 animate-fade-in-up stagger-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-warning" />
            </div>
            <h2 className="text-title-2 font-bold text-content-primary">
              Achievements
            </h2>
          </div>
          <p className="text-body text-content-secondary">
            Milestones you've unlocked
          </p>
        </div>
        
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <AchievementCard 
              key={achievement.title} 
              achievement={achievement} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressScreen;