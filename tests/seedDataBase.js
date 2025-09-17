const sequelize = require("../db/dbConnection");
const intakeModel = require("../models/intakeModel");
const chiefComplaintModel = require("../models/intakeSubModels/chiefComplaintModel");
const familySocialHistoryModel = require("../models/intakeSubModels/familySocialHistoryModel");
const functionalStatusModel = require("../models/intakeSubModels/functionalStatusModel");
const lifestyleFactorsModel = require("../models/intakeSubModels/lifestyleFactorsModel");
const medicalHistoryModel = require("../models/intakeSubModels/medicalHistoryModel");
const mskInjuryHistoryModel = require("../models/intakeSubModels/mskInjuryHistoryModel");
const patientGoalsModel = require("../models/intakeSubModels/patientGoalsModels");
const therapistNotesModel = require("../models/intakeSubModels/therapistNotesModel");
const patientsModel = require("../models/patientsModel");
// const familySocialHistoryModel = require("../models/subModels/familySocialHistoryModel");
// const functionalStatusModel = require("../models/subModels/functionalStatusModel");
// const lifestyleFactorsModel = require("../models/subModels/lifestyleFactorsModel");
// const medicalHistoryModel = require("../models/subModels/medicalHistoryModel");
// const mskInjuryHistoryModel = require("../models/subModels/mskInjuryHistoryModel");
// const patientGoalsModel = require("../models/subModels/patientGoalsModels");
// const therapistNotesModel = require("../models/subModels/therapistNotesModel");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Patient 1
    const patient1 = await patientsModel.create({
      surname: "Smith",
      lastname: "John",
      phoneNumber: 5551234567,
      email: "john.smith@email.com",
      insuranceNumber: "INS123456789",
      gender: "male",
      DoB: { start: new Date("1985-03-15"), end: new Date("1985-03-15") },
      occupation: "Software Engineer",
    });

    const intake1 = await intakeModel.create({
      patientId: patient1.id,
      status: "completed",
      medicalHistory: "Annual physical exam completed",
      musculoskeletalHistory: "No significant history",
      functionalStatus: "Fully independent",
      lifestyleFactors: "Moderately active",
      familySocialHistory: "Parents both healthy",
      patientGoals: "Maintain current health status",
      therapistNotes: "Patient in good health",
    });

    await chiefComplaintModel.create({
      intakeId: intake1.id,
      primaryReason: "Routine check-up",
      onsetOfSymptoms: "N/A",
      duration: "N/A",
      painLevel: 0,
    });

    await familySocialHistoryModel.create({
      intakeId: intake1.id,
      familyMedicalHistory: "Father: hypertension, Mother: diabetes",
      socialHabits: "Non-smoker, occasional social drinking",
    });

    await functionalStatusModel.create({
      intakeId: intake1.id,
      dailyActivitiesAffected: "None",
      mobilityLevel: "independent",
      useOfAids: "None",
    });

    await lifestyleFactorsModel.create({
      intakeId: intake1.id,
      physicalActivity: "Gym 3 times per week",
      workDemands: "sedentary",
      hobbiesSports: "Running, swimming",
    });

    await medicalHistoryModel.create({
      intakeId: intake1.id,
      pastIllnesses: "None",
      surgeries: "Appendectomy (2010)",
      currentMedications: "Multivitamin",
      allergies: "Penicillin",
    });

    await mskInjuryHistoryModel.create({
      intakeId: intake1.id,
      pastIllnesses: "None",
      surgeries: "None",
      currentMedications: "None",
      allergies: "None",
    });

    await patientGoalsModel.create({
      intakeId: intake1.id,
      shortTermGoals: "Maintain current fitness level",
      longTermGoals: "Stay healthy and active into old age",
    });

    await therapistNotesModel.create({
      intakeId: intake1.id,
      observations: "Patient appears healthy and fit",
      additionalComments: "No concerns at this time",
    });

    // Patient 2
    const patient2 = await patientsModel.create({
      surname: "Johnson",
      lastname: "Sarah",
      phoneNumber: 5559876543,
      email: "sarah.j@email.com",
      insuranceNumber: "INS987654321",
      gender: "female",
      DoB: { start: new Date("1990-07-22"), end: new Date("1990-07-22") },
      occupation: "Teacher",
    });

    const intake2 = await intakeModel.create({
      patientId: patient2.id,
      status: "in progress",
      medicalHistory: "Asthma, controlled with medication",
      musculoskeletalHistory: "Mild scoliosis",
      functionalStatus: "Independent with occasional shortness of breath",
      lifestyleFactors: "Active lifestyle",
      familySocialHistory: "Family history of asthma",
      patientGoals: "Improve breathing capacity",
      therapistNotes: "Responding well to treatment",
    });

    await chiefComplaintModel.create({
      intakeId: intake2.id,
      primaryReason: "Asthma management",
      onsetOfSymptoms: "Childhood",
      duration: "Chronic",
      painLevel: 2,
    });

    await familySocialHistoryModel.create({
      intakeId: intake2.id,
      familyMedicalHistory: "Mother: asthma, Father: high cholesterol",
      socialHabits: "Non-smoker, healthy diet",
    });

    await functionalStatusModel.create({
      intakeId: intake2.id,
      dailyActivitiesAffected: "Strenuous exercise",
      mobilityLevel: "independent",
      useOfAids: "Inhaler as needed",
    });

    await lifestyleFactorsModel.create({
      intakeId: intake2.id,
      physicalActivity: "Walking daily, yoga",
      workDemands: "sedentary",
      hobbiesSports: "Reading, gardening",
    });

    await medicalHistoryModel.create({
      intakeId: intake2.id,
      pastIllnesses: "Childhood asthma",
      surgeries: "Tonsillectomy (2001)",
      currentMedications: "Albuterol inhaler, corticosteroid inhaler",
      allergies: "Dust, pollen, pet dander",
    });

    await mskInjuryHistoryModel.create({
      intakeId: intake2.id,
      pastIllnesses: "None",
      surgeries: "None",
      currentMedications: "None",
      allergies: "None",
    });

    await patientGoalsModel.create({
      intakeId: intake2.id,
      shortTermGoals: "Reduce asthma symptoms",
      longTermGoals: "Complete marathon training",
    });

    await therapistNotesModel.create({
      intakeId: intake2.id,
      observations: "Good lung capacity today",
      additionalComments: "Continue current treatment plan",
    });

    // Patient 3
    const patient3 = await patientsModel.create({
      surname: "Garcia",
      lastname: "Carlos",
      phoneNumber: 5554567890,
      email: "c.garcia@email.com",
      insuranceNumber: "INS456789123",
      gender: "male",
      DoB: { start: new Date("1978-11-30"), end: new Date("1978-11-30") },
      occupation: "Construction Worker",
    });

    const intake3 = await intakeModel.create({
      patientId: patient3.id,
      status: "pending",
      medicalHistory: "Previous back strain",
      musculoskeletalHistory: "Chronic lower back pain",
      functionalStatus: "Limited bending and lifting",
      lifestyleFactors: "Physically demanding job",
      familySocialHistory: "No significant family history",
      patientGoals: "Recover from back injury",
      therapistNotes: "Initial assessment needed",
    });

    await chiefComplaintModel.create({
      intakeId: intake3.id,
      primaryReason: "Lower back pain",
      onsetOfSymptoms: "2 weeks ago while lifting",
      duration: "2 weeks",
      painLevel: 7,
    });

    await familySocialHistoryModel.create({
      intakeId: intake3.id,
      familyMedicalHistory: "Father: arthritis, Mother: healthy",
      socialHabits: "Social drinker, non-smoker",
    });

    await functionalStatusModel.create({
      intakeId: intake3.id,
      dailyActivitiesAffected: "Lifting, bending, prolonged standing",
      mobilityLevel: "independent",
      useOfAids: "Back brace",
    });

    await lifestyleFactorsModel.create({
      intakeId: intake3.id,
      physicalActivity: "Work-related physical activity",
      workDemands: "heavy_labor",
      hobbiesSports: "Fishing, watching sports",
    });

    await medicalHistoryModel.create({
      intakeId: intake3.id,
      pastIllnesses: "Back strain (2018)",
      surgeries: "None",
      currentMedications: "Ibuprofen as needed",
      allergies: "None",
    });

    await mskInjuryHistoryModel.create({
      intakeId: intake3.id,
      pastIllnesses: "Back strain (2018)",
      surgeries: "None",
      currentMedications: "Ibuprofen",
      allergies: "None",
    });

    await patientGoalsModel.create({
      intakeId: intake3.id,
      shortTermGoals: "Reduce pain to level 3",
      longTermGoals: "Return to full work duties",
    });

    await therapistNotesModel.create({
      intakeId: intake3.id,
      observations: "Limited range of motion in lumbar spine",
      additionalComments: "Schedule physical therapy evaluation",
    });

    // Patient 4
    const patient4 = await patientsModel.create({
      surname: "Chen",
      lastname: "Mei",
      phoneNumber: 5552345678,
      email: "mei.chen@email.com",
      insuranceNumber: "INS234567891",
      gender: "female",
      DoB: { start: new Date("1995-05-14"), end: new Date("1995-05-14") },
      occupation: "Graphic Designer",
    });

    const intake4 = await intakeModel.create({
      patientId: patient4.id,
      status: "completed",
      medicalHistory: "Carpal tunnel syndrome",
      musculoskeletalHistory: "Wrist tendinitis",
      functionalStatus: "Difficulty with fine motor tasks",
      lifestyleFactors: "Computer work",
      familySocialHistory: "Mother: rheumatoid arthritis",
      patientGoals: "Manage wrist pain from repetitive work",
      therapistNotes: "Good progress with ergonomic adjustments",
    });

    await chiefComplaintModel.create({
      intakeId: intake4.id,
      primaryReason: "Wrist pain and numbness",
      onsetOfSymptoms: "3 months gradually",
      duration: "3 months",
      painLevel: 5,
    });

    await familySocialHistoryModel.create({
      intakeId: intake4.id,
      familyMedicalHistory: "Mother: RA, Father: healthy",
      socialHabits: "Non-smoker, vegetarian diet",
    });

    await functionalStatusModel.create({
      intakeId: intake4.id,
      dailyActivitiesAffected: "Typing, writing, gripping",
      mobilityLevel: "independent",
      useOfAids: "Wrist splint at night",
    });

    await lifestyleFactorsModel.create({
      intakeId: intake4.id,
      physicalActivity: "Yoga 2x weekly",
      workDemands: "repetitive_tasks",
      hobbiesSports: "Painting, hiking",
    });

    await medicalHistoryModel.create({
      intakeId: intake4.id,
      pastIllnesses: "None",
      surgeries: "None",
      currentMedications: "NSAIDs as needed",
      allergies: "None",
    });

    await mskInjuryHistoryModel.create({
      intakeId: intake4.id,
      pastIllnesses: "Wrist tendinitis",
      surgeries: "None",
      currentMedications: "None",
      allergies: "None",
    });

    await patientGoalsModel.create({
      intakeId: intake4.id,
      shortTermGoals: "Reduce numbness episodes",
      longTermGoals: "Prevent surgery need",
    });

    await therapistNotesModel.create({
      intakeId: intake4.id,
      observations: "Improved grip strength",
      additionalComments: "Continue ergonomic training",
    });

    // Patient 5
    const patient5 = await patientsModel.create({
      surname: "Wilson",
      lastname: "David",
      phoneNumber: 5558765432,
      email: "d.wilson@email.com",
      insuranceNumber: "INS876543219",
      gender: "male",
      DoB: { start: new Date("1982-12-08"), end: new Date("1982-12-08") },
      occupation: "Accountant",
    });

    const intake5 = await intakeModel.create({
      patientId: patient5.id,
      status: "in progress",
      medicalHistory: "ACL reconstruction surgery",
      musculoskeletalHistory: "Knee injury from sports",
      functionalStatus: "Limited weight-bearing",
      lifestyleFactors: "Previously active, now sedentary",
      familySocialHistory: "No significant history",
      patientGoals: "Rehabilitate after knee surgery",
      therapistNotes: "Making good progress in PT",
    });

    await chiefComplaintModel.create({
      intakeId: intake5.id,
      primaryReason: "Post-operative knee rehabilitation",
      onsetOfSymptoms: "After surgery 6 weeks ago",
      duration: "6 weeks",
      painLevel: 4,
    });

    await familySocialHistoryModel.create({
      intakeId: intake5.id,
      familyMedicalHistory: "Parents both healthy",
      socialHabits: "Non-smoker, occasional alcohol",
    });

    await functionalStatusModel.create({
      intakeId: intake5.id,
      dailyActivitiesAffected: "Walking, climbing stairs, standing",
      mobilityLevel: "assisted",
      useOfAids: "Crutches, knee brace",
    });

    await lifestyleFactorsModel.create({
      intakeId: intake5.id,
      physicalActivity: "Physical therapy 3x weekly",
      workDemands: "sedentary",
      hobbiesSports: "Former basketball player",
    });

    await medicalHistoryModel.create({
      intakeId: intake5.id,
      pastIllnesses: "None",
      surgeries: "ACL reconstruction (6 weeks ago)",
      currentMedications: "Pain medication as needed",
      allergies: "None",
    });

    await mskInjuryHistoryModel.create({
      intakeId: intake5.id,
      pastIllnesses: "Knee ligament tear",
      surgeries: "ACL reconstruction",
      currentMedications: "None",
      allergies: "None",
    });

    await patientGoalsModel.create({
      intakeId: intake5.id,
      shortTermGoals: "Walk without crutches",
      longTermGoals: "Return to recreational sports",
    });

    await therapistNotesModel.create({
      intakeId: intake5.id,
      observations: "Good range of motion improvement",
      additionalComments: "Continue strengthening exercises",
    });

    console.log(
      "Database seeded successfully with 5 complete patient records!"
    );
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
