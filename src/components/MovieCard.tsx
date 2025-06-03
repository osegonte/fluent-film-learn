
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Play } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.7;

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    difficulty: string;
    language: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    thumbnail: string;
  };
  onPress: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#34C759';
      case 'Intermediate':
        return '#FF9500';
      case 'Advanced':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.thumbnailContainer}>
        <Text style={styles.thumbnail}>{movie.thumbnail}</Text>
        <TouchableOpacity style={styles.playButton}>
          <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
        <Text style={styles.language}>{movie.language}</Text>
        
        <View style={styles.metadata}>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(movie.difficulty) }]}>
            <Text style={styles.difficultyText}>{movie.difficulty}</Text>
          </View>
          <Text style={styles.lessons}>
            {movie.completedLessons}/{movie.totalLessons} lessons
          </Text>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${movie.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{movie.progress}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  thumbnailContainer: {
    height: 120,
    backgroundColor: '#F2F2F7',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  thumbnail: {
    fontSize: 40,
  },
  playButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  language: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  lessons: {
    fontSize: 12,
    color: '#8E8E93',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8E8E93',
  },
});

export default MovieCard;
