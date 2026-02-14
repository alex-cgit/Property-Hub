import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Wrench, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MoreHorizontal,
  Search,
  Filter,
  Plus,
  ClipboardList,
  Home,
  Key,
  FileSignature,
  Hammer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { maintenanceRequests, properties, units, leases, tenants } from "@/lib/mock-data";
import { usePortfolio } from "@/lib/portfolio-context";

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [unitFilter, setUnitFilter] = useState("all");
  const [taskTypeFilter, setTaskTypeFilter] = useState("all");
  const { filteredProperties: properties } = usePortfolio();
  const navigate = useNavigate();

  const getProperty = (id: string) => properties.find(p => p.id === id);
  const getUnit = (id?: string) => id ? units.find(u => u.id === id) : null;

  // Filter units based on selected property
  const filteredUnits = unitFilter !== "all" 
    ? units 
    : propertyFilter !== "all" 
      ? units.filter(u => u.propertyId === propertyFilter)
      : units;

  const filteredRequests = maintenanceRequests.filter(req => {
    // Filter by Portfolio Properties
    const reqProperty = properties.find(p => p.id === req.propertyId);
    if (!reqProperty) return false;

    // Tab filter (Status)
    if (activeTab === "open" && req.status !== "Open") return false;
    if (activeTab === "progress" && req.status !== "In Progress") return false;
    if (activeTab === "completed" && req.status !== "Completed") return false;

    // Property filter
    if (propertyFilter !== "all" && req.propertyId !== propertyFilter) return false;

    // Unit filter
    if (unitFilter !== "all" && req.unitId !== unitFilter) return false;

    // Task Type filter
    if (taskTypeFilter !== "all" && req.task_type !== taskTypeFilter) return false;

    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-500/15 text-red-700 border-red-500/20";
      case "High": return "bg-orange-500/15 text-orange-700 border-orange-500/20";
      case "Medium": return "bg-amber-500/15 text-amber-700 border-amber-500/20";
      case "Low": return "bg-blue-500/15 text-blue-700 border-blue-500/20";
      default: return "";
    }
  };

  const getTaskTypeBadge = (type: string) => {
    switch (type) {
      case "Maintenance Request": return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200 rounded-none text-[8px] uppercase tracking-widest font-bold">Maintenance</Badge>;
      case "Property Inspection": return <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-200 rounded-none text-[8px] uppercase tracking-widest font-bold">Inspection</Badge>;
      case "Move-In Preparation": return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200 rounded-none text-[8px] uppercase tracking-widest font-bold">Move-In</Badge>;
      case "Move-Out Inspection": return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200 rounded-none text-[8px] uppercase tracking-widest font-bold">Move-Out</Badge>;
      case "Lease Renewal Process": return <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-200 rounded-none text-[8px] uppercase tracking-widest font-bold">Renewal</Badge>;
      default: return <Badge variant="outline" className="bg-gray-500/10 text-gray-600 border-gray-200 rounded-none text-[8px] uppercase tracking-widest font-bold">Custom</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open": return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "In Progress": return <Clock className="h-4 w-4 text-amber-500" />;
      case "Completed": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading uppercase">Requests & Tasks</h2>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
            Track and manage property requests and tasks
          </p>
        </div>
        <NewRequestModal />
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-border/50 pb-4">
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList className="bg-transparent gap-6 h-auto p-0 w-full justify-start rounded-none">
            <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold">All Requests</TabsTrigger>
            <TabsTrigger value="open" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold">Open</TabsTrigger>
            <TabsTrigger value="progress" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold">In Progress</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
          {/* Task Type Filter */}
          <Select value={taskTypeFilter} onValueChange={setTaskTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px] h-8 rounded-none border-border/50 text-[10px] uppercase tracking-wider bg-background">
              <SelectValue placeholder="ALL TASK TYPES" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-border">
              <SelectItem value="all" className="text-[10px] uppercase tracking-wider">All Task Types</SelectItem>
              <SelectItem value="Maintenance Request" className="text-[10px] uppercase tracking-wider">Maintenance</SelectItem>
              <SelectItem value="Property Inspection" className="text-[10px] uppercase tracking-wider">Inspections</SelectItem>
              <SelectItem value="Move-In Preparation" className="text-[10px] uppercase tracking-wider">Move-In Prep</SelectItem>
              <SelectItem value="Move-Out Inspection" className="text-[10px] uppercase tracking-wider">Move-Out Insp</SelectItem>
              <SelectItem value="Custom Task" className="text-[10px] uppercase tracking-wider">Custom</SelectItem>
            </SelectContent>
          </Select>

          {/* Property Filter */}
          <Select value={propertyFilter} onValueChange={(val) => {
            setPropertyFilter(val);
            setUnitFilter("all"); // Reset unit filter when property changes
          }}>
            <SelectTrigger className="w-full sm:w-[180px] h-8 rounded-none border-border/50 text-[10px] uppercase tracking-wider bg-background">
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
            <SelectTrigger className="w-full sm:w-[120px] h-8 rounded-none border-border/50 text-[10px] uppercase tracking-wider bg-background">
              <SelectValue placeholder="FILTER BY UNIT" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-border">
              <SelectItem value="all" className="text-[10px] uppercase tracking-wider">All Units</SelectItem>
              {filteredUnits.map(u => (
                <SelectItem key={u.id} value={u.id} className="text-[10px] uppercase tracking-wider">Unit {u.unitNumber}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative w-full sm:w-[180px]">
            <Search className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="SEARCH..."
              className="pl-7 h-8 text-[10px] rounded-none uppercase tracking-widest bg-muted/30 border-none"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredRequests.map(request => {
          const property = getProperty(request.propertyId);
          const unit = getUnit(request.unitId);
          
          return (
            <Card 
              key={request.id} 
              className="rounded-none hover:border-primary transition-all duration-300 border-border/50 cursor-pointer group"
              onClick={() => navigate(`/maintenance/${request.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 h-10 w-10 flex items-center justify-center bg-muted border border-border/50`}>
                      {getStatusIcon(request.status)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        {getTaskTypeBadge(request.task_type)}
                        <h4 className="font-bold text-sm uppercase tracking-wide group-hover:text-primary transition-colors">{request.title}</h4>
                        <Badge variant="outline" className={`rounded-none uppercase tracking-widest text-[8px] font-bold ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground max-w-xl line-clamp-1">
                        {request.description}
                      </p>
                      <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground pt-2">
                        <span className="flex items-center gap-1 font-bold text-foreground">
                          <Wrench className="h-3 w-3" />
                          {property?.name} {unit ? `• Unit ${unit.unitNumber}` : '• General Property'}
                        </span>
                        <span>•</span>
                        <span>Reported {new Date(request.dateReported).toLocaleDateString()}</span>
                        {request.assignedTo && (
                          <>
                            <span>•</span>
                            <span>Assigned: {request.assignedTo}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 md:self-center self-end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-none h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-none border-border">
                        <DropdownMenuItem className="text-[10px] uppercase tracking-widest">Update Status</DropdownMenuItem>
                        <DropdownMenuItem className="text-[10px] uppercase tracking-widest">Assign Crew</DropdownMenuItem>
                        <DropdownMenuItem className="text-[10px] uppercase tracking-widest">View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-[10px] uppercase tracking-widest text-destructive">Delete Request</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function NewRequestModal() {
  const [step, setStep] = useState(1);
  const [taskType, setTaskType] = useState<string | null>(null);
  
  // Form State
  const [propertyId, setPropertyId] = useState<string>("");
  const [unitId, setUnitId] = useState<string>("");
  const [dateReported, setDateReported] = useState<string>(new Date().toISOString().split('T')[0]);
  const [contactName, setContactName] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");

  const filteredUnits = units.filter(u => u.propertyId === propertyId);

  // Auto-fill tenant info when unit is selected
  const handleUnitChange = (uId: string) => {
    setUnitId(uId);
    // Find active lease for this unit
    const lease = leases.find(l => l.unitId === uId && l.status === "Active");
    if (lease) {
      const tenant = tenants.find(t => t.id === lease.tenantId);
      if (tenant) {
        setContactName(tenant.name);
        setContactPhone(tenant.phone);
      }
    } else {
      setContactName("");
      setContactPhone("");
    }
  };

  const TaskTypeButton = ({ type, icon: Icon, color }: any) => (
    <Button 
      variant="outline" 
      className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 rounded-none border-border/50 group"
      onClick={() => {
        setTaskType(type);
        setStep(2);
      }}
    >
      <Icon className={`h-6 w-6 ${color} opacity-70 group-hover:opacity-100 transition-opacity`} />
      <span className="text-[10px] uppercase tracking-widest font-bold">{type}</span>
    </Button>
  );

  return (
    <Dialog onOpenChange={(open) => { 
      if(!open) {
        setStep(1);
        setPropertyId("");
        setUnitId("");
        setContactName("");
        setContactPhone("");
      } 
    }}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground rounded-none px-6 uppercase tracking-widest text-[10px] font-bold shadow-md">
          <Plus className="mr-2 h-3 w-3" /> New Request
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-none border-border sm:max-w-[600px]">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-heading uppercase tracking-tight">Select Task Type</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <TaskTypeButton type="Maintenance Request" icon={Wrench} color="text-blue-500" />
              <TaskTypeButton type="Property Inspection" icon={ClipboardList} color="text-purple-500" />
              <TaskTypeButton type="Move-In Preparation" icon={Key} color="text-green-500" />
              <TaskTypeButton type="Move-Out Inspection" icon={Home} color="text-green-500" />
              <TaskTypeButton type="Lease Renewal" icon={FileSignature} color="text-orange-500" />
              <TaskTypeButton type="Custom Task" icon={Hammer} color="text-gray-500" />
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-heading uppercase tracking-tight flex items-center gap-2">
                <span className="text-muted-foreground font-normal">New</span> {taskType}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-[8px] uppercase tracking-widest font-bold">Category</label>
                <Select>
                  <SelectTrigger className="rounded-none text-xs">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="appliance">Appliance</SelectItem>
                    <SelectItem value="turnover">Turnover</SelectItem>
                    <SelectItem value="admin">Administrative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[8px] uppercase tracking-widest font-bold">Title</label>
                  <Input placeholder="Task title" className="rounded-none text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] uppercase tracking-widest font-bold">Priority</label>
                  <Select>
                    <SelectTrigger className="rounded-none text-xs">
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[8px] uppercase tracking-widest font-bold">Description</label>
                <Input placeholder="Detailed description..." className="rounded-none text-xs" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[8px] uppercase tracking-widest font-bold">Property</label>
                  <Select value={propertyId} onValueChange={(val) => {
                    setPropertyId(val);
                    setUnitId(""); // Reset unit when property changes
                  }}>
                    <SelectTrigger className="rounded-none text-xs">
                      <SelectValue placeholder="Select Property" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      {properties.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] uppercase tracking-widest font-bold">Unit</label>
                  <Select value={unitId} onValueChange={handleUnitChange} disabled={!propertyId}>
                    <SelectTrigger className="rounded-none text-xs">
                      <SelectValue placeholder={!propertyId ? "Select Property First" : "Select Unit"} />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      {filteredUnits.map(u => (
                        <SelectItem key={u.id} value={u.id}>Unit {u.unitNumber}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] uppercase tracking-widest font-bold">Date Reported</label>
                  <Input 
                    type="date" 
                    className="rounded-none text-xs" 
                    value={dateReported}
                    onChange={(e) => setDateReported(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[8px] uppercase tracking-widest font-bold">Contact Name</label>
                  <Input 
                    placeholder="Name" 
                    className="rounded-none text-xs" 
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] uppercase tracking-widest font-bold">Contact Phone</label>
                  <Input 
                    placeholder="Phone number" 
                    className="rounded-none text-xs" 
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="rounded-none uppercase tracking-widest text-[10px] font-bold" onClick={() => setStep(1)}>Back</Button>
              <Button className="bg-primary text-primary-foreground rounded-none uppercase tracking-widest text-[10px] font-bold">Create Task</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
