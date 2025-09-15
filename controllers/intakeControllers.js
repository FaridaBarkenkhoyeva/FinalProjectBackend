const intakeModel = require("../models/intakeModel");
const patientsModel = require("../models/patientsModel");
const chiefComplaintModel = require("../models/intakeSubModels/chiefComplaintModel");
const familySocialHistoryModel = require("../models/intakeSubModels/familySocialHistoryModel");
const functionalStatusModel = require("../models/intakeSubModels/functionalStatusModel");
const lifestyleFactorsModel = require("../models/intakeSubModels/lifestyleFactorsModel");
const medicalHistoryModel = require("../models/intakeSubModels/medicalHistoryModel");
const mskInjuryHistoryModel = require("../models/intakeSubModels/mskInjuryHistoryModel");
const patientGoalsModel = require("../models/intakeSubModels/patientGoalsModels");
const therapistNotesModel = require("../models/intakeSubModels/therapistNotesModel");

const intakeControllers = {
  createIntakeForPt: async (req, res) => {
    const { patientId } = req.params;
    const {
      chiefComplaint,
      medicalHistory,
      mskInjuryHistory,
      functionalStatus,
      lifestyleFactors,
      familySocialHistory,
      patientGoals,
      therapistNotes,
      ...intakeData
    } = req.body;

    try {
      const patient = await patientsModel.findByPk(patientId);
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }

      const newIntake = await intakeModel.create({
        ...intakeData,
        patientId: patient.id,
      });

      const relatedRecords = [];
      if (chiefComplaint) {
        relatedRecords.push(
          chiefComplaintModel.create({
            ...chiefComplaint,
            intakeId: newIntake.id,
          })
        );
      }
      if (medicalHistory) {
        relatedRecords.push(
          medicalHistoryModel.create({
            ...medicalHistory,
            intakeId: newIntake.id,
          })
        );
      }
      if (mskInjuryHistory) {
        relatedRecords.push(
          mskInjuryHistoryModel.create({
            ...mskInjuryHistory,
            intakeId: newIntake.id,
          })
        );
      }
      if (functionalStatus) {
        relatedRecords.push(
          functionalStatusModel.create({
            ...functionalStatus,
            intakeId: newIntake.id,
          })
        );
      }
      if (lifestyleFactors) {
        relatedRecords.push(
          lifestyleFactorsModel.create({
            ...lifestyleFactors,
            intakeId: newIntake.id,
          })
        );
      }
      if (familySocialHistory) {
        relatedRecords.push(
          familySocialHistoryModel.create({
            ...familySocialHistory,
            intakeId: newIntake.id,
          })
        );
      }
      if (patientGoals) {
        relatedRecords.push(
          patientGoalsModel.create({ ...patientGoals, intakeId: newIntake.id })
        );
      }
      if (therapistNotes) {
        relatedRecords.push(
          therapistNotesModel.create({
            ...therapistNotes,
            intakeId: newIntake.id,
          })
        );
      }

      await Promise.all(relatedRecords);

      const completeIntake = await intakeModel.findByPk(newIntake.id, {
        include: [
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

      res.status(201).json(completeIntake);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Failed to create intake", details: error.message });
    }
  },

  pendingIntakes: async (req, res) => {
    try {
      const pendingIntakes = await intakeModel.findAll({
        where: {
          status: "pending",
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
      if (!pendingIntakes || pendingIntakes.length === 0) {
        return res.status(200).json([]); // Return empty array instead of 404
      }

      res.status(200).json(pendingIntakes);
    } catch (error) {
      console.error("Error retrieving pending intakes:", error);
      res.status(500).json({
        error: "Failed to retrieve pending intakes",
        details: error.message,
      });
    }
  },

  inProgressIntakes: async (req, res) => {
    try {
      const inProgressIntakes = await intakeModel.findAll({
        where: {
          status: "in progress",
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

      if (!inProgressIntakes || inProgressIntakes.length === 0) {
        return res.status(200).json([]); // Return empty array instead of 404
      }

      res.status(200).json(inProgressIntakes);
    } catch (error) {
      console.error("Error retrieving in-progress intakes:", error);
      res.status(500).json({
        error: "Failed to retrieve in-progress intakes",
        details: error.message,
      });
    }
  },

  completedIntakes: async (req, res) => {
    try {
      const completedIntakes = await intakeModel.findAll({
        where: {
          status: "completed",
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

      if (!completedIntakes || completedIntakes.length === 0) {
        return res.status(200).json([]); // Return empty array instead of 404
      }

      res.status(200).json(completedIntakes);
    } catch (error) {
      console.error("Error retrieving completed intakes:", error);
      res.status(500).json({
        error: "Failed to retrieve completed intakes",
        details: error.message,
      });
    }
  },

  selectedIntake: async (req, res) => {
    const { id } = req.params;

    const intake = await intakeModel.findByPk(id, {
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
    if (!intake) {
      return res.status(404).json({ error: "Intake record not found." });
    }
    res.status(200).json(intake);
  },

  allIntakes: async (req, res) => {
    try {
      const allIntakes = await intakeModel.findAll({
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

      if (!allIntakes || allIntakes.length === 0) {
        return res.status(404).json({ message: "No intakes found." }); 
      }

      res.status(200).json(allIntakes);
    } catch (error) {
      console.error("Error retrieving all intakes:", error);
      res.status(500).json({
        error: "Failed to retrieve all intakes",
        details: error.message,
      });
    }
  },

  updateIntakeStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const intake = await intakeModel.findByPk(id);
      if (!intake) {
        return res.status(404).json({ message: "Intake not found" });
      }

      intake.status = status;
      await intake.save();

      const updatedIntake = await intakeModel.findByPk(id, {
        include: [{ model: patientsModel }, { model: chiefComplaintModel }],
      });

      res.json(updatedIntake);
    } catch (error) {
      res.status(500).json({ message: "Error updating intake status", error });
    }
  },
};

module.exports = intakeControllers;
