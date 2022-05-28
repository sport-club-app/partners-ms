import { fieldValidated } from "../../../src/validators/registerValidator"

describe("Testes unitários de Cadastro", () => {
  describe("Testes de validações", () => {
    it("Deve retornar erro 400 caso não seja passado nenhum dado", async () => {
      const register = await fieldValidated(null)
      const status = register.status
      expect(status).toBe(400)
    })

    it("Deve retornar erro 422 caso algum dado obrigátorio não seja passado", async () => {
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
      const register = await fieldValidated(newRegister)
      const status = register.status
      expect(status).toBe(422)
    })

    it("Deve retornar erro 422 caso campo nome seja diferente de uma string", async () => {
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
      const register = await fieldValidated(newRegister)
      const status = register.status
      expect(status).toBe(422)
    })

    it("Deve retornar erro 422 caso campo data aniversario seja diferente de uma data", async () => {
      const dataFinaly = {
        partner: {
          name: "pablo",
          surname: "ruan",
          birthDate: "wfwfergregre"
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
      const register = await fieldValidated(newRegister)
      const status = register.status
      expect(status).toBe(422)
    })

    it("Deve retornar erro 422 caso campo sobrenome seja diferente de uma string", async () => {
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
      const register = await fieldValidated(newRegister)
      const status = register.status
      expect(status).toBe(422)
    })

    it("Deve retornar erro 422 caso campo endereço seja diferente de uma string", async () => {
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
      const register = await fieldValidated(newRegister)
      const status = register.status
      expect(status).toBe(422)
    })

    it("Deve retornar erro 422 caso campo email seja diferente de um email", async () => {
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
      const register = await fieldValidated(newRegister)
      const status = register.status
      expect(status).toBe(422)
    })

    it("Deve retornar erro 422 caso campo telefone seja diferente de um numero", async () => {
      const dataFinaly = {
        partner: {
          name: "pablo",
          surname: "ruan",
          birthDate: new Date("1990-02-24")
        },
        contacts: [
          {
            email: "pablords@gmail.com",
            phone: "nao é um numero",
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
      const register = await fieldValidated(newRegister)
      const status = register.status
      expect(status).toBe(422)
    })
  })
})
