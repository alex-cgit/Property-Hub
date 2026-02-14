import { useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  User, 
  Building2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Image as ImageIcon, 
  History, 
  MoreHorizontal,
  Edit,
  Trash2,
  Send,
  Upload,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { maintenanceRequests, properties, units, tenants, leases } from "@/lib/mock-data";

export default function RequestDetailPage() {
  const [, params] = useRoute("/maintenance/:id");
  const [, setLocation] = useLocation();
  const requestId = params?.id;
  
  // Find the request
  const request = maintenanceRequests.find(r => r.id === requestId);
  const property = properties.find(p => p.id === request?.propertyId);
  const unit = units.find(u => u.id === request?.unitId);
  
  // Derived state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(request?.status || "Open");
  const [priority, setPriority] = useState(request?.priority || "Medium");
  const [assignedTo, setAssignedTo] = useState(request?.assignedTo || "");
  const [commentText, setCommentText] = useState("");

  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-xl font-bold">Request not found</h2>
        <Button variant="link" onClick={() => setLocation("/maintenance")}>Return to Maintenance</Button>
      </div>
    );
  }

  // Find tenant based on unit and active lease
  const activeLease = leases.find(l => l.unitId === unit?.id && l.status === "Active");
  const tenant = activeLease ? tenants.find(t => t.id === activeLease.tenantId) : null;

  const getPriorityColor = (p: string) => {
    switch (p) {
      case "Critical": return "bg-red-500/15 text-red-700 border-red-500/20";
      case "High": return "bg-orange-500/15 text-orange-700 border-orange-500/20";
      case "Medium": return "bg-amber-500/15 text-amber-700 border-amber-500/20";
      case "Low": return "bg-blue-500/15 text-blue-700 border-blue-500/20";
      default: return "";
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case "Open": return "bg-red-500/10 text-red-600";
      case "In Progress": return "bg-amber-500/10 text-amber-600";
      case "Completed": return "bg-emerald-500/10 text-emerald-600";
      default: return "";
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Button 
          variant="ghost" 
          className="w-fit p-0 h-auto text-muted-foreground hover:text-foreground text-xs uppercase tracking-widest"
          onClick={() => setLocation("/maintenance")}
        >
          <ArrowLeft className="mr-2 h-3 w-3" /> Back to List
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="rounded-none uppercase tracking-widest text-[10px] bg-primary/5 text-primary border-primary/20">
                {request.task_type}
              </Badge>
              {request.category && (
                <Badge variant="outline" className="rounded-none uppercase tracking-widest text-[10px] bg-muted text-muted-foreground border-border">
                  {request.category}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground uppercase tracking-widest">ID: {request.id}</span>
            </div>
            <h1 className="text-3xl font-bold font-heading uppercase tracking-tight text-foreground">
              {request.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
             {!isEditing ? (
               <>
                <Select value={status} onValueChange={(val: "Open" | "In Progress" | "Completed") => setStatus(val)}>
                  <SelectTrigger className={`w-[140px] rounded-none border-transparent font-bold uppercase tracking-widest text-[10px] h-9 ${getStatusColor(status)}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm" className="rounded-none h-9 w-9 p-0" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-none h-9 w-9 p-0">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-none">
                    <DropdownMenuItem className="text-[10px] uppercase tracking-widest">Reassign</DropdownMenuItem>
                    <DropdownMenuItem className="text-[10px] uppercase tracking-widest text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
               </>
             ) : (
               <div className="flex items-center gap-2">
                 <Button variant="ghost" size="sm" className="rounded-none uppercase tracking-widest text-[10px]" onClick={() => setIsEditing(false)}>Cancel</Button>
                 <Button size="sm" className="rounded-none uppercase tracking-widest text-[10px] font-bold" onClick={() => setIsEditing(false)}>Save Changes</Button>
               </div>
             )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Details Card */}
          <Card className="rounded-none border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" /> Request Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid gap-6">
              {isEditing ? (
                 <div className="space-y-4">
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Title</label>
                     <Input defaultValue={request.title} className="rounded-none" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Description</label>
                     <Textarea defaultValue={request.description} className="rounded-none min-h-[100px]" />
                   </div>
                 </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Description</label>
                    <p className="text-sm leading-relaxed">{request.description}</p>
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-3 w-3" /> Property
                  </label>
                  <p className="text-sm font-medium">{property?.name}</p>
                  <p className="text-xs text-muted-foreground">{property?.address}</p>
                </div>
                
                <div className="space-y-1">
                   <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-2">
                    <Building2 className="h-3 w-3" /> Unit
                  </label>
                  <p className="text-sm font-medium">{unit ? `Unit ${unit.unitNumber}` : "Common Area"}</p>
                  {unit && <p className="text-xs text-muted-foreground">{unit.bedrooms} Bed / {unit.bathrooms} Bath</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-2">
                    <AlertCircle className="h-3 w-3" /> Priority
                  </label>
                  {isEditing ? (
                     <Select value={priority} onValueChange={(val: "Low" | "Medium" | "High" | "Critical") => setPriority(val)}>
                      <SelectTrigger className="w-full rounded-none h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant="outline" className={`rounded-none uppercase tracking-widest text-[10px] font-bold ${getPriorityColor(priority)}`}>
                      {priority}
                    </Badge>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-3 w-3" /> Date Reported
                  </label>
                  <p className="text-sm font-medium">{new Date(request.dateReported).toLocaleDateString()}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-2">
                    <User className="h-3 w-3" /> Contact Person
                  </label>
                  {request.contactName ? (
                    <>
                      <p className="text-sm font-medium">{request.contactName}</p>
                      <p className="text-xs text-muted-foreground">{request.contactPhone || "No phone listed"}</p>
                    </>
                  ) : tenant ? (
                    <>
                      <p className="text-sm font-medium">{tenant.name} <span className="text-[10px] text-muted-foreground">(Tenant)</span></p>
                      <p className="text-xs text-muted-foreground">{tenant.phone}</p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No contact info</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-2">
                    <UserPlus className="h-3 w-3" /> Assigned To
                  </label>
                   {isEditing ? (
                    <Input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className="rounded-none h-8 text-xs" placeholder="Assignee Name" />
                  ) : (
                    <p className="text-sm font-medium">{assignedTo || "Unassigned"}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity & Comments */}
          <Card className="rounded-none border-border/50 shadow-sm">
             <CardHeader className="bg-muted/30 border-b border-border/50 py-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <History className="h-4 w-4 text-primary" /> Activity & Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative border-l border-border/50 ml-3 space-y-8 pb-8">
                {request.comments?.map((comment) => (
                  <div key={comment.id} className="relative pl-8">
                    <span className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">{comment.author}</span>
                        <span className="text-[10px] text-muted-foreground">{new Date(comment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="text-sm bg-muted/30 p-3 rounded-none border border-border/50">
                        {comment.text}
                      </div>
                    </div>
                  </div>
                ))}
                
                 {request.timeline?.map((event, idx) => (
                  <div key={idx} className="relative pl-8">
                    <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-border ring-4 ring-background" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{new Date(event.date).toLocaleDateString()}</span>
                      <p className="text-sm">
                        <span className="font-bold">{event.author}</span> {event.action} {event.details && <span className="text-muted-foreground">- {event.details}</span>}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 items-start mt-4 pt-4 border-t border-border/50">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  ME
                </div>
                <div className="flex-1 space-y-2">
                  <Textarea 
                    placeholder="Add a comment..." 
                    className="min-h-[80px] rounded-none text-sm resize-none" 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="rounded-none uppercase tracking-widest text-[10px]">
                      <Upload className="mr-2 h-3 w-3" /> Attach Photo
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground rounded-none uppercase tracking-widest text-[10px] font-bold">
                      <Send className="mr-2 h-3 w-3" /> Post Comment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Photos */}
           <Card className="rounded-none border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 border-b border-border/50 py-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-primary" /> Photos
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Plus className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              {request.photos && request.photos.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                   {request.photos.map((photo, idx) => (
                     <div key={idx} className="aspect-square bg-muted relative group cursor-pointer overflow-hidden border border-border/50">
                        <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-[10px] uppercase tracking-widest font-bold">{photo.caption}</span>
                        </div>
                     </div>
                   ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-border/50">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-20" />
                  <p className="text-xs">No photos uploaded</p>
                  <Button variant="link" size="sm" className="text-[10px] uppercase tracking-widest h-auto p-0 mt-2">Upload Photo</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="rounded-none border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 border-b border-border/50 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <Button variant="outline" className="w-full justify-start rounded-none text-xs h-9">
                <CheckCircle2 className="mr-2 h-3.5 w-3.5" /> Mark as Completed
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-none text-xs h-9">
                <UserPlus className="mr-2 h-3.5 w-3.5" /> Assign Crew
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-none text-xs h-9">
                <MessageSquare className="mr-2 h-3.5 w-3.5" /> Email Tenant
              </Button>
              <Separator className="my-2" />
              <Button variant="outline" className="w-full justify-start rounded-none text-xs h-9 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20">
                <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
