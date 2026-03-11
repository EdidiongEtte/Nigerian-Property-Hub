import { useState } from "react";
import { Link, useLocation } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, Image as ImageIcon, X, MapPin, Tag, List, CheckCircle2, Building, Bed, Bath, Grid2X2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PostListing() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [images, setImages] = useState<string[]>([]);

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Property Listed Successfully!",
      description: "Your property is now live on NaijaHomes.",
    });
    setTimeout(() => {
      setLocation("/");
    }, 2000);
  };

  // Mock image upload
  const handleAddImage = () => {
    if (images.length < 5) {
      setImages([...images, `https://source.unsplash.com/random/400x300?house&sig=${Math.random()}`]);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground">Post a New Property</h1>
          <p className="text-muted-foreground mt-2">Fill in the details below to list your property on NaijaHomes.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full"></div>
          <div className="absolute left-0 top-1/2 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-300" 
               style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
          
          {[1, 2, 3].map((num) => (
            <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
              step >= num ? 'bg-primary text-white shadow-md' : 'bg-slate-200 text-slate-500'
            }`}>
              {step > num ? <CheckCircle2 className="h-5 w-5" /> : num}
            </div>
          ))}
        </div>

        <Card className="shadow-lg border-slate-100 rounded-2xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <Tag className="h-5 w-5" />
                    <span className="font-semibold tracking-wide">Step 1</span>
                  </div>
                  <CardTitle className="text-2xl font-heading">Basic Information</CardTitle>
                  <CardDescription>What kind of property are you listing?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  
                  <div className="space-y-4">
                    <Label className="text-base">Listing Type</Label>
                    <Tabs defaultValue="rent" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 h-12">
                        <TabsTrigger value="rent" className="font-semibold text-base">For Rent</TabsTrigger>
                        <TabsTrigger value="sale" className="font-semibold text-base">For Sale</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="title" className="text-base">Property Title <span className="text-red-500">*</span></Label>
                    <Input id="title" placeholder="e.g. Beautiful 3 Bedroom Flat in Yaba" className="h-12" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="type" className="text-base">Property Type <span className="text-red-500">*</span></Label>
                      <Select required>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment / Flat</SelectItem>
                          <SelectItem value="house">House / Duplex</SelectItem>
                          <SelectItem value="bungalow">Bungalow</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                          <SelectItem value="commercial">Commercial Property</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="price" className="text-base">Price (₦) <span className="text-red-500">*</span></Label>
                      <Input id="price" type="number" placeholder="e.g. 1500000" className="h-12" required />
                    </div>
                  </div>

                </CardContent>
                <CardFooter className="flex justify-end pt-6 border-t border-slate-100 bg-slate-50">
                  <Button type="button" onClick={handleNext} className="h-12 px-8 font-bold text-base shadow-md">
                    Next Step
                  </Button>
                </CardFooter>
              </div>
            )}

            {/* Step 2: Details & Location */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <MapPin className="h-5 w-5" />
                    <span className="font-semibold tracking-wide">Step 2</span>
                  </div>
                  <CardTitle className="text-2xl font-heading">Location & Features</CardTitle>
                  <CardDescription>Where is it located and what features does it have?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
                        <Select required>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lagos">Lagos</SelectItem>
                            <SelectItem value="abuja">Abuja (FCT)</SelectItem>
                            <SelectItem value="rivers">Rivers</SelectItem>
                            <SelectItem value="akwa-ibom">Akwa Ibom</SelectItem>
                            <SelectItem value="oyo">Oyo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="city">City / Area <span className="text-red-500">*</span></Label>
                        <Input id="city" placeholder="e.g. Lekki Phase 1" className="h-12" required />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="address">Full Address</Label>
                      <Input id="address" placeholder="e.g. 12 Admiralty Way" className="h-12" />
                    </div>
                  </div>

                  <div className="space-y-4 mt-8">
                    <h3 className="font-semibold text-lg border-b pb-2">Features</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="bedrooms" className="flex items-center gap-1"><Bed className="h-4 w-4"/> Beds</Label>
                        <Input id="bedrooms" type="number" min="0" defaultValue="0" className="h-12" />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="bathrooms" className="flex items-center gap-1"><Bath className="h-4 w-4"/> Baths</Label>
                        <Input id="bathrooms" type="number" min="0" defaultValue="0" className="h-12" />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="sqm" className="flex items-center gap-1"><Grid2X2 className="h-4 w-4"/> Sqm</Label>
                        <Input id="sqm" type="number" placeholder="Optional" className="h-12" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe the property, amenities, neighborhood, etc." 
                      className="min-h-[120px] resize-y" 
                      required 
                    />
                  </div>

                </CardContent>
                <CardFooter className="flex justify-between pt-6 border-t border-slate-100 bg-slate-50">
                  <Button type="button" variant="outline" onClick={handlePrev} className="h-12 px-6 font-bold">
                    Back
                  </Button>
                  <Button type="button" onClick={handleNext} className="h-12 px-8 font-bold text-base shadow-md">
                    Next Step
                  </Button>
                </CardFooter>
              </div>
            )}

            {/* Step 3: Photos & Publish */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <ImageIcon className="h-5 w-5" />
                    <span className="font-semibold tracking-wide">Step 3</span>
                  </div>
                  <CardTitle className="text-2xl font-heading">Photos & Publish</CardTitle>
                  <CardDescription>Upload high-quality photos to attract more clients.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">Property Images (Max 5)</Label>
                      <span className="text-sm text-muted-foreground">{images.length}/5 uploaded</span>
                    </div>
                    
                    {/* Mock Upload Area */}
                    <div 
                      onClick={handleAddImage}
                      className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-primary transition-colors min-h-[200px]"
                    >
                      <UploadCloud className="h-12 w-12 text-slate-400 mb-4" />
                      <p className="font-semibold text-lg text-slate-700">Click to upload photos</p>
                      <p className="text-slate-500 text-sm mt-1">JPG, PNG up to 5MB each</p>
                    </div>

                    {/* Image Preview Grid */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                        {images.map((img, i) => (
                          <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
                            <img src={img} alt={`Upload ${i}`} className="w-full h-full object-cover" />
                            <button 
                              type="button"
                              onClick={() => handleRemoveImage(i)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            {i === 0 && (
                              <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-white text-xs text-center py-1 font-semibold">
                                Cover Photo
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </CardContent>
                <CardFooter className="flex justify-between pt-6 border-t border-slate-100 bg-slate-50">
                  <Button type="button" variant="outline" onClick={handlePrev} className="h-12 px-6 font-bold">
                    Back
                  </Button>
                  <Button type="submit" className="h-12 px-8 font-bold text-base shadow-md bg-green-600 hover:bg-green-700 text-white">
                    Publish Listing
                  </Button>
                </CardFooter>
              </div>
            )}
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
