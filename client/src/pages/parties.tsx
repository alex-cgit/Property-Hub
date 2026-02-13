import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Briefcase,
  User,
  Building,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Party {
  id: string;
  name: string;
  type: "Vendor" | "Customer" | "Tenant" | "Employee" | "Other";
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  balance: number;
}

const mockParties: Party[] = [
  { id: "p-1", name: "TechCool Services", type: "Vendor", email: "support@techcool.com", phone: "(555) 123-4567", status: "Active", balance: -800 },
  { id: "p-2", name: "City Utilities", type: "Vendor", email: "billing@city.gov", phone: "(555) 987-6543", status: "Active", balance: -150 },
  { id: "p-3", name: "Sarah Jenkins", type: "Tenant", email: "sarah.j@example.com", phone: "(555) 555-0123", status: "Active", balance: 0 },
  { id: "p-4", name: "Ace Plumbing", type: "Vendor", email: "contact@aceplumbing.com", phone: "(555) 555-0199", status: "Inactive", balance: 0 },
];

export default function PartiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredParties = mockParties.filter(party => {
    const matchesSearch = party.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          party.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || party.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getPartyIcon = (type: string) => {
    switch(type) {
      case "Vendor": return <Briefcase className="h-3 w-3" />;
      case "Tenant": return <User className="h-3 w-3" />;
      default: return <Building className="h-3 w-3" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch(type) {
      case "Vendor": return "bg-orange-500/10 text-orange-600 border-orange-200";
      case "Tenant": return "bg-green-500/10 text-green-600 border-green-200";
      case "Customer": return "bg-blue-500/10 text-blue-600 border-blue-200";
      default: return "bg-gray-500/10 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading uppercase">Parties</h2>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
            Manage vendors, tenants, and other entities
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground rounded-none px-6 uppercase tracking-widest text-[10px] font-bold">
          <Plus className="mr-2 h-3 w-3" /> Add Party
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4 border-b border-border/50 pb-4">
        <div className="flex items-center gap-2">
          <Button 
            variant={typeFilter === "all" ? "default" : "outline"} 
            onClick={() => setTypeFilter("all")}
            className="rounded-none h-7 text-[10px] uppercase tracking-widest"
          >
            All
          </Button>
          <Button 
            variant={typeFilter === "Vendor" ? "default" : "outline"} 
            onClick={() => setTypeFilter("Vendor")}
            className="rounded-none h-7 text-[10px] uppercase tracking-widest"
          >
            Vendors
          </Button>
          <Button 
            variant={typeFilter === "Tenant" ? "default" : "outline"} 
            onClick={() => setTypeFilter("Tenant")}
            className="rounded-none h-7 text-[10px] uppercase tracking-widest"
          >
            Tenants
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
            <Input 
              placeholder="SEARCH PARTIES..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7 h-8 text-[10px] rounded-none uppercase tracking-widest bg-muted/30 border-none" 
            />
          </div>
        </div>
      </div>

      <Card className="rounded-none border border-border/50 shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 w-[300px]">Name</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Type</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Contact</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Balance</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Status</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParties.map((party) => (
              <TableRow key={party.id} className="group hover:bg-muted/20 border-border/30">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-muted/50 flex items-center justify-center border border-border/50">
                      {getPartyIcon(party.type)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-tight">{party.name}</span>
                      <span className="text-[8px] text-muted-foreground uppercase tracking-widest">ID: {party.id}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <Badge variant="outline" className={`rounded-none uppercase tracking-widest text-[8px] font-bold ${getTypeBadgeColor(party.type)}`}>
                    {party.type}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="text-[10px]">{party.email}</span>
                    <span className="text-[8px] text-muted-foreground">{party.phone}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <span className={`font-mono text-xs ${party.balance < 0 ? "text-destructive" : ""}`}>
                    {party.balance < 0 ? `($${Math.abs(party.balance).toLocaleString()})` : `$${party.balance.toLocaleString()}`}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-right">
                   <Badge variant="outline" className={`rounded-none uppercase tracking-widest text-[8px] font-bold ${party.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                    {party.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-none border-border">
                      <DropdownMenuItem className="text-[10px] uppercase tracking-widest">Edit Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px] uppercase tracking-widest">View Statement</DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px] uppercase tracking-widest text-destructive">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
