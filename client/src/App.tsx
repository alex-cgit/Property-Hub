import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PortfolioProvider } from "@/lib/portfolio-context";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout";
import Dashboard from "@/pages/dashboard";
import LandingPage from "@/pages/landing";
import PropertiesPage from "@/pages/properties";
import PropertyDetailPage from "@/pages/property-details";
import TenantsPage from "@/pages/tenants";
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
              <Route path="/" element={<LandingPage />} />
              
              {/* Dashboard & App Routes wrapped in Layout */}
              <Route element={<Layout><OutletLayout /></Layout>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/properties/:id" element={<PropertyDetailPage />} />
                <Route path="/tenants" element={<TenantsPage />} />
                <Route path="/maintenance" element={<MaintenancePage />} />
                <Route path="/maintenance/:id" element={<RequestDetailPage />} />
                <Route path="/financials" element={<FinancialsPage />} />
                <Route path="/ledger" element={<GeneralLedgerPage />} />
                <Route path="/parties" element={<PartiesPage />} />
                <Route path="/journal-entries/new" element={<JournalEntryFormPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PortfolioProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

// Helper component to render outlet
import { Outlet } from "react-router-dom";
const OutletLayout = () => <Outlet />;

export default App;
