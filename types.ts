import { LucideIcon } from 'lucide-react';

export enum AppView {
  CONCEPT_A = 'CONCEPT_A', // Customer 360
  CONCEPT_B = 'CONCEPT_B', // Needs First
  CONCEPT_C = 'CONCEPT_C', // Smart Wizard
  LOAN_FORM = 'LOAN_FORM',
  CASA_FLOW = 'CASA_FLOW', // New Savings Account Flow
  SUCCESS_RECEIPT = 'SUCCESS_RECEIPT',
  LEAD_MANAGEMENT = 'LEAD_MANAGEMENT',
  NOTIFICATIONS = 'NOTIFICATIONS',
  // New Action Views
  ACTION_SUGGEST_GOLD = 'ACTION_SUGGEST_GOLD',
  ACTION_UPLOAD_DOCS = 'ACTION_UPLOAD_DOCS',
  ACTION_VIEW_RECEIPT = 'ACTION_VIEW_RECEIPT',
  ACTION_CALL_RM = 'ACTION_CALL_RM',
}

export type LoanCategory = 'Personal' | 'Business' | 'Agri' | 'Gold';

export interface LoanProduct {
  id: string;
  name: string;
  category: LoanCategory;
  maxAmount: string;
  interestRate: string;
  commission: string; // Displayed to Adhikari
  icon: LucideIcon;
  requiredDocs: string[];
  color: string;
}

export interface CustomerProfile {
  mobile: string;
  name: string;
  isExisting: boolean;
  cibilScore?: number;
  preApprovedOffers?: LoanProduct[];
  segment: 'Farmer' | 'Salaried' | 'Shopkeeper' | 'New';
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'boolean' | 'file';
  options?: string[];
  placeholder?: string;
  required: boolean;
}

export interface LoanJourneyConfig {
  productId: string;
  steps: {
    title: string;
    fields: FormField[];
  }[];
}

export interface LeadStatus {
  id: string;
  customerName: string;
  customerPhone?: string; // New field for customer contact
  productName: string;
  status: 'DISBURSED' | 'REJECTED' | 'ACTION_REQUIRED' | 'IN_PROGRESS';
  leadId: string;
  date: string;
  amount: string;
  actionRequired?: string; // e.g., "Upload Pan", "Suggest Gold Loan"
  branchManager?: string;
  managerPhone?: string; // New field for RM contact
  branchName?: string;
}