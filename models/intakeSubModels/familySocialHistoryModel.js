const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

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
