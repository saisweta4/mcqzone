"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useQuestions() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [exams, setExams] = useState<any[]>([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.data);
  
        if (data.data.length > 0) {
          setActiveQuestionId(data.data[0].id);
        }
      })
      .catch(() => {
  toast.error("Failed to load questions.");
});
      fetch("/api/categories")
    .then((res) => res.json())
    .then((data) => {
      setCategories(data.data);
    });
  }, []);
  useEffect(() => {
    if (!selectedCategory) {
      setExams([]);
      setSelectedExam("");
      return;
    }
  
    fetch(`/api/categories/${selectedCategory}/exams`)
      .then((res) => res.json())
      .then((data) => {
        setExams(data.data);
      })
     .catch(() => {
  toast.error("Failed to load exams.");
});
  }, [selectedCategory]);
  
  return {
  questions,
  setQuestions,

  categories,

  exams,
  setExams,

  subjects,
  setSubjects,

  selectedCategory,
  setSelectedCategory,

  selectedExam,
  setSelectedExam,

  selectedSubject,
  setSelectedSubject,

  activeQuestionId,
  setActiveQuestionId,
};
}