const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

const medicalHistoryModel = sequelize.define(
  "MedicalHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    intakeId: {
      type: DataTypes.INTEGER,
    },
    pastIllnesses: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    surgeries: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    currentMedications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    allergies: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = medicalHistoryModel;

// Medical History ={"ID", "intakeId","Past illnesses / conditions",
// "Surgeries",
// "Current medications",
// "Allergies"}
