const intakeModel = require("../models/intakeModel");
const treatmentPlan = require("../models/treatmentPlanModel");
const longTermGoal = require("../models/treatmentSubModels/longTermGoalsModel");
const plannedIntervention = require("../models/treatmentSubModels/plannedInterventionsModel");
const shortTermGoal = require("../models/treatmentSubModels/shortTermGoalsModel");

const treatmentPlanController = {
  createTreatmentPlan: async (req, res) => {
    const { intakeId } = req.params;
    const {
      numberOfSessions,
      additionalGoals,
      shortTermGoals,
      longTermGoals,
      plannedInterventions,
    } = req.body;

    try {
      const intake = await intakeModel.findByPk(intakeId);
      if (!intake) {
        return res.status(404).send("No intake found");
      }
      // create treatment plan
      const newTreatmentPlan = await treatmentPlan.create({
        intakeId: parseInt(intakeId),
        numberOfSessions,
        additionalGoals,
      });

      // create short term goals
      if (shortTermGoals && shortTermGoals.length > 0) {
        for (const description of shortTermGoals) {
          await shortTermGoal.create({
            treatmentPlanId: newTreatmentPlan.id,
            description,
          });
        }
      }

      if (longTermGoals && longTermGoals.length > 0) {
        for (const description of longTermGoals) {
          await longTermGoal.create({
            treatmentPlanId: newTreatmentPlan.id,
            description,
          });
        }
      }
      //create planed interventions
      if (plannedInterventions && plannedInterventions.length > 0) {
        for (const description of plannedInterventions) {
          await plannedIntervention.create({
            treatmentPlanId: newTreatmentPlan.id,
            description,
          });
        }
      }
      res.status(201).json({
        message: "Treatment plan created successfully",
        newTreatmentPlan,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating treatment plan.");
    }
  },

  getTreatmentPlanById: async (req, res) => {
    const { treatmentPlanId } = req.params;

    try {
      const plan = await treatmentPlan.findByPk(treatmentPlanId, {
        include: [
          { model: shortTermGoal },
          { model: longTermGoal },
          { model: plannedIntervention },
        ],
      });
      if (!plan) {
        return res.status(404).send("Treatment plan not found");
      }
      res.status(200).json(plan);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching treatment plan.");
    }
  },
};
module.exports = treatmentPlanController;
