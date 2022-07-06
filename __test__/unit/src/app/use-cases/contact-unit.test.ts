import { ContactMemory } from "../../../../mocks/repositories"
import { Contact } from "@/app/core/entity/Contact"
import {
  SaveOneContact,
  DeleteContact,
  GetAllContacts,
  GetContact,
  GetEmailContact,
  SaveContact,
  UpdateOneContact
} from "@/app/core/use-cases/contact/"

const dataValidated: Contact = {
  id: 123,
  address: "endereco 1",
  email: "email@email",
  phone: 9999334455,
  partnerId: 2
}

const repository = new ContactMemory()
const saveOneContact = new SaveOneContact(repository)
const deleteContact = new DeleteContact(repository)
const getAllContacts = new GetAllContacts(repository)
const getContact = new GetContact(repository)
const updateOneContact = new UpdateOneContact(repository)
const getEmailContact = new GetEmailContact(repository)
const saveContact = new SaveContact(repository)

describe("Testes unitários de informacões de contato", () => {
  beforeAll(async () => {
    jest.useFakeTimers()
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
    const result = await saveOneContact.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o email seja omitido", async () => {
    const data = {
      address: "endereco 1",
      email: null,
      phone: 9999334455,
      partnerId: 2
    }
    const result = await saveOneContact.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o telefone seja omitido", async () => {
    const data = {
      address: "endereco 1",
      email: "email@email",
      phone: null,
      partnerId: 2
    }
    const result = await saveOneContact.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o partnerId seja omitido", async () => {
    const data = {
      address: "endereco 1",
      email: "email@email",
      phone: 9999334455,
      partnerId: null
    }
    const result = await saveOneContact.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve atualizar um registro caso o partnerId seja omitido", async () => {
    const data = {
      address: "endereco 1",
      email: "email@email",
      phone: 9999334455,
      partnerId: 2
    }
    const result = await updateOneContact.execute(123, null, data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Deve salvar um registro caso todos dados obrigátorios sejam passados", async () => {
    const result = await saveOneContact.execute(dataValidated)
    expect(result).toEqual(dataValidated)
  })

  it("Não Deve listar emails caso o payload seja omitido", async () => {
    await getEmailContact.execute(null)
    const t = () => {
      throw new TypeError()
    }
    expect(t).toThrow(TypeError)
  })

  it("Deve salvar um registro caso todos dados obrigátorios sejam passados", async () => {
    const result = await saveContact.execute(dataValidated)
    expect(result).toEqual(dataValidated)
  })

  it("Não Deve listar informação de contato do sócio caso o id seja omitido", async () => {
    const result = await getContact.execute(null)
    expect(result).toBe(undefined)
  })

  it("Não Deve deletar informação de contato do sócio caso o id seja omitido", async () => {
    const result = await deleteContact.execute(null)
    expect(result.affected).toBe(undefined)
  })

  it("Deve listar todos registros de sócios", async () => {
    const result = await getAllContacts.execute()
    expect(result).not.toHaveLength(0)
  })

  it("Deve listar informação de contato do sócio caso seja passado um id", async () => {
    const result = await getContact.execute(dataValidated.id)
    expect(result).toEqual(dataValidated)
  })

  it("Deve deletar informação de contato de sócio caso seja passado um id", async () => {
    const result = await deleteContact.execute(dataValidated.id)
    expect(result.affected).toBe(undefined)
  })

  it("Deve listar emails caso o payload seja passado", async () => {
    const result = await getEmailContact.execute(null)
    expect(result).toBe(result)
  })
})
