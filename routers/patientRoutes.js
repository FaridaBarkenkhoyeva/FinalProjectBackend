const { Router } = require("express");
const patientController = require("../controllers/patientControllers");

const patientRouter = Router();

patientRouter.post("", patientController.createPatient);
// get :  (get a list of all patients)
patientRouter.get("", patientController.allPatients);

// get : /:id (get one specific patient by id)
patientRouter.get("/:id", patientController.getPatient);

module.exports = patientRouter;
