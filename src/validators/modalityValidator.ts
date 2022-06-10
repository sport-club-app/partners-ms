import niv from "node-input-validator"
import { modalityTanslate } from "./modalityTranslate"

export async function fieldValidated (data: any) {
  const v = new niv.Validator(data.body, {
    name: "required|string"
  })

  niv.addCustomMessages({
    "name.required": modalityTanslate.required.name
  })

  const matched = await v.check()

  if (!matched) return v.errors
}
