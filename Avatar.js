import { View, Text } from "react-native";
import { T } from "../theme";

export default function Avatar({ initials, size = 36, color = T.gold }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color + "22",
        borderWidth: 2,
        borderColor: color + "44",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color, fontSize: size * 0.35, fontWeight: "800" }}>{initials}</Text>
    </View>
  );
}
