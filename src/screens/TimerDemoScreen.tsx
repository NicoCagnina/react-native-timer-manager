import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useTimerContext } from '../providers/TimerProvider';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type TimerDemoScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Details'>;
};

const TimerDemoScreen = ({ navigation }: TimerDemoScreenProps) => {
const [seconds, setSeconds] = useState(0);
  const registerCallback = useTimerContext();

  useEffect(() => {
      // Register a callback that will be called every second
      registerCallback('timer-example', (ticks) => {
          setSeconds(ticks);
      });

      return () => {
          registerCallback('timer-example');
      };
  }, [registerCallback]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Timer Example</Text>
            <Text style={styles.text}>
                Seconds elapsed: <Text style={styles.mono}>{seconds}</Text>
            </Text>
        </View>
    );
}

export default TimerDemoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  mono: {
    fontFamily: 'monospace',
  },
}); 