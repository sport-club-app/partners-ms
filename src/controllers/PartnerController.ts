import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { fieldValidated } from "@Validators/partnerValidation"
import { Partner } from "@Core/entity"
import { partnerFactory } from "@Factory/partnerFactory"
import { errorHandler } from "src/exceptions/error-handler"
import { APIError } from "src/exceptions/base-error"
import { HttpStatusCode } from "src/exceptions/interfaces"
import businessError from "src/exceptions/business-error"
const {
  deletePartnerPartnerUseCase,
  getAllPartnerPartnerUseCase,
  getPartnerPartnerUseCase,
  savePartnerUseCase,
  updatePartnerPartnerUseCase
} = partnerFactory()
class PartnerController {
  async savePartner (req: Request, res: Response, next: NextFunction) {
    const data: Partner = req.body
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
      const result = await savePartnerUseCase.execute(data)
      return res.status(201).send(result)
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async updatePartner (req: Request, res: Response, next: NextFunction) {
    const data: Partner = req.body
    try {
      const result = await updatePartnerPartnerUseCase.execute(Number(req.params.id), data)
      if (result.affected == 0) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND,
          undefined
        )
      }
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async getPartner (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getPartnerPartnerUseCase.execute(Number(req.params.id))
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND,
          undefined
        )
      }
      return res.status(200).send(result)
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async getAllPartners (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAllPartnerPartnerUseCase.execute()
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND,
          undefined
        )
      }
      return res.status(200).send(result)
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async deletePartner (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await deletePartnerPartnerUseCase.execute(Number(req.params.id))
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND,
          undefined
        )
      }
      return res.status(200).send(result)
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }
}

export default new PartnerController()
