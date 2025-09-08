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

//patient to intake
patientsModel.hasMany(intakeModel, {
  foreignKey: "patientId",
  onDelete: "CASCADE",
});
intakeModel.belongsTo(patientsModel, {
  foreignKey: "patientId",
});

// intake to submodals

intakeModel.hasOne(chiefComplaintModel, {
  foreignKey: "intakeId",
  onDelete: "CASCADE",
});
chiefComplaintModel.belongsTo(intakeModel, {
  foreignKey: "intakeId",
});

intakeModel.hasOne(medicalHistoryModel, {
  foreignKey: "intakeId",
  onDelete: "CASCADE",
});

medicalHistoryModel.belongsTo(intakeModel, {
  foreignKey: "intakeId",
});

intakeModel.hasOne(mskInjuryHistoryModel, {
  foreignKey: "intakeId",
  onDelete: "CASCADE",
});
mskInjuryHistoryModel.belongsTo(intakeModel, {
  foreignKey: "intakeId",
});

intakeModel.hasOne(functionalStatusModel, {
  foreignKey: "intakeId",
  onDelete: "CASCADE",
});
functionalStatusModel.belongsTo(intakeModel, {
  foreignKey: "intakeId",
});

intakeModel.hasOne(lifestyleFactorsModel, {
  foreignKey: "intakeId",
  onDelete: "CASCADE",
});
lifestyleFactorsModel.belongsTo(intakeModel, {
  foreignKey: "intakeId",
});

intakeModel.hasOne(familySocialHistoryModel, {
  foreignKey: "intakeId",
  onDelete: "CASCADE",
});
familySocialHistoryModel.belongsTo(intakeModel, {
  foreignKey: "intakeId",
});

intakeModel.hasOne(patientGoalsModel, {
  foreignKey: "intakeId",
  onDelete: "CASCADE",
});
patientGoalsModel.belongsTo(intakeModel, {
  foreignKey: "intakeId",
});

intakeModel.hasOne(therapistNotesModel, {
  foreignKey: "intakeId",
  onDelete: "CASCADE",
});
therapistNotesModel.belongsTo(intakeModel, {
  foreignKey: "intakeId",
});

sequelize.sync();

const port = 3000;

const patients = [];
// const intakes = []
let nextPatientId = 1;

//endpoint to dashboard
app.get("/", async(req, res) => {
  const n =  await intakeModel.findAll();
  res.send(n);
});


// app.get("/testModel", (req, res) => {
//   try {
//     const test = patientsModel.findAll({
//       attributes: [
//         "surname",
//         "lastname",
//         "phoneNumber",
//         "email",
//         "insuranceNumber",
//         "gender",
//         "DoB",
//         "occupation",
//       ],
//     });
//     res.json(test);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post("/testModel", (req, res) => {
//   const {
//     surname,
//     lastname,
//     phoneNumber,
//     email,
//     insuranceNumber,
//     gender,
//     DoB,
//     occupation,
//   } = req.body;

//   const test = patientsModel.create({
//     surname,
//     lastname,
//     phoneNumber,
//     email,
//     insuranceNumber,
//     gender,
//     DoB,
//     occupation,
//   });
//   res.json(test);
// });

app.post("/api/patients", async (req, res) => {
  try {
    const {
      surname,
      lastname,
      phoneNumber,
      email,
      insuranceNumber,
      gender,
      DoB,
      occupation,
    } = req.body;

    if (!surname || !lastname || !email || !insuranceNumber || !DoB) {
      return res.status(400).json({
        error:
          "Surname, lastname, email, date of birth and insurance number are required for patient creation.",
      });
    }

    const patient = await patientsModel.create({
      surname,
      lastname,
      phoneNumber,
      email,
      insuranceNumber,
      gender,
      DoB,
      occupation,
    });

    res.status(201).json({
      id: patient.id,
      name: patient.name,
      surname: patient.surname,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// post : /api/patients (create patient )
// app.post("/api/patients", (req, res) => {
//   try {
//     const {
//       surname,
//       lastname,
//       phoneNumber,
//       email,
//       insuranceNumber,
//       gender,
//       DoB,
//       occupation,
//     } = req.body;
//     if (!surname || !lastname || !email || !insuranceNumber || !DoB) {
//       return res.status(400).json({
//         error:
//           "Surname, lastname, email, date of birth and insurance number are required for patient creation.",
//       });
//     }

//     //Check if patient exists
//     const existingPatient = patientsModel.find(
//       (patient) =>
//         patient.email === email || patient.insuranceNumber === insuranceNumber
//     );

//     if (existingPatient) {
//       return res.status(409).json({
//         error: "Patient with this data already exists",
//       });
//     }
//     // create a new patient object with ID
//     const newPatient = {
//       // id: nextPatientId++,
//       surname,
//       lastname,
//       phoneNumber,
//       email,
//       insuranceNumber: insuranceNumber,
//       gender: gender,
//       DoB: DoB,
//       occupation: occupation,
//     };
//     patients.push(newPatient);

//     res.status(201).json({
//       message: "Patient created successfully",
//       patient: newPatient,
//     });
//   } catch (error) {
//     res.send("error creating patient");
//   }
// });

// get : /api/patients (get a list of all patients)
app.get("/api/patients", (req, res) => {
  res.send(patients);
});

// get : /api/patients/:id (get one specific patient by id)
app.get("/api/patients/:id", (req, res) => {
  const reqId = Number(req.params.id);
  const selectedPatient = patients.find((patient) => patient.id === reqId);
  if (!selectedPatient) {
    return res.status(404).json({ error: "Patient not found" });
  }
  res.json(selectedPatient);
});

// post : /api/intakes/:patientId (create intake for existing patient)
app.post("/api/intakes/:patientId", (req, res) => {
  res.send("This is the intake of this patient ");
});

// get : /api/intakes/:id (get created intake)
app.get("/api/intakes/:id", (req, res) => {
  res.send("This is the selected intake");
});

// get : /api/intakes (get only active intakes)
app.get("/api/intakes/active", (req, res) => {
  res.send("These are active intakes");
});

// get : /api/intakes/all (get all intakes)
app.get("/api/intakes", (req, res) => {
  res.send("These are all existing intakes");
});

// get : /api/intakes/completed (get only completed intakes)
app.get("/api/intakes/completed", (req, res) => {
  res.send("These are all completed intakes");
});

// get : /api/intakes/:patientId (get all intakes from patientId)
app.get("/api/intakes/patientId", (req, res) => {
  res.send("These are all intakes from patientId");
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
