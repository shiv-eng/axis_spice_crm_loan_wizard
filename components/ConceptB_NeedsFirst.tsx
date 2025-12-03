import React from 'react';
import { LoanProduct } from '../types';
import { PRODUCTS } from '../constants';
import { Landmark, TrendingUp, Shield, MoreHorizontal, ChevronRight } from 'lucide-react';

interface Props {
  onSelectProduct: (product: LoanProduct) => void;
}

const ConceptB_NeedsFirst: React.FC<Props> = ({ onSelectProduct }) => {
  const categories = [
    {
      id: 'save',
      title: 'Save Money',
      subtitle: 'Accounts & Deposits',
      icon: Landmark,
      color: 'bg-blue-500',
      items: ['Savings Account', 'Fixed Deposit', 'Recurring Deposit']
    },
    {
      id: 'grow',
      title: 'Grow Business',
      subtitle: 'Business Loans & CC',
      icon: TrendingUp,
      color: 'bg-rose-600',
      items: ['Business Loan', 'MSME Loan', 'Cash Credit'],
      products: [PRODUCTS['business-loan'], PRODUCTS['tractor-loan']]
    },
    {
      id: 'personal',
      title: 'Personal Needs',
      subtitle: 'Loans for you',
      icon: Shield,
      color: 'bg-emerald-500',
      items: ['Personal Loan', 'Gold Loan', 'Home Loan'],
      products: [PRODUCTS['personal-loan'], PRODUCTS['gold-loan'], PRODUCTS['home-loan']]
    },
    {
      id: 'support',
      title: 'Service & Support',
      subtitle: 'Status & Updates',
      icon: MoreHorizontal,
      color: 'bg-orange-500',
      items: ['Check Status', 'Re-KYC', 'Update PAN']
    }
  ];

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-gray-800">Banking Services</h2>
        <p className="text-sm text-gray-500">Select a category to proceed</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-48 justify-between relative overflow-hidden group cursor-pointer">
            {/* Decorative Circle */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 ${cat.color}`}></div>
            
            <div className={`${cat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md mb-2`}>
              <cat.icon size={24} />
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 leading-tight mb-1">{cat.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{cat.subtitle}</p>
              
              {/* Mini List for quick context */}
              <ul className="space-y-1">
                {cat.products ? (
                  cat.products.slice(0, 2).map(p => (
                    <li 
                      key={p.id}
                      onClick={(e) => { e.stopPropagation(); onSelectProduct(p); }}
                      className="text-xs text-gray-700 bg-gray-50 px-2 py-1.5 rounded-md flex items-center justify-between hover:bg-rose-50 hover:text-rose-700 transition-colors"
                    >
                      {p.name}
                      <ChevronRight size={10} />
                    </li>
                  ))
                ) : (
                  cat.items.slice(0, 2).map((item, idx) => (
                     <li key={idx} className="text-xs text-gray-400 px-2 py-1">{item}</li>
                  ))
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConceptB_NeedsFirst;