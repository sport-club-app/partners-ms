import { kafka } from "./config"

export async function callConsumer () {
  const consumer = kafka.consumer({ groupId: "partners-group-id" })
  await consumer.connect()
  await consumer.subscribe({ topic: "partner-contact-topic" })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString()
      })
    }
    // autoCommit: true,
    // autoCommitInterval: 5000
  })
}
