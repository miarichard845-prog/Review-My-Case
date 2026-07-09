import { View, Text, ScrollView, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Label from "../../components/Label";
import Pill from "../../components/Pill";

const KPIS = [
  { label: "Total Cases", value: "1,247", change: "+48 this week", color: T.gold, icon: "📋" },
  { label: "Active Lawyers", value: "34", change: "+4 this month", color: T.emerald, icon: "⚖️" },
  { label: "Cases Resolved", value: "891", change: "71% resolution rate", color: T.blue, icon: "✅" },
  { label: "Platform Revenue", value: "$18,400", change: "+$2,100 this month", color: T.pink, icon: "💰" },
  { label: "Avg Justice Score", value: "63", change: "Up from 58 last month", color: T.purple, icon: "📊" },
  { label: "Countries Active", value: "18", change: "+3 this quarter", color: T.amber, icon: "🌍" },
];

const SYSTEM_HEALTH = [
  { label: "AI Analysis Engine", status: "operational", uptime: "99.97%" },
  { label: "Document Storage", status: "operational", uptime: "99.99%" },
  { label: "Lawyer Matching API", status: "operational", uptime: "99.94%" },
  { label: "Notification Service", status: "degraded", uptime: "97.2%" },
  { label: "Payment Processing", status: "operational", uptime: "99.99%" },
];

const ACTIVITY = [
  { event: "New case submitted", detail: "Marcus T. · Nigeria · Score 82", time: "2 min ago", icon: "📬" },
  { event: "Lawyer accepted case", detail: "Sarah Okonkwo accepted Amara J.", time: "18 min ago", icon: "✅" },
  { event: "Case resolved", detail: "Jerome W. · Settlement reached", time: "1 hour ago", icon: "🏆" },
  { event: "New lawyer verified", detail: "Kwame Asante · Ghana", time: "3 hours ago", icon: "⚖️" },
  { event: "Flagged content", detail: "Possible duplicate case detected", time: "4 hours ago", icon: "⚑" },
];

export default function AdminOverviewScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.h2}>Platform Overview</Text>
        <Text style={{ color: T.textSecondary, fontSize: 14 }}>Review My Case — Admin Control Center</Text>
      </View>

      <View style={styles.kpiGrid}>
        {KPIS.map((k, i) => (
          <View key={i} style={styles.kpiBox}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <Text style={{ fontSize: 22 }}>{k.icon}</Text>
              <Pill label={k.change} color={k.color} />
            </View>
            <Text style={{ color: k.color, fontSize: 26, fontWeight: "900", marginBottom: 2 }}>{k.value}</Text>
            <Text style={{ color: T.textMuted, fontSize: 12 }}>{k.label}</Text>
          </View>
        ))}
      </View>

      <Card style={{ marginBottom: 16 }}>
        <Label>System Health</Label>
        {SYSTEM_HEALTH.map((s, i) => (
          <View key={i} style={[styles.healthRow, i < SYSTEM_HEALTH.length - 1 && { borderBottomWidth: 1, borderBottomColor: T.border }]}>
            <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: s.status === "operational" ? T.emerald : T.amber }} />
              <Text style={{ color: T.textPrimary, fontSize: 14 }}>{s.label}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
              <Text style={{ color: T.textMuted, fontSize: 12 }}>{s.uptime}</Text>
              <Pill label={s.status} color={s.status === "operational" ? T.emerald : T.amber} />
            </View>
          </View>
        ))}
      </Card>

      <Card>
        <Label>Recent Activity</Label>
        {ACTIVITY.map((a, i) => (
          <View key={i} style={[styles.activityRow, i < ACTIVITY.length - 1 && { borderBottomWidth: 1, borderBottomColor: T.border }]}>
            <Text style={{ fontSize: 16, marginRight: 10 }}>{a.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: T.textPrimary, fontSize: 14, fontWeight: "600", marginBottom: 2 }}>{a.event}</Text>
              <Text style={{ color: T.textSecondary, fontSize: 12 }}>{a.detail}</Text>
            </View>
            <Text style={{ color: T.textMuted, fontSize: 11 }}>{a.time}</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  h2: { color: T.textPrimary, fontSize: 22, fontWeight: "800", letterSpacing: -0.5, marginBottom: 4 },
  kpiGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  kpiBox: {
    width: "47.5%",
    backgroundColor: T.surface,
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: 14,
    padding: 16,
  },
  healthRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 9 },
  activityRow: { flexDirection: "row", alignItems: "center", paddingVertical: 9 },
});
