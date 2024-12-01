FROM rust:latest
WORKDIR /usr/src/app
COPY Cargo.toml .
COPY src ./src
RUN cargo build --release
EXPOSE 8080
CMD ["./target/release/backend"]
