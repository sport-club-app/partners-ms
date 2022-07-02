import { Modality } from "@/app/core/entity"
import { DataSource } from "typeorm"
import { ModalityModel } from "../models/ModalityModel"

export const modalityFactory: Modality[] =
    [
      { name: "futebol", description: "esporte" },
      { name: "basquete", description: "esporte" },
      { name: "jiujitsu", description: "esporte" },
      { name: "karatê", description: "esporte" },
      { name: "natação", description: "esporte" }

    ]

export async function runFactory (connection: DataSource) {
  async function deleteTable () {
    await connection.query(`DELETE FROM partner_model`)
    await connection.query(`ALTER TABLE partner_model AUTO_INCREMENT = 1`)
    await connection.query(`DELETE FROM modality_model`)
    await connection.query(`ALTER TABLE modality_model AUTO_INCREMENT = 1`)
    await connection.query(`DELETE FROM contact_model`)
    await connection.query(`ALTER TABLE contact_model AUTO_INCREMENT = 1`)
    await connection.query(`DELETE FROM contract_model`)
    await connection.query(`ALTER TABLE contract_model AUTO_INCREMENT = 1`)
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
