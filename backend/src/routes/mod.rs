pub mod auth_routes;

use actix_web::web;

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    auth_routes::init_auth_routes(cfg);
}
