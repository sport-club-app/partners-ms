import ContractController from "@/app/controllers/ContractController"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { APIError } from "@/app/exceptions/base-error"

describe("Testes unitário ContractController", () => {
  it("Deve retornar erro 422 caso não seja passado nenhum dado", async () => {
    const errors = undefined
    const req = { body: {} } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await ContractController.saveOneContract(req, res, next)
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
    await ContractController.getAllContracts(req, res, next)
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
    await ContractController.getContract(req, res, next)
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
    const req = { body: {} } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await ContractController.updateContractStatus(req, res, next)
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
    const req = { body: { } } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await ContractController.deleteContract(req, res, next)
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