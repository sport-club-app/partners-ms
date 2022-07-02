import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { fieldValidated } from "@/app/validators/registerValidator"
import { registerContainer } from "@/app/factories/register-container"
import { errorHandlerMiddleware } from "@/app/middleware/error-handler"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"

const {
  getContactUseCase,
  getFullRegisterDataPartner,
  getModalityUseCase,
  producerNotification,
  saveContactUseCase,
  saveContractUseCase,
  saveModalityUseCase,
  savePartnerUseCase,
  savePartnersDTOResponse
} = registerContainer()
class RegisterController {
  async saveRegister (req: Request, res: Response, next: NextFunction) {
    try {
      const matched = await fieldValidated(req.body)
      if (matched) {
        throw new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          matched
        )
      }
      const dataContact = req.body.contacts
      const findEmail: any = await getContactUseCase.execute(dataContact)
      if (findEmail.length > 0) {
        throw new APIError("INTERNAL_SERVER",
          HttpStatusCode.INTERNAL_SERVER,
          true,
          businessError.GENERIC,
          undefined
        )
      }
      const contacts = await saveContactUseCase.execute(dataContact)

      await producerNotification.execute(JSON.stringify(contacts), "partners-ms-notification")

      const dataModalities = req.body.modalities
      const resultModality: any = await getModalityUseCase.execute(dataModalities)
      const modalities = await saveModalityUseCase.execute(resultModality)

      const dataPartner = req.body.partner
      dataPartner.contacts = contacts
      dataPartner.modalities = modalities
      const partner = await savePartnerUseCase.execute(dataPartner)
      const contract = await saveContractUseCase.execute(dataModalities, partner.id)

      const resultformatData = savePartnersDTOResponse.execute(partner, contract)
      return res.status(201).send(resultformatData)
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
