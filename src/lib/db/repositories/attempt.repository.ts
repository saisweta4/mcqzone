import pool from "../pool";

export async function createAttempt(examId: number) {
  const result = await pool.query(
    `
    INSERT INTO attempts (
      exam_id
    )
    VALUES (
      $1
    )
    RETURNING
      id,
      exam_id,
      status,
      started_at;
    `,
    [examId]
  );

  return result.rows[0];
}


export async function saveAnswer(
  attemptId: number,
  questionId: number,
  selectedOptionId: number
) {
  const result = await pool.query(
    `
    INSERT INTO attempt_answers
    (
        attempt_id,
        question_id,
        selected_option_id
    )

    VALUES
    (
        $1,
        $2,
        $3
    )

    ON CONFLICT
    (
        attempt_id,
        question_id
    )

    DO UPDATE

    SET

    selected_option_id = EXCLUDED.selected_option_id,

    answered_at = CURRENT_TIMESTAMP

    RETURNING *;
    `,
    [attemptId, questionId, selectedOptionId]
  );

  return result.rows[0];
}

export async function submitAttempt(attemptId: number) {
  const result = await pool.query(
    `
    SELECT
        q.id AS question_id,
        q.marks,
        q.negative_marks,

        o.id AS correct_option_id,

        aa.selected_option_id

    FROM attempts a

    JOIN exams e
        ON a.exam_id = e.id

    JOIN subjects s
        ON e.id = s.exam_id

    JOIN questions q
        ON s.id = q.subject_id

    JOIN options o
        ON q.id = o.question_id
        AND o.is_correct = TRUE

    LEFT JOIN attempt_answers aa
        ON aa.question_id = q.id
        AND aa.attempt_id = a.id

    WHERE a.id = $1
    `,
    [attemptId]
  );

  let correct = 0;
  let wrong = 0;
  let skipped = 0;
  let score = 0;

  for (const row of result.rows) {
    if (row.selected_option_id == null) {
      skipped++;
      continue;
    }

    if (row.selected_option_id === row.correct_option_id) {
      correct++;
      score += Number(row.marks);
    } else {
      wrong++;
      score -= Number(row.negative_marks);
    }
  }

  await pool.query(
    `
    UPDATE attempts
    SET
        status='COMPLETED',
        submitted_at=CURRENT_TIMESTAMP,
        score=$2
    WHERE id=$1
    `,
    [attemptId, score]
  );

  return {
    correct,
    wrong,
    skipped,
    score,
  };
}