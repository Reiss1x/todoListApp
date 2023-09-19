import { randomUUID } from "node:crypto";

export class databaseMemory {
  #eventos = new Map();

  list(search) {
    return Array.from(this.#eventos.entries())
      .map((eventoArray) => {
        const id = eventoArray[0];
        const data = eventoArray[1];

        return {
          id,
          ...data,
        };
      })
      .filter((evento) => {
        if (search) {
          return evento.description.includes(search);
        }

        return true;
      });
  }

  create(evento) {
    const eventoId = randomUUID();
    this.#eventos.set(eventoId, evento);
  }

  update(id, evento) {
    this.#eventos.set(id, evento);
  }

  delete(eventoId) {
    this.#eventos.delete(eventoId);
  }
}
