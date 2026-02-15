import { useState } from "react";
import { 
  Settings, 
  Users, 
  FileText, 
  CheckSquare, 
  BookOpen, 
  Building2, 
  Save,
  Plus,
  Trash2,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePortfolio } from "@/lib/portfolio-context";
import { portfolios } from "@/lib/mock-data";

import { DocumentationViewer } from "@/components/documentation-viewer";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const { selectedPortfolioId } = usePortfolio();
  const selectedPortfolio = portfolios.find(p => p.id === selectedPortfolioId);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading uppercase">Configuration</h2>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
            System administration and settings
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="bg-transparent gap-6 h-auto p-0 w-full justify-start rounded-none border-b border-border/50">
          <TabsTrigger value="general" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <Building2 className="h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger value="properties" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <Building2 className="h-4 w-4" /> Properties
          </TabsTrigger>
          <TabsTrigger value="users" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <Users className="h-4 w-4" /> Users
          </TabsTrigger>
          <TabsTrigger value="financials" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <FileText className="h-4 w-4" /> Ledger
          </TabsTrigger>
          <TabsTrigger value="tasks" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <CheckSquare className="h-4 w-4" /> Tasks
          </TabsTrigger>
          <TabsTrigger value="docs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Documentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-none border-border/50 shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-widest">Portfolio Details</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Current Active Portfolio</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Portfolio Name</label>
                  <Input defaultValue={selectedPortfolio?.name} className="rounded-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Code</label>
                    <Input defaultValue={selectedPortfolio?.code} className="rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Status</label>
                    <Select defaultValue={selectedPortfolio?.status}>
                      <SelectTrigger className="rounded-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full bg-primary text-primary-foreground rounded-none uppercase tracking-widest text-[10px] font-bold mt-4">
                  <Save className="mr-2 h-3 w-3" /> Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-none border-border/50 shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-widest">System Preferences</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Global Application Settings</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold block">Dark Mode</label>
                    <span className="text-xs text-muted-foreground">Enable dark theme by default</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold block">Email Notifications</label>
                    <span className="text-xs text-muted-foreground">Receive system alerts via email</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold block">2FA Enforcement</label>
                    <span className="text-xs text-muted-foreground">Require two-factor auth for all admins</span>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
           <Card className="rounded-none border-border/50 shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border/50 py-4 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xs font-bold uppercase tracking-widest">Property Management</CardTitle>
                  <CardDescription className="text-[10px] uppercase tracking-widest">Add and configure properties and units</CardDescription>
                </div>
                <Button size="sm" className="bg-primary text-primary-foreground rounded-none uppercase tracking-widest text-[10px] font-bold">
                  <Plus className="mr-2 h-3 w-3" /> Add Property
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border/50">
                      <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Property</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Type</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Units</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Address</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolios.find(p => p.id === selectedPortfolioId) ? (
                       // In a real app we'd filter properties by portfolio, but using mock data here
                       // We'll just show the mock properties for display purposes
                       [
                          { id: "prop-1", name: "Sunset Heights Apartments", type: "Residential", units: 24, address: "123 Sunset Blvd, Los Angeles, CA" },
                          { id: "prop-2", name: "Oakwood Business Park", type: "Commercial", units: 12, address: "450 Oakwood Dr, Pasadena, CA" },
                          { id: "prop-3", name: "The Highland Lofts", type: "Residential", units: 45, address: "789 Highland Ave, Seattle, WA" }
                       ].map(prop => (
                        <TableRow key={prop.id} className="group hover:bg-muted/20 border-border/30">
                          <TableCell className="py-3 font-medium text-xs">{prop.name}</TableCell>
                          <TableCell className="py-3"><Badge variant="outline" className="rounded-none uppercase tracking-widest text-[8px]">{prop.type}</Badge></TableCell>
                          <TableCell className="py-3 text-xs font-mono">{prop.units}</TableCell>
                          <TableCell className="py-3 text-xs text-muted-foreground">{prop.address}</TableCell>
                          <TableCell className="py-3 text-right">
                            <div className="flex justify-end gap-2">
                               <Button variant="ghost" size="sm" className="h-8 rounded-none text-[10px] uppercase tracking-widest font-bold">Edit</Button>
                               <Button variant="ghost" size="sm" className="h-8 rounded-none text-[10px] uppercase tracking-widest font-bold">Units</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                       ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground text-xs uppercase tracking-widest">Select a portfolio to manage properties</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
           <Card className="rounded-none border-border/50 shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border/50 py-4 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xs font-bold uppercase tracking-widest">User Management</CardTitle>
                  <CardDescription className="text-[10px] uppercase tracking-widest">Manage access and permissions</CardDescription>
                </div>
                <Button size="sm" className="bg-primary text-primary-foreground rounded-none uppercase tracking-widest text-[10px] font-bold">
                  <Plus className="mr-2 h-3 w-3" /> Add User
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border/50">
                      <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Name</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Email</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Role</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Status</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="group hover:bg-muted/20 border-border/30">
                      <TableCell className="py-3 font-medium text-xs">John Doe</TableCell>
                      <TableCell className="py-3 text-xs text-muted-foreground">john.doe@propmaster.com</TableCell>
                      <TableCell className="py-3"><Badge variant="outline" className="rounded-none uppercase tracking-widest text-[8px]">Admin</Badge></TableCell>
                      <TableCell className="py-3"><span className="text-emerald-600 text-[10px] uppercase tracking-widest font-bold">Active</span></TableCell>
                      <TableCell className="py-3 text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-none"><MoreHorizontal className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="group hover:bg-muted/20 border-border/30">
                      <TableCell className="py-3 font-medium text-xs">Jane Smith</TableCell>
                      <TableCell className="py-3 text-xs text-muted-foreground">jane.smith@propmaster.com</TableCell>
                      <TableCell className="py-3"><Badge variant="outline" className="rounded-none uppercase tracking-widest text-[8px]">Manager</Badge></TableCell>
                      <TableCell className="py-3"><span className="text-emerald-600 text-[10px] uppercase tracking-widest font-bold">Active</span></TableCell>
                      <TableCell className="py-3 text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-none"><MoreHorizontal className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                     <TableRow className="group hover:bg-muted/20 border-border/30">
                      <TableCell className="py-3 font-medium text-xs">Mike Johnson</TableCell>
                      <TableCell className="py-3 text-xs text-muted-foreground">mike.j@propmaster.com</TableCell>
                      <TableCell className="py-3"><Badge variant="outline" className="rounded-none uppercase tracking-widest text-[8px]">Maintenance</Badge></TableCell>
                      <TableCell className="py-3"><span className="text-amber-600 text-[10px] uppercase tracking-widest font-bold">Invited</span></TableCell>
                      <TableCell className="py-3 text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-none"><MoreHorizontal className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="financials" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
           <Card className="rounded-none border-border/50 shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-widest">Accounting Configuration</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Chart of Accounts & Fiscal Year</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Fiscal Year End</label>
                    <Select defaultValue="dec">
                      <SelectTrigger className="rounded-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="dec">December 31</SelectItem>
                        <SelectItem value="jun">June 30</SelectItem>
                        <SelectItem value="sep">September 30</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Accounting Method</label>
                    <Select defaultValue="accrual">
                      <SelectTrigger className="rounded-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="accrual">Accrual</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                   <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Default Currency</label>
                    <Select defaultValue="usd">
                      <SelectTrigger className="rounded-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border/50">
                  <h4 className="text-xs font-bold uppercase tracking-widest">Chart of Accounts Structure</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-4 border border-border/50 bg-muted/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold">Assets</span>
                          <Badge variant="outline" className="rounded-none text-[8px] uppercase">1000-1999</Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Current and fixed assets</p>
                     </div>
                     <div className="p-4 border border-border/50 bg-muted/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold">Liabilities</span>
                          <Badge variant="outline" className="rounded-none text-[8px] uppercase">2000-2999</Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Current and long-term liabilities</p>
                     </div>
                     <div className="p-4 border border-border/50 bg-muted/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold">Equity</span>
                          <Badge variant="outline" className="rounded-none text-[8px] uppercase">3000-3999</Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Owner's equity and retained earnings</p>
                     </div>
                     <div className="p-4 border border-border/50 bg-muted/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold">Revenue</span>
                          <Badge variant="outline" className="rounded-none text-[8px] uppercase">4000-4999</Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Rental and other income</p>
                     </div>
                  </div>
                  <Button variant="outline" className="w-full rounded-none uppercase tracking-widest text-[10px] font-bold mt-2">
                    Manage Chart of Accounts
                  </Button>
                </div>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
           <Card className="rounded-none border-border/50 shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-widest">Task Configuration</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Customize task types and categories</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-widest">Task Types</h4>
                    <Button size="sm" variant="outline" className="rounded-none h-7 text-[10px] uppercase tracking-widest">Add Type</Button>
                  </div>
                  <div className="space-y-2">
                    {["Maintenance Request", "Property Inspection", "Move-In Preparation", "Move-Out Inspection", "Lease Renewal"].map((type) => (
                      <div key={type} className="flex items-center justify-between p-3 border border-border/50 bg-muted/10">
                        <span className="text-xs font-medium">{type}</span>
                        <div className="flex gap-2">
                           <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-none"><Settings className="h-3 w-3" /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-widest">Task Categories</h4>
                    <Button size="sm" variant="outline" className="rounded-none h-7 text-[10px] uppercase tracking-widest">Add Category</Button>
                  </div>
                   <div className="flex flex-wrap gap-2">
                      {["Plumbing", "HVAC", "Electrical", "General", "Appliance", "Turnover", "Administrative"].map((cat) => (
                        <Badge key={cat} variant="secondary" className="rounded-none text-[10px] uppercase tracking-widest bg-muted border border-border/50">
                          {cat} <span className="ml-2 opacity-50 cursor-pointer hover:opacity-100">×</span>
                        </Badge>
                      ))}
                   </div>
                </div>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
           <DocumentationViewer />
        </TabsContent>
      </Tabs>
    </div>
  );
}
