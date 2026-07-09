import { View, Text, StyleSheet } from "react-native";
import { T } from "../theme";

export default function ScoreBadge({ score }) {
  const c = score >= 70 ? T.emerald : score >= 45 ? T.amber : T.red;
  return (
    <View style={[styles.badge, { backgroundColor: c + "22", borderColor: c + "44" }]}>
      <Text style={[styles.text, { color: c }]}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "800",
  },
});
