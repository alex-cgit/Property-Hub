import { useState } from "react";
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar,
  Printer,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { chartOfAccounts, financialStats } from "@/lib/mock-data";

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState("gl");

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading uppercase">Reports</h2>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
            Generate financial statements and audit logs
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-none uppercase tracking-widest text-[10px] font-bold">
            <Printer className="mr-2 h-3 w-3" /> Print
          </Button>
          <Button className="bg-primary text-primary-foreground rounded-none uppercase tracking-widest text-[10px] font-bold">
            <Download className="mr-2 h-3 w-3" /> Export PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="gl" className="w-full" onValueChange={setActiveReport}>
        <TabsList className="bg-transparent gap-6 h-auto p-0 border-b border-border/50 w-full justify-start rounded-none">
          <TabsTrigger value="gl" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold">Accounting</TabsTrigger>
          <TabsTrigger value="tb" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold">Trial Balance</TabsTrigger>
          <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold">Account Activity</TabsTrigger>
          <TabsTrigger value="audit" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold">Audit Trail</TabsTrigger>
        </TabsList>
        
        {/* Report Filters */}
        <div className="bg-muted/10 border-b border-border/50 p-4 grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="space-y-1">
            <label className="text-[8px] uppercase tracking-widest font-bold text-muted-foreground">Date Range</label>
            <div className="flex items-center gap-2">
              <Input type="date" className="h-8 rounded-none bg-background text-[10px]" />
              <span className="text-muted-foreground">-</span>
              <Input type="date" className="h-8 rounded-none bg-background text-[10px]" />
            </div>
          </div>
          <div className="space-y-1">
             <label className="text-[8px] uppercase tracking-widest font-bold text-muted-foreground">Filter By</label>
             <Select>
               <SelectTrigger className="h-8 rounded-none bg-background text-[10px] uppercase tracking-wide">
                 <SelectValue placeholder="ALL ACCOUNTS" />
               </SelectTrigger>
               <SelectContent className="rounded-none">
                 <SelectItem value="all">All Accounts</SelectItem>
                 <SelectItem value="assets">Assets Only</SelectItem>
                 <SelectItem value="liabilities">Liabilities Only</SelectItem>
               </SelectContent>
             </Select>
          </div>
          <div className="flex items-end">
            <Button variant="outline" className="h-8 w-full rounded-none uppercase tracking-widest text-[10px] font-bold bg-background">
              Run Report
            </Button>
          </div>
        </div>

        <TabsContent value="gl" className="mt-6 space-y-6">
          <div className="bg-card border border-border/50 p-8 min-h-[500px] shadow-sm">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold uppercase tracking-tight font-heading">Accounting Report</h3>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">As of {new Date().toLocaleDateString()}</p>
            </div>
            
            <div className="space-y-8">
              {chartOfAccounts.map(account => (
                <div key={account.id} className="space-y-3">
                  <div className="flex items-center justify-between border-b border-border/50 pb-2">
                    <div>
                      <span className="font-bold uppercase tracking-tight text-sm">{account.name}</span>
                      <span className="ml-2 text-[10px] text-muted-foreground uppercase tracking-widest font-mono">{account.code}</span>
                    </div>
                    <span className="font-mono text-xs font-bold">${account.balance.toLocaleString()}</span>
                  </div>
                  <table className="w-full">
                    <thead className="text-[8px] uppercase tracking-widest text-muted-foreground">
                      <tr>
                        <th className="text-left py-2 w-[15%]">Date</th>
                        <th className="text-left py-2 w-[45%]">Description</th>
                        <th className="text-left py-2 w-[15%]">Ref</th>
                        <th className="text-right py-2 w-[15%]">Amount</th>
                        <th className="text-right py-2 w-[10%]">Run Bal</th>
                      </tr>
                    </thead>
                    <tbody className="text-[10px] font-mono">
                      <tr className="border-b border-border/30 hover:bg-muted/10">
                        <td className="py-2">2023-10-01</td>
                        <td className="py-2 font-sans">Opening Balance</td>
                        <td className="py-2">OP-001</td>
                        <td className="py-2 text-right text-muted-foreground">-</td>
                        <td className="py-2 text-right">${account.balance.toLocaleString()}</td>
                      </tr>
                      {/* Placeholder for transactions */}
                      <tr className="border-b border-border/30 hover:bg-muted/10">
                        <td className="py-2">2023-10-15</td>
                        <td className="py-2 font-sans">Transaction Entry #123</td>
                        <td className="py-2">JE-123</td>
                        <td className="py-2 text-right">$1,200.00</td>
                        <td className="py-2 text-right">${(account.balance + 1200).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tb" className="mt-6">
          <div className="bg-card border border-border/50 p-8 min-h-[500px] shadow-sm">
             <div className="text-center mb-8">
              <h3 className="text-xl font-bold uppercase tracking-tight font-heading">Trial Balance</h3>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Period Ending {new Date().toLocaleDateString()}</p>
            </div>
            
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="text-left py-3 text-[10px] uppercase tracking-widest font-bold w-[60%]">Account</th>
                  <th className="text-right py-3 text-[10px] uppercase tracking-widest font-bold w-[20%]">Debit</th>
                  <th className="text-right py-3 text-[10px] uppercase tracking-widest font-bold w-[20%]">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {chartOfAccounts.map(account => {
                  const isDebit = ['Asset', 'Expense'].includes(account.type);
                  return (
                    <tr key={account.id} className="hover:bg-muted/10">
                      <td className="py-3">
                        <div className="flex flex-col">
                           <span className="text-xs font-bold uppercase tracking-tight">{account.name}</span>
                           <span className="text-[8px] text-muted-foreground font-mono">{account.code}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right font-mono text-xs">
                        {isDebit ? `$${account.balance.toLocaleString()}` : '-'}
                      </td>
                      <td className="py-3 text-right font-mono text-xs">
                        {!isDebit ? `$${account.balance.toLocaleString()}` : '-'}
                      </td>
                    </tr>
                  );
                })}
                <tr className="border-t-2 border-primary bg-muted/10 font-bold">
                  <td className="py-4 text-[10px] uppercase tracking-widest">Total</td>
                  <td className="py-4 text-right font-mono text-xs">$395,000.00</td>
                  <td className="py-4 text-right font-mono text-xs">$395,000.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
