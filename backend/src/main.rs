mod db;
mod config;
mod routes;
mod handlers;
mod models;
mod repository;

use actix_web::{App, HttpServer, web};
use actix_cors::Cors;
use crate::config::Config;
use crate::db::db_connection::init_db_connection;
use crate::routes::init_routes;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    start_server().await

}

async fn start_server() -> std::io::Result<()> {
    let config = Config::load_from_env().expect("Failed to load configuration");
    let db_pool = init_db_connection(&config.database_url).await.expect("Failed to create database connection pool");

    let server = HttpServer::new(move || {
        App::new()
            .wrap(
                Cors::default()
                    .allowed_origin("http://localhost:5173")
                    .allow_any_origin()
                    .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
                    .allowed_headers(vec!["Content-Type", "Authorization"])
                    .supports_credentials()
            )
            .app_data(web::Data::new(db_pool.clone()))
            .configure(init_routes)
    })
        .bind(&config.server_address)?;
        println!("Server running at http://{}", config.server_address);

    server.run().await
}
