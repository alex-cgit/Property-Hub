import { useState } from "react";
import { 
  Building2, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Filter,
  Briefcase,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { portfolios, properties, units } from "@/lib/mock-data";

export default function PortfoliosPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPortfolios = portfolios.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPortfolioStats = (portfolioId: string) => {
    const portfolioProperties = properties.filter(p => p.portfolioId === portfolioId);
    const propertyIds = portfolioProperties.map(p => p.id);
    const portfolioUnits = units.filter(u => propertyIds.includes(u.propertyId));
    
    return {
      propertyCount: portfolioProperties.length,
      unitCount: portfolioUnits.length,
      occupancyRate: Math.round(portfolioProperties.reduce((acc, p) => acc + p.occupancyRate, 0) / (portfolioProperties.length || 1))
    };
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading uppercase">Portfolios</h2>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
            Manage your property groups and entities
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground rounded-none px-6 uppercase tracking-widest text-[10px] font-bold shadow-md hover:shadow-lg transition-all">
          <Plus className="mr-2 h-3 w-3" /> New Portfolio
        </Button>
      </div>

      <div className="flex items-center gap-2 border-b border-border/50 pb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="SEARCH PORTFOLIOS..."
            className="pl-7 h-8 text-[10px] rounded-none uppercase tracking-widest bg-muted/30 border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="rounded-none border border-border/50 shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 w-[300px]">Portfolio Name</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10">Code</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Properties</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Units</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Occupancy</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 text-right">Status</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-bold h-10 w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPortfolios.map((portfolio) => {
              const stats = getPortfolioStats(portfolio.id);
              return (
                <TableRow key={portfolio.id} className="group hover:bg-muted/20 border-border/30">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-muted/50 flex items-center justify-center border border-border/50">
                        <Briefcase className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-tight">{portfolio.name}</span>
                        <span className="text-[8px] text-muted-foreground uppercase tracking-widest">ID: {portfolio.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="font-mono text-xs">{portfolio.code}</span>
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <span className="font-mono text-xs">{stats.propertyCount}</span>
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <span className="font-mono text-xs">{stats.unitCount}</span>
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <span className={`font-mono text-xs ${stats.occupancyRate >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {stats.occupancyRate}%
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <Badge variant="outline" className="rounded-none uppercase tracking-widest text-[8px] font-bold bg-emerald-500/10 text-emerald-600 border-emerald-200">
                      {portfolio.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-none border-border">
                        <DropdownMenuItem className="text-[10px] uppercase tracking-widest">Edit Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-[10px] uppercase tracking-widest">GL Settings</DropdownMenuItem>
                        <DropdownMenuItem className="text-[10px] uppercase tracking-widest text-destructive">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
