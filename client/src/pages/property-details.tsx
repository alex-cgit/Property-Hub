import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { 
  Building2, 
  MapPin, 
  ArrowLeft,
  Users,
  Wrench,
  DollarSign,
  MoreHorizontal,
  ClipboardList
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { units, maintenanceRequests, tenants, leases } from "@/lib/mock-data";
import { usePortfolio } from "@/lib/portfolio-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function PropertyDetailPage() {
  const [match, params] = useRoute("/properties/:id");
  const [, setLocation] = useLocation();
  const { filteredProperties } = usePortfolio();
  const [activeTab, setActiveTab] = useState("units");

  // Debugging log
  // console.log("PropertyDetailPage params:", params);

  const propertyId = params && params.id;
  const property = filteredProperties.find(p => p.id === propertyId);

  if (!match || !property) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 p-8">
        <h2 className="text-xl font-heading font-bold uppercase tracking-widest">Property Not Found</h2>
        <p className="text-muted-foreground">The property you requested could not be found.</p>
        <Button onClick={() => setLocation("/properties")}>Return to Properties</Button>
      </div>
    );
  }

  const propertyUnits = units.filter(u => u.propertyId === property.id);
  const propertyRequests = maintenanceRequests.filter(m => m.propertyId === property.id);
  
  // Get active leases for this property's units
  const propertyUnitIds = propertyUnits.map(u => u.id);
  const propertyLeases = leases.filter(l => propertyUnitIds.includes(l.unitId) && l.status === "Active");
  
  // Get tenants from active leases
  const propertyTenantIds = propertyLeases.map(l => l.tenantId);
  const propertyTenants = tenants.filter(t => propertyTenantIds.includes(t.id));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          className="pl-0 hover:bg-transparent hover:text-primary gap-2"
          onClick={() => setLocation("/properties")}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Properties
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight font-heading uppercase">{property.name}</h1>
              <Badge variant="outline" className="rounded-none uppercase tracking-widest text-[10px]">{property.type}</Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {property.address}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-none uppercase tracking-widest text-[10px] font-bold">
              Edit Property
            </Button>
            <Button className="rounded-none uppercase tracking-widest text-[10px] font-bold">
              Financial Report
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="rounded-none border-border/50 bg-muted/20">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Total Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{propertyUnits.length}</div>
            <p className="text-[10px] text-muted-foreground mt-1">
              {propertyUnits.filter(u => u.status === "Vacant").length} Vacant
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/50 bg-muted/20">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold font-mono ${property.occupancyRate >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
              {property.occupancyRate}%
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Target: 95%</p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/50 bg-muted/20">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Open Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">
              {propertyRequests.filter(r => r.status !== "Completed").length}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              {propertyRequests.filter(r => r.priority === "High" && r.status !== "Completed").length} High Priority
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-border/50 bg-muted/20">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-emerald-600">
              ${propertyUnits.reduce((sum, u) => u.status === "Occupied" ? sum + u.rent : sum, 0).toLocaleString()}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Est. Potential: ${propertyUnits.reduce((sum, u) => sum + u.rent, 0).toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="units" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="bg-transparent gap-6 h-auto p-0 w-full justify-start rounded-none border-b border-border/50">
          <TabsTrigger value="units" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <Building2 className="h-4 w-4" /> Units
          </TabsTrigger>
          <TabsTrigger value="tenants" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <Users className="h-4 w-4" /> Tenants
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <Wrench className="h-4 w-4" /> Maintenance
          </TabsTrigger>
          <TabsTrigger value="financials" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <DollarSign className="h-4 w-4" /> Financials
          </TabsTrigger>
        </TabsList>

        {/* Units Tab */}
        <TabsContent value="units" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Card className="rounded-none border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 border-b border-border/50 py-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xs font-bold uppercase tracking-widest">Unit List</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Manage units and occupancy</CardDescription>
              </div>
              <Button size="sm" className="bg-primary text-primary-foreground rounded-none uppercase tracking-widest text-[10px] font-bold">
                Add Unit
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Unit</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Status</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Details</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Rent</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Size</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyUnits.map((unit) => (
                    <TableRow key={unit.id} className="group hover:bg-muted/20 border-border/30">
                      <TableCell className="py-3 font-medium text-xs">{unit.unitNumber}</TableCell>
                      <TableCell className="py-3">
                        <Badge variant="outline" className={`rounded-none uppercase tracking-widest text-[8px] border-0 
                          ${unit.status === 'Occupied' ? 'bg-emerald-500/10 text-emerald-600' : 
                            unit.status === 'Vacant' ? 'bg-destructive/10 text-destructive' : 
                            'bg-amber-500/10 text-amber-600'}`}>
                          {unit.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3 text-xs text-muted-foreground">{unit.bedrooms} Bed • {unit.bathrooms} Bath</TableCell>
                      <TableCell className="py-3 text-right text-xs font-mono">${unit.rent.toLocaleString()}</TableCell>
                      <TableCell className="py-3 text-right text-xs font-mono">{unit.size} sqft</TableCell>
                      <TableCell className="py-3 text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-none"><MoreHorizontal className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tenants Tab */}
        <TabsContent value="tenants" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
           <Card className="rounded-none border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Active Tenants</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Name</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Unit</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Lease Dates</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Contact</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyLeases.map((lease) => {
                    const tenant = tenants.find(t => t.id === lease.tenantId);
                    const unit = units.find(u => u.id === lease.unitId);
                    if (!tenant) return null;
                    return (
                      <TableRow key={lease.id} className="group hover:bg-muted/20 border-border/30">
                        <TableCell className="py-3 font-medium text-xs">{tenant.name}</TableCell>
                        <TableCell className="py-3 text-xs">{unit?.unitNumber}</TableCell>
                        <TableCell className="py-3 text-xs text-muted-foreground">{lease.startDate} - {lease.endDate}</TableCell>
                        <TableCell className="py-3 text-xs text-muted-foreground">{tenant.email}</TableCell>
                        <TableCell className="py-3 text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-none"><MoreHorizontal className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {propertyLeases.length === 0 && (
                     <TableRow>
                       <TableCell colSpan={5} className="text-center py-6 text-xs text-muted-foreground uppercase tracking-widest">No active tenants found</TableCell>
                     </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Card className="rounded-none border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 border-b border-border/50 py-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Maintenance Requests</CardTitle>
              <Button size="sm" variant="outline" className="rounded-none text-[10px] uppercase tracking-widest h-7">View All Requests</Button>
            </CardHeader>
            <CardContent className="p-0">
               <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Task</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Unit</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Status</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Priority</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyRequests.map((req) => {
                     const unit = units.find(u => u.id === req.unitId);
                     return (
                      <TableRow key={req.id} className="group hover:bg-muted/20 border-border/30">
                        <TableCell className="py-3">
                          <div className="flex flex-col">
                            <span className="font-medium text-xs">{req.title}</span>
                            <span className="text-[10px] text-muted-foreground">{req.category}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 text-xs">{unit?.unitNumber || "General"}</TableCell>
                        <TableCell className="py-3">
                          <Badge variant="outline" className="rounded-none text-[8px] uppercase tracking-widest">{req.status}</Badge>
                        </TableCell>
                        <TableCell className="py-3">
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${req.priority === 'High' ? 'text-destructive' : 'text-muted-foreground'}`}>
                            {req.priority}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 text-right text-xs text-muted-foreground">{req.dateReported}</TableCell>
                      </TableRow>
                     );
                  })}
                  {propertyRequests.length === 0 && (
                     <TableRow>
                       <TableCell colSpan={5} className="text-center py-6 text-xs text-muted-foreground uppercase tracking-widest">No maintenance requests found</TableCell>
                     </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Financials Tab */}
        <TabsContent value="financials" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
           <div className="grid grid-cols-1 gap-6">
              <Card className="rounded-none border-border/50 shadow-sm">
                 <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
                   <CardTitle className="text-xs font-bold uppercase tracking-widest">Rent Collection Status</CardTitle>
                 </CardHeader>
                 <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent border-border/50">
                           <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Unit</TableHead>
                           <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Tenant</TableHead>
                           <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Rent Amount</TableHead>
                           <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {propertyUnits.filter(u => u.status === "Occupied").map(unit => {
                          const lease = leases.find(l => l.unitId === unit.id && l.status === "Active");
                          const tenant = tenants.find(t => t.id === lease?.tenantId);
                          return (
                            <TableRow key={unit.id} className="group hover:bg-muted/20 border-border/30">
                               <TableCell className="py-3 text-xs font-medium">{unit.unitNumber}</TableCell>
                               <TableCell className="py-3 text-xs text-muted-foreground">{tenant?.name || "Unknown"}</TableCell>
                               <TableCell className="py-3 text-right text-xs font-mono">${unit.rent.toLocaleString()}</TableCell>
                               <TableCell className="py-3 text-right">
                                  <Badge variant="outline" className="rounded-none text-[8px] uppercase tracking-widest bg-emerald-500/10 text-emerald-600 border-0">Paid</Badge>
                               </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                 </CardContent>
              </Card>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
