// models/assessmentModel.js

const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");

const assessment = sequelize.define(
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
      defaultValue: {
        postureAssessment: null,
        gaitAnalysis: null,
        skinInspection: null,
      },
    },
    rom: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        activeROM: {}, 
        passiveROM: {}, 
        comparison: null,
      },
    },
    manualMuscleTesting: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        shoulder: { flexion: null, abduction: null },
        elbow: { flexion: null, extension: null },
        hip: { flexion: null, extension: null },
        knee: { flexion: null, extension: null },
        ankle: { dorsiflexion: null, plantarflexion: null },
      },
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
    timestamps: true, //for tracking assessment and reassessment
  }
);

module.exports = assessment;
