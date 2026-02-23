import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = 
  | "Active" | "Inactive" 
  | "Occupied" | "Vacant" | "Maintenance" 
  | "Open" | "In Progress" | "Completed" | "Pending" 
  | "Low" | "Medium" | "High" | "Critical";

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

const statusVariants: Record<string, string> = {
  // General
  Active: "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-200",
  Inactive: "bg-slate-500/15 text-slate-700 hover:bg-slate-500/25 border-slate-200",
  
  // Occupancy
  Occupied: "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-200",
  Vacant: "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 border-amber-200",
  Maintenance: "bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 border-rose-200",

  // Tasks
  Open: "bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 border-blue-200",
  "In Progress": "bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 border-amber-200",
  Completed: "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-200",
  Pending: "bg-slate-500/15 text-slate-700 hover:bg-slate-500/25 border-slate-200",

  // Priority
  Low: "bg-slate-500/15 text-slate-700 border-slate-200",
  Medium: "bg-blue-500/15 text-blue-700 border-blue-200",
  High: "bg-amber-500/15 text-amber-700 border-amber-200",
  Critical: "bg-rose-500/15 text-rose-700 border-rose-200 animate-pulse",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = statusVariants[status] || "bg-slate-100 text-slate-800 border-slate-200";

  return (
    <Badge 
      variant="outline" 
      className={cn("font-medium border uppercase text-[10px] tracking-wider px-2 py-0.5 rounded-sm", variant, className)}
    >
      {status}
    </Badge>
  );
}
