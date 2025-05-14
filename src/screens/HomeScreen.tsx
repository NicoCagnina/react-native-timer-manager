import { StyleSheet, View, Button } from "react-native";
import { HomeScreenProps } from "./types";

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Button
        title="Timers Overview"
        onPress={() => navigation.navigate("TimersOverview")}
      />
      <Button
        title="Timers Overview with Intervals"
        onPress={() => navigation.navigate("TimersOverviewWithIntervals")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
