import { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Label from "../../components/Label";
import Avatar from "../../components/Avatar";
import { PrimaryBtn, GhostBtn } from "../../components/Buttons";
import { MOCK_USER } from "../../data/mockData";

const SETTINGS_ITEMS = [
  { label: "Privacy & Data", icon: "🔒", desc: "Control how your information is used" },
  { label: "Notifications", icon: "🔔", desc: "Email and push preferences" },
  { label: "Language", icon: "🌍", desc: "English (US)" },
  { label: "Security", icon: "🛡️", desc: "Password and two-factor auth" },
];

const STATS = [
  ["2", "Cases Filed"],
  ["1", "Lawyer Matched"],
  ["82", "Best Score"],
  ["4", "Docs Uploaded"],
];

export default function UserProfileScreen() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={{ marginBottom: 16, alignItems: "center", paddingVertical: 28 }}>
        <Avatar initials="MT" size={72} color={T.gold} />
        {editing ? (
          <View style={{ marginTop: 16, width: "100%", gap: 10 }}>
            <TextInput value={name} onChangeText={setName} style={styles.input} />
            <TextInput value={email} onChangeText={setEmail} style={styles.input} />
            <View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>
              <PrimaryBtn small onPress={() => setEditing(false)}>Save Changes</PrimaryBtn>
              <GhostBtn small onPress={() => setEditing(false)}>Cancel</GhostBtn>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.name}>{name}</Text>
            <Text style={{ color: T.textSecondary, fontSize: 14, marginBottom: 4 }}>{email}</Text>
            <Text style={{ color: T.textMuted, fontSize: 13, marginBottom: 16 }}>
              {MOCK_USER.country} · Member since {MOCK_USER.joined}
            </Text>
            <GhostBtn small onPress={() => setEditing(true)}>Edit Profile</GhostBtn>
          </>
        )}
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Label style={{ marginBottom: 0 }}>Notifications</Label>
          <View style={styles.newBadge}>
            <Text style={{ color: T.red, fontSize: 11, fontWeight: "800" }}>2 new</Text>
          </View>
        </View>
        {MOCK_USER.notifications.map((n, i) => (
          <View
            key={i}
            style={[
              styles.rowItem,
              i < 2 && { borderBottomWidth: 1, borderBottomColor: T.border },
            ]}
          >
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: n.read ? T.textMuted : T.gold, marginTop: 5 }} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ color: n.read ? T.textSecondary : T.textPrimary, fontSize: 14, fontWeight: n.read ? "400" : "600", marginBottom: 2 }}>
                {n.text}
              </Text>
              <Text style={{ color: T.textMuted, fontSize: 12 }}>{n.time}</Text>
            </View>
          </View>
        ))}
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Label>Account Settings</Label>
        {SETTINGS_ITEMS.map((s, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.settingsRow,
              i < SETTINGS_ITEMS.length - 1 && { borderBottomWidth: 1, borderBottomColor: T.border },
            ]}
          >
            <Text style={{ fontSize: 18, marginRight: 12 }}>{s.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: T.textPrimary, fontSize: 14, fontWeight: "600" }}>{s.label}</Text>
              <Text style={{ color: T.textMuted, fontSize: 12 }}>{s.desc}</Text>
            </View>
            <Text style={{ color: T.textMuted }}>›</Text>
          </TouchableOpacity>
        ))}
      </Card>

      <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
        {STATS.map(([n, l], i) => (
          <View key={i} style={styles.statBox}>
            <Text style={{ color: T.gold, fontSize: 20, fontWeight: "900" }}>{n}</Text>
            <Text style={{ color: T.textMuted, fontSize: 11, marginTop: 2 }}>{l}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.signOut}>
        <Text style={{ color: T.red, fontSize: 15, fontWeight: "600" }}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  input: {
    backgroundColor: T.surfaceHigh,
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: 10,
    padding: 10,
    color: T.textPrimary,
    fontSize: 15,
    textAlign: "center",
  },
  name: { color: T.textPrimary, fontSize: 22, fontWeight: "800", marginTop: 14, marginBottom: 4 },
  newBadge: { backgroundColor: T.red + "22", borderRadius: 20, paddingHorizontal: 8, paddingVertical: 1 },
  rowItem: { flexDirection: "row", paddingVertical: 10 },
  settingsRow: { flexDirection: "row", alignItems: "center", paddingVertical: 11 },
  statBox: {
    flex: 1,
    backgroundColor: T.surface,
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  signOut: {
    borderWidth: 1,
    borderColor: T.red + "44",
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: "center",
  },
});
