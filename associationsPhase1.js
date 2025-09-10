const intakeModel = require("./models/intakeModel");
const patientsModel = require("./models/patientsModel");
const chiefComplaintModel = require("./models/subModels/chiefComplaintModel");
const familySocialHistoryModel = require("./models/subModels/familySocialHistoryModel");
const functionalStatusModel = require("./models/subModels/functionalStatusModel");
const lifestyleFactorsModel = require("./models/subModels/lifestyleFactorsModel");
const medicalHistoryModel = require("./models/subModels/medicalHistoryModel");
const mskInjuryHistoryModel = require("./models/subModels/mskInjuryHistoryModel");
const patientGoalsModel = require("./models/subModels/patientGoalsModels");
const therapistNotesModel = require("./models/subModels/therapistNotesModel");
const sequelize = require("./db/dbConnection");



const associationsPhase1 = () => {
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


}
module.exports = associationsPhase1;
