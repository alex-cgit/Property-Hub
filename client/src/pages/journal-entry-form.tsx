import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Save, 
  Paperclip, 
  Trash2, 
  Plus,
  Split,
  Calendar,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chartOfAccounts, parties } from "@/lib/mock-data";

export default function JournalEntryFormPage() {
  const navigate = useNavigate();
  const [lines, setLines] = useState([
    { id: 1, accountId: "", partyId: "", description: "", debit: 0, credit: 0 },
    { id: 2, accountId: "", partyId: "", description: "", debit: 0, credit: 0 },
  ]);

  const addLine = () => {
    setLines([...lines, { id: Date.now(), accountId: "", partyId: "", description: "", debit: 0, credit: 0 }]);
  };

  const removeLine = (id: number) => {
    if (lines.length > 2) {
      setLines(lines.filter(l => l.id !== id));
    }
  };

  const totalDebits = lines.reduce((sum, line) => sum + (Number(line.debit) || 0), 0);
  const totalCredits = lines.reduce((sum, line) => sum + (Number(line.credit) || 0), 0);
  const isBalanced = Math.abs(totalDebits - totalCredits) < 0.01;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/ledger")} className="rounded-none">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight font-heading uppercase">New Journal Entry</h2>
              <span className="bg-muted px-2 py-0.5 text-[10px] uppercase tracking-widest font-bold text-muted-foreground border border-border">Draft</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
              ENTRY #JE-2024-001
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-none uppercase tracking-widest text-[10px] font-bold" onClick={() => navigate("/ledger")}>
            Cancel
          </Button>
          <Button variant="outline" className="rounded-none uppercase tracking-widest text-[10px] font-bold">
            <Save className="mr-2 h-3 w-3" /> Save Draft
          </Button>
          <Button 
            className="bg-primary text-primary-foreground rounded-none uppercase tracking-widest text-[10px] font-bold px-6"
            disabled={!isBalanced || totalDebits === 0}
            onClick={() => navigate("/ledger")}
          >
            Post Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Entry Details */}
          <Card className="rounded-none border border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 py-3 border-b border-border/50">
              <CardTitle className="text-[10px] uppercase tracking-[0.2em] font-bold flex items-center">
                <FileText className="mr-2 h-3 w-3" /> Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[8px] uppercase tracking-widest font-bold">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="date" className="rounded-none pl-9" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] uppercase tracking-widest font-bold">Reference #</label>
                  <Input placeholder="E.g. INV-001" className="rounded-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[8px] uppercase tracking-widest font-bold">Description</label>
                <Textarea placeholder="Describe the transaction..." className="rounded-none resize-none h-20" />
              </div>
            </CardContent>
          </Card>

          {/* Journal Lines */}
          <Card className="rounded-none border border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 py-3 border-b border-border/50 flex flex-row items-center justify-between">
              <CardTitle className="text-[10px] uppercase tracking-[0.2em] font-bold flex items-center">
                <Split className="mr-2 h-3 w-3" /> Journal Lines
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/10 border-b border-border/50">
                    <tr>
                      <th className="text-[8px] uppercase tracking-widest font-bold text-left p-3 w-[25%]">Account</th>
                      <th className="text-[8px] uppercase tracking-widest font-bold text-left p-3 w-[20%]">Party</th>
                      <th className="text-[8px] uppercase tracking-widest font-bold text-left p-3 w-[25%]">Description</th>
                      <th className="text-[8px] uppercase tracking-widest font-bold text-right p-3 w-[12.5%]">Debit</th>
                      <th className="text-[8px] uppercase tracking-widest font-bold text-right p-3 w-[12.5%]">Credit</th>
                      <th className="w-[5%]"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {lines.map((line, index) => (
                      <tr key={line.id} className="group hover:bg-muted/10 transition-colors">
                        <td className="p-2">
                          <Select 
                            value={line.accountId} 
                            onValueChange={(val) => {
                              const newLines = [...lines];
                              newLines[index].accountId = val;
                              setLines(newLines);
                            }}
                          >
                            <SelectTrigger className="w-full rounded-none border-border/50 h-9 text-[10px] uppercase tracking-wider">
                              <SelectValue placeholder="SELECT ACCOUNT" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none">
                              {chartOfAccounts.map(acc => (
                                <SelectItem key={acc.id} value={acc.id} className="text-[10px] uppercase tracking-wider">
                                  <span className="font-bold mr-2">{acc.code}</span> {acc.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-2">
                           <Select 
                            value={line.partyId} 
                            onValueChange={(val) => {
                              const newLines = [...lines];
                              newLines[index].partyId = val;
                              setLines(newLines);
                            }}
                          >
                            <SelectTrigger className="w-full rounded-none border-border/50 h-9 text-[10px] uppercase tracking-wider">
                              <SelectValue placeholder="SELECT PARTY" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none">
                              <SelectItem value="none" className="text-[10px] uppercase tracking-wider text-muted-foreground">None</SelectItem>
                              {parties.map(party => (
                                <SelectItem key={party.id} value={party.id} className="text-[10px] uppercase tracking-wider">
                                  {party.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-2">
                          <Input 
                            className="rounded-none border-border/50 h-9 text-[10px]" 
                            placeholder="Line description..." 
                            value={line.description}
                            onChange={(e) => {
                              const newLines = [...lines];
                              newLines[index].description = e.target.value;
                              setLines(newLines);
                            }}
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            className="rounded-none border-border/50 h-9 text-[10px] text-right font-mono" 
                            placeholder="0.00" 
                            type="number"
                            min="0"
                            step="0.01"
                            onChange={(e) => {
                              const newLines = [...lines];
                              newLines[index].debit = parseFloat(e.target.value) || 0;
                              newLines[index].credit = 0; // Clear credit if debit entered
                              setLines(newLines);
                            }}
                            value={line.debit || ""}
                          />
                        </td>
                        <td className="p-2">
                          <Input 
                            className="rounded-none border-border/50 h-9 text-[10px] text-right font-mono" 
                            placeholder="0.00"
                            type="number"
                            min="0"
                            step="0.01"
                            onChange={(e) => {
                              const newLines = [...lines];
                              newLines[index].credit = parseFloat(e.target.value) || 0;
                              newLines[index].debit = 0; // Clear debit if credit entered
                              setLines(newLines);
                            }}
                            value={line.credit || ""}
                          />
                        </td>
                        <td className="p-2 text-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeLine(line.id)}
                            disabled={lines.length <= 2}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 border-t border-border/50 bg-muted/10">
                <Button variant="ghost" className="rounded-none text-[10px] uppercase tracking-widest font-bold h-8" onClick={addLine}>
                  <Plus className="mr-2 h-3 w-3" /> Add Line
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6">
          <Card className="rounded-none border border-border/50 shadow-sm sticky top-24">
            <CardHeader className="bg-muted/30 py-3 border-b border-border/50">
              <CardTitle className="text-[10px] uppercase tracking-[0.2em] font-bold">Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground uppercase tracking-wider text-[10px]">Total Debits</span>
                <span className="font-mono font-medium">${totalDebits.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground uppercase tracking-wider text-[10px]">Total Credits</span>
                <span className="font-mono font-medium">${totalCredits.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-border my-2 pt-2 flex justify-between items-center">
                <span className="uppercase tracking-wider text-[10px] font-bold">Difference</span>
                <span className={`font-mono font-bold ${isBalanced ? 'text-emerald-600' : 'text-destructive'}`}>
                  ${Math.abs(totalDebits - totalCredits).toFixed(2)}
                </span>
              </div>

              {!isBalanced && (
                <div className="bg-destructive/10 border border-destructive/20 p-3 text-destructive text-[10px] uppercase tracking-wide font-bold text-center">
                  Entry is not balanced
                </div>
              )}
               {isBalanced && totalDebits > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 text-emerald-600 text-[10px] uppercase tracking-wide font-bold text-center flex items-center justify-center gap-2">
                  Balanced
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-none border border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 py-3 border-b border-border/50">
              <CardTitle className="text-[10px] uppercase tracking-[0.2em] font-bold flex items-center">
                <Paperclip className="mr-2 h-3 w-3" /> Attachments
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="border-2 border-dashed border-border/50 p-6 text-center hover:bg-muted/10 transition-colors cursor-pointer">
                <div className="mx-auto h-8 w-8 text-muted-foreground mb-2">
                  <Plus className="h-full w-full" />
                </div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  Upload Files
                </p>
                <p className="text-[8px] text-muted-foreground mt-1">
                  PDF, PNG, JPG up to 10MB
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
