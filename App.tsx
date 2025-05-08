import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import TimerDemoScreen from './src/screens/TimerDemoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }}
        />
        <Stack.Screen 
          name="TimerDemo" 
          component={TimerDemoScreen} 
          options={{ title: 'Timer' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
