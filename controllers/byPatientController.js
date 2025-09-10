const intakeModel = require("../models/intakeModel");
const patientsModel = require("../models/patientsModel");
const chiefComplaintModel = require("../models/subModels/chiefComplaintModel");
const familySocialHistoryModel = require("../models/subModels/familySocialHistoryModel");
const functionalStatusModel = require("../models/subModels/functionalStatusModel");
const lifestyleFactorsModel = require("../models/subModels/lifestyleFactorsModel");
const medicalHistoryModel = require("../models/subModels/medicalHistoryModel");
const mskInjuryHistoryModel = require("../models/subModels/mskInjuryHistoryModel");
const patientGoalsModel = require("../models/subModels/patientGoalsModels");
const therapistNotesModel = require("../models/subModels/therapistNotesModel");

const byPatientController = async (req, res) => {
  const { patientId } = req.params;

  try {
    const patientIntakes = await intakeModel.findAll({
      where: {
        patientId: patientId,
      },
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
      ],
    });

    if (!patientIntakes || patientIntakes.length === 0) {
      return res.status(404).json({
        message: `No intakes found for patient with ID ${patientId}.`,
      });
    }

    res.status(200).json(patientIntakes);
  } catch (error) {
    console.error("Error retrieving patient intakes:", error);
    res.status(500).json({
      error: "Failed to retrieve patient intakes",
      details: error.message,
    });
  }
};

module.exports = byPatientController;
