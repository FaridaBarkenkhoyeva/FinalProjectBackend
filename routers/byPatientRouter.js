const { Router } = require("express");
const byPatientController = require("../controllers/byPatientController");

const byPatientRouter = Router();

byPatientRouter.get("/:patientId", byPatientController);
module.exports = byPatientRouter;


