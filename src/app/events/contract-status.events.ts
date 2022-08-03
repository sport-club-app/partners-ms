import { randomUUID } from "crypto"
import { kafka } from "@/infra/services/kafka/config"

export async function getStatusContractEvent () {
  const consumer = kafka.consumer({ groupId: `partners-ms-${randomUUID()}` })
  await consumer.subscribe({ topic: "payments.transactions.created", fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat }) => {
      console.log({
        key: message.key.toString(),
        value: message.value.toString(),
        headers: message.headers
      })
    }
  })
}
