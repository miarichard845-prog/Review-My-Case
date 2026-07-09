import { View, Text, ScrollView, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Label from "../../components/Label";
import Avatar from "../../components/Avatar";
import Pill from "../../components/Pill";
import { PrimaryBtn } from "../../components/Buttons";

const SPECIALIZATIONS = ["Criminal Defense", "Appeals", "Wrongful Conviction", "Civil Rights", "Asset Recovery"];
const AVAILABILITY = [
  ["Max cases/month", "10"],
  ["Response time", "< 24 hours"],
  ["Pro bono slots", "2/month"],
  ["Languages", "English, Yoruba, Igbo"],
];

export default function LawyerProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={{ alignItems: "center", paddingVertical: 28, marginBottom: 16 }}>
        <Avatar initials="SO" size={72} />
        <Text style={styles.name}>Sarah Okonkwo</Text>
        <Text style={{ color: T.textSecondary, fontSize: 14, marginBottom: 4 }}>Criminal Defense / Appeals</Text>
        <Text style={{ color: T.textMuted, fontSize: 13, marginBottom: 14 }}>Lagos, Nigeria · Member since Nov 2023</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pill label="Verified ✓" color={T.emerald} />
          <Pill label="4.9 ★" color={T.gold} />
          <Pill label="14 cases" color={T.blue} />
        </View>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Label>Specializations</Label>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {SPECIALIZATIONS.map((s, i) => (
            <View key={i} style={styles.specChip}>
              <Text style={{ color: T.textSecondary, fontSize: 13 }}>{s}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Label>Availability Settings</Label>
        {AVAILABILITY.map(([k, v], i) => (
          <View key={i} style={[styles.settingRow, i < AVAILABILITY.length - 1 && { borderBottomWidth: 1, borderBottomColor: T.border }]}>
            <Text style={{ color: T.textSecondary, fontSize: 14 }}>{k}</Text>
            <Text style={{ color: T.textPrimary, fontSize: 14, fontWeight: "600" }}>{v}</Text>
          </View>
        ))}
        <View style={{ marginTop: 12 }}>
          <PrimaryBtn small onPress={() => {}}>Edit Settings</PrimaryBtn>
        </View>
      </Card>

      <Card>
        <Label>Bar License & Verification</Label>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={{ color: T.textPrimary, fontSize: 14, fontWeight: "600", marginBottom: 4 }}>Nigerian Bar Association</Text>
            <Text style={{ color: T.textMuted, fontSize: 12 }}>License #NBA-2019-04821 · Verified Jan 2024</Text>
          </View>
          <Pill label="✓ Verified" color={T.emerald} />
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  name: { color: T.textPrimary, fontSize: 22, fontWeight: "800", marginTop: 14, marginBottom: 4 },
  specChip: { backgroundColor: T.surfaceHigh, borderWidth: 1, borderColor: T.border, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  settingRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 9 },
});
