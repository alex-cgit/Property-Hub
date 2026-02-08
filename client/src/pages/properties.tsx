import { useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { properties, units } from "@/lib/mock-data";

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = properties.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading">Properties</h2>
          <p className="text-muted-foreground">
            Manage your real estate portfolio.
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all">
          <Plus className="mr-2 h-4 w-4" /> Add Property
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            className="pl-9 bg-card"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
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
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/60 group">
      <div className="relative h-56 w-full overflow-hidden">
        <img 
          src={property.image} 
          alt={property.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm shadow-sm">
            {property.type}
          </Badge>
          {vacantUnits > 0 && (
            <Badge variant="destructive" className="shadow-sm">
              {vacantUnits} Vacant
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="h-8 w-8 bg-background/90 backdrop-blur-sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Property</DropdownMenuItem>
              <DropdownMenuItem>View Units</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="font-heading text-xl">{property.name}</CardTitle>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-3.5 w-3.5" />
          {property.address}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Units</span>
            <span className="font-medium text-lg">{property.units}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Occupancy</span>
            <span className={`font-medium text-lg ${property.occupancyRate >= 90 ? 'text-emerald-600' : property.occupancyRate >= 75 ? 'text-amber-600' : 'text-destructive'}`}>
              {property.occupancyRate}%
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-3 flex justify-between items-center text-sm border-t border-border/50">
        <span className="text-muted-foreground">Last updated 2 days ago</span>
        <Button variant="ghost" size="sm" className="h-8 hover:bg-background">Manage</Button>
      </CardFooter>
    </Card>
  );
}
