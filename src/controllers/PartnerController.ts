import "dotenv/config"
import { Request, Response } from "express"
import { fieldValidated } from "@Validators/partnerValidation"
import { Erros } from "@Validators/registerValidator"
import {
  DeletePartner,
  GetPartner,
  SavePartner,
  GetAllPartner,
  UpdatePartner
} from "@Core/use-cases/partner"
import { PartnerRepositoryDb } from "@Repository/PartnerRepositoryDb"
import { Partner } from "@Core/entity"

const partnerRepository = new PartnerRepositoryDb()
const savePartnerUseCase = new SavePartner(partnerRepository)
const updatePartnerPartnerUseCase = new UpdatePartner(partnerRepository)
const getPartnerPartnerUseCase = new GetPartner(partnerRepository)
const getAllPartnerPartnerUseCase = new GetAllPartner(partnerRepository)
const deletePartnerPartnerUseCase = new DeletePartner(partnerRepository)

class PartnerController {
  async savePartner (req: Request, res: Response) {
    const data: Partner = req.body
    try {
      const matched: Erros = await fieldValidated(data)
      if (matched) {
        return res.status(matched.status).send(matched.body)
      } else {
        const result = await savePartnerUseCase.execute(data)
        return res.status(201).send(result)
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async updatePartner (req: Request, res: Response) {
    const data: Partner = req.body
    try {
      const result = await updatePartnerPartnerUseCase.execute(
        Number(req.params.id),
        data
      )
      return res.status(201).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async getPartner (req: Request, res: Response) {
    try {
      const result = await getPartnerPartnerUseCase.execute(
        Number(req.params.id)
      )
      if (!result) return res.status(400).send({ message: "Erro ao processar requisição" })
      return res.status(200).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async getAllPartners (req: Request, res: Response) {
    try {
      const result = await getAllPartnerPartnerUseCase.execute()
      if (!result) return res.status(400).send({ message: "Erro ao processar requisição" })
      return res.status(200).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async deletePartner (req: Request, res: Response) {
    try {
      const result = await deletePartnerPartnerUseCase.execute(
        Number(req.params.id)
      )
      if (!result) return res.status(400).send({ message: "Erro ao processar requisição" })
      return res.status(200).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }
}

export default new PartnerController()
