CREATE TABLE IF NOT EXISTS users (
                                     id UUID PRIMARY KEY,
                                     username VARCHAR(255) UNIQUE NOT NULL,
                                     password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
                                        session_id UUID PRIMARY KEY,
                                        user_id UUID REFERENCES users(id)
);