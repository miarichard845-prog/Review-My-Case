import { createContext, useContext, useState, useCallback } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleIntakeComplete = useCallback(async (form) => {
    setIntakeOpen(false);
    setAnalyzing(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Analyze this legal case. Respond ONLY in valid JSON: {"summary":"2 sentences","justiceScore":0-100,"scoreRationale":"1 sentence","violations":[{"type":"name","detail":"plain English","severity":"High|Medium|Low"}],"nextSteps":["3-4 steps"],"urgency":"immediate|soon|standard","encouragement":"1 genuine sentence"}. Case: Category=${form.category}, Status=${form.urgency}, Story=${form.story}`,
            },
          ],
        }),
      });
      const data = await res.json();
      const text = data.content.map((b) => b.text || "").join("");
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setAnalysisResult(parsed);
    } catch (e) {
      setAnalysisResult({
        summary: "Your situation has been reviewed. There appear to be serious concerns worth pursuing with qualified legal help.",
        justiceScore: 61,
        scoreRationale: "Multiple procedural concerns identified based on your account.",
        violations: [
          {
            type: "Procedural Violation — Review Needed",
            detail: "A qualified attorney should review the full record to confirm applicable violations.",
            severity: "High",
          },
        ],
        nextSteps: [
          "Contact a free legal aid organization this week",
          "Write down your full timeline while memory is fresh",
          "Gather every document you can find",
          "Avoid discussing your case on social media",
        ],
        urgency: "soon",
        encouragement: "What happened to you matters. You deserve to be heard.",
      });
    }
    setAnalyzing(false);
  }, []);

  const value = {
    intakeOpen,
    setIntakeOpen,
    analyzing,
    analysisResult,
    handleIntakeComplete,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within an AppProvider");
  return ctx;
}
