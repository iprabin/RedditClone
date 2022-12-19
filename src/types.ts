import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Ic from "@expo/vector-icons";
export type RootStackParamList = {
  Home: undefined;
  SubReddit: { subreddit: string };
  Details: { subreddit: string; id: string; title: string };
  User: { user: string };
  Search: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RouteProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>["route"];

export type NavigationProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>["navigation"];

export type IconType =
  | "AntDesign"
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "FontAwesome"
  | "FontAwesome5"
  | "Fontisto"
  | "Foundation"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "MaterialIcons"
  | "Octicons"
  | "SimpleLineIcons"
  | "Zocial";

export type IconName<T extends IconType> = keyof typeof Ic[T]["glyphMap"];
