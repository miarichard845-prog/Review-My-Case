import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { T } from "../theme";
import AdminOverviewScreen from "../screens/admin/AdminOverviewScreen";
import AdminCasesScreen from "../screens/admin/AdminCasesScreen";
import AdminLawyersScreen from "../screens/admin/AdminLawyersScreen";
import AdminReportsScreen from "../screens/admin/AdminReportsScreen";
import AdminSettingsScreen from "../screens/admin/AdminSettingsScreen";

const Tab = createBottomTabNavigator();

const ICONS = { Overview: "🛡️", Cases: "📁", Lawyers: "⚖️", Reports: "📈", Settings: "⚙️" };

export default function AdminTabs() {
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
      <Tab.Screen name="Overview" component={AdminOverviewScreen} />
      <Tab.Screen name="Cases" component={AdminCasesScreen} />
      <Tab.Screen name="Lawyers" component={AdminLawyersScreen} />
      <Tab.Screen name="Reports" component={AdminReportsScreen} />
      <Tab.Screen name="Settings" component={AdminSettingsScreen} />
    </Tab.Navigator>
  );
}
