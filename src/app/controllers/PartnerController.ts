import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { fieldValidated } from "@/app/validators/partnerValidation"
import { Partner } from "@/app/core/entity"
import { partnerFactory } from "@/app/factories/partner-factory"
import { errorHandlerMiddleware } from "@/app/middleware/error-handler"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"
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
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async updatePartner (req: Request, res: Response, next: NextFunction) {
    const data: Partner = req.body
    const id = req.params.id
    try {
      if (!id || !data) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND,
          undefined
        )
      }
      const result = await updatePartnerPartnerUseCase.execute(Number(id), data)
      if (result.affected == 0) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND,
          undefined
        )
      }
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getPartner (req: Request, res: Response, next: NextFunction) {
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
      const result = await getPartnerPartnerUseCase.execute(Number(id))
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
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getAllPartners (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers?.authorization) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      }
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
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async deletePartner (req: Request, res: Response, next: NextFunction) {
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
      const result = await deletePartnerPartnerUseCase.execute(Number(id))
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
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}

export default new PartnerController()
