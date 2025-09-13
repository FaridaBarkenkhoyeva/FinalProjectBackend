const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

const neurologicalScreeningModel = sequelize.define(
  "NeurologicalScreening",
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
    sitToStandTestReps: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tugTestTime: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    sixMinuteWalkDistance: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    singleLegStanceTime: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    rombergTestResult: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = neurologicalScreeningModel;
