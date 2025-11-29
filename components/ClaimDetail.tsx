import React, { useEffect, useState } from 'react';
import { Claim, AnalysisResult } from '../types';
import { analyzeClaimWithGemini } from '../services/geminiService';
import { MOCK_ANALYSIS_RESULTS } from '../constants';
import { CheckCircle, XCircle, FileText, ArrowRight, BrainCircuit, Activity, ChevronRight, X, ShieldAlert, Upload, RefreshCw, Save, Check, FileCode, Paperclip, ChevronLeft, Search, Loader2, LayoutGrid, Split, HeartPulse, Stethoscope, User, Calendar, Building, DollarSign, File, BookOpen } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface ClaimDetailProps {
  claim: Claim;
  onBack: () => void;
  animate?: boolean;
}

const STEPS = [
  "Validating claim against payer policies...",
  "Analyzing EHR documents for clinical detail...",
  "Checking contract terms and plan coverage...",
  "Detecting anomalies and mismatches...",
  "Summarizing analysis results..."
];

const ClaimDetail: React.FC<ClaimDetailProps> = ({ claim, onBack, animate = true }) => {
  const [viewState, setViewState] = useState<'analyzing' | 'report'>(animate ? 'analyzing' : 'report');
  
  // Synchronously initialize result if not animating to avoid "Loading..." flash
  const [result, setResult] = useState<AnalysisResult | null>(() => {
    if (!animate) {
      // Direct lookup matching service logic
      return MOCK_ANALYSIS_RESULTS[claim.id] || MOCK_ANALYSIS_RESULTS['C-1001'];
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<'details' | 'twin' | 'evidence' | 'guidance'>('details');
  const [currentStep, setCurrentStep] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isRevalidating, setIsRevalidating] = useState(false);
  const [selectedAttachmentIndex, setSelectedAttachmentIndex] = useState(0);

  // Set initial tab based on risk score if not animating
  useEffect(() => {
    if (!animate && result) {
      if (result.financialImpact > 0) {
        setActiveTab('twin');
      } else {
        setActiveTab('details');
      }
    }
  }, []); // Run once on mount

  useEffect(() => {
    let mounted = true;
    
    if (viewState === 'analyzing') {
        // --- ANIMATED MODE (Simulation) ---
        // Stepped progress to show "AI Processing" clearly
        const stepInterval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < STEPS.length - 1) return prev + 1;
                // If we reach end, clear interval
                clearInterval(stepInterval);
                return prev;
            });
        }, 800); // 800ms per step - readable speed

        // Start analysis in background, but show result only after steps complete (simulated)
        const runAnalysis = async () => {
            // Wait for enough time for steps to show (5 steps * 800ms = 4000ms)
            // But let's verify data loading is done.
            const data = await analyzeClaimWithGemini(claim, false, false); 
            
            // Wait for steps to finish
            const totalTime = STEPS.length * 800;
            const startTime = Date.now();
            
            const checkDone = setInterval(() => {
                 if (!mounted) {
                     clearInterval(checkDone);
                     return;
                 }
                 const elapsed = Date.now() - startTime;
                 if (elapsed > totalTime) {
                     clearInterval(checkDone);
                     setResult(data);
                     setViewState('report');
                     if (data.financialImpact > 0) {
                        setActiveTab('twin');
                     } else {
                        setActiveTab('details');
                     }
                 }
            }, 100);
        };
        runAnalysis();
        return () => { 
            mounted = false; 
            clearInterval(stepInterval);
        };
    }
    // If not analyzing, result is already set via initial state, so no effect needed
  }, [claim, viewState]);

  const handleSimulateFix = async () => {
      setIsRevalidating(true);
      // Instant revalidation
      const fixedResult = await analyzeClaimWithGemini(claim, true, false);
      setResult(fixedResult);
      setIsFixed(true);
      setIsRevalidating(false);
      setActiveTab('twin');
  };

  // --- View: Analyzing (Light Theme) ---
  if (viewState === 'analyzing') {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Subtle background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)',
            backgroundSize: '24px 24px'
        }}></div>

        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-lg w-full z-10 border border-white animate-in zoom-in-95 duration-500">
            <div className="flex items-center gap-4 mb-8">
                 <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <BrainCircuit size={32} />
                 </div>
                 <div>
                     <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Integrity Engine</h2>
                     <p className="text-blue-600 font-medium">Processing Digital Twin Analysis</p>
                 </div>
            </div>

            <div className="space-y-6 relative">
                 {/* Connecting Line */}
                 <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100 z-0"></div>

                 {STEPS.map((step, index) => {
                     const isCompleted = currentStep > index;
                     const isCurrent = currentStep === index;
                     const isPending = currentStep < index;
                     
                     return (
                         <div key={index} className={`flex items-center gap-4 relative z-10 transition-opacity duration-500 ${isPending ? 'opacity-40' : 'opacity-100'}`}>
                             <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 transition-all duration-300 ${
                                 isCompleted ? 'bg-green-500 border-green-500 text-white shadow-md scale-100' :
                                 isCurrent ? 'bg-blue-600 border-blue-600 text-white animate-pulse shadow-md scale-110' :
                                 'bg-white border-slate-200 text-transparent'
                             }`}>
                                 {isCompleted && <Check size={12} strokeWidth={3} />}
                             </div>
                             <p className={`text-sm font-medium transition-all duration-300 ${
                                 isCompleted ? 'text-slate-900' :
                                 isCurrent ? 'text-blue-600 font-bold' :
                                 'text-slate-400'
                             }`}>
                                 {step}
                             </p>
                         </div>
                     );
                 })}
            </div>
        </div>
      </div>
    );
  }

  if (isRevalidating || !result) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-slate-50 relative">
             <div className="text-center">
                 <Loader2 size={48} className="animate-spin text-blue-600 mx-auto mb-4" />
                 <h2 className="text-xl font-bold text-slate-900">Loading Claim Details...</h2>
                 <p className="text-slate-500">Retrieving processed data</p>
             </div>
        </div>
      )
  }

  // --- Tabs Navigation ---
  const renderTabs = () => (
      <div className="flex items-center border-b border-slate-200 bg-white px-8 sticky top-0 z-30">
          <button 
            onClick={() => setActiveTab('details')}
            className={`px-4 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'details' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
              <FileText size={16} />
              Claim Intake
          </button>
          <button 
            onClick={() => setActiveTab('twin')}
            className={`px-4 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'twin' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
              <BrainCircuit size={16} />
              Digital Twin & Analysis
          </button>
          <button 
            onClick={() => setActiveTab('evidence')}
            className={`px-4 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'evidence' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
              <Split size={16} />
              Root Cause & Evidence
              {result.rootCauses.length > 0 && !isFixed && <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-[10px] font-bold">{result.rootCauses.length}</span>}
          </button>
           <button 
            onClick={() => setActiveTab('guidance')}
            className={`px-4 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'guidance' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
              <Stethoscope size={16} />
              Provider Guidance
          </button>
      </div>
  );

  // --- Report View ---
  return (
    <div className="flex flex-col h-full bg-slate-50">
        {/* Top Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center z-40 shadow-sm">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                    <X size={20} />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                        Claim Audit: {claim.id}
                        {isFixed ? (
                             <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 border border-green-200 tracking-wide uppercase">Clean Claim</span>
                        ) : result.financialImpact > 0 ? (
                             <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700 border border-red-200 tracking-wide uppercase">High Risk Detected</span>
                        ) : result.rootCauses.length > 0 ? (
                             <span className="px-2 py-0.5 rounded text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-200 tracking-wide uppercase">Low Risk</span>
                        ) : (
                             <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 border border-green-200 tracking-wide uppercase">No Risk Detected</span>
                        )}
                    </h1>
                    <p className="text-sm text-slate-500">{claim.provider} • {claim.patientName} • {claim.date}</p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                 <div className="text-right">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">AI Confidence</p>
                    <div className="flex items-center justify-end gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <p className="text-lg font-bold text-slate-900">{(result.confidence * 100).toFixed(0)}%</p>
                    </div>
                 </div>
                 <div className="h-8 w-px bg-slate-200"></div>
                 {!isFixed && result.financialImpact > 0 ? (
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
                        <ShieldAlert size={16}/> Prevent Payment
                    </button>
                 ) : (
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
                        <Check size={16}/> Approve Payment
                    </button>
                 )}
            </div>
        </div>

        {renderTabs()}

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
            
            {/* Tab 1: Claim Intake Details (Comprehensive) */}
            {activeTab === 'details' && (
                <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
                    
                    {/* Top Row: Patient & Encounter */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Patient Demographics */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                                <User size={16} className="text-blue-600"/>
                                <h3 className="font-bold text-slate-900 text-sm">Patient Demographics</h3>
                            </div>
                            <div className="p-5 grid grid-cols-2 gap-y-4 gap-x-6">
                                <div>
                                    <span className="text-xs text-slate-400 block uppercase tracking-wider mb-0.5">Full Name</span>
                                    <span className="font-medium text-slate-900">{claim.patientName}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 block uppercase tracking-wider mb-0.5">Member ID</span>
                                    <span className="font-mono text-sm font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded inline-block">{claim.memberId}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 block uppercase tracking-wider mb-0.5">Date of Birth</span>
                                    <span className="font-medium text-slate-900">{claim.patientDob}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 block uppercase tracking-wider mb-0.5">Gender</span>
                                    <span className="font-medium text-slate-900">{claim.gender}</span>
                                </div>
                            </div>
                        </div>

                        {/* Encounter Details */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                                <Building size={16} className="text-indigo-600"/>
                                <h3 className="font-bold text-slate-900 text-sm">Encounter Details</h3>
                            </div>
                            <div className="p-5 grid grid-cols-2 gap-y-4 gap-x-6">
                                <div className="col-span-2">
                                    <span className="text-xs text-slate-400 block uppercase tracking-wider mb-0.5">Facility / Provider</span>
                                    <span className="font-medium text-slate-900 block">{claim.facility}</span>
                                    <span className="text-xs text-slate-500">{claim.provider} • NPI: {claim.providerNpi}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 block uppercase tracking-wider mb-0.5">Admission Date</span>
                                    <span className="font-medium text-slate-900 flex items-center gap-1">
                                        <Calendar size={12} className="text-slate-400"/> {claim.admissionDate}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 block uppercase tracking-wider mb-0.5">Discharge Date</span>
                                    <span className="font-medium text-slate-900 flex items-center gap-1">
                                        <Calendar size={12} className="text-slate-400"/> {claim.dischargeDate || 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Row: Clinical Data */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                         <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                             <HeartPulse size={16} className="text-rose-600"/>
                             <h3 className="font-bold text-slate-900 text-sm">Clinical Data</h3>
                         </div>
                         <div className="p-5">
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                 <div className="space-y-4">
                                     <div>
                                         <span className="text-xs text-slate-400 block uppercase tracking-wider mb-1">Diagnosis</span>
                                         <div className="flex items-start gap-2">
                                             <span className="font-mono text-sm font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">{claim.diagnosisCode}</span>
                                             <span className="text-sm text-slate-700 mt-0.5">{claim.diagnosisDescription}</span>
                                         </div>
                                     </div>
                                     {claim.priorAuthNumber && (
                                         <div>
                                             <span className="text-xs text-slate-400 block uppercase tracking-wider mb-1">Prior Auth #</span>
                                             <span className="font-mono text-xs text-slate-600 border border-slate-200 px-2 py-0.5 rounded">{claim.priorAuthNumber}</span>
                                         </div>
                                     )}
                                 </div>

                                 <div className="space-y-4">
                                     <div>
                                         <span className="text-xs text-slate-400 block uppercase tracking-wider mb-1">Procedure</span>
                                         <div className="flex items-start gap-2">
                                             <span className="font-mono text-sm font-bold bg-indigo-50 text-indigo-700 px-2 py-1 rounded border border-indigo-100">{claim.procedureCode}</span>
                                             <span className="text-sm text-slate-700 mt-0.5">{claim.procedureDescription}</span>
                                         </div>
                                     </div>
                                 </div>

                                 <div className="space-y-4">
                                     <div>
                                         <span className="text-xs text-slate-400 block uppercase tracking-wider mb-1">DRG / Classification</span>
                                         {claim.drgCode && claim.drgCode !== 'N/A' ? (
                                             <div className="flex items-start gap-2">
                                                 <span className="font-mono text-sm font-bold bg-purple-50 text-purple-700 px-2 py-1 rounded border border-purple-100">{claim.drgCode}</span>
                                                 <span className="text-sm text-slate-700 mt-0.5">{claim.drgDescription}</span>
                                             </div>
                                         ) : (
                                             <span className="text-sm text-slate-400 italic">Not applicable</span>
                                         )}
                                     </div>
                                 </div>
                             </div>
                             
                             <div className="mt-6 pt-4 border-t border-slate-100">
                                 <span className="text-xs text-slate-400 block uppercase tracking-wider mb-2">Clinical Summary</span>
                                 <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 italic">
                                     "{claim.clinicalSummary}"
                                 </p>
                             </div>
                         </div>
                    </div>

                    {/* Bottom Row: Financial & Attachments */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Financial Data */}
                        <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                             <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                                 <DollarSign size={16} className="text-green-600"/>
                                 <h3 className="font-bold text-slate-900 text-sm">Financial Data</h3>
                             </div>
                             <div className="p-5 space-y-4">
                                 <div>
                                     <span className="text-xs text-slate-400 block uppercase tracking-wider mb-1">Billed Amount</span>
                                     <span className="text-2xl font-bold text-slate-900">${claim.amount.toLocaleString()}</span>
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                     <div>
                                         <span className="text-xs text-slate-400 block uppercase tracking-wider mb-1">Units</span>
                                         <span className="font-medium text-slate-900">{claim.units}</span>
                                     </div>
                                     <div>
                                         <span className="text-xs text-slate-400 block uppercase tracking-wider mb-1">Modifiers</span>
                                         <span className="font-mono text-sm font-medium text-slate-700">
                                             {claim.modifiers && claim.modifiers.length > 0 ? claim.modifiers.join(', ') : 'None'}
                                         </span>
                                     </div>
                                 </div>
                             </div>
                        </div>

                        {/* Attachments */}
                        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                             <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                                 <Paperclip size={16} className="text-orange-600"/>
                                 <h3 className="font-bold text-slate-900 text-sm">Attachments</h3>
                             </div>
                             <div className="p-5">
                                 {claim.attachments.length > 0 ? (
                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                         {claim.attachments.map((file, idx) => (
                                             <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors group cursor-pointer">
                                                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                                     file.type === 'pdf' ? 'bg-red-50 text-red-500' : 
                                                     file.type === 'img' ? 'bg-blue-50 text-blue-500' : 'bg-slate-100 text-slate-500'
                                                 }`}>
                                                     <File size={20} />
                                                 </div>
                                                 <div className="min-w-0 flex-1">
                                                     <p className="text-sm font-medium text-slate-900 truncate group-hover:text-blue-600 transition-colors">{file.name}</p>
                                                     <p className="text-xs text-slate-400">{file.date} • {file.size}</p>
                                                 </div>
                                                 <button className="text-slate-300 hover:text-slate-600">
                                                     <Upload size={16} className="rotate-180" />
                                                 </button>
                                             </div>
                                         ))}
                                     </div>
                                 ) : (
                                     <div className="text-center py-6 text-slate-400 text-sm italic">
                                         No attachments found for this claim.
                                     </div>
                                 )}
                             </div>
                        </div>
                    </div>

                </div>
            )}

            {/* Tab 2: Digital Twin Analysis (Enhanced & Comprehensive) */}
            {activeTab === 'twin' && (
                 <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
                    
                    <div className="bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 overflow-hidden">
                        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Activity size={18} className="text-blue-400"/>
                                Simulation Result
                            </h3>
                            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">ACTUAL VS DIGITAL TWIN</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            
                            {/* ACTUAL CLAIM - LEFT SIDE */}
                            <div className="p-6 border-r border-slate-800 bg-slate-900/50 relative">
                                <div className="absolute top-6 right-6">
                                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider border border-slate-700 px-2 py-0.5 rounded-full">Engine Output</span>
                                </div>
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Actual Claim</h4>
                                
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">DRG</p>
                                            <p className="text-white font-bold">{result.actualDrg}</p>
                                            <p className="text-sm text-slate-400">{result.actualDrgDesc}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Allowed Amount</p>
                                            <p className="text-2xl font-bold text-white">${claim.amount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Logic Applied</p>
                                        <p className="text-sm font-medium text-slate-300">{result.actualLogic || "Standard adjudication logic"}</p>
                                    </div>
                                    
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Evidence Used</p>
                                        <p className="text-sm font-medium text-slate-300">{result.actualEvidence || "Submitted codes"}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Compliance</p>
                                        <p className="text-sm font-medium text-yellow-500">{result.actualCompliance || "Unknown"}</p>
                                    </div>
                                </div>

                                {result.gapAnalysis && (
                                    <div className="mt-6 pt-4 border-t border-slate-800">
                                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase">
                                             <ShieldAlert size={12} /> Gaps
                                         </div>
                                         <p className="mt-2 text-sm text-slate-400">
                                             {result.gapAnalysis}
                                         </p>
                                    </div>
                                )}
                            </div>

                            {/* DIGITAL TWIN - RIGHT SIDE */}
                            <div className="p-6 bg-slate-900 relative">
                                <div className="absolute top-6 right-6">
                                     <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider border border-orange-900/50 bg-orange-900/20 px-2 py-0.5 rounded-full">Ideal Outcome</span>
                                </div>
                                <h4 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-6">Digital Twin Claim</h4>
                                
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">DRG</p>
                                            <p className="text-white font-bold">{result.idealDrg}</p>
                                            <p className="text-sm text-slate-400">{result.idealDrgDesc}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Expected Allowed</p>
                                            <p className="text-2xl font-bold text-green-400">${(claim.amount - result.financialImpact).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Logic Applied</p>
                                        <p className="text-sm font-medium text-slate-300">{result.idealLogic || "Policy reconciled logic"}</p>
                                    </div>
                                    
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Evidence Used</p>
                                        <p className="text-sm font-medium text-slate-300">{result.idealEvidence || "Comprehensive record review"}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Compliance</p>
                                        <p className="text-sm font-medium text-green-400">{result.idealCompliance || "Fully compliant"}</p>
                                    </div>
                                </div>
                                
                                {!isFixed && result.financialImpact > 0 && (
                                    <div className="mt-6 pt-4 border-t border-slate-800">
                                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase">
                                             <BrainCircuit size={12} /> Twin Delta
                                         </div>
                                         <p className="mt-2 text-sm text-slate-300">
                                             Potential overpayment identified: <span className="text-red-400 font-bold">${result.financialImpact.toLocaleString()}</span> on this claim.
                                         </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Key Differences */}
                    {result.keyDifferences && result.keyDifferences.length > 0 && (
                        <div className="bg-slate-900 text-slate-300 rounded-xl border border-slate-800 p-6">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Key Differences Highlighted by Integrity Mirror</h4>
                            <ul className="space-y-3">
                                {result.keyDifferences.map((diff, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                                        <span>
                                            {diff.includes(':') ? (
                                                <>
                                                    <strong className="text-white">{diff.split(':')[0]}:</strong>
                                                    {diff.split(':')[1]}
                                                </>
                                            ) : diff}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                             <div className="mt-6 flex gap-4">
                                <button onClick={() => setActiveTab('evidence')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                                    Drill into Root Cause & Evidence
                                </button>
                                <button className="px-4 py-2 border border-slate-700 hover:bg-slate-800 text-slate-300 text-sm font-medium rounded-lg transition-colors">
                                    Route to Integrity Review Queue
                                </button>
                             </div>
                        </div>
                    )}

                 </div>
            )}

            {/* Tab 3: Root Cause & Evidence (Side by Side) */}
            {activeTab === 'evidence' && (
                <div className="flex h-[calc(100vh-250px)] animate-fade-in border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    {/* Left: EHR Viewer */}
                    <div className="w-1/2 bg-slate-100 flex flex-col border-r border-slate-200">
                        <div className="px-4 py-3 bg-white border-b border-slate-200 flex justify-between items-center shadow-sm z-10">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <FileText size={14} /> Source: EHR Document
                            </h3>
                            <div className="flex items-center gap-2">
                                {claim.attachments.length > 1 && (
                                    <select 
                                        className="text-xs border border-slate-300 rounded px-2 py-1 bg-white outline-none"
                                        value={selectedAttachmentIndex}
                                        onChange={(e) => setSelectedAttachmentIndex(Number(e.target.value))}
                                    >
                                        {claim.attachments.map((file, idx) => (
                                            <option key={idx} value={idx}>{file.name}</option>
                                        ))}
                                    </select>
                                )}
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-600">
                                    {claim.attachments[selectedAttachmentIndex]?.type === 'pdf' ? 'PDF View' : 'Image View'}
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 relative">
                            {/* Simulated Paper Document */}
                            <div className="bg-white shadow-xl min-h-[800px] w-full p-10 text-slate-800 text-sm font-serif leading-relaxed mx-auto max-w-lg">
                                 {claim.attachments[selectedAttachmentIndex]?.content ? (
                                    <div className="whitespace-pre-wrap font-mono text-xs">
                                        {/* Highlight parser */}
                                        {claim.attachments[selectedAttachmentIndex].content!.split(/(\*[^*]+\*)/g).map((part, i) => {
                                            if (part.startsWith('*') && part.endsWith('*')) {
                                                return (
                                                    <span key={i} className="bg-yellow-200 text-slate-900 font-bold px-1 rounded">
                                                        {part.slice(1, -1)}
                                                    </span>
                                                );
                                            }
                                            return <span key={i}>{part}</span>;
                                        })}
                                    </div>
                                 ) : (
                                     <div className="text-center text-slate-400 italic mt-20">
                                         [No visible text content for this attachment type]
                                     </div>
                                 )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Issues & Actions */}
                    <div className="w-1/2 bg-white flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                             <h3 className="font-bold text-slate-900">Root Cause Analysis</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                             {result.rootCauses.length === 0 ? (
                                 <div className="text-center py-20">
                                     <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                         <Check size={32} />
                                     </div>
                                     <h3 className="text-lg font-bold text-slate-900">No Discrepancies Found</h3>
                                     <p className="text-slate-500 mt-2">The submitted claim matches all clinical evidence and payer policies.</p>
                                 </div>
                             ) : (
                                 <div className="space-y-6">
                                     {result.rootCauses.map((cause, idx) => (
                                         <div key={idx} className="bg-white border border-red-100 rounded-xl p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                                             <div className="flex justify-between items-start mb-2">
                                                 <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                                     <XCircle size={16} className="text-red-500" />
                                                     {cause.title}
                                                 </h4>
                                                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                                     cause.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                 }`}>{cause.severity}</span>
                                             </div>
                                             <p className="text-sm text-slate-600 mb-4 pl-6">{cause.description}</p>
                                             
                                             {/* Inline Action for this cause */}
                                             {!isFixed && (
                                                 <div className="pl-6 pt-3 border-t border-slate-100">
                                                     <button className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                                         Review Evidence <ChevronRight size={12}/>
                                                     </button>
                                                 </div>
                                             )}
                                         </div>
                                     ))}

                                     {!isFixed && (
                                         <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
                                             <h4 className="font-bold text-slate-900 mb-2">Remediation Required</h4>
                                             <p className="text-sm text-slate-500 mb-4">Resolve these issues to proceed with payment.</p>
                                             <button 
                                                onClick={handleSimulateFix}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 mx-auto"
                                             >
                                                 <RefreshCw size={16}/> Auto-Correct & Revalidate
                                             </button>
                                         </div>
                                     )}
                                 </div>
                             )}
                        </div>
                    </div>
                </div>
            )}

            {/* Tab 4: Provider Guidance (Enhanced & Detailed) */}
            {activeTab === 'guidance' && (
                <div className="max-w-4xl mx-auto animate-fade-in pb-12">
                    <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-slate-800">
                            <h3 className="text-2xl font-bold text-white mb-2">Provider & Contract Guidance</h3>
                            <p className="text-blue-200">Actionable steps reconciled with payer policy and member contract terms.</p>
                        </div>
                        <div className="p-8 grid gap-6">
                            {result.providerGuidance.length > 0 ? (
                                result.providerGuidance.map((item, idx) => (
                                    <div key={idx} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:bg-slate-800 transition-colors group">
                                        {/* Action Header */}
                                        <div className="p-5 flex gap-4 border-b border-slate-700/50">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                                                {item.icon === 'code' ? <FileCode size={20}/> : item.icon === 'review' ? <Search size={20}/> : <Paperclip size={20}/>}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{item.action}</h4>
                                                <p className="text-slate-300 text-sm">{item.detail}</p>
                                            </div>
                                            <div className="flex items-start">
                                                 <button className="text-xs bg-white text-slate-900 px-3 py-1.5 rounded-full font-bold hover:bg-blue-50 transition-colors">
                                                    Apply Action
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Policy Rationale Section */}
                                        {(item.rationale || item.reference) && (
                                            <div className="bg-slate-900/50 p-5 flex flex-col md:flex-row gap-6 text-sm">
                                                <div className="flex-1">
                                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Policy Requirement</span>
                                                    <p className="text-slate-400 leading-relaxed">
                                                        {item.rationale || "Adherence to standard clinical guidelines required."}
                                                    </p>
                                                </div>
                                                {item.reference && (
                                                    <div className="md:w-1/3 border-l border-slate-700 pl-6 md:block flex flex-col">
                                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Reference Source</span>
                                                        <div className="flex items-start gap-2 text-blue-300">
                                                            <BookOpen size={16} className="mt-0.5 shrink-0"/>
                                                            <span className="font-medium">{item.reference}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-slate-500 bg-slate-800/30 rounded-xl border border-slate-800">
                                    <div className="w-16 h-16 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                         <Check size={32} />
                                    </div>
                                    <p className="text-lg font-medium text-slate-300">No corrective actions required.</p>
                                    <p className="text-sm mt-1">Provider is fully compliant with current contract terms.</p>
                                </div>
                            )}
                        </div>
                        {/* Footer decorative */}
                        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default ClaimDetail;