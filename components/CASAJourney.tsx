
import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, ScanFace, ShieldCheck, Wallet, ChevronRight, Loader2, Share2, Home, User, MapPin, FileText, Lock, Eye, Edit2, CreditCard, ScrollText, Fingerprint, AlertCircle } from 'lucide-react';

interface Props {
  mobile: string;
  onBack: () => void;
  onComplete: () => void;
}

const CASAJourney: React.FC<Props> = ({ mobile, onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Step 1: Consent & OTP
  const [consents, setConsents] = useState({
    bureau: false,
    ckyc: false,
    aadhaar: false
  });
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');

  // Step 2: Tab State & Details
  const [activeTab, setActiveTab] = useState<'bureau' | 'ckyc' | 'aadhaar'>('bureau');
  const [details, setDetails] = useState({
    fatherName: 'Suresh Verma',
    motherName: '', // Intentionally empty to test validation
    occupation: 'Salaried',
    income: '5L - 10L',
    nomineeName: 'Suman Verma',
    nomineeRelation: 'Wife'
  });

  // Step 3: Funding (Fixed)
  const fundingAmount = 1000;

  // Mock Fetched Data
  const fetchedData = {
    pan: "ABCDE1234F",
    name: "Rahul Kumar Verma",
    dob: "12-08-1985",
    cibil: 745,
    ckycId: "CKYC-99887766",
    gender: "Male",
    address: "H.No 102, Shanti Nagar, Near Axis Bank, Sector 62, Noida, UP - 201309"
  };

  const allConsentsChecked = consents.bureau && consents.ckyc && consents.aadhaar;

  // --- HANDLERS ---

  const handleSendOTP = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setShowOtp(true);
    }, 1000);
  };

  const handleVerifyOTP = () => {
    if(otp.length < 4) return;
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setStep(2); // Go to Details
    }, 1500);
  };

  const handleDetailsSubmit = () => {
    if(!details.motherName.trim()) {
        setError("Please enter Mother's Name to proceed.");
        return;
    }
    setError('');
    setStep(3); // Go to Review & Funding
  };

  const handleProceedToESign = () => {
    setStep(4); // Go to E-Sign (Face Auth)
  };

  const handleESignComplete = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setStep(5); // Success
    }, 2500);
  };

  // --- STEP 1: CONSENT & OTP ---
  if(step === 1) {
    return (
        <div className="h-full bg-gray-50 flex flex-col animate-slide-up">
            <div className="bg-white px-4 py-3 border-b flex items-center gap-3">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={20} /></button>
                <div className="flex-1">
                    <h2 className="font-bold text-gray-800">Verification</h2>
                    <p className="text-xs text-gray-500">Step 1 of 5</p>
                </div>
            </div>
            
            <div className="p-6 flex-1 space-y-6 overflow-y-auto">
                {/* Mobile & Info */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <label className="text-xs font-bold text-gray-400 uppercase">Customer Mobile</label>
                    <div className="text-lg font-bold text-gray-900 mt-1 flex items-center gap-2">
                        +91 {mobile}
                        <CheckCircle2 size={16} className="text-green-500"/>
                    </div>
                </div>

                {/* Consents */}
                <div className="space-y-4 bg-white p-4 rounded-xl border border-gray-200">
                    <p className="text-sm font-bold text-gray-800 mb-2">Authorization</p>
                    
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" checked={consents.bureau} onChange={e => setConsents({...consents, bureau: e.target.checked})} className="w-5 h-5 mt-0.5 text-rose-600 rounded focus:ring-rose-500" />
                        <span className="text-xs text-gray-600 leading-snug">Fetch <strong>PAN & Credit Score</strong> from Bureau</span>
                    </label>
                    
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" checked={consents.ckyc} onChange={e => setConsents({...consents, ckyc: e.target.checked})} className="w-5 h-5 mt-0.5 text-rose-600 rounded focus:ring-rose-500" />
                        <span className="text-xs text-gray-600 leading-snug">Fetch <strong>CKYC Record</strong> from CERSAI</span>
                    </label>
                    
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" checked={consents.aadhaar} onChange={e => setConsents({...consents, aadhaar: e.target.checked})} className="w-5 h-5 mt-0.5 text-rose-600 rounded focus:ring-rose-500" />
                        <span className="text-xs text-gray-600 leading-snug">Fetch <strong>Address</strong> via Aadhaar Demo Auth</span>
                    </label>
                </div>

                {/* OTP Section */}
                {showOtp && (
                    <div className="animate-slide-down bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <div className="text-center space-y-2 mb-4">
                            <p className="text-sm text-blue-800 font-medium">Enter OTP sent to customer</p>
                        </div>
                        <div className="relative">
                            <input 
                                type="number" 
                                placeholder="• • • •" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full text-center text-2xl tracking-[0.5em] py-3 border-2 border-blue-200 rounded-lg focus:border-blue-600 outline-none font-bold text-gray-800 bg-white"
                                autoFocus
                            />
                        </div>
                        <div className="flex justify-between items-center mt-3 px-1">
                            <span className="text-xs text-gray-500">00:30</span>
                            <span className="text-xs text-blue-700 font-bold cursor-pointer">Resend OTP</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 bg-white border-t">
                {!showOtp ? (
                    <button 
                        onClick={handleSendOTP} 
                        disabled={!allConsentsChecked || loading}
                        className="w-full bg-gradient-to-r from-[#97144d] to-[#e31e24] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
                    >
                        {loading ? <Loader2 className="animate-spin"/> : 'Send OTP'}
                    </button>
                ) : (
                    <button 
                        onClick={handleVerifyOTP} 
                        disabled={otp.length < 4 || loading}
                        className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
                    >
                        {loading ? <Loader2 className="animate-spin"/> : 'Verify & Fetch Data'}
                    </button>
                )}
            </div>
        </div>
    );
  }

  // --- STEP 2: FETCHED DATA TABS & DETAILS ---
  if(step === 2) {
    return (
        <div className="h-full bg-gray-50 flex flex-col animate-slide-up">
            <div className="bg-white px-4 py-3 border-b flex items-center gap-3">
                <button onClick={() => setStep(1)} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={20} /></button>
                <div className="flex-1">
                    <h2 className="font-bold text-gray-800">Fetched Profile</h2>
                    <p className="text-xs text-gray-500">Step 2 of 5</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-24">
                
                {/* TABS HEADER */}
                <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                    <button 
                        onClick={() => setActiveTab('bureau')}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all ${activeTab === 'bureau' ? 'bg-rose-50 text-rose-700' : 'text-gray-500'}`}
                    >
                        <CreditCard size={14}/> Bureau
                    </button>
                    <button 
                        onClick={() => setActiveTab('ckyc')}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all ${activeTab === 'ckyc' ? 'bg-rose-50 text-rose-700' : 'text-gray-500'}`}
                    >
                        <ScrollText size={14}/> CKYC
                    </button>
                    <button 
                        onClick={() => setActiveTab('aadhaar')}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all ${activeTab === 'aadhaar' ? 'bg-rose-50 text-rose-700' : 'text-gray-500'}`}
                    >
                        <Fingerprint size={14}/> Aadhaar
                    </button>
                </div>

                {/* TAB CONTENT: BUREAU */}
                {activeTab === 'bureau' && (
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-gray-800 text-sm">Bureau Verification</h3>
                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle2 size={10} /> Verified
                            </span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                <span className="text-xs text-gray-500">Name on PAN</span>
                                <span className="text-sm font-bold text-gray-900">{fetchedData.name}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                <span className="text-xs text-gray-500">PAN Number</span>
                                <span className="text-sm font-mono font-bold text-gray-900">{fetchedData.pan}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xs text-gray-500">CIBIL Score</span>
                                <span className="text-sm font-bold text-green-600">{fetchedData.cibil} (Excellent)</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB CONTENT: CKYC */}
                {activeTab === 'ckyc' && (
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-gray-800 text-sm">CERSAI CKYC Data</h3>
                            <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle2 size={10} /> Fetched
                            </span>
                        </div>
                        <div className="flex gap-4 items-center mb-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                <User size={32} className="text-gray-400"/>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">CKYC ID</p>
                                <p className="font-mono text-sm font-bold text-gray-800">{fetchedData.ckycId}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                <span className="text-xs text-gray-500">DOB</span>
                                <span className="text-sm font-bold text-gray-900">{fetchedData.dob}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xs text-gray-500">Father's Name</span>
                                <span className="text-sm font-bold text-gray-900">{details.fatherName}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB CONTENT: AADHAAR */}
                {activeTab === 'aadhaar' && (
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-gray-800 text-sm">UIDAI Demographic</h3>
                            <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle2 size={10} /> Linked
                            </span>
                        </div>
                        <div className="space-y-3">
                             <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-orange-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-400 font-bold mb-1">Permanent Address</p>
                                    <p className="text-sm text-gray-800 leading-snug">{fetchedData.address}</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-3 pt-2">
                                <User size={16} className="text-orange-500" />
                                <p className="text-sm text-gray-800">Gender: <strong>{fetchedData.gender}</strong></p>
                             </div>
                        </div>
                    </div>
                )}

                {/* FORM FOR MISSING DETAILS */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Complete Profile</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mother's Name <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                value={details.motherName}
                                onChange={(e) => {
                                    setDetails({...details, motherName: e.target.value});
                                    if(error) setError('');
                                }}
                                placeholder="Enter Mother's Name"
                                className={`w-full border-b border-gray-300 py-2 text-sm font-bold text-gray-900 outline-none bg-transparent placeholder:font-normal placeholder:text-gray-400 ${error ? 'border-red-500' : 'focus:border-rose-600'}`}
                            />
                            {error && <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10}/> {error}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Occupation</label>
                                <select 
                                    value={details.occupation}
                                    onChange={(e) => setDetails({...details, occupation: e.target.value})}
                                    className="w-full border-b border-gray-300 py-2 text-sm font-bold text-gray-900 focus:border-rose-600 outline-none bg-transparent"
                                >
                                    <option>Salaried</option>
                                    <option>Self-Employed</option>
                                    <option>Business</option>
                                    <option>Student</option>
                                    <option>Homemaker</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Annual Income</label>
                                <select 
                                    value={details.income}
                                    onChange={(e) => setDetails({...details, income: e.target.value})}
                                    className="w-full border-b border-gray-300 py-2 text-sm font-bold text-gray-900 focus:border-rose-600 outline-none bg-transparent"
                                >
                                    <option>&lt; 1 Lakh</option>
                                    <option>1L - 5L</option>
                                    <option>5L - 10L</option>
                                    <option>&gt; 10L</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Nominee Section Inline */}
                    <div className="pt-2 border-t border-gray-100">
                         <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Nominee</h4>
                         <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <input 
                                    type="text" 
                                    value={details.nomineeName} 
                                    onChange={(e) => setDetails({...details, nomineeName: e.target.value})}
                                    className="w-full text-sm font-bold border-b border-gray-300 py-1 focus:border-rose-600 outline-none"
                                />
                            </div>
                            <div>
                                <select 
                                    value={details.nomineeRelation}
                                    onChange={(e) => setDetails({...details, nomineeRelation: e.target.value})}
                                    className="w-full text-sm font-bold border-b border-gray-300 py-1 bg-transparent outline-none"
                                >
                                    <option>Wife</option>
                                    <option>Husband</option>
                                    <option>Father</option>
                                    <option>Mother</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="p-4 bg-white border-t">
                <button 
                    onClick={handleDetailsSubmit} 
                    className="w-full bg-gradient-to-r from-[#97144d] to-[#e31e24] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
                >
                    Review Details <ChevronRight size={20}/>
                </button>
            </div>
        </div>
    );
  }

  // --- STEP 3: REVIEW & FUNDING ---
  if(step === 3) {
      return (
        <div className="h-full bg-gray-50 flex flex-col animate-slide-up">
            <div className="bg-white px-4 py-3 border-b flex items-center gap-3">
                <button onClick={() => setStep(2)} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={20} /></button>
                <div className="flex-1">
                    <h2 className="font-bold text-gray-800">Final Review</h2>
                    <p className="text-xs text-gray-500">Step 3 of 5</p>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
                
                {/* Review Card */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                         <h3 className="font-bold text-gray-800">Account Summary</h3>
                         <button onClick={() => setStep(2)} className="text-rose-600 text-xs font-bold flex items-center gap-1"><Edit2 size={10}/> Edit</button>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                            <span className="text-gray-500">Customer</span>
                            <span className="font-bold text-gray-900">{fetchedData.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                            <span className="text-gray-500">Nominee</span>
                            <span className="font-bold text-gray-900">{details.nomineeName} ({details.nomineeRelation})</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 pb-2">
                            <span className="text-gray-500">Address</span>
                            <span className="font-bold text-gray-900 text-right max-w-[60%] truncate">{fetchedData.address}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Occupation</span>
                            <span className="font-bold text-gray-900">{details.occupation}</span>
                        </div>
                    </div>
                </div>

                {/* Funding Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl border border-green-100 shadow-sm">
                     <div className="flex items-start gap-3 mb-4">
                        <div className="bg-green-100 p-2 rounded-full">
                            <Wallet size={20} className="text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Initial Funding</h3>
                            <p className="text-xs text-gray-500">Amount to be debited from Wallet</p>
                        </div>
                     </div>
                     
                     <div className="bg-white p-4 rounded-xl border border-green-100 flex items-center justify-between">
                         <span className="font-bold text-gray-500">Total Amount</span>
                         <span className="text-2xl font-bold text-green-700">₹ {fundingAmount}</span>
                     </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                    <input type="checkbox" className="w-5 h-5 text-yellow-600 rounded mt-0.5" defaultChecked />
                    <span className="text-xs text-yellow-800 font-medium leading-relaxed">
                        I confirm that details are verified and customer has consented to E-Sign via Face Auth.
                    </span>
                </div>

            </div>

            <div className="p-4 bg-white border-t">
                <button 
                    onClick={handleProceedToESign} 
                    className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
                >
                   Proceed to E-Sign <ScanFace size={20} />
                </button>
            </div>
        </div>
      );
  }

  // --- STEP 4: E-SIGN (FACE AUTH) ---
  if(step === 4) {
    return (
        <div className="h-full bg-gray-50 flex flex-col animate-slide-up">
            <div className="bg-white px-4 py-3 border-b flex items-center gap-3">
                <button onClick={() => setStep(3)} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={20} /></button>
                <div className="flex-1">
                    <h2 className="font-bold text-gray-800">E-Sign Application</h2>
                    <p className="text-xs text-gray-500">Step 4 of 5</p>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col items-center justify-center">
                
                <div className="text-center mb-10">
                    <h3 className="text-xl font-bold text-gray-900">Aadhaar Face Auth</h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">
                        Perform live face scan of <span className="font-bold text-gray-800">{fetchedData.name}</span> to digitally sign the application.
                    </p>
                </div>

                <div className="relative mb-8">
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full z-10 backdrop-blur-sm">
                            <Loader2 size={48} className="animate-spin text-rose-600"/>
                        </div>
                    )}
                    <button 
                    onClick={handleESignComplete}
                    className="w-56 h-56 bg-white border-4 border-dashed border-rose-300 rounded-full flex flex-col items-center justify-center gap-4 hover:bg-rose-50 hover:border-rose-500 transition-all shadow-xl active:scale-95 group"
                    >
                        <div className="bg-rose-100 p-5 rounded-full group-hover:bg-rose-200 transition-colors">
                            <ScanFace size={48} className="text-rose-600" />
                        </div>
                        <span className="font-bold text-rose-700 text-lg">Start Face Scan</span>
                    </button>
                </div>

                <div className="bg-blue-50 px-4 py-2 rounded-full text-xs text-blue-700 font-bold flex items-center gap-2">
                    <Lock size={12} /> Secure UIDAI Connection
                </div>
            </div>
        </div>
    );
  }

  // --- STEP 5: SUCCESS ---
  return (
    <div className="h-full bg-white flex flex-col animate-slide-up text-center pt-10">
        <div className="flex-1 px-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 shadow-sm animate-bounce-short">
                <CheckCircle2 size={40} />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Opened!</h1>
            <p className="text-gray-500 mb-8">Savings Account created successfully.</p>
            
            <div className="w-full bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4 relative">
                {/* Receipt Pattern Top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#97144d] to-[#e31e24] rounded-t-2xl"></div>

                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Customer</span>
                    <span className="font-bold text-gray-800">{fetchedData.name}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Account No.</span>
                    <span className="font-bold text-lg text-gray-900">9192 3344 5566</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">IFSC</span>
                    <span className="font-mono font-bold text-gray-800">UTIB0000123</span>
                </div>
                 <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                    <span className="text-sm text-gray-500">Initial Deposit</span>
                    <span className="font-bold text-green-600">₹ {fundingAmount}.00</span>
                </div>
            </div>
            
            <div className="mt-6 flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                <Lock size={12} /> SMS with details sent to customer
            </div>

            <div className="mt-8 flex gap-4 w-full">
                <button className="flex-1 bg-[#25D366] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm">
                    <Share2 size={18} /> Receipt
                </button>
                <button onClick={onComplete} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200">
                    <Home size={18} /> Home
                </button>
            </div>
        </div>
    </div>
  );
};

export default CASAJourney;
