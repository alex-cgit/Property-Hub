import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard, 
  FileText, 
  ArrowLeft,
  Building2,
  History,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tenants, leases, units, properties, maintenanceRequests } from "@/lib/mock-data";

export default function TenantDetailsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const tenantId = params?.id;
  const tenant = tenants.find(t => t.id === tenantId);

  if (!tenant) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 p-8">
        <h2 className="text-xl font-heading font-bold uppercase tracking-widest">Tenant Not Found</h2>
        <p className="text-muted-foreground">The tenant you requested could not be found.</p>
        <Button onClick={() => navigate("/tenants")}>Return to Tenants List</Button>
      </div>
    );
  }

  // Related Data
  const tenantLeases = leases.filter(l => l.tenantId === tenant.id);
  const activeLease = tenantLeases.find(l => l.status === "Active");
  const activeUnit = activeLease ? units.find(u => u.id === activeLease.unitId) : null;
  const activeProperty = activeUnit ? properties.find(p => p.id === activeUnit.propertyId) : null;
  
  // Requests created by this tenant (approximated by matching unit)
  const tenantRequests = activeUnit 
    ? maintenanceRequests.filter(m => m.unitId === activeUnit.id) 
    : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          className="pl-0 hover:bg-transparent hover:text-primary gap-2"
          onClick={() => navigate("/tenants")}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Tenants
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border border-border rounded-none">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl rounded-none">{tenant.avatar}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight font-heading uppercase">{tenant.name}</h1>
                <Badge variant="outline" className={`rounded-none uppercase tracking-widest text-[10px] border-0 
                  ${tenant.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-muted text-muted-foreground'}`}>
                  {tenant.status}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground gap-4">
                <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {tenant.email}</span>
                <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {tenant.phone}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-none uppercase tracking-widest text-[10px] font-bold">
              Edit Profile
            </Button>
            <Button className="rounded-none uppercase tracking-widest text-[10px] font-bold">
              Message
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="bg-transparent gap-6 h-auto p-0 w-full justify-start rounded-none border-b border-border/50">
          <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <User className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="leases" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <FileText className="h-4 w-4" /> Leases & Docs
          </TabsTrigger>
          <TabsTrigger value="financials" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Payment History
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Current Residence Card */}
            <Card className="md:col-span-2 rounded-none border-border/50 shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-widest">Current Residence</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {activeLease && activeUnit && activeProperty ? (
                  <div className="flex items-start gap-6">
                    <div className="h-20 w-20 bg-muted rounded-none overflow-hidden shrink-0">
                      <img src={activeProperty.image} alt={activeProperty.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="text-lg font-bold cursor-pointer hover:text-primary transition-colors" 
                            onClick={() => navigate(`/properties/${activeProperty.id}/units/${activeUnit.id}`)}>
                          {activeProperty.name} - Unit {activeUnit.unitNumber}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" /> {activeProperty.address}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Lease Start</div>
                          <div className="font-medium text-sm">{activeLease.startDate}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Lease End</div>
                          <div className="font-medium text-sm">{activeLease.endDate}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Monthly Rent</div>
                          <div className="font-medium text-sm">${activeLease.rentAmount.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Deposit</div>
                          <div className="font-medium text-sm">$2,000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-muted-foreground text-sm mb-4">No active residence found.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions / Contact */}
            <Card className="rounded-none border-border/50 shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-widest">Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{tenant.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{tenant.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Preferred: Email</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2">Emergency Contact</h4>
                  <p className="text-sm font-medium">Jane Doe (Sister)</p>
                  <p className="text-sm text-muted-foreground">(555) 999-8888</p>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Maintenance Requests */}
          <Card className="rounded-none border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Recent Maintenance Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Task</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Status</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenantRequests.map(req => (
                    <TableRow key={req.id} className="group hover:bg-muted/20 border-border/30 cursor-pointer" onClick={() => navigate(`/maintenance/${req.id}`)}>
                      <TableCell className="py-3 font-medium text-xs">{req.title}</TableCell>
                      <TableCell className="py-3">
                        <Badge variant="outline" className="rounded-none text-[8px] uppercase tracking-widest">{req.status}</Badge>
                      </TableCell>
                      <TableCell className="py-3 text-xs text-muted-foreground">{req.dateReported}</TableCell>
                    </TableRow>
                  ))}
                  {tenantRequests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6 text-xs text-muted-foreground uppercase tracking-widest">No recent requests</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leases Tab */}
        <TabsContent value="leases" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Card className="rounded-none border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Lease History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Property</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Term</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Rent</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Status</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Documents</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenantLeases.map(lease => {
                    const unit = units.find(u => u.id === lease.unitId);
                    const property = unit ? properties.find(p => p.id === unit.propertyId) : null;
                    return (
                      <TableRow key={lease.id} className="group hover:bg-muted/20 border-border/30">
                        <TableCell className="py-3 font-medium text-xs">
                          {property?.name} - Unit {unit?.unitNumber}
                        </TableCell>
                        <TableCell className="py-3 text-xs text-muted-foreground">
                          {lease.startDate} - {lease.endDate}
                        </TableCell>
                        <TableCell className="py-3 text-xs font-mono">${lease.rentAmount.toLocaleString()}</TableCell>
                        <TableCell className="py-3">
                           <Badge variant="outline" className={`rounded-none uppercase tracking-widest text-[8px] border-0 
                            ${lease.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-muted text-muted-foreground'}`}>
                            {lease.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3 text-right">
                          <Button variant="ghost" size="sm" className="h-6 text-[10px] uppercase tracking-widest rounded-none gap-1">
                            <FileText className="h-3 w-3" /> View PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Financials Tab Placeholder */}
        <TabsContent value="financials" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
           <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-lg bg-muted/10">
             <CreditCard className="h-10 w-10 text-muted-foreground mb-4 opacity-50" />
             <h3 className="text-lg font-bold">Payment History</h3>
             <p className="text-muted-foreground text-sm max-w-sm mt-2">
               Payment history and ledger details would be displayed here.
             </p>
           </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
