const assessmentModel = require("./models/assessmentModel");
const manualMuscleTestModel = require("./models/assessmentSubModels/manualMuscleTestingModel");
const neurologicalScreeningModel = require("./models/assessmentSubModels/neurologicalScreeningModel");
const observationAndInspectionModel = require("./models/assessmentSubModels/observationAndInspectionModel");
const painAssessmentModel = require("./models/assessmentSubModels/painAssessment");
const romModel = require("./models/assessmentSubModels/romModel");
const specialTestModel = require("./models/assessmentSubModels/specialTestsModel");
const therapistNotesAssessmentModel = require("./models/assessmentSubModels/therapistNotesModel");
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
};
module.exports = setUpAssociations;

// const assessmentModel = require("./models/assessmentModel");
// const manualMuscleTestModel = require("./models/assessmentSubModels/manualMuscleTestingModel");
// const neurologicalScreeningModel = require("./models/assessmentSubModels/neurologicalScreeningModel");
// const observationAndInspectionModel = require("./models/assessmentSubModels/observationAndInspectionModel");
// const painAssessmentModel = require("./models/assessmentSubModels/painAssessment");
// const romModel = require("./models/assessmentSubModels/romModel");
// const specialTestModel = require("./models/assessmentSubModels/specialTestsModel");
// const therapistNotesAssessmentModel = require("./models/assessmentSubModels/therapistNotesModel");
// const intakeModel = require("./models/intakeModel");
// const chiefComplaintModel = require("./models/intakeSubModels/chiefComplaintModel");
// const familySocialHistoryModel = require("./models/intakeSubModels/familySocialHistoryModel");
// const functionalStatusModel = require("./models/intakeSubModels/functionalStatusModel");
// const lifestyleFactorsModel = require("./models/intakeSubModels/lifestyleFactorsModel");
// const medicalHistoryModel = require("./models/intakeSubModels/medicalHistoryModel");
// const mskInjuryHistoryModel = require("./models/intakeSubModels/mskInjuryHistoryModel");
// const patientGoalsModel = require("./models/intakeSubModels/patientGoalsModels");
// const therapistNotesModel = require("./models/intakeSubModels/therapistNotesModel");
// const patientsModel = require("./models/patientsModel");

// const setupAssociations = () => {
//   // ------------------------------------
//   // Phase 1 Associations (Patient & Intake)
//   // ------------------------------------

//   // Patient to Intake (One-to-Many)
//   patientsModel.hasMany(intakeModel, {
//     foreignKey: "patientId",
//     onDelete: "CASCADE",
//   });
//   intakeModel.belongsTo(patientsModel, {
//     foreignKey: "patientId",
//   });

//   // Intake to its sub-models (One-to-One)
//   intakeModel.hasOne(chiefComplaintModel, {
//     foreignKey: "intakeId",
//     onDelete: "CASCADE",
//   });
//   chiefComplaintModel.belongsTo(intakeModel, { foreignKey: "intakeId" });

//   intakeModel.hasOne(medicalHistoryModel, {
//     foreignKey: "intakeId",
//     onDelete: "CASCADE",
//   });
//   medicalHistoryModel.belongsTo(intakeModel, { foreignKey: "intakeId" });

//   intakeModel.hasOne(mskInjuryHistoryModel, {
//     foreignKey: "intakeId",
//     onDelete: "CASCADE",
//   });
//   mskInjuryHistoryModel.belongsTo(intakeModel, { foreignKey: "intakeId" });

//   intakeModel.hasOne(functionalStatusModel, {
//     foreignKey: "intakeId",
//     onDelete: "CASCADE",
//   });
//   functionalStatusModel.belongsTo(intakeModel, { foreignKey: "intakeId" });

//   intakeModel.hasOne(lifestyleFactorsModel, {
//     foreignKey: "intakeId",
//     onDelete: "CASCADE",
//   });
//   lifestyleFactorsModel.belongsTo(intakeModel, { foreignKey: "intakeId" });

//   intakeModel.hasOne(familySocialHistoryModel, {
//     foreignKey: "intakeId",
//     onDelete: "CASCADE",
//   });
//   familySocialHistoryModel.belongsTo(intakeModel, { foreignKey: "intakeId" });

//   intakeModel.hasOne(patientGoalsModel, {
//     foreignKey: "intakeId",
//     onDelete: "CASCADE",
//   });
//   patientGoalsModel.belongsTo(intakeModel, { foreignKey: "intakeId" });

//   // Intake has a specific therapist notes model
//   intakeModel.hasOne(therapistNotesModel, {
//     foreignKey: "intakeId",
//     onDelete: "CASCADE",
//   });
//   therapistNotesModel.belongsTo(intakeModel, {
//     foreignKey: "intakeId",
//   });

// ------------------------------------
// Phase 2 Associations (Patient & Assessment & its sub-models)
// ------------------------------------

// Patient to Assessment (One-to-Many)
//   patientsModel.hasMany(assessmentModel, {
//     foreignKey: "patientId",
//     onDelete: "CASCADE",
//   });
//   assessmentModel.belongsTo(patientsModel, {
//     foreignKey: "patientId",
//   });

//   // // Intake to Assessment (One-to-Many)
//   // intakeModel.hasMany(assessmentModel, {
//   //   foreignKey: "intakeId",
//   // });
//   // assessmentModel.belongsTo(intakeModel, {
//   //   foreignKey: "intakeId",
//   // });

//   // Assessment to its sub-models (One-to-One and One-to-Many)
//   assessmentModel.hasOne(manualMuscleTestModel, {
//     foreignKey: "assessmentId",
//     onDelete: "CASCADE",
//   });
//   manualMuscleTestModel.belongsTo(assessmentModel, {
//     foreignKey: "assessmentId",
//   });

//   assessmentModel.hasOne(neurologicalScreeningModel, {
//     foreignKey: "assessmentId",
//     onDelete: "CASCADE",
//   });
//   neurologicalScreeningModel.belongsTo(assessmentModel, {
//     foreignKey: "assessmentId",
//   });

//   assessmentModel.hasOne(observationAndInspectionModel, {
//     foreignKey: "assessmentId",
//     onDelete: "CASCADE",
//   });
//   observationAndInspectionModel.belongsTo(assessmentModel, {
//     foreignKey: "assessmentId",
//   });

//   assessmentModel.hasOne(painAssessmentModel, {
//     foreignKey: "assessmentId",
//     onDelete: "CASCADE",
//   });
//   painAssessmentModel.belongsTo(assessmentModel, {
//     foreignKey: "assessmentId",
//   });

//   assessmentModel.hasOne(romModel, {
//     foreignKey: "assessmentId",
//     onDelete: "CASCADE",
//   });
//   romModel.belongsTo(assessmentModel, {
//     foreignKey: "assessmentId",
//   });

//   // Special Test is a one-to-many relationship
//   assessmentModel.hasMany(specialTestModel, {
//     foreignKey: "assessmentId",
//     onDelete: "CASCADE",
//   });
//   specialTestModel.belongsTo(assessmentModel, {
//     foreignKey: "assessmentId",
//   });

//   // Assessment has a specific therapist note model
//   assessmentModel.hasOne(therapistNotesAssessmentModel, {
//     foreignKey: "assessmentId",
//     onDelete: "CASCADE",
//   });
//   therapistNotesAssessmentModel.belongsTo(assessmentModel, {
//     foreignKey: "assessmentId",
//   });
// };

// module.exports = setupAssociations;
