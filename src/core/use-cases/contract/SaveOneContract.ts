import { ContractRepositoryDb, IContractRepositoryDbMethods } from "@Repository/ContractRepositoryDb"
import { Contract } from "@Core/entity"
import { addMonths, format, compareAsc, parseISO, compareDesc, subMonths } from "date-fns"

export class SaveOneContract {
    private contractRepository: IContractRepositoryDbMethods
    constructor (contractRepository: ContractRepositoryDb) {
      this.contractRepository = contractRepository
    }

    async execute (contract: Contract) {
      if (!contract.status) return !contract.status

      if (contract.dueDate) {
        const start = parseISO(String(contract.start))
        const end = parseISO(String(contract.dueDate))
        const resultCalcDueDate = compareAsc(parseISO(String(contract.start)), parseISO(String(contract.dueDate)))
        const resultCalcStartDate = compareDesc(parseISO(String(contract.start)), parseISO(String(contract.dueDate)))
        const startDateAddMonth = addMonths(parseISO(String(contract.start)), 1)
        const endDateSubMonth = subMonths(parseISO(String(contract.dueDate)), 1)

        const dataContract: Contract = {
          ...contract,
          status: contract.isActive ? "ativo" : contract.status,
          start: resultCalcStartDate == 1 ? endDateSubMonth : start,
          dueDate: resultCalcDueDate == 1 ? startDateAddMonth : end
        }
        return this.contractRepository.create(dataContract)
      }
      const start = parseISO(String(contract.start))
      let dueDate = addMonths(parseISO(String(contract.start)), 1)
      dueDate = parseISO(format(dueDate, "yyy-MM-dd"))
      const dataContract: Contract = {
        ...contract,
        start: start,
        dueDate: dueDate
      }
      return this.contractRepository.create(dataContract)
    }
}
