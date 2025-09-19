const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

const longTermGoal = sequelize.define(
  "LongTermGoal",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Foreign key to link this goal to a specific treatment plan.
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

module.exports = longTermGoal;
