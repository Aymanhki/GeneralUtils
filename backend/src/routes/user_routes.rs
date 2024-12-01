use actix_web::{web, HttpResponse, Responder};

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.route("/users", web::get().to(get_users));
}

async fn get_users() -> impl Responder {
    HttpResponse::Ok().body("List of users")
}

// async fn get_user_by_id(web::Path(id): web::Path<i32>) -> impl Responder {
//     HttpResponse::Ok().body(format!("User ID: {}", id))
// }
