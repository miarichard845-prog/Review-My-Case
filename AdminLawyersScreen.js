import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Avatar from "../../components/Avatar";
import StatusPill from "../../components/StatusPill";
import Pill from "../../components/Pill";
import { PrimaryBtn } from "../../components/Buttons";
import { MOCK_LAWYERS } from "../../data/mockData";

export default function AdminLawyersScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.h2}>Lawyer Network</Text>
        <PrimaryBtn small onPress={() => {}}>+ Invite Lawyer</PrimaryBtn>
      </View>
      <View style={{ gap: 10 }}>
        {MOCK_LAWYERS.map((l) => (
          <Card key={l.id}>
            <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
              <Avatar initials={l.avatar} size={48} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                  <Text style={{ color: T.textPrimary, fontWeight: "700", fontSize: 15 }}>{l.name}</Text>
                  <StatusPill status={l.status} />
                  <Pill label={`★ ${l.rating}`} color={T.gold} />
                </View>
                <Text style={{ color: T.textSecondary, fontSize: 13, marginBottom: 4 }}>{l.spec}</Text>
                <Text style={{ color: T.textMuted, fontSize: 12 }}>
                  {l.country} · {l.cases} cases · Joined {l.joined}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: T.emerald, fontSize: 16, fontWeight: "800" }}>${l.earnings.toLocaleString()}</Text>
                <Text style={{ color: T.textMuted, fontSize: 11 }}>earned</Text>
                <View style={{ flexDirection: "row", gap: 6, marginTop: 8 }}>
                  {l.status === "pending" && (
                    <TouchableOpacity style={styles.verifyBtn}>
                      <Text style={{ color: T.emerald, fontSize: 12, fontWeight: "700" }}>Verify</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={styles.suspendBtn}>
                    <Text style={{ color: T.red, fontSize: 12, fontWeight: "700" }}>Suspend</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  h2: { color: T.textPrimary, fontSize: 22, fontWeight: "800", letterSpacing: -0.5 },
  verifyBtn: { backgroundColor: T.emeraldDim, borderWidth: 1, borderColor: T.emerald + "44", borderRadius: 8, paddingVertical: 5, paddingHorizontal: 10 },
  suspendBtn: { backgroundColor: T.redDim, borderWidth: 1, borderColor: T.red + "44", borderRadius: 8, paddingVertical: 5, paddingHorizontal: 10 },
});
