const { Router } = require("express");
const intakeControllers = require("../controllers/intakeControllers");

const intakeRouter = Router();

intakeRouter.post("/:patientId", intakeControllers.createIntakeForPt);

intakeRouter.get("/active", intakeControllers.activeIntakes);

intakeRouter.get("/completed", intakeControllers.completedIntakes);

intakeRouter.get("/:id", intakeControllers.selectedIntake);

intakeRouter.get("", intakeControllers.allIntakes);

// Route to update the intake status
intakeRouter.patch("/:id/status", intakeControllers.updateIntakeStatus);

module.exports = intakeRouter;

module.exports = intakeRouter;
