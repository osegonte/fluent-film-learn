
import React from 'react';

interface StatsCardProps {
  stat: {
    icon: React.ComponentType<any>;
    title: string;
    value: string;
    subtitle: string;
    color: string;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ stat }) => {
  const { icon: Icon, title, value, subtitle, color } = stat;
  
  return (
    <div className="bg-white rounded-xl p-4 m-1 shadow-sm">
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={24} color={color} />
      </div>
      
      <div className="text-2xl font-bold text-black mb-1">{value}</div>
      <div className="text-sm font-semibold text-black mb-0.5">{title}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  );
};

export default StatsCard;
