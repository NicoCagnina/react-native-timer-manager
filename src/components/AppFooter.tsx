import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTimerContext } from "../providers/TimerProvider";
import { useIdle } from "../providers/IdleProvider";

const AppFooter = () => {
  const { getTimerState } = useTimerContext();
  const { idleTime } = useIdle();

  return (
    <View style={styles.container}>
			<Text style={styles.globalSeconds}>Global app seconds: {
				getTimerState('global-timer')?.ticks
			}</Text>
      <Text style={styles.idleSeconds}>Seconds being idle: {idleTime}</Text>
    </View>
  );
};

export default AppFooter;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  globalSeconds: {
    fontSize: 16,
    backgroundColor: "#a8e5b3",
    padding: 10,
    width: "100%",
    textAlign: "center",
  },
  idleSeconds: {
    fontSize: 16,
    backgroundColor: "#e5b3a8",
    padding: 10,
    width: "100%",
    textAlign: "center",
  },
});
