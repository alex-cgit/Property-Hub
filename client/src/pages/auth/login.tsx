import { 
  Building2, 
  LogIn 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn(); // This triggers OAuth or magic link
      // If mock mode, just assume manager
      // toast({ title: "Logged in (Dev Mode)" });
      // navigate("/dashboard");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Login Error",
        description: err.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm mb-4">
            <Building2 className="h-6 w-6 stroke-[2]" />
          </div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to Property Hub to manage your portfolio.
          </p>
        </div>

        <div className="grid gap-4">
          <Button 
            className="w-full" 
            size="lg" 
            onClick={handleLogin} 
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : (
              <>
                <LogIn className="mr-2 h-4 w-4" /> Sign in with Google
              </>
            )}
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full" size="lg" disabled>
            Email / Password (Coming Soon)
          </Button>
        </div>

        <p className="px-8 text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
