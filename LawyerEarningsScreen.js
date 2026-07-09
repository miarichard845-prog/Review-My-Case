import { View, Text, ScrollView, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Label from "../../components/Label";
import Pill from "../../components/Pill";
import { GhostBtn } from "../../components/Buttons";

const PAYOUTS = [
  { name: "Marcus T.", case: "Wrongful Conviction", amount: "$450", date: "Jan 20", type: "Lead fee" },
  { name: "Fatima K.", case: "Civil Rights", amount: "$300", date: "Jan 15", type: "Lead fee" },
  { name: "Amara J.", case: "Police Misconduct", amount: "$1,200", date: "Dec 28", type: "Case settlement %" },
  { name: "Jerome W.", case: "False Accusation", amount: "$250", date: "Dec 10", type: "Lead fee" },
];

export default function LawyerEarningsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h2}>Earnings</Text>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
        {[["$3,200", "Total earned"], ["$450", "This month"], ["14", "Cases taken"], ["$229", "Per case avg"]].map(([n, l], i) => (
          <View key={i} style={styles.statBox}>
            <Text style={{ color: T.gold, fontSize: 18, fontWeight: "900" }}>{n}</Text>
            <Text style={{ color: T.textMuted, fontSize: 11, marginTop: 2 }}>{l}</Text>
          </View>
        ))}
      </View>

      <Card style={{ marginBottom: 16 }}>
        <Label>Recent Payouts</Label>
        {PAYOUTS.map((p, i) => (
          <View key={i} style={[styles.payoutRow, i < PAYOUTS.length - 1 && { borderBottomWidth: 1, borderBottomColor: T.border }]}>
            <View>
              <Text style={{ color: T.textPrimary, fontSize: 14, fontWeight: "600", marginBottom: 2 }}>
                {p.name} · {p.case}
              </Text>
              <Text style={{ color: T.textMuted, fontSize: 12 }}>
                {p.date} · {p.type}
              </Text>
            </View>
            <Text style={{ color: T.emerald, fontWeight: "800", fontSize: 15 }}>+{p.amount}</Text>
          </View>
        ))}
      </Card>

      <Card>
        <Label>Subscription Plan</Label>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={{ color: T.textPrimary, fontWeight: "700", fontSize: 15, marginBottom: 4 }}>Professional Plan</Text>
            <Text style={{ color: T.textSecondary, fontSize: 13 }}>Unlimited case access · Priority matching · $99/mo</Text>
          </View>
          <Pill label="Active" color={T.emerald} />
        </View>
        <View style={{ marginTop: 12, flexDirection: "row", gap: 8 }}>
          <GhostBtn small onPress={() => {}}>Manage Plan</GhostBtn>
          <GhostBtn small onPress={() => {}}>Billing History</GhostBtn>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  h2: { color: T.textPrimary, fontSize: 22, fontWeight: "800", letterSpacing: -0.5, marginBottom: 20 },
  statBox: {
    flex: 1,
    backgroundColor: T.surface,
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  payoutRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 },
});
