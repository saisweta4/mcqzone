export interface Subject {
  id: string;
  name: string;
  questionCount: number;
  iconName: string; // We use a string here so it's easy to store in a real DB later
  description: string;
}

export interface ExamDetail {
  id: string;
  title: string;
  highlightTitle: string;
  shortName: string;
  description: string;
  tags: string[];
  stats: {
    totalSubjects: number;
    totalQuestions: string;
    mockTests: number;
    studyTime: string;
  };
  insights: string;
  subjects: Subject[];
}

export const mockExamsDatabase: ExamDetail[] = [
  {
    id: "opsc-aso",
    title: "OPSC ASO Prelims 2025",
    highlightTitle: "OPSC",
    shortName: "RI Mock 01",
    description: "Preliminary examination for OPSC ASO posts. Test your preparation level with these curated questions",
    tags: ["New", "Mock Test"],
    stats: {
      totalSubjects: 4,
      totalQuestions: "100",
      mockTests: 1,
      studyTime: "2h",
    },
    insights: "Speed and accuracy in arithmetic will decide your rank here.",
    subjects: [
      { id: "history-opsc", name: "History", questionCount: 40, iconName: "History", description: "Ancient Kalinga to modern state formation." },
      { id: "geography-opsc", name: "Geography", questionCount: 40, iconName: "Globe", description: "Current events, History, and Geography." },
      { id: "political-opsc", name: "Political Science", questionCount: 20, iconName: "Flag", description: "Indian Politics, Constitution, and Governance." }
    ]
  },

    {
    id: "ri-mock-01",
    title: "Revenue Inspector Mock Test 01",
    highlightTitle: "OPSC",
    shortName: "RI Mock 01",
    description: "Full-length mock test for the Revenue Inspector examination. Test your preparation level with these curated questions.",
    tags: ["New", "Mock Test"],
    stats: {
      totalSubjects: 4,
      totalQuestions: "100",
      mockTests: 1,
      studyTime: "2h",
    },
    insights: "Speed and accuracy in arithmetic will decide your rank here.",
    subjects: [
      { id: "math-ri", name: "Mathematics", questionCount: 40, iconName: "Calculator", description: "Arithmetic, Mensuration, and basic Algebra." },
      { id: "gk-ri", name: "General Knowledge", questionCount: 40, iconName: "Globe", description: "Current events, History, and Geography." },
      { id: "comp-ri", name: "Computer Test", questionCount: 20, iconName: "Monitor", description: "Basic IT and MS Office practical knowledge." }
    ]
  },
  {
    id: "gk-mega-test",
    title: "Odisha GK Mega Test",
    highlightTitle: "State Exams",
    shortName: "GK Mega",
    description: "Comprehensive general knowledge test focusing specifically on Odisha state history, geography, and current affairs.",
    tags: ["Trending", "High Yield"],
    stats: {
      totalSubjects: 3,
      totalQuestions: "120",
      mockTests: 5,
      studyTime: "4h",
    },
    insights: "Focus heavily on recent state government schemes and tribal history.",
    subjects: [
      { id: "hist-od", name: "Odisha History", questionCount: 50, iconName: "History", description: "Ancient Kalinga to modern state formation." },
      { id: "geo-od", name: "Odisha Geography", questionCount: 40, iconName: "Globe", description: "Rivers, climate, and topography of the region." },
      { id: "ca-od", name: "Current Events", questionCount: 30, iconName: "Calendar", description: "State-specific current affairs from the last 6 months." }
    ]
  }
];

// Helper function to simulate a database fetch
export function getExamById(id: string): ExamDetail | undefined {
  return mockExamsDatabase.find((exam) => exam.id === id);
}