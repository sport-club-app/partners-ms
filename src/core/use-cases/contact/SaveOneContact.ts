import { ContactRepositoryDb, IContactRepositoryDbMethods } from "@Repository/ContactRepositoryDb"
import { Contact } from "@Core/entity"

export class SaveOneContact {
    private contactRepository: IContactRepositoryDbMethods
    constructor (contactRepository: ContactRepositoryDb) {
      this.contactRepository = contactRepository
    }

    async execute (contact: Contact) {
      const contactCreate = Contact.create(contact)
      return this.contactRepository.saveOneContact(contactCreate)
    }
}
