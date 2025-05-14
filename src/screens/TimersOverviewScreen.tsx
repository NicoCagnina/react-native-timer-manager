import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useTimerContext } from '../providers/TimerProvider';
import { useIdle } from '../providers/IdleProvider';
import { TimerState } from '../providers/TimerProvider';

function randomId() {
  return 'timer-' + Math.random().toString(36).substring(2, 10);
}

const TimersOverviewScreen = () => {
  const { getAllTimers, pauseTimer, resumeTimer, resetTimer, registerCallback, removeTimer } = useTimerContext();
  const { isIdle, idleTime } = useIdle();
  const timers = getAllTimers();

  const handleCreateTimer = () => {
    const id = randomId();
    registerCallback(id, () => {});
  };

  const renderTimer = ({ item }: { item: TimerState }) => (
    <View style={styles.timerRow}>
      <Text style={styles.timerDot}>{item.isActive ? '●' : '○'}</Text>
      <Text style={styles.timerId}>{item.id}:</Text>
      <Text style={styles.timerTicks}>{item.ticks}</Text>
			<View style={{ flexDirection: 'row'}}>
			<TouchableOpacity
        style={styles.actionButton}
        onPress={() => (item.isActive ? pauseTimer(item.id) : resumeTimer(item.id))}
      >
        <Text style={styles.actionButtonText}>{item.isActive ? 'Pause' : 'Resume'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => resetTimer(item.id)}
      >
        <Text style={styles.actionButtonText}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: '#d32f2f' }]}
        onPress={() => removeTimer(item.id)}
      >
        <Text style={styles.actionButtonText}>Delete</Text>
      </TouchableOpacity>
			</View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timers Overview</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Global Timers</Text>
        <Button title="Create random timer" onPress={handleCreateTimer} />
        <FlatList
          data={timers}
          keyExtractor={item => item.id}
          renderItem={renderTimer}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Idle Tracker</Text>
        <Text style={styles.idleText}>Idle: {isIdle ? 'Yes' : 'No'}</Text>
        <Text style={styles.idleText}>Seconds being idle: {idleTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timerDot: {
    fontSize: 14,
    color: '#4caf50',
    marginRight: 8,
  },
  timerId: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  timerTicks: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  actionButton: {
    backgroundColor: '#1976d2',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  idleText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default TimersOverviewScreen; 