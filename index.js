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
const painAssessmentModel = require("./models/assessmentSubModels/painAssessment");
const therapistNotesAssessmentModel = require("./models/assessmentSubModels/therapistNotesModel");
const specialTestModel = require("./models/assessmentSubModels/specialTestsModel");
const manualMuscleTestModel = require("./models/assessmentSubModels/manualMuscleTestingModel");
const neurologicalScreeningModel = require("./models/assessmentSubModels/neurologicalScreeningModel");
const observationAndInspectionModel = require("./models/assessmentSubModels/observationAndInspectionModel");
const romModel = require("./models/assessmentSubModels/romModel");
const patientsModel = require("./models/patientsModel");
const assessmentRouter = require("./routers/assessmentRouter");
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

//create assessment
app.use("/api", assessmentRouter);

// // get all assessments
// app.get("/api/assessments", (req, res) => {
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

// for creating the reassessments the same endpoints are used on different times.

app.listen(3000, () => {
  `This server is running on port: ${port}`;
});
