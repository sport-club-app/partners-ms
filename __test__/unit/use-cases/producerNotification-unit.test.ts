import { ProducerNotification } from "@/app/core/use-cases/notification/ProducerNotification"
import { kafka } from "@/infra/services/kafka/config"

describe("Testes unitários de notificacoes", () => {
  it("Deve injetar uma instancia do kafka", () => {
    const producerNotification = new ProducerNotification(kafka)
    expect(producerNotification).toBeDefined()
  })
})
