const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const chiefComplaintModel = sequelize.define(
  "ChiefComplaint",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    intakeId: {
      type: DataTypes.INTEGER,
      
    },
    primaryReason: {
      type: DataTypes.TEXT,
    },
    onsetOfSymptoms: {
      type: DataTypes.TEXT,
    },
    duration: {
      type: DataTypes.TEXT,
    },
    painLevel: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 10,
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = chiefComplaintModel;
