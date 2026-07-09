import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { T } from "../theme";
import UserHomeScreen from "../screens/user/UserHomeScreen";
import UserMyCasesScreen from "../screens/user/UserMyCasesScreen";
import UserProfileScreen from "../screens/user/UserProfileScreen";
import UserHelpScreen from "../screens/user/UserHelpScreen";

const Tab = createBottomTabNavigator();

const ICONS = { Home: "🏠", MyCases: "📁", Profile: "👤", Help: "❓" };
const LABELS = { Home: "Home", MyCases: "My Cases", Profile: "Profile", Help: "Help" };

export default function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: T.gold,
        tabBarInactiveTintColor: T.textMuted,
        tabBarStyle: { backgroundColor: T.bg, borderTopColor: T.border },
        tabBarLabel: LABELS[route.name],
        tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>{ICONS[route.name]}</Text>,
      })}
    >
      <Tab.Screen name="Home" component={UserHomeScreen} />
      <Tab.Screen name="MyCases" component={UserMyCasesScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
      <Tab.Screen name="Help" component={UserHelpScreen} />
    </Tab.Navigator>
  );
}
