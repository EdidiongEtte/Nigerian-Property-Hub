import { Link, useLocation } from "wouter";
import { Building, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function Login() {
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login, redirect to dashboard
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Building className="h-8 w-8 text-primary" />
        <span className="font-heading font-bold text-2xl tracking-tight">
          Naija<span className="text-primary">Homes</span>
        </span>
      </Link>

      <Card className="w-full max-w-md shadow-xl border-slate-100 rounded-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-heading font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to manage your listings and enquiries</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <Input id="email" type="email" placeholder="name@example.com" required className="pl-10 h-12" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary font-medium hover:underline" tabIndex={-1}>Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <Input id="password" type="password" required className="pl-10 h-12" />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-bold shadow-md mt-6">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t border-slate-100 p-6">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account? <Link href="/signup" className="text-primary font-semibold hover:underline">Create an account</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
