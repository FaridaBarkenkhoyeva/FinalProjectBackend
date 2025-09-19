const express = require("express");

const dotenv = require("dotenv");

const intakeModel = require("./models/intakeModel");
const sequelize = require("./db/dbConnection");
const patientRouter = require("./routers/patientRoutes");
const intakeRouter = require("./routers/intakeRoutes");
const byPatientRouter = require("./routers/byPatientRouter");
const cors = require("cors");
const setupAssociations = require("./associations");
const assessmentRouter = require("./routers/assessmentRouter");
const shortTermGoal = require("./models/treatmentSubModels/shortTermGoalsModel");
const longTermGoal = require("./models/treatmentSubModels/longTermGoalsModel");
const plannedIntervention = require("./models/treatmentSubModels/plannedInterventionsModel");
const treatmentPlan = require("./models/treatmentPlanModel");
const treatmentPlanRouter = require("./routers/treatmentRouter");
const chiefComplaintModel = require("./models/intakeSubModels/chiefComplaintModel");
const medicalHistoryModel = require("./models/intakeSubModels/medicalHistoryModel");
const mskInjuryHistoryModel = require("./models/intakeSubModels/mskInjuryHistoryModel");
const functionalStatusModel = require("./models/intakeSubModels/functionalStatusModel");
const lifestyleFactorsModel = require("./models/intakeSubModels/lifestyleFactorsModel");
const familySocialHistoryModel = require("./models/intakeSubModels/familySocialHistoryModel");
const patientGoalsModel = require("./models/intakeSubModels/patientGoalsModels");
const therapistNotesModel = require("./models/intakeSubModels/therapistNotesModel");
const assessmentModel = require("./models/assessmentModel");
const observationAndInspectionModel = require("./models/assessmentSubModels/observationAndInspectionModel");
const romModel = require("./models/assessmentSubModels/romModel");
const painAssessmentModel = require("./models/assessmentSubModels/painAssessment");
const neurologicalScreeningModel = require("./models/assessmentSubModels/neurologicalScreeningModel");
const therapistNotesAssessmentModel = require("./models/assessmentSubModels/therapistNotesModel");
const manualMuscleTestModel = require("./models/assessmentSubModels/manualMuscleTestingModel");
const specialTestModel = require("./models/assessmentSubModels/specialTestsModel");
const endEvaluationConclusion = require("./models/conclusionModel");
const patientsModel = require("./models/patientsModel");
const endEvaluationRouter = require("./routers/endEvaluationRouter");
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

//AssessmentRouter
app.use("/api", assessmentRouter);

//treatmentPlanRouter
app.use("/api", treatmentPlanRouter);

// In your main application file (e.g., index.js)

app.use("/api", endEvaluationRouter);
// Create an end-evaluation conclusion

// Get a complete end-evaluation for a specific intake

app.get("/api/intake/:intakeId/endevaluation", async (req, res) => {
  const { intakeId } = req.params;

  try {
    const intakeData = await intakeModel.findByPk(intakeId, {
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
        {
          model: assessmentModel,
          include: [
            { model: observationAndInspectionModel },
            { model: romModel },
            { model: painAssessmentModel },
            { model: neurologicalScreeningModel },
            { model: therapistNotesAssessmentModel },
            { model: manualMuscleTestModel },
            { model: specialTestModel },
          ],
        },
        {
          model: treatmentPlan,
          include: [
            { model: shortTermGoal },
            { model: longTermGoal },
            { model: plannedIntervention },
          ],
        },
        { model: endEvaluationConclusion },
      ],
    });

    if (!intakeData) {
      return res.status(404).send("Intake not found.");
    }

    res.status(200).json(intakeData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching intake end-evaluation.");
  }
});
app.listen(3000, () => {
  `This server is running on port: ${port}`;
});
