
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const chartWidth = width - 40;

const ProgressChart = () => {
  // Sample data for the last 30 days
  const generateChartData = () => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const wordsLearned = Math.floor(Math.random() * 20) + 5; // 5-25 words per day
      data.push({
        date,
        wordsLearned,
        x: ((29 - i) / 29) * (chartWidth - 40),
      });
    }
    return data;
  };

  const chartData = generateChartData();
  const maxWords = Math.max(...chartData.map(d => d.wordsLearned));
  const chartHeight = 120;

  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        <View style={styles.yAxis}>
          <Text style={styles.yAxisLabel}>{maxWords}</Text>
          <Text style={styles.yAxisLabel}>{Math.floor(maxWords / 2)}</Text>
          <Text style={styles.yAxisLabel}>0</Text>
        </View>
        
        <View style={styles.chartArea}>
          <View style={styles.gridLines}>
            {[0, 1, 2].map((line) => (
              <View key={line} style={styles.gridLine} />
            ))}
          </View>
          
          <View style={styles.dataArea}>
            {chartData.map((point, index) => {
              const height = (point.wordsLearned / maxWords) * chartHeight;
              const y = chartHeight - height;
              
              return (
                <View
                  key={index}
                  style={[
                    styles.dataPoint,
                    {
                      left: point.x,
                      top: y,
                    }
                  ]}
                />
              );
            })}
            
            {/* Draw line connecting points */}
            <View style={styles.line}>
              {chartData.slice(1).map((point, index) => {
                const prevPoint = chartData[index];
                const height1 = (prevPoint.wordsLearned / maxWords) * chartHeight;
                const height2 = (point.wordsLearned / maxWords) * chartHeight;
                const y1 = chartHeight - height1;
                const y2 = chartHeight - height2;
                
                const length = Math.sqrt(
                  Math.pow(point.x - prevPoint.x, 2) + Math.pow(y2 - y1, 2)
                );
                const angle = Math.atan2(y2 - y1, point.x - prevPoint.x) * (180 / Math.PI);
                
                return (
                  <View
                    key={index}
                    style={[
                      styles.lineSegment,
                      {
                        left: prevPoint.x,
                        top: y1,
                        width: length,
                        transform: [{ rotate: `${angle}deg` }],
                      }
                    ]}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.xAxis}>
        <Text style={styles.xAxisLabel}>30d ago</Text>
        <Text style={styles.xAxisLabel}>Today</Text>
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
  chart: {
    flexDirection: 'row',
    height: 120,
  },
  yAxis: {
    width: 30,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  chartArea: {
    flex: 1,
    position: 'relative',
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  gridLine: {
    height: 1,
    backgroundColor: '#F2F2F7',
  },
  dataArea: {
    position: 'relative',
    height: '100%',
  },
  dataPoint: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
    marginLeft: -3,
    marginTop: -3,
  },
  line: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  lineSegment: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#007AFF',
    transformOrigin: '0 50%',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingLeft: 30,
  },
  xAxisLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
});

export default ProgressChart;
