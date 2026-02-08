import { useState } from "react";
import { 
  Wrench, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MoreHorizontal,
  Search,
  Filter,
  Plus
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
import { maintenanceRequests, properties, units } from "@/lib/mock-data";

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState("all");

  const getProperty = (id: string) => properties.find(p => p.id === id);
  const getUnit = (id?: string) => id ? units.find(u => u.id === id) : null;

  const filteredRequests = maintenanceRequests.filter(req => {
    if (activeTab === "all") return true;
    if (activeTab === "open") return req.status === "Open";
    if (activeTab === "progress") return req.status === "In Progress";
    if (activeTab === "completed") return req.status === "Completed";
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open": return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "In Progress": return <Clock className="h-4 w-4 text-amber-500" />;
      case "Completed": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading">Maintenance</h2>
          <p className="text-muted-foreground">
            Track and manage property maintenance requests.
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground shadow-md">
          <Plus className="mr-2 h-4 w-4" /> New Request
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredRequests.map(request => {
          const property = getProperty(request.propertyId);
          const unit = getUnit(request.unitId);
          
          return (
            <Card key={request.id} className="hover:shadow-md transition-all duration-200 border-border/60">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 h-10 w-10 rounded-full flex items-center justify-center bg-muted`}>
                      {getStatusIcon(request.status)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-lg">{request.title}</h4>
                        <Badge variant="outline" className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground max-w-xl">
                        {request.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                        <span className="flex items-center gap-1 font-medium text-foreground">
                          <Wrench className="h-3 w-3" />
                          {property?.name} {unit ? `• Unit ${unit.unitNumber}` : '• General Property'}
                        </span>
                        <span>•</span>
                        <span>Reported {new Date(request.dateReported).toLocaleDateString()}</span>
                        {request.assignedTo && (
                          <>
                            <span>•</span>
                            <span>Assigned to: {request.assignedTo}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 md:self-center self-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem>Assign Crew</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete Request</DropdownMenuItem>
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
