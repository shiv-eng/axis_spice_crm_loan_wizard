import { 
  Tractor, 
  Briefcase, 
  User, 
  Coins, 
  Home, 
  Landmark, 
  GraduationCap,
  Sprout,
  Truck,
  Car,
  Bike,
  Building,
  ShieldCheck,
  Store,
  Banknote
} from 'lucide-react';
import { LoanProduct, LoanJourneyConfig, LeadStatus } from './types';

// --- Branding Colors ---
export const COLORS = {
  axisMaroon: '#97144d',
  spiceRed: '#e31e24',
  bgGradient: 'from-[#97144d] to-[#e31e24]',
};

// --- Products ---
export const PRODUCTS: Record<string, LoanProduct> = {
  // --- Personal Category ---
  'personal-loan': {
    id: 'personal-loan',
    name: 'Personal Loan',
    category: 'Personal',
    maxAmount: '₹40 Lakhs',
    interestRate: '10.49%',
    commission: '₹1,200 - ₹5,000',
    icon: User,
    requiredDocs: ['PAN', 'Aadhaar', 'Bank Statement'],
    color: 'bg-blue-50 text-blue-700',
  },
  'gold-loan': {
    id: 'gold-loan',
    name: 'Gold Loan',
    category: 'Gold',
    maxAmount: '₹25 Lakhs',
    interestRate: '9.00%',
    commission: '0.50% of Disbursal',
    icon: Coins,
    requiredDocs: ['KYC', 'Gold Ornaments'],
    color: 'bg-yellow-50 text-yellow-700',
  },
  'education-loan': {
    id: 'education-loan',
    name: 'Education Loan',
    category: 'Personal',
    maxAmount: '₹1 Crore',
    interestRate: '9.50%',
    commission: '0.30% of Disbursal',
    icon: GraduationCap,
    requiredDocs: ['Admission Letter', 'KYC'],
    color: 'bg-indigo-50 text-indigo-700',
  },

  // --- Vehicle Category ---
  'auto-loan': {
    id: 'auto-loan',
    name: 'Auto Loan',
    category: 'Personal',
    maxAmount: '100% On-Road',
    interestRate: '8.75%',
    commission: '0.50% of Disbursal',
    icon: Car,
    requiredDocs: ['Income Proof', 'KYC'],
    color: 'bg-red-50 text-red-700',
  },
  'two-wheeler': {
    id: 'two-wheeler',
    name: 'Two-wheeler Loan',
    category: 'Personal',
    maxAmount: '100% On-Road',
    interestRate: '10.00%',
    commission: '₹500 Flat',
    icon: Bike,
    requiredDocs: ['KYC', 'Income Proof'],
    color: 'bg-red-50 text-red-700',
  },
  'cv-loan': {
    id: 'cv-loan',
    name: 'Construction - CV/CE',
    category: 'Business',
    maxAmount: 'Based on Asset',
    interestRate: '11.00%',
    commission: '0.75% of Disbursal',
    icon: Truck,
    requiredDocs: ['Contract Details', 'KYC'],
    color: 'bg-orange-50 text-orange-700',
  },
  'tractor-loan': {
    id: 'tractor-loan',
    name: 'Tractor Loan',
    category: 'Agri',
    maxAmount: '90% of Value',
    interestRate: '11.00%',
    commission: '₹3,000 Flat',
    icon: Tractor,
    requiredDocs: ['Land Record (7/12)', 'KYC'],
    color: 'bg-green-50 text-green-700',
  },

  // --- Home & Property ---
  'home-loan': {
    id: 'home-loan',
    name: 'Home Loan',
    category: 'Personal',
    maxAmount: '₹5 Crore',
    interestRate: '8.75%',
    commission: '0.40% of Disbursal',
    icon: Home,
    requiredDocs: ['Property Papers', 'Income Proof'],
    color: 'bg-purple-50 text-purple-700',
  },
  'asha-home-loan': {
    id: 'asha-home-loan',
    name: 'Asha Home Loan',
    category: 'Personal',
    maxAmount: '₹35 Lakhs',
    interestRate: '9.00%',
    commission: '0.40% of Disbursal',
    icon: Home,
    requiredDocs: ['Income Proof', 'KYC'],
    color: 'bg-purple-50 text-purple-700',
  },
  'lap': {
    id: 'lap',
    name: 'Loan Against Property',
    category: 'Personal',
    maxAmount: '₹5 Crore',
    interestRate: '9.50%',
    commission: '0.50% of Disbursal',
    icon: Building,
    requiredDocs: ['Property Papers', 'ITR'],
    color: 'bg-purple-50 text-purple-700',
  },
  'od-property': {
    id: 'od-property',
    name: 'B2C (KCC/OD Property)',
    category: 'Agri',
    maxAmount: 'Based on Land',
    interestRate: '8.50%',
    commission: '0.50% of Disbursal',
    icon: Sprout,
    requiredDocs: ['Land Record', 'KYC'],
    color: 'bg-emerald-50 text-emerald-700',
  },

  // --- Business & SME ---
  'business-loan': {
    id: 'business-loan',
    name: 'Business Loan (SBB)',
    category: 'Business',
    maxAmount: '₹50 Lakhs',
    interestRate: '12.00%',
    commission: '1.00% of Disbursal',
    icon: Briefcase,
    requiredDocs: ['GST Returns', 'ITR'],
    color: 'bg-cyan-50 text-cyan-700',
  },
  'secured-term-loan': {
    id: 'secured-term-loan',
    name: 'Secured Term Loan (SBB)',
    category: 'Business',
    maxAmount: '₹2 Crore',
    interestRate: '10.50%',
    commission: '0.75% of Disbursal',
    icon: ShieldCheck,
    requiredDocs: ['Collateral Docs', 'Financials'],
    color: 'bg-cyan-50 text-cyan-700',
  },
  'cash-credit': {
    id: 'cash-credit',
    name: 'Cash Credit / OD',
    category: 'Business',
    maxAmount: 'Based on Turnover',
    interestRate: '9.75%',
    commission: '0.50% Limit',
    icon: Banknote,
    requiredDocs: ['Stock Statement', 'Audit Report'],
    color: 'bg-cyan-50 text-cyan-700',
  },
  'gst-od': {
    id: 'gst-od',
    name: 'B2B Retail & MSME (GST OD)',
    category: 'Business',
    maxAmount: 'Based on GST',
    interestRate: '10.00%',
    commission: '0.60% Limit',
    icon: Store,
    requiredDocs: ['GST Returns', 'KYC'],
    color: 'bg-cyan-50 text-cyan-700',
  },
  'kcc': { // Kept for backward compatibility references
    id: 'kcc',
    name: 'Kisan Credit Card',
    category: 'Agri',
    maxAmount: '₹3 Lakhs',
    interestRate: '7.00%',
    commission: '₹500 Flat',
    icon: Sprout,
    requiredDocs: ['Land Record', 'Crop Declaration'],
    color: 'bg-emerald-50 text-emerald-700',
  }
};

// --- Journey Configurations (MINIMALIST LEAD GEN) ---
export const LOAN_JOURNEYS: Record<string, LoanJourneyConfig> = {
  'personal-loan': {
    productId: 'personal-loan',
    steps: [
      {
        title: 'Quick Lead Generation',
        fields: [
          { id: 'mobile', label: 'Customer Mobile', type: 'text', placeholder: '9876543210', required: true },
          { id: 'name', label: 'Customer Name', type: 'text', placeholder: 'As per PAN', required: true },
          { id: 'pincode', label: 'Current Pincode', type: 'number', placeholder: 'To map nearest branch', required: true },
          { id: 'amt', label: 'Required Amount', type: 'number', placeholder: 'e.g. 500000', required: true },
        ]
      }
    ]
  },
  'gold-loan': {
    productId: 'gold-loan',
    steps: [
      {
        title: 'Quick Lead Generation',
        fields: [
          { id: 'mobile', label: 'Customer Mobile', type: 'text', placeholder: '9876543210', required: true },
          { id: 'name', label: 'Customer Name', type: 'text', placeholder: 'As per PAN', required: true },
          { id: 'pincode', label: 'Current Pincode', type: 'number', placeholder: 'To map nearest branch', required: true },
          { id: 'weight', label: 'Approx Gold Weight (gms)', type: 'number', placeholder: 'e.g. 50', required: true },
        ]
      }
    ]
  },
  'tractor-loan': {
    productId: 'tractor-loan',
    steps: [
      {
        title: 'Quick Lead Generation',
        fields: [
          { id: 'mobile', label: 'Customer Mobile', type: 'text', placeholder: '9876543210', required: true },
          { id: 'name', label: 'Customer Name', type: 'text', placeholder: 'As per Aadhaar', required: true },
          { id: 'pincode', label: 'Current Pincode', type: 'number', placeholder: 'To map nearest branch', required: true },
          { id: 'landArea', label: 'Land Holding (Acres)', type: 'number', placeholder: 'e.g. 5.5', required: true },
        ]
      }
    ]
  }
};

// --- Mock Customers ---
export const MOCK_CUSTOMERS = {
  '9876543210': {
    mobile: '9876543210',
    name: 'Rajesh Kumar',
    isExisting: true,
    segment: 'Salaried',
    cibilScore: 750,
    preApprovedOffers: [PRODUCTS['personal-loan'], PRODUCTS['home-loan']]
  },
  '9988776655': {
    mobile: '9988776655',
    name: 'Suresh Patil',
    isExisting: true,
    segment: 'Farmer',
    cibilScore: 710,
    preApprovedOffers: [PRODUCTS['kcc'], PRODUCTS['tractor-loan']]
  }
};

// --- Mock Leads for Management Screen ---
export const MOCK_LEADS: LeadStatus[] = [
  {
    id: '1',
    leadId: 'LEAD-9921',
    customerName: 'Amit Verma',
    customerPhone: '98765 11111',
    productName: 'Personal Loan',
    status: 'REJECTED',
    date: 'Today, 10:30 AM',
    amount: '₹5,00,000',
    actionRequired: 'Low CIBIL (620). Suggest Gold Loan.',
    branchName: 'Indrapuram',
    branchManager: 'Mr. R. Sharma',
    managerPhone: '98100 12345'
  },
  {
    id: '2',
    leadId: 'LEAD-8832',
    customerName: 'Sita Devi',
    customerPhone: '98765 22222',
    productName: 'Gold Loan',
    status: 'DISBURSED',
    date: 'Yesterday',
    amount: '₹2,50,000',
    branchName: 'Sector 62, Noida',
    branchManager: 'Ms. Priya Singh',
    managerPhone: '99990 67890'
  },
  {
    id: '3',
    leadId: 'LEAD-7744',
    customerName: 'Vikram Singh',
    customerPhone: '98765 33333',
    productName: 'Tractor Loan',
    status: 'IN_PROGRESS',
    date: '24 Oct',
    amount: '₹8,00,000',
    branchName: 'Meerut Main',
    branchManager: 'Mr. Ali Khan',
    managerPhone: '88000 54321'
  },
  {
    id: '4',
    leadId: 'LEAD-6655',
    customerName: 'Home Loan',
    customerPhone: '98765 44444',
    productName: 'Home Loan',
    status: 'ACTION_REQUIRED',
    date: '22 Oct',
    amount: '₹25,00,000',
    actionRequired: 'Income Proof Unclear. Re-upload ITR.',
    branchName: 'Ghaziabad',
    branchManager: 'Mr. P. Gupta',
    managerPhone: '98111 98765'
  }
];