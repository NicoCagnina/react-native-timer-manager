import { SafeAreaView, StyleSheet, Modal, View, Text, Button } from "react-native";
import React from "react";
import { IdleProvider, useIdle } from "./IdleProvider";
import { TimerProvider, useTimerContext } from "./TimerProvider";
import TimerInspectorWidget from "../components/TimerInspectorWidget";

const DemoButton = () => {
  const { registerTimer } = useTimerContext();

  const addDemoTimer = () => {
    const id = `demo-timer-${Math.random().toString(36).substring(2, 8)}`;
    let count = 0;

    registerTimer({
      id,
      tag: "demo",
      callback: () => {
        count++;
        console.log(`Demo timer ${id} tick: ${count}`);
      },
    });
  };

  return (
    <View style={styles.demoButtonContainer}>
      <Button 
        title="➕ Add console.log demo timer" 
        onPress={addDemoTimer}
      />
    </View>
  );
};

const IdleModal = () => {
  const { isIdle, resetIdle } = useIdle();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isIdle}
      onRequestClose={resetIdle}
    >
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
      }}>
        <View style={{ 
          backgroundColor: 'white', 
          padding: 20, 
          borderRadius: 10,
          elevation: 5
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            User is Idle
          </Text>
          <Button 
            title="Close" 
            onPress={resetIdle} 
          />
        </View>
      </View>
    </Modal>
  );
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TimerProvider>
        <IdleProvider timeout={0}>
          {children}
          <TimerInspectorWidget />
          <IdleModal />
          <DemoButton />
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
  demoButtonContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 999,
  },
});
