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
