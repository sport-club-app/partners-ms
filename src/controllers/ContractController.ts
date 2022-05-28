import "dotenv/config"
import { Request, Response } from "express"
import { fieldValidated } from "@Validators/contractValidator"
import { Erros } from "@Validators/registerValidator"
import { ContractRepositoryDb } from "@Repository/ContractRepositoryDb"
import { UpdateContractStatus, SaveOneContract, GetContract, GetAllContracts, DeleteContract } from "@Core/use-cases/contract"
import { Contract } from "@Core/entity"

const contractRepositoryDb = new ContractRepositoryDb()

const updateContractStatusUseCase = new UpdateContractStatus(contractRepositoryDb)
const saveOneContractUseCase = new SaveOneContract(contractRepositoryDb)
const getContractUseCase = new GetContract(contractRepositoryDb)
const getAllContractUseCase = new GetAllContracts(contractRepositoryDb)
const deeleteContractUseCase = new DeleteContract(contractRepositoryDb)

class ContractController {
  async saveOneContract (req: Request, res: Response) {
    const data: Contract = req.body
    try {
      const matched: Erros = await fieldValidated(data)
      if (matched) {
        return res.status(matched.status).send(matched.body)
      } else {
        const result = await saveOneContractUseCase.execute(data)
        if (!result) return res.status(422).send({ message: "Erro ao processar requisição" })
        return res.status(201).send(result)
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res.status(500).send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async updateContractStatus (req: Request, res: Response) {
    const data: Contract = req.body
    try {
      if (!data.partnerId) return res.status(422).send({ message: "Erro ao processar requisição" })
      const result = await updateContractStatusUseCase.execute(Number(req.params.id), data.partnerId, data)
      if (!result) return res.status(422).send({ message: "Erro ao processar requisição" })
      return res.status(201).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res.status(500).send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async getContract (req: Request, res: Response) {
    try {
      const result = await getContractUseCase.execute(Number(req.params.id))
      if (!result) return res.status(400).send({ message: "Erro ao processar requisição" })
      return res.status(200).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res.status(500).send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async getAllContracts (req: Request, res: Response) {
    try {
      const result = await getAllContractUseCase.execute()
      if (!result) return res.status(400).send({ message: "Erro ao processar requisição" })
      return res.status(200).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res.status(500).send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async deleteContract (req: Request, res: Response) {
    const data: Contract = req.body
    try {
      if (!data.partnerId) return res.status(422).send({ message: "Dados inválidos!" })
      const result = await deeleteContractUseCase.execute(Number(req.params.id), data.partnerId)
      return res.status(204).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res.status(500).send({ message: "Erro! contate o administrador do sistema" })
    }
  }
}

export default new ContractController()
