import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { fieldValidated } from "@Validators/contactValidator"
import { contactFactory } from "@Factory/contactFactory"
import { Contact } from "@Core/entity"
import { errorHandler } from "../exceptions/error-handler"
import { APIError } from "../exceptions/base-error"
import { HttpStatusCode } from "src/exceptions/interfaces"
import businessError from "../exceptions/business-error"

const {
  deleteContactUseCase,
  getAllContacts,
  getContactUseCase,
  producerNotification,
  saveContactUseCase,
  updateContactUseCase
} = contactFactory()

class ContractController {
  async saveOneContact (req: Request, res: Response, next: NextFunction) {
    const data: Contact = req.body
    try {
      if (!data) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      }
      const matched = await fieldValidated(data)
      if (matched) {
        throw new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          matched
        )
      }
      const result = await saveContactUseCase.execute(data)
      await producerNotification.execute(JSON.stringify(result), process.env.PARTNER_TOPIC_CONTACT)
      return res.status(201).send(result)
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async getContact (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getContactUseCase.execute(Number(req.params.id))
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTACT_NOT_FOUND,
          undefined
        )
      }
      return res.status(200).send(result)
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async getAllContacts (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAllContacts.execute()
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTACT_NOT_FOUND,
          undefined
        )
      }
      return res.status(200).send(result)
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async updateContact (req: Request, res: Response, next: NextFunction) {
    const data: Contact = req.body
    try {
      if (!data) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      }
      if (!data.partnerId) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND,
          undefined
        )
      }
      const result = await updateContactUseCase.execute(
        Number(req.params.id),
        data.partnerId,
        data
      )
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTACT_NOT_FOUND,
          undefined
        )
      }
      await producerNotification.execute(JSON.stringify(result), process.env.PARTNER_TOPIC_CONTACT)
      return res.status(201).send(result)
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }

  async deleteContact (req: Request, res: Response, next: NextFunction) {
    const data: Contact = req.body
    try {
      if (!data) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      }
      if (!data.partnerId) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND,
          undefined
        )
      }
      const result = await deleteContactUseCase.execute(Number(req.params.id))
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND,
          undefined
        )
      }
      return res.status(204).send(result)
    } catch (error) {
      return errorHandler.returnError(error, req, res, next)
    }
  }
}

export default new ContractController()
