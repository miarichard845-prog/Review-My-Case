import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Pill from "../../components/Pill";
import StatusPill from "../../components/StatusPill";
import UrgencyDot from "../../components/UrgencyDot";
import ScoreRing from "../../components/ScoreRing";
import { GhostBtn } from "../../components/Buttons";
import { MOCK_CASES } from "../../data/mockData";

const FILTERS = ["all", "pending", "reviewing", "matched", "closed"];

export default function AdminCasesScreen() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? MOCK_CASES : MOCK_CASES.filter((c) => c.status === filter);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.h2}>All Cases</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <GhostBtn small onPress={() => {}}>Export CSV</GhostBtn>
        </View>
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
      <View style={{ gap: 8 }}>
        {filtered.map((c) => (
          <Card key={c.id}>
            <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
              <ScoreRing score={c.score} size={50} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", gap: 6, flexWrap: "wrap", alignItems: "center", marginBottom: 6 }}>
                  <Text style={{ color: T.textPrimary, fontWeight: "700", fontSize: 14 }}>{c.name}</Text>
                  <StatusPill status={c.status} />
                  <UrgencyDot urgency={c.urgency} />
                  <Text style={{ color: T.textMuted, fontSize: 12 }}>{c.country}</Text>
                </View>
                <Text style={{ color: T.textSecondary, fontSize: 13, marginBottom: 6 }}>{c.story.slice(0, 80)}...</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
                  {c.violations.map((v, i) => (
                    <Pill key={i} label={v} color={T.red} />
                  ))}
                </View>
              </View>
              <View style={{ gap: 6 }}>
                <TouchableOpacity style={styles.viewBtn}>
                  <Text style={{ color: T.blue, fontSize: 12, fontWeight: "700" }}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.flagBtn}>
                  <Text style={{ color: T.red, fontSize: 12, fontWeight: "700" }}>Flag</Text>
                </TouchableOpacity>
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
  viewBtn: { backgroundColor: T.blueDim, borderWidth: 1, borderColor: T.blue + "44", borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10 },
  flagBtn: { backgroundColor: T.redDim, borderWidth: 1, borderColor: T.red + "44", borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10 },
});
