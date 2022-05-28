import { ContractRepositoryDb, IContractRepositoryDbMethods } from "@Repository/ContractRepositoryDb"
import { Contract } from "@Core/entity"
import { addMonths, compareAsc, parseISO, compareDesc, subMonths } from "date-fns"

export class UpdateContractStatus {
    private contractRepository: IContractRepositoryDbMethods
    constructor (contractRepository: ContractRepositoryDb) {
      this.contractRepository = contractRepository
    }

    async execute (id: number, partnerId: number, contract: Contract) {
      if (!contract.status) return !contract.status

      const start = parseISO(String(contract.start))
      const end = parseISO(String(contract.dueDate))
      const resultCalcDueDate = compareAsc(parseISO(String(contract.start)), parseISO(String(contract.dueDate)))
      const resultCalcStartDate = compareDesc(parseISO(String(contract.start)), parseISO(String(contract.dueDate)))
      const startDateAddMonth = addMonths(parseISO(String(contract.start)), 1)
      const endDateSubMonth = subMonths(parseISO(String(contract.dueDate)), 1)

      const data: Contract = {
        ...contract,
        status: contract.isActive == true ? "ativo" : contract.status,
        start: resultCalcStartDate == 1 ? endDateSubMonth : start,
        dueDate: resultCalcDueDate == 1 ? startDateAddMonth : end
      }
      return this.contractRepository.updateWithPartner(id, partnerId, data)
    }
}
