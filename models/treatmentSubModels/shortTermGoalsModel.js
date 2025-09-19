const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

const shortTermGoal = sequelize.define(
  "ShortTermGoal",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    treatmentPlanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "TreatmentPlans",
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = shortTermGoal;
