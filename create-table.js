import { sql } from "./db.js";

// sql`DROP TABLE IF EXISTS eventos`.then(() => {
//   console.log("tabela apagada");
// });

sql`
CREATE TABLE eventos (
    id TEXT PRIMARY KEY,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    duration INTEGER
);`.then(() => {
  console.log("tabela criada");
});
