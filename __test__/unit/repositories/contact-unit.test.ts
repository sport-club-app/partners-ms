// @ts-nocheck

import { ContactRepositoryDb } from "@/app/repository/ContactRepositoryDb"
import { Contact } from "@/app/core/entity/Contact"

const dataValidated: Contact = {
  id: 123,
  address: "endereco 1",
  email: "email@email",
  phone: 9999334455,
  partnerId: 2
}

const repository = new ContactRepositoryDb()

describe("Testes unitários de repositorio de contatos", () => {
  it("Deve retornar uma lista de contatos", async () => {
    const data: Contact[] = [
      {
        address: null,
        email: "email@email",
        phone: 9999334455,
        partnerId: 2
      }
    ]
    const spy = jest.spyOn(repository, "find").mockImplementation(() => data)
    await repository.find()
    expect(spy).toHaveBeenCalled()
  })
})
