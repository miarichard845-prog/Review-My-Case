import { T } from "../theme";
import Pill from "./Pill";

const STATUS_MAP = {
  pending: [T.amber, "Pending"],
  reviewing: [T.blue, "Reviewing"],
  matched: [T.emerald, "Matched"],
  closed: [T.textMuted, "Closed"],
  active: [T.emerald, "Active"],
};

export default function StatusPill({ status }) {
  const [c, l] = STATUS_MAP[status] || [T.textMuted, status];
  return <Pill label={l} color={c} />;
}
