import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, ShieldCheck, Zap, Star } from "lucide-react";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { useAuth } from "@/lib/auth-context";

export default function Pricing() {
  const { user } = useAuth();
  const [paymentModal, setPaymentModal] = useState<{
    open: boolean;
    planName: string;
    amount: number;
    type: 'subscription' | 'boost' | 'verification';
  }>({
    open: false,
    planName: "",
    amount: 0,
    type: 'subscription'
  });

  const handleOpenPayment = (planName: string, amount: number, type: 'subscription' | 'boost' | 'verification') => {
    setPaymentModal({ open: true, planName, amount, type });
  };

  const isLister = user?.type === 'agent' || user?.type === 'landlord';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">For Agents & Landlords</Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-4 tracking-tight">
              Simple pricing to grow your real estate business
            </h1>
            <p className="text-xl text-muted-foreground">
              Start for free, upgrade when you need to list more properties or reach more clients.
            </p>
          </div>

          {/* Subscription Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
            
            {/* Free Plan */}
            <Card className="border-slate-200 shadow-sm relative flex flex-col bg-white">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl font-heading">Basic</CardTitle>
                <CardDescription>Perfect for individual landlords</CardDescription>
                <div className="mt-4 flex items-baseline text-4xl font-heading font-extrabold">
                  Free
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span>Up to 3 active listings</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span>Standard property visibility</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span>Basic analytics dashboard</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-400">
                    <XCircle className="h-5 w-5 shrink-0" />
                    <span>No verified agent badge</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-400">
                    <XCircle className="h-5 w-5 shrink-0" />
                    <span>No priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full h-12 font-bold" disabled>
                  Current Plan
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="border-primary shadow-xl relative flex flex-col scale-105 z-10 bg-white">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-primary text-white font-bold px-3 py-1 shadow-sm uppercase tracking-wider text-xs">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="pb-8 pt-8">
                <CardTitle className="text-2xl font-heading text-primary">Pro Agent</CardTitle>
                <CardDescription>For growing real estate agents</CardDescription>
                <div className="mt-4 flex items-baseline text-4xl font-heading font-extrabold">
                  ₦15,000<span className="text-lg text-muted-foreground font-normal ml-1">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4 text-sm text-slate-600 font-medium">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>Up to 20 active listings</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-bold text-slate-800">Verified Agent Badge included</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>2 Free Listing Boosts monthly</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>Advanced analytics & leads tracking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>Priority email support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="pb-8">
                <Button 
                  className="w-full h-12 font-bold shadow-md text-base"
                  onClick={() => handleOpenPayment("Pro Agent Plan (Monthly)", 15000, "subscription")}
                >
                  Upgrade to Pro
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="border-slate-200 shadow-sm relative flex flex-col bg-white">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl font-heading">Agency</CardTitle>
                <CardDescription>For established agencies & developers</CardDescription>
                <div className="mt-4 flex items-baseline text-4xl font-heading font-extrabold">
                  ₦50,000<span className="text-lg text-muted-foreground font-normal ml-1">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span>Unlimited active listings</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span>Verified Agency Badge</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span>10 Free Listing Boosts monthly</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span>Multi-agent dashboard</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span>24/7 Dedicated account manager</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full h-12 font-bold border-slate-300"
                  onClick={() => handleOpenPayment("Agency Plan (Monthly)", 50000, "subscription")}
                >
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* One-off Upgrades */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center mb-10">One-off Upgrades</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Boost */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Zap className="h-32 w-32" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Zap className="h-6 w-6 text-yellow-500" />
                    </div>
                    <CardTitle className="text-2xl font-heading">Listing Boost</CardTitle>
                  </div>
                  <CardDescription className="text-slate-300">
                    Push your property to the top of search results for 7 days.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold font-heading mb-4">₦3,000 <span className="text-base font-normal text-slate-400">/property</span></div>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-yellow-500" /> Get up to 10x more views</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-yellow-500" /> Highlighted visually in search</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold h-12"
                    onClick={() => handleOpenPayment("7-Day Listing Boost", 3000, "boost")}
                  >
                    Buy Boost
                  </Button>
                </CardFooter>
              </Card>

              {/* Verification */}
              <Card className="bg-white border-slate-200 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-heading">Agent Verification</CardTitle>
                  </div>
                  <CardDescription>
                    Build trust with clients by getting a verified badge on your profile.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold font-heading mb-4">₦10,000 <span className="text-base font-normal text-slate-500">/one-time</span></div>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Lifetime verified badge</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Increased buyer trust & leads</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Required ID/CAC verification check</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary/5 font-bold h-12"
                    onClick={() => handleOpenPayment("Lifetime Agent Verification", 10000, "verification")}
                  >
                    Apply for Verification
                  </Button>
                </CardFooter>
              </Card>

            </div>
          </div>

        </div>
      </main>

      <Footer />

      <PaymentModal 
        open={paymentModal.open} 
        onOpenChange={(open) => setPaymentModal(prev => ({...prev, open}))}
        planName={paymentModal.planName}
        amount={paymentModal.amount}
        type={paymentModal.type}
      />
    </div>
  );
}
