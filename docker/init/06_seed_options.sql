-- =====================================================
-- Seed Data : Options
-- =====================================================

INSERT INTO options
(
    question_id,
    option_text,
    is_correct,
    display_order
)
VALUES

-- =====================================================
-- OPSC_ASO_GA_001
-- What is the capital city of Odisha?
-- =====================================================

(
    (SELECT id FROM questions WHERE question_code = 'OPSC_ASO_GA_001'),
    'Cuttack',
    FALSE,
    1
),

(
    (SELECT id FROM questions WHERE question_code = 'OPSC_ASO_GA_001'),
    'Bhubaneswar',
    TRUE,
    2
),

(
    (SELECT id FROM questions WHERE question_code = 'OPSC_ASO_GA_001'),
    'Puri',
    FALSE,
    3
),

(
    (SELECT id FROM questions WHERE question_code = 'OPSC_ASO_GA_001'),
    'Sambalpur',
    FALSE,
    4
),


-- =====================================================
-- OPSC_ASO_GA_002
-- Which river is known as the lifeline of Odisha?
-- =====================================================

(
    (SELECT id FROM questions WHERE question_code = 'OPSC_ASO_GA_002'),
    'Subarnarekha',
    FALSE,
    1
),

(
    (SELECT id FROM questions WHERE question_code = 'OPSC_ASO_GA_002'),
    'Rushikulya',
    FALSE,
    2
),

(
    (SELECT id FROM questions WHERE question_code = 'OPSC_ASO_GA_002'),
    'Mahanadi',
    TRUE,
    3
),

(
    (SELECT id FROM questions WHERE question_code = 'OPSC_ASO_GA_002'),
    'Brahmani',
    FALSE,
    4
),


-- =====================================================
-- OPSC_ASO_ENG_001
-- Choose the correct synonym of "Rapid".
-- =====================================================

(
    (SELECT id FROM questions WHERE question_code = 'OPSC_ASO_ENG_001'),
    'Slow',
    FALSE,
    1
),

(
    (SELECT id FROM questions WHERE question_code = 'OPSC_ASO_ENG_001'),
    'Fast',
    TRUE,
    2
),

(
    (SELECT id FROM questions WHERE question_code = 'OPSC_ASO_ENG_001'),
    'Weak',
    FALSE,
    3
),

(
    (SELECT id FROM questions WHERE question_code = 'OPSC_ASO_ENG_001'),
    'Tiny',
    FALSE,
    4
);