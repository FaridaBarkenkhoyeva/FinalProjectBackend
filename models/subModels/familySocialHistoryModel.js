const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const familySocialHistoryModel = sequelize.define(
  "FamilySocialHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    intakeId: {
      type: DataTypes.INTEGER,
    },
    familyMedicalHistory: {
      type: DataTypes.TEXT,
    },
    socialHabits: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = familySocialHistoryModel;

