export interface QuizQuestion {
  id: string;
  questionText: string;
  options: { id: string; letter: string; text: string }[];
  correctOptionId: string;
  explanation: {
    short: string;
    detailed: string;
    keyConcepts: string[];
    tip: string;
  };
}

export const dummyQuestions: QuizQuestion[] = [
  {
    id: "q-12",
    questionText: "Which historical event in Odisha is often referred to as the 'First War of Indian Independence' by local historians?",
    options: [
      { id: "opt-a", letter: "A", text: "The Salt Satyagraha in Inchudi" },
      { id: "opt-b", letter: "B", text: "The Prajamandal Movement" },
      { id: "opt-c", letter: "C", text: "The Paika Rebellion of 1817" },
      { id: "opt-d", letter: "D", text: "The Quit India Movement in Eram" }
    ],
    correctOptionId: "opt-c",
    explanation: {
      short: "The Paika Rebellion (Paika Bidroha) of 1817 was an armed rebellion against the British East India Company's rule in Odisha.",
      detailed: "The Paikas were the traditional landed militia of Odisha. They served as warriors and were given rent-free land (Paikali) for their military service to the King of Khurda. When the British took over Odisha in 1803, they introduced new land revenue policies that led to the loss of these lands, causing immense hardship. Led by Bakshi Jagabandhu, the rebellion saw participation from various sections of society.",
      keyConcepts: ["Bakshi Jagabandhu", "1817 Rebellion", "Khurda Kingdom", "East India Company"],
      tip: "Odisha government and several historians consider the Paika Rebellion as the 'First War of Indian Independence', preceding the 1857 Sepoy Mutiny. Remember the year 1817 specifically for OPSC exams!"
    }
  },
  {
    id: "q-13",
    questionText: "Who was the first Chief Minister of Odisha after India gained independence?",
    options: [
      { id: "opt-a", letter: "A", text: "Biju Patnaik" },
      { id: "opt-b", letter: "B", text: "Harekrushna Mahatab" },
      { id: "opt-c", letter: "C", text: "Nabakrushna Choudhury" },
      { id: "opt-d", letter: "D", text: "Krushna Chandra Gajapati" }
    ],
    correctOptionId: "opt-b",
    explanation: {
      short: "Harekrushna Mahatab served as the first Chief Minister of Odisha from 1946 to 1950, and again from 1956 to 1961.",
      detailed: "Known popularly as the 'Utkal Keshari', Harekrushna Mahatab was a prominent leader of the Indian National Congress. He played a crucial role in the integration of the princely states into Odisha after independence. He also served as the Minister of Commerce and Industry in the central cabinet.",
      keyConcepts: ["Utkal Keshari", "Integration of Princely States", "INC"],
      tip: "Do not confuse the first Chief Minister after independence (Mahatab) with the first Prime Minister of Odisha province in 1937 (Krushna Chandra Gajapati)."
    }
  }
];