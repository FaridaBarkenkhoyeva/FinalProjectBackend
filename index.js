const express = require("express");

const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const port = 3000;

const patients = [];
// const intakes = []
let nextPatientId = 1;

//endpoint to dashboard
app.get("/", (req, res) => {
  res.send("Dashboard");
});

// post : /api/patients (create patient )
app.post("/api/patients", (req, res) => {
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

    //Check if patient exists
    const existingPatient = patients.find(
      (patient) =>
        patient.email === email || patient.insuranceNumber === insuranceNumber
    );

    if (existingPatient) {
      return res.status(409).json({
        error: "Patient with this data already exists",
      });
    }
    // create a new patient object with ID
    const newPatient = {
      id: nextPatientId++,
      surname,
      lastname,
      phoneNumber,
      email,
      insuranceNumber: insuranceNumber || null,
      gender: gender || null,
      DoB: DoB || null,
      occupation: occupation || null,
      // createdAt: new Date().toISOString(),
    };
    patients.push(newPatient);

    res.status(201).json({
      message: "Patient created successfully",
      patient: newPatient,
    });
  } catch (error) {
    res.send("error creating patient");
  }
});

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
