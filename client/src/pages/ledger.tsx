import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowLeftRight, 
  Receipt, 
  CreditCard, 
  FileSpreadsheet,
  ChevronRight,
  ChevronDown,
  Split
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { chartOfAccounts, journalEntries } from "@/lib/mock-data";

export default function GeneralLedgerPage() {
  const [activeTab, setActiveTab] = useState("journal");

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading uppercase">Accounting</h2>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
            Double-entry accounting & GAAP compliant financials
          </p>
        </div>
        <div className="flex gap-2">
          <NewJournalEntryDialog />
          <Button className="bg-primary text-primary-foreground rounded-none px-6 uppercase tracking-widest text-[10px] font-bold">
            <Receipt className="mr-2 h-3 w-3" /> Record Invoice
          </Button>
        </div>
      </div>

      <Tabs defaultValue="journal" className="w-full" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between border-b border-border/50 pb-2">
          <TabsList className="bg-transparent gap-8 h-auto p-0">
            <TabsTrigger value="journal" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-2 text-[10px] uppercase tracking-widest font-bold">Journal Entries</TabsTrigger>
            <TabsTrigger value="accounts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-2 text-[10px] uppercase tracking-widest font-bold">Chart of Accounts</TabsTrigger>
            <TabsTrigger value="ledger" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-2 text-[10px] uppercase tracking-widest font-bold">Account Ledger</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative w-48">
              <Search className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-7 h-8 text-[10px] rounded-none uppercase tracking-widest bg-muted/30 border-none" />
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-none border-border/50">
              <Filter className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <TabsContent value="journal" className="mt-6">
          <JournalTable />
        </TabsContent>
        
        <TabsContent value="accounts" className="mt-6">
          <AccountsGrid />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function JournalTable() {
  return (
    <div className="border border-border/50">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Date</TableHead>
            <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Description</TableHead>
            <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Reference</TableHead>
            <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Account</TableHead>
            <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Debit</TableHead>
            <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Credit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {journalEntries.map((entry) => (
            <>
              {entry.lines.map((line, idx) => (
                <TableRow key={`${entry.id}-${idx}`} className="group hover:bg-muted/20 border-border/30">
                  <TableCell className="text-[10px] py-4">{idx === 0 ? entry.date : ""}</TableCell>
                  <TableCell className="text-[10px] py-4">
                    {idx === 0 ? (
                      <div className="flex flex-col">
                        <span className="font-bold uppercase tracking-tight">{entry.description}</span>
                        <span className="text-muted-foreground text-[8px] uppercase tracking-widest">ID: {entry.id}</span>
                      </div>
                    ) : ""}
                  </TableCell>
                  <TableCell className="text-[10px] py-4">{idx === 0 ? entry.reference : ""}</TableCell>
                  <TableCell className="text-[10px] py-4 uppercase tracking-wider font-medium">
                    {chartOfAccounts.find(a => a.id === line.accountId)?.name}
                  </TableCell>
                  <TableCell className="text-[10px] py-4 text-right font-mono tabular-nums">
                    {line.debit > 0 ? `$${line.debit.toLocaleString()}` : "-"}
                  </TableCell>
                  <TableCell className="text-[10px] py-4 text-right font-mono tabular-nums">
                    {line.credit > 0 ? `$${line.credit.toLocaleString()}` : "-"}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="h-2 hover:bg-transparent border-none">
                <TableCell colSpan={6} className="p-0"></TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function AccountsGrid() {
  const types = ["Asset", "Liability", "Equity", "Revenue", "Expense"];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {types.map(type => (
        <Card key={type} className="rounded-none border-border/50">
          <CardHeader className="bg-muted/30 py-3">
            <CardTitle className="text-[10px] uppercase tracking-[0.2em] font-bold">{type}s</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {chartOfAccounts.filter(a => a.type === type).map(account => (
                <div key={account.id} className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-tight">{account.name}</span>
                    <span className="text-[8px] text-muted-foreground uppercase tracking-widest">Code: {account.code}</span>
                  </div>
                  <span className="font-mono text-[10px] font-medium">
                    ${account.balance.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function NewJournalEntryDialog() {
  const navigate = useNavigate();
  
  return (
    <Button 
      variant="outline" 
      className="rounded-none border-border/50 uppercase tracking-widest text-[10px] font-bold"
      onClick={() => navigate("/journal-entries/new")}
    >
      <Plus className="mr-2 h-3 w-3" /> New Entry
    </Button>
  );
}
