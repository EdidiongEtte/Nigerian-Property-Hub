import { Building, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Building className="h-6 w-6 text-primary" />
              <span className="font-heading font-bold text-xl tracking-tight">
                Naija<span className="text-primary">Homes</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              The number one property portal in Nigeria. Find your dream home, sell your property, or rent apartments with ease.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Properties for Sale</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Properties for Rent</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Commercial Properties</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Find an Agent</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Locations</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Properties in Lagos</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Properties in Abuja</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Properties in Port Harcourt</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Properties in Uyo</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NaijaHomes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
