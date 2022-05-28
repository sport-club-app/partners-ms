import niv from "node-input-validator"
import { modalityTanslate } from "./modalityTranslate"

export type Erros = {
    status: number,
    body: Object
}

export async function fieldValidated (data: any) {
  if (!data?.body) {
    const error = {
      status: 400,
      body: "Erro ao processar requisição"
    }
    return error
  }

  const v = new niv.Validator(data.body, {
    name: "required|string"
  })

  niv.addCustomMessages({
    "name.required": modalityTanslate.required.name
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
