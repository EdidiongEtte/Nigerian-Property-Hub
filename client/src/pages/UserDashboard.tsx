import { useState } from "react";
import { Link, useLocation } from "wouter";
import { mockProperties } from "@/lib/data/mock-properties";
import { useAuth } from "@/lib/auth-context";
import { 
  Building, 
  Heart, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Search,
  Bell,
  Clock,
  Menu,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/property/PropertyCard";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("saved");
  const [, setLocation] = useLocation();
  const { user, logout, savedPropertyIds } = useAuth();
  
  // Real saved properties from context
  const savedProperties = mockProperties.filter(p => savedPropertyIds.includes(p.id));
  
  // Mock data
  const recentSearches = [
    { id: 1, query: "2 Bedroom in Lekki", time: "2 hours ago", link: "/" },
    { id: 2, query: "Houses in Abuja under ₦50m", time: "Yesterday", link: "/" },
    { id: 3, query: "Apartments in Yaba", time: "3 days ago", link: "/" },
  ];
  
  const myEnquiries = [
    { id: 1, property: mockProperties[1], status: "Replied", date: "Today", message: "Yes, the service charge is included." },
    { id: 2, property: mockProperties[5], status: "Pending", date: "2 days ago", message: "Is this still available?" },
  ];

  if (!user) {
    setLocation("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const NavLinks = () => (
    <>
      <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1 p-0">
        <TabsTrigger 
          value="saved" 
          className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl"
        >
          <Heart className="h-5 w-5 mr-3" /> Saved Properties
        </TabsTrigger>
        <TabsTrigger 
          value="searches" 
          className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl"
        >
          <Clock className="h-5 w-5 mr-3" /> Recent Searches
        </TabsTrigger>
        <TabsTrigger 
          value="enquiries" 
          className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl"
        >
          <MessageSquare className="h-5 w-5 mr-3" /> My Enquiries
        </TabsTrigger>
        <TabsTrigger 
          value="profile" 
          className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl"
        >
          <Settings className="h-5 w-5 mr-3" /> Account Settings
        </TabsTrigger>
      </TabsList>
      <div className="mt-auto p-4 border-t border-slate-100">
        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
          <LogOut className="h-5 w-5 mr-3" /> Sign Out
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sticky top-0 z-20">
        <Link href="/" className="flex items-center gap-2">
          <Building className="h-6 w-6 text-primary" />
          <span className="font-heading font-bold text-lg tracking-tight">
            Naija<span className="text-primary">Homes</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex flex-col">
              <div className="p-6 pb-2 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{user.name}</h3>
                    <p className="text-xs text-muted-foreground capitalize">Property {user.type}</p>
                  </div>
                </div>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col h-full w-full">
                <div className="flex-1 p-2">
                  <NavLinks />
                </div>
              </Tabs>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col bg-white border-r border-slate-200 h-screen sticky top-0">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Building className="h-8 w-8 text-primary" />
            <span className="font-heading font-bold text-2xl tracking-tight">
              Naija<span className="text-primary">Homes</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100">
            <Avatar className="h-10 w-10 border-2 border-slate-50">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <h3 className="font-bold text-sm truncate">{user.name}</h3>
              <p className="text-xs text-muted-foreground capitalize">Property {user.type}</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 text-slate-400 hover:text-primary relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="flex-1 flex flex-col w-full">
          <div className="p-4 flex-1 flex flex-col">
            <NavLinks />
          </div>
        </Tabs>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

          <TabsContent value="saved" className="m-0 border-0 p-0 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-heading font-bold">Saved Properties</h1>
                <p className="text-muted-foreground text-sm">Properties you've favourited</p>
              </div>
              <Link href="/">
                <Button className="font-bold rounded-xl shadow-sm w-full sm:w-auto" variant="outline">
                  <Search className="h-4 w-4 mr-2" /> Find more
                </Button>
              </Link>
            </div>

            {savedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {savedProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-2 bg-transparent shadow-none">
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                  <Heart className="h-12 w-12 text-slate-300 mb-4" />
                  <h3 className="font-bold text-lg mb-2">No saved properties yet</h3>
                  <p className="text-muted-foreground mb-6">When you see a property you like, tap the heart icon to save it here.</p>
                  <Link href="/">
                    <Button>Start browsing</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="searches" className="m-0 border-0 p-0 animate-in fade-in duration-300">
            <div className="mb-6">
              <h1 className="text-2xl font-heading font-bold">Recent Searches</h1>
              <p className="text-muted-foreground text-sm">Pick up where you left off</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentSearches.map((search) => (
                <Link key={search.id} href={search.link}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Search className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{search.query}</h4>
                          <p className="text-xs text-muted-foreground">{search.time}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="enquiries" className="m-0 border-0 p-0 animate-in fade-in duration-300">
            <div className="mb-6">
              <h1 className="text-2xl font-heading font-bold">My Enquiries</h1>
              <p className="text-muted-foreground text-sm">Track the properties you've contacted</p>
            </div>

            <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
              <div className="divide-y divide-slate-100">
                {myEnquiries.map((enquiry) => (
                  <div key={enquiry.id} className="p-4 md:p-5 flex flex-col md:flex-row gap-4 hover:bg-slate-50 transition-colors">
                    <img src={enquiry.property.images[0]} className="w-full md:w-32 h-24 object-cover rounded-lg shrink-0" alt="Property" />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <Link href={`/property/${enquiry.property.id}`}>
                          <h4 className="font-bold text-primary hover:underline line-clamp-1">{enquiry.property.title}</h4>
                        </Link>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{enquiry.date}</span>
                      </div>
                      <p className="text-sm font-medium text-slate-700 mb-2">
                        Agent: {enquiry.property.agent.name}
                      </p>
                      
                      <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 mt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={enquiry.status === "Replied" ? "default" : "secondary"} className={enquiry.status === "Replied" ? "bg-green-500" : ""}>
                            {enquiry.status}
                          </Badge>
                          <span className="text-xs font-semibold text-slate-500">Latest message:</span>
                        </div>
                        <p className="text-sm text-slate-600">{enquiry.message}</p>
                      </div>
                    </div>
                    
                    <div className="flex md:flex-col gap-2 shrink-0 md:justify-center">
                      <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                        View Thread
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="m-0 border-0 p-0 animate-in fade-in duration-300">
            <div className="mb-6">
              <h1 className="text-2xl font-heading font-bold">Account Settings</h1>
              <p className="text-muted-foreground text-sm">Update your personal information</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-slate-200 shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle>Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue="samuel@example.com" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input defaultValue="08123456789" type="tel" />
                    </div>
                  </div>
                  <Button className="mt-4 font-bold shadow-sm">Save Changes</Button>
                </CardContent>
              </Card>
              
              <Card className="border-slate-200 shadow-sm rounded-2xl h-fit">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Lock className="mr-2 h-4 w-4" /> Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                    <LogOut className="mr-2 h-4 w-4" /> Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}
