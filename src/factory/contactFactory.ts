import { ContactRepositoryDb } from "@Repository/ContactRepositoryDb"
import {
  SaveOneContact,
  UpdateOneContact,
  DeleteContact,
  GetContact,
  GetAllContacts
} from "@Core/use-cases/contact"
import { ProducerNotification } from "@Core/use-cases/notification/ProducerNotification"
import { kafka } from "@Infra/services/kafka/config"

export const contactFactory = () => {
  const contactRepository = new ContactRepositoryDb()
  const saveContactUseCase = new SaveOneContact(contactRepository)
  const updateContactUseCase = new UpdateOneContact(contactRepository)
  const deleteContactUseCase = new DeleteContact(contactRepository)
  const getContactUseCase = new GetContact(contactRepository)
  const getAllContacts = new GetAllContacts(contactRepository)
  const producerNotification = new ProducerNotification(kafka)

  return {
    saveContactUseCase,
    updateContactUseCase,
    deleteContactUseCase,
    getContactUseCase,
    getAllContacts,
    producerNotification

  }
}
