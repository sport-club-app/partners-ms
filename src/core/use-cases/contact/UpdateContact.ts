import { ContactRepositoryDb, IContactRepositoryDbMethods } from "@Repository/ContactRepositoryDb"
import { Contact } from "@Core/entity"

export class UpdateOneContact {
    private contactRepository: IContactRepositoryDbMethods
    constructor (contactRepository: ContactRepositoryDb) {
      this.contactRepository = contactRepository
    }

    async execute (id: number, partnerId: number, contact: Contact) {
      return this.contactRepository.updateContact(id, partnerId, contact)
    }
}
