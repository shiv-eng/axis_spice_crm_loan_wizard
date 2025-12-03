import React, { useState } from 'react';
import { LoanProduct, CustomerProfile, LoanJourneyConfig } from '../types';
import { LOAN_JOURNEYS } from '../constants';
import { ArrowLeft, ChevronRight, AlertTriangle, Loader2, MapPin, User, Smartphone } from 'lucide-react';

interface Props {
  product: LoanProduct;
  customer?: CustomerProfile | null;
  onBack: () => void;
  onComplete: (status: 'green' | 'yellow' | 'red', formData: any) => void;
}

const LoanJourney: React.FC<Props> = ({ product, customer, onBack, onComplete }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({
    mobile: customer?.mobile || '',
    name: customer?.name || '',
    pincode: '',
    amt: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fallback to specific config or default to personal loan config
  const config: LoanJourneyConfig = LOAN_JOURNEYS[product.id] || LOAN_JOURNEYS['personal-loan'];
  const currentStep = config.steps[currentStepIdx];
  const totalSteps = config.steps.length;

  const handleInputChange = (id: string, value: any) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    if(error) setError('');
  };

  const handleNext = () => {
    if (currentStepIdx < totalSteps - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    // Basic Validation
    if(!formData.mobile || !formData.name || !formData.pincode) {
        setError("Please fill all details to generate Lead ID");
        return;
    }

    setLoading(true);
    // Simulate API Call to map Pincode to Nearest Branch
    setTimeout(() => {
      setLoading(false);
      
      // LOGIC: High Value or Business/Agri = Referral (Yellow)
      // Low Value Personal = Green
      const amount = parseInt(formData['amt'] || '0');
      let result: 'green' | 'yellow' | 'red' = 'green';

      if (amount > 300000 || product.category === 'Agri' || product.category === 'Business') {
        result = 'yellow'; 
      } else {
        result = 'green';
      }

      if (formData['name']?.toLowerCase().includes('reject')) {
        result = 'red';
      }

      onComplete(result, formData);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6 p-8 animate-fade-in bg-white/90 z-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="text-rose-600" size={24} />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800">Generating Lead ID...</h3>
          <p className="text-gray-500 mt-2">Mapping Pincode {formData.pincode} to Nearest Branch...</p>
          <div className="mt-6 p-3 bg-gray-50 rounded-lg text-xs text-left max-w-[200px] mx-auto space-y-1">
             <div className="flex items-center gap-2 text-green-600"><CheckCircle size={12}/> Checking CIBIL...</div>
             <div className="flex items-center gap-2 text-green-600"><CheckCircle size={12}/> Verifying Adhikari ID...</div>
             <div className="flex items-center gap-2 text-green-600"><CheckCircle size={12}/> Assigning Relationship Manager...</div>
          </div>
        </div>
      </div>
    );
  }

  // Icons for the minimal form fields to make it look nicer
  const getIcon = (id: string) => {
    if(id === 'mobile') return <Smartphone size={18} className="text-gray-400"/>;
    if(id === 'pincode') return <MapPin size={18} className="text-gray-400"/>;
    return <User size={18} className="text-gray-400"/>;
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="font-bold text-gray-800">{product.name} Lead Gen</h2>
          <p className="text-xs text-gray-500">Minimalist Mode</p>
        </div>
      </div>

      {/* Form Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-slide-up">
          <h3 className="text-lg font-bold text-gray-800 mb-1">Customer Details</h3>
          <p className="text-sm text-gray-500 mb-6">Enter basic details to generate Lead ID & Map Branch.</p>
          
          <div className="space-y-5">
            {currentStep.fields.map((field) => (
              <div key={field.id} className="relative">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                <div className="relative">
                    <div className="absolute left-3 top-3.5">
                        {getIcon(field.id)}
                    </div>
                    <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100 outline-none transition-all font-medium text-gray-800"
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                </div>
              </div>
            ))}
          </div>

          {error && (
             <div className="mt-4 text-xs text-red-600 bg-red-50 p-2 rounded-lg flex items-center gap-2 font-bold animate-pulse">
                <AlertTriangle size={14} /> {error}
             </div>
          )}
        </div>

        {/* Adhikari Nudge */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
           <div className="bg-blue-100 p-1.5 rounded-full">
                <AlertTriangle size={16} className="text-blue-700" />
           </div>
           <div>
              <p className="text-sm text-blue-900 font-bold">Branch Mapping Logic</p>
              <p className="text-xs text-blue-700 mt-1">
                  System will automatically assign the nearest Axis Branch Manager based on Pincode <span className="font-bold">{formData.pincode || '...'}</span>.
              </p>
           </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-white border-t">
        <button 
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-[#97144d] to-[#e31e24] text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          Generate Lead ID
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

// Helper for Loader
const CheckCircle = ({size}: {size:number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

export default LoanJourney;