
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const WeeklyHeatmap = () => {
  // Generate sample data for the last 7 weeks
  const generateHeatmapData = () => {
    const data = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let week = 0; week < 7; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const isActive = Math.random() > 0.3; // 70% chance of activity
        const intensity = isActive ? Math.floor(Math.random() * 4) + 1 : 0;
        weekData.push({
          day: days[day],
          intensity,
          date: new Date(Date.now() - (week * 7 + (6 - day)) * 24 * 60 * 60 * 1000),
        });
      }
      data.push(weekData);
    }
    
    return data.reverse(); // Most recent week first
  };

  const heatmapData = generateHeatmapData();
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 0:
        return '#F2F2F7';
      case 1:
        return '#C6E6FF';
      case 2:
        return '#7CC7FF';
      case 3:
        return '#339AFF';
      case 4:
        return '#007AFF';
      default:
        return '#F2F2F7';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {days.map((day, index) => (
          <Text key={index} style={styles.dayLabel}>{day}</Text>
        ))}
      </View>
      
      <View style={styles.heatmap}>
        {heatmapData.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.week}>
            {week.map((day, dayIndex) => (
              <View
                key={dayIndex}
                style={[
                  styles.daySquare,
                  { backgroundColor: getIntensityColor(day.intensity) }
                ]}
              />
            ))}
          </View>
        ))}
      </View>
      
      <View style={styles.legend}>
        <Text style={styles.legendText}>Less</Text>
        <View style={styles.legendSquares}>
          {[0, 1, 2, 3, 4].map((intensity) => (
            <View
              key={intensity}
              style={[
                styles.legendSquare,
                { backgroundColor: getIntensityColor(intensity) }
              ]}
            />
          ))}
        </View>
        <Text style={styles.legendText}>More</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dayLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
    width: 16,
    textAlign: 'center',
  },
  heatmap: {
    flexDirection: 'column',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
  },
  daySquare: {
    width: 16,
    height: 16,
    borderRadius: 2,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  legendText: {
    fontSize: 12,
    color: '#8E8E93',
    marginHorizontal: 8,
  },
  legendSquares: {
    flexDirection: 'row',
  },
  legendSquare: {
    width: 10,
    height: 10,
    borderRadius: 1,
    marginHorizontal: 1,
  },
});

export default WeeklyHeatmap;
