
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react-native';
import StatsCard from '../components/StatsCard';
import WeeklyHeatmap from '../components/WeeklyHeatmap';
import ProgressChart from '../components/ProgressChart';

const { width } = Dimensions.get('window');

const ProgressScreen = () => {
  const stats = [
    {
      icon: TrendingUp,
      title: 'Words Learned',
      value: '1,247',
      subtitle: '+23 this week',
      color: '#34C759',
    },
    {
      icon: Target,
      title: 'Accuracy',
      value: '87%',
      subtitle: '+5% from last week',
      color: '#007AFF',
    },
    {
      icon: Calendar,
      title: 'Study Streak',
      value: '12 days',
      subtitle: 'Personal best!',
      color: '#FF9500',
    },
    {
      icon: Award,
      title: 'Level',
      value: 'B1',
      subtitle: 'Intermediate',
      color: '#AF52DE',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>Keep up the great work!</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <StatsCard key={index} stat={stat} />
          ))}
        </View>

        {/* Weekly Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Activity</Text>
          <WeeklyHeatmap />
        </View>

        {/* Learning Progress Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Curve</Text>
          <ProgressChart />
        </View>

        {/* Recent Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementsList}>
            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Text style={styles.achievementEmoji}>🔥</Text>
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>Week Warrior</Text>
                <Text style={styles.achievementDescription}>
                  Completed lessons 7 days in a row
                </Text>
              </View>
              <Text style={styles.achievementDate}>2 days ago</Text>
            </View>
            
            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Text style={styles.achievementEmoji}>🎯</Text>
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>Perfect Score</Text>
                <Text style={styles.achievementDescription}>
                  Got 100% on a lesson quiz
                </Text>
              </View>
              <Text style={styles.achievementDate}>1 week ago</Text>
            </View>

            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Text style={styles.achievementEmoji}>📚</Text>
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>Vocabulary Master</Text>
                <Text style={styles.achievementDescription}>
                  Learned 1000+ words
                </Text>
              </View>
              <Text style={styles.achievementDate}>2 weeks ago</Text>
            </View>
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
  title: {
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  achievementsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#C6C6C8',
  },
  achievementIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementEmoji: {
    fontSize: 20,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  achievementDate: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
});

export default ProgressScreen;
