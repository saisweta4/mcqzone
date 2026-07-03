import pool from "../pool";

export async function getQuestionsBySubject(subjectId: number) {
  const result = await pool.query(
    `
    SELECT
        id,
        question_code,
        question_text,
        explanation,
        image_url,
        difficulty,
        marks,
        negative_marks
    FROM questions
    WHERE subject_id = $1
      AND is_active = TRUE
    ORDER BY id;
    `,
    [subjectId]
  );

  return result.rows;
}