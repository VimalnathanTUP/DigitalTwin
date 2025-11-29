import React, { useState, useEffect, useRef } from 'react';
import { Claim, ClaimStatus } from '../types';
import { Bell, Search, Loader2, Play, ChevronDown, Check, AlertTriangle, AlertCircle, FileText } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DashboardProps {
  claims: Claim[];
  onSelectClaim: (claim: Claim, animate?: boolean) => void;
}

// Mock Data for the charts matching the image
const TREND_DATA = [
  { day: 'Mon', noRisk: 145, lowRisk: 42, highRisk: 12 },
  { day: 'Tue', noRisk: 152, lowRisk: 38, highRisk: 15 },
  { day: 'Wed', noRisk: 148, lowRisk: 45, highRisk: 14 },
  { day: 'Thu', noRisk: 160, lowRisk: 40, highRisk: 18 },
  { day: 'Fri', noRisk: 155, lowRisk: 48, highRisk: 16 },
  { day: 'Sat', noRisk: 142, lowRisk: 44, highRisk: 12 },
  { day: 'Sun', noRisk: 138, lowRisk: 42, highRisk: 10 },
];

const PROVIDER_DATA = [
  { name: "St. Mary's", value: 28 },
  { name: "City Medical", value: 22 },
  { name: "Regional Health", value: 18 },
  { name: "Valley Care", value: 12 },
  { name: "Metro Hospital", value: 9 },
];

const Dashboard: React.FC<DashboardProps> = ({ claims, onSelectClaim }) => {
  const [simulationState, setSimulationState] = useState<{ active: boolean; progress: number; type: string } | null>(null);
  const [showSimMenu, setShowSimMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowSimMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSimulateClaim = (type: 'No Risk' | 'Low Risk' | 'High Risk') => {
    setSimulationState({ active: true, progress: 0, type });
    setShowSimMenu(false);
  };

  // Simulation Progress Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (simulationState?.active) {
      interval = setInterval(() => {
        setSimulationState(prev => {
          if (!prev) return null;
          // Increment progress
          const newProgress = prev.progress + 2; 
          
          if (newProgress >= 100) {
             clearInterval(interval);
             return { ...prev, progress: 100 };
          }
          return { ...prev, progress: newProgress };
        });
      }, 20); // Speed of the progress bar
    }
    return () => clearInterval(interval);
  }, [simulationState?.active]);

  // Trigger Navigation on Complete
  useEffect(() => {
    if (simulationState?.progress === 100) {
        // Short delay to show 100%
        const timer = setTimeout(() => {
             // Logic to find a claim that matches the simulated risk type
           let targetClaim;
           if (simulationState.type === 'High Risk') {
               targetClaim = claims.find(c => c.riskScore > 80 && c.status === ClaimStatus.FLAGGED);
           } else if (simulationState.type === 'Low Risk') {
               targetClaim = claims.find(c => c.riskScore > 20 && c.riskScore <= 80);
           } else {
               targetClaim = claims.find(c => c.riskScore <= 20);
           }
           
           // Fallback if not found
           if (!targetClaim) targetClaim = claims[0];

           onSelectClaim(targetClaim, true);
           setSimulationState(null);
        }, 500);
        return () => clearTimeout(timer);
    }
  }, [simulationState?.progress, claims, onSelectClaim, simulationState?.type]);


  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20 relative min-h-screen bg-slate-50">
      
      {/* Simulation Overlay */}
      {simulationState?.active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center animate-pulse">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Processing Submission</h3>
                        <p className="text-sm text-slate-500">Ingesting claim data...</p>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                        <span>Progress</span>
                        <span>{simulationState.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-blue-600 rounded-full transition-all duration-100 ease-out"
                            style={{ width: `${simulationState.progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="mt-6 text-xs text-center text-slate-400">
                    Validating formats • OCR Scanning • Payer Rules Engine
                </div>
            </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Claims Dashboard</h1>
            <p className="text-slate-500 text-sm">Overview of current validation queue and risk assessment</p>
        </div>
        <div className="flex items-center gap-4 self-end sm:self-auto">
             <button className="p-2 text-slate-400 hover:text-slate-600 relative bg-white border border-slate-200 rounded-lg shadow-sm">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
             </button>
             
             <div className="relative" ref={menuRef}>
                 <button 
                    onClick={() => !simulationState?.active && setShowSimMenu(!showSimMenu)}
                    disabled={!!simulationState?.active}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                >
                    {simulationState?.active ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                    Simulate New Claim
                    <ChevronDown size={14} className={`transition-transform ${showSimMenu ? 'rotate-180' : ''}`} />
                 </button>

                 {showSimMenu && (
                     <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                         <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-100">Select Scenario</div>
                         <button onClick={() => handleSimulateClaim('No Risk')} className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm font-medium text-green-700 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-green-500"></div> No Risk (Clean)
                         </button>
                         <button onClick={() => handleSimulateClaim('Low Risk')} className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm font-medium text-yellow-700 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Low Risk (Missing Info)
                         </button>
                         <button onClick={() => handleSimulateClaim('High Risk')} className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm font-medium text-red-700 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-red-500"></div> High Risk (Fraud/Error)
                         </button>
                     </div>
                 )}
             </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* No Risk Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-green-500 uppercase tracking-wider">No Risk</span>
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <Check size={20} />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-slate-900">1,247</h3>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1">Financial Exposure</p>
            <p className="text-lg font-bold text-slate-800">$2,450,320</p>
          </div>
        </div>

        {/* Low Risk Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-yellow-500 uppercase tracking-wider">Low Risk</span>
            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                <AlertTriangle size={20} />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-slate-900">328</h3>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1">Financial Exposure</p>
            <p className="text-lg font-bold text-slate-800">$875,640</p>
          </div>
        </div>

        {/* High Risk Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">High Risk</span>
            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                <AlertCircle size={20} />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-slate-900">89</h3>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1">Financial Exposure</p>
            <p className="text-lg font-bold text-slate-800">$1,234,500</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Risk Distribution Trend</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={TREND_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <Tooltip 
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} 
                            cursor={{stroke: '#e2e8f0'}}
                        />
                        <Legend wrapperStyle={{paddingTop: '20px'}} iconType="circle" />
                        <Line type="monotone" dataKey="noRisk" name="No Risk" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                        <Line type="monotone" dataKey="lowRisk" name="Low Risk" stroke="#f59e0b" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                        <Line type="monotone" dataKey="highRisk" name="High Risk" stroke="#ef4444" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Top Providers - High Risk Claims */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Top Providers - High Risk Claims</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={PROVIDER_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dy={10} interval={0} angle={-15} textAnchor="end" height={60} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <Tooltip 
                            cursor={{fill: '#f8fafc'}} 
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} 
                        />
                        <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* Claims Queue Table (Below the charts) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-slate-900">Incoming Claims Queue</h2>
          <div className="relative w-full sm:w-auto">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
             <input 
                type="text" 
                placeholder="Search claims, DRG..." 
                className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-64"
             />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Claim ID</th>
                <th className="px-6 py-4 font-semibold">Provider / Patient</th>
                <th className="px-6 py-4 font-semibold">DRG / Procedure</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Risk Level</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => onSelectClaim(claim, false)}>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {claim.id}
                    <div className="text-xs text-slate-400 mt-1">{claim.date}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="font-medium text-slate-900">{claim.provider}</div>
                    <div className="text-xs text-slate-400">{claim.patientName}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2 mb-1">
                         <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs text-slate-700 border border-slate-200">{claim.drgCode}</span>
                         <span className="text-xs text-slate-500">{claim.claimType}</span>
                    </div>
                    <span className="truncate max-w-[200px] block text-xs" title={claim.drgDescription}>{claim.drgDescription}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">${claim.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                        ${claim.riskScore > 80 ? 'bg-red-50 text-red-700 border-red-100' : 
                          claim.riskScore > 30 ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : 
                          'bg-green-50 text-green-700 border-green-100'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${claim.riskScore > 80 ? 'bg-red-500' : claim.riskScore > 30 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                        {claim.riskScore > 80 ? 'High Risk' : claim.riskScore > 30 ? 'Low Risk' : 'No Risk'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium
                        ${claim.status === ClaimStatus.PENDING ? 'bg-slate-100 text-slate-600' : 
                          claim.status === ClaimStatus.APPROVED ? 'bg-green-100 text-green-800' : 
                          claim.status === ClaimStatus.FLAGGED ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onSelectClaim(claim, false); }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;