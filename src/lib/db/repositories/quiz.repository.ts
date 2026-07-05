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
      o.display_order,
      o.is_correct

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
    let question = questionMap.get(row.question_id);

    if (!question) {
      question = {
        id: row.question_id,
        question_code: row.question_code,
        question_text: row.question_text,
         explanation: {
         short: row.explanation ?? "",
         detailed: row.explanation ?? "",
         keyConcepts: [],
         tip: "",
  },
        marks: row.marks,
        correctOptionId: null,
        options: [],
      };

      questionMap.set(row.question_id, question);
      quiz.questions.push(question);
    }

    question.options.push({
      id: row.option_id,
      text: row.option_text,
      letter: String.fromCharCode(64 + row.display_order),
    });

    if (row.is_correct) {
      question.correctOptionId = row.option_id;
    }
  }

  return quiz;
}