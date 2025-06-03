
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Heart, MessageCircle, Share } from 'lucide-react-native';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avatar}>{post.avatar}</Text>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.user}</Text>
          <Text style={styles.timestamp}>{post.time}</Text>
        </View>
        <View style={styles.movieTag}>
          <Text style={styles.movieTagText}>{post.movie}</Text>
        </View>
      </View>
      
      <Text style={styles.content}>{post.content}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Heart size={18} color="#8E8E93" />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={18} color="#8E8E93" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Share size={18} color="#8E8E93" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    fontSize: 24,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E93',
  },
  movieTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  movieTagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#007AFF',
  },
  content: {
    fontSize: 15,
    color: '#000000',
    lineHeight: 20,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5EA',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 6,
  },
});

export default CommunityPost;
