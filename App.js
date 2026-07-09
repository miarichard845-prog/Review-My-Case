import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { T } from "./src/theme";
import { AppProvider } from "./src/context/AppContext";
import RootNavigator from "./src/navigation/RootNavigator";

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: T.bg,
    card: T.bg,
    border: T.border,
    text: T.textPrimary,
    primary: T.gold,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: T.bg }} edges={["top"]}>
        <StatusBar style="light" />
        <AppProvider>
          <NavigationContainer theme={navTheme}>
            <RootNavigator />
          </NavigationContainer>
        </AppProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
