const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

const manualMuscleTestModel = sequelize.define(
  "ManualMuscleTest",
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
    },
    jointArea: { type: DataTypes.STRING, allowNull: false },
    movement: { type: DataTypes.STRING, allowNull: false },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 0, max: 5 },
    },
  },
  {
    timestamps: true,
  }
);
module.exports = manualMuscleTestModel;
