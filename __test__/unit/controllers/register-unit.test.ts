
import RegisterController from "@/app/controllers/RegisterController"
import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"

describe("Testes unitários de Cadastro", () => {
  describe("Testes de validações", () => {
    it("Deve retornar erro 422 caso não seja passado nenhum dado", async () => {
      const errors = {
        data: {
          partner: {
            message: "The partner field is mandatory.",
            rule: "required"
          },
          contacts: {
            message: "The contacts field is mandatory.",
            rule: "required"
          },
          modalities: {
            message: "The modalities field is mandatory.",
            rule: "required"
          },
          "partner.name": {
            message: "O campo Nome é obrigatório",
            rule: "required"
          },
          "partner.surname": {
            message: "O campo Sobrenome é obrigatório",
            rule: "required"
          },
          "partner.birthDate": {
            message: "O campo Data de nascimento é obrigatório",
            rule: "required"
          }
        }
      }
      const req = { body: {} } as any
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any
      const next = jest.fn()
      await RegisterController.saveRegister(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          errors
        )
      )
    })

    it("Deve retornar erro 422 caso campo nome não seja passado", async () => {
      const errors = {
        data: {
          "partner.name": {
            message: "O campo Nome é obrigatório",
            rule: "required"
          }
        }
      }
      const dataFinaly = {
        partner: {
          surname: "ruan",
          birthDate: new Date("1990-02-24")
        },
        contacts: [
          {
            email: "pablords@gmail.com",
            phone: 99999999999,
            address: "endereco 6"
          },
          {
            email: "pablojds@yahoo.com",
            phone: 99999999999,
            address: "endereco 7"
          }
        ]
      }
      const newRegister = {
        body: {
          partner: dataFinaly,
          modality: [1]
        }
      }
      const req = newRegister as any
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any
      const next = jest.fn()
      await RegisterController.saveRegister(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          errors
        )
      )
    })

    it("Deve retornar erro 422 caso campo nome seja diferente de uma string", async () => {
      const errors = {
        data: {
          "partner.name": {
            message: "Deve ser uma string",
            rule: "string"
          }
        }
      }
      const dataFinaly = {
        partner: {
          name: 1234566,
          surname: "ruan",
          birthDate: new Date("1990-02-24")
        },
        contacts: [
          {
            email: "pablords@gmail.com",
            phone: 99999999999,
            address: "endereco 6"
          },
          {
            email: "pablojds@yahoo.com",
            phone: 99999999999,
            address: "endereco 7"
          }
        ]
      }

      const newRegister = {
        body: {
          partner: dataFinaly,
          modality: [1]
        }
      }
      const req = newRegister as any
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any
      const next = jest.fn()
      await RegisterController.saveRegister(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          errors
        )
      )
    })

    it("Deve retornar erro 422 caso campo data aniversario seja diferente de uma data", async () => {
      const errors = {
        data: {
          "partner.birthDate": {
            message: "Deve conter uma data válida",
            rule: "date"
          }
        }
      }
      const dataFinaly = {
        partner: {
          name: "pablo",
          surname: "ruan",
          birthDate: 1
        },
        contacts: [
          {
            email: "pablords@gmail.com",
            phone: 99999999999,
            address: "endereco 6"
          },
          {
            email: "pablojds@yahoo.com",
            phone: 99999999999,
            address: "endereco 7"
          }
        ]
      }
      const newRegister = {
        body: {
          partner: dataFinaly,
          modality: [1]
        }
      }
      const req = newRegister as any
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any
      const next = jest.fn()
      await RegisterController.saveRegister(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          errors
        )
      )
    })

    it("Deve retornar erro 422 caso campo sobrenome seja diferente de uma string", async () => {
      const errors = {
        data: {
          "partner.surname": {
            message: "Deve ser uma string",
            rule: "string"
          }
        }
      }
      const dataFinaly = {
        partner: {
          name: "pablo",
          surname: new Date(),
          birthDate: new Date("1990-02-24")
        },
        contacts: [
          {
            email: "pablords@gmail.com",
            phone: 99999999999,
            address: "endereco 6"
          },
          {
            email: "pablojds@yahoo.com",
            phone: 99999999999,
            address: "endereco 7"
          }
        ]
      }
      const newRegister = {
        body: {
          partner: dataFinaly,
          modality: [1]
        }
      }
      const req = newRegister as any
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any
      const next = jest.fn()
      await RegisterController.saveRegister(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          errors
        )
      )
    })

    it("Deve retornar erro 422 caso campo endereço seja diferente de uma string", async () => {
      const errors = {
        data: {
          "contacts.0.address": {
            message: "O campo Endereço é obrigatório",
            rule: "required"
          }
        }
      }
      const dataFinaly = {
        partner: {
          name: "pablo",
          surname: "ruan",
          birthDate: new Date("1990-02-24")
        },
        contacts: [
          {
            email: "pablords@gmail.com",
            phone: 99999999999,
            address: 122344
          },
          {
            email: "pablojds@yahoo.com",
            phone: 99999999999,
            address: "endereco 7"
          }
        ]
      }
      const newRegister = {
        body: {
          partner: dataFinaly,
          modality: [1]
        }
      }
      const req = newRegister as any
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any
      const next = jest.fn()
      await RegisterController.saveRegister(req, res, next)
      expect(res.send).toBeCalledWith(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          errors
        )
      )
    })

    it("Deve retornar erro 422 caso campo email seja diferente de um email", async () => {
      const errors = {
        data: {
          "contacts.0.email": {
            message: "Deve conter um E-mail válido",
            rule: "email"
          }
        }
      }
      const dataFinaly = {
        partner: {
          name: "pablo",
          surname: "ruan",
          birthDate: new Date("1990-02-24")
        },
        contacts: [
          {
            email: "nao é um email",
            phone: 99999999999,
            address: "endereco 6"
          },
          {
            email: "pablojds@yahoo.com",
            phone: 99999999999,
            address: "endereco 7"
          }
        ]
      }
      const newRegister = {
        body: {
          partner: dataFinaly,
          modality: [1]
        }
      }
      const req = newRegister as any
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any
      const next = jest.fn()
      await RegisterController.saveRegister(req, res, next)
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
