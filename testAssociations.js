// testAssociations.js

const setUpAssociations = require("./associations");
const sequelize = require("./db/dbConnection");
const assessmentModel = require("./models/assessmentModel");
const romModel = require("./models/assessmentSubModels/romModel");
const intakeModel = require("./models/intakeModel");
const chiefComplaintModel = require("./models/intakeSubModels/chiefComplaintModel");
const patientsModel = require("./models/patientsModel");

const runTests = async () => {
  try {
    await sequelize.sync({ force: true }); // Syncs models and drops existing tables
    console.log("Database synced successfully.");

    // Call the associations function to set up the relationships
    setUpAssociations();

    // --- Step 2: Test the one-to-many relationship (Patient to Intake) ---
    console.log("\n--- Testing Patient to Intake (One-to-Many) ---");
    const patient = await patientsModel.create({
      surname: "Doe",
      lastname: "John",
      phoneNumber: 123456789,
      email: "johndoe@example.com",
      insuranceNumber: "INS12345",
      gender: "male",
      DoB: "1990-05-15",
      occupation: "Engineer",
    });
    console.log("Created patient:", patient.get({ plain: true }));

    const intake1 = await intakeModel.create({
      status: "in progress",
      patientId: patient.id,
    });
    const intake2 = await intakeModel.create({
      status: "completed",
      patientId: patient.id,
    });
    console.log("Created two intakes for the patient.");

    // Retrieve the patient and include their intakes
    const foundPatient = await patientsModel.findByPk(patient.id, {
      include: [intakeModel],
    });
    console.log(
      "Retrieved patient with intakes:",
      JSON.stringify(foundPatient, null, 2)
    );

    // --- Step 3: Test the one-to-one relationship (Intake to Chief Complaint) ---
    console.log("\n--- Testing Intake to Chief Complaint (One-to-One) ---");
    const chiefComplaint = await chiefComplaintModel.create({
      intakeId: intake1.id,
      primaryReason: "Knee pain",
      painLevel: 7,
    });
    console.log("Created Chief Complaint for intake 1.");

    // Retrieve the intake and include its Chief Complaint
    const foundIntake = await intakeModel.findByPk(intake1.id, {
      include: [chiefComplaintModel],
    });
    console.log(
      "Retrieved intake 1 with Chief Complaint:",
      JSON.stringify(foundIntake, null, 2)
    );

    // --- Step 4: Test the Intake to Assessment (One-to-Many) relationship ---
    console.log("\n--- Testing Intake to Assessment (One-to-Many) ---");
    const assessment1 = await assessmentModel.create({ intakeId: intake1.id });
    const assessment2 = await assessmentModel.create({ intakeId: intake1.id });
    console.log("Created two assessments for intake 1.");

    // Retrieve the intake and include its assessments
    const foundIntakeWithAssessments = await intakeModel.findByPk(intake1.id, {
      include: [assessmentModel],
    });
    console.log(
      "Retrieved intake 1 with assessments:",
      JSON.stringify(foundIntakeWithAssessments, null, 2)
    );

    // --- Step 5: Test the Assessment to ROM (One-to-One) relationship ---
    console.log("\n--- Testing Assessment to ROM (One-to-One) ---");
    const rom = await romModel.create({
      assessmentId: assessment1.id,
      activeROM: { shoulder: 180 },
    });
    console.log("Created ROM record for assessment 1.");

    // Retrieve the assessment and include its ROM data
    const foundAssessment = await assessmentModel.findByPk(assessment1.id, {
      include: [romModel],
    });
    console.log(
      "Retrieved assessment 1 with ROM:",
      JSON.stringify(foundAssessment, null, 2)
    );
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await sequelize.close();
  }
};

runTests();
