import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Claim } from "../types";
import { MOCK_ANALYSIS_RESULTS } from "../constants";

// Helper to determine if we have a valid key (basic check)
const hasApiKey = !!process.env.API_KEY;

export const analyzeClaimWithGemini = async (claim: Claim, isRemediationCheck = false, simulateDelay = false): Promise<AnalysisResult> => {
  // Use specific mock data for demo scenarios
  let mockResult = MOCK_ANALYSIS_RESULTS[claim.id];
  
  if (isRemediationCheck && claim.id === 'C-1003') {
     mockResult = MOCK_ANALYSIS_RESULTS['C-1003-FIXED'];
  }

  // Fallback if specific ID not in map (should not happen with good constants)
  if (!mockResult) {
    mockResult = MOCK_ANALYSIS_RESULTS['C-1001'];
  }

  // Instant return if no API key or even if we have one, for demo speed we prefer mock
  // unless explicitly needing AI generation for new dynamic inputs (not in this demo flow)
  if (!hasApiKey || true) {
    return mockResult as AnalysisResult;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      You are an expert healthcare claims auditor AI called "Integrity Mirror".
      Analyze the following claim for potential payment integrity issues.
      
      Claim Intake:
      ID: ${claim.id}
      Type: ${claim.claimType}
      Date: ${claim.date}
      
      Patient: ${claim.patientName} (DOB: ${claim.patientDob}, Gender: ${claim.gender}, ID: ${claim.memberId})
      Provider: ${claim.provider} (NPI: ${claim.providerNpi})
      Facility: ${claim.facility}
      Encounter: ${claim.admissionDate} to ${claim.dischargeDate || 'N/A'}
      
      Clinical Data:
      Diagnosis: ${claim.diagnosisCode} - ${claim.diagnosisDescription}
      Procedure: ${claim.procedureCode} - ${claim.procedureDescription}
      DRG: ${claim.drgCode || 'N/A'} - ${claim.drgDescription || 'N/A'}
      Prior Auth: ${claim.priorAuthNumber || 'None'}
      
      Financials:
      Billed: $${claim.amount}
      Units: ${claim.units}
      Modifiers: ${claim.modifiers?.join(', ') || 'None'}
      
      Clinical Summary: ${claim.clinicalSummary || 'No summary provided.'}
      Attachments: ${claim.attachments.map(a => a.name).join(', ')}
      
      Your task is to identify if there is a discrepancy between the billed code and the clinical evidence.
      
      Return the result in JSON format matching the schema provided.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            idealDrg: { type: Type.STRING },
            idealDrgDesc: { type: Type.STRING },
            actualDrg: { type: Type.STRING },
            actualDrgDesc: { type: Type.STRING },
            financialImpact: { type: Type.NUMBER, description: "Positive number representing overpayment or difference" },
            rootCauses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ['missing_info', 'contract_mismatch', 'coding_error'] },
                  severity: { type: Type.STRING, enum: ['high', 'medium', 'low'] }
                }
              }
            },
            providerGuidance: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  action: { type: Type.STRING },
                  detail: { type: Type.STRING },
                  icon: { type: Type.STRING, enum: ['doc', 'code', 'review'] },
                  rationale: { type: Type.STRING, description: "Explanation based on policy or contract" },
                  reference: { type: Type.STRING, description: "Specific policy section or contract term" }
                }
              }
            },
            systemicTrend: { type: Type.STRING },
            confidence: { type: Type.NUMBER }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    }
    throw new Error("No text in response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback to mock if API fails
    return mockResult || MOCK_ANALYSIS_RESULTS['C-1001'];
  }
};