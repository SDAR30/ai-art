DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS images CASCADE;

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

