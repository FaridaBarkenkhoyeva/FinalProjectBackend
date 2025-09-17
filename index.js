const express = require("express");

const dotenv = require("dotenv");

const intakeModel = require("./models/intakeModel");
const sequelize = require("./db/dbConnection");
const patientRouter = require("./routers/patientRoutes");
const intakeRouter = require("./routers/intakeRoutes");
const byPatientRouter = require("./routers/byPatientRouter");
const cors = require("cors");
const setupAssociations = require("./associations");
const { Association } = require("sequelize");
const assessmentModel = require("./models/assessmentModel");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

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

setupAssociations();
// associationsPhase1();
//endpoint to dashboard
app.get("/api/", async (req, res) => {
  const n = await intakeModel.findAll();
  res.send(n);
});

//PatientRoutes
app.use("/api/patients", patientRouter);

//IntakeRoutes
app.use("/api/intakes", intakeRouter);

//byPatientRoutes
app.use("/api/byPatient", byPatientRouter);

// // POST /api/intakes/:id/assessment create assessment with both intakeId and patientId
// // intakeId => because I want to continue with the assessment after the intake.
// POST /api/intakes/:id/assessment create assessment with intakeId
app.post("/api/intakes/:id/assessment", async (req, res) => {
  try {
    const intakeId = req.params.id;
    const assessmentData = req.body;

    // Find the intake to ensure it exists
    const intake = await intakeModel.findByPk(intakeId);

    if (!intake) {
      return res.status(404).json({ error: "Intake not found." });
    }

    // Create the assessment record and link it to the intake
    const newAssessment = await assessmentModel.create({
      ...assessmentData,
      intakeId: intakeId,
    });

    res.status(201).json(newAssessment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create assessment." });
  }
});

// get assessments by intakeId
// app.get("/api/intakes/:id/assessments", async (req, res) => {
//   try {
//     const intakeId = req.params.id;

//     const assessments = await assessmentModel.findAll({
//       where: {
//         intakeId: intakeId,
//       },

//       include: [{ model: patientsModel }],
//     });

//     if (assessments.length > 0) {
//       res.status(200).json(assessments);
//     } else {
//       res
//         .status(404)
//         .json({ message: "No assessments found for this intake." });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Failed to retrieve assessments for intake." });
//   }
// });

// //get the created assessment for patient
// app.get("/api/patients/:id/assessments", (req, res) => {
//   res.send("success");
// });

// // get all assessments
// app.get("/api/assessments", (req, res) => {
//   res.send("success");
// });

//get a specific assessment
// app.get("/api/assessments/:id", (req, res) => {
//   res.send("success");
// });

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

// create assessment for specific patientId
// app.post("/api/patients/:patientId/assessment", (req, res) => {
//   res.send("this endpoint works");
// });

// get assessment for specific patientId
// app.get("/api/patients/:patientId/assessment/:assessmentId", (req, res) => {
//   res.send("this endpoint works");
// });

// for creating the reassessments the same endpoints are used on different times.

app.listen(3000, () => {
  `This server is running on port: ${port}`;
});
