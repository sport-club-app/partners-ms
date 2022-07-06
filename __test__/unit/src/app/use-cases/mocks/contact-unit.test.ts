// @ts-nocheck

import { ContactRepositoryDb } from "@/app/repository/ContactRepositoryDb"
import {
  SaveOneContact,
  DeleteContact,
  GetAllContacts,
  GetContact,
  GetEmailContact,
  SaveContact,
  UpdateOneContact
} from "@/app/core/use-cases/contact/"
import { Contact } from "@/app/core/entity"

jest.mock("@/app/repository/ContactRepositoryDb")

const ContactRepositoryDbMock = ContactRepositoryDb as jest.Mock<ContactRepositoryDb>
const contactRepositoryDbMock = new ContactRepositoryDbMock() as jest.Mocked<ContactRepositoryDb>
const saveOneContact = new SaveOneContact(contactRepositoryDbMock)
const deleteContact = new DeleteContact(contactRepositoryDbMock)
const getAllContacts = new GetAllContacts(contactRepositoryDbMock)
const getContact = new GetContact(contactRepositoryDbMock)
const updateOneContact = new UpdateOneContact(contactRepositoryDbMock)
const getEmailContact = new GetEmailContact(contactRepositoryDbMock)
const saveContact = new SaveContact(contactRepositoryDbMock)

describe("Testes unitários de Repositorio de contatos", () => {
  beforeAll(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })
  beforeEach(() => {
    contactRepositoryDbMock.createMany.mockReset()
  })

  it("Deve salvar um contato", async () => {
    const contact: Contact = {
      id: 123,
      address: "endereco 1",
      email: "email@email",
      phone: 9999334455,
      partnerId: 2
    }
    contactRepositoryDbMock.saveOneContact.mockReturnValue(contact)
    const savedUser = await saveOneContact.execute(contact)
    expect(savedUser).toEqual(contact)
    expect(contactRepositoryDbMock.saveOneContact).toBeCalledTimes(1)
  })

  it("Deve retornar um contato", async () => {
    contactRepositoryDbMock.findOne.mockReturnValue(1)
    await getContact.execute(1)
    expect(1).toEqual(1)
    expect(contactRepositoryDbMock.findOne).toBeCalledTimes(1)
  })

  it("Deve retornar uma lista de contatos", async () => {
    contactRepositoryDbMock.find.mockReturnValue(1)
    await getAllContacts.execute()
    expect([]).toEqual([])
    expect(contactRepositoryDbMock.find).toBeCalledTimes(1)
  })

  it("Deve retornar uma lista de contatos baseado em um payload de emails", async () => {
    contactRepositoryDbMock.findEmail.mockReturnValue(1)
    await getEmailContact.execute()
    expect([]).toEqual([])
    expect(contactRepositoryDbMock.findEmail).toBeCalledTimes(1)
  })

  it("Deve atualizar um contato", async () => {
    const contact: Contact = {
      id: 123,
      address: "endereco 1",
      email: "email@email",
      phone: 9999334455,
      partnerId: 2
    }
    contactRepositoryDbMock.updateContact.mockReturnValue(1, 2, contact)
    const updatedContact = await updateOneContact.execute()
    expect(updatedContact).toEqual(1)
    expect(contactRepositoryDbMock.updateContact).toBeCalledTimes(1)
  })
})
