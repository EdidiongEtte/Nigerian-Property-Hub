import { Link } from "wouter";
import { Menu, Search, UserCircle, PlusCircle, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
            <Menu className="h-6 w-6 text-primary" />
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Building className="h-7 w-7 text-primary" />
            <span className="font-heading font-bold text-xl tracking-tight hidden sm:inline-block">
              Naija<span className="text-primary">Homes</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">For Sale</Link>
            <Link href="/" className="hover:text-primary transition-colors">To Rent</Link>
            <Link href="/" className="hover:text-primary transition-colors">Commercial</Link>
            <Link href="/" className="hover:text-primary transition-colors">Agents</Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="outline" className="hidden sm:flex gap-2 font-semibold">
            <UserCircle className="h-5 w-5" />
            Sign In
          </Button>
          
          <Link href="/post-listing">
            <Button className="gap-2 font-semibold shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Post Listing</span>
              <span className="sm:hidden">Post</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
