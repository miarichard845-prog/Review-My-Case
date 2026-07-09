import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Label from "../../components/Label";

const SECTIONS = [
  {
    section: "AI Configuration",
    items: [
      { label: "AI Model", value: "claude-sonnet-4-6" },
      { label: "Max Justice Score requests/day", value: "5,000" },
      { label: "Auto-flag threshold", value: "Score < 30" },
    ],
  },
  {
    section: "Monetization",
    items: [
      { label: "Lead fee per case", value: "$45" },
      { label: "Lawyer subscription (monthly)", value: "$99" },
      { label: "Settlement commission", value: "3%" },
    ],
  },
  {
    section: "Access Control",
    items: [
      { label: "User registration", value: "Open" },
      { label: "Lawyer applications", value: "Invite only" },
      { label: "Public case visibility", value: "Off — private" },
    ],
  },
  {
    section: "Compliance",
    items: [
      { label: "Legal disclaimer shown", value: "All screens" },
      { label: "Data retention policy", value: "7 years" },
      { label: "GDPR / NDPR compliance", value: "Active" },
    ],
  },
];

export default function AdminSettingsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h2}>Platform Settings</Text>
      {SECTIONS.map((section, si) => (
        <Card key={si} style={{ marginBottom: 14 }}>
          <Label>{section.section}</Label>
          {section.items.map((item, ii) => (
            <View
              key={ii}
              style={[styles.itemRow, ii < section.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: T.border }]}
            >
              <Text style={{ color: T.textSecondary, fontSize: 14 }}>{item.label}</Text>
              <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                <Text style={{ color: T.textPrimary, fontSize: 14, fontWeight: "600" }}>{item.value}</Text>
                <TouchableOpacity style={styles.editBtn}>
                  <Text style={{ color: T.gold, fontSize: 11, fontWeight: "700" }}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  h2: { color: T.textPrimary, fontSize: 22, fontWeight: "800", letterSpacing: -0.5, marginBottom: 20 },
  itemRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 9 },
  editBtn: { borderWidth: 1, borderColor: T.border, borderRadius: 6, paddingVertical: 3, paddingHorizontal: 8 },
});
