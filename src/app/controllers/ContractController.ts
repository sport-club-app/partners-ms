import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { Contract } from "@/app/core/entity"
import { errorHandlerMiddleware } from "@/app/middleware/error-handler"
import { contractFactory } from "@/app/factories/contract-factory"
const {
  deeleteContractUseCase,
  getAllContractUseCase,
  getContractUseCase,
  saveOneContractUseCase,
  updateContractStatusUseCase
} = contractFactory()

class ContractController {
  async saveOneContract (req: Request, res: Response, next: NextFunction) {
    const data: Contract = req.body
    try {
      const result = await saveOneContractUseCase.execute(data)
      return res.status(201).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async updateContractStatus (req: Request, res: Response, next: NextFunction) {
    const contract: Contract = req.body
    try {
      const result = await updateContractStatusUseCase.execute(Number(req.params.id), contract.partnerId, contract)
      return res.status(201).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getContract (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    try {
      const result = await getContractUseCase.execute(Number(id))
      return res.status(200).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getAllContracts (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAllContractUseCase.execute()
      return res.status(200).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async deleteContract (req: Request, res: Response, next: NextFunction) {
    const data: Contract = req.body
    try {
      const result = await deeleteContractUseCase.execute(Number(req.params.id), data.partnerId)
      return res.status(204).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}

export default new ContractController()
