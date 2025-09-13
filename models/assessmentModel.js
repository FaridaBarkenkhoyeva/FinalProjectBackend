// models/assessmentModel.js

const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");

const assessmentModel = sequelize.define(
  "Assessment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Patients",
        key: "id",
      },
      allowNull: false,
    },
    assessmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    observationAndInspection: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    rom: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    manualMuscleTesting: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    neurologicalScreening: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    functionalTests: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    specialTests: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    painAssessment: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    therapistNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true, //for tracking of reassessment 
  }
);

module.exports = assessmentModel;
