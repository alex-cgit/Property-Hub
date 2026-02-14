import { Switch, Route } from "wouter";
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

function AppRouter() {
  return (
    <Layout>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/properties" component={PropertiesPage} />
        <Route path="/properties/:id" component={PropertyDetailPage} />
        <Route path="/tenants" component={TenantsPage} />
        <Route path="/maintenance" component={MaintenancePage} />
        <Route path="/maintenance/:id" component={RequestDetailPage} />
        <Route path="/financials" component={FinancialsPage} />
        <Route path="/ledger" component={GeneralLedgerPage} />
        <Route path="/parties" component={PartiesPage} />
        <Route path="/journal-entries/new" component={JournalEntryFormPage} />
        <Route path="/reports" component={ReportsPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/:rest*" component={AppRouter} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PortfolioProvider>
          <Toaster />
          <Router />
        </PortfolioProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
