use actix_web::{web, HttpResponse, Responder};

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.route("/auth/login", web::post().to(login));
    cfg.route("/auth/logout", web::post().to(logout));
}

async fn login() -> impl Responder {
    HttpResponse::Ok().body("Login successful")
}

async fn logout() -> impl Responder {
    HttpResponse::Ok().body("Logout successful")
}
