const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

const patientGoalsModel = sequelize.define(
  "PatientGoalsModel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    intakeId: {
      type: DataTypes.INTEGER,
    },
    shortTermGoals: {
      type: DataTypes.TEXT,
      
    },
    longTermGoals: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = patientGoalsModel;
