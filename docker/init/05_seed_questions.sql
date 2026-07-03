-- =====================================================
-- Seed Data : Questions
-- =====================================================

INSERT INTO questions
(
    question_code,
    subject_id,
    question_text,
    explanation,
    image_url,
    source,
    exam_year,
    language,
    difficulty,
    marks,
    negative_marks
)
VALUES

-- =====================================================
-- OPSC ASO - General Awareness
-- =====================================================

(
    'OPSC_ASO_GA_001',

    (
        SELECT id
        FROM subjects
        WHERE exam_id =
        (
            SELECT id
            FROM exams
            WHERE slug = 'opsc-aso'
        )
        AND name = 'General Awareness'
    ),

    'What is the capital city of Odisha?',

    'Bhubaneswar became the capital of Odisha in 1948 replacing Cuttack.',

    NULL,

    'PYQ',

    2023,

    'English',

    'Easy',

    1.00,

    0.25
),

(
    'OPSC_ASO_GA_002',

    (
        SELECT id
        FROM subjects
        WHERE exam_id =
        (
            SELECT id
            FROM exams
            WHERE slug = 'opsc-aso'
        )
        AND name = 'General Awareness'
    ),

    'Which river is known as the lifeline of Odisha?',

    'The Mahanadi River is the largest and most important river in Odisha.',

    NULL,

    'Practice',

    2024,

    'English',

    'Medium',

    1.00,

    0.25
),

-- =====================================================
-- OPSC ASO - English
-- =====================================================

(
    'OPSC_ASO_ENG_001',

    (
        SELECT id
        FROM subjects
        WHERE exam_id =
        (
            SELECT id
            FROM exams
            WHERE slug = 'opsc-aso'
        )
        AND name = 'English'
    ),

    'Choose the correct synonym of "Rapid".',

    'Rapid means fast or quick.',

    NULL,

    'Mock Test',

    2025,

    'English',

    'Easy',

    1.00,

    0.25
);