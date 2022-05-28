import { ContactRepositoryDb, IContactRepositoryDbMethods } from "@Repository/ContactRepositoryDb"
import { Contact } from "@Core/entity"

export class GetEmailContact {
    private contactRepository: IContactRepositoryDbMethods
    constructor (contactRepository: ContactRepositoryDb) {
      this.contactRepository = contactRepository
    }

    async execute (contact: Contact[]) {
      return this.contactRepository.findEmail(contact)
    }
}
