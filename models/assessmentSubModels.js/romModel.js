const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

const rom = sequelize.define(
  "Rom",
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
    activeROM: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    passiveROM: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    comparison: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = rom;
