import pool from "../pool";

export async function getSubjectsByExamSlug(slug: string) {
  const result = await pool.query(
    `
    SELECT
        s.id,
        s.name,
        s.description,
        s.display_order

    FROM subjects s

    INNER JOIN exams e
        ON s.exam_id = e.id

    WHERE e.slug = $1

    ORDER BY s.display_order;
    `,
    [slug]
  );

  return result.rows;
}