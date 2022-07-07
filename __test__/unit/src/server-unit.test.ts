// @ts-nocheck

import { server } from "@/server"
import { router } from "@/routes"

import "@/index"

jest.mock("express", () => {
  return require("jest-express")
})

describe("Name of the group", () => {
  it("Deve validar asinaturas de rotas", () => {
    expect(router.get).toBeDefined()
  })

  it("Deve validar definicao do servidor", async () => {
    expect(server.use).toBeDefined()
  })
})
