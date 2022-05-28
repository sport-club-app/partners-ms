
import express from "express"
import PartnerController from "@Controllers/PartnerController"
import ModalityController from "@Controllers/ModalityController"
import ContractController from "@Controllers/ContractController"
import RegisterController from "@Controllers/RegisterController"
import ContactController from "@Controllers/ContactController"
import { keycloak } from "@Infra/services/keycloak/config"

export const router = express.Router()

router.get("/contacts", keycloak.protect("view"), ContactController.getAllContacts)
router.get("/contacts/:id", keycloak.protect("view"), ContactController.getContract)
router.post("/contacts", keycloak.protect("edit"), ContactController.saveOneContact)
router.put("/contacts/:id/update", keycloak.protect("edit"), ContactController.updateContact)
router.delete("/contacts/:id/delete", keycloak.protect("delete"), ContactController.deleteContact)

router.get("/partners", keycloak.protect("view"), PartnerController.getAllPartners)
router.get("/partners/:id", keycloak.protect("view"), PartnerController.getPartner)
router.post("/partners", keycloak.protect("edit"), PartnerController.savePartner)
router.put("/partners/:id/update", keycloak.protect("edit"), PartnerController.updatePartner)
router.delete("/partners/:id/delete", keycloak.protect("delete"), PartnerController.deletePartner)

router.get("/modalities", keycloak.protect("view"), ModalityController.getAllModality)
router.get("/modalities/:id", keycloak.protect("view"), ModalityController.getModality)
router.post("/modalities", keycloak.protect("edit"), ModalityController.saveModality)
router.put("/modalities/:id/update", keycloak.protect("edit"), ModalityController.updateModality)
router.delete("/modalities/:id/delete", keycloak.protect("delete"), ModalityController.deleteModality)

router.get("/contracts", keycloak.protect("view"), ContractController.getAllContracts)
router.get("/contracts/:id", keycloak.protect("view"), ContractController.getContract)
router.post("/contracts/one", keycloak.protect("edit"), ContractController.saveOneContract)
router.put("/contracts/:id/update", keycloak.protect("edit"), ContractController.updateContractStatus)
router.delete("/contracts/:id/delete", keycloak.protect("delete"), ContractController.deleteContract)

router.get("/register/:partnerId", keycloak.protect("view"), RegisterController.getRegister)
router.post("/register", keycloak.protect("edit"), RegisterController.saveRegister)
