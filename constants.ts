import { Claim, ClaimStatus, AnalysisResult } from './types';

export const MOCK_CLAIMS: Claim[] = [
  {
    id: 'C-2001',
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
Date: 05/18/2024
Assessment: Community Acquired Pneumonia (J18.9).
Plan: Admit to Medical Floor. Start Ceftriaxone.`
      }
    ]
  },
  {
    id: 'C-2002',
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
Assessment: Essential Hypertension (I10).
Plan: *Reviewed lab results drawn today (BMP)* - [NOT ATTACHED].`
      }
    ]
  },
  {
    id: 'C-2003',
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
Patient: David Lee
*DOB: 03/15/1962*  <-- [MISMATCH: Claim says 1960]
Admit Date: 05/18/2024`
      },
      { 
        name: 'Progress_Notes.pdf', 
        type: 'pdf', 
        date: '2024-05-19', 
        size: '2.1MB',
        content: `INPATIENT PROGRESS NOTE
Vitals: Temp 98.6, HR 72, BP 120/80, RR 16, SpO2 98% on Room Air.
NOTE: *No criteria for Sepsis or Severe Respiratory Failure met*. Patient stable.`
      }
    ]
  },
  {
    id: 'C-2004',
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
        name: 'Lab_Results.pdf', 
        type: 'pdf', 
        date: '2024-05-22', 
        size: '0.4MB',
        content: `LAB RESULTS
Test: Hemoglobin A1c
Result: 6.8%`
      }
    ]
  },
  {
    id: 'C-2005',
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
Intervention: *DES deployed to mid-LAD*.
Coding Note: Provider billed 92928-LC (Left Circumflex). Documentation supports LAD only.
*PENDING FINAL CATH LAB REPORT*`
      }
    ]
  },
  {
    id: 'C-2006',
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
Plan: Spirometry performed.
*[SPIROMETRY DATA FIELD BLANK]*`
      }
    ]
  },
  {
    id: 'C-2007',
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
Findings: *Inflamed, non-perforated appendix identified*.`
      }
    ]
  },
  {
    id: 'C-2008',
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
*tPA was NOT administered due to time window*.
Coding Query: DRG 061 billed (Use of Thrombolytic Agent). Correct DRG should be 062/065.`
      }
    ]
  },
  {
    id: 'C-2009',
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
        name: 'Billing_Face_Sheet.pdf', 
        type: 'pdf', 
        date: '2024-05-25', 
        size: '0.2MB',
        content: `BILLING FACE SHEET
Code: 90935.
Note: *Session Log missing from packet*.`
      }
    ]
  },
  {
    id: 'C-2010',
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
Dx: URI.
Level of Service: *99212* (Straightforward decision making).`
      }
    ]
  },
  {
    id: 'C-2011',
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
    procedureCode: '19307',
    procedureDescription: 'Mastectomy, Modified Radical',
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
Billed: 19307.
Procedure: Simple Mastectomy.
*No axillary lymph node dissection performed*.
Correct Code should be 19303.`
      }
    ]
  },
  {
    id: 'C-2012',
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
Result: *[PENDING UPLOAD]*`
      }
    ]
  },
  {
    id: 'C-2013',
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
Plan: Prescribe Prednisone burst + Azithromycin.
*Level 4 (99214)* supported.`
      }
    ]
  },
  {
    id: 'C-2014',
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
ECG Findings: *[MISSING]*.
Clinical picture consistent with Unstable Angina, NOT Acute MI.
Code should be 92928 (PCI w/ stent).`
      }
    ]
  },
  {
    id: 'C-2015',
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
        name: 'Report_Draft.txt', 
        type: 'doc', 
        date: '2024-05-28', 
        size: '0.01MB',
        content: `RADIOLOGY PRELIMINARY
Signed by: *[UNSIGNED]* - Requires final radiologist signature.`
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
    providerGuidance: [
      {
        action: "No Action Required",
        detail: "Claim is ready for payment.",
        icon: "review"
      }
    ],
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
  'C-2001': getNoRiskResult(MOCK_CLAIMS[0]),
  'C-2002': {
    idealDrg: "99213",
    idealDrgDesc: "Outpatient visit Level 3",
    actualDrg: "99213",
    actualDrgDesc: "Outpatient visit Level 3",
    financialImpact: 0,
    rootCauses: [
      { title: "Missing Clinical Documentation", description: "Basic Metabolic Panel (BMP) result not found.", type: "missing_info", severity: "low" }
    ],
    providerGuidance: [
      { 
        action: "Upload Lab Results", 
        detail: "Upload BMP lab result.", 
        icon: "doc",
        rationale: "Lab results referenced in MDM must be attached.",
        reference: "E&M Guidelines 2024"
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
  'C-2003': {
    idealDrg: "194",
    idealDrgDesc: "Simple Pneumonia & Pleurisy w CC",
    actualDrg: "193",
    actualDrgDesc: "Simple Pneumonia & Pleurisy w MCC",
    financialImpact: 7000,
    rootCauses: [
      { title: "Potential Upcoding", description: "Upcoding suspected; No respiratory failure/sepsis.", type: "coding_error", severity: "high" },
      { title: "Missing Clinical Evidence", description: "Chest X-ray and Labs missing.", type: "missing_info", severity: "medium" },
      { title: "Patient Identity Mismatch", description: "DOB Mismatch (1960 vs 1962).", type: "contract_mismatch", severity: "high" }
    ],
    providerGuidance: [
      { 
        action: "Attach Evidence", 
        detail: "Attach chest X-ray.", 
        icon: "doc",
        rationale: "Imaging required for pneumonia validation.",
        reference: "Clinical Policy IP-PN-24"
      },
      { 
        action: "Upload Labs", 
        detail: "Upload labs.", 
        icon: "doc",
        rationale: "Lab confirmation required for MCC assignment.",
        reference: "Clinical Policy IP-PN-24"
      },
      { 
        action: "Correct Demographics", 
        detail: "Correct DOB.", 
        icon: "review",
        rationale: "Patient identity must match Master Patient Index.",
        reference: "Admin Guide: Eligibility"
      },
      { 
        action: "Update Coding", 
        detail: "Update DRG to 194.", 
        icon: "code",
        rationale: "Documentation does not support MCC.",
        reference: "CMS DRG Definitions"
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
  'C-2004': getNoRiskResult(MOCK_CLAIMS[3]),
  'C-2005': {
    idealDrg: "92929",
    idealDrgDesc: "Stent Placement (Addl)",
    actualDrg: "92928",
    actualDrgDesc: "Stent Placement (Initial)",
    financialImpact: 2000,
    rootCauses: [
      { title: "Incorrect Coding", description: "Incorrect coding.", type: "coding_error", severity: "high" },
      { title: "Missing Documentation", description: "Missing cath lab report.", type: "missing_info", severity: "high" }
    ],
    providerGuidance: [
        { 
            action: "Correct Coding", 
            detail: "Correct CPT code.", 
            icon: "code"
        },
        { 
            action: "Upload Report", 
            detail: "Attach cath lab report.", 
            icon: "doc"
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
  'C-2006': {
    idealDrg: "94640",
    idealDrgDesc: "Airway Inhalation Treatment",
    actualDrg: "94640",
    actualDrgDesc: "Airway Inhalation Treatment",
    financialImpact: 0,
    rootCauses: [{ title: "Incomplete Documentation", description: "Incomplete spirometry documentation.", type: "missing_info", severity: "low" }],
    providerGuidance: [
        { 
            action: "Upload Report", 
            detail: "Upload spirometry report.", 
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
  'C-2007': getNoRiskResult(MOCK_CLAIMS[6]),
  'C-2008': {
    idealDrg: "062",
    idealDrgDesc: "Ischemic Stroke w/o MCC",
    actualDrg: "061",
    actualDrgDesc: "Ischemic Stroke w MCC",
    financialImpact: 5000,
    rootCauses: [
      { title: "Upcoding", description: "Upcoding suspected.", type: "coding_error", severity: "high" },
      { title: "Missing Evidence", description: "Missing neuroimaging evidence.", type: "missing_info", severity: "high" }
    ],
    providerGuidance: [
        { 
            action: "Attach Evidence", 
            detail: "Attach MRI/CT results.", 
            icon: "doc"
        },
        { 
            action: "Update Coding", 
            detail: "Correct DRG.", 
            icon: "code"
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
  'C-2009': {
    idealDrg: "90935",
    idealDrgDesc: "Hemodialysis Procedure",
    actualDrg: "90935",
    actualDrgDesc: "Hemodialysis Procedure",
    financialImpact: 0,
    rootCauses: [{ title: "Missing Session Note", description: "Missing dialysis session note.", type: "missing_info", severity: "low" }],
    providerGuidance: [
        { 
            action: "Upload Note", 
            detail: "Upload dialysis note.", 
            icon: "doc"
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
  'C-2010': getNoRiskResult(MOCK_CLAIMS[9]),
  'C-2011': {
    idealDrg: "19303",
    idealDrgDesc: "Mastectomy, Simple, Complete",
    actualDrg: "19307",
    actualDrgDesc: "Mastectomy, Modified Radical",
    financialImpact: 4000,
    rootCauses: [
      { title: "Incorrect Coding", description: "Incorrect coding.", type: "coding_error", severity: "high" },
      { title: "Missing Pathology", description: "Missing pathology report.", type: "missing_info", severity: "high" }
    ],
    providerGuidance: [
        { 
            action: "Attach Evidence", 
            detail: "Attach pathology report.", 
            icon: "doc"
        },
        { 
            action: "Correct Coding", 
            detail: "Correct CPT.", 
            icon: "code"
        }
    ],
    systemicTrend: "Surgical coding variance.",
    confidence: 0.91,
    actualLogic: "Modified Radical Mastectomy billed",
    idealLogic: "Simple Mastectomy logic",
    actualEvidence: "Op Note",
    idealEvidence: "Op Note confirms no lymph node dissection",
    actualCompliance: "Upcoding",
    idealCompliance: "Compliant",
    gapAnalysis: "Procedure code implies lymph node dissection not found in Op Note",
    keyDifferences: ["Lymph node dissection billed but not performed"]
  },
  'C-2012': {
    idealDrg: "80061",
    idealDrgDesc: "Lipid Panel",
    actualDrg: "80061",
    actualDrgDesc: "Lipid Panel",
    financialImpact: 0,
    rootCauses: [{ title: "Missing Results", description: "Missing lipid panel documentation.", type: "missing_info", severity: "low" }],
    providerGuidance: [
        { 
            action: "Upload Results", 
            detail: "Upload lipid panel results.", 
            icon: "doc"
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
  'C-2013': getNoRiskResult(MOCK_CLAIMS[12]),
  'C-2014': {
    idealDrg: "92928",
    idealDrgDesc: "Stent Placement",
    actualDrg: "92941",
    actualDrgDesc: "PCI Acute MI",
    financialImpact: 2500,
    rootCauses: [
      { title: "Incorrect Coding", description: "Incorrect coding.", type: "coding_error", severity: "high" },
      { title: "Missing Evidence", description: "Missing ECG evidence.", type: "missing_info", severity: "medium" }
    ],
    providerGuidance: [
        { 
            action: "Correct Coding", 
            detail: "Correct CPT.", 
            icon: "code"
        },
        { 
            action: "Attach Evidence", 
            detail: "Attach ECG.", 
            icon: "doc"
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
  'C-2015': {
    idealDrg: "72100",
    idealDrgDesc: "X-Ray Spine",
    actualDrg: "72100",
    actualDrgDesc: "X-Ray Spine",
    financialImpact: 0,
    rootCauses: [{ title: "Incomplete Report", description: "Incomplete radiology report.", type: "missing_info", severity: "low" }],
    providerGuidance: [
        { 
            action: "Upload Report", 
            detail: "Upload radiology report.", 
            icon: "doc"
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
  // The 'fixed' version of C-2003 after remediation
  'C-2003-FIXED': getNoRiskResult(MOCK_CLAIMS[2])
};