-- we have all the necessary tables for the exam system. 
-- Each table has appropriate fields and constraints to ensure data integrity and relationships between them.

CREATE TABLE exam_categories (

    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    slug VARCHAR(100) NOT NULL UNIQUE,

    icon VARCHAR(255),

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


CREATE TABLE exams (

    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    category_id INTEGER NOT NULL,

    title VARCHAR(255) NOT NULL,

    slug VARCHAR(255) NOT NULL UNIQUE,

    description TEXT,

    duration INTEGER NOT NULL,

    total_questions INTEGER NOT NULL,

    difficulty VARCHAR(20)
        CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_exam_category
        FOREIGN KEY (category_id)
        REFERENCES exam_categories(id)
        ON DELETE CASCADE

);


CREATE TABLE subjects (

    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    exam_id INTEGER NOT NULL,

    name VARCHAR(150) NOT NULL,

    description TEXT,

    display_order INTEGER DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_subject_exam
        FOREIGN KEY (exam_id)
        REFERENCES exams(id)
        ON DELETE CASCADE

);


CREATE TABLE questions (

    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    question_code VARCHAR(100) UNIQUE NOT NULL,

    subject_id INTEGER NOT NULL,

    question_text TEXT NOT NULL,

    explanation TEXT,

    image_url VARCHAR(255),

    source VARCHAR(100),

    exam_year INTEGER,

    language VARCHAR(20)
        DEFAULT 'English'
        CHECK (language IN ('English', 'Odia')),

    difficulty VARCHAR(20)
        CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),

    marks DECIMAL(4,2)
        DEFAULT 1.00
        CHECK (marks >= 0),

    negative_marks DECIMAL(4,2)
        DEFAULT 0.25
        CHECK (negative_marks >= 0),

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_questions_subject
        FOREIGN KEY (subject_id)
        REFERENCES subjects(id)
        ON DELETE CASCADE

);

CREATE TABLE options (

    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    question_id INTEGER NOT NULL,

    option_text TEXT NOT NULL,

    is_correct BOOLEAN DEFAULT FALSE,

    display_order INTEGER NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_options_question
        FOREIGN KEY (question_id)
        REFERENCES questions(id)
        ON DELETE CASCADE

);





CREATE TABLE attempt_answers (

    id SERIAL PRIMARY KEY,

    attempt_id INT NOT NULL,

    question_id INT NOT NULL,

    selected_option_id INT,

    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_attempt
        FOREIGN KEY (attempt_id)
        REFERENCES attempts(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_question
        FOREIGN KEY (question_id)
        REFERENCES questions(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_option
        FOREIGN KEY (selected_option_id)
        REFERENCES options(id)
        ON DELETE SET NULL
);

CREATE TABLE users (

    clerk_user_id TEXT PRIMARY KEY,

    email VARCHAR(255) UNIQUE NOT NULL,

    first_name VARCHAR(100),

    last_name VARCHAR(100),

    image_url TEXT,

    role VARCHAR(20)
        DEFAULT 'STUDENT'
        CHECK (role IN ('ADMIN', 'STUDENT')),

    is_active BOOLEAN DEFAULT TRUE,

    last_login TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE attempts (

    id SERIAL PRIMARY KEY,

    user_id TEXT NOT NULL,

    exam_id INT NOT NULL,

    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    submitted_at TIMESTAMP,

    status VARCHAR(20) DEFAULT 'IN_PROGRESS',

    score NUMERIC(5,2),

    total_marks NUMERIC(5,2),

    CONSTRAINT fk_attempt_user
        FOREIGN KEY (user_id)
        REFERENCES users(clerk_user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_attempt_exam
        FOREIGN KEY (exam_id)
        REFERENCES exams(id)
        ON DELETE CASCADE

);

CREATE TABLE login_history (

    id SERIAL PRIMARY KEY,

    user_id TEXT NOT NULL,

    login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    ip_address VARCHAR(100),

    user_agent TEXT,

    CONSTRAINT fk_login_user
        FOREIGN KEY (user_id)
        REFERENCES users(clerk_user_id)
        ON DELETE CASCADE

);