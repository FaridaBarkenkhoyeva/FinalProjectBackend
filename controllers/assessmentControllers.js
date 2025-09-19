const assessmentModel = require("../models/assessmentModel");
const manualMuscleTestModel = require("../models/assessmentSubModels/manualMuscleTestingModel");
const neurologicalScreeningModel = require("../models/assessmentSubModels/neurologicalScreeningModel");
const observationAndInspectionModel = require("../models/assessmentSubModels/observationAndInspectionModel");
const painAssessmentModel = require("../models/assessmentSubModels/painAssessment");
const romModel = require("../models/assessmentSubModels/romModel");
const specialTestModel = require("../models/assessmentSubModels/specialTestsModel");
const therapistNotesAssessmentModel = require("../models/assessmentSubModels/therapistNotesModel");
const intakeModel = require("../models/intakeModel");
const patientsModel = require("../models/patientsModel");

const assessmentController = {
  createAssessment: async (req, res) => {
    try {
      const intakeId = req.params.id;
      const assessmentData = req.body;

      // Find the intake to ensure it exists
      const intake = await intakeModel.findByPk(intakeId);

      if (!intake) {
        return res.status(404).json({ error: "Intake not found." });
      }

      // Create the assessment record and link it to the intake
      const newAssessment = await assessmentModel.create({
        ...assessmentData,
        intakeId: intakeId,
      });

      res.status(201).json(newAssessment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create assessment." });
    }
  },

  // get assessment by intake ID
  getAssessmentFromIntake: async (req, res) => {
    try {
      const intakeId = req.params.id;

      // Use findAll to get all assessments for the given intakeId
      const assessments = await assessmentModel.findAll({
        where: {
          intakeId: intakeId,
        },
        // Include the related submodels to get all assessment data
        include: [
          { model: observationAndInspectionModel },
          { model: romModel },
          { model: painAssessmentModel },
          { model: neurologicalScreeningModel },
          { model: therapistNotesAssessmentModel },
          { model: manualMuscleTestModel },
          { model: specialTestModel },
          // To get patient data, include the parent Intake model
          // which then includes the Patient model
          { model: intakeModel, include: [patientsModel] },
        ],
      });

      if (assessments.length > 0) {
        res.status(200).json(assessments);
      } else {
        res
          .status(404)
          .json({ message: "No assessments found for this intake." });
      }
    } catch (error) {
      console.error(error); // Log the detailed error
      res
        .status(500)
        .json({ error: "Failed to retrieve assessments for intake." });
    }
  },

  getSpecificAssessment: async (req, res) => {
    try {
      const assessmentId = req.params.id;

      const assessment = await assessmentModel.findByPk(assessmentId, {
        include: [
          // Include all one-to-one relationship submodels
          { model: observationAndInspectionModel },
          { model: romModel },
          { model: painAssessmentModel },
          { model: neurologicalScreeningModel },
          { model: therapistNotesAssessmentModel },

          // Include all one-to-many relationship submodels
          { model: manualMuscleTestModel },
          { model: specialTestModel },

          // Include the parent Intake model and its parent Patient model
          { model: intakeModel, include: [patientsModel] },
        ],
      });

      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found." });
      }

      res.status(200).json(assessment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve assessment." });
    }
  },
};

module.exports = assessmentController;
