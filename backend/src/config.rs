use std::env;
use serde::Deserialize;

#[derive(Debug, Deserialize)]

pub struct Config {
    pub database_url: String,
    pub server_address: String,
}

impl Config {

    pub fn load_from_env() -> Result<Self, Box<dyn std::error::Error>> {
        dotenv::dotenv().ok();

        let config = Config {
            database_url: env::var("DATABASE_URL")?,
            server_address: env::var("SERVER_ADDRESS")?,
        };

        Ok(config)
    }

}
