use sqlx::{
    postgres::{PgPool, PgPoolOptions},
    Error as SqlxError,
    ConnectOptions,
};
use std::str::FromStr;
use std::time::Duration;

pub struct DatabaseConnection {
    pub pool: PgPool,
}

impl DatabaseConnection {
    pub async fn new(database_url: &str) -> Result<Self, Box<dyn std::error::Error>> {
        match Self::connect_to_remote_db(database_url).await {
            Ok(pool) => {
                println!("Successfully connected to remote database");
                return Ok(DatabaseConnection { pool });
            },
            Err(remote_err) => {
                println!("Remote database connection failed: {}", remote_err);
            }
        }

        match Self::connect_to_local_db().await {
            Ok(pool) => {
                println!("Connected to local PostgreSQL database");
                Ok(DatabaseConnection { pool })
            },
            Err(local_err) => {
                println!("Local database connection failed: {}", local_err);
                Err(Box::new(std::io::Error::new(
                    std::io::ErrorKind::NotFound,
                    "Could not connect to remote or local database"
                )))
            }
        }
    }

    async fn connect_to_remote_db(database_url: &str) -> Result<PgPool, SqlxError> {
        let connect_options = sqlx::postgres::PgConnectOptions::from_str(database_url)?
            .application_name("GeneralUtils")
            .log_statements(tracing::log::LevelFilter::Debug)
            .log_slow_statements(tracing::log::LevelFilter::Warn, Duration::from_secs(5));

        PgPoolOptions::new()
            .max_connections(10)
            .acquire_timeout(Duration::from_secs(10))
            .connect_with(connect_options)
            .await
    }

    async fn connect_to_local_db() -> Result<PgPool, SqlxError> {
        let admin_conn_url = "postgres://postgres:postgres@localhost:5432/postgres";
        PgPoolOptions::new()
            .max_connections(10)
            .acquire_timeout(Duration::from_secs(10))
            .connect(admin_conn_url)
            .await
    }
}
