import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
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
  Building2, 
  LayoutDashboard, 
  Users, 
  Wrench, 
  DollarSign, 
  FileText, 
  ClipboardList, 
  Settings, 
  Search, 
  Bell, 
  LogOut,
  ChevronsUpDown,
  Plus,
  Check,
  Menu
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { usePortfolio } from "@/lib/portfolio-context";
import { portfolios } from "@/lib/mock-data";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation().pathname;
  const { selectedPortfolioId, setSelectedPortfolioId } = usePortfolio();
  const selectedPortfolio = portfolios.find(p => p.id === selectedPortfolioId);

  const navItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
    { title: "Properties", icon: Building2, url: "/properties" },
    { title: "Tenants & Leases", icon: Users, url: "/tenants" },
    { title: "Maintenance", icon: Wrench, url: "/maintenance" },
    { title: "Financials", icon: DollarSign, url: "/financials" },
    { title: "Accounting", icon: FileText, url: "/ledger" },
    { title: "Reports", icon: ClipboardList, url: "/reports" },
    { title: "Settings", icon: Settings, url: "/settings" },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background text-foreground font-sans">
        {/* Sidebar */}
        <Sidebar 
          collapsible="icon" 
          className="border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out group-data-[collapsible=icon]:w-[60px]"
        >
          <SidebarHeader className="flex flex-col gap-4 border-b border-sidebar-border/30 px-2 py-4">
            {/* Logo Area */}
            <div className="flex items-center gap-3 px-2 font-heading font-semibold text-lg tracking-tight w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Building2 className="size-6 stroke-[2]" />
              </div>
              <span className="group-data-[collapsible=icon]:hidden font-bold tracking-tight text-xl">PropHub</span>
            </div>

            {/* Portfolio Switcher */}
            <div className="group-data-[collapsible=icon]:hidden px-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between border-border/50 text-xs font-medium h-9 px-3 shadow-sm"
                  >
                    <span className="truncate">{selectedPortfolio?.name || "Select Portfolio"}</span>
                    <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] border-border shadow-lg">
                  <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">Switch Portfolio</DropdownMenuLabel>
                  {portfolios.map((portfolio) => (
                    <DropdownMenuItem
                      key={portfolio.id}
                      onSelect={() => setSelectedPortfolioId(portfolio.id)}
                      className="text-sm cursor-pointer justify-between"
                    >
                      {portfolio.name}
                      {selectedPortfolioId === portfolio.id && (
                        <Check className="ml-auto h-3 w-3 text-primary" />
                      )}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-xs cursor-pointer font-medium text-primary">
                    <Plus className="mr-2 h-3 w-3" /> Add New Portfolio
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="gap-0 py-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1 px-2">
                  {navItems.map((item) => {
                    const isActive = location === item.url || (item.url !== "/" && location.startsWith(item.url));
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={isActive}
                          tooltip={item.title}
                          className={`
                            gap-3 px-3 py-2 h-10 rounded-md transition-all duration-200
                            ${isActive 
                              ? "bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90 hover:text-primary-foreground" 
                              : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            }
                          `}
                        >
                          <Link to={item.url}>
                            <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "stroke-[2]" : "stroke-[1.5]"}`} />
                            <span className="text-sm font-medium group-data-[collapsible=icon]:hidden truncate">
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
          {/* Top Header */}
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-md shadow-sm">
            <SidebarTrigger className="-ml-1" />
            <Link to="/" className="md:hidden flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg">PropHub</span>
            </Link>
            <Separator orientation="vertical" className="h-6 hidden md:block" />
            
            <div className="flex-1"></div>

            <div className="flex items-center gap-4">
              <div className="relative max-w-md hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Global search..."
                  className="w-full rounded-full bg-muted/50 pl-9 md:w-[200px] lg:w-[300px] border-none h-9 text-sm focus-visible:ring-1"
                />
              </div>
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full">
                <Bell className="h-5 w-5 stroke-[1.5]" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
              </Button>
              <UserNav />
            </div>
          </header>
          
          {/* Page Content */}
          <div className="flex-1 overflow-auto p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

function UserNav() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src="/avatars/01.png" alt="@admin" />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">john.doe@prophub.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={() => navigate("/")}>
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
