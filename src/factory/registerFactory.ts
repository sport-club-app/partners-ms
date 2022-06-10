import { GetEmailContact, SaveContact } from "@Core/use-cases/contact"
import { SaveContract } from "@Core/use-cases/contract/SaveContract"
import { SaveModality, GetModalityList } from "@Core/use-cases/modality"
import { PartnerRepositoryDb } from "@Repository/PartnerRepositoryDb"
import { ModalityRepositoryDb } from "@Repository/ModalityRepositoryDb"
import { ContactRepositoryDb } from "@Repository/ContactRepositoryDb"
import { ContractRepositoryDb } from "@Repository/ContractRepositoryDb"
import { ProducerNotification } from "@Core/use-cases/notification/ProducerNotification"
import { kafka } from "@Infra/services/kafka/config"
import {
  SavePartner,
  GetFullRegisterDataPartner
} from "@Core/use-cases/partner"

export const registerFactory = () => {
  const partnerRepository = new PartnerRepositoryDb()
  const savePartnerUseCase = new SavePartner(partnerRepository)
  const getFullRegisterDataPartner = new GetFullRegisterDataPartner(partnerRepository)

  const contactRepository = new ContactRepositoryDb()
  const saveContactUseCase = new SaveContact(contactRepository)
  const getContactUseCase = new GetEmailContact(contactRepository)

  const modalityRepository = new ModalityRepositoryDb()
  const saveModalityUseCase = new SaveModality(modalityRepository)
  const getModalityUseCase = new GetModalityList(modalityRepository)

  const contractRepository = new ContractRepositoryDb()
  const saveContractUseCase = new SaveContract(contractRepository)

  const producerNotification = new ProducerNotification(kafka)

  return {
    savePartnerUseCase,
    getFullRegisterDataPartner,
    saveContactUseCase,
    getContactUseCase,
    saveModalityUseCase,
    getModalityUseCase,
    saveContractUseCase,
    producerNotification
  }
}
