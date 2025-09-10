const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

const mskInjuryHistoryModel = sequelize.define(
  "MskInjuryHistory",
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
    },
    surgeries: {
      type: DataTypes.TEXT,
    },
    currentMedications: {
      type: DataTypes.TEXT,
    },
    allergies: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mskInjuryHistoryModel;
