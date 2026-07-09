import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Label from "../../components/Label";
import ScoreBadge from "../../components/ScoreBadge";
import ScoreRing from "../../components/ScoreRing";
import StatusPill from "../../components/StatusPill";
import Avatar from "../../components/Avatar";
import { PrimaryBtn } from "../../components/Buttons";
import { MOCK_USER, CASE_TIMELINE } from "../../data/mockData";

function CaseDetail({ item, onBack }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onBack} style={{ marginBottom: 20 }}>
        <Text style={{ color: T.gold, fontSize: 14, fontWeight: "700" }}>← Back to Cases</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={styles.h2}>{item.title}</Text>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            <StatusPill status={item.status} />
            <ScoreBadge score={item.score} />
          </View>
        </View>
        <ScoreRing score={item.score} size={80} />
      </View>

      <Card style={{ marginBottom: 12 }}>
        <Label>Assigned Lawyer</Label>
        {item.lawyer ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Avatar initials={item.lawyer.split(" ").map((n) => n[0]).join("")} size={40} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: T.textPrimary, fontWeight: "700", fontSize: 15 }}>{item.lawyer}</Text>
              <Text style={{ color: T.textSecondary, fontSize: 13 }}>Criminal Defense / Appeals</Text>
            </View>
            <PrimaryBtn small onPress={() => {}}>Message</PrimaryBtn>
          </View>
        ) : (
          <Text style={{ color: T.textSecondary, fontSize: 14 }}>Awaiting lawyer match...</Text>
        )}
      </Card>

      <Card>
        <Label>Case Timeline</Label>
        {CASE_TIMELINE.map((e, i) => (
          <View key={i} style={{ flexDirection: "row", gap: 10, paddingVertical: 8 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: e.flag ? T.red : T.gold, marginTop: 5 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: T.gold, fontSize: 11, fontWeight: "700", marginBottom: 2 }}>{e.date}</Text>
              <Text style={{ color: T.textPrimary, fontSize: 14 }}>{e.event}</Text>
              {e.flag && <Text style={{ color: T.red, fontSize: 11, fontWeight: "700", marginTop: 2 }}>⚑ Legal concern</Text>}
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

export default function UserMyCasesScreen() {
  const [selected, setSelected] = useState(null);

  if (selected) return <CaseDetail item={selected} onBack={() => setSelected(null)} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.h2}>My Cases</Text>
        <PrimaryBtn small onPress={() => {}}>+ New Case</PrimaryBtn>
      </View>
      <View style={{ gap: 10 }}>
        {MOCK_USER.cases.map((c) => (
          <Card key={c.id} onPress={() => setSelected(c)}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: T.textPrimary, fontWeight: "700", fontSize: 15, marginBottom: 6 }}>{c.title}</Text>
                <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                  <StatusPill status={c.status} />
                  <ScoreBadge score={c.score} />
                </View>
                <Text style={{ color: T.textMuted, fontSize: 12 }}>
                  Filed {c.date} {c.lawyer && `· Lawyer: ${c.lawyer}`}
                </Text>
              </View>
              <Text style={{ color: T.textMuted, fontSize: 18, marginLeft: 10 }}>›</Text>
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
  h2: { color: T.textPrimary, fontSize: 22, fontWeight: "800", letterSpacing: -0.5, marginBottom: 4 },
});
