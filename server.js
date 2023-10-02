// import { createServer } from "node:http";

// const server = createServer((request, response) => {
//   response.write("hello");
//   return response.end();
// });

// server.listen(3333);

import { fastify } from "fastify";
import { databaseMemory } from "./database-memory.js";
import { databasePostgres } from "./database-postgres.js";

const server = fastify();
// const database = new databaseMemory();
const database = new databasePostgres();
server.get("/", () => {
  return "Hello World";
});

server.post("/agenda", async (request, reply) => {
  const { date, description, duration } = request.body;

  await database.create({
    date,
    description,
    duration,
  });
  console.log(database.list());
  return reply.status(201).send();
});

server.put("/agenda/:id", async (request, reply) => {
  const eventoId = request.params.id;
  const { date, description, duration } = request.body;

  await database.update(eventoId, {
    date,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/agenda/:id", async (request, reply) => {
  const videoId = request.params.id;

  await database.delete(videoId);

  return reply.status(204).send();
});

server.get("/agenda", async (request) => {
  const search = request.query.search;
  console.log(search);

  const eventos = await database.list(search);
  return eventos;
});

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
});
