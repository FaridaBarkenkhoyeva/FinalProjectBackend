const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

const therapistNote = sequelize.define(
  "TherapistNote",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    assessmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Assessment",
        key: "id",
      },
      allowNull: false,
      unique: true,
    },
    summaryOfFindings: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    initialImpressionAndPlan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    responseToTreatment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = therapistNote;
