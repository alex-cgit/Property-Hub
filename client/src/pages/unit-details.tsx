import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Building2, 
  MapPin, 
  ArrowLeft,
  Users,
  Wrench,
  DollarSign,
  MoreHorizontal,
  ClipboardList,
  Bed,
  Bath,
  Square,
  FileText
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
import { units, maintenanceRequests, tenants, leases, properties } from "@/lib/mock-data";

export default function UnitDetailsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const propertyId = params?.id;
  const unitId = params?.unitId;

  const property = properties.find(p => p.id === propertyId);
  const unit = units.find(u => u.id === unitId);

  if (!property || !unit) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 p-8">
        <h2 className="text-xl font-heading font-bold uppercase tracking-widest">Unit Not Found</h2>
        <p className="text-muted-foreground">The unit you requested could not be found.</p>
        <Button onClick={() => navigate(`/properties/${propertyId}`)}>Back to Property</Button>
      </div>
    );
  }

  // Get related data
  const unitRequests = maintenanceRequests.filter(m => m.unitId === unit.id);
  const currentLease = leases.find(l => l.unitId === unit.id && l.status === "Active");
  const currentTenant = currentLease ? tenants.find(t => t.id === currentLease.tenantId) : null;
  const leaseHistory = leases.filter(l => l.unitId === unit.id && l.status !== "Active");

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          className="pl-0 hover:bg-transparent hover:text-primary gap-2"
          onClick={() => navigate(`/properties/${propertyId}`)}
        >
          <ArrowLeft className="h-4 w-4" /> Back to {property.name}
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight font-heading uppercase">Unit {unit.unitNumber}</h1>
              <Badge variant="outline" className={`rounded-none uppercase tracking-widest text-[10px] border-0 
                ${unit.status === 'Occupied' ? 'bg-emerald-500/10 text-emerald-600' : 
                  unit.status === 'Vacant' ? 'bg-destructive/10 text-destructive' : 
                  'bg-amber-500/10 text-amber-600'}`}>
                {unit.status}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Building2 className="h-4 w-4 mr-1" />
              {property.name} • {property.address}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-none uppercase tracking-widest text-[10px] font-bold">
              Edit Unit
            </Button>
            <Button className="rounded-none uppercase tracking-widest text-[10px] font-bold">
              Create Lease
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="rounded-none border-border/50 bg-muted/20">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-1"><Bed className="h-4 w-4" /> {unit.bedrooms} Bed</div>
              <div className="flex items-center gap-1"><Bath className="h-4 w-4" /> {unit.bathrooms} Bath</div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">{unit.size} sqft</p>
          </CardContent>
        </Card>
        
        <Card className="rounded-none border-border/50 bg-muted/20">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Current Rent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">${unit.rent.toLocaleString()}</div>
            <p className="text-[10px] text-muted-foreground mt-1">/ month</p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-border/50 bg-muted/20">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Tenant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold truncate">
              {currentTenant ? currentTenant.name : "No Tenant"}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              {currentLease ? `Lease ends ${currentLease.endDate}` : "Vacant"}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-border/50 bg-muted/20">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">
              {unitRequests.filter(r => r.status !== "Completed").length}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Open Requests</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="bg-transparent gap-6 h-auto p-0 w-full justify-start rounded-none border-b border-border/50">
          <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <ClipboardList className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="tenant" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <Users className="h-4 w-4" /> Tenant Info
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <Wrench className="h-4 w-4" /> Maintenance
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <FileText className="h-4 w-4" /> Lease History
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-none border-border/50 shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-widest">Unit Specs</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Unit Number</div>
                    <div className="font-medium">{unit.unitNumber}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Floor Plan</div>
                    <div className="font-medium">{unit.bedrooms}B/{unit.bathrooms}B</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Square Footage</div>
                    <div className="font-medium">{unit.size} sqft</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Market Rent</div>
                    <div className="font-medium">${unit.rent.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-none border-border/50 shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-widest">Current Status</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {currentLease ? (
                   <div className="space-y-4">
                     <div className="flex justify-between items-center">
                       <span className="text-sm font-medium">Lease Status</span>
                       <Badge variant="outline" className="rounded-none text-[10px] uppercase tracking-widest bg-emerald-500/10 text-emerald-600 border-0">Active</Badge>
                     </div>
                     <div className="flex justify-between items-center">
                       <span className="text-sm font-medium">Lease Term</span>
                       <span className="text-sm text-muted-foreground">{currentLease.startDate} - {currentLease.endDate}</span>
                     </div>
                     <div className="flex justify-between items-center">
                       <span className="text-sm font-medium">Monthly Rent</span>
                       <span className="text-sm font-mono">${currentLease.rentAmount.toLocaleString()}</span>
                     </div>
                   </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <p className="text-muted-foreground text-sm mb-4">This unit is currently vacant.</p>
                    <Button size="sm" className="rounded-none uppercase tracking-widest text-[10px] font-bold">Create New Lease</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Card className="rounded-none border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 border-b border-border/50 py-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Maintenance History</CardTitle>
              <Button size="sm" className="rounded-none uppercase tracking-widest text-[10px] font-bold">New Request</Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Title</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Status</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Priority</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unitRequests.map((req) => (
                    <TableRow key={req.id} className="group hover:bg-muted/20 border-border/30 cursor-pointer" onClick={() => navigate(`/maintenance/${req.id}`)}>
                      <TableCell className="py-3 font-medium text-xs">{req.title}</TableCell>
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
                  ))}
                  {unitRequests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-xs text-muted-foreground uppercase tracking-widest">No maintenance requests found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other tabs can be implemented similarly */}
        <TabsContent value="tenant" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
           {currentTenant ? (
             <Card className="rounded-none border-border/50 shadow-sm">
               <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
                 <CardTitle className="text-xs font-bold uppercase tracking-widest">Tenant Details</CardTitle>
               </CardHeader>
               <CardContent className="p-6">
                 <div className="flex items-start gap-6">
                   <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                     {currentTenant.avatar}
                   </div>
                   <div className="space-y-4 flex-1">
                     <div>
                       <h3 className="text-lg font-bold">{currentTenant.name}</h3>
                       <Badge variant="outline" className="rounded-none text-[10px] uppercase tracking-widest bg-emerald-500/10 text-emerald-600 border-0 mt-1">Active Tenant</Badge>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                         <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Email</div>
                         <div className="text-sm">{currentTenant.email}</div>
                       </div>
                       <div>
                         <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Phone</div>
                         <div className="text-sm">{currentTenant.phone}</div>
                       </div>
                     </div>
                   </div>
                 </div>
               </CardContent>
             </Card>
           ) : (
             <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-lg">
               <p className="text-muted-foreground text-sm mb-4">No active tenant for this unit.</p>
             </div>
           )}
        </TabsContent>

        <TabsContent value="history" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
           <Card className="rounded-none border-border/50 shadow-sm">
             <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
               <CardTitle className="text-xs font-bold uppercase tracking-widest">Lease History</CardTitle>
             </CardHeader>
             <CardContent className="p-0">
               <Table>
                 <TableHeader>
                   <TableRow className="hover:bg-transparent border-border/50">
                     <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Tenant</TableHead>
                     <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Start Date</TableHead>
                     <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">End Date</TableHead>
                     <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Rent</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {leaseHistory.map((lease) => {
                     const tenant = tenants.find(t => t.id === lease.tenantId);
                     return (
                       <TableRow key={lease.id} className="group hover:bg-muted/20 border-border/30">
                         <TableCell className="py-3 font-medium text-xs">{tenant?.name || "Unknown"}</TableCell>
                         <TableCell className="py-3 text-xs text-muted-foreground">{lease.startDate}</TableCell>
                         <TableCell className="py-3 text-xs text-muted-foreground">{lease.endDate}</TableCell>
                         <TableCell className="py-3 text-right text-xs font-mono">${lease.rentAmount.toLocaleString()}</TableCell>
                       </TableRow>
                     );
                   })}
                   {leaseHistory.length === 0 && (
                     <TableRow>
                       <TableCell colSpan={4} className="text-center py-6 text-xs text-muted-foreground uppercase tracking-widest">No lease history found</TableCell>
                     </TableRow>
                   )}
                 </TableBody>
               </Table>
             </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
