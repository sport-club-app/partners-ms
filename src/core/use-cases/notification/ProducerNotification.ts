import { Kafka } from "kafkajs"
import { uuid } from "uuidv4"

export class ProducerNotification {
    private kafka: Kafka;
    constructor (kafka: Kafka) {
      this.kafka = kafka
    }

    async execute (message: string, topic: string) {
      const producer = this.kafka.producer()
      await producer.connect()
      await producer.send({
        topic: topic,
        messages: [{ value: message, key: uuid() }]
      })
      await producer.disconnect()
    }
}
