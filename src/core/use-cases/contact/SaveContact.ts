import { ContactRepositoryDb, IContactRepositoryDbMethods } from "@Repository/ContactRepositoryDb"
import { Contact } from "@Core/entity"

export class SaveContact {
    private contactRepository: IContactRepositoryDbMethods
    constructor (contactRepository: ContactRepositoryDb) {
      this.contactRepository = contactRepository
    }

    async execute (contact: Contact[]) {
      return this.contactRepository.create(contact)
    }
}
