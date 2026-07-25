
INSERT INTO exams
(
    category_id,
    title,
    slug,
    description,
    duration,
    total_questions,
    difficulty
)

VALUES

(
(
SELECT id
FROM exam_categories
WHERE slug='opsc'
),

'OPSC ASO',

'opsc-aso',

'Assistant Section Officer Examination',

120,

100,

'Medium'
),

(
(
SELECT id
FROM exam_categories
WHERE slug='opsc'
),

'OPSC OCS',

'opsc-ocs',

'Odisha Civil Services Examination',

180,

200,

'Hard'
),

(
(
SELECT id
FROM exam_categories
WHERE slug='ossc'
),

'OSSC CGL',

'ossc-cgl',

'Combined Graduate Level Examination',

180,

150,

'Hard'
),

(
(
SELECT id
FROM exam_categories
WHERE slug='police'
),

'Police SI',

'police-si',

'Sub Inspector Recruitment',

120,

100,

'Medium'
),

(
(
SELECT id
FROM exam_categories
WHERE slug='banking'
),

'IBPS PO',

'ibps-po',

'Probationary Officer Examination',

60,

100,

'Medium'
),

(
(
SELECT id
FROM exam_categories
WHERE slug='railway'
),

'RRB NTPC',

'rrb-ntpc',

'Railway Recruitment Board NTPC',

90,

100,

'Easy'
);