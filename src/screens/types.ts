import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  TimersOverview: undefined;
  TimersOverviewWithIntervals: undefined;
};

export type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export type TimersOverviewScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TimersOverview'>;
};
