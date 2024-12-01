
CREATE TABLE IF NOT EXISTS general_utils_users (
                   id SERIAL PRIMARY KEY,
                   username VARCHAR(50) NOT NULL,
                   password VARCHAR(50) NOT NULL
);

