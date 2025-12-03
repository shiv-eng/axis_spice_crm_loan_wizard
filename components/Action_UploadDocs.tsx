import React, { useState } from 'react';
import { ArrowLeft, UploadCloud, FileText, Check, X } from 'lucide-react';
import { LeadStatus } from '../types';

interface Props {
  lead: LeadStatus;
  onBack: () => void;
  onComplete: () => void;
}

const Action_UploadDocs: React.FC<Props> = ({ lead, onBack, onComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const docType = lead.actionRequired?.includes('ITR') ? 'ITR / Income Proof' : 'Required Document';

  return (
    <div className="h-full bg-gray-50 flex flex-col animate-slide-up">
       {/* Header */}
      <div className="bg-white px-4 py-3 border-b flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="font-bold text-gray-800">Upload Documents</h2>
          <p className="text-xs text-gray-500">Resolve Action Required</p>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col items-center">
         
         <div className="w-full bg-orange-50 border border-orange-100 p-4 rounded-xl mb-8">
            <h3 className="text-orange-800 font-bold text-sm mb-1">Action Required from Bank</h3>
            <p className="text-orange-700 text-xs">"{lead.actionRequired}"</p>
         </div>

         {/* Upload Zone */}
         <div className="w-full aspect-[4/3] border-2 border-dashed border-gray-300 rounded-2xl bg-white flex flex-col items-center justify-center p-6 relative">
            <input 
              type="file" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            {!file ? (
              <>
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-500">
                   <UploadCloud size={32} />
                </div>
                <p className="font-bold text-gray-700">Tap to Upload {docType}</p>
                <p className="text-xs text-gray-400 mt-2">PDF, JPG or PNG (Max 5MB)</p>
              </>
            ) : (
              <div className="text-center">
                 <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-500 mx-auto">
                   <FileText size={32} />
                </div>
                <p className="font-bold text-gray-800 truncate max-w-[200px]">{file.name}</p>
                <button 
                  onClick={(e) => { e.preventDefault(); setFile(null); }}
                  className="text-xs text-red-500 font-bold mt-2 flex items-center justify-center gap-1"
                >
                   <X size={12} /> Remove
                </button>
              </div>
            )}
         </div>

      </div>

      <div className="p-4 bg-white border-t">
        <button 
          onClick={handleUpload}
          disabled={!file || loading}
          className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 ${loading ? 'bg-gray-300 text-gray-500' : 'bg-gradient-to-r from-[#97144d] to-[#e31e24] text-white'}`}
        >
          {loading ? 'Uploading...' : 'Submit Document'}
          {!loading && <Check size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Action_UploadDocs;