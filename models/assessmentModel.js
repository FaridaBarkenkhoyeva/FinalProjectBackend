// // models/assessmentModel.js

const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");

// const { DataTypes } = require("sequelize");
// const sequelize = require("../db/dbConnection");
// const therapistNotesAssessmentModel = require("./assessmentSubModels/therapistNotesModel");

// const assessmentModel = sequelize.define(
//   "Assessment",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     patientId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     // intakeId: {
//     //   type: DataTypes.INTEGER,
//     //   allowNull: true,
//     //   references: {
//     //     model: "Intake",
//     //     key: "id",
//     //   },
//     // },
//     assessmentDate: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//     observationAndInspection: {
//       type: DataTypes.JSON,
//       allowNull: true,
//     },
//     rom: {
//       type: DataTypes.JSON,
//       allowNull: true,
//     },
//     manualMuscleTesting: {
//       type: DataTypes.JSON,
//       allowNull: true,
//     },
//     neurologicalScreening: {
//       type: DataTypes.JSON,
//       allowNull: true,
//     },
//     functionalTests: {
//       type: DataTypes.JSON,
//       allowNull: true,
//     },
//     specialTests: {
//       type: DataTypes.JSON,
//       allowNull: true,
//     },
//     painAssessment: {
//       type: DataTypes.JSON,
//       allowNull: true,
//     },
//     therapistNotesAssessmentModel: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//   },
//   {
//     timestamps: true, //for tracking of reassessment
//   }
// );

// module.exports = assessmentModel;


// models/assessmentModel.js


const assessmentModel = sequelize.define(
  "Assessment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    intakeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Intakes", // Matches the table name of your intakeModel
        key: "id",
      },
    },
    assessmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true, // Keep this to track creation and updates
  }
);

module.exports = assessmentModel;