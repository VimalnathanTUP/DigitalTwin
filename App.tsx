import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ClaimDetail from './components/ClaimDetail';
import Analytics from './components/Analytics';
import { Claim } from './types';
import { MOCK_CLAIMS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [animateDetail, setAnimateDetail] = useState(false);

  const handleSelectClaim = (claim: Claim, animate: boolean = false) => {
    setSelectedClaim(claim);
    setAnimateDetail(animate);
    setCurrentView('claim-detail');
  };

  const handleBackToDashboard = () => {
    setSelectedClaim(null);
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
      case 'claims':
        return <Dashboard claims={MOCK_CLAIMS} onSelectClaim={handleSelectClaim} />;
      case 'claim-detail':
        if (selectedClaim) {
          return <ClaimDetail claim={selectedClaim} onBack={handleBackToDashboard} animate={animateDetail} />;
        }
        return <Dashboard claims={MOCK_CLAIMS} onSelectClaim={handleSelectClaim} />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard claims={MOCK_CLAIMS} onSelectClaim={handleSelectClaim} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 ml-64 h-full overflow-y-auto scroll-smooth relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;