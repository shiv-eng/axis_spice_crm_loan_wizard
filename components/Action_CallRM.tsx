import React from 'react';
import { ArrowLeft, Phone, User, MapPin, Mail, Clock } from 'lucide-react';
import { LeadStatus } from '../types';

interface Props {
  lead: LeadStatus;
  onBack: () => void;
}

const Action_CallRM: React.FC<Props> = ({ lead, onBack }) => {
  return (
    <div className="h-full bg-gray-50 flex flex-col animate-slide-up">
      {/* Background Header */}
      <div className="h-40 bg-gradient-to-r from-[#97144d] to-[#e31e24] relative">
         <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30">
           <ArrowLeft size={20} />
         </button>
         <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
             <div className="w-24 h-24 bg-white p-1 rounded-full shadow-lg">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                   <User size={40} className="text-gray-400" />
                </div>
             </div>
         </div>
      </div>

      <div className="mt-12 text-center px-4">
         <h2 className="text-xl font-bold text-gray-900">{lead.branchManager || 'Bank Officer'}</h2>
         <p className="text-sm text-gray-500">Relationship Manager • Axis Bank</p>
         
         <div className="flex items-center justify-center gap-2 mt-2 bg-gray-100 py-1 px-3 rounded-full inline-flex mx-auto">
             <MapPin size={12} className="text-gray-400" />
             <span className="text-xs font-medium text-gray-600">{lead.branchName || 'Local Branch'}</span>
         </div>
      </div>

      <div className="p-6 space-y-4 mt-4">
         <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="bg-green-50 p-2 rounded-full text-green-600">
                  <Phone size={20} />
               </div>
               <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Mobile</p>
                  <p className="font-medium text-gray-800">+91 98XXX X1234</p>
               </div>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-green-600 transition-colors">
               Call
            </button>
         </div>

         <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                  <Mail size={20} />
               </div>
               <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
                  <p className="font-medium text-gray-800">rm.branch@axisbank.com</p>
               </div>
            </div>
         </div>

         <div className="bg-white p-4 rounded-xl border border-gray-200">
             <div className="flex items-center gap-2 mb-2">
               <Clock size={16} className="text-gray-400" />
               <span className="font-bold text-gray-800 text-sm">Working Hours</span>
             </div>
             <p className="text-xs text-gray-500 ml-6">
                Mon - Sat: 10:00 AM - 5:00 PM <br/>
                (Lunch: 2:00 PM - 2:30 PM)
             </p>
         </div>
      </div>
      
      <div className="mt-auto p-6 text-center">
         <p className="text-xs text-gray-400">
            Reference Lead ID <span className="font-mono text-gray-600">{lead.leadId}</span> when calling.
         </p>
      </div>
    </div>
  );
};

export default Action_CallRM;