FROM rust:latest AS builder
WORKDIR /usr/src/app
COPY Cargo.toml Cargo.lock ./
RUN cargo fetch
COPY src ./src
COPY backend/assets ./assets
RUN cargo build --release
FROM debian:bullseye-slim
WORKDIR /app
COPY --from=builder /usr/src/app/target/release/backend .
COPY --from=builder /usr/src/app/assets ./assets
EXPOSE 8080
CMD ["./backend"]
