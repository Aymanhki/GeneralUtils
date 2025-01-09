# Project Structure
```
    .
    ├── GeneralUtils.iml
    ├── ProjectTree.md
    ├── ReadMe.md
    ├── backend
    │   ├── Cargo.lock
    │   ├── Cargo.toml
    │   ├── Dockerfile
    │   ├── assets
    │   │   └── general_utils_db.sql
    │   └── src
    │       ├── config.rs
    │       ├── db
    │       │   ├── db_connection.rs
    │       │   ├── migration.rs
    │       │   └── mod.rs
    │       ├── handlers
    │       │   ├── auth_handler.rs
    │       │   ├── mod.rs
    │       │   └── user_handler.rs
    │       ├── main.rs
    │       ├── models
    │       │   ├── auth_model.rs
    │       │   ├── mod.rs
    │       │   └── user_model.rs
    │       ├── repository
    │       │   ├── auth_repository.rs
    │       │   ├── mod.rs
    │       │   └── user_repository.rs
    │       ├── routes
    │       │   ├── auth_routes.rs
    │       │   ├── mod.rs
    │       │   └── user_routes.rs
    │       ├── services
    │       │   ├── auth_service.rs
    │       │   ├── mod.rs
    │       │   └── user_service.rs
    │       ├── tests
    │       │   └── user_service_tests.rs
    │       └── utils
    │           ├── mod.rs
    │           ├── token_generator.rs
    │           └── validator.rs
    ├── docker-compose.yaml
    └── frontend
        ├── Dockerfile
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── public
        │   └── assets
        │       ├── images
        │       └── logo
        ├── src
        │   ├── index.tsx
        │   ├── main.tsx
        │   ├── modules
        │   │   ├── Footer.tsx
        │   │   ├── NavBar.tsx
        │   │   └── Router.tsx
        │   ├── pages
        │   │   ├── Board.tsx
        │   │   ├── ConvertFile.tsx
        │   │   ├── Donate.tsx
        │   │   ├── DownloadMedia.tsx
        │   │   ├── GetLink.tsx
        │   │   ├── Home.tsx
        │   │   ├── PageNotFound.tsx
        │   │   ├── SignIn.tsx
        │   │   └── SignUp.tsx
        │   ├── services
        │   │   ├── globals-service.tsx
        │   │   ├── seo-service.tsx
        │   │   └── session-service.tsx
        │   ├── styles
        │   │   ├── footer.css
        │   │   ├── index.css
        │   │   └── navbar.css
        │   └── vite-env.d.ts
        └── tsconfig.json
    
    21 directories, 58 files
```
The command that was used to generate this tree is:
```
tree -L 4 -I 'target|node_modules'
```
