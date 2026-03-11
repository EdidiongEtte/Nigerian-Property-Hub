import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Building, UserCircle, Briefcase, Mail, Lock, Phone, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth, User } from "@/lib/auth-context";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  
  const [userType, setUserType] = useState<'seeker' | 'lister'>('seeker');
  const [role, setRole] = useState<'buyer' | 'renter' | 'landlord' | 'agent' | null>(null);
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    
    // Log user in using mock auth context
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name: name || "User",
      type: role
    };
    login(newUser);
    
    if (role === 'buyer' || role === 'renter') {
      setLocation("/account");
    } else {
      setLocation("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 items-center justify-center p-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Building className="h-8 w-8 text-primary" />
        <span className="font-heading font-bold text-2xl tracking-tight">
          Naija<span className="text-primary">Homes</span>
        </span>
      </Link>

      <Card className="w-full max-w-md shadow-xl border-slate-100 rounded-2xl">
        <CardHeader className="space-y-1 text-center pb-4">
          <CardTitle className="text-2xl font-heading font-bold">Create an account</CardTitle>
          <CardDescription>Join NaijaHomes to get started</CardDescription>
        </CardHeader>
        <CardContent>
          {!role ? (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <Tabs value={userType} onValueChange={(v) => setUserType(v as 'seeker'|'lister')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-12 mb-6">
                  <TabsTrigger value="seeker" className="font-semibold text-base">Looking for a home</TabsTrigger>
                  <TabsTrigger value="lister" className="font-semibold text-base">Listing a property</TabsTrigger>
                </TabsList>
                
                <TabsContent value="seeker" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setRole('buyer')}
                      className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <Home className="h-10 w-10 text-slate-400" />
                      <span className="font-semibold">Buyer</span>
                      <span className="text-xs text-muted-foreground text-center">I want to buy a property</span>
                    </button>
                    <button
                      onClick={() => setRole('renter')}
                      className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <Search className="h-10 w-10 text-slate-400" />
                      <span className="font-semibold">Renter</span>
                      <span className="text-xs text-muted-foreground text-center">I want to rent a property</span>
                    </button>
                  </div>
                </TabsContent>
                
                <TabsContent value="lister" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setRole('landlord')}
                      className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <UserCircle className="h-10 w-10 text-slate-400" />
                      <span className="font-semibold">Landlord</span>
                      <span className="text-xs text-muted-foreground text-center">I own properties to list</span>
                    </button>
                    <button
                      onClick={() => setRole('agent')}
                      className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <Briefcase className="h-10 w-10 text-slate-400" />
                      <span className="font-semibold">Agent</span>
                      <span className="text-xs text-muted-foreground text-center">I manage properties for others</span>
                    </button>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="text-center mt-6 text-sm">
                Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
              <div className="flex items-center justify-between mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold capitalize bg-primary text-white px-2 py-0.5 rounded-md">
                    {role} Account
                  </span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setRole(null)}
                  className="text-xs text-muted-foreground hover:text-foreground font-medium"
                >
                  Change Role
                </button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required className="h-12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input id="email" type="email" placeholder="john@example.com" required className="pl-10 h-12" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input id="phone" type="tel" placeholder="08012345678" required className="pl-10 h-12" />
                </div>
              </div>

              {role === 'agent' && (
                <div className="space-y-2">
                  <Label htmlFor="agency">Agency Name (Optional)</Label>
                  <Input id="agency" placeholder="John Doe Properties Ltd" className="h-12" />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input id="password" type="password" required className="pl-10 h-12" />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-base font-bold shadow-md mt-6">
                Create Account
              </Button>
            </form>
          )}
        </CardContent>
        {role && (
          <CardFooter className="flex justify-center border-t border-slate-100 p-4">
            <div className="text-sm text-center">
              Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
