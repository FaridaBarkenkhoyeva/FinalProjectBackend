const assessmentModel = require("./models/assessmentModel");
const manualMuscleTestModel = require("./models/assessmentSubModels/manualMuscleTestingModel");
const neurologicalScreeningModel = require("./models/assessmentSubModels/neurologicalScreeningModel");
const observationAndInspectionModel = require("./models/assessmentSubModels/observationAndInspectionModel");
const painAssessmentModel = require("./models/assessmentSubModels/painAssessment");
const romModel = require("./models/assessmentSubModels/romModel");
const specialTestModel = require("./models/assessmentSubModels/specialTestsModel");
const therapistNotesAssessmentModel = require("./models/assessmentSubModels/therapistNotesModel");
const endEvaluationConclusion = require("./models/conclusionModel");
const intakeModel = require("./models/intakeModel");
const chiefComplaintModel = require("./models/intakeSubModels/chiefComplaintModel");
const familySocialHistoryModel = require("./models/intakeSubModels/familySocialHistoryModel");
const functionalStatusModel = require("./models/intakeSubModels/functionalStatusModel");
const lifestyleFactorsModel = require("./models/intakeSubModels/lifestyleFactorsModel");
const medicalHistoryModel = require("./models/intakeSubModels/medicalHistoryModel");
const mskInjuryHistoryModel = require("./models/intakeSubModels/mskInjuryHistoryModel");
const patientGoalsModel = require("./models/intakeSubModels/patientGoalsModels");
const therapistNotesModel = require("./models/intakeSubModels/therapistNotesModel");
const patientsModel = require("./models/patientsModel");
const treatmentPlan = require("./models/treatmentPlanModel");
const longTermGoal = require("./models/treatmentSubModels/longTermGoalsModel");
const plannedIntervention = require("./models/treatmentSubModels/plannedInterventionsModel");
const shortTermGoal = require("./models/treatmentSubModels/shortTermGoalsModel");

const setUpAssociations = () => {
  //patient to intake
  patientsModel.hasMany(intakeModel, {
    foreignKey: "patientId",
    onDelete: "CASCADE",
  });
  intakeModel.belongsTo(patientsModel, {
    foreignKey: "patientId",
  });

  // intake to submodals

  intakeModel.hasOne(chiefComplaintModel, {
    foreignKey: "intakeId",
    onDelete: "CASCADE",
  });
  chiefComplaintModel.belongsTo(intakeModel, {
    foreignKey: "intakeId",
  });

  intakeModel.hasOne(medicalHistoryModel, {
    foreignKey: "intakeId",
    onDelete: "CASCADE",
  });

  medicalHistoryModel.belongsTo(intakeModel, {
    foreignKey: "intakeId",
  });

  intakeModel.hasOne(mskInjuryHistoryModel, {
    foreignKey: "intakeId",
    onDelete: "CASCADE",
  });
  mskInjuryHistoryModel.belongsTo(intakeModel, {
    foreignKey: "intakeId",
  });

  intakeModel.hasOne(functionalStatusModel, {
    foreignKey: "intakeId",
    onDelete: "CASCADE",
  });
  functionalStatusModel.belongsTo(intakeModel, {
    foreignKey: "intakeId",
  });

  intakeModel.hasOne(lifestyleFactorsModel, {
    foreignKey: "intakeId",
    onDelete: "CASCADE",
  });
  lifestyleFactorsModel.belongsTo(intakeModel, {
    foreignKey: "intakeId",
  });

  intakeModel.hasOne(familySocialHistoryModel, {
    foreignKey: "intakeId",
    onDelete: "CASCADE",
  });
  familySocialHistoryModel.belongsTo(intakeModel, {
    foreignKey: "intakeId",
  });

  intakeModel.hasOne(patientGoalsModel, {
    foreignKey: "intakeId",
    onDelete: "CASCADE",
  });
  patientGoalsModel.belongsTo(intakeModel, {
    foreignKey: "intakeId",
  });

  intakeModel.hasOne(therapistNotesModel, {
    foreignKey: "intakeId",
    onDelete: "CASCADE",
  });
  therapistNotesModel.belongsTo(intakeModel, {
    foreignKey: "intakeId",
  });
  // Intake to Assessment (One-to-Many)
  intakeModel.hasMany(assessmentModel, {
    foreignKey: "intakeId",
    onDelete: "CASCADE",
  });
  assessmentModel.belongsTo(intakeModel, { foreignKey: "intakeId" });

  // Assessment to Assessment Submodels (One-to-One)
  assessmentModel.hasOne(observationAndInspectionModel, {
    foreignKey: "assessmentId",
    onDelete: "CASCADE",
  });
  observationAndInspectionModel.belongsTo(assessmentModel, {
    foreignKey: "assessmentId",
  });

  assessmentModel.hasOne(romModel, {
    foreignKey: "assessmentId",
    onDelete: "CASCADE",
  });
  romModel.belongsTo(assessmentModel, { foreignKey: "assessmentId" });

  assessmentModel.hasOne(painAssessmentModel, {
    foreignKey: "assessmentId",
    onDelete: "CASCADE",
  });
  painAssessmentModel.belongsTo(assessmentModel, {
    foreignKey: "assessmentId",
  });

  assessmentModel.hasOne(neurologicalScreeningModel, {
    foreignKey: "assessmentId",
    onDelete: "CASCADE",
  });
  neurologicalScreeningModel.belongsTo(assessmentModel, {
    foreignKey: "assessmentId",
  });

  assessmentModel.hasOne(therapistNotesAssessmentModel, {
    foreignKey: "assessmentId",
    onDelete: "CASCADE",
  });
  therapistNotesAssessmentModel.belongsTo(assessmentModel, {
    foreignKey: "assessmentId",
  });

  // Assessment to Assessment Submodels (One-to-Many)
  assessmentModel.hasMany(manualMuscleTestModel, {
    foreignKey: "assessmentId",
    onDelete: "CASCADE",
  });
  manualMuscleTestModel.belongsTo(assessmentModel, {
    foreignKey: "assessmentId",
  });

  assessmentModel.hasMany(specialTestModel, {
    foreignKey: "assessmentId",
    onDelete: "CASCADE",
  });
  specialTestModel.belongsTo(assessmentModel, { foreignKey: "assessmentId" });

  treatmentPlan.belongsTo(intakeModel, {
    foreignKey: "intakeId",
    onDelete: "CASCADE",
  });

  intakeModel.hasOne(treatmentPlan, {
    foreignKey: "intakeId",
    onDelete: "CASCADE",
  });

  treatmentPlan.hasMany(shortTermGoal, {
    foreignKey: "treatmentPlanId",
    onDelete: "CASCADE",
  });
  treatmentPlan.hasMany(longTermGoal, {
    foreignKey: "treatmentPlanId",
    onDelete: "CASCADE",
  });
  treatmentPlan.hasMany(plannedIntervention, {
    foreignKey: "treatmentPlanId",
    onDelete: "CASCADE",
  });

  // Each goal and intervention belongs to one TreatmentPlan.
  shortTermGoal.belongsTo(treatmentPlan, { foreignKey: "treatmentPlanId" });
  longTermGoal.belongsTo(treatmentPlan, { foreignKey: "treatmentPlanId" });
  plannedIntervention.belongsTo(treatmentPlan, {
    foreignKey: "treatmentPlanId",
  });

  // Intake to EndEvaluationConclusion (One-to-One)
  intakeModel.hasOne(endEvaluationConclusion, {
    foreignKey: "intakeId",
    onDelete: "CASCADE",
  });
  endEvaluationConclusion.belongsTo(intakeModel, {
    foreignKey: "intakeId",
  });
};
module.exports = setUpAssociations;
