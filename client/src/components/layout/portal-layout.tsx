import { 
  Building2, 
  Settings, 
  LogOut, 
  User, 
  CreditCard, 
  Wrench 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation().pathname;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/portal" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight hidden sm:block">Tenant Portal</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <NavLink href="/portal" active={location === "/portal"} icon={Building2} label="Home" />
              <NavLink href="/portal/payments" active={location.includes("payments")} icon={CreditCard} label="Payments" />
              <NavLink href="/portal/maintenance" active={location.includes("maintenance")} icon={Wrench} label="Maintenance" />
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <UserNav />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 animate-in fade-in-50">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, active, icon: Icon, label }: any) {
  return (
    <Link 
      to={href}
      className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
        active ? "text-primary" : "text-muted-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/02.png" alt="@tenant" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Sarah Jenkins</p>
            <p className="text-xs leading-none text-muted-foreground">Unit 101 • Sunset Heights</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
