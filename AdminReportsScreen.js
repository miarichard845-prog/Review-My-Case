import { View, Text, ScrollView, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Label from "../../components/Label";
import { GhostBtn } from "../../components/Buttons";

const BREAKDOWNS = [
  { label: "Cases by Country", data: [["Nigeria", 38], ["USA", 24], ["UK", 14], ["Ghana", 10], ["Other", 14]], color: T.purple },
  { label: "Cases by Category", data: [["Wrongful Conviction", 31], ["Civil Rights", 22], ["Police Misconduct", 18], ["Employment", 12], ["Other", 17]], color: T.blue },
];

const SCORE_DIST = [
  ["0-20", 4, 8],
  ["21-40", 11, 22],
  ["41-60", 29, 58],
  ["61-80", 41, 82],
  ["81-100", 15, 30],
];

export default function AdminReportsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h2}>Reports & Analytics</Text>

      <View style={{ gap: 8, marginBottom: 20 }}>
        {BREAKDOWNS.map((r, i) => (
          <Card key={i}>
            <Label>{r.label}</Label>
            {r.data.map(([k, v], j) => (
              <View key={j} style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                  <Text style={{ color: T.textSecondary, fontSize: 12 }}>{k}</Text>
                  <Text style={{ color: T.textPrimary, fontSize: 12, fontWeight: "700" }}>{v}%</Text>
                </View>
                <View style={{ height: 4, backgroundColor: T.border, borderRadius: 2 }}>
                  <View style={{ height: 4, backgroundColor: r.color, borderRadius: 2, width: `${v}%` }} />
                </View>
              </View>
            ))}
          </Card>
        ))}
      </View>

      <Card style={{ marginBottom: 16 }}>
        <Label>Justice Score Distribution</Label>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "flex-end", height: 80, marginBottom: 8 }}>
          {SCORE_DIST.map(([range, pct, h], i) => (
            <View key={i} style={{ flex: 1, alignItems: "center", gap: 4 }}>
              <Text style={{ color: T.textMuted, fontSize: 10 }}>{pct}%</Text>
              <View style={{ width: "100%", height: h, backgroundColor: T.gold, borderTopLeftRadius: 4, borderTopRightRadius: 4 }} />
              <Text style={{ color: T.textMuted, fontSize: 10 }}>{range}</Text>
            </View>
          ))}
        </View>
        <Text style={{ color: T.textMuted, fontSize: 12 }}>Most cases score 61–80, indicating moderate-to-strong basis for review.</Text>
      </Card>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <GhostBtn small onPress={() => {}}>Download Full Report (PDF)</GhostBtn>
        <GhostBtn small onPress={() => {}}>Export Raw Data (CSV)</GhostBtn>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  h2: { color: T.textPrimary, fontSize: 22, fontWeight: "800", letterSpacing: -0.5, marginBottom: 20 },
});
