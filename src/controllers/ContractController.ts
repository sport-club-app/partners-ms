import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { fieldValidated } from "@Validators/contractValidator"
import { Contract } from "@Core/entity"
import { errorHandler } from "src/exceptions/error-handler"
import { APIError } from "src/exceptions/base-error"
import { HttpStatusCode } from "src/exceptions/interfaces"
import businessError from "src/exceptions/business-error"
import { contractFactory } from "@Factory/contractFactory"
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
      const matched = await fieldValidated(data)
      if (matched) {
        throw new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          matched
        )
      }
      const result = await saveOneContractUseCase.execute(data)
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTRACT_NOT_FOUND,
          undefined
        )
      }
      return res.status(201).send(result)
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async updateContractStatus (req: Request, res: Response, next: NextFunction) {
    const data: Contract = req.body
    try {
      if (!data.partnerId) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND,
          undefined
        )
      }
      const result = await updateContractStatusUseCase.execute(Number(req.params.id), data.partnerId, data)
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTRACT_NOT_FOUND,
          undefined
        )
      }
      return res.status(201).send(result)
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async getContract (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getContractUseCase.execute(Number(req.params.id))
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTRACT_NOT_FOUND,
          undefined
        )
      }
      return res.status(200).send(result)
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async getAllContracts (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAllContractUseCase.execute()
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTRACT_NOT_FOUND,
          undefined
        )
      }
      return res.status(200).send(result)
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async deleteContract (req: Request, res: Response, next: NextFunction) {
    const data: Contract = req.body
    try {
      if (!data.partnerId) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND,
          undefined
        )
      }
      const result = await deeleteContractUseCase.execute(Number(req.params.id), data.partnerId)
      return res.status(204).send(result)
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }
}

export default new ContractController()
