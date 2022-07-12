import PartnerController from "@/app/controllers/PartnerController"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { APIError } from "@/app/exceptions/base-error"

describe("Testes unitário PartnerController", () => {
  it("Deve retornar erro 422 caso não seja passado nenhum dado", async () => {
    const errors = undefined
    const req = { body: {} } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await PartnerController.savePartner(req, res, next)
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
  it("Deve retornar erro 401 caso não seja passado um token de autorizacao", async () => {
    const req = { headers: { authorization: undefined } } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await PartnerController.getAllPartners(req, res, next)
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
    const req = { params: { id: undefined } } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await PartnerController.getPartner(req, res, next)
    expect(res.send).toBeCalledWith(
      new APIError("BAD_REQUEST",
        HttpStatusCode.BAD_REQUEST,
        true,
        businessError.GENERIC,
        undefined
      )
    )
  })

  it("Deve retornar erro 400 caso não seja passado um payload", async () => {
    const req = { body: {}, params: { id: undefined } } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await PartnerController.updatePartner(req, res, next)
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
    await PartnerController.deletePartner(req, res, next)
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