import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone,
  Plus,
  FileText,
  User,
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tenants, leases, units, properties } from "@/lib/mock-data";

export default function TenantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [unitFilter, setUnitFilter] = useState("all");
  
  const navigate = useNavigate();

  const getTenantLease = (tenantId: string) => leases.find(l => l.tenantId === tenantId);
  const getUnit = (unitId: string) => units.find(u => u.id === unitId);
  const getProperty = (propertyId: string) => properties.find(p => p.id === propertyId);

  // Filter units based on selected property
  const filteredUnits = unitFilter !== "all" 
    ? units 
    : propertyFilter !== "all" 
      ? units.filter(u => u.propertyId === propertyFilter)
      : units;

  const enrichedTenants = tenants.map(tenant => {
    const lease = getTenantLease(tenant.id);
    const unit = lease ? getUnit(lease.unitId) : null;
    const property = unit ? getProperty(unit.propertyId) : null;
    return { ...tenant, lease, unit, property };
  }).filter(t => {
    // Search filter
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter (Tab)
    const matchesStatus = activeTab === "all" || 
                          (activeTab === "active" && t.status === "Active") ||
                          (activeTab === "past" && t.status === "Past") ||
                          (activeTab === "lead" && t.status === "Lead");

    // Property filter
    const matchesProperty = propertyFilter === "all" || t.property?.id === propertyFilter;

    // Unit filter
    const matchesUnit = unitFilter === "all" || t.unit?.id === unitFilter;

    return matchesSearch && matchesStatus && matchesProperty && matchesUnit;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading uppercase">Tenants & Leases</h2>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
            Manage tenant information and lease agreements
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-none uppercase tracking-widest text-[10px] font-bold">Export List</Button>
          <Button className="bg-primary text-primary-foreground rounded-none px-6 uppercase tracking-widest text-[10px] font-bold shadow-md">
            <Plus className="mr-2 h-3 w-3" /> Add Tenant
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-border/50 pb-4">
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList className="bg-transparent gap-6 h-auto p-0 w-full justify-start rounded-none">
            <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold">All Tenants</TabsTrigger>
            <TabsTrigger value="active" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold">Active</TabsTrigger>
            <TabsTrigger value="past" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold">Past</TabsTrigger>
            <TabsTrigger value="lead" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold">Leads</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
          {/* Property Filter */}
          <Select value={propertyFilter} onValueChange={(val) => {
            setPropertyFilter(val);
            setUnitFilter("all"); // Reset unit filter when property changes
          }}>
            <SelectTrigger className="w-full sm:w-[200px] h-8 rounded-none border-border/50 text-[10px] uppercase tracking-wider bg-background">
              <SelectValue placeholder="FILTER BY BUILDING" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-border">
              <SelectItem value="all" className="text-[10px] uppercase tracking-wider">All Buildings</SelectItem>
              {properties.map(p => (
                <SelectItem key={p.id} value={p.id} className="text-[10px] uppercase tracking-wider">{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Unit Filter */}
          <Select value={unitFilter} onValueChange={setUnitFilter} disabled={propertyFilter === "all"}>
            <SelectTrigger className="w-full sm:w-[150px] h-8 rounded-none border-border/50 text-[10px] uppercase tracking-wider bg-background">
              <SelectValue placeholder="FILTER BY UNIT" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-border">
              <SelectItem value="all" className="text-[10px] uppercase tracking-wider">All Units</SelectItem>
              {filteredUnits.map(u => (
                <SelectItem key={u.id} value={u.id} className="text-[10px] uppercase tracking-wider">Unit {u.unitNumber}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative w-full sm:w-[200px]">
            <Search className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="SEARCH..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7 h-8 text-[10px] rounded-none uppercase tracking-widest bg-muted/30 border-none"
            />
          </div>
        </div>
      </div>

      <Card className="rounded-none border border-border/50 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Tenant</TableHead>
                <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Property / Unit</TableHead>
                <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Status</TableHead>
                <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Contact</TableHead>
                <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Lease Ends</TableHead>
                <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrichedTenants.map((tenant) => (
                <TableRow 
                  key={tenant.id} 
                  className="group hover:bg-muted/20 border-border/30 cursor-pointer transition-colors"
                  onClick={() => navigate(`/tenants/${tenant.id}`)}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border rounded-none">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold rounded-none">{tenant.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-tight">{tenant.name}</span>
                        <span className="text-[8px] text-muted-foreground uppercase tracking-widest">ID: {tenant.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    {tenant.property ? (
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider">{tenant.property.name}</span>
                        <span className="text-[8px] text-muted-foreground uppercase tracking-widest">Unit {tenant.unit?.unitNumber}</span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-muted-foreground italic uppercase tracking-wider">No active lease</span>
                    )}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant="outline" className={`rounded-none uppercase tracking-widest text-[8px] font-bold ${
                      tenant.status === "Active" 
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-200" 
                        : tenant.status === "Lead"
                          ? "bg-blue-500/10 text-blue-600 border-blue-200"
                          : "bg-gray-100 text-gray-500 border-gray-200"
                    }`}>
                      {tenant.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary rounded-none">
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary rounded-none">
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    {tenant.lease ? (
                      <span className="text-[10px] font-mono">{new Date(tenant.lease.endDate).toLocaleDateString()}</span>
                    ) : (
                      <span className="text-[10px] text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-none border-border">
                        <DropdownMenuLabel className="text-[10px] uppercase tracking-widest">Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="text-[10px] uppercase tracking-widest">View Profile</DropdownMenuItem>
                        <DropdownMenuItem className="text-[10px] uppercase tracking-widest">View Lease</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-[10px] uppercase tracking-widest">Message</DropdownMenuItem>
                        <DropdownMenuItem className="text-[10px] uppercase tracking-widest text-destructive">Evict Tenant</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
