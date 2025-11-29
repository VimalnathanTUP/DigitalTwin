import { Claim, ClaimStatus, AnalysisResult } from './types';

export const MOCK_CLAIMS: Claim[] = [
  {
    id: 'C-1001',
    patientName: 'John Smith',
    patientDob: '1980-04-12',
    memberId: 'MEM-882910',
    gender: 'Male',
    provider: 'City Hospital',
    providerNpi: '1234567890',
    facility: 'City Hospital Main Campus',
    admissionDate: '2024-05-18',
    dischargeDate: '2024-05-20',
    claimType: 'Facility DRG',
    diagnosisCode: 'J18.9',
    diagnosisDescription: 'Pneumonia, unspecified organism',
    procedureCode: '99223',
    procedureDescription: 'Initial hospital care',
    drgCode: '194',
    drgDescription: 'Simple Pneumonia & Pleurisy w CC',
    priorAuthNumber: 'PA-992011',
    amount: 12000,
    units: 1,
    modifiers: [],
    date: '2024-05-20',
    status: ClaimStatus.APPROVED,
    riskScore: 5,
    clinicalSummary: "Admission note confirms pneumonia diagnosis (J18.9). Procedure 99223. No issues.",
    attachments: [
      { 
        name: 'Admission_Note.pdf', 
        type: 'pdf', 
        date: '2024-05-18', 
        size: '1.2MB',
        content: `ADMISSION H&P
Patient: John Smith
DOB: 04/12/1980
Date: 05/18/2024

CC: Shortness of breath, fever.

HPI: 44 y/o male presents with 3 day hx of productive cough and high fevers. 

Vitals: Temp 102.1F, HR 105, BP 130/85, RR 24, SpO2 92% on RA.

Physical Exam: 
Gen: Alert, mild distress.
Pulm: *Crackles noted in RLL*. 
CV: Tachycardic, regular rhythm.

Assessment:
1. Community Acquired Pneumonia (J18.9).
2. Dehydration.

Plan: 
Admit to Medical Floor.
Start Ceftriaxone/Azithromycin.
IV Fluids.
Oxygen 2L NC.`
      },
      { 
        name: 'Discharge_Summary.pdf', 
        type: 'pdf', 
        date: '2024-05-20', 
        size: '0.8MB',
        content: `DISCHARGE SUMMARY
Date: 05/20/2024

Hospital Course: Patient responded well to antibiotics. Fever resolved on day 2. Weaned off oxygen.

Discharge Diagnoses:
1. Pneumonia, RLL.
2. *Pleural effusion (small) noted on X-ray* (CC).

Discharge Plan:
Complete oral antibiotics course.
Follow up with PCP in 1 week.`
      },
      { 
        name: 'Chest_XRay.jpg', 
        type: 'img', 
        date: '2024-05-18', 
        size: '3.5MB',
        content: `RADIOLOGY REPORT
Exam: Chest 2 Views
Findings:
Focal consolidation in the right lower lobe consistent with pneumonia. Small right-sided pleural effusion present. No pneumothorax.
Impression: *RLL Pneumonia with parapneumonic effusion*.`
      }
    ]
  },
  {
    id: 'C-1002',
    patientName: 'Sarah Johnson',
    patientDob: '1975-08-22',
    memberId: 'MEM-445102',
    gender: 'Female',
    provider: 'Regional Medical Center',
    providerNpi: '9876543210',
    facility: 'Regional Med Center Outpatient',
    admissionDate: '2024-05-21',
    dischargeDate: '2024-05-21',
    claimType: 'Professional',
    diagnosisCode: 'I10',
    diagnosisDescription: 'Essential (primary) hypertension',
    procedureCode: '99213',
    procedureDescription: 'Office/outpatient visit est',
    drgCode: 'N/A',
    drgDescription: 'N/A',
    amount: 250,
    units: 1,
    modifiers: ['25'],
    date: '2024-05-21',
    status: ClaimStatus.REVIEW,
    riskScore: 35,
    clinicalSummary: "Hypertension (I10). Missing lab result (BMP) in documentation.",
    attachments: [
      { 
        name: 'Office_Visit_Note.pdf', 
        type: 'pdf', 
        date: '2024-05-21', 
        size: '0.5MB',
        content: `OFFICE VISIT
Patient: Sarah Johnson
Date: 05/21/2024

Subjective: Patient returns for BP check. Reports taking Lisinopril as directed. No headaches or dizziness.

Objective:
BP: 135/82
HR: 76

Assessment:
1. Essential Hypertension (I10) - Stable.

Plan:
Continue current meds.
*Reviewed lab results drawn today (BMP)* - [NOT ATTACHED TO CHART].
Refill Lisinopril 10mg.
Return in 6 months.`
      }
    ]
  },
  {
    id: 'C-1003',
    patientName: 'David Lee',
    patientDob: '1960-03-15',
    memberId: 'MEM-112233',
    gender: 'Male',
    provider: 'Metro General Hospital',
    providerNpi: '1122334455',
    facility: 'Metro General Inpatient Wing',
    admissionDate: '2024-05-18',
    dischargeDate: '2024-05-22',
    claimType: 'Facility DRG',
    diagnosisCode: 'J18.9',
    diagnosisDescription: 'Pneumonia, unspecified organism',
    procedureCode: '99223',
    procedureDescription: 'Initial hospital care',
    drgCode: '193',
    drgDescription: 'Simple Pneumonia & Pleurisy w MCC',
    priorAuthNumber: 'PA-551100',
    amount: 19000,
    units: 1,
    modifiers: [],
    date: '2024-05-22',
    status: ClaimStatus.FLAGGED,
    riskScore: 92,
    clinicalSummary: "Pneumonia (J18.9). Upcoding suspected; Missing clinical evidence; Patient DOB mismatch.",
    attachments: [
      { 
        name: 'Admission_FaceSheet.pdf', 
        type: 'pdf', 
        date: '2024-05-18', 
        size: '0.3MB',
        content: `ADMISSION FACESHEET
Facility: Metro General Hospital
Patient: David Lee
MRN: 9988112
*DOB: 03/15/1962*  <-- [MISMATCH: Claim says 1960]
Admit Date: 05/18/2024
Primary Payor: HealthPlus`
      },
      { 
        name: 'Progress_Notes.pdf', 
        type: 'pdf', 
        date: '2024-05-19', 
        size: '2.1MB',
        content: `INPATIENT PROGRESS NOTE
Date: 05/19/2024

S: Patient states he feels "much better". Cough improving. No fever.

O: 
Vitals: Temp 98.6, HR 72, BP 120/80, RR 16, SpO2 98% on Room Air.
Lungs: Clear to auscultation bilaterally.
Labs: WBC 8.0 (Normal). Lactate 0.9 (Normal).
Mental Status: Alert and Oriented x4.

A/P:
1. Pneumonia - Resolving.
2. Hypertension - Controlled.

NOTE: *No criteria for Sepsis or Severe Respiratory Failure met*. Patient stable on room air.
Plan: Switch to oral Levofloxacin. Anticipate discharge tomorrow.`
      }
    ]
  },
  {
    id: 'C-1004',
    patientName: 'Maria Gonzalez',
    patientDob: '1985-11-05',
    memberId: 'MEM-998877',
    gender: 'Female',
    provider: 'Sunrise Clinic',
    providerNpi: '5566778899',
    facility: 'Sunrise Clinic Lab',
    admissionDate: '2024-05-22',
    claimType: 'Professional',
    diagnosisCode: 'E11.9',
    diagnosisDescription: 'Type 2 diabetes mellitus w/o complications',
    procedureCode: '83036',
    procedureDescription: 'Hemoglobin A1C Level',
    amount: 150,
    units: 1,
    date: '2024-05-22',
    status: ClaimStatus.APPROVED,
    riskScore: 2,
    clinicalSummary: "Diabetes screening (E11.9). Documentation aligns with code.",
    attachments: [
      { 
        name: 'Lab_Order.pdf', 
        type: 'pdf', 
        date: '2024-05-22', 
        size: '0.2MB',
        content: `LAB REQUISITION
Order: Hemoglobin A1c
Dx: *E11.9 (Type 2 Diabetes)*
Provider: Dr. S. Martinez`
      },
      { 
        name: 'A1C_Results.pdf', 
        type: 'pdf', 
        date: '2024-05-22', 
        size: '0.4MB',
        content: `LAB RESULTS
Test: Hemoglobin A1c
Result: 6.8%
Reference Range: 
< 5.7% Normal
5.7 - 6.4% Prediabetes
> 6.5% Diabetes

Status: Final`
      }
    ]
  },
  {
    id: 'C-1005',
    patientName: 'James Carter',
    patientDob: '1955-06-30',
    memberId: 'MEM-334455',
    gender: 'Male',
    provider: 'Lakeside Hospital',
    providerNpi: '6677889900',
    facility: 'Lakeside Cardiac Center',
    admissionDate: '2024-05-23',
    claimType: 'Professional',
    diagnosisCode: 'I25.10',
    diagnosisDescription: 'Atherosclerotic heart disease',
    procedureCode: '92928',
    procedureDescription: 'Stent Placement',
    priorAuthNumber: 'PA-CARDIAC-01',
    amount: 15000,
    units: 1,
    modifiers: ['LC'],
    date: '2024-05-23',
    status: ClaimStatus.FLAGGED,
    riskScore: 88,
    clinicalSummary: "Coronary Atherosclerosis (I25.10). Incorrect coding; Missing cath lab report.",
    attachments: [
      { 
        name: 'Op_Report_Draft.doc', 
        type: 'doc', 
        date: '2024-05-23', 
        size: '0.1MB',
        content: `OPERATIVE NOTE (DRAFT)
Patient: James Carter
Procedure: Cardiac Catheterization
Date: 05/23/2024

Vessels engaged: Left Main, LAD, LCx.
Intervention:
*DES deployed to mid-LAD (Left Anterior Descending)*.
Note: LCx (Left Circumflex) showed 40% stenosis, no intervention performed.

Coding Note:
Provider billed 92928-LC (Left Circumflex).
Documentation supports intervention on LAD only (should be -LD modifier or generic code).

*PENDING FINAL CATH LAB HEMODYNAMIC REPORT*`
      }
    ]
  },
  {
    id: 'C-1006',
    patientName: 'Emily Davis',
    patientDob: '1990-01-15',
    memberId: 'MEM-221100',
    gender: 'Female',
    provider: 'Northside Medical',
    providerNpi: '7788990011',
    facility: 'Northside Pulmonology',
    admissionDate: '2024-05-23',
    claimType: 'Professional',
    diagnosisCode: 'J45.909',
    diagnosisDescription: 'Unspecified asthma, uncomplicated',
    procedureCode: '94640',
    procedureDescription: 'Airway Inhalation Treatment',
    amount: 400,
    units: 2,
    date: '2024-05-23',
    status: ClaimStatus.REVIEW,
    riskScore: 40,
    clinicalSummary: "Asthma (J45.909). Incomplete spirometry documentation.",
    attachments: [
      { 
        name: 'Clinic_Note.pdf', 
        type: 'pdf', 
        date: '2024-05-23', 
        size: '0.6MB',
        content: `PULMONARY CLINIC NOTE
Patient: Emily Davis
Dx: Asthma

Subjective: Patient reports wheezing with exercise.

Objective:
Lungs: Diffuse expiratory wheezing.
Treatment: Administered Albuterol neb x 2 in clinic.

Plan: 
Continue Advair.
Spirometry performed pre/post bronchodilator.
*[SPIROMETRY DATA FIELD BLANK]*`
      }
    ]
  },
  {
    id: 'C-1007',
    patientName: 'Robert Brown',
    patientDob: '2001-09-09',
    memberId: 'MEM-774411',
    gender: 'Male',
    provider: 'City Hospital',
    providerNpi: '1234567890',
    facility: 'City Hospital Surgery Center',
    admissionDate: '2024-05-24',
    dischargeDate: '2024-05-25',
    claimType: 'Facility DRG',
    diagnosisCode: 'K35.80',
    diagnosisDescription: 'Unspecified acute appendicitis',
    procedureCode: '44950',
    procedureDescription: 'Appendectomy',
    amount: 8000,
    units: 1,
    date: '2024-05-24',
    status: ClaimStatus.APPROVED,
    riskScore: 4,
    clinicalSummary: "Acute Appendicitis (K35.80). Documentation complete.",
    attachments: [
      { 
        name: 'Surgical_Report.pdf', 
        type: 'pdf', 
        date: '2024-05-24', 
        size: '1.5MB',
        content: `OPERATIVE REPORT
Procedure: Laparoscopic Appendectomy
Indication: Acute Appendicitis
Findings: *Inflamed, non-perforated appendix identified*.
Specimen: Appendix sent to pathology.
Complications: None.`
      },
      { 
        name: 'Pathology_Report.pdf', 
        type: 'pdf', 
        date: '2024-05-25', 
        size: '0.9MB',
        content: `PATHOLOGY REPORT
Specimen: Appendix
Diagnosis: *Acute suppurative appendicitis*. No malignancy.`
      }
    ]
  },
  {
    id: 'C-1008',
    patientName: 'Linda White',
    patientDob: '1948-12-01',
    memberId: 'MEM-665544',
    gender: 'Female',
    provider: 'Regional Medical Center',
    providerNpi: '9876543210',
    facility: 'Regional Stroke Unit',
    admissionDate: '2024-05-20',
    dischargeDate: '2024-05-24',
    claimType: 'Facility DRG',
    diagnosisCode: 'I63.9',
    diagnosisDescription: 'Cerebral infarction, unspecified',
    procedureCode: '99223',
    procedureDescription: 'Initial hospital care',
    drgCode: '061',
    drgDescription: 'Ischemic Stroke w Use of Thrombolytic Agent w MCC',
    amount: 22000,
    units: 1,
    date: '2024-05-24',
    status: ClaimStatus.FLAGGED,
    riskScore: 95,
    clinicalSummary: "Stroke (I63.9). Upcoding suspected; Missing neuroimaging evidence.",
    attachments: [
      { 
        name: 'Discharge_Summary.pdf', 
        type: 'pdf', 
        date: '2024-05-24', 
        size: '1.1MB',
        content: `DISCHARGE SUMMARY
Patient: Linda White
Admit Diagnosis: CVA
Discharge Diagnosis: Ischemic Stroke

Course:
Patient presented with L sided weakness. 
Last known well time was > 6 hours prior to arrival.
*tPA was NOT administered due to time window*.

Coding Query: 
DRG 061 billed (Use of Thrombolytic Agent).
Documentation states tPA NOT given.
No documentation of Coma or severe MCC.
Correct DRG should be 065 (Ischemic Stroke w/o CC/MCC).`
      }
    ]
  },
  {
    id: 'C-1009',
    patientName: 'Michael Green',
    patientDob: '1965-04-20',
    memberId: 'MEM-332211',
    gender: 'Male',
    provider: 'Metro General Hospital',
    providerNpi: '1122334455',
    facility: 'Metro Dialysis Center',
    admissionDate: '2024-05-25',
    claimType: 'Professional',
    diagnosisCode: 'N18.6',
    diagnosisDescription: 'End stage renal disease',
    procedureCode: '90935',
    procedureDescription: 'Hemodialysis Procedure',
    amount: 600,
    units: 1,
    date: '2024-05-25',
    status: ClaimStatus.REVIEW,
    riskScore: 30,
    clinicalSummary: "ESRD (N18.6). Missing dialysis session note.",
    attachments: [
        { 
          name: 'Billing_Sheet.pdf', 
          type: 'pdf', 
          date: '2024-05-25', 
          size: '0.2MB',
          content: `BILLING FACE SHEET
Date: 05/25/2024
Code: 90935 (Hemodialysis, single eval)
Provider: Dr. Renal
Note: *Session Log missing from packet*.` 
        }
    ]
  },
  {
    id: 'C-1010',
    patientName: 'Patricia Hall',
    patientDob: '1995-07-17',
    memberId: 'MEM-009988',
    gender: 'Female',
    provider: 'Sunrise Clinic',
    providerNpi: '5566778899',
    facility: 'Sunrise Urgent Care',
    admissionDate: '2024-05-25',
    claimType: 'Professional',
    diagnosisCode: 'J06.9',
    diagnosisDescription: 'Acute upper respiratory infection',
    procedureCode: '99212',
    procedureDescription: 'Outpatient visit Level 2',
    amount: 120,
    units: 1,
    date: '2024-05-25',
    status: ClaimStatus.APPROVED,
    riskScore: 1,
    clinicalSummary: "Upper Resp Infection (J06.9). Documentation supports Level 2.",
    attachments: [
        { 
          name: 'Encounter_Note.pdf', 
          type: 'pdf', 
          date: '2024-05-25', 
          size: '0.3MB',
          content: `URGENT CARE NOTE
CC: Sore throat, runny nose x 2 days.
Exam: 
Throat: Mild erythema, no exudate.
Lungs: Clear.
Dx: URI.
Plan: Supportive care, fluids, rest.
Level of Service: *99212* (Focused history/exam, straightforward decision making).`
        }
    ]
  },
  {
    id: 'C-1011',
    patientName: 'William King',
    patientDob: '1950-02-28',
    memberId: 'MEM-776655',
    gender: 'Male',
    provider: 'Lakeside Hospital',
    providerNpi: '6677889900',
    facility: 'Lakeside Oncology',
    admissionDate: '2024-05-26',
    claimType: 'Professional',
    diagnosisCode: 'C50.919',
    diagnosisDescription: 'Malignant neoplasm of unsp site of unspecified breast',
    procedureCode: '19303',
    procedureDescription: 'Mastectomy, Simple, Complete',
    amount: 9000,
    units: 1,
    modifiers: ['RT'],
    date: '2024-05-26',
    status: ClaimStatus.FLAGGED,
    riskScore: 90,
    clinicalSummary: "Breast Cancer (C50.919). Incorrect coding; Missing pathology report.",
    attachments: [
        { 
          name: 'Op_Note.pdf', 
          type: 'pdf', 
          date: '2024-05-26', 
          size: '1.4MB',
          content: `OPERATIVE NOTE
Procedure: Right Modified Radical Mastectomy.
Details: 
Removed right breast tissue.
*Dissected Level I and II axillary lymph nodes sent for pathology*.
Closure: Layered closure with drains placed.

Coding Discrepancy:
Billed 19303 (Simple Mastectomy).
Documentation describes removal of axillary lymph nodes.
Correct code is 19307 (Modified Radical Mastectomy).`
        }
    ]
  },
  {
    id: 'C-1012',
    patientName: 'Barbara Scott',
    patientDob: '1970-10-10',
    memberId: 'MEM-443322',
    gender: 'Female',
    provider: 'Northside Medical',
    providerNpi: '7788990011',
    facility: 'Northside Lab',
    admissionDate: '2024-05-26',
    claimType: 'Professional',
    diagnosisCode: 'E78.5',
    diagnosisDescription: 'Hyperlipidemia, unspecified',
    procedureCode: '80061',
    procedureDescription: 'Lipid Panel',
    amount: 200,
    units: 1,
    date: '2024-05-26',
    status: ClaimStatus.REVIEW,
    riskScore: 28,
    clinicalSummary: "Hyperlipidemia (E78.5). Missing lipid panel result documentation.",
    attachments: [
        { 
          name: 'Lab_Requisition.pdf', 
          type: 'pdf', 
          date: '2024-05-26', 
          size: '0.1MB',
          content: `LAB ORDER
Test: Lipid Panel (80061)
Indication: Screening
Status: Specimen Collected.
Result: *[PENDING UPLOAD]*`
        }
    ]
  },
  {
    id: 'C-1013',
    patientName: 'Christopher Adams',
    patientDob: '1982-05-05',
    memberId: 'MEM-110099',
    gender: 'Male',
    provider: 'City Hospital',
    providerNpi: '1234567890',
    facility: 'City Hospital Urgent Care',
    admissionDate: '2024-05-27',
    claimType: 'Professional',
    diagnosisCode: 'J20.9',
    diagnosisDescription: 'Acute bronchitis, unspecified',
    procedureCode: '99214',
    procedureDescription: 'Outpatient visit Level 4',
    amount: 300,
    units: 1,
    date: '2024-05-27',
    status: ClaimStatus.APPROVED,
    riskScore: 6,
    clinicalSummary: "Acute Bronchitis (J20.9). Documentation supports complexity.",
    attachments: [
        { 
          name: 'Visit_Summary.pdf', 
          type: 'pdf', 
          date: '2024-05-27', 
          size: '0.4MB',
          content: `URGENT CARE VISIT
HPI: Worsening cough x 2 weeks, productive green sputum. History of asthma. Using rescue inhaler q4h.
Exam: 
Gen: In distress, speaking in short sentences.
Lungs: Diffuse wheezing and rhonchi.
Plan: 
Nebulizer treatment in office.
Prescribe Prednisone burst + Azithromycin.
Detailed asthma action plan review.
*Level 4 (99214)* supported by moderate complexity and prescription drug management.`
        }
    ]
  },
  {
    id: 'C-1014',
    patientName: 'Jessica Turner',
    patientDob: '1959-11-22',
    memberId: 'MEM-554433',
    gender: 'Female',
    provider: 'Regional Medical Center',
    providerNpi: '9876543210',
    facility: 'Regional Cardiac Cath Lab',
    admissionDate: '2024-05-27',
    claimType: 'Professional',
    diagnosisCode: 'I21.9',
    diagnosisDescription: 'Acute myocardial infarction, unspecified',
    procedureCode: '92941',
    procedureDescription: 'Percutaneous Coronary Intervention',
    amount: 18000,
    units: 1,
    date: '2024-05-27',
    status: ClaimStatus.FLAGGED,
    riskScore: 89,
    clinicalSummary: "Acute MI (I21.9). Incorrect coding; Missing ECG evidence.",
    attachments: [
        { 
          name: 'Cath_Report.pdf', 
          type: 'pdf', 
          date: '2024-05-27', 
          size: '1.8MB',
          content: `CATHETERIZATION REPORT
Indication: Chest Pain.
Findings: 90% stenosis of RCA.
Intervention: DES placed in RCA.
Note: Patient hemodynamically stable throughout.

Coding Review:
Billed 92941 (PCI for Acute MI).
ECG Findings: *[MISSING]*.
Troponin: 0.04 (Normal).
Clinical picture consistent with Unstable Angina, NOT Acute MI.
Code should be 92928 (PCI w/ stent), not 92941.`
        }
    ]
  },
  {
    id: 'C-1015',
    patientName: 'Daniel Harris',
    patientDob: '1978-08-30',
    memberId: 'MEM-223344',
    gender: 'Male',
    provider: 'Metro General Hospital',
    providerNpi: '1122334455',
    facility: 'Metro Radiology',
    admissionDate: '2024-05-28',
    claimType: 'Professional',
    diagnosisCode: 'M54.5',
    diagnosisDescription: 'Low back pain',
    procedureCode: '72100',
    procedureDescription: 'X-Ray Exam of Spine',
    amount: 500,
    units: 1,
    date: '2024-05-28',
    status: ClaimStatus.REVIEW,
    riskScore: 33,
    clinicalSummary: "Low Back Pain (M54.5). Incomplete radiology report.",
    attachments: [
        { 
          name: 'XRay_Image_01.jpg', 
          type: 'img', 
          date: '2024-05-28', 
          size: '4.2MB',
          content: `[IMAGE DATA]
L-Spine AP/Lateral View.`
        },
        { 
          name: 'Report_Draft.txt', 
          type: 'doc', 
          date: '2024-05-28', 
          size: '0.01MB',
          content: `RADIOLOGY PRELIMINARY
Exam: L-Spine
Findings: Mild degenerative changes L4-L5. No fracture.
Status: Preliminary.
Signed by: *[UNSIGNED]* - Requires final radiologist signature for billing.`
        }
    ]
  }
];

// Helper to generate a consistent "No Risk" result
const getNoRiskResult = (claim: Claim): AnalysisResult => ({
    idealDrg: claim.drgCode || claim.procedureCode,
    idealDrgDesc: claim.drgDescription || claim.procedureDescription,
    actualDrg: claim.drgCode || claim.procedureCode,
    actualDrgDesc: claim.drgDescription || claim.procedureDescription,
    financialImpact: 0,
    rootCauses: [],
    providerGuidance: [],
    systemicTrend: "Consistent compliance detected for this provider/code.",
    confidence: 0.99,
    actualLogic: "Consistent with clinical indicators",
    idealLogic: "Consistent with payer policy",
    actualEvidence: "Complete",
    idealEvidence: "Complete",
    actualCompliance: "Compliant",
    idealCompliance: "Compliant",
    gapAnalysis: "No gaps identified",
    keyDifferences: []
});

// Mock results populated for all IDs
export const MOCK_ANALYSIS_RESULTS: Record<string, AnalysisResult> = {
  'C-1001': getNoRiskResult(MOCK_CLAIMS[0]),
  'C-1002': {
    idealDrg: "99213",
    idealDrgDesc: "Outpatient visit Level 3",
    actualDrg: "99213",
    actualDrgDesc: "Outpatient visit Level 3",
    financialImpact: 0,
    rootCauses: [
      { title: "Missing Clinical Documentation", description: "Basic Metabolic Panel (BMP) result not found in attachment.", type: "missing_info", severity: "low" }
    ],
    providerGuidance: [
      { 
        action: "Upload Lab Results", 
        detail: "Attach BMP report.", 
        icon: "doc",
        rationale: "Documentation of lab results is required when lab review is a component of MDM for E&M leveling.",
        reference: "E&M Guidelines 2024, Section: Data Reviewed"
      }
    ],
    systemicTrend: "Minor documentation gaps.",
    confidence: 0.95,
    actualLogic: "Level 3 visit",
    idealLogic: "Level 3 visit",
    actualEvidence: "Visit Note attached",
    idealEvidence: "Visit Note + Labs required",
    actualCompliance: "Minor Gap",
    idealCompliance: "Compliant",
    gapAnalysis: "Missing lab evidence for BMP",
    keyDifferences: ["Lab results referenced but not attached"]
  },
  'C-1003': {
    idealDrg: "194",
    idealDrgDesc: "Simple Pneumonia & Pleurisy w CC",
    actualDrg: "193",
    actualDrgDesc: "Simple Pneumonia & Pleurisy w MCC",
    financialImpact: 7000,
    rootCauses: [
      { title: "Potential Upcoding", description: "No respiratory failure/sepsis documented for MCC.", type: "coding_error", severity: "high" },
      { title: "Missing Clinical Evidence", description: "Radiology/Labs missing.", type: "missing_info", severity: "medium" },
      { title: "Patient Identity Mismatch", description: "DOB Mismatch.", type: "contract_mismatch", severity: "high" }
    ],
    providerGuidance: [
      { 
        action: "Correct DRG Coding", 
        detail: "Downgrade claim from DRG 193 to 194. The documentation provided does not substantiate the presence of a Major Complication or Comorbidity (MCC) required for DRG 193.", 
        icon: "code",
        rationale: "Per the 'Inpatient Pneumonia Clinical Policy (v2024.1)', MCC assignment requires explicit documentation of acute respiratory failure (J96.0x) or Sepsis (A41.9) with supporting vitals and lab values, which are absent in the current record.",
        reference: "Policy IP-PN-24, Section 3.2: MCC Validation Criteria"
      },
      { 
        action: "Upload Missing Evidence", 
        detail: "Attach final Radiology Report and Lab Flowsheets corresponding to the date of service.", 
        icon: "doc",
        rationale: "The 'Member Health Plan - Gold' contract stipulates that all inpatient claims exceeding $15,000 must include substantiating diagnostic reports to verify severity of illness.",
        reference: "Provider Contract, Exhibit B: Claims Submission Requirements"
      },
      { 
        action: "Verify Patient Demographics", 
        detail: "Confirm Patient Date of Birth. Claim lists 03/15/1960; EHR indicates 03/15/1962.", 
        icon: "review",
        rationale: "Accurate demographic matching is required for eligibility verification under the master patient index protocol.",
        reference: "Admin Guide: Member Eligibility & ID Matching"
      }
    ],
    systemicTrend: "High frequency of upcoding.",
    confidence: 0.98,
    actualLogic: "MCC pathway triggered on limited evidence",
    idealLogic: "Plan policy + CMS DRG + LCD + contract",
    actualEvidence: "Diagnosis + procedure codes + partial notes",
    idealEvidence: "RT notes, labs, MD assessment reconciled to policy",
    actualCompliance: "Potential overpayment vs policy & contract",
    idealCompliance: "Aligned to policy, CMS & contract allowance",
    gapAnalysis: "CMS severity and plan policy thresholds not fully evaluated.",
    keyDifferences: [
        "Severity alignment: Twin recalculates severity against CMS / policy thresholds and determines MCC is not supported.",
        "Evidence coverage: Twin reconciles medical record, policy, CMS DRG logic, and contract terms in one pass.",
        "Financial impact: Overpayment risk of $7,000 on a single claim, intercepted prepay."
    ]
  },
  'C-1004': getNoRiskResult(MOCK_CLAIMS[3]),
  'C-1005': {
    idealDrg: "92929",
    idealDrgDesc: "Stent Placement (Addl)",
    actualDrg: "92928",
    actualDrgDesc: "Stent Placement (Initial)",
    financialImpact: 2000,
    rootCauses: [
      { title: "Incorrect Coding", description: "Code mismatch for vessel branch.", type: "coding_error", severity: "high" },
      { title: "Missing Documentation", description: "Cath lab report missing.", type: "missing_info", severity: "high" }
    ],
    providerGuidance: [
        { 
            action: "Upload Report", 
            detail: "Cath lab report required.", 
            icon: "doc",
            rationale: "Procedural validation requires hemodynamic data from the final cath report.",
            reference: "Cardiology Billing Guide, Sec 4"
        }
    ],
    systemicTrend: "Frequent coding errors.",
    confidence: 0.92,
    actualLogic: "Initial stent placement billed",
    idealLogic: "Add-on stent placement logic",
    actualEvidence: "Op Note Draft",
    idealEvidence: "Final Cath Report required",
    actualCompliance: "Coding Mismatch",
    idealCompliance: "Compliant",
    gapAnalysis: "Modifier usage incorrect for LC vs LD",
    keyDifferences: ["Vessel branch mismatch in coding"]
  },
  'C-1006': {
    idealDrg: "94640",
    idealDrgDesc: "Airway Inhalation Treatment",
    actualDrg: "94640",
    actualDrgDesc: "Airway Inhalation Treatment",
    financialImpact: 0,
    rootCauses: [{ title: "Incomplete Documentation", description: "Spirometry graphs incomplete.", type: "missing_info", severity: "low" }],
    providerGuidance: [
        { 
            action: "Update Notes", 
            detail: "Add spirometry details.", 
            icon: "doc",
            rationale: "Standard of care for asthma management includes objective spirometry data.",
            reference: "Pulmonary Clinical Policy 2024"
        }
    ],
    systemicTrend: "N/A",
    confidence: 0.96,
    actualLogic: "Standard billing",
    idealLogic: "Standard billing",
    actualEvidence: "Clinic Note",
    idealEvidence: "Clinic Note + Spirometry",
    actualCompliance: "Minor Documentation Gap",
    idealCompliance: "Compliant",
    keyDifferences: ["Spirometry data field blank"]
  },
  'C-1007': getNoRiskResult(MOCK_CLAIMS[6]),
  'C-1008': {
    idealDrg: "062",
    idealDrgDesc: "Ischemic Stroke w/o MCC",
    actualDrg: "061",
    actualDrgDesc: "Ischemic Stroke w MCC",
    financialImpact: 5000,
    rootCauses: [
      { title: "Upcoding", description: "No evidence of MCC (Coma/Severe complication).", type: "coding_error", severity: "high" },
      { title: "Missing Evidence", description: "CT/MRI Report missing.", type: "missing_info", severity: "high" }
    ],
    providerGuidance: [
        { 
            action: "Upload Imaging", 
            detail: "CT Head report required.", 
            icon: "doc",
            rationale: "Contract requires imaging verification for all stroke claims >$20k.",
            reference: "Provider Manual Vol 3, Sec 4.5"
        }
    ],
    systemicTrend: "Neurology coding audit recommended.",
    confidence: 0.98,
    actualLogic: "MCC (Thrombolytic Agent) claimed",
    idealLogic: "No Thrombolytic administered",
    actualEvidence: "Discharge Summary",
    idealEvidence: "Discharge Summary confirms no tPA",
    actualCompliance: "Upcoding detected",
    idealCompliance: "Compliant with evidence",
    gapAnalysis: "Billed for tPA use, but summary states tPA not given",
    keyDifferences: ["tPA administration discrepancy"]
  },
  'C-1009': {
    idealDrg: "90935",
    idealDrgDesc: "Hemodialysis Procedure",
    actualDrg: "90935",
    actualDrgDesc: "Hemodialysis Procedure",
    financialImpact: 0,
    rootCauses: [{ title: "Missing Session Note", description: "Dialysis flowsheet missing.", type: "missing_info", severity: "low" }],
    providerGuidance: [
        { 
            action: "Attach Flowsheet", 
            detail: "Upload session logs.", 
            icon: "doc",
            rationale: "Proof of service delivery requires time-stamped session logs.",
            reference: "CMS Renal Dialysis Facility Manual"
        }
    ],
    systemicTrend: "N/A",
    confidence: 0.94,
    actualLogic: "Standard billing",
    idealLogic: "Standard billing",
    actualEvidence: "Billing Sheet",
    idealEvidence: "Billing Sheet + Session Log",
    actualCompliance: "Documentation Gap",
    idealCompliance: "Compliant",
    keyDifferences: ["Session log missing"]
  },
  'C-1010': getNoRiskResult(MOCK_CLAIMS[9]),
  'C-1011': {
    idealDrg: "19307",
    idealDrgDesc: "Mastectomy, Modified Radical",
    actualDrg: "19303",
    actualDrgDesc: "Mastectomy, Simple, Complete",
    financialImpact: 4000,
    rootCauses: [
      { title: "Incorrect Coding", description: "Procedure description implies lymph node removal (19307).", type: "coding_error", severity: "high" },
      { title: "Missing Pathology", description: "Path report not attached.", type: "missing_info", severity: "high" }
    ],
    providerGuidance: [
        { 
            action: "Check Op Note", 
            detail: "Verify if axillary nodes removed.", 
            icon: "code",
            rationale: "Axillary lymph node dissection distinguishes modified radical from simple mastectomy.",
            reference: "NCCI Coding Policy Manual 2024, Ch 6"
        }
    ],
    systemicTrend: "Surgical coding variance.",
    confidence: 0.91,
    actualLogic: "Simple Mastectomy billed",
    idealLogic: "Modified Radical Mastectomy logic",
    actualEvidence: "Op Note",
    idealEvidence: "Op Note confirms lymph node dissection",
    actualCompliance: "Undercoding / Incorrect Coding",
    idealCompliance: "Compliant",
    gapAnalysis: "Procedure code does not match operative details",
    keyDifferences: ["Lymph node dissection performed but not billed"]
  },
  'C-1012': {
    idealDrg: "80061",
    idealDrgDesc: "Lipid Panel",
    actualDrg: "80061",
    actualDrgDesc: "Lipid Panel",
    financialImpact: 0,
    rootCauses: [{ title: "Missing Results", description: "Lipid breakdown values missing.", type: "missing_info", severity: "low" }],
    providerGuidance: [
        { 
            action: "Update Results", 
            detail: "Enter values in EHR.", 
            icon: "doc",
            rationale: "Clinical data exchange standards require result values.",
            reference: "HIE Interoperability Standards"
        }
    ],
    systemicTrend: "N/A",
    confidence: 0.97,
    actualLogic: "Standard billing",
    idealLogic: "Standard billing",
    actualEvidence: "Lab Order",
    idealEvidence: "Lab Order + Results",
    actualCompliance: "Documentation Gap",
    idealCompliance: "Compliant",
    keyDifferences: ["Result values missing"]
  },
  'C-1013': getNoRiskResult(MOCK_CLAIMS[12]),
  'C-1014': {
    idealDrg: "92928",
    idealDrgDesc: "Stent Placement",
    actualDrg: "92941",
    actualDrgDesc: "PCI Acute MI",
    financialImpact: 2500,
    rootCauses: [
      { title: "Incorrect Coding", description: "No evidence of Acute MI on ECG.", type: "coding_error", severity: "high" },
      { title: "Missing Evidence", description: "ECG Strip missing.", type: "missing_info", severity: "medium" }
    ],
    providerGuidance: [
        { 
            action: "Review ECG", 
            detail: "Confirm STEMI criteria.", 
            icon: "review",
            rationale: "Use of Acute MI code (92941) requires ECG evidence of STEMI or NSTEMI with acute occlusion.",
            reference: "Cardiology Coverage Determination L3344"
        }
    ],
    systemicTrend: "Cardiology review needed.",
    confidence: 0.89,
    actualLogic: "Acute MI PCI billed",
    idealLogic: "Non-AMI PCI logic",
    actualEvidence: "Cath Report",
    idealEvidence: "Cath Report + ECG",
    actualCompliance: "Upcoding detected",
    idealCompliance: "Compliant",
    gapAnalysis: "Missing ECG evidence for Acute MI",
    keyDifferences: ["Troponin normal, inconsistent with AMI"]
  },
  'C-1015': {
    idealDrg: "72100",
    idealDrgDesc: "X-Ray Spine",
    actualDrg: "72100",
    actualDrgDesc: "X-Ray Spine",
    financialImpact: 0,
    rootCauses: [{ title: "Incomplete Report", description: "Radiologist signature missing.", type: "missing_info", severity: "low" }],
    providerGuidance: [
        { 
            action: "Sign Report", 
            detail: "Obtain signature.", 
            icon: "review",
            rationale: "Final billing requires authenticated radiologist signature.",
            reference: "CMS Claims Processing Manual, Ch 13"
        }
    ],
    systemicTrend: "N/A",
    confidence: 0.95,
    actualLogic: "Standard billing",
    idealLogic: "Standard billing",
    actualEvidence: "Draft Report",
    idealEvidence: "Signed Final Report",
    actualCompliance: "Compliance Gap",
    idealCompliance: "Compliant",
    keyDifferences: ["Signature missing on report"]
  },
  // The 'fixed' version of C-1003 after remediation
  'C-1003-FIXED': getNoRiskResult(MOCK_CLAIMS[2])
};