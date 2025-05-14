import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface TimerState {
  id: string;
  ticks: number;
  isActive: boolean;
}

interface PerformanceMetrics {
  frameTime: number;
  cpuUsage: number;
  memoryUsage: number;
  activeTimers: number;
}

export const TimersOverviewWithIntervals = () => {
  const [timers, setTimers] = useState<Record<string, TimerState>>({});
  const intervalsRef = useRef<Record<string, NodeJS.Timeout>>({});
  const navigation = useNavigation();

  const addTimer = () => {
    const id = `timer-${Object.keys(timers).length + 1}`;

    setTimers((prev) => ({
      ...prev,
      [id]: {
        id,
        ticks: 0,
        isActive: true,
      },
    }));

    const interval = setInterval(() => {
      setTimers((prev) => {
        const timer = prev[id];
        if (!timer || !timer.isActive) return prev;

        return {
          ...prev,
          [id]: {
            ...timer,
            ticks: timer.ticks + 1,
          },
        };
      });
    }, 1000);

    intervalsRef.current[id] = interval;
  };

  const removeTimer = (id: string) => {
    if (intervalsRef.current[id]) {
      clearInterval(intervalsRef.current[id]);
      delete intervalsRef.current[id];
    }

    setTimers((prev) => {
      const newTimers = { ...prev };
      delete newTimers[id];
      return newTimers;
    });
  };

  const toggleTimer = (id: string) => {
    setTimers((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isActive: !prev[id].isActive,
      },
    }));
  };

  const resetTimer = (id: string) => {
    setTimers((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        ticks: 0,
      },
    }));
  };

  useEffect(() => {
    return () => {
      Object.values(intervalsRef.current).forEach((interval) =>
        clearInterval(interval)
      );
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timers Overview (Using setInterval)</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={addTimer}>
          <Text style={styles.buttonText}>Add Timer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back to Optimized Version</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.timersContainer}>
        {Object.values(timers).map((timer) => (
          <View key={timer.id} style={styles.timerCard}>
            <Text style={styles.timerTitle}>Timer {timer.id}</Text>
            <Text style={styles.timerText}>Ticks: {timer.ticks}</Text>
            <Text style={styles.timerText}>
              Status: {timer.isActive ? "Active" : "Paused"}
            </Text>

            <View style={styles.timerButtons}>
              <TouchableOpacity
                style={[styles.timerButton, styles.secondaryButton]}
                onPress={() => toggleTimer(timer.id)}
              >
                <Text style={styles.buttonText}>
                  {timer.isActive ? "Pause" : "Resume"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.timerButton, styles.secondaryButton]}
                onPress={() => resetTimer(timer.id)}
              >
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.timerButton, styles.dangerButton]}
                onPress={() => removeTimer(timer.id)}
              >
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  secondaryButton: {
    backgroundColor: "#5856D6",
  },
  dangerButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  timersContainer: {
    flex: 1,
  },
  timerCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  timerText: {
    fontSize: 16,
    marginBottom: 4,
  },
  timerButtons: {
    flexDirection: "row",
    marginTop: 12,
  },
  timerButton: {
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
});
