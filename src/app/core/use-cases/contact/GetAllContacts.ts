import { ContactRepositoryDb, IContactRepositoryDbMethods } from "@/app/repository/ContactRepositoryDb"

export class GetAllContacts {
    private contactRepository: IContactRepositoryDbMethods
    constructor (contactRepository: ContactRepositoryDb) {
      this.contactRepository = contactRepository
    }

    async execute () {
      return this.contactRepository.find()
    }
}
