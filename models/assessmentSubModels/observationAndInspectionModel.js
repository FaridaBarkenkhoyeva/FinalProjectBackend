const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

const observationAndInspectionModel = sequelize.define(
  "ObservationAndInspection",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    assessmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Assessments",
        key: "id",
      },
      unique: true,
    },
    postureAssessment: { type: DataTypes.TEXT, allowNull: true },
    gaitAnalysis: { type: DataTypes.TEXT, allowNull: true },
    skinInspection: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    timestamps: true,
  }
);
module.exports = observationAndInspectionModel;
