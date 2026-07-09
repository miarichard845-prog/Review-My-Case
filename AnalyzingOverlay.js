import { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { T } from "../theme";

export default function AnalyzingOverlay() {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#07070fdd",
        zIndex: 200,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Animated.View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          borderWidth: 3,
          borderColor: T.border,
          borderTopColor: T.gold,
          transform: [{ rotate }],
          marginBottom: 20,
        }}
      />
      <Text style={{ color: T.textPrimary, fontSize: 18, fontWeight: "800", marginBottom: 6 }}>
        Reviewing your case...
      </Text>
      <Text style={{ color: T.textSecondary, fontSize: 14 }}>
        Identifying violations and calculating your Justice Score
      </Text>
    </View>
  );
}
