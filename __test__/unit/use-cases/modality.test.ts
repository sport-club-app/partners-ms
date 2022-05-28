import { ModalityRepositoryMemory } from "../../../src/repository/ModalityRepositoryMemory"
import { Modality } from "../../../src/core/entity/Modality"
import { fieldValidated } from "../../../src/validators/modalityValidator"

const dataValidated: Modality = {
  id: 123,
  name: "futebol",
  description: "esporte"
}

const repository = new ModalityRepositoryMemory()

describe("Testes unitários de modalidades", () => {
  beforeAll(async () => {
    const list: Modality[] = [
      {
        name: "basket",
        description: "esporte"
      },
      {
        name: "jiujitsu",
        description: "esporte"
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
      description: "esporte"
    }
    const result = await repository.save(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Deve salvar um registro caso todos dados obrigátorios sejam passados", async () => {
    const result = await repository.save(dataValidated)
    expect(result).toEqual(dataValidated)
  })

  it("Não Deve listar modalidade caso o id seja omitido", async () => {
    const result: any = await repository.findOne(null)
    const status = result.status
    expect(status).toBe(400)
  })

  it("Não Deve deletar modalidade caso o id seja omitido", async () => {
    const result: any = await repository.delete(null)
    const status = result.status
    expect(status).toBe(400)
  })

  it("Deve listar todos registros de modalidades", async () => {
    const result = await repository.findAll()
    expect(result).not.toHaveLength(0)
  })

  it("Deve listar modalidade caso seja passado um id", async () => {
    const result = await repository.findOne(dataValidated.id)
    expect(result).toEqual(dataValidated)
  })

  it("Deve deletar modalidade caso seja passado um id", async () => {
    const result = await repository.delete(dataValidated.id)
    expect(result).toHaveLength(0)
  })

  describe("Testes de validações", () => {
    it("Deve retornar erro 400 caso não seja passado nenhum dado", async () => {
      const register = await fieldValidated(null)
      const status = register.status
      expect(status).toBe(400)
    })

    it("Deve retornar erro 422 caso não seja passado uma string para o campo name", async () => {
      const register = await fieldValidated({ body: { name: 1 } })
      const status = register.status
      expect(status).toBe(422)
    })
  })
})
