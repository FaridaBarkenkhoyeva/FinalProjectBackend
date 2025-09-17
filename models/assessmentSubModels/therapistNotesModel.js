// const { DataTypes } = require("sequelize");
// const sequelize = require("../../db/dbConnection");

const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

// const therapistNotesAssessmentModel = sequelize.define(
//   "TherapistNote",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     assessmentId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "Assessment",
//         key: "id",
//       },
//       allowNull: false,
//       unique: true,
//     },
//     summaryOfFindings: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     initialImpressionAndPlan: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     responseToTreatment: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = therapistNotesAssessmentModel;

// models/assessmentSubModels/therapistNotesAssessmentModel.js

const therapistNotesAssessmentModel = sequelize.define(
  "TherapistNote",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    assessmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Assessments",
        key: "id",
      },
      unique: true, // Enforces one-to-one relationship
    },
    summaryOfFindings: { type: DataTypes.TEXT, allowNull: true },
    initialImpressionAndPlan: { type: DataTypes.TEXT, allowNull: true },
    responseToTreatment: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    timestamps: true,
  }
);
module.exports = therapistNotesAssessmentModel;