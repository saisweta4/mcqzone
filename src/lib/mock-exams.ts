import { Exam } from "@/types/exam";

export const exams: Exam[] = [
  {
    id: "opsc-aso", // Changed from "1"
    title: "OPSC ASO Prelims 2025",
    description: "Preliminary examination for OPSC ASO posts",
    questions: 100,
    duration: 120,
    attempts: 1250,
    difficulty: "Medium",
    category: "OPSC",
  },
  {
    id: "ossc-cgl", // Changed from "2"
    title: "OSSC CGL 2025",
    description: "Combined Graduate Level examination for OSSC posts",
    questions: 150,
    duration: 180,
    attempts: 2100,
    difficulty: "Hard",
    category: "OSSC",
  },
  {
    id: "ri-mock-01", // Changed from "3"
    title: "RI Mock Test 01",
    description: "Mock test for RI posts",
    questions: 100,
    duration: 90,
    attempts: 980,
    difficulty: "Easy",
    category: "OPSC",
  },
  {
    id: "gk-mega-test", // Changed from "4"
    title: "Odisha GK Mega Test",
    description: "Comprehensive general knowledge test for Odisha state exams",
    questions: 120,
    duration: 120,
    attempts: 3200,
    difficulty: "Medium",
    category: "GK",
  },
];