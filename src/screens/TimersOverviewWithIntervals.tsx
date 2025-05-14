import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface TimerState {
  id: string;
  ticks: number;
  isActive: boolean;
}

const TimersOverviewWithIntervals = () => {
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
    clearInterval(intervalsRef.current[id]);
    delete intervalsRef.current[id];
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
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, []);

  const timerList = Object.values(timers);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        ⏱️ Interval-based Timers
      </Text>

      <Text>Total timers: {timerList.length}</Text>
      <Text>
        Active timers: {timerList.filter((t) => t.isActive).length}
      </Text>

      <View style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}>
        <Button title="➕ Add Timer" onPress={addTimer} />
        <Button
          title="🔙 Back to Optimized"
          onPress={() => navigation.goBack()}
        />
      </View>

      <FlatList
        data={timerList}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ marginTop: 10 }}>
            No timers currently running.
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "#ccc",
              paddingVertical: 6,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.id}</Text>
            <Text>Ticks: {item.ticks}</Text>
            <Text>Status: {item.isActive ? "✅ Running" : "⏸️ Paused"}</Text>

            <View style={{ flexDirection: "row", marginTop: 8, gap: 6 }}>
              <Button
                title={item.isActive ? "Pause" : "Resume"}
                onPress={() => toggleTimer(item.id)}
              />
              <Button
                title="Reset"
                onPress={() => resetTimer(item.id)}
              />
              <Button
                title="❌ Remove"
                color="#FF3B30"
                onPress={() => removeTimer(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TimersOverviewWithIntervals