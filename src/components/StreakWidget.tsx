
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const StreakWidget = () => {
  const currentStreak = 12;
  const longestStreak = 28;
  
  return (
    <View style={styles.container}>
      <View style={styles.streakInfo}>
        <View style={styles.currentStreak}>
          <Text style={styles.streakNumber}>{currentStreak}</Text>
          <Text style={styles.streakLabel}>Day Streak</Text>
        </View>
        
        <View style={styles.streakFire}>
          <Text style={styles.fireEmoji}>🔥</Text>
        </View>
        
        <View style={styles.longestStreak}>
          <Text style={styles.longestStreakNumber}>{longestStreak}</Text>
          <Text style={styles.longestStreakLabel}>Personal Best</Text>
        </View>
      </View>
      
      <Text style={styles.encouragement}>
        Keep it up! You're on fire! 🚀
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  currentStreak: {
    alignItems: 'center',
    flex: 1,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF9500',
    marginBottom: 4,
  },
  streakLabel: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  streakFire: {
    flex: 1,
    alignItems: 'center',
  },
  fireEmoji: {
    fontSize: 40,
  },
  longestStreak: {
    alignItems: 'center',
    flex: 1,
  },
  longestStreakNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 4,
  },
  longestStreakLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  encouragement: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default StreakWidget;
