
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Trophy, Flame } from 'lucide-react-native';

interface LeaderboardCardProps {
  user: {
    rank: number;
    name: string;
    points: number;
    avatar: string;
    streak: number;
    isCurrentUser?: boolean;
  };
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ user }) => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return '#8E8E93';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return <Trophy size={20} color={getRankColor(rank)} />;
    }
    return null;
  };

  return (
    <View style={[styles.container, user.isCurrentUser && styles.currentUserContainer]}>
      <View style={styles.leftSection}>
        <View style={styles.rankContainer}>
          {getRankIcon(user.rank) || (
            <Text style={[styles.rank, { color: getRankColor(user.rank) }]}>
              #{user.rank}
            </Text>
          )}
        </View>
        
        <Text style={styles.avatar}>{user.avatar}</Text>
        
        <View style={styles.userInfo}>
          <Text style={[styles.name, user.isCurrentUser && styles.currentUserName]}>
            {user.name}
          </Text>
          <View style={styles.streakContainer}>
            <Flame size={12} color="#FF9500" />
            <Text style={styles.streak}>{user.streak} day streak</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.pointsContainer}>
        <Text style={[styles.points, user.isCurrentUser && styles.currentUserPoints]}>
          {user.points.toLocaleString()}
        </Text>
        <Text style={styles.pointsLabel}>points</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  currentUserContainer: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  rank: {
    fontSize: 16,
    fontWeight: '700',
  },
  avatar: {
    fontSize: 32,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  currentUserName: {
    color: '#007AFF',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streak: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  points: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  currentUserPoints: {
    color: '#007AFF',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
});

export default LeaderboardCard;
