const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");



const intakeModel = sequelize.define(
  "Intake",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in progress', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
    },
    medicalHistory: {
      type: DataTypes.TEXT,
      allowNull: true, 
    },
    musculoskeletalHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    functionalStatus: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lifestyleFactors: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    familySocialHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    patientGoals: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    therapistNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = intakeModel;


//Intake=
//   {
//   "Id",
//   "Status": {pending, in progress, completed}
//   "patientId",
//   "Chief Complaint ID",
//   "Medical History",
//   "Musculoskeletal / Injury History",
//   "Functional Status",
//   "Lifestyle Factors",
//   "Family & Social History",
//   "Patient Goals",
//   "Therapist Notes"
//   }