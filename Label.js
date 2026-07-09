import { Text } from "react-native";
import { T } from "../theme";

export default function Label({ children, style }) {
  return (
    <Text
      style={[
        {
          color: T.textSecondary,
          fontSize: 11,
          fontWeight: "700",
          letterSpacing: 1,
          marginBottom: 8,
          textTransform: "uppercase",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
