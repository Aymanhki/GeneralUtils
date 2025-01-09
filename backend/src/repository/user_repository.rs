use crate::models::user_model::{User, Session};
use sqlx::PgPool;
use uuid::Uuid;
use bcrypt::{hash};
use sqlx::postgres::PgRow;
use sqlx::Row;

pub struct UserRepository;

impl UserRepository {
    pub async fn create_user(pool: &PgPool, username: &str, password: &str) -> Result<User, sqlx::Error> {
        let hashed_password = hash(password, 4).expect("Failed to hash password");

        let user = sqlx::query("INSERT INTO users (id, username, password) VALUES ($1, $2, $3) RETURNING id, username, password")
            .bind(Uuid::new_v4())
            .bind(username)
            .bind(hashed_password)
            .map(|row: PgRow| User {
                id: row.get("id"),
                username: row.get("username"),
                password: row.get("password")
            })
            .fetch_one(pool)
            .await?;

        Ok(user)
    }

    pub async fn find_user_by_username(pool: &PgPool, username: &str) -> Result<Option<User>, sqlx::Error> {
        let user = sqlx::query("SELECT id, username, password FROM users WHERE username = $1")
            .bind(username)
            .map(|row: PgRow| User {
                id: row.get("id"),
                username: row.get("username"),
                password: row.get("password")
            })
            .fetch_optional(pool)
            .await?;

        Ok(user)
    }

    pub async fn create_session(pool: &PgPool, user_id: Uuid) -> Result<Session, sqlx::Error> {
        let session = sqlx::query("INSERT INTO sessions (session_id, user_id) VALUES ($1, $2) RETURNING session_id, user_id")
            .bind(Uuid::new_v4())
            .bind(user_id)
            .map(|row: PgRow| Session {
                session_id: row.get("session_id"),
                user_id: row.get("user_id")
            })
            .fetch_one(pool)
            .await?;

        Ok(session)
    }

    pub async fn find_session_by_id(pool: &PgPool, session_id: &str) -> Result<Option<Session>, sqlx::Error> {
        let session_uuid = Uuid::parse_str(session_id)
            .map_err(|e| {
                eprintln!("Failed to parse session_id as UUID: {:?}", e);
                sqlx::Error::Decode(e.to_string().into())
            })?;

        let session = sqlx::query("SELECT session_id, user_id FROM sessions WHERE session_id = $1")
            .bind(session_uuid)
            .map(|row: PgRow| Session {
                session_id: row.get("session_id"),
                user_id: row.get("user_id")
            })
            .fetch_optional(pool)
            .await?;

        Ok(session)
    }
}
