import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  TimerDemo: undefined;
  UseIdle: undefined;
};

export type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export type TimerDemoScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TimerDemo'>;
};

export type UseIdleScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UseIdle'>;
};
