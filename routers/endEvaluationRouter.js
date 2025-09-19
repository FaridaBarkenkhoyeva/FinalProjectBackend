const { Router } = require("express");
const endEvaluationController = require("../controllers/endEvaluationControllers");

const endEvaluationRouter = Router();

endEvaluationRouter.post(
  "/:intakeId/endevaluationconclusion",
  endEvaluationController.createConclusion
);

endEvaluationRouter.get(
  "/intake/:intakeId/endevaluation",
  endEvaluationController.getEndEvaluation
);

module.exports = endEvaluationRouter;
