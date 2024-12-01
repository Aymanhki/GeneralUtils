use sqlx::{PgPool, postgres::PgPoolOptions};
use std::error::Error;

pub async fn init_db_connection(database_url: &str) -> Result<PgPool, Box<dyn Error>> {
    let pool = PgPoolOptions::new()
        .max_connections(10)
        .connect(database_url)
        .await
        .map_err(|e| {
            eprintln!("Detailed SSL connection error: {}", e);
            Box::new(e)
        })?;

    Ok(pool)
}