# Physiotherapy Assessment & Progress Tracking

This document is designed to be used at **baseline (initial assessment)**, throughout therapy (**progress notes**), and at the **end of treatment (reassessment)**. It provides consistency and allows clear comparison of results over time.

---

{""patientId", "Date", "observation & inspection", "ROM", "MST", "Neurological Screening", "Functional Tests", "Special Tests (As Needed)", "Pain Assessment", "Therapist Notes"}

see down for objects within objects:

## 1. Observation & Inspection
- **Posture assessment** (standing/sitting alignment)  
- **Gait analysis** (walking pattern, symmetry, stability)  
- **Skin inspection** (scars, swelling, redness, bruising)  

*Progress Tracking:* note any changes in posture, gait, or appearance across sessions.  

---

## 2. Range of Motion (ROM)
- **Active ROM** (patient moves independently)  
- **Passive ROM** (therapist moves the limb)  
- **Compare left vs right**  

*Progress Tracking:* record angles (°) at baseline and update at each session to track gains/losses.  

---

## 3. Muscle Strength Testing (MMT)
- **Manual muscle testing** (graded 0–5)  
- **Key muscle groups**:
  - Shoulder flexion/abduction  
  - Elbow flexion/extension  
  - Hip flexion/extension  
  - Knee flexion/extension  
  - Ankle dorsiflexion/plantarflexion  

*Progress Tracking:* update MMT scores regularly; compare baseline vs. final values.  

---

## 4. Neurological Screening
- **Sensation testing** (light touch, pinprick)  
- **Reflexes** (patellar, Achilles, biceps)  
- **Coordination** (finger-to-nose, heel-to-shin)  

*Progress Tracking:* record changes in sensation, reflexes, or coordination if applicable.  

---

## 5. Functional Tests
- **Sit-to-stand test** (reps in 30 seconds)  
- **Timed Up and Go (TUG)** (seconds)  
- **6-Minute Walk Test (6MWT)** (distance in meters)  
- **Balance tests** (single-leg stance time, Romberg)  

*Progress Tracking:* record measurable results at baseline and reassessment for clear progress visualization.  

---

## 6. Special Tests (As Needed)
*(Select based on area of complaint)*  
- **Neck/Back**: Straight Leg Raise (SLR), Spurling’s Test  
- **Shoulder**: Neer’s Test, Hawkins-Kennedy  
- **Knee**: Lachman Test, McMurray’s Test  
- **Ankle**: Anterior Drawer Test, Thompson Test  

*Progress Tracking:* document positive/negative results; reassess at the end if relevant.  

---

## 7. Pain Assessment
- **Pain scale (0–10)**  
- **Location / radiation**  
- **Aggravating factors**  
- **Relieving factors**  

*Progress Tracking:* update pain scores each session; visualize trend over time.  

---

## 8. Therapist Notes
- **Summary of findings**  
- **Initial impression / plan**  
- **Response to treatment** (for ongoing notes)  

---

## 9. Reassessment & Outcome Tracking (see plan\ptsAssessmentAndProgressTable.md)
At the end of therapy, repeat key measures:  
- Pain scale (0–10)  
- ROM (°) for key joints  
- Strength (MMT 0–5)  
- Functional tests (TUG, Sit-to-Stand, 6MWT)  
- Summarize improvements (e.g., “Knee flexion increased by 20°, Sit-to-Stand improved from 8 to 15 reps”).  

---

## 10. Data Visualization (Digital Workflow)
- **Database**: store numeric values for pain, ROM, MMT, and functional tests.  
- **Backend**: provide graph-ready endpoints (e.g., `/api/patients/:id/progress/data`).  
- **Frontend**:  
  - **Line charts** → session-by-session trends (pain, ROM, strength).  
  - **Bar charts** → baseline vs. final comparison (functional tests).  
  - **Timeline view** → milestones (goals achieved, reassessment dates).  

---

## Usage Flow
1. **Baseline** → Complete full assessment.  
2. **Progress Notes** → Update test values + SOAP notes at each session.  
3. **Reassessment** → Repeat tests at end of therapy.  
4. **Visualization** → Show measurable progress in charts for therapist & patient.
