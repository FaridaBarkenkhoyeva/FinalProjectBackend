const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");

const assessmentModel = sequelize.define(
  "Assessment",
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
    },
    assessmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = assessmentModel;
