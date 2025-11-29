export enum ClaimStatus {
  PENDING = 'Pending',
  REVIEW = 'In Review',
  APPROVED = 'Approved',
  DENIED = 'Denied',
  FLAGGED = 'Flagged'
}

export interface Attachment {
  name: string;
  type: string; // 'pdf' | 'img' | 'doc'
  date: string;
  size: string;
  content?: string; // Text content of the document
}

export interface Claim {
  id: string;
  
  // Patient Demographics
  patientName: string;
  patientDob: string;
  memberId: string;
  gender: 'Male' | 'Female' | 'Other';
  
  // Encounter Details
  provider: string;
  providerNpi: string;
  admissionDate: string;
  dischargeDate?: string;
  facility: string;
  
  // Clinical Data
  claimType: string;
  diagnosisCode: string;
  diagnosisDescription: string;
  procedureCode: string;
  procedureDescription: string;
  drgCode?: string;
  drgDescription?: string;
  priorAuthNumber?: string;
  
  // Financial Data
  amount: number;
  units: number;
  modifiers?: string[];
  
  // Meta
  date: string; // Submission Date
  status: ClaimStatus;
  riskScore: number; // 0-100
  clinicalSummary?: string;
  attachments: Attachment[];
}

export interface AnalysisResult {
  idealDrg: string;
  idealDrgDesc: string;
  actualDrg: string;
  actualDrgDesc: string;
  financialImpact: number;
  rootCauses: RootCause[];
  providerGuidance: GuidanceItem[];
  systemicTrend: string;
  confidence: number;

  // Comprehensive Twin Data
  actualLogic?: string;
  idealLogic?: string;
  actualEvidence?: string;
  idealEvidence?: string;
  actualCompliance?: string;
  idealCompliance?: string;
  gapAnalysis?: string;
  keyDifferences?: string[];
}

export interface RootCause {
  title: string;
  description: string;
  type: 'missing_info' | 'contract_mismatch' | 'coding_error';
  severity: 'high' | 'medium' | 'low';
}

export interface GuidanceItem {
  action: string;
  detail: string;
  icon: 'doc' | 'code' | 'review';
  rationale?: string; // Explanation based on policy/contract
  reference?: string; // Specific policy section or contract term
}