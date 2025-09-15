const express = require("express");

const dotenv = require("dotenv");

const intakeModel = require("./models/intakeModel");
const sequelize = require("./db/dbConnection");
const associationsPhase1 = require("./associationsPhase1");
const patientRouter = require("./routers/patientRoutes");
const intakeRouter = require("./routers/intakeRoutes");
const byPatientRouter = require("./routers/byPatientRouter");
const cors = require("cors");
const associationsPhase2 = require("./associationsPhase2");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync();
    console.log("Database tables created successfully");
  } catch (error) {
    console.log("Unable to connect to database:", error);
  }
};

syncDatabase();

associationsPhase1();
associationsPhase2();
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
