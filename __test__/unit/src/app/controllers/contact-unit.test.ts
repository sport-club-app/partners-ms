import ContactController from "@/app/controllers/ContactController"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { APIError } from "@/app/exceptions/base-error"
import { contactTranslate } from "@/app/validators/contactTranslate"
import { Contact } from "@/app/core/entity"
import EntityMock from "../../../../mocks/entities"
import { SaveOneContact } from "@/app/core/use-cases/contact"
import { ContactRepositoryDb } from "@/app/repository/ContactRepositoryDb"
import { fieldValidated } from "@/app/validators/contactValidator"

const ContactRepositoryDbMock = ContactRepositoryDb as jest.Mock<ContactRepositoryDb>
const contactRepositoryDbMock = new ContactRepositoryDbMock() as jest.Mocked<ContactRepositoryDb>
const SaveOneContactMock = SaveOneContact as jest.Mock<SaveOneContact>
const saveOneContactMock = new SaveOneContactMock(contactRepositoryDbMock) as jest.Mocked<SaveOneContact>

const saveOneContact = new SaveOneContact(contactRepositoryDbMock)

describe("Testes unitário ContactController", () => {
  it("Deve retornar erro 422 caso não seja passado nenhum dado", async () => {
    const errors = {
      email: contactTranslate.required,
      phone: contactTranslate.required,
      address: contactTranslate.required,
      partnerId: contactTranslate.required
    }
    const req = { body: {} } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await ContactController.saveOneContact(req, res, next)
    expect(res.send).toBeCalledWith(
      new APIError(
        "UNPROCESSABLE_ENTITY",
        HttpStatusCode.UNPROCESSABLE_ENTITY,
        true,
        businessError.UNPROCESSABLE_ENTITY,
        errors
      )
    )
  })

  it("Deve retornar erro 400 caso não seja passado nenhum dado", async () => {
    const req = {
      body: null
    } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await ContactController.saveOneContact(req, res, next)
    expect(res.send).toBeCalledWith(
      new APIError(
        "BAD_REQUEST",
        HttpStatusCode.BAD_REQUEST,
        true,
        businessError.GENERIC,
        undefined
      )
    )
  })

  it("Deve retornar contato salve caso todos dados obrigatórios sejam passados", async () => {
    const contact = EntityMock.getContact()
    const req = {
      body: {
        address: contact.address,
        email: contact.email,
        phone: contact.phone,
        partnerId: contact.partnerId
      } as Contact
    } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await ContactController.saveOneContact(req, res, next)
    // const spyFieldValidated = jest.spyOn(fieldValidatedMock, "execute")
    // spyFieldValidated.mockReturnValue(req.body)
    // expect(spyFieldValidated).toHaveBeenCalled()
    // const spySaveContact = jest.spyOn(saveOneContactMock, "execute")
    // spySaveContact.mockResolvedValue(req.body)
    // expect(spySaveContact).toHaveBeenCalled()
    // // const savedContact = await saveOneContact.execute(req.body)
    // // expect(savedContact).toEqual(req.body)
    // expect(res.status).toBeCalledWith(201)
    // expect(res.send).toBeCalledTimes(1)
    // spySaveContact.mockRestore()
    // spyFieldValidated.mockRestore()
  })

  it("Deve retornar erro 400 caso não seja passado um id", async () => {
    const req = { params: { id: undefined } } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await ContactController.getContact(req, res, next)
    expect(res.send).toBeCalledWith(
      new APIError("BAD_REQUEST",
        HttpStatusCode.BAD_REQUEST,
        true,
        businessError.GENERIC,
        undefined
      )
    )
  })

  it("Deve retornar erro 401 caso não seja passado um token de autorizacao", async () => {
    const req = { headers: { authorization: undefined } } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await ContactController.getAllContacts(req, res, next)
    expect(res.send).toBeCalledWith(
      new APIError("UNAUTHORIZED",
        HttpStatusCode.UNAUTHORIZED,
        true,
        businessError.TOKEN_NOT_FOUND,
        undefined
      )
    )
  })

  it("Deve retornar erro 400 caso não seja passado um payload", async () => {
    const req = { body: {} } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await ContactController.updateContact(req, res, next)
    expect(res.send).toBeCalledWith(
      new APIError("BAD_REQUEST",
        HttpStatusCode.BAD_REQUEST,
        true,
        businessError.GENERIC,
        undefined
      )
    )
  })

  it("Deve retornar erro 400 caso não seja passado um id", async () => {
    const req = { params: { id: undefined } } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await ContactController.deleteContact(req, res, next)
    expect(res.send).toBeCalledWith(
      new APIError("BAD_REQUEST",
        HttpStatusCode.BAD_REQUEST,
        true,
        businessError.GENERIC,
        undefined
      )
    )
  })
})
