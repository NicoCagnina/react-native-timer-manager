import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import TimerDemoScreen from './src/screens/TimerDemoScreen';
import UseIdleScreen from './src/screens/UseIdle';
import AppProvider from './src/providers/AppProvider';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
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
        <Stack.Screen 
          name="UseIdle" 
          component={UseIdleScreen} 
          options={{ title: 'UseIdle' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>
  );
}
