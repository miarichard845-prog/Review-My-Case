import { View, Text, ScrollView, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Label from "../../components/Label";
import ScoreBadge from "../../components/ScoreBadge";
import { PrimaryBtn, GhostBtn } from "../../components/Buttons";
import IntakeModal from "../../components/IntakeModal";
import AnalyzingOverlay from "../../components/AnalyzingOverlay";
import { useAppContext } from "../../context/AppContext";

const HOW_IT_WORKS = [
  { icon: "💬", t: "Tell your story", d: "in plain language" },
  { icon: "🔍", t: "AI detects violations", d: "& appeal grounds" },
  { icon: "📊", t: "Get a Justice Score", d: "for your case" },
  { icon: "🤝", t: "Match with", d: "free or no-fee lawyers" },
];

const STATS = [
  ["⚖️", "1,240+", "Cases reviewed"],
  ["🌍", "18", "Countries"],
  ["🤝", "Free", "To start"],
  ["📊", "AI", "Powered"],
];

export default function UserHomeScreen({ navigation }) {
  const { intakeOpen, setIntakeOpen, analyzing, handleIntakeComplete } = useAppContext();

  const onComplete = async (form) => {
    await handleIntakeComplete(form);
    navigation.navigate("MyCases");
  };

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <View style={styles.badgeRow}>
            <Text style={{ fontSize: 13 }}>⚖️</Text>
            <Text style={styles.badgeGold}>REVIEW MY CASE</Text>
            <Text style={{ color: T.textMuted, fontSize: 13 }}>·</Text>
            <Text style={{ color: T.textSecondary, fontSize: 13, fontWeight: "500" }}>Global Legal Platform</Text>
          </View>
          <Text style={styles.h1}>
            Every case deserves{"\n"}
            <Text style={{ color: T.goldLight }}>a second look.</Text>
          </Text>
          <Text style={styles.subtitle}>
            You don't need to know legal terms. Just tell your story. Our AI organizes your case, identifies
            potential violations, and connects you with lawyers who can actually help —{" "}
            <Text style={{ color: T.textPrimary, fontWeight: "700" }}>free or no-win-no-fee.</Text>
          </Text>
          <PrimaryBtn onPress={() => setIntakeOpen(true)}>Review My Case — It's Free →</PrimaryBtn>
        </View>

        <View style={styles.grid2}>
          {HOW_IT_WORKS.map((f, i) => (
            <View key={i} style={styles.featureBox}>
              <Text style={{ fontSize: 26 }}>{f.icon}</Text>
              <Text style={styles.featureText}>
                {f.t} {f.d}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.statsRow}>
          {STATS.map(([icon, n, l], x) => (
            <View key={x} style={styles.statBox}>
              <Text style={{ fontSize: 18, marginBottom: 4 }}>{icon}</Text>
              <Text style={styles.statValue}>{n}</Text>
              <Text style={styles.statLabel}>{l}</Text>
            </View>
          ))}
        </View>

        <Card style={{ marginBottom: 16 }}>
          <Label>Your recent case</Label>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
              <Text style={styles.recentTitle}>Wrongful Conviction — Asset Theft</Text>
              <Text style={styles.recentSub}>Lawyer matched: Sarah Okonkwo</Text>
            </View>
            <ScoreBadge score={82} />
          </View>
          <View style={{ marginTop: 12, flexDirection: "row", gap: 8 }}>
            <PrimaryBtn small onPress={() => navigation.navigate("MyCases")}>View Case</PrimaryBtn>
            <GhostBtn small onPress={() => navigation.navigate("MyCases")}>All Cases</GhostBtn>
          </View>
        </Card>
      </ScrollView>

      <IntakeModal visible={intakeOpen} onClose={() => setIntakeOpen(false)} onComplete={onComplete} />
      {analyzing && <AnalyzingOverlay />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  hero: { alignItems: "center", marginBottom: 32 },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: T.goldDim,
    borderWidth: 1,
    borderColor: T.gold + "33",
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 18,
    marginBottom: 20,
  },
  badgeGold: { color: T.gold, fontSize: 13, fontWeight: "800", letterSpacing: 1 },
  h1: {
    fontSize: 34,
    fontWeight: "900",
    color: T.textPrimary,
    letterSpacing: -1,
    lineHeight: 38,
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    color: T.textSecondary,
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 28,
  },
  grid2: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  featureBox: {
    width: "47%",
    backgroundColor: T.surface,
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: 14,
    padding: 16,
    gap: 10,
  },
  featureText: { color: T.textSecondary, fontSize: 15, lineHeight: 20, fontWeight: "500" },
  statsRow: { flexDirection: "row", gap: 8, marginBottom: 24 },
  statBox: {
    flex: 1,
    backgroundColor: T.surface,
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  statValue: { color: T.gold, fontSize: 16, fontWeight: "900" },
  statLabel: { color: T.textMuted, fontSize: 11, marginTop: 2, textAlign: "center" },
  recentTitle: { color: T.textPrimary, fontWeight: "700", fontSize: 15, marginBottom: 4 },
  recentSub: { color: T.textSecondary, fontSize: 13 },
});
