// const { DataTypes } = require("sequelize");
// const sequelize = require("../../db/dbConnection");

const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

// const painAssessmentModel = sequelize.define(
//   "PainAssessment",
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
//     painScale: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       validate: {
//         min: 0,
//         max: 10,
//       },
//     },
//     locationAndRadiation: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     aggravatingFactors: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     relievingFactors: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = painAssessmentModel;
// models/assessmentSubModels/painAssessmentModel.js

const painAssessmentModel = sequelize.define(
  "PainAssessment",
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
    painScale: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 0, max: 10 },
    },
    locationAndRadiation: { type: DataTypes.STRING, allowNull: true },
    aggravatingFactors: { type: DataTypes.STRING, allowNull: true },
    relievingFactors: { type: DataTypes.STRING, allowNull: true },
  },
  {
    timestamps: true,
  }
);
module.exports = painAssessmentModel;