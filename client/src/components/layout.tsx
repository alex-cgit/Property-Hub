import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Wrench, 
  DollarSign, 
  Settings,
  Bell,
  Search,
  Menu,
  LogOut,
  ChevronDown
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/" },
    { title: "Properties", icon: Building2, url: "/properties" },
    { title: "Tenants & Leases", icon: Users, url: "/tenants" },
    { title: "Maintenance", icon: Wrench, url: "/maintenance" },
    { title: "Financials", icon: DollarSign, url: "/financials" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground font-sans">
        <AppSidebar location={location} navItems={navItems} />
        
        <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-md">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            
            <div className="flex-1">
              <div className="relative max-w-md hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search properties, tenants, or requests..."
                  className="w-full rounded-full bg-muted pl-9 md:w-[300px] lg:w-[400px] border-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary" />
              </Button>
              <UserNav />
            </div>
          </header>
          
          <div className="flex-1 overflow-auto p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

function AppSidebar({ location, navItems }: { location: string, navItems: any[] }) {
  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="h-20 flex items-center justify-center border-b border-sidebar-border/30">
        <div className="flex items-center gap-3 px-2 font-heading font-semibold text-lg tracking-tight">
          <div className="flex h-10 w-10 items-center justify-center rounded-none bg-primary text-primary-foreground">
            <Building2 className="size-6 stroke-[1.5]" />
          </div>
          <span className="group-data-[collapsible=icon]:hidden uppercase tracking-widest">PROP</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="gap-0">
        <SidebarGroup className="pt-6">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 px-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === item.url || (item.url !== "/" && location.startsWith(item.url))}
                    tooltip={item.title}
                    className="gap-4 px-4 py-6 h-auto rounded-none text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-transparent data-[active=true]:text-sidebar-primary data-[active=true]:font-bold border-l-2 border-transparent data-[active=true]:border-primary transition-all duration-200"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-5 w-5 stroke-[1.5]" />
                      <span className="text-sm uppercase tracking-wider">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src="/avatars/01.png" alt="@admin" />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              john.doe@propmaster.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
