CREATE TABLE IF NOT EXISTS teams (
    id BIGINT PRIMARY KEY,
    conference VARCHAR(255),
    division VARCHAR(255),
    city VARCHAR(255),
    name VARCHAR(255),
    full_name VARCHAR(255),
    abbreviation VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    author_name VARCHAR(255),
    author_id BIGINT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS post_tags (
    post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
    tag TEXT
);

CREATE TABLE IF NOT EXISTS comments (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL,
    author_id BIGINT NOT NULL,
    author_name VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP,
    CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    external_id VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(100)
);
