import { randomUUID } from "node:crypto";
import { sql } from "./db.js";
import { title } from "node:process";

export class databasePostgres {
  async list(search) {
    let eventos;
    if (search) {
      eventos = await sql`select * from eventos where description ilike ${
        "%" + search + "%"
      }`;
    } else {
      eventos = await sql`select * from eventos`;
    }
    return eventos;
  }

  async create(evento) {
    const eventoId = randomUUID();
    const { date, description, duration } = evento;
    await sql`insert into eventos (id, date, description, duration) VALUES (${eventoId}, ${date}, ${description}, ${duration})`;
  }

  async update(id, evento) {
    const { date, description, duration } = evento;
    await sql`update eventos set date = ${date}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
  }

  async delete(eventoId) {
    await sql`delete from eventos where id = ${eventoId}`;
  }
}
