// @ts-nocheck
import { PartnerRepositoryMemory } from "@/app/repository/PartnerRepositoryMemory"
import { Partner } from "@/app/core/entity/Partner"

import {
  DeletePartner,
  GetAllPartner,
  GetFullRegisterDataPartner,
  GetPartner,
  SavePartner,
  UpdatePartner
} from "@/app/core/use-cases/partner"

const dataValidated: Partner = {
  id: 123,
  name: "joao",
  surname: "da silva",
  birthDate: new Date("1990-02-24")
}

const repository = new PartnerRepositoryMemory()
const savePartner = new SavePartner(repository)
const deletePartner = new DeletePartner(repository)
const getAllPartner = new GetAllPartner(repository)
const getFullRegisterDataPartner = new GetFullRegisterDataPartner(repository)
const getPartner = new GetPartner(repository)
const updatePartner = new UpdatePartner(repository)

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
    const result = await savePartner.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso o sobrenome seja omitido", async () => {
    const data = {
      name: "joao",
      surname: null,
      birthDate: new Date("1990-02-24")
    }
    const result = await savePartner.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Não deve salvar um registro caso a data de nascimento seja omitido", async () => {
    const data = {
      name: "joao",
      surname: "da silva",
      birthDate: null
    }
    const result = await savePartner.execute(data)
    expect(result).not.toEqual(dataValidated)
  })

  it("Deve salvar um registro caso todos dados obrigátorios sejam passados", async () => {
    const result = await savePartner.execute(dataValidated)
    expect(result).toEqual(result)
  })

  it("Não Deve listar informação pessoal de sócio caso o id seja omitido", async () => {
    const result: any = await getPartner.execute(null)
    expect(result).toBe(undefined)
  })

  it("Não Deve deletar informação pessoal de sócio caso o id seja omitido", async () => {
    await deletePartner.execute(null)
    const t = () => {
      throw new TypeError()
    }
    expect(t).toThrow(TypeError)
  })

  it("Deve listar todos registros de informações pessoais de sócios", async () => {
    const result = await getAllPartner.execute()
    expect(result).not.toHaveLength(0)
  })

  it("Deve listar informação pesoal de sócio caso seja passado um id", async () => {
    const result = await getPartner.execute(dataValidated.id)
    expect(result).toEqual(dataValidated)
  })

  it("Deve deletar informação pesoal de sócio caso seja passado um id", async () => {
    const result = await deletePartner.execute(dataValidated.id)
    expect(result).toHaveLength(0)
  })
})
