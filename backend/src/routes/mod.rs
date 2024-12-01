mod auth_routes;
mod user_routes;

use actix_web::web;

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    auth_routes::configure(cfg);
    user_routes::configure(cfg);
}
