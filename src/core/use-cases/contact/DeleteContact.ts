import { ContactRepositoryDb } from "@Repository/ContactRepositoryDb"
import { Contact } from "@Core/entity"

export class DeleteContact {
  constructor (private contactRepository: ContactRepositoryDb) {
    this.contactRepository = contactRepository
  }

  async execute (id: number) {
    const data = Contact.delete(id)
    return this.contactRepository.delete(data.id)
  }
}
