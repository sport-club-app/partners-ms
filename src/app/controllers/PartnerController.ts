import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { Partner } from "@/app/core/entity"
import { partnerFactory } from "@/app/factories/partner-factory"
import { errorHandlerMiddleware } from "@/app/middleware/error-handler"
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
      const result = await updatePartnerPartnerUseCase.execute(Number(id), data)
      return res.status(204).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getPartner (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    try {
      const result = await getPartnerPartnerUseCase.execute(Number(id))
      return res.status(200).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getAllPartners (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAllPartnerPartnerUseCase.execute()
      return res.status(200).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async deletePartner (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    try {
      const result = await deletePartnerPartnerUseCase.execute(Number(id))
      return res.status(204).send(result)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}

export default new PartnerController()
