const assessmentModel = require("../models/assessmentModel");
const manualMuscleTestModel = require("../models/assessmentSubModels/manualMuscleTestingModel");
const neurologicalScreeningModel = require("../models/assessmentSubModels/neurologicalScreeningModel");
const observationAndInspectionModel = require("../models/assessmentSubModels/observationAndInspectionModel");
const painAssessmentModel = require("../models/assessmentSubModels/painAssessment");
const romModel = require("../models/assessmentSubModels/romModel");
const specialTestModel = require("../models/assessmentSubModels/specialTestsModel");
const therapistNotesAssessmentModel = require("../models/assessmentSubModels/therapistNotesModel");
const endEvaluationConclusion = require("../models/conclusionModel");
const intakeModel = require("../models/intakeModel");
const chiefComplaintModel = require("../models/intakeSubModels/chiefComplaintModel");
const familySocialHistoryModel = require("../models/intakeSubModels/familySocialHistoryModel");
const functionalStatusModel = require("../models/intakeSubModels/functionalStatusModel");
const lifestyleFactorsModel = require("../models/intakeSubModels/lifestyleFactorsModel");
const medicalHistoryModel = require("../models/intakeSubModels/medicalHistoryModel");
const mskInjuryHistoryModel = require("../models/intakeSubModels/mskInjuryHistoryModel");
const patientGoalsModel = require("../models/intakeSubModels/patientGoalsModels");
const therapistNotesModel = require("../models/intakeSubModels/therapistNotesModel");
const patientsModel = require("../models/patientsModel");
const treatmentPlan = require("../models/treatmentPlanModel");
const longTermGoal = require("../models/treatmentSubModels/longTermGoalsModel");
const plannedIntervention = require("../models/treatmentSubModels/plannedInterventionsModel");
const shortTermGoal = require("../models/treatmentSubModels/shortTermGoalsModel");

const endEvaluationController = {
  createConclusion: async (req, res) => {
    const { intakeId } = req.params;
    const { conclusionText } = req.body;

    try {
      const intake = await intakeModel.findByPk(intakeId);
      if (!intake) {
        return res.status(404).send("Intake not found.");
      }

      const conclusion = await endEvaluationConclusion.create({
        intakeId: parseInt(intakeId),
        conclusionText,
      });

      res.status(201).json({
        message: "End-evaluation conclusion created successfully",
        conclusion,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating end-evaluation conclusion.");
    }
  },

  getEndEvaluation: async (req, res) => {
    const { intakeId } = req.params;

    try {
      const intakeData = await intakeModel.findByPk(intakeId, {
        include: [
          { model: patientsModel },
          { model: chiefComplaintModel },
          { model: medicalHistoryModel },
          { model: mskInjuryHistoryModel },
          { model: functionalStatusModel },
          { model: lifestyleFactorsModel },
          { model: familySocialHistoryModel },
          { model: patientGoalsModel },
          { model: therapistNotesModel },
          {
            model: assessmentModel,
            include: [
              { model: observationAndInspectionModel },
              { model: romModel },
              { model: painAssessmentModel },
              { model: neurologicalScreeningModel },
              { model: therapistNotesAssessmentModel },
              { model: manualMuscleTestModel },
              { model: specialTestModel },
            ],
          },
          {
            model: treatmentPlan,
            include: [
              { model: shortTermGoal },
              { model: longTermGoal },
              { model: plannedIntervention },
            ],
          },
          { model: endEvaluationConclusion },
        ],
      });

      if (!intakeData) {
        return res.status(404).send("Intake not found.");
      }

      res.status(200).json(intakeData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching intake end-evaluation.");
    }
  },
};

module.exports = endEvaluationController;
