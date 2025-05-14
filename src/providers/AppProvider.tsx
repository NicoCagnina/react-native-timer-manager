import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { IdleProvider } from "./IdleProvider";
import { TimerProvider } from "./TimerProvider";
import TimerInspectorWidget from "../components/TimerInspectorWidget";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TimerProvider>
        <IdleProvider timeout={5000}>
          {children}
          <TimerInspectorWidget />
        </IdleProvider>
      </TimerProvider>
    </SafeAreaView>
  );
};

export default AppProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
