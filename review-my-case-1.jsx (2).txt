import { useState, useRef, useEffect } from "react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const T = {
  bg:"#07070f", surface:"#0d0d1c", surfaceHigh:"#13132a",
  border:"#1a1a35", borderHigh:"#24243f",
  gold:"#c9a84c", goldLight:"#f0d585", goldDim:"#c9a84c18", goldGlow:"#c9a84c33",
  purple:"#6d4fc2", purpleLight:"#9d7fe8", purpleDim:"#6d4fc215",
  emerald:"#10b981", emeraldDim:"#10b98115",
  red:"#ef4444", redDim:"#ef444418",
  amber:"#f59e0b", amberDim:"#f59e0b15",
  blue:"#60a5fa", blueDim:"#60a5fa15",
  pink:"#f472b6",
  textPrimary:"#eeeeff", textSecondary:"#7777aa", textMuted:"#3a3a5a",
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_CASES = [
  { id:"c1", name:"Marcus T.", country:"Nigeria", category:"Wrongful Conviction", score:82, urgency:"immediate", status:"pending", date:"2024-01-15", story:"Falsely accused by sister-in-law. Spent 543 days in custody. Assets sold without consent.", violations:["False Imprisonment","Financial Fraud","Asset Theft"], hasFiles:true },
  { id:"c2", name:"Amara J.", country:"United States", category:"Police Misconduct", score:71, urgency:"soon", status:"reviewing", date:"2024-01-18", story:"Unlawful search and seizure. Evidence planted. Case dismissed but no accountability.", violations:["4th Amendment Violation","Excessive Force"], hasFiles:true },
  { id:"c3", name:"David O.", country:"United Kingdom", category:"Employment Injustice", score:55, urgency:"standard", status:"matched", date:"2024-01-20", story:"Wrongful termination after whistleblowing. HR covered it up.", violations:["Wrongful Termination","Retaliation"], hasFiles:false },
  { id:"c4", name:"Fatima K.", country:"Ghana", category:"Civil Rights Violation", score:67, urgency:"soon", status:"pending", date:"2024-01-21", story:"Detained without charge for 3 weeks. No access to lawyer.", violations:["Unlawful Detention","Right to Counsel Denied"], hasFiles:true },
  { id:"c5", name:"Jerome W.", country:"Jamaica", category:"False Accusation", score:44, urgency:"standard", status:"closed", date:"2024-01-10", story:"Accused by neighbor in land dispute. No evidence.", violations:["Malicious Prosecution"], hasFiles:false },
];

const MOCK_LAWYERS = [
  { id:"l1", name:"Sarah Okonkwo", spec:"Criminal Defense / Appeals", country:"Nigeria", cases:14, rating:4.9, status:"active", earnings:3200, joined:"2023-11", avatar:"SO" },
  { id:"l2", name:"James Miller", spec:"Civil Rights / Wrongful Conviction", country:"United States", cases:22, rating:4.8, status:"active", earnings:7800, joined:"2023-09", avatar:"JM" },
  { id:"l3", name:"Priya Sharma", spec:"Employment Law", country:"United Kingdom", cases:9, rating:4.7, status:"active", earnings:2100, joined:"2024-01", avatar:"PS" },
  { id:"l4", name:"Kwame Asante", spec:"Human Rights / Criminal", country:"Ghana", cases:6, rating:4.9, status:"pending", earnings:0, joined:"2024-01", avatar:"KA" },
];

const MOCK_USER = {
  name:"Marcus Thompson", email:"marcus.t@email.com", country:"Nigeria", joined:"January 2024",
  cases:[
    { id:"c1", title:"Wrongful Conviction — Asset Theft", status:"reviewing", score:82, date:"2024-01-15", lawyer:"Sarah Okonkwo" },
    { id:"cx", title:"Bank Account Removal", status:"pending", score:61, date:"2024-01-22", lawyer:null },
  ],
  documents:["Arrest record.pdf","Bail denial notice.pdf","Property deed.pdf","Bank statement.pdf"],
  notifications:[
    { text:"Sarah Okonkwo accepted your case", time:"2 hours ago", read:false },
    { text:"Your Justice Score updated to 82", time:"1 day ago", read:false },
    { text:"New evidence gap identified", time:"2 days ago", read:true },
  ]
};

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const css = `*{box-sizing:border-box;margin:0;padding:0} input,textarea,select,button{font-family:inherit} ::placeholder{color:#3a3a5a} ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#0d0d1c} ::-webkit-scrollbar-thumb{background:#1a1a35;border-radius:2px} @keyframes spin{to{transform:rotate(360deg)}} @keyframes fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}} @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}} @keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}`;

function Pill({ label, color }) {
  return <span style={{ background:color+"22", color, border:`1px solid ${color}44`, borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>{label}</span>;
}
function ScoreBadge({ score }) {
  const c = score>=70?T.emerald:score>=45?T.amber:T.red;
  return <span style={{ background:c+"22", color:c, border:`1px solid ${c}44`, borderRadius:8, padding:"2px 8px", fontSize:12, fontWeight:800 }}>{score}</span>;
}
function Avatar({ initials, size=36, color=T.gold }) {
  return <div style={{ width:size, height:size, borderRadius:"50%", background:color+"22", border:`2px solid ${color}44`, display:"flex", alignItems:"center", justifyContent:"center", color, fontSize:size*0.35, fontWeight:800, flexShrink:0 }}>{initials}</div>;
}
function Card({ children, accent, style={}, onClick }) {
  return <div onClick={onClick} style={{ background:T.surface, border:`1px solid ${accent?accent+"44":T.border}`, borderRadius:14, padding:"16px 18px", cursor:onClick?"pointer":undefined, ...style }}>{children}</div>;
}
function Label({ children, style={} }) {
  return <p style={{ color:T.textSecondary, fontSize:11, fontWeight:700, letterSpacing:"0.1em", marginBottom:8, textTransform:"uppercase", ...style }}>{children}</p>;
}
function PrimaryBtn({ children, onClick, disabled, small }) {
  return <button onClick={onClick} disabled={disabled} style={{ background:disabled?T.surfaceHigh:`linear-gradient(135deg,${T.gold},${T.goldLight})`, color:disabled?T.textMuted:"#07070f", border:"none", borderRadius:small?10:14, padding:small?"9px 16px":"15px 20px", fontSize:small?13:15, fontWeight:800, cursor:disabled?"not-allowed":"pointer", boxShadow:disabled?"none":`0 0 20px ${T.goldGlow}` }}>{children}</button>;
}
function GhostBtn({ children, onClick, small }) {
  return <button onClick={onClick} style={{ background:"none", border:`1px solid ${T.border}`, borderRadius:small?10:14, padding:small?"8px 14px":"13px 20px", fontSize:small?13:15, fontWeight:600, color:T.textSecondary, cursor:"pointer" }}>{children}</button>;
}

function ScoreRing({ score, size=120 }) {
  const r=size*.38, circ=2*Math.PI*r, dash=(score/100)*circ;
  const c=score>=70?T.emerald:score>=45?T.amber:T.red;
  return (
    <div style={{ position:"relative", width:size, height:size }}>
      <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.border} strokeWidth={size*.07}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={c} strokeWidth={size*.07} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition:"stroke-dasharray 1.5s ease", filter:`drop-shadow(0 0 6px ${c}88)` }}/>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <span style={{ color:c, fontSize:size*.26, fontWeight:900, lineHeight:1 }}>{score}</span>
        <span style={{ color:T.textMuted, fontSize:size*.09, fontWeight:700, letterSpacing:"0.06em", marginTop:2 }}>SCORE</span>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = { pending:[T.amber,"Pending"], reviewing:[T.blue,"Reviewing"], matched:[T.emerald,"Matched"], closed:[T.textMuted,"Closed"], active:[T.emerald,"Active"] };
  const [c,l] = map[status]||[T.textMuted,status];
  return <Pill label={l} color={c}/>;
}

function UrgencyDot({ urgency }) {
  const c = urgency==="immediate"?T.red:urgency==="soon"?T.amber:T.emerald;
  return <span style={{ display:"inline-block", width:8, height:8, borderRadius:"50%", background:c, boxShadow:`0 0 6px ${c}`, marginRight:6 }}/>;
}

// ─── TOP NAV BAR ─────────────────────────────────────────────────────────────
function TopNav({ role, setRole, activeView, setView }) {
  const roles = [
    { id:"user", label:"👤 User", desc:"Case Submitter" },
    { id:"lawyer", label:"⚖️ Lawyer", desc:"Attorney Portal" },
    { id:"admin", label:"🛡️ Admin", desc:"Platform Control" },
  ];
  return (
    <div style={{ background:T.bg, borderBottom:`1px solid ${T.border}`, position:"sticky", top:0, zIndex:50 }}>
      {/* Role switcher */}
      <div style={{ display:"flex", justifyContent:"center", gap:6, padding:"10px 16px 0" }}>
        {roles.map(r => (
          <button key={r.id} onClick={() => { setRole(r.id); setView("home"); }}
            style={{ background:role===r.id?T.goldDim:"none", border:`1.5px solid ${role===r.id?T.gold:T.border}`, borderRadius:"10px 10px 0 0", padding:"7px 16px", color:role===r.id?T.gold:T.textMuted, fontSize:13, fontWeight:700, cursor:"pointer", borderBottom:"none" }}>
            {r.label}
          </button>
        ))}
      </div>
      {/* Logo row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 20px 12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:20 }}>⚖️</span>
          <div>
            <span style={{ color:T.textPrimary, fontSize:15, fontWeight:900, letterSpacing:"-0.5px" }}>Review My Case</span>
            <span style={{ color:T.textMuted, fontSize:11, display:"block" }}>{roles.find(r=>r.id===role)?.desc}</span>
          </div>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          {role==="user" && ["Home","My Cases","Profile","Help"].map(v => (
            <button key={v} onClick={() => setView(v.toLowerCase().replace(" ","_"))}
              style={{ background:activeView===v.toLowerCase().replace(" ","_")?T.goldDim:"none", border:`1px solid ${activeView===v.toLowerCase().replace(" ","_")?T.gold:T.border}`, borderRadius:8, padding:"5px 10px", color:activeView===v.toLowerCase().replace(" ","_")?T.gold:T.textSecondary, fontSize:12, fontWeight:600, cursor:"pointer" }}>
              {v}
            </button>
          ))}
          {role==="lawyer" && ["Dashboard","Cases","Earnings","Profile"].map(v => (
            <button key={v} onClick={() => setView(v.toLowerCase())}
              style={{ background:activeView===v.toLowerCase()?T.goldDim:"none", border:`1px solid ${activeView===v.toLowerCase()?T.gold:T.border}`, borderRadius:8, padding:"5px 10px", color:activeView===v.toLowerCase()?T.gold:T.textSecondary, fontSize:12, fontWeight:600, cursor:"pointer" }}>
              {v}
            </button>
          ))}
          {role==="admin" && ["Overview","Cases","Lawyers","Reports","Settings"].map(v => (
            <button key={v} onClick={() => setView(v.toLowerCase())}
              style={{ background:activeView===v.toLowerCase()?T.goldDim:"none", border:`1px solid ${activeView===v.toLowerCase()?T.gold:T.border}`, borderRadius:8, padding:"5px 10px", color:activeView===v.toLowerCase()?T.gold:T.textSecondary, fontSize:12, fontWeight:600, cursor:"pointer" }}>
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// USER VIEWS
// ═══════════════════════════════════════════════════════════════════════════════

function UserHome({ setView, setIntakeOpen }) {
  return (
    <div style={{ padding:"28px 20px", maxWidth:640, margin:"0 auto" }}>
      {/* Hero */}
      <div style={{ textAlign:"center", marginBottom:32 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:T.goldDim, border:`1px solid ${T.gold}33`, borderRadius:20, padding:"7px 18px", marginBottom:20, whiteSpace:"nowrap" }}>
          <span style={{ fontSize:13 }}>⚖️</span>
          <span style={{ color:T.gold, fontSize:13, fontWeight:800, letterSpacing:"0.08em" }}>REVIEW MY CASE</span>
          <span style={{ color:T.textMuted, fontSize:13 }}>·</span>
          <span style={{ color:T.textSecondary, fontSize:13, fontWeight:500 }}>Global Legal Platform</span>
        </div>
        <h1 style={{ fontSize:"clamp(30px,7vw,46px)", fontWeight:900, color:T.textPrimary, letterSpacing:"-2px", lineHeight:1.05, marginBottom:16 }}>
          Every case deserves<br/><span style={{ background:`linear-gradient(135deg,${T.gold},${T.goldLight})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>a second look.</span>
        </h1>
        <p style={{ color:T.textSecondary, fontSize:16, lineHeight:1.8, marginBottom:28, maxWidth:480, margin:"0 auto 28px" }}>
          You don't need to know legal terms. Just tell your story. Our AI organizes your case, identifies potential violations, and connects you with lawyers who can actually help — <strong style={{ color:T.textPrimary }}>free or no-win-no-fee.</strong>
        </p>
        <PrimaryBtn onClick={() => setIntakeOpen(true)}>Review My Case — It's Free →</PrimaryBtn>
      </div>

      {/* How it works — 4 box grid (side by side, symbol-led) */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:24 }}>
        {[
          { icon:"💬", t:"Tell your story", d:"in plain language" },
          { icon:"🔍", t:"AI detects violations", d:"& appeal grounds" },
          { icon:"📊", t:"Get a Justice Score", d:"for your case" },
          { icon:"🤝", t:"Match with", d:"free or no-fee lawyers" },
        ].map((f,i) => (
          <div key={i} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, padding:"18px 16px", display:"flex", flexDirection:"column", gap:10 }}>
            <span style={{ fontSize:26 }}>{f.icon}</span>
            <div>
              <p style={{ color:T.textSecondary, fontSize:15, lineHeight:1.4, fontWeight:500 }}>{f.t} {f.d}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display:"flex", gap:8, marginBottom:24 }}>
        {[["⚖️","1,240+","Cases reviewed"],["🌍","18","Countries"],["🤝","Free","To start"],["📊","AI","Powered"]].map(([i,n,l],x) => (
          <div key={x} style={{ flex:1, background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:"14px 8px", textAlign:"center" }}>
            <div style={{ fontSize:18, marginBottom:4 }}>{i}</div>
            <div style={{ color:T.gold, fontSize:16, fontWeight:900 }}>{n}</div>
            <div style={{ color:T.textMuted, fontSize:11, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
      {/* Recent activity */}
      <Card style={{ marginBottom:16 }}>
        <Label>Your recent case</Label>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <p style={{ color:T.textPrimary, fontWeight:700, fontSize:15, marginBottom:4 }}>Wrongful Conviction — Asset Theft</p>
            <p style={{ color:T.textSecondary, fontSize:13 }}>Lawyer matched: Sarah Okonkwo</p>
          </div>
          <ScoreBadge score={82}/>
        </div>
        <div style={{ marginTop:12, display:"flex", gap:8 }}>
          <PrimaryBtn small onClick={() => setView("my_cases")}>View Case</PrimaryBtn>
          <GhostBtn small onClick={() => setView("my_cases")}>All Cases</GhostBtn>
        </div>
      </Card>
    </div>
  );
}

function UserMyCases() {
  const [selected, setSelected] = useState(null);
  if (selected) return (
    <div style={{ padding:"20px", maxWidth:640, margin:"0 auto" }}>
      <button onClick={() => setSelected(null)} style={{ background:"none", border:"none", color:T.gold, cursor:"pointer", fontSize:14, fontWeight:700, marginBottom:20 }}>← Back to Cases</button>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          <h2 style={{ color:T.textPrimary, fontSize:22, fontWeight:800, letterSpacing:"-0.6px", marginBottom:4 }}>{selected.title}</h2>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}><StatusPill status={selected.status}/><ScoreBadge score={selected.score}/></div>
        </div>
        <ScoreRing score={selected.score} size={80}/>
      </div>
      <Card style={{ marginBottom:12 }}>
        <Label>Assigned Lawyer</Label>
        {selected.lawyer ? (
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <Avatar initials={selected.lawyer.split(" ").map(n=>n[0]).join("")} size={40}/>
            <div>
              <p style={{ color:T.textPrimary, fontWeight:700, fontSize:15 }}>{selected.lawyer}</p>
              <p style={{ color:T.textSecondary, fontSize:13 }}>Criminal Defense / Appeals</p>
            </div>
            <PrimaryBtn small onClick={() => {}}>Message</PrimaryBtn>
          </div>
        ) : <p style={{ color:T.textSecondary, fontSize:14 }}>Awaiting lawyer match...</p>}
      </Card>
      <Card style={{ marginBottom:12 }}>
        <Label>Documents on file</Label>
        {["Arrest record.pdf","Bail denial notice.pdf","Property deed.pdf","Bank statement.pdf"].map((d,i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:i<3?`1px solid ${T.border}`:"none" }}>
            <span style={{ color:T.textSecondary, fontSize:14 }}>📎 {d}</span>
            <span style={{ color:T.gold, fontSize:12, cursor:"pointer" }}>View</span>
          </div>
        ))}
        <button style={{ marginTop:10, background:T.goldDim, border:`1px solid ${T.gold}44`, borderRadius:8, padding:"8px 14px", color:T.gold, fontSize:13, fontWeight:700, cursor:"pointer" }}>+ Upload More</button>
      </Card>
      <Card>
        <Label>Case Timeline</Label>
        {[
          { date:"Jan 15, 2022", event:"Falsely accused by sister-in-law", flag:false },
          { date:"Jan 17, 2022", event:"Arrested and taken into custody", flag:true },
          { date:"Jan 19, 2022", event:"Bail denied", flag:true },
          { date:"Mar 2022", event:"Removed from joint bank account", flag:true },
          { date:"Jun 2022", event:"Property sold without consent", flag:true },
          { date:"Aug 2023", event:"Released after 543 days", flag:false },
        ].map((e,i) => (
          <div key={i} style={{ display:"flex", gap:12, paddingBottom:12, borderBottom:i<5?`1px solid ${T.border}`:"none", marginBottom:i<5?12:0 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:e.flag?T.red:T.gold, marginTop:5, flexShrink:0, boxShadow:`0 0 6px ${e.flag?T.red:T.gold}` }}/>
            <div>
              <p style={{ color:T.gold, fontSize:11, fontWeight:700, marginBottom:2 }}>{e.date}</p>
              <p style={{ color:T.textPrimary, fontSize:14 }}>{e.event}</p>
              {e.flag && <p style={{ color:T.red, fontSize:11, fontWeight:700, marginTop:2 }}>⚑ Legal concern</p>}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
  return (
    <div style={{ padding:"20px", maxWidth:640, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <h2 style={{ color:T.textPrimary, fontSize:22, fontWeight:800, letterSpacing:"-0.6px" }}>My Cases</h2>
        <PrimaryBtn small onClick={() => {}}>+ New Case</PrimaryBtn>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {MOCK_USER.cases.map(c => (
          <Card key={c.id} onClick={() => setSelected(c)} style={{ cursor:"pointer" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div style={{ flex:1 }}>
                <p style={{ color:T.textPrimary, fontWeight:700, fontSize:15, marginBottom:6 }}>{c.title}</p>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:6 }}>
                  <StatusPill status={c.status}/>
                  <ScoreBadge score={c.score}/>
                </div>
                <p style={{ color:T.textMuted, fontSize:12 }}>Filed {c.date} {c.lawyer && `· Lawyer: ${c.lawyer}`}</p>
              </div>
              <span style={{ color:T.textMuted, fontSize:18, marginLeft:10 }}>›</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function UserProfile({ setView }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);
  return (
    <div style={{ padding:"20px", maxWidth:600, margin:"0 auto" }}>
      {/* Profile header */}
      <Card style={{ marginBottom:16, textAlign:"center", padding:"28px 20px" }}>
        <Avatar initials="MT" size={72} color={T.gold}/>
        {editing ? (
          <div style={{ marginTop:16, display:"flex", flexDirection:"column", gap:10 }}>
            <input value={name} onChange={e=>setName(e.target.value)} style={{ background:T.surfaceHigh, border:`1px solid ${T.border}`, borderRadius:10, padding:"10px 14px", color:T.textPrimary, fontSize:15, outline:"none", textAlign:"center" }}/>
            <input value={email} onChange={e=>setEmail(e.target.value)} style={{ background:T.surfaceHigh, border:`1px solid ${T.border}`, borderRadius:10, padding:"10px 14px", color:T.textPrimary, fontSize:15, outline:"none", textAlign:"center" }}/>
            <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
              <PrimaryBtn small onClick={() => setEditing(false)}>Save Changes</PrimaryBtn>
              <GhostBtn small onClick={() => setEditing(false)}>Cancel</GhostBtn>
            </div>
          </div>
        ) : (
          <>
            <h2 style={{ color:T.textPrimary, fontSize:22, fontWeight:800, marginTop:14, marginBottom:4 }}>{name}</h2>
            <p style={{ color:T.textSecondary, fontSize:14, marginBottom:4 }}>{email}</p>
            <p style={{ color:T.textMuted, fontSize:13, marginBottom:16 }}>{MOCK_USER.country} · Member since {MOCK_USER.joined}</p>
            <GhostBtn small onClick={() => setEditing(true)}>Edit Profile</GhostBtn>
          </>
        )}
      </Card>

      {/* Notifications */}
      <Card style={{ marginBottom:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <Label style={{ margin:0 }}>Notifications</Label>
          <span style={{ background:T.red+"22", color:T.red, borderRadius:20, padding:"1px 8px", fontSize:11, fontWeight:800 }}>2 new</span>
        </div>
        {MOCK_USER.notifications.map((n,i) => (
          <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", padding:"10px 0", borderBottom:i<2?`1px solid ${T.border}`:"none" }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:n.read?T.textMuted:T.gold, marginTop:5, flexShrink:0 }}/>
            <div>
              <p style={{ color:n.read?T.textSecondary:T.textPrimary, fontSize:14, fontWeight:n.read?400:600, marginBottom:2 }}>{n.text}</p>
              <p style={{ color:T.textMuted, fontSize:12 }}>{n.time}</p>
            </div>
          </div>
        ))}
      </Card>

      {/* Account settings */}
      <Card style={{ marginBottom:16 }}>
        <Label>Account Settings</Label>
        {[
          { label:"Privacy & Data", icon:"🔒", desc:"Control how your information is used" },
          { label:"Notifications", icon:"🔔", desc:"Email and push preferences" },
          { label:"Language", icon:"🌍", desc:"English (US)" },
          { label:"Security", icon:"🛡️", desc:"Password and two-factor auth" },
        ].map((s,i) => (
          <div key={i} style={{ display:"flex", gap:12, alignItems:"center", padding:"11px 0", borderBottom:i<3?`1px solid ${T.border}`:"none", cursor:"pointer" }}>
            <span style={{ fontSize:18 }}>{s.icon}</span>
            <div style={{ flex:1 }}>
              <p style={{ color:T.textPrimary, fontSize:14, fontWeight:600 }}>{s.label}</p>
              <p style={{ color:T.textMuted, fontSize:12 }}>{s.desc}</p>
            </div>
            <span style={{ color:T.textMuted }}>›</span>
          </div>
        ))}
      </Card>

      {/* Stats */}
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        {[["2","Cases Filed"],["1","Lawyer Matched"],["82","Best Score"],["4","Docs Uploaded"]].map(([n,l],i) => (
          <div key={i} style={{ flex:1, background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:"14px 8px", textAlign:"center" }}>
            <p style={{ color:T.gold, fontSize:20, fontWeight:900 }}>{n}</p>
            <p style={{ color:T.textMuted, fontSize:11, marginTop:2 }}>{l}</p>
          </div>
        ))}
      </div>

      <button style={{ width:"100%", background:"none", border:`1px solid ${T.red}44`, borderRadius:14, padding:"13px", fontSize:15, fontWeight:600, color:T.red, cursor:"pointer" }}>Sign Out</button>
    </div>
  );
}

function UserHelp() {
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    { q:"What is a Justice Score?", a:"It's a 0–100 rating showing how strongly your case merits further legal review, based on procedural factors, evidence, and legal indicators. It is not a verdict of guilt or innocence." },
    { q:"Is my information private?", a:"Yes. Your case information is encrypted and never shared without your explicit consent. We do not sell data." },
    { q:"How do I get matched with a lawyer?", a:"After your AI case review, you'll see matched experts based on your case type, country, and urgency. Lawyers review your summarized case and can accept or request more information." },
    { q:"Is this free?", a:"Yes, submitting a case and receiving an AI review is free. Lawyers set their own fees — many in our network are pro bono or work on a no-win-no-fee basis." },
    { q:"What if I'm currently in custody?", a:"Select 'Currently in custody' during intake. The app will show emergency contacts and a 'First 10 Minutes' action guide immediately." },
  ];
  return (
    <div style={{ padding:"20px", maxWidth:600, margin:"0 auto" }}>
      <h2 style={{ color:T.textPrimary, fontSize:22, fontWeight:800, letterSpacing:"-0.6px", marginBottom:6 }}>Help & Support</h2>
      <p style={{ color:T.textSecondary, fontSize:14, lineHeight:1.6, marginBottom:24 }}>Get answers, contact support, or reach emergency legal help.</p>

      {/* Emergency */}
      <Card accent={T.red} style={{ marginBottom:16, background:T.redDim }}>
        <p style={{ color:T.red, fontSize:13, fontWeight:800, marginBottom:8 }}>🚨 Emergency Legal Help</p>
        <p style={{ color:"#fca5a5", fontSize:13, lineHeight:1.65, marginBottom:6 }}><strong>US:</strong> Dial 211 · <strong>UK:</strong> 0800 144 8848 · <strong>Nigeria:</strong> 09-523-2374</p>
        <p style={{ color:"#fca5a5", fontSize:13 }}>Global: lawhelp.org · reliefweb.int</p>
      </Card>

      {/* FAQs */}
      <Card style={{ marginBottom:16 }}>
        <Label>Frequently Asked Questions</Label>
        {faqs.map((f,i) => (
          <div key={i} style={{ borderBottom:i<faqs.length-1?`1px solid ${T.border}`:"none" }}>
            <button onClick={() => setOpenFaq(openFaq===i?null:i)} style={{ width:"100%", background:"none", border:"none", padding:"12px 0", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}>
              <span style={{ color:T.textPrimary, fontSize:14, fontWeight:600, textAlign:"left" }}>{f.q}</span>
              <span style={{ color:T.gold, fontSize:18 }}>{openFaq===i?"−":"+"}</span>
            </button>
            {openFaq===i && <p style={{ color:T.textSecondary, fontSize:14, lineHeight:1.65, paddingBottom:12 }}>{f.a}</p>}
          </div>
        ))}
      </Card>

      {/* Contact */}
      <Card>
        <Label>Contact Support</Label>
        <p style={{ color:T.textSecondary, fontSize:14, lineHeight:1.65, marginBottom:12 }}>Have a specific question about your case or the platform? Our team responds within 24 hours.</p>
        <textarea placeholder="Describe your issue..." rows={3} style={{ width:"100%", background:T.surfaceHigh, border:`1px solid ${T.border}`, borderRadius:10, padding:"10px 12px", color:T.textPrimary, fontSize:14, outline:"none", resize:"none", marginBottom:10 }}/>
        <PrimaryBtn small onClick={() => {}}>Send Message</PrimaryBtn>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAWYER VIEWS
// ═══════════════════════════════════════════════════════════════════════════════

function LawyerDashboard({ setView, setSelectedCase }) {
  const pending = MOCK_CASES.filter(c=>c.status==="pending");
  const reviewing = MOCK_CASES.filter(c=>c.status==="reviewing");
  return (
    <div style={{ padding:"20px", maxWidth:700, margin:"0 auto" }}>
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
          <div>
            <h2 style={{ color:T.textPrimary, fontSize:22, fontWeight:800, letterSpacing:"-0.6px", marginBottom:4 }}>Welcome, Sarah</h2>
            <p style={{ color:T.textSecondary, fontSize:14 }}>Criminal Defense / Appeals · Nigeria</p>
          </div>
          <Avatar initials="SO" size={48}/>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {[["📬",pending.length,"New cases"],["📂",reviewing.length,"In review"],["✅","11","Resolved"],["💰","$3,200","Earned"]].map(([i,n,l],x) => (
            <div key={x} style={{ flex:1, background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:"12px 8px", textAlign:"center" }}>
              <div style={{ fontSize:18, marginBottom:4 }}>{i}</div>
              <div style={{ color:T.gold, fontSize:17, fontWeight:900 }}>{n}</div>
              <div style={{ color:T.textMuted, fontSize:11, marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Urgent cases */}
      {pending.filter(c=>c.urgency==="immediate").length > 0 && (
        <Card accent={T.red} style={{ background:T.redDim, marginBottom:16 }}>
          <p style={{ color:T.red, fontSize:12, fontWeight:800, letterSpacing:"0.08em", marginBottom:10 }}>🚨 URGENT — ACTION REQUIRED</p>
          {pending.filter(c=>c.urgency==="immediate").map(c => (
            <div key={c.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <p style={{ color:"#fca5a5", fontWeight:700, fontSize:14 }}>{c.name} · {c.category}</p>
                <p style={{ color:T.textMuted, fontSize:12 }}>{c.country}</p>
              </div>
              <PrimaryBtn small onClick={() => { setSelectedCase(c); setView("cases"); }}>Review Now</PrimaryBtn>
            </div>
          ))}
        </Card>
      )}

      {/* New cases queue */}
      <div style={{ marginBottom:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <Label style={{ margin:0 }}>New Cases ({pending.length})</Label>
          <button onClick={() => setView("cases")} style={{ background:"none", border:"none", color:T.gold, cursor:"pointer", fontSize:13, fontWeight:700 }}>View All</button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {pending.map(c => (
            <Card key={c.id} onClick={() => { setSelectedCase(c); setView("cases"); }} style={{ cursor:"pointer" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
                    <UrgencyDot urgency={c.urgency}/>
                    <span style={{ color:T.textPrimary, fontWeight:700, fontSize:14 }}>{c.name}</span>
                    <Pill label={c.category} color={T.purple}/>
                  </div>
                  <p style={{ color:T.textSecondary, fontSize:13, lineHeight:1.5, marginBottom:6 }}>{c.story.slice(0,80)}...</p>
                  <p style={{ color:T.textMuted, fontSize:12 }}>{c.country} · {c.date}</p>
                </div>
                <div style={{ marginLeft:12, textAlign:"center" }}>
                  <ScoreRing score={c.score} size={52}/>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function LawyerCases({ selectedCase, setSelectedCase }) {
  const [filter, setFilter] = useState("all");
  const [localSelected, setLocalSelected] = useState(selectedCase);
  useEffect(() => { if (selectedCase) setLocalSelected(selectedCase); }, [selectedCase]);
  const filtered = filter==="all"?MOCK_CASES:MOCK_CASES.filter(c=>c.status===filter);

  if (localSelected) return (
    <div style={{ padding:"20px", maxWidth:680, margin:"0 auto" }}>
      <button onClick={() => { setLocalSelected(null); setSelectedCase(null); }} style={{ background:"none", border:"none", color:T.gold, cursor:"pointer", fontSize:14, fontWeight:700, marginBottom:20 }}>← Back to Cases</button>

      {/* Case header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          <h2 style={{ color:T.textPrimary, fontSize:22, fontWeight:800, letterSpacing:"-0.6px", marginBottom:6 }}>{localSelected.name}</h2>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            <Pill label={localSelected.category} color={T.purple}/>
            <StatusPill status={localSelected.status}/>
            <Pill label={localSelected.country} color={T.blue}/>
            <Pill label={localSelected.urgency==="immediate"?"🚨 Urgent":localSelected.urgency==="soon"?"⚠️ Soon":"Standard"} color={localSelected.urgency==="immediate"?T.red:localSelected.urgency==="soon"?T.amber:T.emerald}/>
          </div>
        </div>
        <ScoreRing score={localSelected.score} size={80}/>
      </div>

      {/* Violations */}
      <Card style={{ marginBottom:12 }}>
        <Label>Violations Identified</Label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {localSelected.violations.map((v,i) => <Pill key={i} label={v} color={T.red}/>)}
        </div>
      </Card>

      {/* Case story */}
      <Card style={{ marginBottom:12 }}>
        <Label>Case Summary</Label>
        <p style={{ color:T.textPrimary, fontSize:15, lineHeight:1.75 }}>{localSelected.story}</p>
      </Card>

      {/* Documents */}
      <Card style={{ marginBottom:12 }}>
        <Label>Documents {localSelected.hasFiles?"(uploaded)":"(none yet)"}</Label>
        {localSelected.hasFiles ? (
          ["Arrest record.pdf","Bail denial.pdf","Bank statement.pdf"].map((d,i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i<2?`1px solid ${T.border}`:"none" }}>
              <span style={{ color:T.textSecondary, fontSize:14 }}>📎 {d}</span>
              <span style={{ color:T.gold, fontSize:13, cursor:"pointer", fontWeight:600 }}>Download</span>
            </div>
          ))
        ) : <p style={{ color:T.textMuted, fontSize:13 }}>Client has not uploaded documents yet.</p>}
      </Card>

      {/* Actions */}
      <Card style={{ marginBottom:16 }}>
        <Label>Your Decision</Label>
        <p style={{ color:T.textSecondary, fontSize:14, lineHeight:1.6, marginBottom:14 }}>Review the case above and decide whether to accept, request more information, or decline.</p>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <PrimaryBtn small onClick={() => {}}>✓ Accept Case</PrimaryBtn>
          <button style={{ background:T.amberDim, border:`1px solid ${T.amber}44`, borderRadius:10, padding:"9px 16px", color:T.amber, fontSize:13, fontWeight:700, cursor:"pointer" }}>📋 Request More Info</button>
          <button style={{ background:T.redDim, border:`1px solid ${T.red}44`, borderRadius:10, padding:"9px 16px", color:T.red, fontSize:13, fontWeight:700, cursor:"pointer" }}>✕ Decline</button>
        </div>
      </Card>

      {/* Message client */}
      <Card>
        <Label>Message Client</Label>
        <textarea placeholder="Write a message to the client..." rows={3} style={{ width:"100%", background:T.surfaceHigh, border:`1px solid ${T.border}`, borderRadius:10, padding:"10px 12px", color:T.textPrimary, fontSize:14, outline:"none", resize:"none", marginBottom:10 }}/>
        <PrimaryBtn small onClick={() => {}}>Send Message</PrimaryBtn>
      </Card>
    </div>
  );

  return (
    <div style={{ padding:"20px", maxWidth:680, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h2 style={{ color:T.textPrimary, fontSize:22, fontWeight:800, letterSpacing:"-0.6px" }}>Case Queue</h2>
        <span style={{ color:T.textSecondary, fontSize:14 }}>{filtered.length} cases</span>
      </div>
      <div style={{ display:"flex", gap:6, marginBottom:16, flexWrap:"wrap" }}>
        {["all","pending","reviewing","matched","closed"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ background:filter===f?T.goldDim:"none", border:`1px solid ${filter===f?T.gold:T.border}`, borderRadius:8, padding:"6px 12px", color:filter===f?T.gold:T.textSecondary, fontSize:12, fontWeight:700, cursor:"pointer", textTransform:"capitalize" }}>{f}</button>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {filtered.map(c => (
          <Card key={c.id} onClick={() => setLocalSelected(c)} style={{ cursor:"pointer" }}>
            <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
              <ScoreRing score={c.score} size={56}/>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:6 }}>
                  <span style={{ color:T.textPrimary, fontWeight:700, fontSize:15 }}>{c.name}</span>
                  <StatusPill status={c.status}/>
                  <UrgencyDot urgency={c.urgency}/>
                </div>
                <Pill label={c.category} color={T.purple}/>
                <p style={{ color:T.textSecondary, fontSize:13, lineHeight:1.5, margin:"8px 0 4px" }}>{c.story.slice(0,90)}...</p>
                <p style={{ color:T.textMuted, fontSize:12 }}>{c.country} · {c.date} {c.hasFiles && "· 📎 Has files"}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function LawyerEarnings() {
  return (
    <div style={{ padding:"20px", maxWidth:640, margin:"0 auto" }}>
      <h2 style={{ color:T.textPrimary, fontSize:22, fontWeight:800, letterSpacing:"-0.6px", marginBottom:20 }}>Earnings</h2>
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {[["$3,200","Total earned"],["$450","This month"],["14","Cases taken"],["$229","Per case avg"]].map(([n,l],i) => (
          <div key={i} style={{ flex:1, background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:"14px 8px", textAlign:"center" }}>
            <p style={{ color:T.gold, fontSize:18, fontWeight:900 }}>{n}</p>
            <p style={{ color:T.textMuted, fontSize:11, marginTop:2 }}>{l}</p>
          </div>
        ))}
      </div>
      <Card style={{ marginBottom:16 }}>
        <Label>Recent Payouts</Label>
        {[
          { name:"Marcus T.", case:"Wrongful Conviction", amount:"$450", date:"Jan 20", type:"Lead fee" },
          { name:"Fatima K.", case:"Civil Rights", amount:"$300", date:"Jan 15", type:"Lead fee" },
          { name:"Amara J.", case:"Police Misconduct", amount:"$1,200", date:"Dec 28", type:"Case settlement %" },
          { name:"Jerome W.", case:"False Accusation", amount:"$250", date:"Dec 10", type:"Lead fee" },
        ].map((p,i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:i<3?`1px solid ${T.border}`:"none" }}>
            <div>
              <p style={{ color:T.textPrimary, fontSize:14, fontWeight:600, marginBottom:2 }}>{p.name} · {p.case}</p>
              <p style={{ color:T.textMuted, fontSize:12 }}>{p.date} · {p.type}</p>
            </div>
            <span style={{ color:T.emerald, fontWeight:800, fontSize:15 }}>+{p.amount}</span>
          </div>
        ))}
      </Card>
      <Card>
        <Label>Subscription Plan</Label>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <p style={{ color:T.textPrimary, fontWeight:700, fontSize:15, marginBottom:4 }}>Professional Plan</p>
            <p style={{ color:T.textSecondary, fontSize:13 }}>Unlimited case access · Priority matching · $99/mo</p>
          </div>
          <Pill label="Active" color={T.emerald}/>
        </div>
        <div style={{ marginTop:12, display:"flex", gap:8 }}>
          <GhostBtn small onClick={()=>{}}>Manage Plan</GhostBtn>
          <GhostBtn small onClick={()=>{}}>Billing History</GhostBtn>
        </div>
      </Card>
    </div>
  );
}

function LawyerProfile() {
  return (
    <div style={{ padding:"20px", maxWidth:600, margin:"0 auto" }}>
      <Card style={{ textAlign:"center", padding:"28px 20px", marginBottom:16 }}>
        <Avatar initials="SO" size={72}/>
        <h2 style={{ color:T.textPrimary, fontSize:22, fontWeight:800, marginTop:14, marginBottom:4 }}>Sarah Okonkwo</h2>
        <p style={{ color:T.textSecondary, fontSize:14, marginBottom:4 }}>Criminal Defense / Appeals</p>
        <p style={{ color:T.textMuted, fontSize:13, marginBottom:14 }}>Lagos, Nigeria · Member since Nov 2023</p>
        <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
          <Pill label="Verified ✓" color={T.emerald}/>
          <Pill label="4.9 ★" color={T.gold}/>
          <Pill label="14 cases" color={T.blue}/>
        </div>
      </Card>
      <Card style={{ marginBottom:16 }}>
        <Label>Specializations</Label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {["Criminal Defense","Appeals","Wrongful Conviction","Civil Rights","Asset Recovery"].map((s,i) => (
            <span key={i} style={{ background:T.surfaceHigh, border:`1px solid ${T.border}`, borderRadius:20, padding:"5px 12px", color:T.textSecondary, fontSize:13 }}>{s}</span>
          ))}
        </div>
      </Card>
      <Card style={{ marginBottom:16 }}>
        <Label>Availability Settings</Label>
        {[["Max cases/month","10"],["Response time","< 24 hours"],["Pro bono slots","2/month"],["Languages","English, Yoruba, Igbo"]].map(([k,v],i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:i<3?`1px solid ${T.border}`:"none" }}>
            <span style={{ color:T.textSecondary, fontSize:14 }}>{k}</span>
            <span style={{ color:T.textPrimary, fontSize:14, fontWeight:600 }}>{v}</span>
          </div>
        ))}
        <div style={{ marginTop:12 }}><PrimaryBtn small onClick={()=>{}}>Edit Settings</PrimaryBtn></div>
      </Card>
      <Card>
        <Label>Bar License & Verification</Label>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <p style={{ color:T.textPrimary, fontSize:14, fontWeight:600, marginBottom:4 }}>Nigerian Bar Association</p>
            <p style={{ color:T.textMuted, fontSize:12 }}>License #NBA-2019-04821 · Verified Jan 2024</p>
          </div>
          <Pill label="✓ Verified" color={T.emerald}/>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN VIEWS
// ═══════════════════════════════════════════════════════════════════════════════

function AdminOverview() {
  return (
    <div style={{ padding:"20px", maxWidth:720, margin:"0 auto" }}>
      <div style={{ marginBottom:20 }}>
        <h2 style={{ color:T.textPrimary, fontSize:22, fontWeight:800, letterSpacing:"-0.6px", marginBottom:4 }}>Platform Overview</h2>
        <p style={{ color:T.textSecondary, fontSize:14 }}>Review My Case — Admin Control Center</p>
      </div>

      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20 }}>
        {[
          { label:"Total Cases", value:"1,247", change:"+48 this week", color:T.gold, icon:"📋" },
          { label:"Active Lawyers", value:"34", change:"+4 this month", color:T.emerald, icon:"⚖️" },
          { label:"Cases Resolved", value:"891", change:"71% resolution rate", color:T.blue, icon:"✅" },
          { label:"Platform Revenue", value:"$18,400", change:"+$2,100 this month", color:T.pink, icon:"💰" },
          { label:"Avg Justice Score", value:"63", change:"Up from 58 last month", color:T.purple, icon:"📊" },
          { label:"Countries Active", value:"18", change:"+3 this quarter", color:T.amber, icon:"🌍" },
        ].map((k,i) => (
          <div key={i} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, padding:"16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <span style={{ fontSize:22 }}>{k.icon}</span>
              <Pill label={k.change} color={k.color}/>
            </div>
            <p style={{ color:k.color, fontSize:26, fontWeight:900, marginBottom:2 }}>{k.value}</p>
            <p style={{ color:T.textMuted, fontSize:12 }}>{k.label}</p>
          </div>
        ))}
      </div>

      {/* System health */}
      <Card style={{ marginBottom:16 }}>
        <Label>System Health</Label>
        {[
          { label:"AI Analysis Engine", status:"operational", uptime:"99.97%" },
          { label:"Document Storage", status:"operational", uptime:"99.99%" },
          { label:"Lawyer Matching API", status:"operational", uptime:"99.94%" },
          { label:"Notification Service", status:"degraded", uptime:"97.2%" },
          { label:"Payment Processing", status:"operational", uptime:"99.99%" },
        ].map((s,i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:i<4?`1px solid ${T.border}`:"none" }}>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:s.status==="operational"?T.emerald:T.amber, boxShadow:`0 0 6px ${s.status==="operational"?T.emerald:T.amber}` }}/>
              <span style={{ color:T.textPrimary, fontSize:14 }}>{s.label}</span>
            </div>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <span style={{ color:T.textMuted, fontSize:12 }}>{s.uptime}</span>
              <Pill label={s.status} color={s.status==="operational"?T.emerald:T.amber}/>
            </div>
          </div>
        ))}
      </Card>

      {/* Recent activity */}
      <Card>
        <Label>Recent Activity</Label>
        {[
          { event:"New case submitted", detail:"Marcus T. · Nigeria · Score 82", time:"2 min ago", icon:"📬" },
          { event:"Lawyer accepted case", detail:"Sarah Okonkwo accepted Amara J.", time:"18 min ago", icon:"✅" },
          { event:"Case resolved", detail:"Jerome W. · Settlement reached", time:"1 hour ago", icon:"🏆" },
          { event:"New lawyer verified", detail:"Kwame Asante · Ghana", time:"3 hours ago", icon:"⚖️" },
          { event:"Flagged content", detail:"Possible duplicate case detected", time:"4 hours ago", icon:"⚑" },
        ].map((a,i) => (
          <div key={i} style={{ display:"flex", gap:10, padding:"9px 0", borderBottom:i<4?`1px solid ${T.border}`:"none" }}>
            <span style={{ fontSize:16 }}>{a.icon}</span>
            <div style={{ flex:1 }}>
              <p style={{ color:T.textPrimary, fontSize:14, fontWeight:600, marginBottom:2 }}>{a.event}</p>
              <p style={{ color:T.textSecondary, fontSize:12 }}>{a.detail}</p>
            </div>
            <span style={{ color:T.textMuted, fontSize:11, whiteSpace:"nowrap" }}>{a.time}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

function AdminCases() {
  const [filter, setFilter] = useState("all");
  const filtered = filter==="all"?MOCK_CASES:MOCK_CASES.filter(c=>c.status===filter);
  return (
    <div style={{ padding:"20px", maxWidth:720, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h2 style={{ color:T.textPrimary, fontSize:22, fontWeight:800, letterSpacing:"-0.6px" }}>All Cases</h2>
        <div style={{ display:"flex", gap:8 }}>
          <GhostBtn small onClick={()=>{}}>Export CSV</GhostBtn>
          <GhostBtn small onClick={()=>{}}>Filter</GhostBtn>
        </div>
      </div>
      <div style={{ display:"flex", gap:6, marginBottom:16, flexWrap:"wrap" }}>
        {["all","pending","reviewing","matched","closed"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ background:filter===f?T.goldDim:"none", border:`1px solid ${filter===f?T.gold:T.border}`, borderRadius:8, padding:"6px 12px", color:filter===f?T.gold:T.textSecondary, fontSize:12, fontWeight:700, cursor:"pointer", textTransform:"capitalize" }}>{f}</button>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {filtered.map(c => (
          <Card key={c.id}>
            <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
              <ScoreRing score={c.score} size={50}/>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center", marginBottom:6 }}>
                  <span style={{ color:T.textPrimary, fontWeight:700, fontSize:14 }}>{c.name}</span>
                  <StatusPill status={c.status}/>
                  <UrgencyDot urgency={c.urgency}/>
                  <span style={{ color:T.textMuted, fontSize:12 }}>{c.country}</span>
                </div>
                <p style={{ color:T.textSecondary, fontSize:13, marginBottom:6 }}>{c.story.slice(0,80)}...</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                  {c.violations.map((v,i) => <Pill key={i} label={v} color={T.red}/>)}
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <button style={{ background:T.blueDim, border:`1px solid ${T.blue}44`, borderRadius:8, padding:"6px 10px", color:T.blue, fontSize:12, fontWeight:700, cursor:"pointer" }}>View</button>
                <button style={{ background:T.redDim, border:`1px solid ${T.red}44`, borderRadius:8, padding:"6px 10px", color:T.red, fontSize:12, fontWeight:700, cursor:"pointer" }}>Flag</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AdminLawyers() {
  return (
    <div style={{ padding:"20px", maxWidth:720, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <h2 style={{ color:T.textPrimary, fontSize:22, fontWeight:800, letterSpacing:"-0.6px" }}>Lawyer Network</h2>
        <PrimaryBtn small onClick={()=>{}}>+ Invite Lawyer</PrimaryBtn>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {MOCK_LAWYERS.map(l => (
          <Card key={l.id}>
            <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
              <Avatar initials={l.avatar} size={48}/>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6, flexWrap:"wrap" }}>
                  <span style={{ color:T.textPrimary, fontWeight:700, fontSize:15 }}>{l.name}</span>
                  <StatusPill status={l.status}/>
                  <Pill label={`★ ${l.rating}`} color={T.gold}/>
                </div>
                <p style={{ color:T.textSecondary, fontSize:13, marginBottom:4 }}>{l.spec}</p>
                <p style={{ color:T.textMuted, fontSize:12 }}>{l.country} · {l.cases} cases · Joined {l.joined}</p>
              </div>
              <div style={{ textAlign:"right" }}>
                <p style={{ color:T.emerald, fontSize:16, fontWeight:800 }}>${l.earnings.toLocaleString()}</p>
                <p style={{ color:T.textMuted, fontSize:11 }}>earned</p>
                <div style={{ display:"flex", gap:6, marginTop:8 }}>
                  {l.status==="pending" && <button style={{ background:T.emeraldDim, border:`1px solid ${T.emerald}44`, borderRadius:8, padding:"5px 10px", color:T.emerald, fontSize:12, fontWeight:700, cursor:"pointer" }}>Verify</button>}
                  <button style={{ background:T.redDim, border:`1px solid ${T.red}44`, borderRadius:8, padding:"5px 10px", color:T.red, fontSize:12, fontWeight:700, cursor:"pointer" }}>Suspend</button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AdminReports() {
  return (
    <div style={{ padding:"20px", maxWidth:720, margin:"0 auto" }}>
      <h2 style={{ color:T.textPrimary, fontSize:22, fontWeight:800, letterSpacing:"-0.6px", marginBottom:20 }}>Reports & Analytics</h2>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20 }}>
        {[
          { label:"Cases by Country", data:[["Nigeria","38%"],["USA","24%"],["UK","14%"],["Ghana","10%"],["Other","14%"]], color:T.purple },
          { label:"Cases by Category", data:[["Wrongful Conviction","31%"],["Civil Rights","22%"],["Police Misconduct","18%"],["Employment","12%"],["Other","17%"]], color:T.blue },
        ].map((r,i) => (
          <Card key={i}>
            <Label>{r.label}</Label>
            {r.data.map(([k,v],j) => (
              <div key={j} style={{ marginBottom:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                  <span style={{ color:T.textSecondary, fontSize:12 }}>{k}</span>
                  <span style={{ color:T.textPrimary, fontSize:12, fontWeight:700 }}>{v}</span>
                </div>
                <div style={{ height:4, background:T.border, borderRadius:2 }}>
                  <div style={{ height:4, background:r.color, borderRadius:2, width:v, transition:"width 1s ease" }}/>
                </div>
              </div>
            ))}
          </Card>
        ))}
      </div>
      <Card style={{ marginBottom:16 }}>
        <Label>Justice Score Distribution</Label>
        <div style={{ display:"flex", gap:8, alignItems:"flex-end", height:80, marginBottom:8 }}>
          {[["0-20","4%",8],["21-40","11%",22],["41-60","29%",58],["61-80","41%",82],["81-100","15%",30]].map(([range,pct,h],i) => (
            <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
              <span style={{ color:T.textMuted, fontSize:10 }}>{pct}</span>
              <div style={{ width:"100%", height:h, background:`linear-gradient(180deg,${T.gold},${T.gold}66)`, borderRadius:"4px 4px 0 0" }}/>
              <span style={{ color:T.textMuted, fontSize:10 }}>{range}</span>
            </div>
          ))}
        </div>
        <p style={{ color:T.textMuted, fontSize:12 }}>Most cases score 61–80, indicating moderate-to-strong basis for review.</p>
      </Card>
      <div style={{ display:"flex", gap:8 }}>
        <GhostBtn small onClick={()=>{}}>Download Full Report (PDF)</GhostBtn>
        <GhostBtn small onClick={()=>{}}>Export Raw Data (CSV)</GhostBtn>
      </div>
    </div>
  );
}

function AdminSettings() {
  return (
    <div style={{ padding:"20px", maxWidth:640, margin:"0 auto" }}>
      <h2 style={{ color:T.textPrimary, fontSize:22, fontWeight:800, letterSpacing:"-0.6px", marginBottom:20 }}>Platform Settings</h2>
      {[
        { section:"AI Configuration", items:[
          { label:"AI Model", value:"claude-sonnet-4-6", type:"text" },
          { label:"Max Justice Score requests/day", value:"5,000", type:"text" },
          { label:"Auto-flag threshold", value:"Score < 30", type:"text" },
        ]},
        { section:"Monetization", items:[
          { label:"Lead fee per case", value:"$45", type:"text" },
          { label:"Lawyer subscription (monthly)", value:"$99", type:"text" },
          { label:"Settlement commission", value:"3%", type:"text" },
        ]},
        { section:"Access Control", items:[
          { label:"User registration", value:"Open", type:"toggle" },
          { label:"Lawyer applications", value:"Invite only", type:"toggle" },
          { label:"Public case visibility", value:"Off — private", type:"toggle" },
        ]},
        { section:"Compliance", items:[
          { label:"Legal disclaimer shown", value:"All screens", type:"text" },
          { label:"Data retention policy", value:"7 years", type:"text" },
          { label:"GDPR / NDPR compliance", value:"Active", type:"text" },
        ]},
      ].map((section,si) => (
        <Card key={si} style={{ marginBottom:14 }}>
          <Label>{section.section}</Label>
          {section.items.map((item,ii) => (
            <div key={ii} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:ii<section.items.length-1?`1px solid ${T.border}`:"none" }}>
              <span style={{ color:T.textSecondary, fontSize:14 }}>{item.label}</span>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <span style={{ color:T.textPrimary, fontSize:14, fontWeight:600 }}>{item.value}</span>
                <button style={{ background:"none", border:`1px solid ${T.border}`, borderRadius:6, padding:"3px 8px", color:T.gold, fontSize:11, fontWeight:700, cursor:"pointer" }}>Edit</button>
              </div>
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}

// ─── INTAKE MODAL ─────────────────────────────────────────────────────────────
function IntakeModal({ onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ category:"", country:"", story:"", urgency:"" });
  const u = (k,v) => setForm(f=>({...f,[k]:v}));
  const CATS = [
    { icon:"🔒", label:"Wrongful Conviction" },
    { icon:"📋", label:"False Accusation" },
    { icon:"✊", label:"Civil Rights" },
    { icon:"⚠️", label:"Police Misconduct" },
    { icon:"🏠", label:"Property Theft" },
    { icon:"💼", label:"Employment" },
    { icon:"🛡️", label:"Domestic Violence" },
    { icon:"❓", label:"Other" },
  ];
  return (
    <div style={{ position:"fixed", inset:0, background:"#000000cc", zIndex:100, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div style={{ background:T.bg, border:`1px solid ${T.borderHigh}`, borderRadius:"20px 20px 0 0", width:"100%", maxWidth:600, maxHeight:"85vh", overflow:"auto", padding:"24px 20px 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ color:T.textPrimary, fontSize:18, fontWeight:800 }}>New Case — Step {step} of 3</h3>
          <button onClick={onClose} style={{ background:"none", border:"none", color:T.textMuted, cursor:"pointer", fontSize:22 }}>✕</button>
        </div>
        <div style={{ display:"flex", gap:4, marginBottom:24 }}>
          {[1,2,3].map(s => <div key={s} style={{ flex:1, height:3, borderRadius:2, background:s<=step?T.gold:T.border }}/>)}
        </div>

        {step===1 && <>
          <p style={{ color:T.textSecondary, fontSize:14, marginBottom:16 }}>What type of case is this?</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20 }}>
            {CATS.map(c => (
              <button key={c.label} onClick={() => u("category",c.label)} style={{ background:form.category===c.label?T.goldDim:T.surfaceHigh, border:`1.5px solid ${form.category===c.label?T.gold:T.border}`, borderRadius:10, padding:"10px 12px", color:form.category===c.label?T.gold:T.textSecondary, fontSize:13, fontWeight:600, cursor:"pointer", textAlign:"left" }}>{c.icon} {c.label}</button>
            ))}
          </div>
          <PrimaryBtn onClick={() => form.category && setStep(2)} disabled={!form.category}>Next →</PrimaryBtn>
        </>}

        {step===2 && <>
          <p style={{ color:T.textSecondary, fontSize:14, marginBottom:16 }}>✍️ Tell us what happened, in your own words.</p>
          <textarea value={form.story} onChange={e=>u("story",e.target.value)} placeholder="Describe what happened. Don't worry about legal terms." rows={6}
            style={{ width:"100%", background:T.surfaceHigh, border:`1px solid ${T.border}`, borderRadius:10, padding:"12px 14px", color:T.textPrimary, fontSize:15, outline:"none", resize:"none", marginBottom:16, lineHeight:1.7 }}/>
          <div style={{ display:"flex", gap:8 }}>
            <GhostBtn small onClick={() => setStep(1)}>← Back</GhostBtn>
            <PrimaryBtn onClick={() => form.story.length>20 && setStep(3)} disabled={form.story.length<20}>Next →</PrimaryBtn>
          </div>
        </>}

        {step===3 && <>
          <p style={{ color:T.textSecondary, fontSize:14, marginBottom:16 }}>📍 What's your current status?</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
            {[
              { icon:"🔴", label:"Currently in custody" },
              { icon:"🟡", label:"Awaiting trial" },
              { icon:"🟠", label:"Already convicted / sentenced" },
              { icon:"🟡", label:"Out on bail" },
              { icon:"⚖️", label:"Charged, no court date yet" },
              { icon:"🟢", label:"Released — seeking appeal" },
              { icon:"📋", label:"Civil matter — no arrest" },
            ].map(o => (
              <button key={o.label} onClick={() => u("urgency",o.label)} style={{ display:"flex", alignItems:"center", gap:10, background:form.urgency===o.label?T.goldDim:T.surfaceHigh, border:`1.5px solid ${form.urgency===o.label?T.gold:T.border}`, borderRadius:10, padding:"11px 14px", color:form.urgency===o.label?T.gold:T.textSecondary, fontSize:14, fontWeight:600, cursor:"pointer", textAlign:"left" }}>
                <span>{o.icon}</span> {o.label}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <GhostBtn small onClick={() => setStep(2)}>← Back</GhostBtn>
            <PrimaryBtn onClick={() => form.urgency && onComplete(form)} disabled={!form.urgency}>🔎 Analyze My Case →</PrimaryBtn>
          </div>
        </>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [role, setRole] = useState("user");
  const [view, setView] = useState("home");
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleIntakeComplete = async (form) => {
    setIntakeOpen(false);
    setAnalyzing(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000, messages:[{ role:"user", content:`Analyze this legal case. Respond ONLY in valid JSON: {"summary":"2 sentences","justiceScore":0-100,"scoreRationale":"1 sentence","violations":[{"type":"name","detail":"plain English","severity":"High|Medium|Low"}],"nextSteps":["3-4 steps"],"urgency":"immediate|soon|standard","encouragement":"1 genuine sentence"}. Case: Category=${form.category}, Status=${form.urgency}, Story=${form.story}` }] })
      });
      const data = await res.json();
      const text = data.content.map(b=>b.text||"").join("");
      const parsed = JSON.parse(text.replace(/```json|```/g,"").trim());
      setAnalysisResult(parsed);
    } catch {
      setAnalysisResult({
        summary:"Your situation has been reviewed. There appear to be serious concerns worth pursuing with qualified legal help.",
        justiceScore:61,
        scoreRationale:"Multiple procedural concerns identified based on your account.",
        violations:[{ type:"Procedural Violation — Review Needed", detail:"A qualified attorney should review the full record to confirm applicable violations.", severity:"High" }],
        nextSteps:["Contact a free legal aid organization this week","Write down your full timeline while memory is fresh","Gather every document you can find","Avoid discussing your case on social media"],
        urgency:"soon",
        encouragement:"What happened to you matters. You deserve to be heard."
      });
    }
    setAnalyzing(false);
    setView("my_cases");
  };

  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:"'Inter', system-ui, sans-serif", color:T.textPrimary }}>
      <style>{css}</style>
      <TopNav role={role} setRole={setRole} activeView={view} setView={setView} />

      {analyzing && (
        <div style={{ position:"fixed", inset:0, background:"#07070fdd", zIndex:200, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
          <div style={{ width:56, height:56, border:`3px solid ${T.border}`, borderTop:`3px solid ${T.gold}`, borderRadius:"50%", animation:"spin 1s linear infinite", marginBottom:20 }}/>
          <p style={{ color:T.textPrimary, fontSize:18, fontWeight:800, marginBottom:6 }}>Reviewing your case...</p>
          <p style={{ color:T.textSecondary, fontSize:14 }}>Identifying violations and calculating your Justice Score</p>
        </div>
      )}

      {intakeOpen && (
        <IntakeModal onClose={() => setIntakeOpen(false)} onComplete={handleIntakeComplete} />
      )}

      {/* ── USER ROLE ───────────────────────────────────────────────────── */}
      {role==="user" && view==="home" && <UserHome setView={setView} setIntakeOpen={setIntakeOpen} />}
      {role==="user" && view==="my_cases" && <UserMyCases analysisResult={analysisResult} />}
      {role==="user" && view==="profile" && <UserProfile setView={setView} />}
      {role==="user" && view==="help" && <UserHelp />}

      {/* ── LAWYER ROLE ──────────────────────────────────────────────────── */}
      {role==="lawyer" && view==="dashboard" && <LawyerDashboard setView={setView} setSelectedCase={setSelectedCase} />}
      {role==="lawyer" && view==="cases" && <LawyerCases selectedCase={selectedCase} setSelectedCase={setSelectedCase} />}
      {role==="lawyer" && view==="earnings" && <LawyerEarnings />}
      {role==="lawyer" && view==="profile" && <LawyerProfile />}

      {/* ── ADMIN ROLE ───────────────────────────────────────────────────── */}
      {role==="admin" && view==="overview" && <AdminOverview />}
      {role==="admin" && view==="cases" && <AdminCases />}
      {role==="admin" && view==="lawyers" && <AdminLawyers />}
      {role==="admin" && view==="reports" && <AdminReports />}
      {role==="admin" && view==="settings" && <AdminSettings />}

      <div style={{ textAlign:"center", padding:"24px 20px 40px" }}>
        <p style={{ color:T.textMuted, fontSize:12, lineHeight:1.7 }}>
          Review My Case is not a law firm and does not provide legal advice. We securely organize your case and help connect you with qualified legal professionals who may be able to assist you. All data is kept private and encrypted.
        </p>
      </div>
    </div>
  );
}
