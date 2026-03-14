import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShieldCheck, Upload, AlertCircle, FileText, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { Link, useLocation } from "wouter";

export default function Verification() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [cacFile, setCacFile] = useState<File | null>(null);
  
  // Status can be 'unverified', 'pending', 'verified', 'rejected'
  const [status, setStatus] = useState<'unverified' | 'pending' | 'verified'>(
    user?.type === 'agent' && user.name.includes('Doe') ? 'verified' : 'unverified'
  );

  if (!user || (user.type !== 'agent' && user.type !== 'landlord')) {
    setLocation("/");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Move to processing step
    
    // Simulate API delay
    setTimeout(() => {
      setStatus('pending');
      toast({
        title: "Documents Submitted",
        description: "Your verification request is under review. This usually takes 24-48 hours.",
        duration: 5000,
      });
      setLocation("/dashboard");
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'id' | 'cac') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'id') setIdFile(e.target.files[0]);
      if (type === 'cac') setCacFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 py-12 px-4 container mx-auto max-w-3xl">
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary mb-4 inline-block">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-3xl font-heading font-bold flex items-center gap-3">
            Account Verification
            {status === 'verified' && <ShieldCheck className="h-8 w-8 text-green-500" />}
          </h1>
          <p className="text-muted-foreground mt-2">Build trust with clients by verifying your identity and business.</p>
        </div>

        {status === 'verified' ? (
          <Card className="border-green-200 shadow-sm rounded-2xl bg-green-50/50">
            <CardContent className="pt-6 flex flex-col items-center text-center p-8">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <ShieldCheck className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">You are Verified!</h2>
              <p className="text-green-800/80 mb-6 max-w-md">
                Your account has been successfully verified. The verified badge now appears on all your listings, helping you attract more serious buyers and renters.
              </p>
              <Link href="/dashboard">
                <Button className="bg-green-600 hover:bg-green-700 font-bold">
                  Go to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : status === 'pending' ? (
          <Card className="border-amber-200 shadow-sm rounded-2xl bg-amber-50/50">
            <CardContent className="pt-6 flex flex-col items-center text-center p-8">
              <div className="h-20 w-20 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                <AlertCircle className="h-10 w-10 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-amber-900 mb-2">Verification Pending</h2>
              <p className="text-amber-800/80 mb-6 max-w-md">
                We have received your documents and our team is currently reviewing them. We'll notify you once your account is verified. This usually takes 24-48 hours.
              </p>
              <Link href="/dashboard">
                <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100 font-bold">
                  Return to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-bold mb-3">1</div>
                <h3 className="font-semibold mb-1">Personal Details</h3>
                <p className="text-sm text-muted-foreground">Confirm your basic info</p>
              </div>
              <div className={`bg-white p-4 rounded-xl border shadow-sm ${step >= 2 ? 'border-primary' : 'border-slate-200 opacity-60'}`}>
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center font-bold mb-3 ${step >= 2 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>2</div>
                <h3 className="font-semibold mb-1">Upload Documents</h3>
                <p className="text-sm text-muted-foreground">ID and Business docs</p>
              </div>
              <div className={`bg-white p-4 rounded-xl border shadow-sm ${step >= 3 ? 'border-primary' : 'border-slate-200 opacity-60'}`}>
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center font-bold mb-3 ${step >= 3 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>3</div>
                <h3 className="font-semibold mb-1">Review</h3>
                <p className="text-sm text-muted-foreground">Submit for approval</p>
              </div>
            </div>

            <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="animate-in fade-in duration-300">
                    <CardHeader className="bg-slate-50 border-b border-slate-100">
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Please ensure these details match your government ID</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Legal First Name</Label>
                          <Input defaultValue={user.name.split(' ')[0]} required />
                        </div>
                        <div className="space-y-2">
                          <Label>Legal Last Name</Label>
                          <Input defaultValue={user.name.split(' ')[1] || ''} required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>BVN (Bank Verification Number)</Label>
                        <Input placeholder="Enter 11-digit BVN" maxLength={11} required />
                        <p className="text-xs text-muted-foreground">Your BVN is secure and only used to verify your identity.</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Registered Agency Name (If applicable)</Label>
                        <Input placeholder="e.g. Adeola Properties Ltd" />
                      </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50 border-t border-slate-100 pt-6 flex justify-end">
                      <Button type="button" onClick={() => setStep(2)} className="font-bold px-8">
                        Next Step
                      </Button>
                    </CardFooter>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <CardHeader className="bg-slate-50 border-b border-slate-100">
                      <CardTitle>Upload Documents</CardTitle>
                      <CardDescription>Provide clear photos or scans of the required documents</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      
                      {/* ID Upload */}
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">Government Issued ID <span className="text-red-500">*</span></Label>
                        <p className="text-sm text-muted-foreground">NIN Slip, Driver's License, International Passport, or Voter's Card</p>
                        
                        <div className="relative">
                          <input 
                            type="file" 
                            id="id-upload" 
                            className="hidden" 
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange(e, 'id')}
                            required
                          />
                          <Label 
                            htmlFor="id-upload" 
                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${idFile ? 'border-green-500 bg-green-50' : 'border-slate-300 hover:bg-slate-50'}`}
                          >
                            {idFile ? (
                              <>
                                <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
                                <span className="text-sm font-medium text-green-700">{idFile.name}</span>
                              </>
                            ) : (
                              <>
                                <Upload className="h-8 w-8 text-slate-400 mb-2" />
                                <span className="text-sm font-medium text-slate-600">Click to upload or drag and drop</span>
                                <span className="text-xs text-slate-400 mt-1">JPG, PNG or PDF (Max 5MB)</span>
                              </>
                            )}
                          </Label>
                        </div>
                      </div>

                      {/* CAC Upload (Optional) */}
                      <div className="space-y-3 pt-4 border-t border-slate-100">
                        <Label className="text-base font-semibold">CAC Certificate (Optional)</Label>
                        <p className="text-sm text-muted-foreground">Required if you operate as a registered business/agency.</p>
                        
                        <div className="relative">
                          <input 
                            type="file" 
                            id="cac-upload" 
                            className="hidden" 
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange(e, 'cac')}
                          />
                          <Label 
                            htmlFor="cac-upload" 
                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${cacFile ? 'border-green-500 bg-green-50' : 'border-slate-300 hover:bg-slate-50'}`}
                          >
                            {cacFile ? (
                              <>
                                <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
                                <span className="text-sm font-medium text-green-700">{cacFile.name}</span>
                              </>
                            ) : (
                              <>
                                <FileText className="h-8 w-8 text-slate-400 mb-2" />
                                <span className="text-sm font-medium text-slate-600">Click to upload CAC document</span>
                              </>
                            )}
                          </Label>
                        </div>
                      </div>

                    </CardContent>
                    <CardFooter className="bg-slate-50 border-t border-slate-100 pt-6 flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="font-bold">
                        Back
                      </Button>
                      <Button type="submit" disabled={!idFile} className="font-bold px-8 shadow-md">
                        Submit Verification
                      </Button>
                    </CardFooter>
                  </div>
                )}
                
                {step === 3 && (
                  <CardContent className="py-12 flex flex-col items-center justify-center">
                    <span className="h-12 w-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-4"></span>
                    <h3 className="text-xl font-bold">Submitting Documents...</h3>
                    <p className="text-muted-foreground mt-2">Please do not close this window.</p>
                  </CardContent>
                )}
              </form>
            </Card>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-sm text-blue-800">
              <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5 text-blue-600" />
              <div>
                <p className="font-bold mb-1">Why do we need this?</p>
                <p>To keep NaijaHomes safe and free from scams, we require all property listers to verify their identity. Verified accounts receive up to 5x more leads from serious buyers and renters.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
