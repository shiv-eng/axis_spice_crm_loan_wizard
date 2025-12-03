import React, { useState } from 'react';
import { LoanProduct } from '../types';
import { PRODUCTS } from '../constants';
import { MessageSquare, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, RefreshCcw } from 'lucide-react';

interface Props {
  onSelectProduct: (product: LoanProduct) => void;
}

// Type for the Decision Node
type DecisionNode = {
  question: string;
  options: {
    label: string;
    value: string;
    icon?: string;
    next?: DecisionNode; // Recursive for next question
    result?: {
      primary: string; // Product ID
      secondary: string; // Product ID
      reason: string;
    };
  }[];
};

const ConceptC_SmartWizard: React.FC<Props> = ({ onSelectProduct }) => {
  const [history, setHistory] = useState<DecisionNode[]>([]);
  const [currentNode, setCurrentNode] = useState<DecisionNode | null>(null);
  const [result, setResult] = useState<{ primary: string; secondary: string; reason: string } | null>(null);

  // --- THE DECISION TREE LOGIC (Based on Excel Screenshot) ---
  
  // 4. Agri Branch Logic
  const agriNode: DecisionNode = {
    question: "Do they own Agricultural Land?",
    options: [
      {
        label: "Yes, Owns Agri Land",
        value: "land_owner",
        icon: "🌱",
        next: {
          question: "What is the purpose?",
          options: [
            {
              label: "Buy Equipment",
              value: "equipment",
              next: {
                question: "Which Asset?",
                options: [
                  { label: "Tractor / Harvester", value: "tractor", result: { primary: 'tractor-loan', secondary: 'kcc', reason: "Asset Purchase" } },
                  { label: "Cattle / Livestock", value: "cattle", result: { primary: 'tractor-loan', secondary: 'kcc', reason: "Livestock Finance" } } // Mapped Cattle to Tractor category for demo
                ]
              }
            },
            {
              label: "Crop Cultivation",
              value: "crop",
              next: {
                question: "Existing KCC Loan?",
                options: [
                  { label: "No Existing KCC", value: "no_kcc", result: { primary: 'kcc', secondary: 'gold-loan', reason: "New KCC" } },
                  { label: "Yes, Has KCC", value: "yes_kcc", result: { primary: 'kcc', secondary: 'gold-loan', reason: "KCC Top-up" } }
                ]
              }
            }
          ]
        }
      },
      {
        label: "No Land",
        value: "no_land",
        icon: "🏠",
        next: {
            question: "Purpose?",
            options: [
                { label: "Poultry / Dairy Shed", value: "shed", result: { primary: 'business-loan', secondary: 'gold-loan', reason: "Allied Agri Business" } }
            ]
        }
      }
    ]
  };

  // 3. Business Branch Logic
  const businessNode: DecisionNode = {
    question: "Do they have GST or ITR Documents?",
    options: [
      {
        label: "Yes, Has GST / ITR",
        value: "has_docs",
        icon: "📄",
        next: {
          question: "Do they own Property/Collateral?",
          options: [
            {
              label: "Owns Commercial Property",
              value: "comm_prop",
              next: {
                question: "Annual Turnover Size?",
                options: [
                  { label: "> ₹50 Lakhs", value: "gt_50", result: { primary: 'secured-term-loan', secondary: 'cash-credit', reason: "High Turnover Secured" } },
                  { label: "< ₹50 Lakhs", value: "lt_50", result: { primary: 'gst-od', secondary: 'business-loan', reason: "Small Biz Secured" } }
                ]
              }
            },
            {
              label: "No Property",
              value: "no_prop",
              result: { primary: 'gst-od', secondary: 'business-loan', reason: "Unsecured Business Loan" }
            }
          ]
        }
      },
      {
        label: "No Formal Papers",
        value: "no_docs",
        icon: "❌",
        next: {
          question: "Do they own House or Shop?",
          options: [
            { label: "Owns House / Shop", value: "owns_house", result: { primary: 'lap', secondary: 'gold-loan', reason: "Loan Against Property" } },
            { 
                label: "No Property", 
                value: "no_prop_2",
                next: {
                    question: "Transaction Type?",
                    options: [
                        { label: "Daily Transactor", value: "daily", result: { primary: 'business-loan', secondary: 'gold-loan', reason: "Micro Finance" } },
                        { label: "Dairy / Poultry", value: "agri_allied", result: { primary: 'kcc', secondary: 'tractor-loan', reason: "Agri Allied" } }
                    ]
                }
            }
          ]
        }
      }
    ]
  };

  // 2. Buy Asset Branch Logic
  const assetNode: DecisionNode = {
    question: "What type of Asset?",
    options: [
      {
        label: "Vehicle",
        value: "vehicle",
        icon: "🚗",
        next: {
          question: "Usage Type?",
          options: [
            {
              label: "Commercial (Yellow Plate)",
              value: "commercial",
              result: { primary: 'cv-loan', secondary: 'business-loan', reason: "CV/CE Finance" }
            },
            {
              label: "Personal Use",
              value: "personal",
              next: {
                question: "Vehicle Type?",
                options: [
                  { label: "Car (4-Wheeler)", value: "car", result: { primary: 'auto-loan', secondary: 'personal-loan', reason: "Car Loan" } },
                  { label: "Bike (2-Wheeler)", value: "bike", result: { primary: 'two-wheeler', secondary: 'personal-loan', reason: "Two Wheeler" } }
                ]
              }
            }
          ]
        }
      },
      {
        label: "House",
        value: "house",
        icon: "🏠",
        next: {
          question: "Income Profile?",
          options: [
            { label: "Rural / Low Income", value: "rural", result: { primary: 'asha-home-loan', secondary: 'lap', reason: "Affordable Housing" } },
            { label: "Urban / Salaried", value: "urban", result: { primary: 'home-loan', secondary: 'lap', reason: "Standard Home Loan" } }
          ]
        }
      }
    ]
  };

  // 1. Root: Personal Expense Branch Logic (And Main Entry)
  const rootNode: DecisionNode = {
    question: "Layer 1: What is the Customer's Primary Need?",
    options: [
      {
        label: "Personal Expense",
        value: "personal_expense",
        icon: "💰",
        next: {
          question: "Layer 2: Do they have Gold Jewelry?",
          options: [
            { label: "Yes, Has Gold", value: "has_gold", icon: "💍", result: { primary: 'gold-loan', secondary: 'personal-loan', reason: "Instant Gold Loan" } },
            {
              label: "No Gold",
              value: "no_gold",
              icon: "🚫",
              next: {
                question: "Layer 3: Occupation?",
                options: [
                  {
                    label: "Salaried",
                    value: "salaried",
                    next: {
                      question: "Layer 4: Income Proof?",
                      options: [
                        { label: "Salary Slip Available", value: "slip", result: { primary: 'personal-loan', secondary: 'gold-loan', reason: "Standard PL" } },
                        { label: "Cash Salary / No Slip", value: "cash", result: { primary: 'business-loan', secondary: 'gold-loan', reason: "Micro/Small Loan" } } // Mapped Micro to Business/Personal
                      ]
                    }
                  },
                  {
                    label: "Self-Employed",
                    value: "self",
                    next: {
                        question: "Layer 4: Work Setup?",
                        options: [
                             { label: "Owns Shop/Office", value: "shop", result: { primary: 'business-loan', secondary: 'lap', reason: "Business Expansion" } },
                        ]
                    }
                  },
                  { label: "Student", value: "student", result: { primary: 'education-loan', secondary: 'gold-loan', reason: "Student Finance" } }
                ]
              }
            }
          ]
        }
      },
      { label: "Business Growth", value: "business", icon: "📈", next: businessNode },
      { label: "Agri / Farming", value: "agri", icon: "🚜", next: agriNode },
      { label: "Buy Asset", value: "asset", icon: "🏠", next: assetNode }
    ]
  };

  // Initialize
  if (!currentNode && !result) {
    setCurrentNode(rootNode);
  }

  const handleOptionSelect = (option: typeof rootNode.options[0]) => {
    // Add to history
    if(currentNode) setHistory([...history, currentNode]);

    if (option.result) {
      setResult(option.result);
      setCurrentNode(null);
    } else if (option.next) {
      setCurrentNode(option.next);
    }
  };

  const handleReset = () => {
    setCurrentNode(rootNode);
    setResult(null);
    setHistory([]);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prevNode = history[history.length - 1];
      setCurrentNode(prevNode);
      setHistory(history.slice(0, -1));
      setResult(null);
    }
  };

  // --- RENDER RESULT ---
  if (result) {
    const primaryProduct = PRODUCTS[result.primary] || PRODUCTS['personal-loan'];
    const secondaryProduct = PRODUCTS[result.secondary] || PRODUCTS['gold-loan'];

    return (
      <div className="h-full p-4 flex flex-col animate-slide-up pb-24">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 shadow-sm animate-bounce-short">
             <Sparkles size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Recommendation Ready!</h2>
          <p className="text-sm text-gray-500">Based on customer profile: <span className="font-medium text-gray-800">{result.reason}</span></p>
        </div>

        <div className="space-y-4">
          {/* Primary Recommendation */}
          <div className="relative">
             <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm z-10">
                BEST MATCH
             </div>
             <div className="bg-white p-5 rounded-2xl border-2 border-rose-500 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <primaryProduct.icon size={100} />
                </div>
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${primaryProduct.color.replace('text-', 'bg-').replace('50', '100')} text-rose-700`}>
                        <primaryProduct.icon size={32} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{primaryProduct.name}</h3>
                        <p className="text-xs text-gray-500 mb-2">Max Limit: {primaryProduct.maxAmount}</p>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                            Earn {primaryProduct.commission}
                        </span>
                    </div>
                </div>
                <button 
                    onClick={() => onSelectProduct(primaryProduct)}
                    className="w-full mt-5 bg-rose-600 text-white py-3 rounded-xl font-bold shadow-md hover:bg-rose-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    Select Primary Option <ArrowRight size={18} />
                </button>
             </div>
          </div>

          {/* Secondary Recommendation */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm opacity-90">
                <div className="flex items-center justify-between mb-3">
                     <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Alternative Option</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gray-100 text-gray-600`}>
                        <secondaryProduct.icon size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800">{secondaryProduct.name}</h4>
                        <p className="text-xs text-gray-500">{secondaryProduct.interestRate} Interest</p>
                    </div>
                </div>
                <button 
                    onClick={() => onSelectProduct(secondaryProduct)}
                    className="w-full py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    Select Alternative
                </button>
          </div>
        </div>

        <button onClick={handleReset} className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-sm hover:text-gray-600">
            <RefreshCcw size={14} /> Start Over
        </button>
      </div>
    );
  }

  // --- RENDER QUESTION ---
  return (
    <div className="h-full p-4 flex flex-col animate-fade-in pb-24">
      {/* Header / Progress */}
      <div className="mb-6 flex items-center justify-between">
         {history.length > 0 ? (
             <button onClick={handleBack} className="text-gray-500 hover:text-gray-800 flex items-center gap-1 text-sm font-medium">
                <ArrowLeft size={16} /> Back
             </button>
         ) : (
             <span className="text-gray-400 text-sm font-medium">Step 1</span>
         )}
         <div className="flex gap-1">
            {[0,1,2,3].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full ${i <= history.length ? 'bg-rose-600' : 'bg-gray-200'}`}></div>
            ))}
         </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
            <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-600">
               <MessageSquare size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                {currentNode?.question}
            </h2>
        </div>

        <div className="space-y-3">
            {currentNode?.options.map((opt, idx) => (
                <button
                    key={idx}
                    onClick={() => handleOptionSelect(opt)}
                    className="w-full bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-rose-500 hover:shadow-md hover:bg-rose-50 transition-all group text-left flex items-center gap-4"
                >
                    {opt.icon && <span className="text-2xl">{opt.icon}</span>}
                    <span className="font-bold text-gray-700 text-lg group-hover:text-rose-700 flex-1">{opt.label}</span>
                    <ArrowRight size={20} className="text-gray-300 group-hover:text-rose-600 opacity-50 group-hover:opacity-100" />
                </button>
            ))}
        </div>
      </div>

    </div>
  );
};

export default ConceptC_SmartWizard;