---
name: FRONTEND_SPEC.md
description: "Property Hub Frontend Architecture and Design Plan"
---

# Property Hub Frontend Specification

This document outlines the frontend architecture, feature breakdown, screen flows, and usability considerations for the Property Hub application, focusing on distinct user personas.

## Core Principles

- **Persona-Driven Design:** Tailored experiences for Landlord, Property Manager, Tenant, Maintenance, and Vendor.
- **Usability First:** Intuitive navigation, clear data presentation, streamlined workflows.
- **Modularity:** Component-based architecture using React, Vite, TypeScript, Tailwind CSS, and shadcn/ui.
- **Mock Data First:** Development can proceed independently of backend Supabase integration.

-----

**EPIC 1: Core Property & Unit Management**

*   **Description:** Foundation for managing properties and their constituent units, central to all operations.

    *   **Persona:** Landlord/Owner, Property Manager
    *   **Features:**
        *   **Property Portfolio Overview:**
            *   **Function:** Display aggregated stats (Total Units, Occupancy Rate, Total Income, Total Expenses).
            *   **Function:** Quick view of recent activity (new leases, maintenance requests, payments).
            *   **Function:** Links to detailed property views.
        *   **Property List View:**
            *   **Function:** List all properties managed by the user.
            *   **Function:** Display key stats per property (Address, Units, Occupancy %, Net Income).
            *   **Function:** Search/filter properties.
        *   **Property Detail View:**
            *   **Function:** Display comprehensive property information (address, photos, description, unit count).
            *   **Function:** Tabs for Units, Leases, Financials, Documents, Tasks.
        *   **Unit Management:**
            *   **Function:** View list of units within a property.
            *   **Function:** Display unit status (Occupied, Vacant, Maintenance).
            *   **Function:** Add/Edit unit details (unit number, rent, status).
    *   **Pain Points Addressed:** Lack of clear portfolio overview, difficulty managing multiple properties.

---  

**EPIC 2: Leasing & Tenant Management**

*   **Description:** Streamlining the process of acquiring and managing tenants and their agreements.

    *   **Persona:** Property Manager, Landlord (view only)
    *   **Features:**
        *   **Lease Creation Wizard:**
            *   **Function:** Step-by-step process for creating new leases.
            *   **Steps:** Select property/unit, tenant selection, define dates (start, end, renewal), set financial terms (rent, deposit, late fees), upload documents, review and generate.
        *   **Lease Overview & Details:**
            *   **Function:** List all leases associated with a property or tenant.
            *   **Function:** Display lease status (Active, Expired, Pending).
            *   **Function:** View full lease details (terms, dates, rent, tenant info, uploaded docs).
        *   **Tenant Profile Management:**
            *   **Function:** Database of tenants with contact info, lease history, payment history.
            *   **Function:** Add/Edit tenant details.
            *   **Function:** View communication logs with tenant.
        *   **Lease Renewal Workflow:**
            *   **Function:** Initiate and track lease renewal process.
            *   **Function:** Automated reminders for upcoming lease expirations.
    *   **Pain Points Addressed:** Cumbersome lease creation, manual tracking of renewals and tenant info.

---  

**EPIC 3: Financial Tracking & Reporting**

*   **Description:** Centralized management of all property-related income and expenses.

    *   **Persona:** Landlord/Owner, Property Manager
    *   **Features:**
        *   **Property-Level Ledger:**
            *   **Function:** Detailed view of income (rent, fees) and expenses (maintenance, utilities) for a specific property.
            *   **Function:** Transaction history with dates, categories, amounts.
        *   **Portfolio Financial Dashboard:**
            *   **Function:** Aggregated view of income, expenses, and net profit across all properties.
            *   **Function:** Visualizations (charts) for performance trends.
        *   **Expense Tracking:**
            *   **Function:** Log and categorize expenses with receipt uploads.
            *   **Function:** Assign expenses to specific properties or units.
        *   **Automated Reporting:**
            *   **Function:** Generate P&L statements, occupancy reports, rent roll summaries.
            *   **Function:** Export reports in various formats (PDF, CSV).
    *   **Pain Points Addressed:** Lack of clear financial visibility, difficulty in generating reports, manual expense tracking.

---  

**EPIC 4: Maintenance & Task Management**

*   **Description:** Streamlining the process of handling maintenance requests and other property tasks.

    *   **Persona:** Property Manager, Maintenance Staff, Tenant
    *   **Features:**
        *   **Maintenance Request Submission (Tenant):**
            *   **Function:** Simple form to submit requests with description, photos, priority, and preferred times.
        *   **Task Dashboard (Manager/Maintenance):**
            *   **Function:** View all open, in-progress, and completed tasks.
            *   **Function:** Filter/sort tasks by property, unit, assignee, status, priority.
        *   **Task Assignment & Workflow:**
            *   **Function:** Assign tasks to internal maintenance staff or external vendors.
            *   **Function:** Track task progress, add notes, log time and materials used.
            *   **Function:** Update task status (New, Assigned, In Progress, Resolved, Closed).
        *   **Vendor Management:**
            *   **Function:** Database of approved vendors with contact info and service history.
            *   **Function:** Track vendor performance and past job costs.
        *   **Notifications:**
            *   **Function:** Notify tenants of request status changes.
            *   **Function:** Notify managers of new requests or status updates.
    *   **Pain Points Addressed:** Inefficient request handling, lack of transparency in maintenance status, communication overhead.

---  

**EPIC 5: User Management & Access Control**

*   **Description:** Managing users, roles, and permissions across the platform.

    *   **Persona:** Owner, Property Manager (Admin), (Tenant, Maintenance, Vendor - as users)
    *   **Features:**
        *   **Role-Based Access Control:**
            *   **Function:** Define distinct roles (Owner, Manager, Tenant, Maintenance, Vendor) with specific permissions.
            *   **Function:** Assign roles to users.
        *   **User Account Management:**
            *   **Function:** Add, edit, and deactivate user accounts.
            *   **Function:** Secure authentication (login/logout).
    *   **Pain Points Addressed:** Ensuring data security, providing appropriate access levels to different user types.

---  

**Next Steps for Implementation:**

1.  **Prioritize Features:** Based on your immediate needs, we can prioritize which features to build first (likely core property/unit management and lease/tenant features).
2.  **Mock Data Expansion:** Expand `src/lib/mock-data.ts` to cover the detailed requirements for each persona and feature.
3.  **Component Development:** Start building reusable UI components based on `shadcn/ui` and the frontend structure.
4.  **Task Definition for Agents:** Break down features into tasks for the Architect, Engineer, and QA agents using `agent-team-orchestration`.

Let me know which persona's features or which EPIC we should focus on first!