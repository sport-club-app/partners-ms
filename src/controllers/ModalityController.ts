import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { fieldValidated } from "@Validators/modalityValidator"
import { modalityFactory } from "@Factory/modalityFactory"
import { errorHandler } from "src/exceptions/error-handler"
import { APIError } from "src/exceptions/base-error"
import { HttpStatusCode } from "src/exceptions/interfaces"
import businessError from "src/exceptions/business-error"
const {
  deleteModalityUseCase,
  getAllModalityUseCase,
  getModalityUseCase,
  saveModalityUseCase,
  updateModalityUseCase
} = modalityFactory()
class ModalityController {
  async saveModality (req: Request, res: Response, next: NextFunction) {
    try {
      const matched = await fieldValidated(req)
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
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async getAllModality (req: Request, res: Response, next: NextFunction) {
    try {
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
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async getModality (req: Request, res: Response, next: NextFunction) {
    try {
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
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async updateModality (req: Request, res: Response, next: NextFunction) {
    const data = req.body
    try {
      const result = await updateModalityUseCase.execute(Number(req.params.id), data)
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
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async deleteModality (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await deleteModalityUseCase.execute(Number(req.params.id))
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
      return errorHandler.returnError(error, req, res, next)
    }
  }
}

export default new ModalityController()
