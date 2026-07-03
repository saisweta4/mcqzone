import pool from "../pool";

export async function getAllExams() {
  const result = await pool.query(`
    SELECT
      id,
      category_id,
      title,
      slug,
      description,
      duration,
      total_questions,
      difficulty
    FROM exams
    ORDER BY title;
  `);

  return result.rows;
}

export async function getExamBySlug(slug: string) {
  const result = await pool.query(
    `
    SELECT *
    FROM exams
    WHERE slug = $1;
    `,
    [slug]
  );

  return result.rows[0];
}