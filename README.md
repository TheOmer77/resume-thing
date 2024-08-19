# Resume Thing

Hello! This project will be some sort of resume builder in the future, but unfortunately **it's not finished yet.** For now, this app just generates a resume PDF file from existing data, which you can modify manually, and lets you view and download that PDF.

## Getting started

### Prerequisites

- [Nodejs](https://nodejs.org/en) 20
- [Docker](https://www.docker.com/)

### Running the project

To run the development containers:

```sh
docker compose up -d
```

This will run the following:

- The app itself, which is just a viewer for the generated PDF file for now. It's accessible from [localhost:3000](http://localhost:3000/).
- Drizzle studio, which you can use to view the app's database and manually modify its data (as you can't modify it from the app at the moment). It's available at [local.drizzle.studio](https://local.drizzle.studio/).
- A postgreSQL database, used by the app.

### Initialize the database

If the database is not initialized yet, run the `db:migrate` script as described below. You can also run the `db:seed` script to add some dummy data, or alternatively just add it manually.

## Scripts

It's important that you run the below DB scripts from the `app` container (prefixed with `docker compose exec app`) instead of just with `pnpm`, to ensure they can properly access the database container.

| Script                                     | Description                                                         |
| ------------------------------------------ | ------------------------------------------------------------------- |
| `docker compose exec app pnpm db:generate` | Generate DB migrations.                                             |
| `docker compose exec app pnpm db:migrate`  | Run the existing DB migrations.                                     |
| `docker compose exec app pnpm db:seed`     | Run the DB seed script, which inserts dummy data into the database. |
