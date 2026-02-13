import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  Building2, 
  Users, 
  Wrench, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { properties, maintenanceRequests, financialStats } from "@/lib/mock-data";

export default function Dashboard() {
  const totalProperties = properties.length;
  const totalUnits = properties.reduce((acc, p) => acc + p.units, 0);
  const activeMaintenance = maintenanceRequests.filter(m => m.status !== "Completed").length;
  const occupancyRate = Math.round(properties.reduce((acc, p) => acc + p.occupancyRate, 0) / totalProperties);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your property portfolio performance.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Download Report</Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">Add Property</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Properties" 
          value={totalProperties.toString()} 
          description={`${totalUnits} Total Units`}
          icon={Building2}
          trend="+12% from last month"
          trendUp={true}
        />
        <StatsCard 
          title="Occupancy Rate" 
          value={`${occupancyRate}%`} 
          description="Across all properties"
          icon={Users}
          trend="+2.5% from last month"
          trendUp={true}
        />
        <StatsCard 
          title="Active Maintenance" 
          value={activeMaintenance.toString()} 
          description="Open requests"
          icon={Wrench}
          trend="-4 requests today"
          trendUp={true} // Less maintenance is good? Or bad? Let's say good contextually
          trendColor="text-emerald-500"
        />
        <StatsCard 
          title="Total Revenue" 
          value="$145,230" 
          description="Current Month"
          icon={DollarSign}
          trend="+8% from last month"
          trendUp={true}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm border-border/60">
          <CardHeader>
            <CardTitle className="font-heading">Revenue Overview</CardTitle>
            <CardDescription>Monthly income vs expenses for the current year.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={financialStats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    itemStyle={{ fontSize: "12px", fontWeight: 500 }}
                  />
                  <Area type="monotone" dataKey="income" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                  <Area type="monotone" dataKey="expenses" stroke="hsl(var(--destructive))" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 shadow-sm border-border/60">
          <CardHeader>
            <CardTitle className="font-heading">Recent Activity</CardTitle>
            <CardDescription>Latest actions and alerts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className={`mt-0.5 h-2 w-2 rounded-full ${activity.color} mr-3`} />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {properties.map(property => (
          <Card key={property.id} className="rounded-none overflow-hidden hover:border-primary transition-all duration-500 border-border/50 group">
            <div className="relative h-64 w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
               <img 
                src={property.image} 
                alt={property.name}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                {property.type}
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-lg uppercase tracking-tight">{property.name}</CardTitle>
              <CardDescription className="text-[10px] uppercase tracking-widest">{property.address}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-[10px] uppercase tracking-widest mb-2 font-bold">
                <span>Occupancy</span>
                <span>{property.occupancyRate}%</span>
              </div>
              <div className="w-full bg-secondary h-[1px]">
                <div 
                  className="bg-primary h-full" 
                  style={{ width: `${property.occupancyRate}%` }} 
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StatsCard({ title, value, description, icon: Icon, trend, trendUp, trendColor }: any) {
  return (
    <Card className="rounded-none border-border/50 bg-background hover:border-primary transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-sans">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground stroke-[1.5]" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-medium font-heading tracking-tight">{value}</div>
        {description && <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-2">{description}</p>}
      </CardContent>
    </Card>
  );
}

const recentActivity = [
  {
    title: "New lease signed for Unit 101",
    time: "2 hours ago",
    color: "bg-emerald-500"
  },
  {
    title: "Maintenance completed at Sunset Heights",
    time: "4 hours ago",
    color: "bg-blue-500"
  },
  {
    title: "Rent payment received from TechStart Inc.",
    time: "Yesterday at 2:00 PM",
    color: "bg-emerald-500"
  },
  {
    title: "New maintenance request: HVAC Issue",
    time: "Yesterday at 11:30 AM",
    color: "bg-amber-500"
  },
  {
    title: "Monthly financial report generated",
    time: "2 days ago",
    color: "bg-purple-500"
  }
];
