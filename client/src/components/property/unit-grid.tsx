import { 
  Building2, 
  Settings, 
  MapPin, 
  Home,
  Plus,
  Trash2,
  Copy,
  Edit
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { StatusBadge } from "@/components/common/StatusBadge";
import { CurrencyInput } from "@/components/common/CurrencyInput";

interface Unit {
  id: string;
  unitNumber: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  rent: number;
  status: "Vacant" | "Occupied" | "Maintenance";
}

interface UnitGridProps {
  units: Unit[];
  onChange: (units: Unit[]) => void;
  isLoading?: boolean;
}

export function UnitGrid({ units, onChange, isLoading = false }: UnitGridProps) {
  
  const handleUpdate = (id: string, field: keyof Unit, value: any) => {
    const updated = units.map(u => u.id === id ? { ...u, [field]: value } : u);
    onChange(updated);
  };

  const handleAddUnit = () => {
    const newUnit: Unit = {
      id: crypto.randomUUID(),
      unitNumber: `Unit ${units.length + 1}`,
      bedrooms: 1,
      bathrooms: 1,
      size: 750,
      rent: 1200,
      status: "Vacant"
    };
    onChange([...units, newUnit]);
  };

  const handleRemove = (id: string) => {
    onChange(units.filter(u => u.id !== id));
  };

  const handleBulkApply = (field: keyof Unit, value: any) => {
    // Only apply to selected or all? For now all visible
    if (confirm(`Apply ${value} to all ${units.length} units?`)) {
       const updated = units.map(u => ({ ...u, [field]: value }));
       onChange(updated);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Home className="h-5 w-5 text-primary" />
          Unit Inventory ({units.length})
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleBulkApply('rent', 1500)}>
            Set All Rent $1500
          </Button>
          <Button size="sm" onClick={handleAddUnit}>
            <Plus className="mr-2 h-4 w-4" /> Add Unit
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[120px]">Unit #</TableHead>
              <TableHead className="w-[100px]">Beds</TableHead>
              <TableHead className="w-[100px]">Baths</TableHead>
              <TableHead className="w-[120px]">Size (sqft)</TableHead>
              <TableHead className="w-[150px]">Market Rent</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {units.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No units configured. Click "Add Unit" to start.
                </TableCell>
              </TableRow>
            ) : (
              units.map((unit) => (
                <TableRow key={unit.id} className="hover:bg-muted/30">
                  <TableCell>
                    <Input 
                      value={unit.unitNumber} 
                      onChange={(e) => handleUpdate(unit.id, 'unitNumber', e.target.value)}
                      className="h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number" 
                      min={0}
                      value={unit.bedrooms} 
                      onChange={(e) => handleUpdate(unit.id, 'bedrooms', parseInt(e.target.value))}
                      className="h-8 w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number" 
                      min={0}
                      step={0.5}
                      value={unit.bathrooms} 
                      onChange={(e) => handleUpdate(unit.id, 'bathrooms', parseFloat(e.target.value))}
                      className="h-8 w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number"
                      step={10} 
                      value={unit.size} 
                      onChange={(e) => handleUpdate(unit.id, 'size', parseInt(e.target.value))}
                      className="h-8 w-24"
                    />
                  </TableCell>
                  <TableCell>
                     <div className="relative">
                        <span className="absolute left-2 top-1.5 text-xs text-muted-foreground">$</span>
                        <Input 
                          type="number" 
                          value={unit.rent} 
                          onChange={(e) => handleUpdate(unit.id, 'rent', parseFloat(e.target.value))}
                          className="h-8 pl-5"
                        />
                     </div>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={unit.status} 
                      onValueChange={(val: any) => handleUpdate(unit.id, 'status', val)}
                    >
                      <SelectTrigger className="h-8 w-[110px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vacant">Vacant</SelectItem>
                        <SelectItem value="Occupied">Occupied</SelectItem>
                        <SelectItem value="Maintenance">Maint.</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemove(unit.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
