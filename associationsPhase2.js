const assessmentModel = require("./models/assessmentModel");
const manualMuscleTestModel = require("./models/assessmentSubModels.js/manualMuscleTestingModel");
const neurologicalScreeningModel = require("./models/assessmentSubModels.js/neurologicalScreeningModel");
const observationAndInspectionModel = require("./models/assessmentSubModels.js/observationAndInspectionModel");
const painAssessmentModel = require("./models/assessmentSubModels.js/painAssessment");
const romModel = require("./models/assessmentSubModels.js/romModel");
const specialTestModel = require("./models/assessmentSubModels.js/specialTestsModel");
const therapistNoteModel = require("./models/assessmentSubModels.js/therapistNotesModel");
const patientsModel = require("./models/patientsModel");

const associationsPhase2 = () => {
  patientsModel.hasMany(assessmentModel, {
    foreignKey: "patientId",
    onDelete: "CASCADE",
  });

  assessmentModel.belongsTo(patientsModel, {
    foreignKey: "patientId",
  });

  assessmentModel.hasOne(neurologicalScreeningModel, {
    foreignKey: "assessmentId",
    onDelete: "CASCADE",
  });

  neurologicalScreeningModel.belongsTo(assessmentModel, {
    foreignKey: "assessmentId",
  });

  assessmentModel.hasMany(manualMuscleTestModel, {
    foreignKey: "assessmentId",
    onDelete: "CASCADE",
  });

  manualMuscleTestModel.belongsTo(assessmentModel, {
    foreignKey: "assessmentId",
  });

  assessmentModel.hasOne(observationAndInspectionModel, {
    foreignKey: "assessmentId",
    onDelete: "CASCADE",
  });

  observationAndInspectionModel.belongsTo(assessmentModel, {
    foreignKey: "assessmentId",
  });

  assessmentModel.hasOne(painAssessmentModel, {
    foreignKey: "assessmentId",
    onDelete: "CASCADE",
  });

  painAssessmentModel.belongsTo(assessmentModel, {
    foreignKey: "assessmentId",
  });

  assessmentModel.hasOne(romModel, {
    foreignKey: "assessmentId",
    onDelete: "CASCADE",
  });

  romModel.belongsTo(assessmentModel, {
    foreignKey: "assessmentId",
  });

  assessmentModel.hasMany(specialTestModel, {
    foreignKey: "assessmentId",
    onDelete: "CASCADE",
  });

  specialTestModel.belongsTo(assessmentModel, {
    foreignKey: "assessmentId",
  });

  assessmentModel.hasOne(therapistNoteModel, {
    foreignKey: "assessmentId",
    onDelete: "CASCADE",
  });

  therapistNoteModel.belongsTo(assessmentModel, {
    foreignKey: "assessmentId",
  });
};

module.exports = associationsPhase2;
