import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  ArrowRight,
  ClipboardList
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { units, maintenanceRequests } from "@/lib/mock-data";
import { usePortfolio } from "@/lib/portfolio-context";

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { filteredProperties: properties } = usePortfolio();
  const navigate = useNavigate();

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeTab === "all" || 
                        (activeTab === "residential" && p.type === "Residential") ||
                        (activeTab === "commercial" && p.type === "Commercial");
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading uppercase">Properties</h2>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
            Manage your real estate portfolio
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground rounded-none px-6 uppercase tracking-widest text-[10px] font-bold shadow-md hover:shadow-lg transition-all">
          <Plus className="mr-2 h-3 w-3" /> Add Property
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-border/50 pb-4">
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList className="bg-transparent gap-6 h-auto p-0 w-full justify-start rounded-none">
            <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold">All Properties</TabsTrigger>
            <TabsTrigger value="residential" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold">Residential</TabsTrigger>
            <TabsTrigger value="commercial" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-[10px] uppercase tracking-widest font-bold">Commercial</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
          <div className="relative w-full sm:w-[250px]">
            <Search className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="SEARCH PROPERTIES..."
              className="pl-7 h-8 text-[10px] rounded-none uppercase tracking-widest bg-muted/30 border-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map(property => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            onSelect={() => navigate(`/properties/${property.id}`)} 
          />
        ))}
      </div>
    </div>
  );
}

function PropertyCard({ property, onSelect }: { property: any, onSelect: () => void }) {
  const propertyUnits = units.filter(u => u.propertyId === property.id);
  const vacantUnits = propertyUnits.filter(u => u.status === "Vacant").length;
  const maintenanceTasks = maintenanceRequests.filter(r => r.propertyId === property.id && r.status !== "Completed");
  const urgentTasks = maintenanceTasks.filter(r => r.priority === "High" || r.priority === "Critical").length;
  
  return (
    <Card 
      className="overflow-hidden hover:border-primary transition-all duration-300 border-border/60 group rounded-none cursor-pointer"
      onClick={onSelect}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={property.image} 
          alt={property.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm shadow-sm rounded-none uppercase tracking-widest text-[8px] font-bold">
            {property.type}
          </Badge>
          {vacantUnits > 0 && (
            <Badge variant="destructive" className="shadow-sm rounded-none uppercase tracking-widest text-[8px] font-bold">
              {vacantUnits} Vacant
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="h-8 w-8 bg-background/90 backdrop-blur-sm rounded-none">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-none border-border">
              <DropdownMenuItem className="text-[10px] uppercase tracking-widest">View Details</DropdownMenuItem>
              <DropdownMenuItem className="text-[10px] uppercase tracking-widest">Edit Property</DropdownMenuItem>
              <DropdownMenuItem className="text-[10px] uppercase tracking-widest">View Units</DropdownMenuItem>
              <DropdownMenuItem className="text-[10px] uppercase tracking-widest text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <CardHeader className="pb-3 pt-4">
        <div className="flex justify-between items-start">
          <CardTitle className="font-heading text-lg uppercase tracking-tight group-hover:text-primary transition-colors">{property.name}</CardTitle>
        </div>
        <div className="flex items-center text-xs uppercase tracking-wide text-muted-foreground">
          <MapPin className="mr-1 h-3.5 w-3.5" />
          {property.address}
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 py-2">
          <div className="flex flex-col border-r border-border/50 pr-2">
            <span className="text-[8px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Total Units</span>
            <span className="font-mono text-sm font-bold flex items-center gap-2">
              {propertyUnits.length}
              <span className="text-[8px] font-normal text-muted-foreground">({vacantUnits} vacant)</span>
            </span>
          </div>
          <div className="flex flex-col pl-2">
            <span className="text-[8px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Occupancy</span>
            <span className={`font-mono text-sm font-bold ${property.occupancyRate >= 90 ? 'text-emerald-600' : property.occupancyRate >= 75 ? 'text-amber-600' : 'text-destructive'}`}>
              {property.occupancyRate}%
            </span>
          </div>
          <div className="flex flex-col border-r border-border/50 pr-2 pt-2 border-t">
            <span className="text-[8px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Open Maint.</span>
            <span className="font-mono text-sm font-bold flex items-center gap-2">
              {maintenanceTasks.filter(t => t.task_type === "Maintenance Request").length}
              {urgentTasks > 0 && <span className="text-[8px] font-bold text-destructive flex items-center"><ClipboardList className="h-2 w-2 mr-0.5" /> {urgentTasks} Urgent</span>}
            </span>
          </div>
          <div className="flex flex-col pl-2 pt-2 border-t border-border/50">
            <span className="text-[8px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Total Tasks</span>
            <span className="font-mono text-sm font-bold">
              {maintenanceTasks.length}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 p-3 flex justify-between items-center text-sm border-t border-border/50 group-hover:bg-primary/5 transition-colors">
        <span className="text-[8px] uppercase tracking-widest text-muted-foreground">View property units</span>
        <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </CardFooter>
    </Card>
  );
}
