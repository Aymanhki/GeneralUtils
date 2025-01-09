use actix_web::{post, get, web, HttpResponse, Responder, HttpRequest};
use crate::services::auth_service::AuthService;
use crate::models::user_model::NewUser;
use sqlx::PgPool;


#[post("/sign-up")]
async fn sign_up(pool: web::Data<PgPool>, new_user: web::Json<NewUser>) -> impl Responder {

    match AuthService::sign_up(&pool, new_user.into_inner()).await {
        Ok(session) => {
            HttpResponse::Ok().json(session)
        }
        Err(err) => HttpResponse::BadRequest().body(err),
    }
}

#[post("/sign-in")]
async fn sign_in(pool: web::Data<PgPool>, credentials: web::Json<NewUser>) -> impl Responder {

    match AuthService::sign_in(&pool, &credentials.username, &credentials.password).await {
        Ok(session) => {
            HttpResponse::Ok().json(session)
        }
        Err(err) => HttpResponse::Unauthorized().body(err),
    }

}

#[get("/check-session")]
async fn check_session(
    pool: web::Data<PgPool>,
    req: HttpRequest,
) -> impl Responder {
    if let Some(auth_header) = req.headers().get("Authorization") {
        if let Ok(auth_str) = auth_header.to_str() {
            if let Some(session_id) = auth_str.strip_prefix("Bearer ") {
                return match AuthService::check_session(&pool, session_id).await {
                    Ok(session) => {
                        HttpResponse::Ok().json(session)
                    }
                    Err(_) => {
                        HttpResponse::Unauthorized().body("Invalid session")
                    }
                }
            }
        }
    }

    HttpResponse::Unauthorized().body("Authorization header missing or invalid")
}

pub fn init_auth_routes(cfg: &mut web::ServiceConfig) {

    cfg.service(
        web::scope("/api/auth")
            .service(sign_up)
            .service(sign_in)
            .service(check_session)
    );
}
