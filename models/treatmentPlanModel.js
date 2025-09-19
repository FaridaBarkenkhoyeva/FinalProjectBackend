const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");

const treatmentPlan = sequelize.define(
  "TreatmentPlan",
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
        model: "Intakes",
        key: "id",
      },
    },
    numberOfSessions: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    additionalGoals: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = treatmentPlan;
