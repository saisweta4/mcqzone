-- =====================================================
-- Seed Data : Subjects
-- =====================================================

INSERT INTO subjects (
    exam_id,
    name,
    description,
    display_order
)
VALUES

-- =====================================================
-- OPSC ASO
-- =====================================================

(
    (SELECT id FROM exams WHERE slug = 'opsc-aso'),
    'General Awareness',
    'Static GK and Current Affairs',
    1
),

(
    (SELECT id FROM exams WHERE slug = 'opsc-aso'),
    'Reasoning & Mental Ability',
    'Logical and Analytical Reasoning',
    2
),

(
    (SELECT id FROM exams WHERE slug = 'opsc-aso'),
    'Mathematics',
    'Quantitative Aptitude',
    3
),

(
    (SELECT id FROM exams WHERE slug = 'opsc-aso'),
    'English',
    'Grammar, Vocabulary and Comprehension',
    4
),

-- =====================================================
-- OPSC OCS
-- =====================================================

(
    (SELECT id FROM exams WHERE slug = 'opsc-ocs'),
    'General Studies Paper I',
    'History, Geography, Polity, Economy',
    1
),

(
    (SELECT id FROM exams WHERE slug = 'opsc-ocs'),
    'General Studies Paper II',
    'CSAT, Reasoning and Mathematics',
    2
),

-- =====================================================
-- OSSC CGL
-- =====================================================

(
    (SELECT id FROM exams WHERE slug = 'ossc-cgl'),
    'General Studies',
    'History, Geography and Current Affairs',
    1
),

(
    (SELECT id FROM exams WHERE slug = 'ossc-cgl'),
    'Logical Reasoning',
    'Reasoning and Mental Ability',
    2
),

(
    (SELECT id FROM exams WHERE slug = 'ossc-cgl'),
    'Data Interpretation',
    'Tables, Charts and Graphs',
    3
),

(
    (SELECT id FROM exams WHERE slug = 'ossc-cgl'),
    'Computer Awareness',
    'Basic Computer Knowledge',
    4
),

-- =====================================================
-- Police SI
-- =====================================================

(
    (SELECT id FROM exams WHERE slug = 'police-si'),
    'General English',
    'Grammar and Vocabulary',
    1
),

(
    (SELECT id FROM exams WHERE slug = 'police-si'),
    'Odia Language',
    'Grammar and Comprehension',
    2
),

(
    (SELECT id FROM exams WHERE slug = 'police-si'),
    'General Studies',
    'History, Geography, Polity',
    3
),

-- =====================================================
-- IBPS PO
-- =====================================================

(
    (SELECT id FROM exams WHERE slug = 'ibps-po'),
    'English Language',
    'Reading Comprehension and Grammar',
    1
),

(
    (SELECT id FROM exams WHERE slug = 'ibps-po'),
    'Quantitative Aptitude',
    'Arithmetic and Data Interpretation',
    2
),

(
    (SELECT id FROM exams WHERE slug = 'ibps-po'),
    'Reasoning Ability',
    'Puzzles and Logical Reasoning',
    3
),

(
    (SELECT id FROM exams WHERE slug = 'ibps-po'),
    'General Awareness',
    'Banking Awareness and Current Affairs',
    4
),

-- =====================================================
-- RRB NTPC
-- =====================================================

(
    (SELECT id FROM exams WHERE slug = 'rrb-ntpc'),
    'Mathematics',
    'Arithmetic and Algebra',
    1
),

(
    (SELECT id FROM exams WHERE slug = 'rrb-ntpc'),
    'General Intelligence & Reasoning',
    'Logical Reasoning',
    2
),

(
    (SELECT id FROM exams WHERE slug = 'rrb-ntpc'),
    'General Awareness',
    'Static GK and Current Affairs',
    3
);