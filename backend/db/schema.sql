DROP DATABASE IF EXISTS ai_art;

CREATE DATABASE ai_art;

\c ai_art;

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    pic TEXT NOT NULL
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY, 
    title text NOT NULL,
    ai text NOT NULL,
    url text NOT NULL,
    instructions text,
    prompt text NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE
);

