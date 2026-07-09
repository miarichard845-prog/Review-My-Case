export const MOCK_CASES = [
  { id: "c1", name: "Marcus T.", country: "Nigeria", category: "Wrongful Conviction", score: 82, urgency: "immediate", status: "pending", date: "2024-01-15", story: "Falsely accused by sister-in-law. Spent 543 days in custody. Assets sold without consent.", violations: ["False Imprisonment", "Financial Fraud", "Asset Theft"], hasFiles: true },
  { id: "c2", name: "Amara J.", country: "United States", category: "Police Misconduct", score: 71, urgency: "soon", status: "reviewing", date: "2024-01-18", story: "Unlawful search and seizure. Evidence planted. Case dismissed but no accountability.", violations: ["4th Amendment Violation", "Excessive Force"], hasFiles: true },
  { id: "c3", name: "David O.", country: "United Kingdom", category: "Employment Injustice", score: 55, urgency: "standard", status: "matched", date: "2024-01-20", story: "Wrongful termination after whistleblowing. HR covered it up.", violations: ["Wrongful Termination", "Retaliation"], hasFiles: false },
  { id: "c4", name: "Fatima K.", country: "Ghana", category: "Civil Rights Violation", score: 67, urgency: "soon", status: "pending", date: "2024-01-21", story: "Detained without charge for 3 weeks. No access to lawyer.", violations: ["Unlawful Detention", "Right to Counsel Denied"], hasFiles: true },
  { id: "c5", name: "Jerome W.", country: "Jamaica", category: "False Accusation", score: 44, urgency: "standard", status: "closed", date: "2024-01-10", story: "Accused by neighbor in land dispute. No evidence.", violations: ["Malicious Prosecution"], hasFiles: false },
];

export const MOCK_LAWYERS = [
  { id: "l1", name: "Sarah Okonkwo", spec: "Criminal Defense / Appeals", country: "Nigeria", cases: 14, rating: 4.9, status: "active", earnings: 3200, joined: "2023-11", avatar: "SO" },
  { id: "l2", name: "James Miller", spec: "Civil Rights / Wrongful Conviction", country: "United States", cases: 22, rating: 4.8, status: "active", earnings: 7800, joined: "2023-09", avatar: "JM" },
  { id: "l3", name: "Priya Sharma", spec: "Employment Law", country: "United Kingdom", cases: 9, rating: 4.7, status: "active", earnings: 2100, joined: "2024-01", avatar: "PS" },
  { id: "l4", name: "Kwame Asante", spec: "Human Rights / Criminal", country: "Ghana", cases: 6, rating: 4.9, status: "pending", earnings: 0, joined: "2024-01", avatar: "KA" },
];

export const MOCK_USER = {
  name: "Marcus Thompson",
  email: "marcus.t@email.com",
  country: "Nigeria",
  joined: "January 2024",
  cases: [
    { id: "c1", title: "Wrongful Conviction — Asset Theft", status: "reviewing", score: 82, date: "2024-01-15", lawyer: "Sarah Okonkwo" },
    { id: "cx", title: "Bank Account Removal", status: "pending", score: 61, date: "2024-01-22", lawyer: null },
  ],
  documents: ["Arrest record.pdf", "Bail denial notice.pdf", "Property deed.pdf", "Bank statement.pdf"],
  notifications: [
    { text: "Sarah Okonkwo accepted your case", time: "2 hours ago", read: false },
    { text: "Your Justice Score updated to 82", time: "1 day ago", read: false },
    { text: "New evidence gap identified", time: "2 days ago", read: true },
  ],
};

export const CASE_TIMELINE = [
  { date: "2024-01-15", event: "Case submitted and reviewed by AI", flag: false },
  { date: "2024-01-16", event: "Justice Score calculated: 82", flag: false },
  { date: "2024-01-17", event: "Matched with Sarah Okonkwo", flag: false },
  { date: "2024-01-18", event: "Evidence gap identified — missing bail record", flag: true },
];
