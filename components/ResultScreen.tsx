
import React, { useState } from 'react';
import { CheckCircle2, XCircle, Clock, Share2, Home, Smartphone, Phone, AlertCircle, TrendingUp, ArrowRight, MapPin, UserCheck, Building2 } from 'lucide-react';
import { LoanProduct } from '../types';

interface Props {
  status: 'green' | 'yellow' | 'red';
  product: LoanProduct | null;
  onHome: () => void;
  formData?: any;
}

const ResultScreen: React.FC<Props> = ({ status, product, onHome, formData }) => {
  const [showNudge, setShowNudge] = useState(true);
  
  // Simulated Branch Logic based on Pincode (Mock)
  const branchDetails = {
    name: "Indrapuram Branch",
    address: "Plot No. 12, Gyan Khand II, Indirapuram, Ghaziabad, UP 201014",
    managerName: "Mr. Rahul Singh",
    managerPhone: "+91 98100 12345",
    adhikariPhone: "+91 98765 43210"
  };

  // Configuration for different status states
  const config = {
    // YELLOW: High Value / Referral Flow
    yellow: {
      theme: 'yellow',
      icon: Clock,
      title: 'Application Submitted',
      adhikari: {
        header: 'Congrats! Loan request is Submitted',
        msg: 'Lead ID #LEAD-9921 generated for reference.',
        highlight: 'Commission: ₹500 (if loan is approved)',
        detail: 'Application Initiated. Sent to Branch.'
      },
      customer: {
        header: 'Loan Submitted',
        msg: `Thank you, ${formData?.name || 'Customer'}. Your ${product?.name} request is submitted successfully. Ref Lead ID: #LEAD-9921.`,
      }
    },
    // GREEN: Standard Flow (Now also "Submitted" as per request)
    green: {
      theme: 'green',
      icon: CheckCircle2,
      title: 'Application Submitted',
      adhikari: {
        header: 'Congrats! Loan request is Submitted',
        msg: 'Lead ID #LEAD-9921 generated for reference.',
        highlight: 'Commission: ₹500 (if loan is approved)',
        detail: 'Application Initiated.'
      },
      customer: {
        header: 'Loan Submitted',
        msg: `Congratulations ${formData?.name || ''}! Your ${product?.name} application is submitted. Lead ID: #LEAD-9921.`,
      }
    },
    // RED: Rejected Flow
    red: {
      theme: 'red',
      icon: XCircle,
      title: 'Application Rejected',
      adhikari: {
        header: 'Action Required',
        msg: 'Lead Rejected: Low CIBIL Score.',
        highlight: 'Action: Suggest Gold Loan.',
        detail: 'Customer not eligible for Unsecured Loan.'
      },
      customer: {
        header: 'Update',
        msg: `Dear ${formData?.name || 'Customer'}, we could not process this request at this time.`,
      }
    }
  };

  const current = config[status];
  const isCrossSellEligible = status !== 'red';
  
  return (
    <div className="h-full bg-gray-50 flex flex-col animate-fade-in relative">
      
      {/* Top Header Status */}
      <div className={`p-8 pb-12 rounded-b-[40px] shadow-sm flex flex-col items-center justify-center text-center ${current.theme === 'yellow' ? 'bg-amber-100' : current.theme === 'green' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
         <div className={`w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md mb-4`}>
           <current.icon size={40} className={status === 'yellow' ? 'text-amber-600' : status === 'green' ? 'text-emerald-600' : 'text-rose-600'} />
         </div>
         <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
         <p className="text-sm opacity-70 mt-1 font-medium text-gray-700 uppercase tracking-wider">Status Update</p>
      </div>

      <div className="-mt-8 px-4 space-y-4 pb-24 overflow-y-auto flex-1">
        
        {/* Adhikari View Card */}
        <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#97144d]"></div>
          <div className="flex items-center gap-2 mb-3 text-[#97144d]">
            <Smartphone size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Adhikari App View</span>
          </div>
          
          <div className="space-y-3">
             <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
               <p className="font-bold text-gray-800 text-lg">{current.adhikari.header}</p>
               <p className="text-sm text-gray-600 mt-1">{current.adhikari.msg}</p>
               <p className={`text-sm font-bold mt-2 ${status === 'red' ? 'text-rose-600' : 'text-green-600'}`}>
                 {current.adhikari.highlight}
               </p>
             </div>
             
             {/* The "Bank Action" details */}
             <div className="flex items-start gap-3 p-2 bg-blue-50/50 rounded-lg">
                <div className="mt-1"><Phone size={16} className="text-blue-500" /></div>
                <p className="text-sm text-gray-600 leading-snug">
                  {current.adhikari.detail}
                </p>
             </div>
          </div>
        </div>

        {/* Customer SMS View Card (Digital Receipt) */}
        <div className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700 text-white relative">
          <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
            <div className="flex items-center gap-2 text-gray-400">
                <Smartphone size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Customer View</span>
            </div>
            <span className="bg-gray-700 px-2 py-0.5 rounded text-[10px] text-gray-300">SMS / WhatsApp</span>
          </div>
          
          <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600 relative">
             <div className="absolute -left-2 top-4 w-4 h-4 bg-gray-700/50 transform rotate-45 border-l border-b border-gray-600"></div>
             
             <div className="flex items-center gap-2 mb-3">
               <div className="w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center text-[10px] font-bold">AX</div>
               <span className="text-xs font-medium text-gray-300">Axis-Spice Bank Center</span>
             </div>
             
             <p className="text-sm leading-relaxed text-gray-100 font-sans mb-4">
               {current.customer.msg}
               {status === 'red' && <span className="block mt-2">{current.red?.customer?.detail}</span>}
             </p>
             
             {/* Detailed Branch Info for Green/Yellow Status */}
             {status !== 'red' && (
               <div className="space-y-3 border-t border-gray-600 pt-3">
                 <div className="flex gap-2 text-xs text-gray-300">
                    <Building2 size={14} className="text-rose-400 shrink-0" />
                    <div>
                      <span className="font-bold block text-white">{branchDetails.name}</span>
                      <span className="text-[10px] opacity-70">{branchDetails.address}</span>
                    </div>
                 </div>
                 
                 <div className="flex gap-2 text-xs text-gray-300">
                    <UserCheck size={14} className="text-rose-400 shrink-0" />
                    <div>
                      <span className="font-bold block text-white">Branch Manager: {branchDetails.managerName}</span>
                      <span className="text-[10px] opacity-70">Contact: {branchDetails.managerPhone}</span>
                    </div>
                 </div>

                 <div className="flex gap-2 text-xs text-gray-300">
                    <Phone size={14} className="text-rose-400 shrink-0" />
                    <div>
                      <span className="font-bold block text-white">Adhikari Help</span>
                      <span className="text-[10px] opacity-70">{branchDetails.adhikariPhone}</span>
                    </div>
                 </div>
               </div>
             )}
          </div>
        </div>
        
        {/* Buttons */}
        <div className="pt-2 space-y-3">
          {status !== 'red' ? (
             <button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-colors">
              <Share2 size={18} /> Share Details on WhatsApp
            </button>
          ) : (
             <button className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm">
              <AlertCircle size={18} /> Check Gold Loan Eligibility
            </button>
          )}
          
          <button onClick={onHome} className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-50">
            <Home size={18} /> Back to Dashboard
          </button>
        </div>
      </div>

      {/* --- THE SMART NUDGE (Cross-Sell) --- */}
      {isCrossSellEligible && showNudge && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white rounded-t-[30px] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] animate-slide-up z-20 border-t border-rose-100">
          <div className="flex justify-between items-start mb-2">
             <div className="flex items-center gap-2">
                <div className="bg-rose-100 p-1.5 rounded-full animate-pulse">
                  <TrendingUp size={16} className="text-rose-600" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm">Earn Extra Commission!</h4>
             </div>
             <button onClick={() => setShowNudge(false)} className="text-gray-400 hover:text-gray-600">
               <XCircle size={20} />
             </button>
          </div>
          
          <p className="text-xs text-gray-600 mb-3">
            Customer applied for <span className="font-bold">{product?.name || 'Loan'}</span>. 
            Do they have a {product?.category === 'Agri' || product?.category === 'Business' ? 'Current' : 'Savings'} Account?
          </p>
          
          <button className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-between px-4">
             <span>Open {product?.category === 'Agri' || product?.category === 'Business' ? 'Current' : 'Savings'} Account</span>
             <div className="flex items-center gap-2">
               <span className="text-green-400 text-xs">+ ₹150</span>
               <ArrowRight size={16} />
             </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultScreen;
