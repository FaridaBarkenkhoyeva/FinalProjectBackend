const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const lifestyleFactorsModel = sequelize.define(
  "LifestyleFactors",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    intakeId: {
      type: DataTypes.INTEGER,
    },
    physicalActivity: {
      type: DataTypes.TEXT,
    },
    workDemands: {
      type: DataTypes.ENUM("sedentary", "heavy_labor", "repetitive_tasks"),
    },
    hobbiesSports: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = lifestyleFactorsModel;
