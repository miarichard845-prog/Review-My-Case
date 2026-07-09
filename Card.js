import { View, TouchableOpacity } from "react-native";
import { T } from "../theme";

export default function Card({ children, accent, style, onPress }) {
  const content = (
    <View
      style={[
        {
          backgroundColor: T.surface,
          borderWidth: 1,
          borderColor: accent ? accent + "44" : T.border,
          borderRadius: 14,
          padding: 16,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }
  return content;
}
