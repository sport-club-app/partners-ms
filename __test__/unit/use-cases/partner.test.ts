import { PartnerRepositoryMemory } from "../../../src/repository/PartnerRepositorymemory"
import { Partner } from "../../../src/core/entity/Partner"
import { fieldValidated } from "../../../src/validators/partnerValidation"

const dataValidated: Partner = {
  id: 123,
  name: "joao",
  surname: "da silva",
  birthDate: new Date("1990-02-24")
}

const repository = new PartnerRepositoryMemory()

describe("Testes unitários de informacões pessoais", () => {
  beforeAll(async () => {
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
    it("Deve retornar erro 400 caso não seja passado nenhum dado", async () => {
      const result = await fieldValidated(null)
      const status = result.status
      expect(status).toBe(400)
    })

    it("Deve retornar erro 422 caso não seja passado uma string para o campo name", async () => {
      const result = await fieldValidated({ body: { name: 1, ...dataValidated } })
      const status = result.status
      expect(status).toBe(422)
    })

    it("Deve retornar erro 422 caso não seja passado uma string para o campo surname", async () => {
      const result = await fieldValidated({ body: { surname: 1, ...dataValidated } })
      const status = result.status
      expect(status).toBe(422)
    })

    it("Deve retornar erro 422 caso não seja passado uma data para o campo birthDate", async () => {
      const result = await fieldValidated({ body: { birthDate: 1, ...dataValidated } })
      const status = result.status
      expect(status).toBe(422)
    })

    it("Deve retornar erro 422 caso o campo name seja omitido", async () => {
      const result = await fieldValidated({
        body: {
          name: "",
          surname: "da silva",
          birthDate: new Date("1990-02-24")
        }
      })
      const status = result.status
      expect(status).toBe(422)
    })

    it("Deve retornar erro 422 caso o campo surname seja omitido", async () => {
      const result = await fieldValidated({
        body: {
          name: "pablo",
          surname: "",
          birthDate: new Date("1990-02-24")
        }
      })
      const status = result.status
      expect(status).toBe(422)
    })

    it("Deve retornar erro 422 caso o campo birthDate seja omitido", async () => {
      const result = await fieldValidated({
        body: {
          name: "pablo",
          surname: "da silva",
          birthDate: null
        }
      })
      const status = result.status
      expect(status).toBe(422)
    })
  })
})
