import { ContactMemory } from "../../../src/repository/ContactRepositoryMemory"
import { Contact } from "../../../src/core/entity/Contact"

const dataValidated: Contact = {
  id: 123,
  address: "endereco 1",
  email: "email@email",
  phone: 9999334455,
  partnerId: 2
}

const repository = new ContactMemory()

describe("Testes unitários de informacões de contato", () => {
  beforeAll(async () => {
    const list = [
      {
        address: "endereco 1",
        email: "email@email",
        phone: 9999334455,
        partnerId: 2
      },
      {
        address: "endereco 2",
        email: "email2@email",
        phone: 9987766333,
        partnerId: 2
      }
    ]

    for (const ci of list) {
      await repository.save(ci)
    }

    await repository.save(dataValidated)
  })

  it("Não deve salvar um registro caso o endereço seja omitido", async () => {
    const data = {
      address: null,
      email: "email@email",
      phone: 9999334455,
      partnerId: 2
    }
    const result = await repository.save(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o email seja omitido", async () => {
    const data = {
      address: "endereco 1",
      email: null,
      phone: 9999334455,
      partnerId: 2
    }
    const result = await repository.save(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o telefone seja omitido", async () => {
    const data = {
      address: "endereco 1",
      email: "email@email",
      phone: null,
      partnerId: 2
    }
    const result = await repository.save(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o partnerId seja omitido", async () => {
    const data = {
      address: "endereco 1",
      email: "email@email",
      phone: 9999334455,
      partnerId: null
    }
    const result = await repository.save(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve atualizar um registro caso o partnerId seja omitido", async () => {
    const data = {
      address: "endereco 1",
      email: "email@email",
      phone: 9999334455,
      partnerId: 2
    }
    const result = await repository.updateContact(123, null, data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Deve salvar um registro caso todos dados obrigátorios sejam passados", async () => {
    const result = await repository.save(dataValidated)
    expect(result).toEqual(dataValidated)
  })

  it("Deve salvar um registro caso todos dados obrigátorios sejam passados", async () => {
    const result = await repository.saveOneContact(dataValidated)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não Deve listar informação de contato do sócio caso o id seja omitido", async () => {
    const result: any = await repository.findOne(null)
    const status = result.status
    expect(status).toBe(400)
  })

  it("Não Deve deletar informação de contato do sócio caso o id seja omitido", async () => {
    const result: any = await repository.delete(null)
    const status = result.status
    expect(status).toBe(400)
  })

  it("Deve listar todos registros de sócios", async () => {
    const result = await repository.findAll()
    expect(result).not.toHaveLength(0)
  })

  it("Deve listar informação de contato do sócio caso seja passado um id", async () => {
    const result = await repository.findOne(dataValidated.id)
    expect(result).toEqual(dataValidated)
  })

  it("Deve deletar informação de contato de sócio caso seja passado um id", async () => {
    const result = await repository.delete(dataValidated.id)
    expect(result).toHaveLength(0)
  })
})
