import "dotenv/config"
import { Request, Response } from "express"
import { fieldValidated } from "@Validators/contactValidator"
import { Erros } from "@Validators/registerValidator"
import { contactFactory } from "@Factory/contactFactory"
import { Contact } from "@Core/entity"

const factory = contactFactory()

class ContractController {
  async saveOneContact (req: Request, res: Response) {
    const data: Contact = req.body
    try {
      const matched: Erros = await fieldValidated(data)
      if (matched) {
        return res.status(matched.status).send(matched.body)
      } else {
        const result = await factory.saveContactUseCase.execute(data)
        await factory.producerNotification.execute(JSON.stringify(result), process.env.PARTNER_TOPIC_CONTACT)
        return res.status(201).send(result)
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async getContract (req: Request, res: Response) {
    try {
      const result = await factory.getContactUseCase.execute(
        Number(req.params.id)
      )
      if (!result) {
        return res
          .status(400)
          .send({ message: "Erro ao processar requisição" })
      }
      return res.status(200).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async getAllContacts (req: Request, res: Response) {
    try {
      const result = await factory.getAllContacts.execute()
      if (!result) return res.status(400).send({ message: "Erro ao processar requisição" })
      return res.status(200).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async updateContact (req: Request, res: Response) {
    const data: Contact = req.body
    try {
      if (!data.partnerId) {
        return res.status(422).send({ message: "Dados inválidos!" })
      }
      const result = await factory.updateContactUseCase.execute(
        Number(req.params.id),
        data.partnerId,
        data
      )
      await factory.producerNotification.execute(JSON.stringify(result), process.env.PARTNER_TOPIC_CONTACT)
      return res.status(201).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async deleteContact (req: Request, res: Response) {
    const data: Contact = req.body
    try {
      if (!data.partnerId) return res.status(422).send({ message: "Dados inválidos!" })
      const result = await factory.deleteContactUseCase.execute(
        Number(req.params.id),
        data.partnerId
      )
      return res.status(204).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }
}

export default new ContractController()
