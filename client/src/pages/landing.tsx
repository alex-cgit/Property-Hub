import { Link, useNavigate } from "react-router-dom";
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  BarChart3, 
  ShieldCheck, 
  Users, 
  Zap, 
  Globe, 
  Smartphone 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // In a real app, this would go to signup
    // For prototype, we'll go to dashboard
    navigate("/dashboard");
  };

  const handleLogin = () => {
    // In a real app, this would go to login
    // For prototype, we'll go to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-heading font-bold text-xl tracking-tight">
            <div className="flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground rounded-none">
              <Building2 className="h-5 w-5" />
            </div>
            <span className="uppercase tracking-widest">PROP</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="transition-colors hover:text-primary">Features</a>
            <a href="#pricing" className="transition-colors hover:text-primary">Pricing</a>
            <a href="#about" className="transition-colors hover:text-primary">About</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleLogin} className="hidden sm:flex text-xs uppercase tracking-widest font-bold">
              Log in
            </Button>
            <Button size="sm" onClick={handleGetStarted} className="rounded-none text-xs uppercase tracking-widest font-bold bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden border-b bg-muted/20">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <Badge variant="outline" className="w-fit rounded-none border-primary/20 bg-primary/5 text-primary uppercase tracking-widest text-[10px] font-bold py-1 px-3">
                    New: Portfolio Management
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-heading uppercase text-foreground">
                    Property Management <br/>
                    <span className="text-primary">Redefined.</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                    The all-in-one platform for modern property managers. Streamline operations, automate financials, and delight tenants with our powerful, intuitive suite.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={handleGetStarted} className="rounded-none uppercase tracking-widest font-bold h-12 px-8 text-sm">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-none uppercase tracking-widest font-bold h-12 px-8 text-sm border-foreground/20 hover:bg-muted">
                    View Demo
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>14-day free trial</span>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
                <div className="aspect-square md:aspect-[4/3] bg-muted/50 rounded-none border border-border/50 relative overflow-hidden shadow-2xl">
                   {/* Abstract UI Representation */}
                   <div className="absolute inset-0 bg-gradient-to-br from-background to-muted"></div>
                   <div className="absolute top-8 left-8 right-8 bottom-0 bg-background border-t border-x border-border/50 shadow-sm p-6">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-12 w-12 bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 w-32 bg-muted rounded-none"></div>
                          <div className="h-3 w-24 bg-muted/50 rounded-none"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="h-24 bg-muted/30 border border-border/50 p-4 space-y-2">
                           <div className="h-8 w-8 bg-emerald-500/10 mb-2"></div>
                           <div className="h-3 w-16 bg-muted rounded-none"></div>
                           <div className="h-5 w-20 bg-muted/50 rounded-none"></div>
                        </div>
                        <div className="h-24 bg-muted/30 border border-border/50 p-4 space-y-2">
                           <div className="h-8 w-8 bg-blue-500/10 mb-2"></div>
                           <div className="h-3 w-16 bg-muted rounded-none"></div>
                           <div className="h-5 w-20 bg-muted/50 rounded-none"></div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="h-12 w-full bg-muted/20 border border-border/50"></div>
                        <div className="h-12 w-full bg-muted/20 border border-border/50"></div>
                        <div className="h-12 w-full bg-muted/20 border border-border/50"></div>
                      </div>
                   </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -z-10 top-1/2 right-0 w-72 h-72 bg-primary/20 rounded-full blur-[100px] opacity-50"></div>
                <div className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] opacity-50"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 bg-background">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <Badge variant="outline" className="rounded-none uppercase tracking-widest text-[10px] text-muted-foreground border-muted-foreground/20">
                Powerful Features
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-heading uppercase">
                Everything you need to <span className="text-primary">scale</span>
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg">
                Built for portfolios of all sizes. Manage residential, commercial, and mixed-use properties with ease.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Building2} 
                title="Property Management" 
                description="Centralize all your properties, units, and leases. Track occupancy and expirations in real-time."
              />
              <FeatureCard 
                icon={Users} 
                title="Tenant Portal" 
                description="Give tenants a seamless experience for payments, maintenance requests, and communication."
              />
              <FeatureCard 
                icon={BarChart3} 
                title="Financial Reporting" 
                description="GAAP-compliant double-entry accounting. Generate P&L, balance sheets, and tax reports instantly."
              />
              <FeatureCard 
                icon={Zap} 
                title="Maintenance Automation" 
                description="Streamline work orders, assign vendors, and track repairs with automated workflows."
              />
              <FeatureCard 
                icon={Globe} 
                title="Online Payments" 
                description="Collect rent automatically via ACH or credit card. reduce late payments and manual entry."
              />
              <FeatureCard 
                icon={Smartphone} 
                title="Mobile First" 
                description="Manage your portfolio from anywhere. Our responsive design works perfectly on all devices."
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-32 bg-muted/20 border-y border-border/50">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <Badge variant="outline" className="rounded-none uppercase tracking-widest text-[10px] text-muted-foreground border-muted-foreground/20">
                Flexible Pricing
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-heading uppercase">
                Simple, transparent <span className="text-primary">pricing</span>
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg">
                Choose the plan that fits your portfolio size. No hidden fees.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter Plan */}
              <Card className="rounded-none border-border/50 shadow-sm hover:shadow-md transition-all flex flex-col relative overflow-hidden">
                <CardHeader className="pb-8">
                  <CardTitle className="text-lg font-heading uppercase tracking-tight">Starter</CardTitle>
                  <CardDescription>Perfect for small portfolios</CardDescription>
                  <div className="mt-4 flex items-baseline text-3xl font-bold">
                    $29<span className="text-sm font-normal text-muted-foreground ml-1">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Up to 20 Units</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Basic Accounting</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Maintenance Tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground/50">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Tenant Portal</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-none uppercase tracking-widest font-bold text-xs" variant="outline" onClick={handleGetStarted}>
                    Start Free Trial
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Plan */}
              <Card className="rounded-none border-primary shadow-lg flex flex-col relative overflow-hidden bg-background scale-105 z-10">
                <div className="absolute top-0 inset-x-0 h-1 bg-primary"></div>
                <div className="absolute top-3 right-3">
                   <Badge className="rounded-none bg-primary text-primary-foreground text-[8px] uppercase tracking-widest font-bold">Most Popular</Badge>
                </div>
                <CardHeader className="pb-8">
                  <CardTitle className="text-lg font-heading uppercase tracking-tight text-primary">Professional</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                  <div className="mt-4 flex items-baseline text-3xl font-bold">
                    $79<span className="text-sm font-normal text-muted-foreground ml-1">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Up to 100 Units</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Advanced Accounting</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Tenant Portal & Payments</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Document Storage</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Priority Support</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-none uppercase tracking-widest font-bold text-xs bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleGetStarted}>
                    Get Started
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Plan */}
              <Card className="rounded-none border-border/50 shadow-sm hover:shadow-md transition-all flex flex-col relative overflow-hidden">
                <CardHeader className="pb-8">
                  <CardTitle className="text-lg font-heading uppercase tracking-tight">Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                  <div className="mt-4 flex items-baseline text-3xl font-bold">
                    Custom
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Unlimited Units</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Custom API Integration</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Dedicated Account Manager</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>SLA Guarantee</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-none uppercase tracking-widest font-bold text-xs" variant="outline" onClick={() => window.location.href = "mailto:sales@prop.co"}>
                    Contact Sales
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-primary text-primary-foreground">
           <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center space-y-8">
             <h2 className="text-3xl font-bold tracking-tighter md:text-5xl font-heading uppercase">
               Ready to streamline your property management?
             </h2>
             <p className="text-primary-foreground/80 md:text-xl max-w-2xl mx-auto">
               Join thousands of property managers who trust PROP to run their business. Start your 14-day free trial today.
             </p>
             <Button size="lg" variant="secondary" onClick={handleGetStarted} className="rounded-none uppercase tracking-widest font-bold h-12 px-8 text-sm bg-background text-foreground hover:bg-background/90">
               Get Started for Free
             </Button>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border/50 py-12">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-heading font-bold text-lg tracking-tight">
              <div className="flex h-6 w-6 items-center justify-center bg-primary text-primary-foreground rounded-none">
                <Building2 className="h-4 w-4" />
              </div>
              <span className="uppercase tracking-widest">PROP</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
              The modern standard for property management software. Built for growth.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Updates</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>
        <div className="container px-4 md:px-6 max-w-7xl mx-auto mt-12 pt-8 border-t border-border/50 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Prop Management Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: any) {
  return (
    <div className="flex flex-col space-y-4 p-6 border border-border/50 hover:border-primary/50 transition-colors bg-card hover:shadow-sm group">
      <div className="h-12 w-12 bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-bold uppercase tracking-tight font-heading">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
