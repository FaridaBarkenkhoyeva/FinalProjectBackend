const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");

const endEvaluationConclusion = sequelize.define(
  "EndEvaluationConclusion",
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
      unique: true,
    },
    conclusionText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = endEvaluationConclusion;