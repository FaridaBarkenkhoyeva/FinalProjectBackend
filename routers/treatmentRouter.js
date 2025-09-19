const { Router } = require("express");
const treatmentPlanController = require("../controllers/treatmentPlanController");

const treatmentPlanRouter = Router();

treatmentPlanRouter.post(
  "/:intakeId/treatmentPlan",
  treatmentPlanController.createTreatmentPlan
);
treatmentPlanRouter.get(
  "/treatmentPlan/:treatmentPlanId",
  treatmentPlanController.getTreatmentPlanById
);

module.exports = treatmentPlanRouter;
