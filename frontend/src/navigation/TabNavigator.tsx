import { NavLink, useLocation } from "react-router-dom";
import { BookOpen, TrendingUp, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { 
    id: 'learn', 
    label: 'Learn', 
    icon: BookOpen, 
    path: '/',
    gradient: 'from-primary/20 to-primary/5',
    activeColor: 'text-primary'
  },
  { 
    id: 'progress', 
    label: 'Progress', 
    icon: TrendingUp, 
    path: '/progress',
    gradient: 'from-success/20 to-success/5',
    activeColor: 'text-success'
  },
  { 
    id: 'community', 
    label: 'Community', 
    icon: Users, 
    path: '/community',
    gradient: 'from-warning/20 to-warning/5',
    activeColor: 'text-warning'
  },
  { 
    id: 'profile', 
    label: 'Profile', 
    icon: User, 
    path: '/profile',
    gradient: 'from-purple-500/20 to-purple-500/5',
    activeColor: 'text-purple-500'
  },
];

export const NavigationTabs = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      {/* Enhanced background with blur and gradient */}
      <div className="absolute inset-0 bg-card/95 backdrop-blur-xl border-t border-border/50" />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
      
      <div className="relative flex justify-around items-center h-20 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          
          return (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={cn(
                "relative flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-3 rounded-2xl transition-all duration-300 group",
                "min-h-[60px] min-w-[60px]", // Apple HIG minimum touch target
                isActive 
                  ? `${tab.activeColor} scale-105` 
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              )}
            >
              {/* Active state background with gradient */}
              {isActive && (
                <div className={cn(
                  "absolute inset-0 rounded-2xl bg-gradient-to-br transition-all duration-300",
                  tab.gradient
                )} />
              )}
              
              {/* Hover state background */}
              <div className="absolute inset-0 rounded-2xl bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Icon with enhanced animation */}
                <div className={cn(
                  "relative mb-1 transition-all duration-300",
                  isActive && "animate-bounce-subtle"
                )}>
                  <Icon className={cn(
                    "w-6 h-6 transition-all duration-300",
                    isActive && "scale-110"
                  )} />
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-current animate-pulse" />
                  )}
                </div>
                
                {/* Label with enhanced typography */}
                <span className={cn(
                  "text-xs transition-all duration-300 font-medium leading-none",
                  isActive && "font-bold scale-105"
                )}>
                  {tab.label}
                </span>
                
                {/* Active state underline */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-current rounded-full" />
                )}
              </div>
              
              {/* Ripple effect on press */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-current opacity-0 group-active:opacity-10 transition-opacity duration-150" />
              </div>
            </NavLink>
          );
        })}
      </div>
      
      {/* Bottom safe area spacer */}
      <div className="h-safe-area-bottom bg-card/95" />
    </nav>
  );
};