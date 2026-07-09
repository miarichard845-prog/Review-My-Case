import { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { T } from "../../theme";
import Card from "../../components/Card";
import Label from "../../components/Label";
import { PrimaryBtn } from "../../components/Buttons";

const FAQS = [
  { q: "What is a Justice Score?", a: "It's a 0–100 rating showing how strongly your case merits further legal review, based on procedural factors, evidence, and legal indicators. It is not a verdict of guilt or innocence." },
  { q: "Is my information private?", a: "Yes. Your case information is encrypted and never shared without your explicit consent. We do not sell data." },
  { q: "How do I get matched with a lawyer?", a: "After your AI case review, you'll see matched experts based on your case type, country, and urgency. Lawyers review your summarized case and can accept or request more information." },
  { q: "Is this free?", a: "Yes, submitting a case and receiving an AI review is free. Lawyers set their own fees — many in our network are pro bono or work on a no-win-no-fee basis." },
  { q: "What if I'm currently in custody?", a: "Select 'Currently in custody' during intake. The app will show emergency contacts and a 'First 10 Minutes' action guide immediately." },
];

export default function UserHelpScreen() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h2}>Help & Support</Text>
      <Text style={styles.subtitle}>Get answers, contact support, or reach emergency legal help.</Text>

      <Card accent={T.red} style={{ marginBottom: 16, backgroundColor: T.redDim }}>
        <Text style={{ color: T.red, fontSize: 13, fontWeight: "800", marginBottom: 8 }}>🚨 Emergency Legal Help</Text>
        <Text style={{ color: "#fca5a5", fontSize: 13, lineHeight: 20, marginBottom: 6 }}>
          <Text style={{ fontWeight: "700" }}>US:</Text> Dial 211 · <Text style={{ fontWeight: "700" }}>UK:</Text> 0800 144 8848 ·{" "}
          <Text style={{ fontWeight: "700" }}>Nigeria:</Text> 09-523-2374
        </Text>
        <Text style={{ color: "#fca5a5", fontSize: 13 }}>Global: lawhelp.org · reliefweb.int</Text>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Label>Frequently Asked Questions</Label>
        {FAQS.map((f, i) => (
          <View key={i} style={i < FAQS.length - 1 && { borderBottomWidth: 1, borderBottomColor: T.border }}>
            <TouchableOpacity
              onPress={() => setOpenFaq(openFaq === i ? null : i)}
              style={styles.faqRow}
            >
              <Text style={{ color: T.textPrimary, fontSize: 14, fontWeight: "600", flex: 1, marginRight: 8 }}>{f.q}</Text>
              <Text style={{ color: T.gold, fontSize: 18 }}>{openFaq === i ? "−" : "+"}</Text>
            </TouchableOpacity>
            {openFaq === i && <Text style={styles.faqAnswer}>{f.a}</Text>}
          </View>
        ))}
      </Card>

      <Card>
        <Label>Contact Support</Label>
        <Text style={{ color: T.textSecondary, fontSize: 14, lineHeight: 20, marginBottom: 12 }}>
          Have a specific question about your case or the platform? Our team responds within 24 hours.
        </Text>
        <TextInput
          placeholder="Describe your issue..."
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

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  h2: { color: T.textPrimary, fontSize: 22, fontWeight: "800", letterSpacing: -0.5, marginBottom: 6 },
  subtitle: { color: T.textSecondary, fontSize: 14, lineHeight: 20, marginBottom: 24 },
  faqRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12 },
  faqAnswer: { color: T.textSecondary, fontSize: 14, lineHeight: 20, paddingBottom: 12 },
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
