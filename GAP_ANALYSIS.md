# Property Hub - Codebase Gap Analysis
**Date:** 2026-02-23
**Reviewer:** Neo

## 🚨 Critical Architecture Gap: Missing Backend
The application is currently a **Frontend Prototype**. It is functionally disconnected from any persistent data layer.
- **Current State:** 100% reliant on `src/lib/mock-data.ts`.
- **Backend Schema:** `shared/schema.ts` only defines a `users` table.
- **Impact:** No data is saved. Refreshing the page resets everything.
- **Action Required:** The Mock Data interfaces (`Property`, `Unit`, `Lease`, etc.) must be ported to `drizzle-orm` schemas in `shared/schema.ts` immediately.

---

## 🎨 Feature & Screen Analysis (Code vs Spec)

### 1. Landing Page (Public)
*   **Spec:** Hero, Features, Pricing, Footer.
*   **Current Code:** `src/pages/landing.tsx` exists.
*   **Status:** ✅ **Covered** (Needs visual verification against new design, but the route is there).

### 2. Dashboard
*   **Spec:** KPI Cards, Financial Chart, Action Feed.
*   **Current Code:** `src/pages/dashboard.tsx` implements this exactly using Recharts and Lucide icons.
*   **Status:** ✅ **Covered** (Visuals match, data is mocked).

### 3. Property Management
*   **Spec:** Master View -> Tabs (Overview, Units, Financials, etc.).
*   **Current Code:**
    -   `src/pages/properties.tsx`: List view.
    -   `src/pages/property-details.tsx`: Detail view.
    -   `src/pages/unit-details.tsx`: Unit drill-down.
*   **Gaps:**
    -   **Add Property Flow:** The button exists in Dashboard but logic is likely missing or just a modal shell.
    -   **Edit Property:** No specific edit screen found in file list, likely handled via modal or inline (needs verification).
*   **Status:** ⚠️ **Partial** (Read-only views are good, Create/Update flows are weak/missing).

### 4. Lease Wizard
*   **Spec:** Multi-step wizard (Unit -> Tenant -> Terms -> Fees -> Sign).
*   **Current Code:** No `lease-wizard.tsx` or `src/pages/leases/new`.
*   **Status:** ❌ **MISSING**. This is a core feature defined in the spec but absent in the file list. Leases are just static data in `mock-data.ts`.

### 5. Maintenance
*   **Spec:** Request Form, Status Tracking, Photos.
*   **Current Code:**
    -   `src/pages/maintenance.tsx`: List view.
    -   `src/pages/maintenance-detail.tsx`: Detail view.
    -   Mock data supports `timeline`, `comments`, `photos`.
*   **Status:** ✅ **Covered** (Surprisingly robust mock implementation).

### 6. Financials & Ledger
*   **Spec:** Owner Reports, P&L.
*   **Current Code:**
    -   `src/pages/financials.tsx`
    -   `src/pages/ledger.tsx` (General Ledger)
    -   `src/pages/journal-entry-form.tsx`
    -   `src/pages/reports.tsx`
*   **Status:** ✅ **Covered** (Actually exceeds the basic spec by including a full General Ledger and Journal Entry system).

### 7. Tenant Portal
*   **Spec:** Separate view for Tenants to pay rent/request maintenance.
*   **Current Code:** No distinct `/portal` route or layout found in `App.tsx`.
*   **Status:** ❌ **MISSING**. The app currently assumes a "Manager" persona for all views.

---

## 📋 Missing Fields & Data Models
The Mock Data is good, but based on the new Spec, we are missing:

1.  **Lease Terms:**
    -   `securityDepositHeld` (Amount, Location)
    -   `lateFeePolicy` (Structure, Grace Period)
    -   `renewalStatus` (Offered, Signed, Rejected)
2.  **Property Specs:**
    -   `purchaseDate`, `purchasePrice` (For ROI calcs)
    -   `mortgageInfo` (Lender, Monthly Payment)
3.  **User Roles:**
    -   Current `User` schema has no `role` field. Impossible to distinguish Manager vs Tenant.

---

## 🛠️ Infrastructure Gaps
1.  **Supabase Client:** `src/integrations/supabase/client.ts` referenced in spec but not found in file list (checked `src/lib`).
2.  **Auth Flow:** `App.tsx` has no `AuthGuard` or `ProtectedRoute` wrappers. All routes are public/unprotected.
3.  **Mobile Responsiveness:** `use-mobile.tsx` exists, but needs testing against the complex Tables and Charts in the Dashboard.

## 🚀 Recommended Next Steps (Prioritized)
1.  **Database Migration:** Port `src/lib/mock-data.ts` interfaces to `shared/schema.ts` (Drizzle).
2.  **Auth Setup:** Implement Supabase Auth and wrap Manager routes vs Tenant routes.
3.  **Lease Wizard:** Build the `LeaseCreationWizard` component (Stepper UI).
4.  **Tenant Portal:** Create a simplified layout for the `/portal` route.
