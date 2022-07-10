import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { ContactRepositoryDb, IContactRepositoryDbMethods } from "@/app/repository/ContactRepositoryDb"

export class GetAllContacts {
    private contactRepository: IContactRepositoryDbMethods
    constructor (contactRepository: ContactRepositoryDb) {
      this.contactRepository = contactRepository
    }

    async execute () {
      const result = await this.contactRepository.find()
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTACT_NOT_FOUND,
          undefined
        )
      }
      return result
    }
}
