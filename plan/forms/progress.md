# Physiotherapy Progress Notes Plan

## 1. Note Structure

Progress notes should follow a consistent format (commonly **SOAP**):

- **S – Subjective**: Patient’s report (pain level, changes since last session).
- **O – Objective**: Therapist’s findings (ROM, strength, mobility, test results).
- **A – Assessment**: Clinical impression, patient’s response to treatment.
- **P – Plan**: Next steps (treatment adjustments, home exercises, goals).

## 2. Frequency

- Create a note **after every treatment session**.

## 3. Documentation Guidelines

- Keep notes **clear, concise, and factual**.
- Use **measurable data** (e.g., “Knee flexion improved from 90° to 110°”).
- Always **date and sign** entries.
- Link notes to the **specific patient record** for easy tracking.

---

## 4. Digital Workflow

- **Frontend (React)**:

  - Form with SOAP fields
  - List/timeline view of previous notes

- **Backend (Express.js)**:

  - API routes:
    - `POST /api/patients/:id/progress` → add note
    - `GET /api/patients/:id/progress` → view all notes

- **Database (PostgreSQL)**:
  - `progress_notes` table:
    - `id`
    - `patient_id` (FK)
    - `date`
    - `subjective`, `objective`, `assessment`, `plan`
