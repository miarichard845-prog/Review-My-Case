import { View } from "react-native";
import { T } from "../theme";

export default function UrgencyDot({ urgency }) {
  const c = urgency === "immediate" ? T.red : urgency === "soon" ? T.amber : T.emerald;
  return (
    <View
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: c,
        marginRight: 6,
      }}
    />
  );
}
