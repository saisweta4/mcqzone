import pool from "../pool";

export async function getOptionsByQuestion(questionId: number) {
  const result = await pool.query(
    `
    SELECT
        id,
        option_text,
        display_order
    FROM options
    WHERE question_id = $1
    ORDER BY display_order;
    `,
    [questionId]
  );

  return result.rows;
}