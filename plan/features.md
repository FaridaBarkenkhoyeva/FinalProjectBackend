1. user can create new patient
user can have a list of active patients 
2. user can create intake with initiated data, for new patient.
User has to do the assessment of the patient
user can see assessment next to generated intake
3. user to create goals and plan for patient - user can also see the generated assessment 
4. user can do the re-assessment tests during the last session. 
5. user creates endevaluation of patients treatment flow and share 7. user can check sessions and patient list from dashboard 8. user can plan the schedule 9. user can sign-up and log in

2. Backend:
   with endpoints and variables
   postman for the endpoints
   organize the project into files => start splitting into folder from the start!
   build/text the functions (get all post / rent a car)
   setup CORS for frontend calls
   migrate data
3. Database: sql, sequelize
   create car table and convert all controllers "not related to renting"
   create rent table and convert ...

4. Frontend:
   Struction the project (components, pages, layouts...)
   setup (router, context api, tailwind, daisyUI)
   setup CORS on the backend
   run the endpoints one by one starting form cars => rent

Phases

- Phase 1
  user can create intake with initiated data, for new patient.
  Patient = {"id" (PK), "surname", "lastname", "phoneNumber", "email", "insurance number", gender, DoB, occupation}
  
  Intake=
  {
  "Id",
  "Status": {pending, in progress, completed}
  "patientId",
  "Chief Complaint ID",
  "Medical History",
  "Musculoskeletal / Injury History",
  "Functional Status",
  "Lifestyle Factors",
  "Family & Social History",
  "Patient Goals",
  "Therapist Notes"
  }

Chief Complaint = {"id", "intakeId", "Primary reason for visit",
"Onset of symptoms",
"Duration",
"Pain level (0–10)}"

Medical History ={"ID", "intakeId","Past illnesses / conditions",
"Surgeries",
"Current medications",
"Allergies"}

Musculoskeletal / Injury History = { ID, intakeId,
previous injuries,
fractures / sprains / dislocations,
Chronic pain conditions }

Functional Status = { id, intakeId
Daily activities affected,
Mobility level (independent/assisted),
Use of aids (cane, walker, wheelchair, orthotics)}

Lifestyle Factors = { id, intakeId
Physical activity / exercise routine,
Work demands ,
Hobbies / sports"}

work demands: {sedentary, heavy labor, repetitive tasks} (just selectible feature)

Family & Social History = { id, intakeId
Relevant family medical history,
Social habits (smoking, alcohol, etc.)
}

Patient Goals ={ id, intakeId
Short-term goals,
Long-term goals }

Therapist Notes = { id, intakeId,
Observations,
Additional comments }

Backend Routes

// create patient (1 time), then create intake, next time a patient visits for another treatment case, you create a new intake for the same patient. 

post : /api/patients (create patient ) apply api's 
get : /api/patients (get a list of all patients)
get : /api/patients/:id (get one specific patient by id)
post : /api/intakes/:patientId (create intake for existing patient)
get : /api/intakes/:id (get created intake)

get : /api/intakes (get only active intakes)
get : /api/intakes/all (get all intakes)
get : /api/intakes/completed (get only completed intakes)
get : /api/intakes/:patientId (get all intakes from patientId)


might be implemented in future phases:
put :/api/intakes/:id (update intake)
delete : /api/intakes/:id (delete intake)
post : /api/intakes (create intake from non existent patient)


front-end pages
wireframe miro prompt
create a wireframe for physiotherapist. layout: simple, professional and minimal, more blueish of color. First page is dashboard, left side of dashboard ; a list of active patients, on the right side is weekly schedule. 
Physio can create a patient (Patient = {"id" (PK), "surname", "lastname", "phoneNumber", "email", "insurance number", gender, DoB, occupation}) by adding with button in dashboard, this adds patient to list of patients and jumps to next screen: patient intake form. (Intake=
  {
  "Id",
  "patientId",
  "Chief Complaint ID",
  "Medical History",
  "Musculoskeletal / Injury History",
  "Functional Status",
  "Lifestyle Factors",
  "Family & Social History",
  "Patient Goals",
  "Therapist Notes"
  })



- Phase 2
  user can create and add assessments to patientCase
  Assessment = {"patientId", "Date", "observation & inspection", "ROM", "MST", "Neurological Screening", "Functional Tests", "Special Tests (As Needed)", "Pain Assessment", "Therapist Notes"}

- Phase 3
  user to create goals and plan for patient

`treatment_plans` = {"numberOfSessions", "shortTermGoals", "longTermGoals", "plannedInterventions", "additionalGoals"}

- Phase 4
  user creates endevaluation of patients treatment flow and share
  endReport = {patient, intake,
  "Assessments",
  "treatment_Plans"
  }



