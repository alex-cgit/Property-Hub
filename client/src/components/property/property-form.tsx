import { 
  Building2, 
  MapPin, 
  Home, 
  Image as ImageIcon,
  Save,
  Plus
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploadZone } from "@/components/common/FileUploadZone";
import { insertPropertySchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const propertyFormSchema = insertPropertySchema.extend({
  description: z.string().optional(),
  amenities: z.array(z.string()).optional(),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

export function PropertyForm({ defaultValues, onSubmit, isEditing = false }: {
  defaultValues?: Partial<PropertyFormValues>,
  onSubmit: (data: PropertyFormValues) => void,
  isEditing?: boolean
}) {
  const { toast } = useToast();
  
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: defaultValues || {
      name: "",
      address: "",
      type: "Residential",
      unitsCount: 1,
    },
  });

  function handleSubmit(data: PropertyFormValues) {
    // console.log("Submitting property:", data);
    onSubmit(data);
    toast({
      title: isEditing ? "Property Updated" : "Property Created",
      description: `Successfully ${isEditing ? "updated" : "added"} ${data.name}`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="units">Configuration</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
                <CardDescription>Basic information about the property.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Property Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Sunset Heights Apartments" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="123 Main St, City, State" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Residential">Residential</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                          <SelectItem value="Mixed">Mixed Use</SelectItem>
                          <SelectItem value="Industrial">Industrial</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unitsCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Units</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Home className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="number" 
                            className="pl-9" 
                            min={1} 
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value))} 
                          />
                        </div>
                      </FormControl>
                      <FormDescription>Used for initial unit generation.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="units" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Unit Configuration</CardTitle>
                <CardDescription>Define default unit specs for bulk creation.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg border border-border flex flex-col items-center justify-center text-center space-y-4">
                  <Building2 className="h-12 w-12 text-muted-foreground/50" />
                  <div>
                    <h3 className="font-medium">Unit Grid</h3>
                    <p className="text-sm text-muted-foreground">Unit configuration grid will be available after saving the property.</p>
                  </div>
                  <Button variant="outline" type="button" disabled>Configure Units</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Photos & Documents</CardTitle>
                <CardDescription>Upload property images and relevant documents.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <FormControl>
                        <FileUploadZone 
                          label="Upload Cover Image" 
                          accept="image/*"
                          maxFiles={1}
                          onFilesChange={(files) => {
                            if (files.length > 0) {
                              // Mock URL for now
                              field.onChange(URL.createObjectURL(files[0]));
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
          <Button type="submit" className="min-w-[120px]">
            <Save className="mr-2 h-4 w-4" />
            {isEditing ? "Update Property" : "Create Property"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
