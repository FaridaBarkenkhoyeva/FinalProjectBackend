const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

const romModel = sequelize.define(
  "Rom",
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
    activeROM: { type: DataTypes.JSON, allowNull: true },
    passiveROM: { type: DataTypes.JSON, allowNull: true },
    comparison: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    timestamps: true,
  }
);
module.exports = romModel;
