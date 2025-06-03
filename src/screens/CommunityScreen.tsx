
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { MessageSquare, Trophy, Users } from 'lucide-react-native';
import LeaderboardCard from '../components/LeaderboardCard';
import CommunityPost from '../components/CommunityPost';

const CommunityScreen = () => {
  const [activeTab, setActiveTab] = useState('leaderboard');

  const leaderboardData = [
    { rank: 1, name: 'Maria García', points: 2847, avatar: '👩‍🎓', streak: 28 },
    { rank: 2, name: 'Alex Chen', points: 2651, avatar: '👨‍💻', streak: 21 },
    { rank: 3, name: 'Sophie Martin', points: 2398, avatar: '👩‍🎨', streak: 19 },
    { rank: 4, name: 'You', points: 1847, avatar: '🙋‍♂️', streak: 12, isCurrentUser: true },
    { rank: 5, name: 'James Wilson', points: 1654, avatar: '👨‍🔬', streak: 15 },
  ];

  const communityPosts = [
    {
      id: 1,
      user: 'Maria García',
      avatar: '👩‍🎓',
      time: '2h ago',
      content: 'Just finished my first Breaking Bad episode in Spanish! The slang is challenging but so rewarding 🎉',
      likes: 24,
      comments: 8,
      movie: 'Breaking Bad',
    },
    {
      id: 2,
      user: 'Alex Chen',
      avatar: '👨‍💻',
      time: '4h ago',
      content: 'Anyone else struggling with German pronunciation in Dark? Any tips for the "ü" sound?',
      likes: 15,
      comments: 12,
      movie: 'Dark',
    },
    {
      id: 3,
      user: 'Sophie Martin',
      avatar: '👩‍🎨',
      time: '6h ago',
      content: 'Amélie is perfect for beginners! The French is so beautiful and clear 💕',
      likes: 31,
      comments: 6,
      movie: 'Amélie',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <Text style={styles.subtitle}>Learn together with fellow movie lovers</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'leaderboard' && styles.activeTab]}
          onPress={() => setActiveTab('leaderboard')}
        >
          <Trophy size={20} color={activeTab === 'leaderboard' ? '#007AFF' : '#8E8E93'} />
          <Text style={[styles.tabText, activeTab === 'leaderboard' && styles.activeTabText]}>
            Leaderboard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'feed' && styles.activeTab]}
          onPress={() => setActiveTab('feed')}
        >
          <MessageSquare size={20} color={activeTab === 'feed' ? '#007AFF' : '#8E8E93'} />
          <Text style={[styles.tabText, activeTab === 'feed' && styles.activeTabText]}>
            Community Feed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {activeTab === 'leaderboard' ? (
          <View style={styles.leaderboardContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>This Week's Leaders</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>View All Time</Text>
              </TouchableOpacity>
            </View>
            
            {leaderboardData.map((user, index) => (
              <LeaderboardCard key={index} user={user} />
            ))}
          </View>
        ) : (
          <View style={styles.feedContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity style={styles.newPostButton}>
                <Text style={styles.newPostText}>+ New Post</Text>
              </TouchableOpacity>
            </View>
            
            {communityPosts.map((post) => (
              <CommunityPost key={post.id} post={post} />
            ))}
          </View>
        )}
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
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#E3F2FD',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
    marginLeft: 6,
  },
  activeTabText: {
    color: '#007AFF',
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  leaderboardContainer: {
    paddingHorizontal: 20,
  },
  feedContainer: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  newPostButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  newPostText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default CommunityScreen;
