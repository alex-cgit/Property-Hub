import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyForm } from "@/components/property/property-form";
import { UnitGrid } from "@/components/property/unit-grid";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Temporary until backend integration
const MOCK_UNITS = [
  { id: "u-101", unitNumber: "101", bedrooms: 2, bathrooms: 1, size: 950, rent: 1200, status: "Vacant" },
  { id: "u-102", unitNumber: "102", bedrooms: 1, bathrooms: 1, size: 750, rent: 1000, status: "Occupied" }
];

export default function NewPropertyPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(1);
  const [propertyData, setPropertyData] = useState<any>(null);
  const [units, setUnits] = useState(MOCK_UNITS);

  const handlePropertySubmit = (data: any) => {
    console.log("Property Draft:", data);
    setPropertyData(data);
    setActiveStep(2); // Move to units
    toast({
      title: "Property Draft Saved",
      description: "Now configure the units for this property.",
    });
  };

  const handleUnitsSave = () => {
    console.log("Final Submission:", { property: propertyData, units });
    toast({
      title: "Success",
      description: "Property and units created successfully!",
    });
    navigate("/properties");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/properties")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Add New Property</h1>
          <p className="text-muted-foreground">Follow the steps to add a property and its units.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Button 
            variant={activeStep === 1 ? "secondary" : "ghost"} 
            className="justify-start" 
            onClick={() => setActiveStep(1)}
          >
            1. Property Details
          </Button>
          <Button 
            variant={activeStep === 2 ? "secondary" : "ghost"} 
            className="justify-start"
            disabled={!propertyData}
            onClick={() => setActiveStep(2)}
          >
            2. Unit Configuration
          </Button>
          <Button variant="ghost" className="justify-start" disabled>
            3. Review & Publish
          </Button>
        </nav>

        <main className="space-y-6">
          {activeStep === 1 && (
             <PropertyForm onSubmit={handlePropertySubmit} defaultValues={propertyData} />
          )}

          {activeStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Configure Units</CardTitle>
                <CardDescription>
                  Define the units for {propertyData?.name || "this property"}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <UnitGrid units={units} onChange={setUnits} />
                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setActiveStep(1)}>Back</Button>
                  <Button onClick={handleUnitsSave}>
                    <Save className="mr-2 h-4 w-4" /> Save Property & Units
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
