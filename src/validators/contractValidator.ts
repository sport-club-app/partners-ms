import niv from "node-input-validator"
import { contractTranslate } from "./contractTranslate"

export type Erros = {
    status: number,
    body: Object
}

export async function fieldValidated (data: any) {
  if (!data) {
    const error = {
      status: 400,
      body: "Erro ao processar requisição"
    }
    return error
  }

  const v = new niv.Validator(data, {
    start: "required|date",
    dueDate: "date",
    isActive: "required|boolean",
    status: "required|string",
    modalityId: "required|integer",
    partnerId: "required|integer"
  })

  niv.addCustomMessages({
    "start.required": contractTranslate.required.start,
    "dueDate.required": contractTranslate.required.dueDate,
    "isActive.required": contractTranslate.required.isActive,
    "status.required": contractTranslate.required.status,
    "modalityId.required": contractTranslate.required.modalityId,
    "partnerId.required": contractTranslate.required.partnerId,

    "start.date": contractTranslate.custom.date,
    "dueDate.date": contractTranslate.custom.date,
    "isActive.boolean": contractTranslate.type.boolean,
    "status.string": contractTranslate.type.string,

    "modalityId.integer": contractTranslate.type.integer,
    "partnerId.integer": contractTranslate.type.integer
  })

  const matched = await v.check()

  if (!matched) {
    const error = {
      status: 422,
      body: v.errors
    }
    return error
  }
}
