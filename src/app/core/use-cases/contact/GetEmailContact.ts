import { ContactRepositoryDb, IContactRepositoryDbMethods } from "@/app/repository/ContactRepositoryDb"
import { Contact } from "@/app/core/entity"

export class GetEmailContact {
    private contactRepository: IContactRepositoryDbMethods
    constructor (contactRepository: ContactRepositoryDb) {
      this.contactRepository = contactRepository
    }

    async execute (contact: Contact[]) {
      return this.contactRepository.findEmail(contact)
    }
}
