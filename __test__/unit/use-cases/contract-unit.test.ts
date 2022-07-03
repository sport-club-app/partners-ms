import { ContractRepositoryMemory } from "@/app/repository/ContractRepositoryMemory"
import { Contract } from "@/app/core/entity/Contract"
import {
  DeleteContract,
  GetAllContracts,
  GetContract,
  SaveContract,
  SaveOneContract,
  UpdateContractStatus
} from "@/app/core/use-cases/contract"
import { Modality } from "@/app/core/entity"

const repository = new ContractRepositoryMemory()
const deleteContract = new DeleteContract(repository)
const getAllContracts = new GetAllContracts(repository)
const getContract = new GetContract(repository)
const saveOneContract = new SaveOneContract(repository)
const updateContractStatus = new UpdateContractStatus(repository)
const saveContract = new SaveContract(repository)

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

const dataValidated: Contract = {
  id: 1,
  start: new Date("2021-02-01"),
  dueDate: new Date("2021-03-01"),
  isActive: true,
  status: "ativo",
  partnerId: 1,
  modalityId: 2
}

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
    const result = await saveOneContract.execute(data)
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
    const result = await saveOneContract.execute(data)
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
    const result = await saveOneContract.execute(data)
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
    const result = await saveOneContract.execute(data)
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
    const result = await saveOneContract.execute(data)
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
    const result = await saveOneContract.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Deve salvar um registro caso todos dados obrigátorios sejam passados", async () => {
    const result = await saveOneContract.execute(dataValidated)
    expect(result).toEqual(result)
  })

  it("Não Deve listar contrato caso o id seja omitido", async () => {
    const result = await getContract.execute(null)
    expect(result).toBe(undefined)
  })

  it("Não Deve deletar contrato caso o id seja omitido", async () => {
    const result = await deleteContract.execute(null, null)
    const status = result.status
    expect(status).toBe(undefined)
  })

  it("Deve listar todos registros de contratos", async () => {
    const result = await getAllContracts.execute()
    expect(result).not.toHaveLength(0)
  })

  it("Deve listar contrato caso seja passado um id", async () => {
    const result = await getContract.execute(dataValidated.id)
    expect(result).toEqual(dataValidated)
  })

  it("Deve deletar modalidade caso seja passado um id", async () => {
    const result = await deleteContract.execute(dataValidated.id, dataValidated.partnerId)
    expect(result).toHaveLength(0)
  })
})
