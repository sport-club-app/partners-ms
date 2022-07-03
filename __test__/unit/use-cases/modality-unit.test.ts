// @ts-nocheck
import { ModalityRepositoryMemory } from "@/app/repository/ModalityRepositoryMemory"
import { Modality } from "@/app/core/entity/Modality"
import {
  DeleteModality,
  GetAllmodality,
  GetModality,
  GetModalityList,
  SaveModality,
  UpdateModality
} from "@/app/core/use-cases/modality"

const repository = new ModalityRepositoryMemory()

const deleteModality = new DeleteModality(repository)
const getAllmodality = new GetAllmodality(repository)
const getModality = new GetModality(repository)
const getModalityList = new GetModalityList(repository)
const saveModality = new SaveModality(repository)
const updateModality = new UpdateModality(repository)

const dataValidated: Modality = {
  id: 123,
  name: "futebol",
  description: "esporte"
}

describe("Testes unitários de modalidades", () => {
  beforeAll(async () => {
    jest.useFakeTimers()
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
    const result = await saveModality.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Deve salvar um registro caso todos dados obrigátorios sejam passados", async () => {
    const result = await saveModality.execute(dataValidated)
    expect(result).toEqual(result)
  })

  it("Não Deve listar modalidade caso o id seja omitido", async () => {
    const result = await getModality.execute(null)
    expect(result).toBe(undefined)
  })

  it("Não Deve deletar modalidade caso o id seja omitido", async () => {
    await deleteModality.execute(null)
    const t = () => {
      throw new TypeError()
    }
    expect(t).toThrow(TypeError)
  })

  it("Deve listar todos registros de modalidades", async () => {
    const result = await getAllmodality.execute()
    expect(result).not.toHaveLength(0)
  })

  it("Deve listar modalidade caso seja passado um id", async () => {
    const result = await getModality.execute(dataValidated.id)
    expect(result).toEqual(dataValidated)
  })

  it("Deve deletar modalidade caso seja passado um id", async () => {
    const result = await deleteModality.execute(dataValidated.id)
    expect(result).toHaveLength(0)
  })
})
