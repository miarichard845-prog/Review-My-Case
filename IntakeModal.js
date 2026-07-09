import { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { T } from "../theme";
import { PrimaryBtn, GhostBtn } from "./Buttons";

const CATS = [
  { icon: "🔒", label: "Wrongful Conviction" },
  { icon: "📋", label: "False Accusation" },
  { icon: "✊", label: "Civil Rights" },
  { icon: "⚠️", label: "Police Misconduct" },
  { icon: "🏠", label: "Property Theft" },
  { icon: "💼", label: "Employment" },
  { icon: "🛡️", label: "Domestic Violence" },
  { icon: "❓", label: "Other" },
];

const STATUS_OPTIONS = [
  { icon: "🔴", label: "Currently in custody" },
  { icon: "🟡", label: "Awaiting trial" },
  { icon: "🟠", label: "Already convicted / sentenced" },
  { icon: "🟡", label: "Out on bail" },
  { icon: "⚖️", label: "Charged, no court date yet" },
  { icon: "🟢", label: "Released — seeking appeal" },
  { icon: "📋", label: "Civil matter — no arrest" },
];

export default function IntakeModal({ visible, onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ category: "", country: "", story: "", urgency: "" });
  const u = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleClose = () => {
    setStep(1);
    setForm({ category: "", country: "", story: "", urgency: "" });
    onClose();
  };

  const handleComplete = () => {
    const submitted = form;
    setStep(1);
    setForm({ category: "", country: "", story: "", urgency: "" });
    onComplete(submitted);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>New Case — Step {step} of 3</Text>
            <TouchableOpacity onPress={handleClose}>
              <Text style={{ color: T.textMuted, fontSize: 22 }}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressRow}>
            {[1, 2, 3].map((s) => (
              <View key={s} style={[styles.progressBar, { backgroundColor: s <= step ? T.gold : T.border }]} />
            ))}
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            {step === 1 && (
              <>
                <Text style={styles.prompt}>What type of case is this?</Text>
                <View style={styles.grid}>
                  {CATS.map((c) => {
                    const active = form.category === c.label;
                    return (
                      <TouchableOpacity
                        key={c.label}
                        onPress={() => u("category", c.label)}
                        style={[
                          styles.choice,
                          { backgroundColor: active ? T.goldDim : T.surfaceHigh, borderColor: active ? T.gold : T.border },
                        ]}
                      >
                        <Text style={{ color: active ? T.gold : T.textSecondary, fontSize: 13, fontWeight: "600" }}>
                          {c.icon} {c.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <PrimaryBtn onPress={() => form.category && setStep(2)} disabled={!form.category}>
                  Next →
                </PrimaryBtn>
              </>
            )}

            {step === 2 && (
              <>
                <Text style={styles.prompt}>✍️ Tell us what happened, in your own words.</Text>
                <TextInput
                  value={form.story}
                  onChangeText={(v) => u("story", v)}
                  placeholder="Describe what happened. Don't worry about legal terms."
                  placeholderTextColor={T.textMuted}
                  multiline
                  numberOfLines={6}
                  style={styles.textarea}
                />
                <View style={styles.row}>
                  <GhostBtn small onPress={() => setStep(1)}>← Back</GhostBtn>
                  <PrimaryBtn onPress={() => form.story.length > 20 && setStep(3)} disabled={form.story.length < 20}>
                    Next →
                  </PrimaryBtn>
                </View>
              </>
            )}

            {step === 3 && (
              <>
                <Text style={styles.prompt}>📍 What's your current status?</Text>
                <View style={{ marginBottom: 20 }}>
                  {STATUS_OPTIONS.map((o) => {
                    const active = form.urgency === o.label;
                    return (
                      <TouchableOpacity
                        key={o.label}
                        onPress={() => u("urgency", o.label)}
                        style={[
                          styles.statusOption,
                          { backgroundColor: active ? T.goldDim : T.surfaceHigh, borderColor: active ? T.gold : T.border },
                        ]}
                      >
                        <Text style={{ marginRight: 8 }}>{o.icon}</Text>
                        <Text style={{ color: active ? T.gold : T.textSecondary, fontSize: 14, fontWeight: "600" }}>
                          {o.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={styles.row}>
                  <GhostBtn small onPress={() => setStep(2)}>← Back</GhostBtn>
                  <PrimaryBtn onPress={() => form.urgency && handleComplete()} disabled={!form.urgency}>
                    🔎 Analyze My Case →
                  </PrimaryBtn>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "#000000cc",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: T.bg,
    borderTopWidth: 1,
    borderColor: T.borderHigh,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "85%",
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: T.textPrimary,
    fontSize: 18,
    fontWeight: "800",
  },
  progressRow: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 24,
  },
  progressBar: {
    flex: 1,
    height: 3,
    borderRadius: 2,
  },
  prompt: {
    color: T.textSecondary,
    fontSize: 14,
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  choice: {
    width: "48%",
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 12,
  },
  textarea: {
    backgroundColor: T.surfaceHigh,
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: 10,
    padding: 14,
    color: T.textPrimary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
    minHeight: 140,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  statusOption: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
});
