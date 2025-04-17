import pg from "pg";

const db = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "todoapp",
  password: "imbadatmaths69",
  port: 5433,
});

try {
  db.connect(() => {
    console.log("Connected to database!");
  });
} catch (err) {
  console.error(err.message);
}

export default db;
