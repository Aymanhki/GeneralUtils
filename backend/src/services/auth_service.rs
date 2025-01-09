use crate::repository::user_repository::UserRepository;
use crate::models::user_model::{NewUser, Session};
use sqlx::PgPool;
use bcrypt::verify;

pub struct AuthService;

impl AuthService {
    pub async fn sign_up(pool: &PgPool, new_user: NewUser) -> Result<Session, String> {
        let existing_user = UserRepository::find_user_by_username(pool, &new_user.username).await.map_err(|e| e.to_string())?;
        if let Some(_) = existing_user {
            return Err("Username already exists".to_string());
        }

        let user = UserRepository::create_user(pool, &new_user.username, &new_user.password).await.map_err(|e| e.to_string())?;
        let session = UserRepository::create_session(pool, user.id).await.map_err(|e| e.to_string())?;

        Ok(session)
    }


    pub async fn sign_in(pool: &PgPool, username: &str, password: &str) -> Result<Session, String> {
        let user = UserRepository::find_user_by_username(pool, username).await.map_err(|e| e.to_string())?;

        if let Some(user) = user {
            if verify(password, &user.password).unwrap_or(false) {
                let session = UserRepository::create_session(pool, user.id).await.map_err(|e| e.to_string())?;
                return Ok(session);
            }
        }

        Err("Invalid username or password".to_string())
    }

    pub async fn check_session(pool: &PgPool, session_id: &str) -> Result<Session, String> {
        let session = UserRepository::find_session_by_id(pool, session_id).await.map_err(|e| e.to_string())?;
        if let Some(session) = session {
            return Ok(session);
        }

        Err("Invalid session".to_string())
    }
}
