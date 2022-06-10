import {
  DeletePartner,
  GetPartner,
  SavePartner,
  GetAllPartner,
  UpdatePartner
} from "@Core/use-cases/partner"
import { PartnerRepositoryDb } from "@Repository/PartnerRepositoryDb"

export const partnerFactory = () => {
  const partnerRepository = new PartnerRepositoryDb()
  const savePartnerUseCase = new SavePartner(partnerRepository)
  const updatePartnerPartnerUseCase = new UpdatePartner(partnerRepository)
  const getPartnerPartnerUseCase = new GetPartner(partnerRepository)
  const getAllPartnerPartnerUseCase = new GetAllPartner(partnerRepository)
  const deletePartnerPartnerUseCase = new DeletePartner(partnerRepository)

  return {
    savePartnerUseCase,
    updatePartnerPartnerUseCase,
    getPartnerPartnerUseCase,
    getAllPartnerPartnerUseCase,
    deletePartnerPartnerUseCase
  }
}
