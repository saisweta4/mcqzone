import pool from "../pool";

export async function getAllExams() {
  const result = await pool.query(`
  SELECT
  e.id,
  e.category_id,
  c.name AS category_name,
  c.slug AS category_slug,
  e.title,
  e.slug,
  e.description,
  e.duration,
  e.total_questions,
  e.difficulty
FROM exams e
JOIN exam_categories c
ON e.category_id = c.id
ORDER BY e.title;
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

export async function getExamsByCategorySlug(categorySlug: string) {
  const result = await pool.query(
    `
  SELECT
  e.id,
  e.category_id,
  c.slug AS category_slug,
      e.title,
      e.slug,
      e.description,
      e.duration,
      e.total_questions,
      e.difficulty
    FROM exams e
    INNER JOIN exam_categories c
      ON e.category_id = c.id
    WHERE c.slug = $1
    ORDER BY e.title;
    `,
    [categorySlug]
  );

  return result.rows;
}

export async function createExam(data: {
  categoryId: number;
  title: string;
  slug: string;
  description: string;
  duration: number;
  totalQuestions: number;
  difficulty: string;
}) {
  const result = await pool.query(
    `
    INSERT INTO exams
    (
      category_id,
      title,
      slug,
      description,
      duration,
      total_questions,
      difficulty
    )
    VALUES
    ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *;
    `,
    [
      data.categoryId,
      data.title,
      data.slug,
      data.description,
      data.duration,
      data.totalQuestions,
      data.difficulty,
    ]
  );

  return result.rows[0];
}
export async function updateExam(data: {
  id: number;
  categoryId: number;
  title: string;
  slug: string;
  description: string;
  duration: number;
  totalQuestions: number;
  difficulty: string;
}) {
  const result = await pool.query(
    `
    UPDATE exams
    SET
      category_id=$2,
      title=$3,
      slug=$4,
      description=$5,
      duration=$6,
      total_questions=$7,
      difficulty=$8
    WHERE id=$1
    RETURNING *;
    `,
    [
      data.id,
      data.categoryId,
      data.title,
      data.slug,
      data.description,
      data.duration,
      data.totalQuestions,
      data.difficulty,
    ]
  );

  return result.rows[0];
}
export async function deleteExam(id: number) {
  await pool.query(
    `
    DELETE FROM exams
    WHERE id = $1;
    `,
    [id]
  );
}

export async function getExamsByCategory(categoryId: number) {
  const result = await pool.query(
    `
    SELECT
      id,
      title,
      slug
    FROM exams
    WHERE category_id = $1
    ORDER BY title;
    `,
    [categoryId]
  );

  return result.rows;
}