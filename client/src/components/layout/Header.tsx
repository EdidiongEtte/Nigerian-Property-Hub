import { Link } from "wouter";
import { Menu, Search, UserCircle, PlusCircle, Building, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const { user } = useAuth();
  
  // Dashboard URL depending on user type
  const dashboardUrl = user?.type === 'agent' || user?.type === 'landlord' ? '/dashboard' : '/account';

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
          
          {user ? (
            <div className="flex items-center gap-2 md:gap-4">
              {user.type === 'buyer' || user.type === 'renter' ? (
                <>
                  <Link href="/account">
                    <Button variant="ghost" size="icon" className="hidden sm:flex text-slate-600 hover:text-red-500">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/account">
                    <Button variant="ghost" size="icon" className="hidden sm:flex text-slate-600 hover:text-primary">
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </Link>
                </>
              ) : null}
              
              <Link href={dashboardUrl}>
                <div className="flex items-center gap-2 cursor-pointer p-1 pr-3 rounded-full hover:bg-slate-100 transition-colors">
                  <Avatar className="h-8 w-8 border border-slate-200">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-semibold hidden sm:block truncate max-w-[100px]">{user.name}</span>
                </div>
              </Link>
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block">
                <Button variant="outline" className="flex gap-2 font-semibold">
                  <UserCircle className="h-5 w-5" />
                  Sign In
                </Button>
              </Link>
              
              {/* For mobile, small sign in button */}
              <Link href="/login" className="sm:hidden">
                <Button variant="ghost" size="icon" aria-label="Sign In">
                  <UserCircle className="h-5 w-5 text-slate-700" />
                </Button>
              </Link>
            </>
          )}
          
          {(!user || user.type === 'agent' || user.type === 'landlord') && (
            <Link href="/post-listing">
              <Button className="gap-2 font-semibold shadow-sm hover:shadow-md transition-shadow cursor-pointer hidden md:flex">
                <PlusCircle className="h-4 w-4" />
                <span>Post Listing</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
