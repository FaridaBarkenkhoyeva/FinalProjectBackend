const patientsModel = require("../models/patientsModel");
const patientController = {

createPatient : async (req, res) => {
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

    const existingPatient = await patientsModel.findOne({
      where: { insuranceNumber: insuranceNumber },
    });
    if (existingPatient) {
      return res.status(409).json({
        error: "Patient already exists",
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
},

// get :  (get a list of all patients)
allPatients : async (req, res) => {
  try {
    const patients = await patientsModel.findAll({
      attributes: [
        "id",
        "surname",
        "lastname",
        "phoneNumber",
        "email",
        "insuranceNumber",
        "gender",
        "DoB",
        "occupation",
      ],
    });
    // if (!patients) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
},

// get : /:id (get one specific patient by id)
 getPatient : async (req, res) => {
  const patient = await patientsModel.findByPk(req.params.id);
  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }
  res.json(patient);
}
}

module.exports = patientController