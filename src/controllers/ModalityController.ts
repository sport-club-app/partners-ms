import "dotenv/config"
import { Request, Response } from "express"
import { fieldValidated } from "@Validators/modalityValidator"
import { Erros } from "@Validators/registerValidator"
import { modalityFactory } from "@Factory/modalityFactory"

const factory = modalityFactory()
class ModalityController {
  async saveModality (req: Request, res: Response) {
    try {
      const matched: Erros = await fieldValidated(req)
      if (matched) {
        return res.status(matched.status).send(matched.body)
      } else {
        const result = await factory.saveModalityUseCase.execute(req.body)
        return res.status(201).send(result)
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") { return res.status(500).send(error) }
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async getAllModality (req: Request, res: Response) {
    try {
      const result = await factory.getAllModalityUseCase.execute()
      if (!result) {
        return res
          .status(400)
          .send({ message: "Erro ao processar requisição" })
      }
      return res.status(200).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") { return res.status(500).send(error) }
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async getModality (req: Request, res: Response) {
    try {
      const result = await factory.getModalityUseCase.execute(
        Number(req.params.id)
      )
      if (!result) {
        return res
          .status(400)
          .send({ message: "Erro ao processar requisição" })
      }
      return res.status(200).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") { return res.status(500).send(error) }
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async updateModality (req: Request, res: Response) {
    const data = req.body
    try {
      const result = await factory.updateModalityUseCase.execute(
        Number(req.params.id),
        data
      )
      if (result.affected == 0) return res.status(400).send(result)
      return res.status(201).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") { return res.status(500).send(error) }
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async deleteModality (req: Request, res: Response) {
    try {
      const result = await factory.deleteModalityUseCase.execute(
        Number(req.params.id)
      )
      if (result.affected == 0) return res.status(400).send(result)
      return res.status(204).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") { return res.status(500).send(error) }
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }
}

export default new ModalityController()
