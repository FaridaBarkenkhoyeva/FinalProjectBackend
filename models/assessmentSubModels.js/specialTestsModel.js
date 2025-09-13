const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

const specialTest = sequelize.define(
  "SpecialTest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    assessmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "assessments",
        key: "id",
      },
      allowNull: false,
    },
    testName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jointArea: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    result: {
      type: DataTypes.ENUM("positive", "negative", "not performed"),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = specialTest;
