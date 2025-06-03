
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Play, Clock, Star } from 'lucide-react-native';
import MovieCard from '../components/MovieCard';
import LessonCard from '../components/LessonCard';
import StreakWidget from '../components/StreakWidget';

const { width } = Dimensions.get('window');

const LearnScreen = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const featuredMovies = [
    {
      id: 1,
      title: 'Breaking Bad',
      difficulty: 'Intermediate',
      language: 'Spanish',
      progress: 65,
      totalLessons: 24,
      completedLessons: 16,
      thumbnail: '🎬',
    },
    {
      id: 2,
      title: 'Amélie',
      difficulty: 'Beginner',
      language: 'French',
      progress: 30,
      totalLessons: 18,
      completedLessons: 5,
      thumbnail: '🎭',
    },
    {
      id: 3,
      title: 'Dark',
      difficulty: 'Advanced',
      language: 'German',
      progress: 15,
      totalLessons: 32,
      completedLessons: 5,
      thumbnail: '🌑',
    },
  ];

  const continueLesson = {
    movieTitle: 'Breaking Bad',
    episodeTitle: 'S1E3: ...And the Bag\'s in the River',
    timestamp: '14:32',
    subtitle: 'No me digas que no sabes quién soy.',
    translation: 'Don\'t tell me you don\'t know who I am.',
    progress: 0.65,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.subtitle}>Ready to learn with movies?</Text>
        </View>

        {/* Streak Widget */}
        <StreakWidget />

        {/* Continue Learning Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue Learning</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <LessonCard lesson={continueLesson} />
        </View>

        {/* Featured Movies Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Movies</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moviesContainer}
          >
            {featuredMovies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie}
                onPress={() => setSelectedMovie(movie)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Play size={20} color="#007AFF" />
              <Text style={styles.actionText}>Random Lesson</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Clock size={20} color="#007AFF" />
              <Text style={styles.actionText}>5-Min Challenge</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Star size={20} color="#007AFF" />
              <Text style={styles.actionText}>Review Words</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '400',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  seeAll: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  moviesContainer: {
    paddingRight: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default LearnScreen;
