
import React, { useState } from 'react';
import { AppView, LoanProduct, CustomerProfile, LeadStatus } from './types';
import { LayoutGrid, Users, Sparkles, Menu, Bell } from 'lucide-react';
import ConceptA_Customer360 from './components/ConceptA_Customer360';
import ConceptB_NeedsFirst from './components/ConceptB_NeedsFirst';
import ConceptC_SmartWizard from './components/ConceptC_SmartWizard';
import LoanJourney from './components/LoanJourney';
import ResultScreen from './components/ResultScreen';
import LeadManagement from './components/LeadManagement';
import EarningsPage from './components/EarningsPage';
import CASAJourney from './components/CASAJourney';
// New Action Components
import Action_SuggestGold from './components/Action_SuggestGold';
import Action_UploadDocs from './components/Action_UploadDocs';
import Action_ViewReceipt from './components/Action_ViewReceipt';
import Action_CallRM from './components/Action_CallRM';
import { MOCK_LEADS, PRODUCTS } from './constants';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.CONCEPT_A);
  const [selectedProduct, setSelectedProduct] = useState<LoanProduct | null>(null);
  const [currentCustomer, setCurrentCustomer] = useState<CustomerProfile | null>(null);
  const [resultStatus, setResultStatus] = useState<'green'|'yellow'|'red'>('green');
  const [formData, setFormData] = useState<any>(null);
  const [selectedLead, setSelectedLead] = useState<LeadStatus | null>(null);
  
  // State for Leads List (Initialized with Mock Data)
  const [leads, setLeads] = useState<LeadStatus[]>(MOCK_LEADS);

  const handleProductSelect = (product: LoanProduct, customer?: CustomerProfile) => {
    setSelectedProduct(product);
    if (customer) setCurrentCustomer(customer);
    setCurrentView(AppView.LOAN_FORM);
  };

  const handleOpenAccount = (mobile: string) => {
    setCurrentCustomer({ mobile, name: 'New Customer', isExisting: false, segment: 'New' });
    setCurrentView(AppView.CASA_FLOW);
  };

  const handleLoanComplete = (status: 'green' | 'yellow' | 'red', data: any) => {
    setResultStatus(status);
    setFormData(data);

    // Create a new Lead object
    const newLead: LeadStatus = {
        id: Date.now().toString(),
        leadId: `LEAD-${Math.floor(10000 + Math.random() * 90000)}`,
        customerName: data.name,
        customerPhone: data.mobile,
        productName: selectedProduct?.name || 'Loan',
        // Map Result Status to Lead Status
        // CHANGE: Green (Submitted) maps to IN_PROGRESS (Under Review), NOT Disbursed.
        status: status === 'red' ? 'REJECTED' : 'IN_PROGRESS',
        date: 'Just now',
        amount: data.amt ? `₹${parseInt(data.amt).toLocaleString()}` : (data.weight ? `Gold (~${data.weight}g)` : 'N/A'),
        branchName: 'Indrapuram Branch',
        branchManager: 'Mr. Rahul Singh',
        managerPhone: '98100 12345',
        actionRequired: status === 'red' ? 'Low CIBIL. Suggest Gold Loan.' : undefined
    };

    // Prepend the new lead to the list
    setLeads([newLead, ...leads]);

    setCurrentView(AppView.SUCCESS_RECEIPT);
  };

  const handleGoldConversion = (weight: string) => {
    if (!selectedLead) return;

    // Set product to Gold Loan
    const goldProduct = PRODUCTS['gold-loan'];
    setSelectedProduct(goldProduct);

    // Create payload mimicking standard form submission
    const data = {
      name: selectedLead.customerName,
      mobile: selectedLead.customerPhone,
      weight: weight,
      amt: '' // Will use weight for display in handleLoanComplete
    };

    // Trigger success flow
    handleLoanComplete('green', data);
  };

  const handleReset = () => {
    setSelectedProduct(null);
    setCurrentCustomer(null);
    setSelectedLead(null);
    setCurrentView(AppView.CONCEPT_A);
  };

  const handleLeadAction = (action: AppView, lead: LeadStatus) => {
    setSelectedLead(lead);
    setCurrentView(action);
  };

  const handleActionComplete = () => {
    // Return to Lead Management after action
    setCurrentView(AppView.LEAD_MANAGEMENT);
  };

  // Concept Navigation Buttons
  const NavButton = ({ view, label, icon: Icon }: any) => (
    <button 
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${currentView === view ? 'text-rose-700 bg-rose-50 font-bold' : 'text-gray-500 hover:text-gray-700'}`}
    >
      <Icon size={20} />
      <span className="text-[10px] uppercase tracking-wider">{label}</span>
    </button>
  );

  // Determine which component to render inside the "Screen"
  const renderContent = () => {
    switch (currentView) {
      case AppView.CONCEPT_A:
        return <ConceptA_Customer360 onSelectProduct={handleProductSelect} onOpenAccount={handleOpenAccount} />;
      case AppView.CONCEPT_B:
        return <ConceptB_NeedsFirst onSelectProduct={handleProductSelect} />;
      case AppView.CONCEPT_C:
        return <ConceptC_SmartWizard onSelectProduct={handleProductSelect} />;
      case AppView.LOAN_FORM:
        return selectedProduct ? (
          <LoanJourney 
            product={selectedProduct} 
            customer={currentCustomer} 
            onBack={() => setCurrentView(AppView.CONCEPT_A)}
            onComplete={handleLoanComplete}
          />
        ) : null;
      case AppView.CASA_FLOW:
        return (
          <CASAJourney 
            mobile={currentCustomer?.mobile || ''}
            onBack={handleReset}
            onComplete={handleReset}
          />
        );
      case AppView.SUCCESS_RECEIPT:
        return (
          <ResultScreen 
            status={resultStatus} 
            product={selectedProduct}
            formData={formData}
            onHome={handleReset}
            onMyLeads={() => setCurrentView(AppView.LEAD_MANAGEMENT)} 
          />
        );
      case AppView.LEAD_MANAGEMENT:
        // Pass the dynamic leads list here
        return <LeadManagement leads={leads} onBack={handleReset} onAction={handleLeadAction} />;
      
      case AppView.NOTIFICATIONS:
        return <EarningsPage onBack={handleReset} />;

      // New Action Routes
      case AppView.ACTION_SUGGEST_GOLD:
        return selectedLead ? <Action_SuggestGold lead={selectedLead} onBack={() => setCurrentView(AppView.LEAD_MANAGEMENT)} onComplete={handleGoldConversion} /> : null;
      case AppView.ACTION_UPLOAD_DOCS:
        return selectedLead ? <Action_UploadDocs lead={selectedLead} onBack={() => setCurrentView(AppView.LEAD_MANAGEMENT)} onComplete={handleActionComplete} /> : null;
      case AppView.ACTION_VIEW_RECEIPT:
        return selectedLead ? <Action_ViewReceipt lead={selectedLead} onBack={() => setCurrentView(AppView.LEAD_MANAGEMENT)} /> : null;
      case AppView.ACTION_CALL_RM:
        return selectedLead ? <Action_CallRM lead={selectedLead} onBack={() => setCurrentView(AppView.LEAD_MANAGEMENT)} /> : null;

      default:
        return <ConceptA_Customer360 onSelectProduct={handleProductSelect} onOpenAccount={handleOpenAccount} />;
    }
  };

  const isFullScreen = [
    AppView.LOAN_FORM, 
    AppView.CASA_FLOW,
    AppView.SUCCESS_RECEIPT, 
    AppView.LEAD_MANAGEMENT,
    AppView.NOTIFICATIONS,
    AppView.ACTION_SUGGEST_GOLD,
    AppView.ACTION_UPLOAD_DOCS,
    AppView.ACTION_VIEW_RECEIPT,
    AppView.ACTION_CALL_RM
  ].includes(currentView);

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4 bg-gray-200 font-sans">
      {/* Mobile Simulator Container */}
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden h-[850px] flex flex-col relative border-8 border-gray-900">
        
        {/* Top Status Bar (Visual only) */}
        <div className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center text-xs">
          <span>9:41</span>
          <div className="flex gap-1">
             <div className="w-4 h-4 bg-white rounded-sm opacity-80"></div>
             <div className="w-4 h-4 bg-white rounded-sm opacity-80"></div>
          </div>
        </div>

        {/* App Header (Only show on Concept screens) */}
        {!isFullScreen && (
          <div className="bg-gradient-to-r from-[#97144d] to-[#e31e24] text-white p-5 rounded-b-[32px] shadow-lg z-10 transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                   <span className="text-[#97144d] font-bold text-lg">A</span>
                </div>
                <div>
                   <h1 className="font-bold text-lg leading-none">Axis | Spice</h1>
                   <p className="text-[10px] opacity-80 uppercase tracking-widest">Banking Service Center</p>
                </div>
              </div>
              <div className="flex gap-3">
                 <button 
                    onClick={() => setCurrentView(AppView.NOTIFICATIONS)}
                    className="relative p-1 hover:bg-white/20 rounded-full transition-colors"
                 >
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
                 </button>
                 <button onClick={() => setCurrentView(AppView.LEAD_MANAGEMENT)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                    <Menu size={20} />
                 </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Scrollable Content */}
        <div className={`flex-1 overflow-y-auto scrollbar-hide ${!isFullScreen ? '-mt-4 pt-4' : ''} bg-gray-50`}>
          {renderContent()}
        </div>

        {/* Bottom Navigation (Only for Concepts) */}
        {!isFullScreen && (
          <div className="bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <NavButton view={AppView.CONCEPT_A} label="Search" icon={Users} />
            <NavButton view={AppView.CONCEPT_B} label="Menu" icon={LayoutGrid} />
            <NavButton view={AppView.CONCEPT_C} label="Wizard" icon={Sparkles} />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
