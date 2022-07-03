import { GetEmailContact, SaveContact } from "@/app/core/use-cases/contact"
import { SaveContract } from "@/app/core/use-cases/contract/SaveContract"
import { SaveModality, GetModalityList } from "@/app/core/use-cases/modality"
import { PartnerRepositoryDb } from "@/app/repository/PartnerRepositoryDb"
import { ModalityRepositoryDb } from "@/app/repository/ModalityRepositoryDb"
import { ContactRepositoryDb } from "@/app/repository/ContactRepositoryDb"
import { ContractRepositoryDb } from "@/app/repository/ContractRepositoryDb"
import { ProducerNotification } from "@/app/core/use-cases/notification/ProducerNotification"
import { kafka } from "@/infra/services/kafka/config"
import { SavePartnersDTOResponse } from "@/app/dto/register-dto"
import {
  SavePartner,
  GetFullRegisterDataPartner
} from "@/app/core/use-cases/partner"

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

  const savePartnersDTOResponse = new SavePartnersDTOResponse()

  return {
    savePartnerUseCase,
    getFullRegisterDataPartner,
    saveContactUseCase,
    getContactUseCase,
    saveModalityUseCase,
    getModalityUseCase,
    saveContractUseCase,
    producerNotification,
    savePartnersDTOResponse
  }
}
