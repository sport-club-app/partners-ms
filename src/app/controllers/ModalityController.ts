import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { fieldValidated } from "@/app/validators/modalityValidator"
import { modalityFactory } from "@/app/factories/modality-factory"
import { errorHandlerMiddleware } from "@/app//middleware/error-handler"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"
import { Modality } from "@/app/core/entity/Modality"
const {
  deleteModalityUseCase,
  getAllModalityUseCase,
  getModalityUseCase,
  saveModalityUseCase,
  updateModalityUseCase
} = modalityFactory()
class ModalityController {
  async saveModality (req: Request, res: Response, next: NextFunction) {
    const data: Modality = req.body
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
      const result = await saveModalityUseCase.execute(req.body)
      return res.status(201).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getAllModality (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers?.authorization) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      }
      const result = await getAllModalityUseCase.execute()
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.MODALITY_NOT_FOUND,
          undefined
        )
      }
      return res.status(200).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getModality (req: Request, res: Response, next: NextFunction) {
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
      const result = await getModalityUseCase.execute(Number(req.params.id))
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.MODALITY_NOT_FOUND,
          undefined
        )
      }
      return res.status(200).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async updateModality (req: Request, res: Response, next: NextFunction) {
    const data = req.body
    const id = req.params.id
    try {
      if (!id) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.MODALITY_NOT_FOUND,
          undefined
        )
      }
      const result = await updateModalityUseCase.execute(Number(id), data)
      if (result.affected == 0) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.MODALITY_NOT_FOUND,
          undefined
        )
      }
      return res.status(201).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async deleteModality (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    try {
      if (!id) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.MODALITY_NOT_FOUND,
          undefined
        )
      }
      const result = await deleteModalityUseCase.execute(Number(id))
      if (result.affected == 0) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.MODALITY_NOT_FOUND,
          undefined
        )
      }
      return res.status(204).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}

export default new ModalityController()
