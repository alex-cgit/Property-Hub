import { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone,
  Plus,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { tenants, leases, units, properties } from "@/lib/mock-data";

export default function TenantsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getTenantLease = (tenantId: string) => leases.find(l => l.tenantId === tenantId);
  const getUnit = (unitId: string) => units.find(u => u.id === unitId);
  const getProperty = (propertyId: string) => properties.find(p => p.id === propertyId);

  const enrichedTenants = tenants.map(tenant => {
    const lease = getTenantLease(tenant.id);
    const unit = lease ? getUnit(lease.unitId) : null;
    const property = unit ? getProperty(unit.propertyId) : null;
    return { ...tenant, lease, unit, property };
  }).filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading">Tenants & Leases</h2>
          <p className="text-muted-foreground">
            Manage tenant information and lease agreements.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export List</Button>
          <Button className="bg-primary text-primary-foreground shadow-md">
            <Plus className="mr-2 h-4 w-4" /> Add Tenant
          </Button>
        </div>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">All Tenants</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-[250px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tenants..."
                  className="pl-9 h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/60">
                <TableHead>Tenant</TableHead>
                <TableHead>Property / Unit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Lease Ends</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrichedTenants.map((tenant) => (
                <TableRow key={tenant.id} className="group hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">{tenant.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{tenant.name}</span>
                        <span className="text-xs text-muted-foreground">ID: {tenant.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {tenant.property ? (
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{tenant.property.name}</span>
                        <span className="text-xs text-muted-foreground">Unit {tenant.unit?.unitNumber}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground italic">No active lease</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={tenant.status === "Active" ? "default" : "secondary"} className={tenant.status === "Active" ? "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-500/20" : ""}>
                      {tenant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    {tenant.lease ? (
                      <span className="text-sm">{new Date(tenant.lease.endDate).toLocaleDateString()}</span>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>View Lease</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Message</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Evict Tenant</DropdownMenuItem>
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
