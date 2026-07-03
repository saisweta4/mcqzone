import pool from "../pool";

export async function getQuizBySubject(subjectId: number) {
  const result = await pool.query(
    `
    SELECT
      s.id AS subject_id,
      s.name AS subject_name,
      s.description AS subject_description,

      q.id AS question_id,
      q.question_code,
      q.question_text,
      q.explanation,
      q.marks,
      q.negative_marks,

      o.id AS option_id,
      o.option_text,
      o.display_order

    FROM subjects s

    JOIN questions q
      ON s.id = q.subject_id

    JOIN options o
      ON q.id = o.question_id

    WHERE s.id = $1

    ORDER BY q.id, o.display_order;
    `,
    [subjectId]
  );

  const rows = result.rows;

  if (rows.length === 0) {
    return null;
  }

  const quiz = {
    subject: {
      id: rows[0].subject_id,
      name: rows[0].subject_name,
      description: rows[0].subject_description,
    },
    questions: [] as any[],
  };

  const questionMap = new Map<number, any>();

  for (const row of rows) {
    if (!questionMap.has(row.question_id)) {
      const question = {
        id: row.question_id,
        question_code: row.question_code,
        question_text: row.question_text,
        explanation: row.explanation,
        marks: row.marks,
        negative_marks: row.negative_marks,
        options: [],
      };

      questionMap.set(row.question_id, question);
      quiz.questions.push(question);
    }

    questionMap.get(row.question_id).options.push({
      id: row.option_id,
      option_text: row.option_text,
      display_order: row.display_order,
    });
  }

  return quiz;
}