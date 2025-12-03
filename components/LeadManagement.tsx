import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Phone, MapPin, Upload, AlertCircle, CheckCircle2, MoreVertical, FileText, X, User } from 'lucide-react';
import { LeadStatus, AppView } from '../types';

interface Props {
  leads: LeadStatus[];
  onBack: () => void;
  onAction: (action: AppView, lead: LeadStatus) => void;
}

const LeadManagement: React.FC<Props> = ({ leads, onBack, onAction }) => {
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'DISBURSED': return 'bg-green-100 text-green-700 border-green-200';
      case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200';
      case 'ACTION_REQUIRED': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lead.leadId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActionBtn = (lead: LeadStatus) => {
    if (lead.status === 'ACTION_REQUIRED') {
       return (
         <button 
           onClick={() => onAction(AppView.ACTION_UPLOAD_DOCS, lead)}
           className="flex-1 bg-orange-50 text-orange-700 py-2 rounded-lg text-xs font-bold border border-orange-100 flex items-center justify-center gap-1 active:scale-95 transition-transform"
         >
           <Upload size={14} /> {lead.actionRequired?.includes('ITR') ? 'Upload ITR' : 'Upload Docs'}
         </button>
       );
    }
    if (lead.status === 'REJECTED') {
       return (
         <button 
            onClick={() => onAction(AppView.ACTION_SUGGEST_GOLD, lead)}
            className="flex-1 bg-rose-50 text-rose-700 py-2 rounded-lg text-xs font-bold border border-rose-100 flex items-center justify-center gap-1 active:scale-95 transition-transform"
         >
           <AlertCircle size={14} /> Suggest Gold Loan
         </button>
       );
    }
    if (lead.status === 'DISBURSED') {
       return (
         <button 
            onClick={() => onAction(AppView.ACTION_VIEW_RECEIPT, lead)}
            className="flex-1 bg-green-50 text-green-700 py-2 rounded-lg text-xs font-bold border border-green-100 flex items-center justify-center gap-1 active:scale-95 transition-transform"
         >
           <FileText size={14} /> View Receipt
         </button>
       );
    }
    return (
       <button 
          onClick={() => onAction(AppView.ACTION_CALL_RM, lead)}
          className="flex-1 bg-gray-50 text-gray-600 py-2 rounded-lg text-xs font-bold border border-gray-200 flex items-center justify-center gap-1 active:scale-95 transition-transform"
       >
           <Phone size={14} /> Call RM
       </button>
    );
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#97144d] to-[#e31e24] p-4 pt-6 text-white shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-1 hover:bg-white/20 rounded-full">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">My Leads</h2>
          <div className="ml-auto bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
             Total: {leads.length}
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
           <input 
             type="text" 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             placeholder="Search by Name or Lead ID..." 
             className="w-full pl-10 pr-4 py-3 bg-white text-gray-800 rounded-xl text-sm focus:outline-none shadow-sm"
           />
           <Search size={18} className="absolute left-3 top-3 text-gray-400" />
           <div className="absolute right-3 top-2 bg-gray-100 p-1 rounded-lg">
             <Filter size={16} className="text-gray-500" />
           </div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-10 opacity-50">
            <Search size={48} className="mx-auto mb-2 text-gray-400" />
            <p>No leads found.</p>
          </div>
        ) : filteredLeads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 transition-all">
             
             {/* Card Header */}
             <div className="flex justify-between items-start mb-3">
                <div>
                   <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{lead.customerName}</span>
                      <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{lead.leadId}</span>
                   </div>
                   <p className="text-xs text-rose-600 font-medium">{lead.productName} • {lead.amount}</p>
                </div>
                <div className={`text-[10px] font-bold px-2 py-1 rounded border ${getStatusColor(lead.status)}`}>
                   {lead.status.replace('_', ' ')}
                </div>
             </div>

             {/* Branch Mapping Info */}
             <div className="bg-gray-50 p-2 rounded-lg mb-3 flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-2">
                   <div className="bg-white p-1 rounded-full border border-gray-200">
                      <MapPin size={12} className="text-gray-400" />
                   </div>
                   <div className="text-xs">
                      <p className="text-gray-500">Mapped Branch</p>
                      <p className="font-semibold text-gray-700">{lead.branchName || 'Axis Bank'}</p>
                   </div>
                </div>
                {lead.branchManager && (
                   <div className="text-right text-xs">
                      <p className="text-gray-500">Manager</p>
                      <div className="flex items-center justify-end gap-1">
                         <p className="font-semibold text-gray-700">{lead.branchManager}</p>
                      </div>
                      <div className="flex items-center justify-end gap-1 text-gray-600 mt-0.5">
                         <Phone size={10} className="text-gray-400" /> 
                         <span className="font-mono text-[10px]">{lead.managerPhone || '+91 98XXX XXXXX'}</span>
                      </div>
                   </div>
                )}
             </div>
             
             {/* Action Row */}
             <div className="flex gap-3 relative">
                {getActionBtn(lead)}
                <button 
                  onClick={() => setExpandedLeadId(expandedLeadId === lead.id ? null : lead.id)}
                  className={`w-10 flex items-center justify-center rounded-lg border transition-colors ${expandedLeadId === lead.id ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'}`}
                >
                   {expandedLeadId === lead.id ? <X size={16} /> : <MoreVertical size={16} />}
                </button>
             </div>

             {/* Expanded Customer Details */}
             {expandedLeadId === lead.id && (
                <div className="mt-3 pt-3 border-t border-gray-100 animate-slide-down">
                   <div className="bg-blue-50/50 p-3 rounded-lg flex justify-between items-center border border-blue-100">
                       <div>
                          <p className="text-[10px] uppercase font-bold text-gray-500">Customer Contact</p>
                          <div className="flex items-center gap-2 mt-1">
                             <User size={14} className="text-gray-400"/>
                             <span className="font-bold text-gray-800 text-sm">{lead.customerPhone || '+91 90000 00000'}</span>
                          </div>
                       </div>
                       <button className="bg-white text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-transform hover:bg-blue-50">
                          <Phone size={12} /> Call Customer
                       </button>
                   </div>
                </div>
             )}

             {/* Error Message if any */}
             {lead.actionRequired && !expandedLeadId && (
                <div className="mt-2 text-[10px] text-red-500 flex items-center gap-1 font-medium">
                   <AlertCircle size={10} /> {lead.actionRequired}
                </div>
             )}
          </div>
        ))}

        <div className="text-center py-6">
           <p className="text-xs text-gray-400">End of list</p>
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;