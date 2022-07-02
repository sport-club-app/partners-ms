import { ContactRepositoryDb, IContactRepositoryDbMethods } from "@/app/repository/ContactRepositoryDb"
import { Contact } from "@/app/core/entity"

export class SaveOneContact {
    private contactRepository: IContactRepositoryDbMethods
    constructor (contactRepository: ContactRepositoryDb) {
      this.contactRepository = contactRepository
    }

    async execute (contact: Contact) {
      return this.contactRepository.saveOneContact(contact)
    }
}
