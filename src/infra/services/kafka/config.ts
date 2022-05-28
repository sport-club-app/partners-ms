import { Kafka } from "kafkajs"

export const kafka = new Kafka({
  clientId: "partner-app",
  brokers: ["kafka:29092"]
})
