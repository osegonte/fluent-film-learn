
import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';

interface CommunityPostProps {
  post: {
    id: number;
    user: string;
    avatar: string;
    time: string;
    content: string;
    likes: number;
    comments: number;
    movie: string;
  };
}

const CommunityPost: React.FC<CommunityPostProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-lg">{post.avatar}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-black">{post.user}</h3>
          <p className="text-sm text-gray-500">{post.time}</p>
        </div>
        <div className="bg-blue-50 px-2 py-1 rounded-full">
          <span className="text-xs font-medium text-blue-600">{post.movie}</span>
        </div>
      </div>
      
      <p className="text-black mb-4 leading-relaxed">{post.content}</p>
      
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors">
          <Heart size={18} />
          <span className="text-sm font-medium">{post.likes}</span>
        </button>
        
        <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors">
          <MessageCircle size={18} />
          <span className="text-sm font-medium">{post.comments}</span>
        </button>
      </div>
    </div>
  );
};

export default CommunityPost;
