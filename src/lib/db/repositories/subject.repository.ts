import pool from "../pool";

export async function getSubjectsByExamSlug(slug: string) {
  const result = await pool.query(
    `
    SELECT
    s.id,
    s.name,
    s.description,
    s.display_order,
    COUNT(q.id) AS question_count

    FROM subjects s

    INNER JOIN exams e
        ON s.exam_id = e.id

    LEFT JOIN questions q
    ON q.subject_id = s.id

    WHERE e.slug = $1

    GROUP BY
    s.id,
    s.name,
    s.description,
    s.display_order

    ORDER BY s.display_order;
    `,
    [slug]
  );

  return result.rows;
}
export async function createSubject(data: {
  examId: number;
  name: string;
  description: string;
  displayOrder: number;
}) {
  const result = await pool.query(
    `
    INSERT INTO subjects
    (
      exam_id,
      name,
      description,
      display_order
    )
    VALUES ($1,$2,$3,$4)
    RETURNING *;
    `,
    [
      data.examId,
      data.name,
      data.description,
      data.displayOrder,
    ]
  );

  return result.rows[0];
}

export async function updateSubject(data: {
  id: number;
  examId: number;
  name: string;
  description: string;
  displayOrder: number;
}) {
  const result = await pool.query(
    `
    UPDATE subjects
    SET
      exam_id = $2,
      name = $3,
      description = $4,
      display_order = $5
    WHERE id = $1
    RETURNING *;
    `,
    [
      data.id,
      data.examId,
      data.name,
      data.description,
      data.displayOrder,
    ]
  );

  return result.rows[0];
}

export async function deleteSubject(id: number) {
  await pool.query(
    `
    DELETE FROM subjects
    WHERE id = $1;
    `,
    [id]
  );
}