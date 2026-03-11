import { useParams } from "wouter";
import { mockProperties } from "@/lib/data/mock-properties";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Bed, Bath, Grid2X2, Phone, Mail, CheckCircle2, ChevronLeft, Share2, Heart, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center flex-col text-center p-4">
          <h1 className="text-4xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-8">The property you are looking for does not exist or has been removed.</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-NG').format(property.price);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Search Results
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white">
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
            <Button variant="outline" size="sm" className="bg-white">
              <Heart className="h-4 w-4 mr-2" /> Save
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Image Gallery (Simplified for mockup) */}
            <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden shadow-sm h-[400px] md:h-[500px]">
              <div className="col-span-4 md:col-span-3 row-span-2 relative group cursor-pointer">
                <img 
                  src={property.images[0]} 
                  alt={property.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-primary hover:bg-primary font-semibold text-lg px-3 py-1 shadow-md">
                    For {property.type === 'sale' ? 'Sale' : 'Rent'}
                  </Badge>
                </div>
              </div>
              <div className="hidden md:block col-span-1 row-span-1 relative group cursor-pointer overflow-hidden">
                <img src={property.images[1]} alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="hidden md:block col-span-1 row-span-1 relative group cursor-pointer overflow-hidden">
                <img src={property.images[2] || property.images[0]} alt="Gallery 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">+ More Photos</span>
                </div>
              </div>
            </div>

            {/* Title & Price */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-slate-600 bg-slate-50 border-slate-200">
                      {property.propertyType}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location.city}, {property.location.state}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
                    {property.title}
                  </h1>
                  <p className="text-muted-foreground mt-2 text-lg">
                    {property.location.address}
                  </p>
                </div>
                <div className="text-left md:text-right shrink-0">
                  <p className="text-3xl md:text-4xl font-heading font-bold text-primary">
                    {property.currency}{formattedPrice}
                  </p>
                  {property.period && (
                    <p className="text-muted-foreground font-medium">per {property.period}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-100 mt-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <Bed className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Bedrooms</p>
                    <p className="font-bold text-lg">{property.features.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <Bath className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Bathrooms</p>
                    <p className="font-bold text-lg">{property.features.bathrooms}</p>
                  </div>
                </div>
                {property.features.sqm && (
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                      <Grid2X2 className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Area</p>
                      <p className="font-bold text-lg">{property.features.sqm} sqm</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-heading font-bold mb-4">Property Description</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <p>{property.description}</p>
              </div>
            </div>

            {/* Amenities (Placeholder) */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-heading font-bold mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                {['Running Water', '24/7 Security', 'Ample Parking', 'Fenced Compound', 'Prepaid Meter', 'Good Road Network'].map(amenity => (
                  <div key={amenity} className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Agent & Contact */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Agent Card */}
            <Card className="p-6 rounded-2xl shadow-sm border-slate-200 sticky top-24">
              <h3 className="font-heading font-bold text-lg mb-6">Listed By</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-white shadow-sm flex items-center justify-center text-xl font-bold text-slate-500">
                  {property.agent.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-lg flex items-center gap-1">
                    {property.agent.name}
                    {property.agent.verified && (
                      <CheckCircle2 className="h-4 w-4 text-primary" title="Verified Agent" />
                    )}
                  </h4>
                  {property.agent.agency ? (
                    <p className="text-sm text-muted-foreground">{property.agent.agency}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Independent Agent/Landlord</p>
                  )}
                </div>
              </div>

              {property.agent.verified && (
                <div className="bg-green-50 text-green-800 text-sm p-3 rounded-lg flex items-start gap-2 mb-6 border border-green-100">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-green-600" />
                  <p>This agent has been verified by NaijaHomes with a valid government ID.</p>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <Button className="w-full h-12 text-base font-bold shadow-md hover:shadow-lg transition-shadow">
                  <Phone className="mr-2 h-5 w-5" /> Show Phone Number
                </Button>
                <Button variant="outline" className="w-full h-12 text-base font-bold border-2">
                  <Mail className="mr-2 h-5 w-5" /> Send Message
                </Button>
                <Button variant="secondary" className="w-full h-12 text-base font-bold text-green-700 bg-green-100 hover:bg-green-200">
                  Chat on WhatsApp
                </Button>
              </div>

              <div className="text-center text-xs text-muted-foreground mt-4 pt-4 border-t border-slate-100">
                <p>Never pay money before physical inspection. Be careful of scams.</p>
              </div>
            </Card>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
