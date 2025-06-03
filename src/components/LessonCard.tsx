
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Play, Clock } from 'lucide-react-native';

interface LessonCardProps {
  lesson: {
    movieTitle: string;
    episodeTitle: string;
    timestamp: string;
    subtitle: string;
    translation: string;
    progress: number;
  };
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>{lesson.movieTitle}</Text>
          <Text style={styles.episodeTitle}>{lesson.episodeTitle}</Text>
        </View>
        <View style={styles.timestamp}>
          <Clock size={12} color="#8E8E93" />
          <Text style={styles.timestampText}>{lesson.timestamp}</Text>
        </View>
      </View>
      
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>{lesson.subtitle}</Text>
        <Text style={styles.translation}>{lesson.translation}</Text>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${lesson.progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>{Math.round(lesson.progress * 100)}% complete</Text>
        </View>
        
        <TouchableOpacity style={styles.playButton}>
          <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
          <Text style={styles.playText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  episodeTitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  timestamp: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timestampText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
    fontWeight: '500',
  },
  subtitleContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
    lineHeight: 22,
  },
  translation: {
    fontSize: 14,
    color: '#6C757D',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    marginRight: 16,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  playText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 6,
  },
});

export default LessonCard;
