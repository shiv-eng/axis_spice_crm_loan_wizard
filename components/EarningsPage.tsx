
import React from 'react';
import { ArrowLeft, Wallet, TrendingUp, Bell, CheckCircle2, Coins, ArrowRight, UserPlus, FileText, BadgeIndianRupee, RefreshCw, Layers } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const EarningsPage: React.FC<Props> = ({ onBack }) => {
  // Stats Data
  const stats = [
    {
      id: 'accounts',
      title: 'Savings Accounts',
      count: 12,
      subtext: 'Accounts Opened',
      commission: '₹ 1,800',
      icon: UserPlus,
      color: 'bg-blue-100 text-blue-600',
      trend: '+4 this week'
    },
    {
      id: 'submitted',
      title: 'Loans Submitted',
      count: 8,
      subtext: 'Applications',
      commission: '-',
      commissionLabel: 'Potential: ₹4,500',
      icon: FileText,
      color: 'bg-yellow-100 text-yellow-600',
      trend: '3 Under Review'
    },
    {
      id: 'disbursed',
      title: 'Loans Disbursed',
      count: 3,
      subtext: 'Vol: ₹15,00,000', // Total volume
      commission: '₹ 7,500',
      icon: BadgeIndianRupee,
      color: 'bg-green-100 text-green-600',
      trend: 'Avg: ₹5L / loan'
    },
    {
      id: 'services',
      title: 'Re-KYC & Services',
      count: 25,
      subtext: 'Service Requests',
      commission: '₹ 250',
      icon: RefreshCw,
      color: 'bg-purple-100 text-purple-600',
      trend: 'High Activity'
    }
  ];

  const totalEarnings = "9,550"; // 1800 + 7500 + 250

  return (
    <div className="h-full bg-gray-50 flex flex-col animate-slide-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#97144d] to-[#e31e24] p-4 pt-6 text-white shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="p-1 hover:bg-white/20 rounded-full">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">Earnings Dashboard</h2>
        </div>

        {/* Hero Card */}
        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Wallet size={64} className="text-white" />
             </div>
             
             <p className="text-sm opacity-80 mb-1">Total Earnings (This Month)</p>
             <div className="flex items-end gap-3 mb-2">
                 <h1 className="text-4xl font-bold">₹ {totalEarnings}</h1>
                 <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-md mb-2 flex items-center gap-1">
                    <TrendingUp size={12} /> +18%
                 </span>
             </div>
             <p className="text-xs opacity-70">Updated just now</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-12">
        
        {/* Alerts Section */}
        <div>
           <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
               <Bell size={16} /> Insight
           </h3>
           <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-start gap-3">
               <div className="bg-blue-100 p-2 rounded-full mt-1">
                   <Coins size={16} className="text-blue-600" />
               </div>
               <div>
                   <h4 className="font-bold text-gray-800 text-sm">Target Achieved! 🎯</h4>
                   <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                       You have disbursed <span className="font-bold text-gray-800">₹15 Lakhs</span> in loans this month.
                   </p>
               </div>
           </div>
        </div>

        {/* Performance Breakdown */}
        <div>
           <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <Layers size={16} /> Performance Breakdown
              </h3>
              <span className="text-xs text-rose-600 font-bold">October 2024</span>
           </div>

           <div className="space-y-3">
               {stats.map(item => (
                   <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between transition-transform active:scale-[0.99]">
                       <div className="flex items-center gap-4">
                           <div className={`p-3 rounded-full ${item.color}`}>
                               <item.icon size={20} />
                           </div>
                           <div>
                               <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                               <div className="flex flex-col">
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs font-bold text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">{item.count}</span>
                                    <span className="text-xs text-gray-500">{item.subtext}</span>
                                  </div>
                               </div>
                           </div>
                       </div>
                       <div className="text-right">
                           {item.commission !== '-' ? (
                             <p className="font-bold text-green-600 text-sm">{item.commission}</p>
                           ) : (
                             <p className="font-bold text-gray-400 text-sm">-</p>
                           )}
                           
                           {item.commissionLabel ? (
                              <p className="text-[10px] text-orange-500 font-medium">{item.commissionLabel}</p>
                           ) : (
                              <p className="text-[10px] text-gray-400">Commission</p>
                           )}
                       </div>
                   </div>
               ))}
           </div>
        </div>

        {/* Footer CTA */}
        <button className="w-full text-center text-xs text-rose-600 font-bold mt-4 flex items-center justify-center gap-1 opacity-80">
            View Detailed Ledger <ArrowRight size={12} />
        </button>

      </div>
    </div>
  );
};

export default EarningsPage;
