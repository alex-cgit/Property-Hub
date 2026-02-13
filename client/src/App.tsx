import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout";
import Dashboard from "@/pages/dashboard";
import PropertiesPage from "@/pages/properties";
import TenantsPage from "@/pages/tenants";
import MaintenancePage from "@/pages/maintenance";
import FinancialsPage from "@/pages/financials";
import GeneralLedgerPage from "@/pages/ledger";
import PartiesPage from "@/pages/parties";
import JournalEntryFormPage from "@/pages/journal-entry-form";
import ReportsPage from "@/pages/reports";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/properties" component={PropertiesPage} />
        <Route path="/tenants" component={TenantsPage} />
        <Route path="/maintenance" component={MaintenancePage} />
        <Route path="/financials" component={FinancialsPage} />
        <Route path="/ledger" component={GeneralLedgerPage} />
        <Route path="/parties" component={PartiesPage} />
        <Route path="/journal-entries/new" component={JournalEntryFormPage} />
        <Route path="/reports" component={ReportsPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
