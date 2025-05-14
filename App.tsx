import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import AppProvider from "./src/providers/AppProvider";
import TimersOverviewScreen from "./src/screens/TimersOverviewScreen";
import TimersOverviewWithIntervalsScreen from "./src/screens/TimersOverviewWithIntervals";

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
            component={TimersOverviewWithIntervalsScreen}
            options={{ title: "Timers Overview with Intervals" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
