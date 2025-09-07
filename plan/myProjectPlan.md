# Physiotherapy App Project Plan

## Phase 1: The Core Foundation (MVP)

This phase focuses on the essential features you've identified as high-priority, Getting these right is crucial for the app's success.

### 1. User Authentication and Account Management

Before any patient data can be stored, you need a secure way to manage physiotherapist users.

- **Database Schema**:  
   Create tables for `users`. This table will store user credentials, roles, etc.
  user = {"id", "surname", "lastName", "email", "password"}

- **Backend**:  
  Develop Express.js routes for:

  - User registration (`/api/register`)
  - Login (`/api/login`)
  - Protect routes using middleware (e.g., JSON Web Tokens - JWT).

- **Frontend**:  
  Create a login page and a registration page in React.

---

### 2. Patient Data & Intake (Feature 1)

This is the heart of the application. You need a solid way to store and retrieve patient information.

- **Database Schema**:  
  Create tables for `patients` and `anamnesis` (intake/medical history). The `anamnesis` table will likely have a **one-to-one relationship** with the `patients` table.

  patients = {"id", "surname", "lastname", "phoneNumber", "email", "insurance number"}
  anamnesis = {"", ""} (look at anamnesis file)

- **Backend**:  
  Create a RESTful API with routes like `/api/patients` to create, read, update, and delete patient records.

- **Frontend**:  
  Design a React component with forms to capture patient demographic details and the anamnesis information.

---

### 3. Patient Assessment and Progress Tracking (Features 2, 5)

This functionality allows the physiotherapist to document and follow a patient's journey.

- **Database Schema**:  
   Create tables for `assessments` (and `progress_notes`.  )
   These tables should have a **one-to-many relationship** with the `patients` table (one patient can have many assessments and many notes).
  See md files: ptsAssessmentAndProgress.md and
  ptsAssessmentAndProgressTable.md
- **Backend**:  
  Add API routes for creating, retrieving, and updating assessments and progress notes associated with a specific patient:  
  `/api/patients/:id/assessments`

- **Frontend**:  
  Build React components with forms and lists for:
  - Adding new assessments
  - Adding progress notes
  - Viewing the patient's history

---

### 4. Treatment Goals & Plans (Feature 4)

see plan\treatmentPlanAndGoals.md

This is where the physiotherapist's expertise is documented and put into action.

- **Database Schema**:  
  Create a `treatment_plans` table to store treatment goals and the planned interventions.  
  This table should have a **one-to-many relationship** with the `patients` table.
`treatment_plans` = {"shortTermGoals", "longTermGoals", "plannedInterventions", "additionalGoals"}

- **Backend**:  
  Add API routes to handle the creation and management of treatment plans.

- **Frontend**:  
  Create a dedicated React component to create and view treatment plans.

---

## Phase 2: Enhancements & Scheduling

Once the core MVP is stable, you can move on to the next set of features.

### 1. Weekly Schedule (Feature 3)

- **Database Schema**:  
  Design a `schedule` table that links patients, dates, and times.

- **Backend**:  
  Develop API endpoints to manage scheduled appointments.

- **Frontend**:  
  Build a responsive calendar component in React that:
  - Displays scheduled patients for a week
  - Allows for easy booking

---

### 2. End Evaluation (Feature 6)

- **Database Schema**:  
  Create an `evaluations` table with a **one-to-one relationship** with the `patients` table.  
  This will store the final summary and outcome of the treatment.

- **Backend**:  
  Add a dedicated API route for generating the final evaluation.

- **Frontend**:  
  Create a final evaluation form that summarizes the patient's journey based on the data already in the system.

---

## Phase 3: Reporting & File Generation

This phase is the most complex and should be tackled last.

### 1. PDF Generation & Export (Feature 7)

- **Backend**:  
  This is likely where the PDF generation will happen.  
  Libraries like **jsPDF** or **node-html-to-pdf** can be used to take the patient's complete data and format it into a professional document.

- **Frontend**:  
  Create a button or a dedicated page that triggers the PDF generation process via an API call.

---

## Features You're Missing and "Too Many" Features

### ✅ You are not missing any critical features for the core functionality, but for a real-world product, you will need to consider:

- **Data Security and Privacy (HIPAA/GDPR)**:  
  This is paramount for medical data.  
  You need to ensure all data is encrypted both in transit and at rest.

- **Error Handling and Validation**:  
  Robust validation on both the frontend and backend will prevent bad data from corrupting your database.

- **Deployment**:  
  You'll need to learn how to deploy your React app, Express.js server, and Neon.db to a cloud provider.
