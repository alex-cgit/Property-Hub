# Property Hub - Frontend Specification

## 1. High-Level Overview
Property Hub is a comprehensive, multi-tenant real estate management platform designed to streamline the relationship between property managers, landlords, tenants, and maintenance personnel. It centralizes operations into a single "pane of glass," handling everything from lease origination and rent collection to maintenance ticketing and financial reporting.

The application is built as a responsive Single Page Application (SPA) with a focus on speed, data density for managers, and simplicity for tenants.

### Core Value Propositions
*   **Managers:** Efficiency. Reduce clicks to complete tasks. Bulk operations.
*   **Landlords:** Transparency. Real-time view of portfolio performance.
*   **Tenants:** Convenience. Frictionless payments and reporting.

---

## 2. Architecture & Tech Stack
*   **Framework:** React 18+ (Vite)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS + shadcn/ui (Radix Primitives)
*   **State Management:** 
    *   Server State: TanStack Query (React Query)
    *   Global UI State: Zustand (for sidebar, modals, session)
    *   Form State: React Hook Form + Zod validation
*   **Routing:** React Router v6 (Data Routers)
*   **Backend Integration:** Supabase (Auth, DB, Storage, Realtime)
*   **Icons:** Lucide React

---

## 3. User Personas

### 🧑‍💼 **Property Manager (Admin)**
*   **Role:** Superuser / Admin
*   **Goals:** Minimize vacancy, collect rent on time, resolve maintenance issues quickly.
*   **Key Features:** Dashboard, Lease Wizard, Financial Reports, User Management.

### 🏠 **Landlord / Owner**
*   **Role:** Viewer (limited write)
*   **Goals:** See ROI, approve large expenses, view monthly statements.
*   **Key Features:** Portfolio Overview, Financial Statements, Document Vault.

### 🔑 **Tenant**
*   **Role:** End User
*   **Goals:** Pay rent, request repairs, view lease.
*   **Key Features:** Payment Portal, Maintenance Request Form, Lease Docs.

### 🛠️ **Service Provider (Maintenance)**
*   **Role:** Limited User
*   **Goals:** Receive work orders, upload completion photos, invoice jobs.
*   **Key Features:** Work Order Mobile View, Time Tracking.

---

## 4. User Stories & Screen Designs

### 🌐 Landing Page (Public)
*   **Route:** `/` (Public)
*   **Goal:** Convert visitors to sign up or log in.
*   **Design:**
    *   **Hero Section:** "Modern Property Management Simplified." with [Get Started] and [Login] buttons.
    *   **Features Grid:** 3-column layout highlighting Rent Collection, Maintenance, and Financials.
    *   **Testimonials:** Carousel of user reviews.
    *   **Pricing:** Tiered cards (Starter, Pro, Enterprise).
    *   **Footer:** Links to Support, Privacy, Terms.

### 📊 Manager Dashboard
*   **Route:** `/dashboard`
*   **Persona:** Property Manager
*   **User Story:** "As a Manager, I want to see a high-level overview of my portfolio's health so I can address urgent issues immediately."
*   **Screen Design:**
    *   **Header:** "Good Morning, Alex." | Global Search Bar | Notifications Bell | Profile Dropdown.
    *   **KPI Cards (Top Row):**
        *   *Occupancy Rate:* 92% (Green/Red indicator).
        *   *Rent Collected:* $45,200 / $50,000 (Progress bar).
        *   *Open Work Orders:* 5 (2 Urgent).
        *   *Leases Expiring:* 3 (Next 60 days).
    *   **Main Content (2-Column Layout):**
        *   *Left (2/3):* **Financial Performance Chart** (Bar chart: Revenue vs Expenses last 6 months).
        *   *Right (1/3):* **Action Feed** (List: "Unit 4B Payment Failed", "New Maintenance Request: Leaky Faucet").

### 🏢 Property Master View
*   **Route:** `/properties` -> `/properties/:id`
*   **Persona:** Property Manager
*   **User Story:** "As a Manager, I want to manage all details of a specific property, including its units and financials."
*   **Screen Design:**
    *   **Sidebar Navigation:** Properties list with filter/search.
    *   **Main Detail Area:**
        *   **Header:** Property Image, Address, "Net Income YTD".
        *   **Tabs:** [Overview] [Units] [Tenants] [Financials] [Maintenance] [Documents]
        *   **Units Tab:** Table view (Unit #, Tenant, Lease End, Rent Status, Status Badge).
            *   *Actions:* [Add Unit], [Vacate Tenant], row-level kebab menu (Edit, View Lease).

### 📝 Lease Creation Wizard
*   **Route:** `/leases/new`
*   **Persona:** Property Manager
*   **User Story:** "As a Manager, I want a guided flow to create a lease so I don't miss compliance steps."
*   **Flow (Stepper UI):**
    1.  **Select Unit:** Searchable dropdown of vacant units. Show rent estimate.
    2.  **Tenant Info:** Add New (Form: Name, Email, Phone, SSN) or Select Existing.
    3.  **Lease Terms:** Start Date, Duration (12mo/M2M), Rent Amount, Security Deposit.
    4.  **Charges & Fees:** Add recurring charges (Parking, Pet Rent) or one-time fees (Cleaning).
    5.  **Clauses:** Checkbox list of standard clauses (No Smoking, Pet Policy).
    6.  **Review & Sign:** Summary view. Action: [Send for eSignature].

### 🔧 Maintenance Request Flow
*   **Route:** `/portal/maintenance/new`
*   **Persona:** Tenant
*   **User Story:** "As a Tenant, I want to report an issue and upload photos so it gets fixed."
*   **Screen Design:**
    *   **Category Select:** Grid of icons (Plumbing, Electrical, HVAC, Appliance, General).
    *   **Priority Toggle:** Normal vs. Emergency (Trigger warning modal if Emergency selected).
    *   **Description:** Text area "Describe the issue..."
    *   **Photo Upload:** Drag & drop zone with mobile camera support.
    *   **Access Instructions:** "Permission to enter if I'm not home?" (Checkbox).

### 💰 Owner Financial Report
*   **Route:** `/owner/reports`
*   **Persona:** Landlord
*   **User Story:** "As an Owner, I want to download my P&L statement for tax purposes."
*   **Screen Design:**
    *   **Filters:** Date Range Picker, Property Multi-select.
    *   **Summary Cards:** Gross Income, Total Expenses, Net Operating Income.
    *   **Breakdown Table:** Categorized expenses (Repairs, Utilities, Management Fees).
    *   **Actions:** [Export PDF] [Export CSV].

---

## 5. Design System & UI/UX Standards
*   **Color Palette:**
    *   Primary: Deep Blue (`#0F172A`) - Trust, Professionalism.
    *   Secondary: Teal (`#14B8A6`) - Action, Success.
    *   Accent: Amber (`#F59E0B`) - Warnings, Attention.
    *   Background: Slate (`#F8FAFC`) - Cleanliness.
*   **Typography:** Inter (Sans-serif). Headings: Semi-bold. Body: Regular.
*   **Spacing:** 4px grid system (`p-4`, `m-8`).
*   **Inputs:** All inputs must have floating labels or clear placeholder text with validation error messages below.
*   **Loading States:** Skeleton loaders for all data-fetching components. No spinning wheels for full pages.
