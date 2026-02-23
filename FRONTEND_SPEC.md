---
name: FRONTEND_SPEC.md
description: "Property Hub Frontend Architecture and Design Plan"
---

# Property Hub Frontend Specification

This document outlines the frontend architecture, feature breakdown, screen flows, and usability considerations for the Property Hub application, focusing on distinct user personas.

## 1. Core Architecture & Tech Stack

*   **Core Framework:** React
*   **Build Tool:** Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Component Library:** shadcn/ui (based on Radix UI primitives)
*   **State Management:** React Context, `tanstack/react-query`
*   **Backend Interface:** Supabase Client

## 2. User Personas & Security Model

### A. Property Manager (Admin)
*   **Access:** Full CRUD.
*   **Goals:** Efficiency, bulk actions, financial oversight.
*   **Security:** Role `admin` or `manager`.

### B. Landlord / Owner (Viewer)
*   **Access:** Read-only.
*   **Goals:** Transparency, financial health check.
*   **Security:** Role `owner`.

### C. Tenant (User)
*   **Access:** Read Lease/Unit, Create Maintenance Requests.
*   **Goals:** Pay rent, report issues, access documents.
*   **Security:** Role `tenant`.

## 3. Screen Flows & Usability

### Flow 1: Manager Dashboard
*   **Route:** `/` or `/dashboard`
*   **Components:** `StatCard`, `ActivityFeed`, `DashboardCharts`.
*   **User Story:** Manager sees tasks, KPIs, clicks property for details.

### Flow 2: Property Master View
*   **Route:** `/properties` -> `/properties/:id`
*   **Components:** `PropertyInfoSidebar`, `PropertyLeasesTab`, `PropertyFinancialTab`.
*   **User Story:** Manager views property list, clicks card, navigates tabs (Overview, Units, Leases, Financials, Docs, Tasks).

### Flow 3: Lease Creation Wizard (Manager Only)
*   **Route:** `/leases/new`
*   **Components:** `LeaseFormDialog`, `Stepper`.
*   **Steps:** Unit/Tenant Selection → Dates → Financial Terms → Documents → Review.

### Flow 4: Tenant Portal Experience
*   **Route:** `/portal`
*   **User Story:** Tenant logs in, pays rent, submits maintenance, views lease.

## 4. Technical Implementation Details

*   **Mock Data:** `src/lib/mock-data.ts` will be expanded significantly.
*   **Hooks:** Utilize `use-mobile.tsx`, `use-toast.ts`.
*   **Supabase:** Use `src/integrations/supabase/client.ts` for backend connection.

## 5. Development Roadmap (Sprint 1)

**Priority:** Property Manager Core Features.

1.  **Mock Data Expansion:** Populate `src/lib/mock-data.ts` fully.
2.  **Dashboard Dev:** Build `StatCard`s and activity feed.
3.  **Property List:** Implement `PropertiesListPage.tsx` and `PropertyListItem`.
4.  **Lease Wizard UI:** Set up the stepper and form fields.

---