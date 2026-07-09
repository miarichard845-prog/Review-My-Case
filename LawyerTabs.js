import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { T } from "../theme";
import LawyerDashboardScreen from "../screens/lawyer/LawyerDashboardScreen";
import LawyerCasesScreen from "../screens/lawyer/LawyerCasesScreen";
import LawyerEarningsScreen from "../screens/lawyer/LawyerEarningsScreen";
import LawyerProfileScreen from "../screens/lawyer/LawyerProfileScreen";

const Tab = createBottomTabNavigator();

const ICONS = { Dashboard: "📊", Cases: "📁", Earnings: "💰", Profile: "👤" };

export default function LawyerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: T.gold,
        tabBarInactiveTintColor: T.textMuted,
        tabBarStyle: { backgroundColor: T.bg, borderTopColor: T.border },
        tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>{ICONS[route.name]}</Text>,
      })}
    >
      <Tab.Screen name="Dashboard" component={LawyerDashboardScreen} />
      <Tab.Screen name="Cases" component={LawyerCasesScreen} />
      <Tab.Screen name="Earnings" component={LawyerEarningsScreen} />
      <Tab.Screen name="Profile" component={LawyerProfileScreen} />
    </Tab.Navigator>
  );
}
