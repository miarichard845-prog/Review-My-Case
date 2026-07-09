import { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Label from "../../components/Label";
import Pill from "../../components/Pill";
import StatusPill from "../../components/StatusPill";
import UrgencyDot from "../../components/UrgencyDot";
import ScoreRing from "../../components/ScoreRing";
import { PrimaryBtn } from "../../components/Buttons";
import { MOCK_CASES } from "../../data/mockData";

const FILTERS = ["all", "pending", "reviewing", "matched", "closed"];

function CaseDetail({ item, onBack }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onBack} style={{ marginBottom: 20 }}>
        <Text style={{ color: T.gold, fontSize: 14, fontWeight: "700" }}>← Back to Cases</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={styles.h2}>{item.name}</Text>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            <Pill label={item.category} color={T.purple} />
            <StatusPill status={item.status} />
            <Pill label={item.country} color={T.blue} />
            <Pill
              label={item.urgency === "immediate" ? "🚨 Urgent" : item.urgency === "soon" ? "⚠️ Soon" : "Standard"}
              color={item.urgency === "immediate" ? T.red : item.urgency === "soon" ? T.amber : T.emerald}
            />
          </View>
        </View>
        <ScoreRing score={item.score} size={80} />
      </View>

      <Card style={{ marginBottom: 12 }}>
        <Label>Violations Identified</Label>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
          {item.violations.map((v, i) => (
            <Pill key={i} label={v} color={T.red} />
          ))}
        </View>
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <Label>Case Summary</Label>
        <Text style={{ color: T.textPrimary, fontSize: 15, lineHeight: 24 }}>{item.story}</Text>
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <Label>Documents {item.hasFiles ? "(uploaded)" : "(none yet)"}</Label>
        {item.hasFiles ? (
          ["Arrest record.pdf", "Bail denial.pdf", "Bank statement.pdf"].map((d, i) => (
            <View key={i} style={styles.docRow}>
              <Text style={{ color: T.textSecondary, fontSize: 14 }}>📎 {d}</Text>
              <Text style={{ color: T.gold, fontSize: 13, fontWeight: "600" }}>Download</Text>
            </View>
          ))
        ) : (
          <Text style={{ color: T.textMuted, fontSize: 13 }}>Client has not uploaded documents yet.</Text>
        )}
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Label>Your Decision</Label>
        <Text style={{ color: T.textSecondary, fontSize: 14, lineHeight: 20, marginBottom: 14 }}>
          Review the case above and decide whether to accept, request more information, or decline.
        </Text>
        <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
          <PrimaryBtn small onPress={() => {}}>✓ Accept Case</PrimaryBtn>
          <TouchableOpacity style={styles.amberBtn}>
            <Text style={{ color: T.amber, fontSize: 13, fontWeight: "700" }}>📋 Request More Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.redBtn}>
            <Text style={{ color: T.red, fontSize: 13, fontWeight: "700" }}>✕ Decline</Text>
          </TouchableOpacity>
        </View>
      </Card>

      <Card>
        <Label>Message Client</Label>
        <TextInput
          placeholder="Write a message to the client..."
          placeholderTextColor={T.textMuted}
          multiline
          numberOfLines={3}
          style={styles.textarea}
        />
        <PrimaryBtn small onPress={() => {}}>Send Message</PrimaryBtn>
      </Card>
    </ScrollView>
  );
}

export default function LawyerCasesScreen({ route }) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (route?.params?.openCase) {
      setSelected(route.params.openCase);
    }
  }, [route?.params?.openCase]);

  const filtered = filter === "all" ? MOCK_CASES : MOCK_CASES.filter((c) => c.status === filter);

  if (selected) return <CaseDetail item={selected} onBack={() => setSelected(null)} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.h2}>Case Queue</Text>
        <Text style={{ color: T.textSecondary, fontSize: 14 }}>{filtered.length} cases</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={[styles.filterChip, { backgroundColor: active ? T.goldDim : "transparent", borderColor: active ? T.gold : T.border }]}
            >
              <Text style={{ color: active ? T.gold : T.textSecondary, fontSize: 12, fontWeight: "700", textTransform: "capitalize" }}>
                {f}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ gap: 10 }}>
        {filtered.map((c) => (
          <Card key={c.id} onPress={() => setSelected(c)}>
            <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
              <ScoreRing score={c.score} size={56} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 6 }}>
                  <Text style={{ color: T.textPrimary, fontWeight: "700", fontSize: 15 }}>{c.name}</Text>
                  <StatusPill status={c.status} />
                  <UrgencyDot urgency={c.urgency} />
                </View>
                <Pill label={c.category} color={T.purple} />
                <Text style={{ color: T.textSecondary, fontSize: 13, lineHeight: 18, marginVertical: 8 }}>
                  {c.story.slice(0, 90)}...
                </Text>
                <Text style={{ color: T.textMuted, fontSize: 12 }}>
                  {c.country} · {c.date} {c.hasFiles && "· 📎 Has files"}
                </Text>
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
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  h2: { color: T.textPrimary, fontSize: 22, fontWeight: "800", letterSpacing: -0.5 },
  filterChip: { borderWidth: 1, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12 },
  docRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 },
  amberBtn: { backgroundColor: T.amberDim, borderWidth: 1, borderColor: T.amber + "44", borderRadius: 10, paddingVertical: 9, paddingHorizontal: 16 },
  redBtn: { backgroundColor: T.redDim, borderWidth: 1, borderColor: T.red + "44", borderRadius: 10, paddingVertical: 9, paddingHorizontal: 16 },
  textarea: {
    backgroundColor: T.surfaceHigh,
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: 10,
    padding: 12,
    color: T.textPrimary,
    fontSize: 14,
    marginBottom: 10,
    minHeight: 70,
    textAlignVertical: "top",
  },
});
