import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIdle } from '../providers/IdleProvider';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type UseIdleScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Details'>;
};

const UseIdleScreen = ({ navigation }: UseIdleScreenProps) => {
	const { isIdle, idleTime, resetIdle } = useIdle();

  return (
    <View style={styles.container}>
			<Text style={styles.title}>Pantalla de Detalles</Text>
			<Text>isIdle: {isIdle ? 'true' : 'false'}</Text>
			<Text>idleTime: {idleTime} seconds</Text>
			<Button title="Reset Idle" onPress={() => {}} />
    </View>
  );
}

export default UseIdleScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
		alignItems: 'center',
		paddingTop: 100,
		gap: 20,
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
}); 