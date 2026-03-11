import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/property/SearchBar";
import PropertyCard from "@/components/property/PropertyCard";
import { mockProperties } from "@/lib/data/mock-properties";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck, MapPin } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export default function Home() {
  const featuredProperties = mockProperties.filter(p => p.featured);
  const latestProperties = mockProperties.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 md:pt-32 md:pb-48 px-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImg} 
              alt="Beautiful Nigerian Home" 
              className="w-full h-full object-cover brightness-[0.4] saturate-[1.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
          </div>
          
          <div className="container relative z-10 mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-6 tracking-tight max-w-4xl mx-auto leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
              Find your perfect home in <span className="text-primary-foreground underline decoration-primary decoration-4 underline-offset-8">Nigeria</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-12 max-w-2xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              Search properties for sale and rent from verified estate agents and landlords across Lagos, Abuja, Port Harcourt and more.
            </p>
            
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Verified Listings</h3>
                <p className="text-muted-foreground">We verify agents and landlords to ensure you find safe and genuine properties.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Everywhere in Nigeria</h3>
                <p className="text-muted-foreground">From the islands of Lagos to the heart of Abuja, find properties wherever you want.</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Easy to Use</h3>
                <p className="text-muted-foreground">Our platform is designed to be simple, fast, and mobile-friendly for all users.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-16 md:py-24 container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Featured Properties</h2>
              <p className="text-muted-foreground text-lg">Handpicked premium properties across Nigeria</p>
            </div>
            <Button variant="ghost" className="hidden sm:flex text-primary hover:text-primary hover:bg-primary/5 font-semibold group">
              View all <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-8 sm:hidden font-semibold border-primary text-primary">
            View all properties
          </Button>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground mt-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-black/10 blur-3xl"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Are you a Landlord or Agent?</h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Reach thousands of potential tenants and buyers daily. List your property on NaijaHomes today.
            </p>
            <Button size="lg" variant="secondary" className="font-bold text-primary px-8 h-14 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
              Post a Property Free
            </Button>
          </div>
        </section>

        {/* Latest Properties */}
        <section className="py-16 md:py-24 container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Recently Added</h2>
              <p className="text-muted-foreground text-lg">Fresh properties on the market</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
