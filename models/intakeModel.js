const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");

const intakeModel = sequelize.define(
  "Intake",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in progress", "completed"),
      allowNull: false,
      defaultValue: "in progress",
    },
     patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medicalHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    musculoskeletalHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    functionalStatus: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lifestyleFactors: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    familySocialHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    patientGoals: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    therapistNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = intakeModel;
