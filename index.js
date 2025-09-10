const express = require("express");

const app = express();
app.use(express.json());

const dotenv = require("dotenv");
const chiefComplaintModel = require("./models/subModels/chiefComplaintModel");
const familySocialHistoryModel = require("./models/subModels/familySocialHistoryModel");
const functionalStatusModel = require("./models/subModels/functionalStatusModel");
const lifestyleFactorsModel = require("./models/subModels/lifestyleFactorsModel");
const medicalHistoryModel = require("./models/subModels/medicalHistoryModel");
const mskInjuryHistoryModel = require("./models/subModels/mskInjuryHistoryModel");
const patientGoalsModel = require("./models/subModels/patientGoalsModels");
const therapistNotesModel = require("./models/subModels/therapistNotesModel");
const intakeModel = require("./models/intakeModel");
const patientsModel = require("./models/patientsModel");
const sequelize = require("./db/dbConnection");
const associationsPhase1 = require("./associationsPhase1");
const patientRouter = require("./routers/patientRoutes");

dotenv.config();

const port = 3000;


const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    sequelize.sync();
    console.log("Database tables created successfully");
  } catch (error) {
    console.log("Unable to connect to database:", error);
  }
};

syncDatabase();

associationsPhase1();
//endpoint to dashboard
app.get("/api/", async (req, res) => {
  const n = await intakeModel.findAll();
  res.send(n);
});


//PatientRoutes
app.use("/api/patients", patientRouter)

//IntakeRoutes
// app.use("/api/patients", intakeRouter)



// post : /api/intakes/:patientId (create intake for existing patient)
// app.post("/api/intakes/:patientId", async (req, res) => {
// POST /api/intakes/:patientId
app.post("/api/intakes/:patientId", async (req, res) => {
  const { patientId } = req.params;
  const {
    chiefComplaint,
    medicalHistory,
    mskInjuryHistory,
    functionalStatus,
    lifestyleFactors,
    familySocialHistory,
    patientGoals,
    therapistNotes,
    ...intakeData
  } = req.body;

  try {
    // 1. Check if the patient exists
    const patient = await patientsModel.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // 2. Create the main Intake record with patientId
    const newIntake = await intakeModel.create({
      ...intakeData,
      patientId: patient.id,
    });

    // 3. Create the associated records and link them to the new intake
    const relatedRecords = [];
    if (chiefComplaint) {
      relatedRecords.push(
        chiefComplaintModel.create({
          ...chiefComplaint,
          intakeId: newIntake.id,
        })
      );
    }
    if (medicalHistory) {
      relatedRecords.push(
        medicalHistoryModel.create({
          ...medicalHistory,
          intakeId: newIntake.id,
        })
      );
    }
    if (mskInjuryHistory) {
      relatedRecords.push(
        mskInjuryHistoryModel.create({
          ...mskInjuryHistory,
          intakeId: newIntake.id,
        })
      );
    }
    if (functionalStatus) {
      relatedRecords.push(
        functionalStatusModel.create({
          ...functionalStatus,
          intakeId: newIntake.id,
        })
      );
    }
    if (lifestyleFactors) {
      relatedRecords.push(
        lifestyleFactorsModel.create({
          ...lifestyleFactors,
          intakeId: newIntake.id,
        })
      );
    }
    if (familySocialHistory) {
      relatedRecords.push(
        familySocialHistoryModel.create({
          ...familySocialHistory,
          intakeId: newIntake.id,
        })
      );
    }
    if (patientGoals) {
      relatedRecords.push(
        patientGoalsModel.create({ ...patientGoals, intakeId: newIntake.id })
      );
    }
    if (therapistNotes) {
      relatedRecords.push(
        therapistNotesModel.create({
          ...therapistNotes,
          intakeId: newIntake.id,
        })
      );
    }

    await Promise.all(relatedRecords);

    // 4. Respond with the created intake and its associations
    const completeIntake = await intakeModel.findByPk(newIntake.id, {
      include: [
        { model: chiefComplaintModel },
        { model: medicalHistoryModel },
        { model: mskInjuryHistoryModel },
        { model: functionalStatusModel },
        { model: lifestyleFactorsModel },
        { model: familySocialHistoryModel },
        { model: patientGoalsModel },
        { model: therapistNotesModel },
      ],
    });

    res.status(201).json(completeIntake);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to create intake", details: error.message });
  }
});

// get : /api/intakes (get only active intakes)
app.get("/api/intakes/active", async (req, res) => {
  try {
    // Find all intake records that are not yet completed
    const activeIntakes = await intakeModel.findAll({
      where: {
        status: ["pending", "in progress"],
      },
      // Include all associated models for each active intake
      include: [
        { model: patientsModel },
        { model: chiefComplaintModel },
        { model: medicalHistoryModel },
        { model: mskInjuryHistoryModel },
        { model: functionalStatusModel },
        { model: lifestyleFactorsModel },
        { model: familySocialHistoryModel },
        { model: patientGoalsModel },
        { model: therapistNotesModel },
      ],
    });

    if (!activeIntakes) {
      return res.status(404).json({ message: "No active intakes found." });
    }

    res.status(200).json(activeIntakes);
  } catch (error) {
    console.error("Error retrieving active intakes:", error);
    res.status(500).json({
      error: "Failed to retrieve active intakes",
      details: error.message,
    });
  }
});

// get : /api/intakes/completed (get only completed intakes)
app.get("/api/intakes/completed", async (req, res) => {
  try {
    const completedIntakes = await intakeModel.findAll({
      where: {
        status: "completed",
      },
      include: [
        { model: patientsModel },
        { model: chiefComplaintModel },
        { model: medicalHistoryModel },
        { model: mskInjuryHistoryModel },
        { model: functionalStatusModel },
        { model: lifestyleFactorsModel },
        { model: familySocialHistoryModel },
        { model: patientGoalsModel },
        { model: therapistNotesModel },
      ],
    });

    if (!completedIntakes || completedIntakes.length === 0) {
      return res.status(404).json({ message: "No completed intakes found." });
    }

    res.status(200).json(completedIntakes);
  } catch (error) {
    console.error("Error retrieving completed intakes:", error);
    res.status(500).json({
      error: "Failed to retrieve completed intakes",
      details: error.message,
    });
  }
});

// get : /api/byPatient/:patientId (get all intakes from patientId)
app.get("/api/byPatient/:patientId", async (req, res) => {
  const { patientId } = req.params;

  try {
    const patientIntakes = await intakeModel.findAll({
      where: {
        patientId: patientId,
      },
      include: [
        { model: patientsModel },
        { model: chiefComplaintModel },
        { model: medicalHistoryModel },
        { model: mskInjuryHistoryModel },
        { model: functionalStatusModel },
        { model: lifestyleFactorsModel },
        { model: familySocialHistoryModel },
        { model: patientGoalsModel },
        { model: therapistNotesModel },
      ],
    });

    if (!patientIntakes || patientIntakes.length === 0) {
      return res
        .status(404)
        .json({
          message: `No intakes found for patient with ID ${patientId}.`,
        });
    }

    res.status(200).json(patientIntakes);
  } catch (error) {
    console.error("Error retrieving patient intakes:", error);
    res.status(500).json({
      error: "Failed to retrieve patient intakes",
      details: error.message,
    });
  }
});

// get : /api/intakes/:id (get created intake)
app.get("/api/intakes/:id", async (req, res) => {
  const { id } = req.params;

  const intake = await intakeModel.findByPk(id, {
    include: [
      { model: patientsModel },
      { model: chiefComplaintModel },
      { model: medicalHistoryModel },
      { model: mskInjuryHistoryModel },
      { model: functionalStatusModel },
      { model: lifestyleFactorsModel },
      { model: familySocialHistoryModel },
      { model: patientGoalsModel },
      { model: therapistNotesModel },
    ],
  });
  if (!intake) {
    return res.status(404).json({ error: "Intake record not found." });
  }
  res.status(200).json(intake);
});

// get : /api/intakes/all (get all intakes)
app.get("/api/intakes", async (req, res) => {
  try {
    const allIntakes = await intakeModel.findAll({
      include: [
        { model: patientsModel },
        { model: chiefComplaintModel },
        { model: medicalHistoryModel },
        { model: mskInjuryHistoryModel },
        { model: functionalStatusModel },
        { model: lifestyleFactorsModel },
        { model: familySocialHistoryModel },
        { model: patientGoalsModel },
        { model: therapistNotesModel },
      ],
    });

    if (!allIntakes || allIntakes.length === 0) {
      return res.status(404).json({ message: "No intakes found." });
    }

    res.status(200).json(allIntakes);
  } catch (error) {
    console.error("Error retrieving all intakes:", error);
    res.status(500).json({
      error: "Failed to retrieve all intakes",
      details: error.message,
    });
  }
});

// might be implemented in future phases:
// put :/api/intakes/:id (update intake)
// app.put("/api/intakes/:id", (req, res) => {
//   res.send("This intake is updated")
// })

// delete : /api/intakes/:id (delete intake)
// app.delete("/api/intakes/:id", (req, res) => {
//   res.send("This intake is deleted")
// })
// post : /api/intakes (create intake from non existent patient)
// app.post("/api/intakes", (req, res) => {
//   res.send("This intake is created and therefore patientId is also created")
// })

app.listen(3000, () => {
  `This server is running on port: ${port}`;
});
