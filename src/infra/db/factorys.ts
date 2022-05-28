import { Modality } from "@Core/entity"
import { Connection } from "typeorm"
import { ModalityModel } from "../models/ModalityModel"

export const modalityFactory: Modality[] =
    [
      { name: "futebol", description: "esporte" },
      { name: "basquete", description: "esporte" },
      { name: "jiujitsu", description: "esporte" },
      { name: "karatê", description: "esporte" },
      { name: "natação", description: "esporte" }

    ]

export async function runFactory (connection: Connection) {
  async function deleteTable () {
    // await connection.query(`DELETE FROM partner`)
    // await connection.query(`ALTER TABLE partner AUTO_INCREMENT = 1`)
    // await connection.query(`DELETE FROM modality`)
    // await connection.query(`ALTER TABLE modality AUTO_INCREMENT = 1`)
    // await connection.query(`DELETE FROM contact`)
    // await connection.query(`ALTER TABLE contact AUTO_INCREMENT = 1`)
    // await connection.query(`DELETE FROM contract`)
    // await connection.query(`ALTER TABLE contract AUTO_INCREMENT = 1`)
  }

  async function insertData () {
    await connection.createQueryBuilder()
      .insert()
      .into(ModalityModel)
      .values(modalityFactory)
      .execute()
  }

  const execute = async () => {
    await Promise.all([
      await deleteTable(),
      await insertData()
    ])
  }

  execute()
}
