import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  MoreHorizontal,
  Plus,
  Search,
  Filter
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
import { properties, units } from "@/lib/mock-data";

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

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
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

function PropertyCard({ property }: { property: any }) {
  const propertyUnits = units.filter(u => u.propertyId === property.id);
  const vacantUnits = propertyUnits.filter(u => u.status === "Vacant").length;
  
  return (
    <Card className="overflow-hidden hover:border-primary transition-all duration-300 border-border/60 group rounded-none">
      <div className="relative h-56 w-full overflow-hidden">
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
        <div className="absolute top-3 right-3">
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
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="font-heading text-xl uppercase tracking-tight">{property.name}</CardTitle>
        </div>
        <div className="flex items-center text-xs uppercase tracking-wide text-muted-foreground">
          <MapPin className="mr-1 h-3.5 w-3.5" />
          {property.address}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="flex flex-col">
            <span className="text-[8px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Units</span>
            <span className="font-mono text-lg font-medium">{property.units}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Occupancy</span>
            <span className={`font-mono text-lg font-medium ${property.occupancyRate >= 90 ? 'text-emerald-600' : property.occupancyRate >= 75 ? 'text-amber-600' : 'text-destructive'}`}>
              {property.occupancyRate}%
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 p-3 flex justify-between items-center text-sm border-t border-border/50">
        <span className="text-[8px] uppercase tracking-widest text-muted-foreground">Last updated 2 days ago</span>
        <Button variant="ghost" size="sm" className="h-8 hover:bg-background rounded-none text-[10px] uppercase tracking-widest font-bold">Manage</Button>
      </CardFooter>
    </Card>
  );
}
