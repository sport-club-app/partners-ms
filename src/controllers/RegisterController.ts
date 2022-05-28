import "dotenv/config"
import { Request, Response } from "express"
import { fieldValidated, Erros } from "@Validators/registerValidator"
import {
  SavePartner,
  GetFullRegisterDataPartner
} from "@Core/use-cases/partner"
import { GetEmailContact, SaveContact } from "@Core/use-cases/contact"
import { SaveContract } from "@Core/use-cases/contract/SaveContract"
import { SaveModality, GetModalityList } from "@Core/use-cases/modality"
import { PartnerRepositoryDb } from "@Repository/PartnerRepositoryDb"
import { ModalityRepositoryDb } from "@Repository/ModalityRepositoryDb"
import { ContactRepositoryDb } from "@Repository/ContactRepositoryDb"
import { ContractRepositoryDb } from "@Repository/ContractRepositoryDb"
import { resultSavePartner } from "@Utils/deliveryFormatData/partner"
import { ProducerNotification } from "@Core/use-cases/notification/ProducerNotification"
import { kafka } from "@Infra/services/kafka/config"

const partnerRepository = new PartnerRepositoryDb()
const savePartnerUseCase = new SavePartner(partnerRepository)
const getFullRegisterDataPartner = new GetFullRegisterDataPartner(
  partnerRepository
)

const contactRepository = new ContactRepositoryDb()
const saveContactUseCase = new SaveContact(contactRepository)
const getContactUseCase = new GetEmailContact(contactRepository)

const modalityRepository = new ModalityRepositoryDb()
const saveModalityUseCase = new SaveModality(modalityRepository)
const getModalityUseCase = new GetModalityList(modalityRepository)

const contractRepository = new ContractRepositoryDb()
const saveContractUseCase = new SaveContract(contractRepository)

const producerNotification = new ProducerNotification(kafka)

class RegisterController {
  async saveRegister (req: Request, res: Response) {
    try {
      const matched: Erros = await fieldValidated(req.body)
      if (matched) {
        return res.status(matched.status).send(matched.body)
      } else {
        const dataContact = req.body.contacts
        const findEmail: any = await getContactUseCase.execute(
          dataContact
        )
        if (findEmail.length > 0) return res.status(422).send({ message: "Erro ao processar requisição" })
        const contacts = await saveContactUseCase.execute(dataContact)

        await producerNotification.execute(JSON.stringify(contacts))

        const dataModalities = req.body.modalities
        const resultModality: any = await getModalityUseCase.execute(
          dataModalities
        )
        const modalities = await saveModalityUseCase.execute(
          resultModality
        )

        const dataPartner = req.body.partner
        dataPartner.contacts = contacts
        dataPartner.modalities = modalities
        const partner = await savePartnerUseCase.execute(dataPartner)
        const contract = await saveContractUseCase.execute(
          dataModalities,
          partner.id
        )

        const resultformatData = resultSavePartner(partner, contract)
        return res.status(201).send(resultformatData)
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async getRegister (req: Request, res: Response) {
    try {
      const result = await getFullRegisterDataPartner.execute(
        Number(req.params.partnerId),
        ["contacts", "modalities", "contracts"]
      )
      return res.status(200).send(result)
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res
        .status(500)
        .send({ message: "Erro! contate o administrador do sistema" })
    }
  }
}

export default new RegisterController()
