# Property Hub - Implementation Roadmap & Scaffolding

This document defines the sequence of work for converting the prototype into a fully functional application. It is designed to be consumed by sub-agents, with clear dependencies and deliverables for each phase.

## 🏗️ Phase 1: Foundation & Type Safety (Frontend Focus)
**Goal:** Solidify the data contract and component architecture before connecting the backend.
**Dependencies:** None.

### Task 1.1: Schema Definition (The "Contract")
*   **Action:** Port all interfaces from `src/lib/mock-data.ts` to `shared/schema.ts` using Drizzle Zod.
*   **Deliverable:** `shared/schema.ts` containing `properties`, `units`, `tenants`, `leases`, `maintenance_tickets`, `financial_records`.
*   **Why:** Even if we mock the backend, the frontend MUST use the final Zod types to ensure smooth integration later.

### Task 1.2: Component Library Expansion
*   **Action:** Create reusable, complex UI components that are currently hardcoded in pages.
    *   `StatusBadge.tsx` (Variant props: active, pending, error)
    *   `CurrencyInput.tsx` (Auto-formatting)
    *   `AddressAutocomplete.tsx` (Mocked for now, Google Places later)
    *   `FileUploadZone.tsx` (Drag & drop visual only)
*   **Deliverable:** `src/components/common/` populated.

### Task 1.3: Navigation & Layout Refactor
*   **Action:** Implement the Role-Based Layout shell.
    *   Create `DashboardLayout.tsx` (Sidebar + Topbar).
    *   Create `PortalLayout.tsx` (Simplified top-nav for Tenants).
    *   Update `App.tsx` to use these layouts with `Outlet`.
*   **Deliverable:** Distinct visual shells for Manager vs Tenant.

---

## 🚀 Phase 2: Feature Implementation (Frontend Logic)
**Goal:** Build the interactive flows using local state or mock API calls.
**Dependencies:** Phase 1.

### Task 2.1: Property & Unit Management (CRUD)
*   **Action:** Build the "Add/Edit Property" forms.
    *   `PropertyForm.tsx`: Multi-tab form (Details, Units, Photos).
    *   `UnitGrid.tsx`: Editable grid for bulk unit management.
*   **Deliverable:** Functional forms that console.log valid JSON on submit.

### Task 2.2: Lease Creation Wizard
*   **Action:** Implement the multi-step `LeaseWizard.tsx`.
    *   Step 1: Select Property/Unit.
    *   Step 2: Tenant Info (Search or Create).
    *   Step 3: Terms (Dates, Rent, Deposit).
    *   Step 4: Clauses (Checkboxes).
    *   Step 5: Review.
*   **Deliverable:** A complex wizard component managing multi-step state.

### Task 2.3: Tenant Portal Views
*   **Action:** Build the tenant-facing screens.
    *   `TenantDashboard.tsx`: "Pay Rent" button, Active Maintenance list.
    *   `MaintenanceRequestForm.tsx`: Simplified form with photo upload UI.
*   **Deliverable:** A "Portal" route accessible via `/portal` (mock login).

---

## 💾 Phase 3: Backend Connection (The "Wiring")
**Goal:** Replace mock data with real Supabase/Express calls.
**Dependencies:** Phase 2.

### Task 3.1: Supabase Setup & Auth
*   **Action:**
    *   Initialize Supabase project.
    *   Run migrations from `shared/schema.ts`.
    *   Implement `AuthProvider.tsx` (Login, Logout, Session persistence).
*   **Deliverable:** Working Login screen and protected routes.

### Task 3.2: API Integration (React Query)
*   **Action:** specific hooks for each feature.
    *   `useProperties`: `GET /api/properties`
    *   `useCreateLease`: `POST /api/leases`
*   **Deliverable:** Data persists after page refresh.

### Task 3.3: Storage & Edge Functions
*   **Action:** Connect `FileUploadZone` to Supabase Storage (Buckets: `leases`, `maintenance`).
*   **Deliverable:** Real file uploads working.

---

## 🧪 Phase 4: Polish & QA
**Goal:** Catch edge cases and styling issues.

### Task 4.1: Mobile Responsiveness
*   **Action:** Audit all tables and complex forms on mobile viewports.
    *   Convert tables to cards on `< md` breakpoints.
    *   Ensure sidebar behaves as a drawer on mobile.

### Task 4.2: Loading States & Error Handling
*   **Action:**
    *   Add `Skeleton` loaders to all data-fetching components.
    *   Implement global `Toast` notifications for success/error.

---

## 📋 Sequence for Sub-Agents

1.  **Agent A (Architect):** Execute Task 1.1 (Schema).
2.  **Agent B (UI Builder):** Execute Task 1.2 & 1.3 concurrently.
3.  **Agent C (Feature Dev):** Execute Task 2.1 (Property CRUD).
4.  **Agent D (Feature Dev):** Execute Task 2.2 (Lease Wizard).
5.  **Agent E (Feature Dev):** Execute Task 2.3 (Tenant Portal).
