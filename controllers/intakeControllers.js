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
      // 1. Check if the patient exists
      const patient = await patientsModel.findByPk(patientId);
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }

      // 2. Create the main Intake record with patientId
      const newIntake = await intakeModel.create({
        ...intakeData,
        patientId: patient.id,
      });

      // 3. Create the associated records and link them to the new intake
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

      // 4. Respond with the created intake and its associations
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

  activeIntakes: async (req, res) => {
    try {
      // Find all intake records that are not yet completed
      const activeIntakes = await intakeModel.findAll({
        where: {
          status: ["pending", "in progress"],
        },
        // Include all associated models for each active intake
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

      if (!activeIntakes) {
        return res.status(404).json({ message: "No active intakes found." });
      }

      res.status(200).json(activeIntakes);
    } catch (error) {
      console.error("Error retrieving active intakes:", error);
      res.status(500).json({
        error: "Failed to retrieve active intakes",
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
        return res.status(404).json({ message: "No completed intakes found." });
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

      // To send back a complete updated object, you can fetch it again with includes
      const updatedIntake = await intakeModel.findByPk(id, {
        include: [
          { model: patientsModel },
          { model: chiefComplaintModel },
          // Add other sub-models here
        ],
      });

      res.json(updatedIntake);
    } catch (error) {
      res.status(500).json({ message: "Error updating intake status", error });
    }
  },
};

module.exports = intakeControllers;
