import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeScreenProps } from './types';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Button
        title="Timer demo"
        onPress={() => navigation.navigate('TimerDemo')}
      />
      <Button
        title="UseIdle"
        onPress={() => navigation.navigate('UseIdle')}
      />
    </View>
  );
}

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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});