import { View, Text, StyleSheet } from "react-native";

export default function Pill({ label, color }) {
  return (
    <View style={[styles.pill, { backgroundColor: color + "22", borderColor: color + "44" }]}>
      <Text style={[styles.label, { color }]} numberOfLines={1}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
  },
});
