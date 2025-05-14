import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";

import AppProvider from "./src/providers/AppProvider";
import { TimersOverviewWithIntervals } from "./src/screens/TimersOverviewWithIntervals";
import TimersOverviewScreen from "./src/screens/TimersOverviewScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
          <Stack.Screen
            name="TimersOverview"
            component={TimersOverviewScreen}
            options={{ title: "Timers Overview" }}
          />
          <Stack.Screen
            name="TimersOverviewWithIntervals"
            component={TimersOverviewWithIntervals}
            options={{ title: "Timers Overview with Intervals" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
