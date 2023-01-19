DROP DATABASE IF EXISTS ai_art;

CREATE DATABASE ai_art;

\c ai_art;

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
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

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT NOW(),
  image_id INT REFERENCES images(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE
);

