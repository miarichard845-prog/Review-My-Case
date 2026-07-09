import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { T } from "../theme";

const ROLES = [
  { id: "user", label: "👤 User", desc: "Case Submitter" },
  { id: "lawyer", label: "⚖️ Lawyer", desc: "Attorney Portal" },
  { id: "admin", label: "🛡️ Admin", desc: "Platform Control" },
];

export default function RoleSwitcher({ role, setRole }) {
  const current = ROLES.find((r) => r.id === role);

  return (
    <View style={styles.wrapper}>
      <View style={styles.switchRow}>
        {ROLES.map((r) => {
          const active = role === r.id;
          return (
            <TouchableOpacity
              key={r.id}
              onPress={() => setRole(r.id)}
              style={[
                styles.roleBtn,
                { backgroundColor: active ? T.goldDim : "transparent", borderColor: active ? T.gold : T.border },
              ]}
            >
              <Text style={{ color: active ? T.gold : T.textMuted, fontSize: 13, fontWeight: "700" }}>{r.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.logoRow}>
        <Text style={{ fontSize: 20, marginRight: 8 }}>⚖️</Text>
        <View>
          <Text style={styles.logoTitle}>Review My Case</Text>
          <Text style={styles.logoDesc}>{current?.desc}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: T.bg, borderBottomWidth: 1, borderBottomColor: T.border },
  switchRow: { flexDirection: "row", justifyContent: "center", gap: 6, paddingTop: 10, paddingHorizontal: 16 },
  roleBtn: {
    borderWidth: 1.5,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  logoRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, paddingHorizontal: 20 },
  logoTitle: { color: T.textPrimary, fontSize: 15, fontWeight: "900", letterSpacing: -0.3 },
  logoDesc: { color: T.textMuted, fontSize: 11 },
});
