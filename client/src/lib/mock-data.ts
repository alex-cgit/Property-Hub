import { 
  Building2, 
  Users, 
  Wrench, 
  DollarSign, 
  AlertCircle, 
  CheckCircle2,
  Clock
} from "lucide-react";

export interface Property {
  id: string;
  name: string;
  address: string;
  image: string;
  type: "Residential" | "Commercial" | "Mixed";
  units: number;
  occupancyRate: number;
}

export interface Unit {
  id: string;
  propertyId: string;
  unitNumber: string;
  status: "Occupied" | "Vacant" | "Maintenance";
  bedrooms: number;
  bathrooms: number;
  rent: number;
  size: number; // sqft
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Past" | "Lead";
  avatar: string;
}

export interface Lease {
  id: string;
  unitId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  status: "Active" | "Expiring Soon" | "Expired";
  documents: string[];
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  unitId?: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Completed";
  dateReported: string;
  assignedTo?: string;
}

export interface FinancialRecord {
  id: string;
  propertyId: string;
  unitId?: string;
  type: "Income" | "Expense";
  category: string;
  amount: number;
  date: string;
  description: string;
}

// Mock Data
export const properties: Property[] = [
  {
    id: "prop-1",
    name: "Sunset Heights Apartments",
    address: "123 Sunset Blvd, Los Angeles, CA",
    image: "/src/assets/images/property-1.jpg",
    type: "Residential",
    units: 24,
    occupancyRate: 92,
  },
  {
    id: "prop-2",
    name: "Oakwood Business Park",
    address: "450 Oakwood Dr, Pasadena, CA",
    image: "/src/assets/images/property-2.jpg",
    type: "Commercial",
    units: 12,
    occupancyRate: 85,
  },
  {
    id: "prop-3",
    name: "The Highland Lofts",
    address: "789 Highland Ave, Seattle, WA",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    type: "Residential",
    units: 45,
    occupancyRate: 98,
  }
];

export const units: Unit[] = [
  { id: "u-101", propertyId: "prop-1", unitNumber: "101", status: "Occupied", bedrooms: 2, bathrooms: 1, rent: 2200, size: 950 },
  { id: "u-102", propertyId: "prop-1", unitNumber: "102", status: "Vacant", bedrooms: 2, bathrooms: 1, rent: 2200, size: 950 },
  { id: "u-103", propertyId: "prop-1", unitNumber: "103", status: "Occupied", bedrooms: 1, bathrooms: 1, rent: 1800, size: 750 },
  { id: "u-201", propertyId: "prop-2", unitNumber: "Suite A", status: "Occupied", bedrooms: 0, bathrooms: 2, rent: 4500, size: 2000 },
  { id: "u-202", propertyId: "prop-2", unitNumber: "Suite B", status: "Maintenance", bedrooms: 0, bathrooms: 1, rent: 3200, size: 1500 },
];

export const tenants: Tenant[] = [
  { id: "t-1", name: "Sarah Jenkins", email: "sarah.j@example.com", phone: "(555) 123-4567", status: "Active", avatar: "SJ" },
  { id: "t-2", name: "Michael Chen", email: "m.chen@example.com", phone: "(555) 987-6543", status: "Active", avatar: "MC" },
  { id: "t-3", name: "TechStart Inc.", email: "contact@techstart.io", phone: "(555) 456-7890", status: "Active", avatar: "TS" },
];

export const leases: Lease[] = [
  { id: "l-1", unitId: "u-101", tenantId: "t-1", startDate: "2023-01-01", endDate: "2024-01-01", rentAmount: 2200, status: "Active", documents: ["lease_signed.pdf"] },
  { id: "l-2", unitId: "u-201", tenantId: "t-3", startDate: "2022-06-01", endDate: "2025-06-01", rentAmount: 4500, status: "Active", documents: ["commercial_lease.pdf"] },
];

export const maintenanceRequests: MaintenanceRequest[] = [
  { id: "m-1", propertyId: "prop-1", unitId: "u-103", title: "Leaking Faucet", description: "Kitchen sink faucet is dripping constantly.", priority: "Low", status: "Open", dateReported: "2023-10-15", assignedTo: "Mario" },
  { id: "m-2", propertyId: "prop-2", unitId: "u-202", title: "HVAC Malfunction", description: "AC unit making loud banging noises.", priority: "High", status: "In Progress", dateReported: "2023-10-14", assignedTo: "TechCool Services" },
  { id: "m-3", propertyId: "prop-1", title: "Lobby Light Out", description: "Main entrance overhead light is flickering.", priority: "Medium", status: "Completed", dateReported: "2023-10-10" },
];

export interface Account {
  id: string;
  code: string;
  name: string;
  type: "Asset" | "Liability" | "Equity" | "Revenue" | "Expense";
  category: string;
  balance: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  description: string;
  reference?: string; // Invoice ID, Lease ID, etc.
  status: "Draft" | "Posted";
  lines: {
    accountId: string;
    description: string;
    debit: number;
    credit: number;
  }[];
}

export const chartOfAccounts: Account[] = [
  { id: "acc-1001", code: "1001", name: "Operating Cash", type: "Asset", category: "Cash", balance: 125000 },
  { id: "acc-1100", code: "1100", name: "Accounts Receivable", type: "Asset", category: "Receivables", balance: 45000 },
  { id: "acc-2000", code: "2000", name: "Accounts Payable", type: "Liability", category: "Payables", balance: 12000 },
  { id: "acc-2100", code: "2100", name: "Security Deposits", type: "Liability", category: "Deposits", balance: 35000 },
  { id: "acc-4000", code: "4000", name: "Rental Income", type: "Revenue", category: "Income", balance: 240000 },
  { id: "acc-5000", code: "5000", name: "Repairs & Maintenance", type: "Expense", category: "Operations", balance: 15000 },
  { id: "acc-5100", code: "5100", name: "Utilities", type: "Expense", category: "Operations", balance: 8000 },
];

export const journalEntries: JournalEntry[] = [
  {
    id: "je-1",
    date: "2023-10-01",
    description: "Monthly Rent Recognition - Unit 101",
    reference: "l-1",
    status: "Posted",
    lines: [
      { accountId: "acc-1100", description: "Rent receivable", debit: 2200, credit: 0 },
      { accountId: "acc-4000", description: "Rent income", debit: 0, credit: 2200 },
    ]
  },
  {
    id: "je-2",
    date: "2023-10-05",
    description: "HVAC Repair - Split Entry",
    reference: "m-2",
    status: "Posted",
    lines: [
      { accountId: "acc-5000", description: "Labor portion", debit: 500, credit: 0 },
      { accountId: "acc-5100", description: "Parts portion", debit: 300, credit: 0 },
      { accountId: "acc-2000", description: "Payable to TechCool", debit: 0, credit: 800 },
    ]
  }
];
