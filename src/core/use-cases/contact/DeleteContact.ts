import { ContactRepositoryDb } from "@Repository/ContactRepositoryDb"
import { Contact } from "@Core/entity"

export class DeleteContact {
  constructor (private contactRepository: ContactRepositoryDb) {
    this.contactRepository = contactRepository
  }

  async execute (id: number, partnerId: number) {
    const data = Contact.delete(id, partnerId)
    return this.contactRepository.delete(data.id, data.partnerId)
  }
}
