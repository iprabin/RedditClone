import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Details, SubReddit, User, Search } from "../screens";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ["http://localhost:19006/"],
  config: {
    screens: {
      Home: "",
      SubReddit: "/r/:subreddit",
      Details: "/r/:subreddit/comments/:id/:title",
      User: "/u/:user",
      Search: "/search",
    },
  },
};

function StackView() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SubReddit" component={SubReddit} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackView;
