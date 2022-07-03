import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { fieldValidated } from "@/app/validators/contractValidator"
import { Contract } from "@/app/core/entity"
import { errorHandlerMiddleware } from "@/app/middleware/error-handler"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"
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
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async updateContractStatus (req: Request, res: Response, next: NextFunction) {
    const data: Contract = req.body
    try {
      if (!data.partnerId) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTRACT_NOT_FOUND,
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
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getContract (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    try {
      if (!id) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      }
      const result = await getContractUseCase.execute(Number(id))
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
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getAllContracts (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers?.authorization) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      }
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
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async deleteContract (req: Request, res: Response, next: NextFunction) {
    const data: Contract = req.body
    try {
      if (!data.partnerId) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTRACT_NOT_FOUND,
          undefined
        )
      }
      const result = await deeleteContractUseCase.execute(Number(req.params.id), data.partnerId)
      return res.status(204).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}

export default new ContractController()
