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
  ChevronDown,
  FileText,
  Briefcase,
  ClipboardList,
  Plus
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
import { usePortfolio } from "@/lib/portfolio-context";
import { portfolios } from "@/lib/mock-data";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { selectedPortfolioId } = usePortfolio();
  const selectedPortfolio = portfolios.find(p => p.id === selectedPortfolioId);

  const navItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
    { title: "Portfolios", icon: Briefcase, url: "/portfolios" },
    { title: "Properties", icon: Building2, url: "/properties" },
    { title: "Tenants & Leases", icon: Users, url: "/tenants" },
    { title: "Parties", icon: Users, url: "/parties" },
    { title: "Maintenance", icon: Wrench, url: "/maintenance" },
    { title: "Financials", icon: DollarSign, url: "/financials" },
    { title: "General Ledger", icon: FileText, url: "/ledger" },
    { title: "Reports", icon: ClipboardList, url: "/reports" },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background text-foreground font-sans">
        <AppSidebar location={location} navItems={navItems} />
        
        <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-md">
            <SidebarTrigger className="-ml-1" />
            <Link href="/" className="md:hidden flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="font-heading font-bold uppercase tracking-widest text-sm">PROP</span>
            </Link>
            <Separator orientation="vertical" className="h-6 hidden md:block" />
            
            <div className="flex items-center gap-2 hidden md:flex">
               <Briefcase className="h-4 w-4 text-primary" />
               <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground hidden md:inline-block">Portfolio:</span>
               <span className="text-sm font-bold uppercase tracking-tight">{selectedPortfolio?.name || "Select Portfolio"}</span>
            </div>

            <div className="flex-1"></div>

            <div className="flex items-center gap-4">
              <div className="relative max-w-md hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-full bg-muted pl-9 md:w-[200px] lg:w-[300px] border-none h-9 text-xs"
                />
              </div>
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
  const { selectedPortfolioId, setSelectedPortfolioId } = usePortfolio();
  const selectedPortfolio = portfolios.find(p => p.id === selectedPortfolioId);

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out group-data-[collapsible=icon]:w-[60px]"
    >
      <SidebarHeader className="h-20 flex items-center justify-center border-b border-sidebar-border/30 overflow-hidden px-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 px-2 hover:bg-sidebar-accent group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                <Building2 className="size-5" />
              </div>
              <div className="flex flex-col items-start text-left group-data-[collapsible=icon]:hidden overflow-hidden">
                <span className="truncate font-semibold text-xs uppercase tracking-wider">{selectedPortfolio?.code || "SEL"}</span>
                <span className="truncate text-[10px] text-muted-foreground uppercase tracking-widest">Portfolio</span>
              </div>
              <ChevronDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] rounded-none border-border" align="start">
            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Switch Portfolio</DropdownMenuLabel>
            {portfolios.map(portfolio => (
              <DropdownMenuItem 
                key={portfolio.id} 
                className="text-xs font-medium uppercase tracking-wide cursor-pointer"
                onClick={() => setSelectedPortfolioId(portfolio.id)}
              >
                <span className={selectedPortfolioId === portfolio.id ? "text-primary font-bold" : ""}>{portfolio.name}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[10px] uppercase tracking-widest cursor-pointer">
              <Plus className="mr-2 h-3 w-3" /> New Portfolio
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      
      <SidebarContent className="gap-0 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === item.url || (item.url !== "/" && location.startsWith(item.url))}
                    tooltip={item.title}
                    className="gap-4 px-3 py-3 h-auto rounded-none text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-transparent data-[active=true]:text-sidebar-primary data-[active=true]:font-bold border-l-2 border-transparent data-[active=true]:border-primary transition-all duration-200 overflow-hidden"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4 shrink-0 stroke-[1.5]" />
                      <span className="text-xs uppercase tracking-wider group-data-[collapsible=icon]:hidden whitespace-nowrap">{item.title}</span>
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
  const [, setLocation] = useLocation();

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
        <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={() => setLocation("/")}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
