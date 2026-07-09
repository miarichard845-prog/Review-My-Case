import { View, Text, ScrollView, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Label from "../../components/Label";
import Avatar from "../../components/Avatar";
import Pill from "../../components/Pill";
import ScoreRing from "../../components/ScoreRing";
import UrgencyDot from "../../components/UrgencyDot";
import { PrimaryBtn } from "../../components/Buttons";
import { MOCK_CASES } from "../../data/mockData";

export default function LawyerDashboardScreen({ navigation }) {
  const pending = MOCK_CASES.filter((c) => c.status === "pending");
  const reviewing = MOCK_CASES.filter((c) => c.status === "reviewing");
  const urgent = pending.filter((c) => c.urgency === "immediate");

  const goToCase = (c) => navigation.navigate("Cases", { openCase: c });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ marginBottom: 24 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <View>
            <Text style={styles.h2}>Welcome, Sarah</Text>
            <Text style={{ color: T.textSecondary, fontSize: 14 }}>Criminal Defense / Appeals · Nigeria</Text>
          </View>
          <Avatar initials="SO" size={48} />
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {[["📬", pending.length, "New cases"], ["📂", reviewing.length, "In review"], ["✅", "11", "Resolved"], ["💰", "$3,200", "Earned"]].map(
            ([icon, n, l], x) => (
              <View key={x} style={styles.statBox}>
                <Text style={{ fontSize: 18, marginBottom: 4 }}>{icon}</Text>
                <Text style={{ color: T.gold, fontSize: 17, fontWeight: "900" }}>{n}</Text>
                <Text style={{ color: T.textMuted, fontSize: 11, marginTop: 2 }}>{l}</Text>
              </View>
            )
          )}
        </View>
      </View>

      {urgent.length > 0 && (
        <Card accent={T.red} style={{ backgroundColor: T.redDim, marginBottom: 16 }}>
          <Text style={{ color: T.red, fontSize: 12, fontWeight: "800", letterSpacing: 1, marginBottom: 10 }}>
            🚨 URGENT — ACTION REQUIRED
          </Text>
          {urgent.map((c) => (
            <View key={c.id} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text style={{ color: "#fca5a5", fontWeight: "700", fontSize: 14 }}>
                  {c.name} · {c.category}
                </Text>
                <Text style={{ color: T.textMuted, fontSize: 12 }}>{c.country}</Text>
              </View>
              <PrimaryBtn small onPress={() => goToCase(c)}>Review Now</PrimaryBtn>
            </View>
          ))}
        </Card>
      )}

      <View style={{ marginBottom: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <Label style={{ marginBottom: 0 }}>New Cases ({pending.length})</Label>
        </View>
        <View style={{ gap: 8 }}>
          {pending.map((c) => (
            <Card key={c.id} onPress={() => goToCase(c)}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <View style={{ flex: 1, paddingRight: 12 }}>
                  <View style={{ flexDirection: "row", gap: 8, alignItems: "center", marginBottom: 6 }}>
                    <UrgencyDot urgency={c.urgency} />
                    <Text style={{ color: T.textPrimary, fontWeight: "700", fontSize: 14 }}>{c.name}</Text>
                    <Pill label={c.category} color={T.purple} />
                  </View>
                  <Text style={{ color: T.textSecondary, fontSize: 13, lineHeight: 18, marginBottom: 6 }}>
                    {c.story.slice(0, 80)}...
                  </Text>
                  <Text style={{ color: T.textMuted, fontSize: 12 }}>
                    {c.country} · {c.date}
                  </Text>
                </View>
                <ScoreRing score={c.score} size={52} />
              </View>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  h2: { color: T.textPrimary, fontSize: 22, fontWeight: "800", letterSpacing: -0.5, marginBottom: 4 },
  statBox: {
    flex: 1,
    backgroundColor: T.surface,
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
});
