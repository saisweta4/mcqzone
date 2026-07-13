import pool from "../pool";

export async function getDashboardStats() {
  const [
    users,
    exams,
    subjects,
    questions,
    categories,
    attempts,
  ] = await Promise.all([
    pool.query("SELECT COUNT(*) FROM users"),
    pool.query("SELECT COUNT(*) FROM exams"),
    pool.query("SELECT COUNT(*) FROM subjects"),
    pool.query("SELECT COUNT(*) FROM questions"),
    pool.query("SELECT COUNT(*) FROM exam_categories"),
    pool.query("SELECT COUNT(*) FROM attempts"),
  ]);

  return {
    users: Number(users.rows[0].count),
    exams: Number(exams.rows[0].count),
    subjects: Number(subjects.rows[0].count),
    questions: Number(questions.rows[0].count),
    categories: Number(categories.rows[0].count),
    attempts: Number(attempts.rows[0].count),
  };
}