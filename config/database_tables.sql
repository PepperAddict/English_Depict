CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    email text NOT NULL UNIQUE,
    auto_tasks boolean,
    username text NOT NULL,
    password text NOT NULL,
    created_at text,
    amazon text,
    apiKey text,
    token text,
    verified boolean,
    verify_token text,
    share json
);

CREATE TABLE IF NOT EXISTS teachers (
    teacher_id serial PRIMARY KEY,
    email text NOT NULL UNIQUE,
    username text NOT NULL,
    password text NOT NULL,
    auto_task boolean,
    created_at text,
    amazon text,
    apiKey text,
    token text,
    verified boolean,
    verify_token text,
    share json
);

CREATE TABLE IF NOT EXISTS vocabularies (
    vocab_id serial PRIMARY KEY,
    student_id integer NOT NULL,
    teacher_id integer NOT NULL,
    vocabulary_word text NOT NULL,
    vocabulary_definition text,
    created_at text NOT NULL
);

CREATE TABLE IF NOT EXISTS students (
    student_id serial PRIMARY KEY,
    username text NOT NULL UNIQUE,
    teacher_id integer REFERENCES teachers NULL,
    parent_id integer REFERENCES users NOT NULL,
    share json NULL,
    grade text NOT NULL,
    name text,
    auto_task json,
    identifier text NOT NULL,
    question text NOT NULL,
    password text NOT NULL,
    theme text,
    message text,
    created_at text NOT NULL,
    student_key text NOT NULL,
    verified boolean,
    second_password text,
    avatar text
);

CREATE TABLE IF NOT EXISTS blogs (
    blog_id serial PRIMARY KEY,
    student_id integer REFERENCES students NOT NULL,
    subject text NOT NULL,
    content text NOT NULL,
    created_at text NOT NULL,
    updated_at text
);

CREATE TABLE IF NOT EXISTS tasks (
    task_id serial PRIMARY KEY,
    task_date text NOT NULL,
    task_code text NOT NULL,
    student_id integer REFERENCES students NOT NULL,
    teacher_id integer REFERENCES teachers,
    parent_id integer REFERENCES users,
    entry json NOT NULL,
    created_at text NOT NULL,
    updated text,
    started_at text,
    completed_at text,
    accepted boolean,
    message text,
    viewed boolean,
    submission json
);

CREATE TABLE IF NOT EXISTS comments (
    comment_id serial PRIMARY KEY,
    blog_id integer REFERENCES blogs NOT NULL,
    teacher_id integer REFERENCES users,
    student_id integer REFERENCES students,
    content text NOT NULL,
    created_at text NOT NULL,
    updated_at text
)