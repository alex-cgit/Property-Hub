import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PortfolioProvider } from "@/lib/portfolio-context";
import NotFound from "@/pages/not-found";
import DashboardLayout from "@/components/layout/dashboard-layout";
import PortalLayout from "@/components/layout/portal-layout";
import Dashboard from "@/pages/dashboard";
import LandingPage from "@/pages/landing";
import PropertiesPage from "@/pages/properties";
import PropertyDetailPage from "@/pages/property-details";
import UnitDetailsPage from "@/pages/unit-details";
import TenantsPage from "@/pages/tenants";
import TenantDetailsPage from "@/pages/tenant-details";
import MaintenancePage from "@/pages/maintenance";
import RequestDetailPage from "@/pages/maintenance-detail";
import FinancialsPage from "@/pages/financials";
import GeneralLedgerPage from "@/pages/ledger";
import PartiesPage from "@/pages/parties";
import JournalEntryFormPage from "@/pages/journal-entry-form";
import ReportsPage from "@/pages/reports";
import SettingsPage from "@/pages/settings";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PortfolioProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Manager Routes (Dashboard Layout) */}
              <Route element={<DashboardLayout><Outlet /></DashboardLayout>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/properties/:id" element={<PropertyDetailPage />} />
                <Route path="/properties/:id/units/:unitId" element={<UnitDetailsPage />} />
                <Route path="/tenants" element={<TenantsPage />} />
                <Route path="/tenants/:id" element={<TenantDetailsPage />} />
                <Route path="/maintenance" element={<MaintenancePage />} />
                <Route path="/maintenance/:id" element={<RequestDetailPage />} />
                <Route path="/financials" element={<FinancialsPage />} />
                <Route path="/ledger" element={<GeneralLedgerPage />} />
                <Route path="/parties" element={<PartiesPage />} />
                <Route path="/journal-entries/new" element={<JournalEntryFormPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* Tenant Portal Routes (Portal Layout) */}
              <Route path="/portal" element={<PortalLayout><Outlet /></PortalLayout>}>
                <Route index element={<div className="p-4">Tenant Dashboard (Coming Soon)</div>} />
                <Route path="payments" element={<div className="p-4">Payment History (Coming Soon)</div>} />
                <Route path="maintenance" element={<div className="p-4">My Requests (Coming Soon)</div>} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PortfolioProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
