import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  TimerDemo: undefined;
  UseIdle: undefined;
  TimersOverview: undefined;
};

export type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export type TimersOverviewScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TimersOverview'>;
};
