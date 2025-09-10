const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

const therapistNotesModel = sequelize.define(
  "TherapistNotesModel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    intakeId: {
      type: DataTypes.INTEGER,
    },
    observations: {
      type: DataTypes.TEXT,
    },
    additionalComments: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = therapistNotesModel;
