mod db;
mod config;
mod routes;
mod handlers;
mod models;
mod repository;
mod utils;
mod services;

use actix_web::{web, App, HttpServer,};
use actix_cors::Cors;
use crate::config::Config;
use crate::routes::init_routes;
use sqlx::{Error, PgPool};
use std::fs;

use actix_web::dev::{ServiceRequest};
use actix_service::Service;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    start_server().await

}


pub async fn init_db_connection(database_url: &str) -> Result<PgPool, Box<dyn std::error::Error>> {
    let db_connection = db::db_connection::DatabaseConnection::new(database_url)
        .await
        .expect("Failed to create database connection pool");

    let pool = db_connection.pool.clone();

    execute_migration(&pool, "assets/general_utils_db.sql").await?;

    Ok(pool)
}

async fn execute_migration(pool: &PgPool, migration_file_path: &str) -> Result<(), Error> {
    let migration_sql = fs::read_to_string(migration_file_path)?;
    let statements: Vec<&str> = migration_sql.split(';').filter(|s| !s.trim().is_empty()).collect();

    for statement in statements {
        sqlx::query(statement)
            .execute(pool)
            .await?;
    }

    Ok(())
}



async fn start_server() -> std::io::Result<()> {
    let config = Config::load_from_env().expect("Failed to load configuration");

    let db_pool = init_db_connection(&config.database_url).await.expect("Failed to connect to database");

    let server = HttpServer::new(move || {
        App::new()
            .wrap(
                Cors::default()
                    .allowed_origin("http://localhost:5173")
                    // .allow_any_origin()
                    .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
                    .allowed_headers(vec!["Content-Type", "Authorization"])
                    .supports_credentials(),

            )
            .app_data(web::Data::new(db_pool.clone()))
            .wrap_fn(|req: ServiceRequest, srv| {
                // Log the request details
                println!("Request: {} {}", req.method(), req.uri());


                // Process the request and log the response
                let fut = srv.call(req);
                Box::pin(async move {
                    let response = fut.await?;
                    println!("Response: {}", response.status());
                    Ok(response)
                })
            })
            .configure(init_routes)
    })
        .bind(&config.server_address)?;

    println!("Server running at http://{}", config.server_address);

    server.run().await
}
