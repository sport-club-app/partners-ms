import { ContractRepositoryMemory } from "../../../src/repository/ContractRepositoryMemory"
import { Contract } from "../../../src/core/entity/Contract"
import { fieldValidated } from "../../../src/validators/modalityValidator"

const dataValidated: Contract = {
  id: 1,
  start: new Date("2021-02-01"),
  dueDate: new Date("2021-03-01"),
  isActive: true,
  status: "ativo",
  partnerId: 1,
  modalityId: 2
}

const repository = new ContractRepositoryMemory()

describe.only("Testes unitários de contratos", () => {
  beforeAll(async () => {
    const list: Contract[] = [
      {
        start: new Date("2021-04-01"),
        dueDate: new Date("2021-05-01"),
        isActive: true,
        status: "ativo",
        partnerId: 1,
        modalityId: 2

      },
      {
        start: new Date("2021-06-01"),
        dueDate: new Date("2021-07-01"),
        isActive: true,
        status: "ativo",
        partnerId: 1,
        modalityId: 2
      }
    ]

    for (const pi of list) {
      await repository.save(pi)
    }

    await repository.save(dataValidated)
  })

  it("Não deve salvar um registro caso o inicio seja omitido", async () => {
    const data = {
      start: null,
      dueDate: new Date("2021-03-01"),
      isActive: true,
      status: "ativo",
      partnerId: 1,
      modalityId: 2
    }
    const result = await repository.save(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o vencimento seja omitido", async () => {
    const data = {
      start: new Date("2021-02-01"),
      dueDate: null,
      isActive: true,
      status: "ativo",
      partnerId: 1,
      modalityId: 2
    }
    const result = await repository.save(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o isActive seja omitido", async () => {
    const data = {
      start: new Date("2021-02-01"),
      dueDate: new Date("2021-03-01"),
      isActive: null,
      status: "ativo",
      partnerId: 1,
      modalityId: 2
    }
    const result = await repository.save(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o status seja omitido", async () => {
    const data = {
      start: new Date("2021-02-01"),
      dueDate: new Date("2021-03-01"),
      isActive: true,
      status: "ativo",
      partnerId: 1,
      modalityId: 2
    }
    const result = await repository.save(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o partnerId seja omitido", async () => {
    const data = {
      start: new Date("2021-02-01"),
      dueDate: new Date("2021-03-01"),
      isActive: true,
      status: "ativo",
      partnerId: null,
      modalityId: 2
    }
    const result = await repository.save(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o modalityId seja omitido", async () => {
    const data = {
      start: new Date("2021-02-01"),
      dueDate: new Date("2021-03-01"),
      isActive: true,
      status: "ativo",
      partnerId: 1,
      modalityId: null
    }
    const result = await repository.save(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Deve salvar um registro caso todos dados obrigátorios sejam passados", async () => {
    const result = await repository.save(dataValidated)
    expect(result).toEqual(dataValidated)
  })

  it("Não Deve listar modalidade caso o id seja omitido", async () => {
    const result = await repository.findOne(null)
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
})
