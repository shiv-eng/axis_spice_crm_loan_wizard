import React, { useState } from 'react';
import { Search, UserCheck, ArrowRight, Star, AlertCircle, Clock, CheckCircle2, XCircle, ChevronRight, LayoutGrid, ArrowLeft } from 'lucide-react';
import { MOCK_CUSTOMERS, PRODUCTS } from '../constants';
import { CustomerProfile, LoanProduct } from '../types';

interface Props {
  onSelectProduct: (product: LoanProduct, customer?: CustomerProfile) => void;
  onOpenAccount?: (mobile: string) => void;
}

const ConceptA_Customer360: React.FC<Props> = ({ onSelectProduct, onOpenAccount }) => {
  const [mobile, setMobile] = useState('');
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [showProductList, setShowProductList] = useState(false);

  const handleSearch = () => {
    if (MOCK_CUSTOMERS[mobile as keyof typeof MOCK_CUSTOMERS]) {
      setProfile(MOCK_CUSTOMERS[mobile as keyof typeof MOCK_CUSTOMERS] as any);
      setNotFound(false);
      setShowProductList(false);
    } else {
      setProfile(null);
      setNotFound(true);
      setShowProductList(false);
    }
  };

  const handleApplyClick = () => {
    setShowProductList(true);
  };

  const handleAccountClick = () => {
      if(onOpenAccount) onOpenAccount(mobile);
  };

  const handleProductSelect = (product: LoanProduct) => {
    // Create a temporary "New Customer" profile if one doesn't exist
    const customerProfile = profile || { 
        mobile: mobile || '', 
        name: 'New Customer', 
        isExisting: false, 
        segment: 'New' 
    };
    onSelectProduct(product, customerProfile as CustomerProfile);
  };

  // Group products by category for the display list
  const productCategories = {
    'Vehicles & Transport': [PRODUCTS['auto-loan'], PRODUCTS['two-wheeler'], PRODUCTS['tractor-loan'], PRODUCTS['cv-loan']],
    'Personal & Education': [PRODUCTS['personal-loan'], PRODUCTS['education-loan'], PRODUCTS['gold-loan']],
    'Home & Property': [PRODUCTS['home-loan'], PRODUCTS['asha-home-loan'], PRODUCTS['lap']],
    'Business & SME': [PRODUCTS['business-loan'], PRODUCTS['secured-term-loan'], PRODUCTS['cash-credit'], PRODUCTS['gst-od'], PRODUCTS['od-property']]
  };

  if (showProductList) {
    return (
      <div className="p-4 space-y-4 animate-slide-up pb-20">
        <div className="flex items-center gap-2 mb-2">
            <button onClick={() => setShowProductList(false)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-600">
                <ArrowLeft size={20} />
            </button>
            <div>
                <h2 className="text-xl font-bold text-gray-800">Select Loan Product</h2>
                <p className="text-xs text-gray-500">Choose the best option for the customer</p>
            </div>
        </div>

        <div className="space-y-6">
            {Object.entries(productCategories).map(([category, items]) => (
                <div key={category}>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 ml-1">{category}</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {items.map((prod) => (
                            <button 
                                key={prod.id}
                                onClick={() => handleProductSelect(prod)}
                                className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:border-rose-500 hover:shadow-md transition-all text-left flex flex-col items-start gap-2 h-full"
                            >
                                <div className={`p-2 rounded-lg ${prod.color.replace('text-', 'bg-').replace('50', '100')} ${prod.color}`}>
                                    <prod.icon size={20} />
                                </div>
                                <div>
                                    <span className="font-bold text-gray-800 text-sm leading-tight block mb-1">{prod.name}</span>
                                    {prod.category === 'Agri' || prod.category === 'Business' ? 
                                        <span className="text-[10px] text-gray-500 block">For Business Growth</span> :
                                        <span className="text-[10px] text-gray-500 block">Max: {prod.maxAmount}</span>
                                    }
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 animate-fade-in pb-20">
      {/* Hero Search Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Hello Adhikari ji, Whom are you helping today?</h2>
        <p className="text-sm text-gray-500">Enter mobile number to see if customer has existing relationship with Axis Bank or not</p>
        
        <div className="relative">
          <input 
            type="tel" 
            maxLength={10}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="98765 43210"
            className="w-full pl-4 pr-12 py-4 text-lg font-medium text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-rose-600 focus:ring-0 outline-none transition-all"
          />
          <button 
            onClick={handleSearch}
            className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-[#97144d] to-[#e31e24] text-white p-3 rounded-lg shadow-md active:scale-95 transition-transform"
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Result: Existing Customer */}
      {profile && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-rose-50 to-white p-5 rounded-2xl border border-rose-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-rose-100 p-2 rounded-full">
                  <UserCheck className="text-rose-700" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{profile.name}</h3>
                  <p className="text-xs text-rose-600 font-medium bg-rose-50 px-2 py-0.5 rounded-full inline-block">Existing Customer</p>
                </div>
              </div>
              {profile.cibilScore && (
                <div className="text-right">
                  <p className="text-xs text-gray-500">Credit Score</p>
                  <p className="text-lg font-bold text-green-600">{profile.cibilScore}</p>
                </div>
              )}
            </div>
            
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              Pre-Approved For You
            </h4>
            
            <div className="space-y-3">
              {profile.preApprovedOffers?.map((prod) => (
                <button 
                  key={prod.id}
                  onClick={() => onSelectProduct(prod, profile)}
                  className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-rose-500 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${prod.color} p-3 rounded-lg`}>
                      <prod.icon size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-800 group-hover:text-rose-700">{prod.name}</p>
                      <p className="text-xs text-gray-500">Up to {prod.maxAmount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md mb-1">
                      Earn {prod.commission}
                    </span>
                    <ArrowRight size={16} className="ml-auto text-gray-300 group-hover:text-rose-600" />
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Option to see other products even for existing customer */}
          <button 
            onClick={handleApplyClick}
            className="w-full py-3 text-sm text-rose-600 font-bold bg-rose-50 rounded-xl border border-rose-100 flex items-center justify-center gap-2"
          >
             <LayoutGrid size={16} /> View All Loan Products
          </button>
        </div>
      )}

      {/* Result: New Customer / Not Found */}
      {notFound && (
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-orange-600 mb-2">
            <AlertCircle size={24} />
            <h3 className="font-bold">New Customer</h3>
          </div>
          <p className="text-gray-600 text-sm">No existing profile found. What would they like to do?</p>
          
          <div className="grid grid-cols-2 gap-3">
             <button 
                onClick={handleAccountClick}
                className="p-4 bg-blue-50 rounded-xl text-blue-700 font-medium text-sm hover:bg-blue-100 transition-colors"
             >
                Open Savings Account
             </button>
             <button 
                onClick={handleApplyClick}
                className="p-4 bg-rose-50 rounded-xl text-rose-700 font-medium text-sm hover:bg-rose-100 transition-colors"
             >
                Apply for Loan
             </button>
          </div>
        </div>
      )}

      {/* --- TRACKING SECTION (The Dashboard) --- */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-bold text-gray-800">Recent Activity</h3>
          <button className="text-xs text-rose-600 font-bold">View All</button>
        </div>
        
        <div className="space-y-3">
          
          {/* Item 1: In Progress (Yellow) */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"></div>
             <div className="flex gap-3 items-center">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Clock size={18} className="text-yellow-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-800">Tractor Loan</p>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">#XYZ-9021</span>
                  </div>
                  <p className="text-xs text-gray-500">Ramesh Singh • <span className="text-yellow-600 font-medium">Applied</span></p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] text-gray-400">Potential</p>
                <p className="text-sm font-bold text-gray-800">₹3,000</p>
             </div>
          </div>

          {/* Item 2: Disbursed (Green) */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
             <div className="flex gap-3 items-center">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle2 size={18} className="text-green-600" />
                </div>
                <div>
                   <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-800">Gold Loan</p>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">#ABC-1122</span>
                  </div>
                  <p className="text-xs text-gray-500">Sita Devi • <span className="text-green-600 font-medium">Disbursed</span></p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] text-gray-400">Earned</p>
                <p className="text-sm font-bold text-green-600">+ ₹500</p>
             </div>
          </div>

          {/* Item 3: Rejected (Red) */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between relative overflow-hidden opacity-80">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>
             <div className="flex gap-3 items-center">
                <div className="bg-rose-100 p-2 rounded-full">
                  <XCircle size={18} className="text-rose-600" />
                </div>
                <div>
                   <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-800">Personal Loan</p>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">#REJ-3344</span>
                  </div>
                  <p className="text-xs text-gray-500">Amit Kumar • <span className="text-rose-600 font-medium">Rejected</span></p>
                </div>
             </div>
             <div className="text-right">
                <button className="text-[10px] bg-rose-50 text-rose-700 px-2 py-1 rounded border border-rose-100 font-bold flex items-center gap-1">
                   Retry <ChevronRight size={8} />
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConceptA_Customer360;