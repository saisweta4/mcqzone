import pool from "../pool";

export async function getQuestionsBySubject(subjectId: number) {
  const result = await pool.query(
    `
    SELECT 
      q.id,
      q.question_text,
      q.explanation,
      q.difficulty,
      q.marks,
      q.negative_marks,

      json_agg(
        json_build_object(
          'id', o.id,
          'option_text', o.option_text,
          'is_correct', o.is_correct
        ) ORDER BY o.display_order
      ) AS options,

      MAX(CASE WHEN o.is_correct = true THEN o.id END) AS correct_option_id

    FROM questions q
    JOIN options o ON q.id = o.question_id
    WHERE q.subject_id = $1
      AND q.is_active = TRUE
    GROUP BY q.id
    ORDER BY q.id;
    `,
    [subjectId]
  );

 return result.rows.map(q => ({
  id: q.id,
  questionText: q.question_text,
  explanation: q.explanation,
  difficulty: q.difficulty,
  marks: q.marks,
  negativeMarks: q.negative_marks,
  options: q.options,
  correctOptionId: q.correct_option_id
}));
}

export async function getQuestionById(id: number) {
  const result = await pool.query(
    `
    SELECT
      q.id,
      q.question_text,
      q.explanation,
      q.difficulty,
      q.marks,
      q.negative_marks,

      json_agg(
        json_build_object(
          'id', o.id,
          'text', o.option_text,
          'letter', chr(64 + o.display_order)
        )
        ORDER BY o.display_order
      ) AS options,

      MAX(
        CASE
          WHEN o.is_correct THEN o.id
        END
      ) AS correct_option_id

    FROM questions q

    JOIN options o
      ON o.question_id=q.id

    WHERE q.id=$1

    GROUP BY q.id;
    `,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  return {
    id: row.id,
    questionText: row.question_text,
    explanation: {
      short: row.explanation ?? "",
      detailed: row.explanation ?? "",
      keyConcepts: [],
      tip: "",
    },
    difficulty: row.difficulty,
    marks: row.marks,
    negativeMarks: row.negative_marks,
    options: row.options,
    correctOptionId: row.correct_option_id,
  };
}

export async function getAllQuestions() {
  const result = await pool.query(`
    SELECT
      q.id,
      q.question_text,
      q.difficulty,
      q.created_at,
      s.name AS subject_name,
      e.title AS exam_name

    FROM questions q

    JOIN subjects s
      ON q.subject_id = s.id

    JOIN exams e
      ON s.exam_id = e.id

    ORDER BY q.id DESC;
  `);

  return result.rows.map((q) => ({
    id: q.id,
    questionText: q.question_text,
    difficulty: q.difficulty,
    subject: q.subject_name,
    exam: q.exam_name,
    createdAt: q.created_at,
  }));
}
export async function updateQuestion(
  id: number,
  data: {
    questionText: string;
    explanation: string;
    difficulty: string;
    marks: number;
    negativeMarks: number;
    correctOptionId: number;
    options: {
      id: number;
      text: string;
    }[];
  }
) {
  await pool.query("BEGIN");

  try {
    await pool.query(
      `
      UPDATE questions
      SET
        question_text=$1,
        explanation=$2,
        difficulty=$3,
        marks=$4,
        negative_marks=$5
      WHERE id=$6
      `,
      [
        data.questionText,
        data.explanation,
        data.difficulty,
        data.marks,
        data.negativeMarks,
        id,
      ]
    );

    for (const option of data.options) {
      await pool.query(
        `
        UPDATE options
        SET
          option_text=$1,
          is_correct=$2
        WHERE id=$3
        `,
        [
          option.text,
          option.id === data.correctOptionId,
          option.id,
        ]
      );
    }

    await pool.query("COMMIT");
  } catch (err) {
    await pool.query("ROLLBACK");
    throw err;
  }
}
export async function createQuestion(data: {
  question_code: string;
  subject_id: number;
  question_text: string;
  explanation: string;
  difficulty: string;
  marks: number;
  negative_marks: number;
  options: {
    text: string;
    is_correct: boolean;
  }[];
}) {
  await pool.query("BEGIN");

  try {
    const question = await pool.query(
      `
      INSERT INTO questions
      (
        question_code,
        subject_id,
        question_text,
        explanation,
        difficulty,
        marks,
        negative_marks
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING id
      `,
      [
        data.question_code,
        data.subject_id,
        data.question_text,
        data.explanation,
        data.difficulty,
        data.marks,
        data.negative_marks,
      ]
    );

    const questionId = question.rows[0].id;

    let order = 1;

    for (const option of data.options) {
      await pool.query(
        `
        INSERT INTO options
        (
          question_id,
          option_text,
          is_correct,
          display_order
        )
        VALUES ($1,$2,$3,$4)
        `,
        [questionId, option.text, option.is_correct, order]
      );

      order++;
    }

    await pool.query("COMMIT");

    return questionId;
  } catch (err) {
    await pool.query("ROLLBACK");
    throw err;
  }
}
export async function deleteQuestion(id: number) {
  await pool.query(
    `
    DELETE FROM questions
    WHERE id=$1
    `,
    [id]
  );
}