import request from "supertest"
import { server } from "../../../src/server"

describe("Testes de componentes informaçoes de contatos", () => {
  it("Deve retornar status", async () => {
    const res = await request(server)
      .get("/contacts")
    expect(res.status).toBe(200)
  })
})
