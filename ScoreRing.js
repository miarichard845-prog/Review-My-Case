import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { T } from "../theme";

export default function ScoreRing({ score, size = 120 }) {
  const strokeWidth = size * 0.07;
  const r = size * 0.38;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const c = score >= 70 ? T.emerald : score >= 45 ? T.amber : T.red;

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={{ position: "absolute", transform: [{ rotate: "-90deg" }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.border} strokeWidth={strokeWidth} />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={c}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </Svg>
      <Text style={{ color: c, fontSize: size * 0.26, fontWeight: "900" }}>{score}</Text>
      <Text style={{ color: T.textMuted, fontSize: size * 0.09, fontWeight: "700", letterSpacing: 1, marginTop: 2 }}>
        SCORE
      </Text>
    </View>
  );
}
