import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Building, Mail, Lock, User as UserIcon, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth, User } from "@/lib/auth-context";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [accountType, setAccountType] = useState<'seeker' | 'business'>('seeker');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a mock user depending on the selected tab
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name: "Demo User",
      type: accountType === 'seeker' ? 'buyer' : 'agent'
    };
    login(newUser);
    
    if (accountType === 'seeker') {
      setLocation("/account");
    } else {
      setLocation("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Building className="h-8 w-8 text-primary" />
        <span className="font-heading font-bold text-2xl tracking-tight">
          Naija<span className="text-primary">Homes</span>
        </span>
      </Link>

      <Card className="w-full max-w-md shadow-xl border-slate-100 rounded-2xl overflow-hidden">
        <CardHeader className="space-y-1 text-center bg-white border-b border-slate-100 pb-6">
          <CardTitle className="text-2xl font-heading font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your NaijaHomes account</CardDescription>
        </CardHeader>
        
        <Tabs value={accountType} onValueChange={(v) => setAccountType(v as 'seeker'|'business')} className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="grid w-full grid-cols-2 h-12 bg-slate-100/80">
              <TabsTrigger value="seeker" className="font-semibold gap-2">
                <UserIcon className="h-4 w-4" /> Buyer / Renter
              </TabsTrigger>
              <TabsTrigger value="business" className="font-semibold gap-2">
                <Briefcase className="h-4 w-4" /> Agent / Landlord
              </TabsTrigger>
            </TabsList>
          </div>
          
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-300">
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
                {accountType === 'seeker' ? 'Sign In to Account' : 'Sign In to Dashboard'}
              </Button>
            </form>
          </CardContent>
        </Tabs>
        
        <CardFooter className="flex flex-col space-y-4 border-t border-slate-100 p-6 bg-slate-50/50">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account? <Link href="/signup" className="text-primary font-semibold hover:underline">Create an account</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
