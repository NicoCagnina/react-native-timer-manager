import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { useTimerContext } from "../providers/TimerProvider";

const TimersOverviewScreen = () => {
  const { getTimers, getActiveTimers, pauseAll, resumeAll, registerTimer } =
    useTimerContext();

  const [frameTime, setFrameTime] = useState(0);
  const [prevTime, setPrevTime] = useState(Date.now());
  const [timers, setTimers] = useState(getTimers());
  const [paused, setPaused] = useState(false);
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setFrameTime(now - prevTime);
      setPrevTime(now);
      setTimers(getTimers());
    }, 1000);
    return () => clearInterval(interval);
  }, [prevTime]);

  const togglePause = () => {
    if (paused) {
      resumeAll();
    } else {
      pauseAll();
    }
    setPaused(!paused);
  };

  const createRandomTimer = () => {
    const id = `timer-${Math.random().toString(36).substring(2, 8)}`;
    const tags = ["network", "fetch", "debug"];
    const tag = tags[Math.floor(Math.random() * tags.length)];
    const interval = 1000;

    let ticks = 0;

    registerTimer({
      id,
      tag,
      callback: () => {
        ticks++;
      },
    });
  };

  const uniqueTags = Array.from(
    new Set(timers.map((t) => t.tag).filter(Boolean))
  );
  const filteredTimers = tagFilter
    ? timers.filter((t) => t.tag === tagFilter)
    : timers;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        🕒 Timer Debug Panel
      </Text>

      <Text>Frame time: {frameTime}ms</Text>
      <Text>Total timers: {timers.length}</Text>
      <Text>Active timers: {getActiveTimers().length}</Text>

      <View style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}>
        <Button
          title={paused ? "▶️ Resume All" : "⏸️ Pause All"}
          onPress={togglePause}
        />
        <Button title="➕ Add Random Timer" onPress={createRandomTimer} />
      </View>

      <View
        style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 10 }}
      >
        <Button title="All" onPress={() => setTagFilter(null)} />
        {uniqueTags.map((tag) => (
          <View key={tag} style={{ marginHorizontal: 4 }}>
            <Button
              title={tag as string}
              onPress={() => setTagFilter(tag as string)}
            />
          </View>
        ))}
      </View>

      <FlatList
        data={filteredTimers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "#ccc",
              paddingVertical: 6,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {item.id} {item.tag ? `(${item.tag})` : ""}
            </Text>
            <Text>Ticks: {item.tickCount}</Text>
            <Text>Status: {item.active ? "✅ Running" : "⏸️ Paused"}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 10 }}>
            No timers found with current filter.
          </Text>
        }
      />
    </View>
  );
};

export default TimersOverviewScreen;
