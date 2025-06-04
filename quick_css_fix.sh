#!/bin/bash

echo "🔧 Quick CSS Fix for CineFluent Mobile"
echo "===================================="

# Fix the CSS issue by updating the index.css with proper Tailwind utilities
cat > frontend/src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Apple HIG: System colors for iOS */
    --bg-canvas: #F2F2F7;
    --bg-card: #FFFFFF;
    --content-primary: #000000;
    --content-secondary: #3C3C43;
    --border-color: #C6C6C8;
    --accent-solid: #007AFF;
    --state-success: #34C759;
    --state-error: #FF3B30;
    --spark: #FF9500;

    /* shadcn compatibility */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221 83% 53%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221 83% 53%;
    --radius: 12px;
  }

  html.dark {
    /* Apple HIG: Dark mode system colors */
    --bg-canvas: #000000;
    --bg-card: #1C1C1E;
    --content-primary: #FFFFFF;
    --content-secondary: #EBEBF5;
    --border-color: #38383A;
    --accent-solid: #0A84FF;
    --state-success: #30D158;
    --state-error: #FF453A;
    --spark: #FF9F0A;

    --background: 0 0% 11%;
    --foreground: 210 40% 98%;
    --card: 0 0% 11%;
    --card-foreground: 210 40% 98%;
    --popover: 0 0% 11%;
    --popover-foreground: 210 40% 98%;
    --primary: 213 93% 67%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 213 93% 67%;
  }
}

@layer base {
  * {
    @apply border-border;
    box-sizing: border-box;
  }

  html {
    overflow-x: hidden;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground;
    /* Apple HIG: San Francisco font family */
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 17px;
    line-height: 1.47;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Allow text selection in content areas */
  p, span, div[role="textbox"], input, textarea {
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
}

/* Apple HIG utilities */
@layer utilities {
  /* Safe areas for devices with notches */
  .safe-area-top {
    padding-top: max(env(safe-area-inset-top), 16px);
  }
  
  .safe-area-bottom {
    padding-bottom: max(env(safe-area-inset-bottom), 16px);
  }

  .safe-area-left {
    padding-left: env(safe-area-inset-left);
  }

  .safe-area-right {
    padding-right: env(safe-area-inset-right);
  }

  /* Apple HIG button styles */
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200;
    min-height: 44px;
    padding: 12px 24px;
    font-size: 17px;
    touch-action: manipulation;
    transform: scale(1);
  }

  .btn-primary:active {
    transform: scale(0.98);
  }

  .btn-secondary {
    @apply bg-card border border-border text-foreground hover:bg-accent font-medium rounded-xl transition-all duration-200;
    min-height: 44px;
    padding: 12px 24px;
    font-size: 17px;
    touch-action: manipulation;
    transform: scale(1);
  }

  .btn-secondary:active {
    transform: scale(0.98);
  }

  /* Apple HIG card styles */
  .card-ios {
    @apply bg-card rounded-xl border-0 shadow-sm;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  /* Apple HIG input styles */
  .input-ios {
    @apply bg-card border border-border rounded-xl px-4 py-3;
    min-height: 44px;
    font-size: 17px;
  }

  .input-ios:focus {
    @apply border-blue-600 ring-0 outline-none;
  }

  /* Apple HIG progress indicators */
  .progress-ios {
    @apply bg-border rounded-full overflow-hidden;
    height: 4px;
  }

  .progress-fill-ios {
    @apply bg-blue-600 rounded-full transition-all duration-300;
    height: 100%;
  }

  /* Tab bar */
  .tab-bar-ios {
    @apply bg-card border-t border-border;
    height: 83px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  /* Typography utilities */
  .text-large-title {
    font-size: 34px;
    font-weight: 700;
    line-height: 1.2;
  }

  .text-title-1 {
    font-size: 28px;
    font-weight: 700;
    line-height: 1.25;
  }

  .text-title-2 {
    font-size: 22px;
    font-weight: 700;
    line-height: 1.27;
  }

  .text-title-3 {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.3;
  }

  .text-headline {
    font-size: 17px;
    font-weight: 600;
    line-height: 1.35;
  }

  .text-body {
    font-size: 17px;
    font-weight: 400;
    line-height: 1.47;
  }

  .text-callout {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.44;
  }

  .text-subhead {
    font-size: 15px;
    font-weight: 400;
    line-height: 1.47;
  }

  .text-footnote {
    font-size: 13px;
    font-weight: 400;
    line-height: 1.54;
  }

  .text-caption {
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
  }

  /* Animation utilities */
  .animation-ios {
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .animation-spring-ios {
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
}

/* Dark mode adaptations */
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
EOF

echo "✅ CSS fixed with proper Tailwind utilities"

# Update the TabNavigator to use standard Tailwind classes
cat > frontend/src/navigation/TabNavigator.tsx << 'EOF'
import React, { useState } from 'react';
import { BookOpen, TrendingUp, Users, User } from 'lucide-react';
import LearnScreen from '../screens/LearnScreen';
import ProgressScreen from '../screens/ProgressScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';

const TabNavigator = () => {
  const [activeTab, setActiveTab] = useState('Learn');

  const tabs = [
    { name: 'Learn', icon: BookOpen, component: LearnScreen },
    { name: 'Progress', icon: TrendingUp, component: ProgressScreen },
    { name: 'Community', icon: Users, component: CommunityScreen },
    { name: 'Profile', icon: User, component: ProfileScreen },
  ];

  const ActiveComponent = tabs.find(tab => tab.name === activeTab)?.component || LearnScreen;

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Main content - Apple HIG: Content area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="safe-area-top">
          <ActiveComponent />
        </div>
      </div>

      {/* Tab Bar - Apple HIG: 49pt height + safe area */}
      <div className="tab-bar-ios safe-area-bottom">
        <div className="flex justify-around items-center h-[49px] px-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.name;
            
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 animation-ios ${
                  isActive ? 'text-blue-600' : 'text-muted-foreground'
                }`}
                style={{
                  minHeight: '44px',
                  minWidth: '44px'
                }}
              >
                <IconComponent 
                  size={24} 
                  className={`mb-1 transition-all duration-200 ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`} 
                />
                <span className="text-caption font-medium leading-none">
                  {tab.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigator;
EOF

echo "✅ TabNavigator updated with standard Tailwind classes"

echo ""
echo "🎉 CSS Fixed! Your app should now work properly."
echo "🚀 Try running: npm run dev"