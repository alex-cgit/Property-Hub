import React from "react";
import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CurrencyInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  className?: string;
  error?: string;
}

export const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ label, className, error, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        {label && <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>}
        <div className="relative">
          <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9 h-9 text-sm" 
            ref={ref} 
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            {...props} 
          />
        </div>
        {error && <span className="text-[10px] text-destructive font-medium">{error}</span>}
      </div>
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";
