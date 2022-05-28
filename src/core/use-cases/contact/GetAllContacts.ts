import { ContactRepositoryDb, IContactRepositoryDbMethods } from "@Repository/ContactRepositoryDb"

export class GetAllContacts {
    private contactRepository: IContactRepositoryDbMethods
    constructor (contactRepository: ContactRepositoryDb) {
      this.contactRepository = contactRepository
    }

    async execute () {
      return this.contactRepository.find()
    }
}
