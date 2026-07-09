import { TouchableOpacity, Text } from "react-native";
import { T } from "../theme";

export function PrimaryBtn({ children, onPress, disabled, small }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={{
        backgroundColor: disabled ? T.surfaceHigh : T.gold,
        borderRadius: small ? 10 : 14,
        paddingVertical: small ? 9 : 15,
        paddingHorizontal: small ? 16 : 20,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
      }}
    >
      <Text
        style={{
          color: disabled ? T.textMuted : "#07070f",
          fontSize: small ? 13 : 15,
          fontWeight: "800",
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export function GhostBtn({ children, onPress, small }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: T.border,
        borderRadius: small ? 10 : 14,
        paddingVertical: small ? 8 : 13,
        paddingHorizontal: small ? 14 : 20,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ color: T.textSecondary, fontSize: small ? 13 : 15, fontWeight: "600" }}>{children}</Text>
    </TouchableOpacity>
  );
}
