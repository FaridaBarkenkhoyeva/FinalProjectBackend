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
const intakeRouter = require("./routers/intakeRoutes");
const byPatientRouter = require("./routers/byPatientRouter");

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
app.use("/api/intakes", intakeRouter)

//byPatientRoutes
app.use("/api/byPatient", byPatientRouter)

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
