
import React, { useState } from 'react';
import { ArrowLeft, Coins, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';
import { LeadStatus } from '../types';

interface Props {
  lead: LeadStatus;
  onBack: () => void;
  onComplete: (weight: string) => void;
}

const Action_SuggestGold: React.FC<Props> = ({ lead, onBack, onComplete }) => {
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    // Weight is now optional
    setLoading(true);
    setTimeout(() => {
      onComplete(weight);
    }, 1500);
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col animate-slide-up">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="font-bold text-gray-800">Convert to Gold Loan</h2>
          <p className="text-xs text-gray-500">Quick Lead Conversion</p>
        </div>
      </div>

      <div className="p-4 flex-1">
        {/* Context Card */}
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl mb-6">
          <div className="flex items-start gap-3">
             <AlertTriangle className="text-rose-600 shrink-0" size={20} />
             <div>
               <p className="text-sm text-gray-800 font-medium">Previous Rejection Context</p>
               <p className="text-xs text-gray-600 mt-1">
                 Customer <span className="font-bold">{lead.customerName}</span> was rejected for Personal Loan due to Low CIBIL.
               </p>
               <div className="mt-2 bg-white/60 p-2 rounded text-xs text-rose-800 font-bold inline-block">
                 Recommended: Gold Loan (Secured)
               </div>
             </div>
          </div>
        </div>

        {/* Minimal Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Coins className="text-yellow-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Gold Loan Application</h3>
                <p className="text-xs text-gray-500">Pre-filled with customer data</p>
              </div>
           </div>

           <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Customer Name</label>
                <input type="text" value={lead.customerName} disabled className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Approx Gold Weight (gms) <span className="text-gray-400 font-normal normal-case">(Optional)</span></label>
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 45" 
                  className="w-full bg-white border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 rounded-xl px-4 py-3 text-gray-900 font-bold outline-none" 
                  autoFocus
                />
              </div>
              
              <div className="bg-green-50 text-green-800 text-xs p-3 rounded-lg flex items-center gap-2">
                 <CheckCircle2 size={14} />
                 <span>99% Approval Chance for Gold Loan</span>
              </div>
           </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t">
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? 'Submitting...' : 'Generate New Lead'}
          {!loading && <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Action_SuggestGold;
