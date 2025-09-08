const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const functionalStatusModel = sequelize.define(
  "FunctionalStatus",
  { id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    intakeId: {
      type: DataTypes.INTEGER,
    },
    dailyActivitiesAffected: {
      type: DataTypes.TEXT
    },
    mobilityLevel: {
      type: DataTypes.ENUM('independent', 'assisted')

    },
    useOfAids: {
      type: DataTypes.TEXT
    }
  },
  {
    timestamps: false,
  }
);

module.exports = functionalStatusModel;
