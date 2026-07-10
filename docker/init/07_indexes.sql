-- =====================================================
-- Indexes for Faster Queries
-- =====================================================

CREATE INDEX idx_exam_categories_slug
ON exam_categories(slug);

CREATE INDEX idx_exams_slug
ON exams(slug);

CREATE INDEX idx_exams_category_id
ON exams(category_id);

CREATE INDEX idx_subjects_exam_id
ON subjects(exam_id);

CREATE INDEX idx_questions_subject_id
ON questions(subject_id);

CREATE INDEX idx_questions_exam_year
ON questions(exam_year);

CREATE INDEX idx_questions_source
ON questions(source);

CREATE INDEX idx_options_question_id
ON options(question_id);