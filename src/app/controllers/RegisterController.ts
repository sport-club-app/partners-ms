import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { registerFactory } from "@/app/factories/register-factory"
import { errorHandlerMiddleware } from "@/app/middleware/error-handler"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"
import { SavePartnersDTOResponse } from "@/app/dto/register-dto"

const {
  getContactUseCase,
  getFullRegisterDataPartner,
  getModalityUseCase,
  producerNotification,
  saveContactUseCase,
  saveContractUseCase,
  saveModalityUseCase,
  savePartnerUseCase
} = registerFactory()
class RegisterController {
  async saveRegister (req: Request, res: Response, next: NextFunction) {
    await getContactUseCase.execute(req.body.contacts)
    try {
      await getContactUseCase.execute(req.body.contacts)
      const contacts = await saveContactUseCase.execute(req.body.contacts)
      await producerNotification.execute(JSON.stringify(contacts), "partners-ms-notification")
      const resultModality: any = await getModalityUseCase.execute(req.body.modalities)
      const modalities = await saveModalityUseCase.execute(resultModality)

      const dataPartner = req.body.partner
      dataPartner.contacts = contacts
      dataPartner.modalities = modalities
      const partner = await savePartnerUseCase.execute(dataPartner)
      const contract = await saveContractUseCase.execute(req.body.modalities, partner.id)

      const resultformatData = SavePartnersDTOResponse.execute(partner, contract)
      return res.status(201).json(resultformatData)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  async getRegister (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getFullRegisterDataPartner.execute(
        Number(req.params.partnerId),
        ["contacts", "modalities", "contracts"]
      )
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

export default new RegisterController()
