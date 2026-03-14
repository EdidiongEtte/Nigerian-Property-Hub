import { useParams } from "wouter";
import { mockProperties } from "@/lib/data/mock-properties";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Bed, Bath, Grid2X2, Phone, Mail, CheckCircle2, ChevronLeft, Share2, Heart, ShieldCheck, Map as MapIcon, Flag, Clock } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { ReportDialog } from "@/components/trust/ReportDialog";

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const property = mockProperties.find(p => p.id === id);
  const [reportOpen, setReportOpen] = useState(false);

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
  
  // Calculate a bounding box for the map to show context
  const bbox = {
    minLng: property.location.lng - 0.005,
    minLat: property.location.lat - 0.005,
    maxLng: property.location.lng + 0.005,
    maxLat: property.location.lat + 0.005,
  };

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
            
            {/* Image Gallery */}
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
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
              {property.agent.verified && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="h-3 w-3" /> VERIFIED LISTING
                </div>
              )}
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 mt-2">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-slate-600 bg-slate-50 border-slate-200">
                      {property.propertyType}
                    </Badge>
                    <span className="text-sm font-semibold text-primary flex items-center bg-primary/10 px-2 py-1 rounded-md">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location.area}, {property.location.city}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-4 mt-3">
                    <p className="text-muted-foreground flex items-center">
                      {property.location.address}, {property.location.state}
                    </p>
                    <div className="h-4 w-px bg-slate-300"></div>
                    <p className="text-sm text-slate-500 flex items-center gap-1.5 font-medium">
                      <Clock className="h-4 w-4" /> Updated 2 days ago
                    </p>
                  </div>
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

            {/* Map Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-bold flex items-center gap-2">
                  <MapIcon className="h-5 w-5 text-primary" /> Location Map
                </h2>
                <Badge variant="outline" className="text-slate-500">
                  {property.location.area}, {property.location.city}
                </Badge>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200 h-[300px] md:h-[400px] bg-slate-100 relative">
                {/* Embedded OpenStreetMap Iframe */}
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox.minLng}%2C${bbox.minLat}%2C${bbox.maxLng}%2C${bbox.maxLat}&layer=mapnik&marker=${property.location.lat}%2C${property.location.lng}`}
                  className="w-full h-full"
                ></iframe>
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium text-slate-600 border border-slate-200">
                  Exact location may be approximate for privacy
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
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

            {/* Report section below content */}
            <div className="flex justify-center mt-8 mb-12">
              <Button 
                variant="ghost" 
                className="text-slate-400 hover:text-red-600 hover:bg-red-50 text-sm font-medium gap-2"
                onClick={() => setReportOpen(true)}
              >
                <Flag className="h-4 w-4" /> Report this listing
              </Button>
            </div>

          </div>

          {/* Right Column - Agent & Contact */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Agent Card */}
            <Card className="p-6 rounded-2xl shadow-sm border-slate-200 sticky top-24">
              <h3 className="font-heading font-bold text-lg mb-6">Listed By</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-slate-100 overflow-hidden shrink-0 border-2 border-white shadow-sm flex items-center justify-center text-xl font-bold text-slate-500 relative">
                  {property.agent.name.charAt(0)}
                  {property.agent.verified && (
                    <div className="absolute bottom-0 right-0 bg-white rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-primary fill-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-lg flex items-center gap-1">
                    {property.agent.name}
                  </h4>
                  {property.agent.agency ? (
                    <p className="text-sm text-muted-foreground">{property.agent.agency}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Independent Agent/Landlord</p>
                  )}
                </div>
              </div>

              {property.agent.verified ? (
                <div className="bg-green-50 text-green-800 text-sm p-4 rounded-xl flex items-start gap-3 mb-6 border border-green-100 shadow-sm">
                  <ShieldCheck className="h-6 w-6 shrink-0 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Identity Verified</p>
                    <p className="text-xs text-green-700/80 leading-relaxed">This agent has been verified by NaijaHomes using a valid government ID or CAC document.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 text-slate-600 text-sm p-3 rounded-xl flex items-start gap-2 mb-6 border border-slate-100">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                  <p className="text-xs">This agent has not completed identity verification. Proceed with caution.</p>
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

              <div className="text-center text-xs text-muted-foreground mt-4 pt-4 border-t border-slate-100 bg-orange-50/50 p-3 rounded-lg border border-orange-100">
                <p className="font-semibold text-orange-800 mb-1">Stay Safe</p>
                <p>Never pay money before physical inspection. Be careful of scams.</p>
              </div>
            </Card>
            
          </div>
        </div>
      </main>

      <Footer />
      
      <ReportDialog 
        open={reportOpen} 
        onOpenChange={setReportOpen} 
        propertyTitle={property.title} 
      />
    </div>
  );
}
