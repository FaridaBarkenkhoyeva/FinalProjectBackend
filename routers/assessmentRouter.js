const { Router } = require("express");
const assessmentController = require("../controllers/assessmentControllers");

const assessmentRouter = Router();

assessmentRouter.post(
  "/intakes/:id/assessments",
  assessmentController.createAssessment
);

assessmentRouter.get(
  "/intakes/:id/assessments",
  assessmentController.getAssessmentFromIntake
);

assessmentRouter.get(
  "/assessments/:id",
  assessmentController.getSpecificAssessment
);

module.exports = assessmentRouter;
