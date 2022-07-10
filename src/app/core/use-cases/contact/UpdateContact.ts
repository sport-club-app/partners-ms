import { ContactRepositoryDb, IContactRepositoryDbMethods } from "@/app/repository/ContactRepositoryDb"
import { Contact } from "@/app/core/entity"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"
import { APIError } from "@/app/exceptions/base-error"

export class UpdateOneContact {
    private contactRepository: IContactRepositoryDbMethods
    constructor (contactRepository: ContactRepositoryDb) {
      this.contactRepository = contactRepository
    }

    async execute (id: number, partnerId: number, contact: Contact) {
      if (!contact) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      }
      if (!partnerId) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND,
          undefined
        )
      }
      const result = await this.contactRepository.updateContact(id, partnerId, contact)
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
