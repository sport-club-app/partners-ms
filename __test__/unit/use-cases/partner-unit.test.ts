// @ts-nocheck
import { PartnerRepositoryMemory } from "../../../src/app/repository/PartnerRepositorymemory"
import { Partner } from "../../../src/app/core/entity/Partner"
import PartnerController from "../../../src/app/controllers/PartnerController"
import { APIError } from "../../../src/app/exceptions/base-error"
import businessError from "../../../src/app/exceptions/business-error"
import { HttpStatusCode } from "../../../src/app/exceptions/interfaces"

const dataValidated: Partner = {
  id: 123,
  name: "joao",
  surname: "da silva",
  birthDate: new Date("1990-02-24")
}

const repository = new PartnerRepositoryMemory()

describe("Testes unitários de informacões pessoais", () => {
  beforeAll(async () => {
    jest.useFakeTimers()
    const list = [
      {
        name: "joao",
        surname: "da silva",
        birthDate: new Date("1990-02-24")
      },
      {
        name: "jose",
        surname: "silveira",
        birthDate: new Date("1990-03-14")
      }
    ]

    for (const pi of list) {
      await repository.save(pi)
    }

    await repository.save(dataValidated)
  })

  it("Não deve salvar um registro caso o nome seja omitido", async () => {
    const data = {
      name: null,
      surname: "da silva",
      birthDate: new Date("1990-02-24")
    }
    const result = await repository.save(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o sobrenome seja omitido", async () => {
    const data = {
      name: "joao",
      surname: null,
      birthDate: new Date("1990-02-24")
    }
    const result = await repository.save(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso a data de nascimento seja omitido", async () => {
    const data = {
      name: "joao",
      surname: "da silva",
      birthDate: null
    }
    const result = await repository.save(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Deve salvar um registro caso todos dados obrigátorios sejam passados", async () => {
    const result = await repository.save(dataValidated)
    expect(result).toEqual(dataValidated)
  })

  it("Não Deve listar informação pessoal de sócio caso o id seja omitido", async () => {
    const result: any = await repository.findOne(null)
    const status = result.status
    expect(status).toBe(400)
  })

  it("Não Deve deletar informação pessoal de sócio caso o id seja omitido", async () => {
    const result: any = await repository.delete(null)
    const status = result.status
    expect(status).toBe(400)
  })

  it("Deve listar todos registros de informações pessoais de sócios", async () => {
    const result = await repository.findAll()
    expect(result).not.toHaveLength(0)
  })

  it("Deve listar informação pesoal de sócio caso seja passado um id", async () => {
    const result = await repository.findOne(dataValidated.id)
    expect(result).toEqual(dataValidated)
  })

  it("Deve deletar informação pesoal de sócio caso seja passado um id", async () => {
    const result = await repository.delete(dataValidated.id)
    expect(result).toHaveLength(0)
  })

  describe("Testes de validações", () => {
    it("Deve retornar erro 422 caso não seja passado nenhum dado", async () => {
      const errors = {
        data: {
          name: {
            message: "O campo nome é obrigatório",
            rule: "required"
          },
          surname: {
            message: "O campo sobrenome é obrigatório",
            rule: "required"
          },
          birthDate: {
            message: "O campo data de aniversário é obrigatório",
            rule: "required"
          }
        }
      }
      const req = { body: {} }
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
      const next = jest.fn()
      await PartnerController.savePartner(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          errors
        )
      )
    })

    it("Deve retornar erro 422 caso não seja passado uma string para o campo name", async () => {
      const errors = {
        data: {
          name: {
            message: "Deve ser uma string",
            rule: "string"
          }
        }
      }
      const req = { body: { name: 1, birthDate: dataValidated.birthDate, surname: dataValidated.surname } as Partner }
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
      const next = jest.fn()
      await PartnerController.savePartner(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          errors
        )
      )
    })

    it("Deve retornar erro 422 caso não seja passado uma string para o campo surname", async () => {
      const errors = {
        data: {
          surname: {
            message: "Deve ser uma string",
            rule: "string"
          }
        }
      }
      const req = { body: { surname: 1, birthDate: dataValidated.birthDate, name: dataValidated.name } as Partner }
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
      const next = jest.fn()
      await PartnerController.savePartner(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          errors
        )
      )
    })

    it("Deve retornar erro 422 caso não seja passado uma data para o campo birthDate", async () => {
      const errors = {
        data: {
          birthDate: {
            message: "Deve conter uma data válida",
            rule: "date"
          }
        }
      }
      const req = { body: { surname: dataValidated.surname, birthDate: 1, name: dataValidated.name } as Partner }
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
      const next = jest.fn()
      await PartnerController.savePartner(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          errors
        )
      )
    })

    it("Deve retornar erro 422 caso o campo name seja omitido", async () => {
      const errors = {
        data: {
          name: {
            message: "O campo nome é obrigatório",
            rule: "required"
          }
        }
      }
      const result = {
        body: {
          name: "",
          surname: "da silva",
          birthDate: new Date("1990-02-24")
        }
      }
      const req = { body: result }
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
      const next = jest.fn()
      await PartnerController.savePartner(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          errors
        )
      )
    })

    it("Deve retornar erro 422 caso o campo surname seja omitido", async () => {
      const errors = {
        data: {
          surname: {
            message: "O campo surname é obrigatório",
            rule: "required"
          }
        }
      }
      const result = {
        body: {
          name: "pablo",
          surname: "",
          birthDate: new Date("1990-02-24")
        }
      }
      const req = { body: result }
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
      const next = jest.fn()
      await PartnerController.savePartner(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          errors
        )
      )
    })

    it("Deve retornar erro 422 caso o campo birthDate seja omitido", async () => {
      const errors = {
        data: {
          birthDate: {
            message: "O campo birthDate é obrigatório",
            rule: "required"
          }
        }
      }
      const result = {
        body: {
          name: "pablo",
          surname: "da silva",
          birthDate: null
        }
      }
      const req = { body: result }
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
      const next = jest.fn()
      await PartnerController.savePartner(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          errors
        )
      )
    })
  })
})
