import { useState } from "react";
import { Link } from "wouter";
import { mockProperties } from "@/lib/data/mock-properties";
import { 
  Building, 
  Home, 
  MessageSquare, 
  Settings, 
  LogOut, 
  PlusCircle, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("listings");
  
  // Mock data for the dashboard
  const myProperties = mockProperties.slice(0, 3);
  const totalViews = 1245;
  const activeEnquiries = 8;
  
  const mockEnquiries = [
    { id: 1, name: "Chidi Okafor", property: "Luxury 4 Bedroom Detached Duplex", date: "Today, 10:30 AM", message: "Hi, I am interested in viewing this property this weekend.", unread: true },
    { id: 2, name: "Amina Bello", property: "Modern 2 Bedroom Serviced Apartment", date: "Yesterday, 2:15 PM", message: "Is the service charge included in the rent?", unread: true },
    { id: 3, name: "Oluwaseun Adewale", property: "Cozy 3 Bedroom Flat for Rent", date: "Oct 12, 2023", message: "Can I pay in two installments?", unread: false },
    { id: 4, name: "Grace Ekpenyong", property: "Contemporary 4 Bedroom Terrace", date: "Oct 10, 2023", message: "Please call me back regarding this listing.", unread: false },
  ];

  const formatPrice = (price: number) => new Intl.NumberFormat('en-NG').format(price);

  const NavLinks = () => (
    <>
      <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1 p-0">
        <TabsTrigger 
          value="listings" 
          className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl"
        >
          <Home className="h-5 w-5 mr-3" /> My Listings
        </TabsTrigger>
        <TabsTrigger 
          value="enquiries" 
          className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl relative"
        >
          <MessageSquare className="h-5 w-5 mr-3" /> Enquiries
          <Badge className="absolute right-4 ml-auto bg-red-500 hover:bg-red-600 rounded-full px-2 py-0.5 text-xs">{activeEnquiries}</Badge>
        </TabsTrigger>
        <TabsTrigger 
          value="profile" 
          className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl"
        >
          <Settings className="h-5 w-5 mr-3" /> Profile & Settings
        </TabsTrigger>
      </TabsList>
      <div className="mt-auto p-4 border-t border-slate-100">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="h-5 w-5 mr-3" /> Sign Out
          </Button>
        </Link>
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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 flex flex-col">
            <div className="p-6 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">John Doe</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-primary" /> Verified Agent
                  </p>
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
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col bg-white border-r border-slate-200 h-screen sticky top-0">
        <div className="p-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Building className="h-8 w-8 text-primary" />
            <span className="font-heading font-bold text-2xl tracking-tight">
              Naija<span className="text-primary">Homes</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">JD</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <h3 className="font-bold text-sm truncate">John Doe</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-primary" /> Verified Agent
              </p>
            </div>
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
          
          {/* Dashboard Header Stats (Visible on Listings and Enquiries) */}
          {activeTab !== 'profile' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-none shadow-sm bg-white rounded-2xl">
                <CardContent className="p-4 md:p-6 flex flex-col justify-center items-center text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Properties</p>
                  <p className="text-3xl font-heading font-bold text-primary">{myProperties.length}</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-white rounded-2xl">
                <CardContent className="p-4 md:p-6 flex flex-col justify-center items-center text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Views</p>
                  <p className="text-3xl font-heading font-bold text-slate-700">{totalViews}</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-white rounded-2xl col-span-2 md:col-span-2 bg-gradient-to-br from-primary to-green-700 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <CardContent className="p-4 md:p-6 flex justify-between items-center h-full relative z-10">
                  <div>
                    <p className="text-white/80 font-medium mb-1">Want more leads?</p>
                    <p className="font-bold">Boost your properties</p>
                  </div>
                  <Link href="/pricing">
                    <Button variant="secondary" className="font-bold text-primary border-0 rounded-xl shadow-lg">
                      Upgrade
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}

          <TabsContent value="listings" className="m-0 border-0 p-0 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-heading font-bold">My Properties</h1>
                <p className="text-muted-foreground text-sm">Manage your active listings</p>
              </div>
              <Link href="/post-listing">
                <Button className="font-bold rounded-xl shadow-md w-full sm:w-auto">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Property
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {myProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden rounded-2xl shadow-sm border-slate-200">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-48 h-48 sm:h-auto shrink-0 relative">
                      <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 flex gap-1">
                        <Badge variant={property.type === 'sale' ? 'default' : 'secondary'} className="shadow-sm">
                          For {property.type === 'sale' ? 'Sale' : 'Rent'}
                        </Badge>
                        <Badge variant="outline" className="bg-white/90 shadow-sm border-0">
                          Active
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-lg line-clamp-1 pr-4">{property.title}</h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="-mt-2 -mr-2 shrink-0">
                                <MoreVertical className="h-5 w-5 text-muted-foreground" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl">
                              <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View Listing</DropdownMenuItem>
                              <DropdownMenuItem><Edit className="h-4 w-4 mr-2" /> Edit Details</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50"><Trash className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-primary font-heading font-bold text-xl mb-2">
                          {property.currency}{formatPrice(property.price)}
                          {property.period && <span className="text-sm font-normal text-muted-foreground">/{property.period}</span>}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-4">
                          {property.location.address}, {property.location.area}, {property.location.city}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs font-medium border-t border-slate-100 pt-3 mt-auto">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <Eye className="h-4 w-4" /> 432 Views
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <MessageSquare className="h-4 w-4" /> 5 Enquiries
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-500 ml-auto">
                          <Calendar className="h-4 w-4" /> Listed Oct 12
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="enquiries" className="m-0 border-0 p-0 animate-in fade-in duration-300">
            <div className="mb-6">
              <h1 className="text-2xl font-heading font-bold">Client Enquiries</h1>
              <p className="text-muted-foreground text-sm">Messages from potential buyers and renters</p>
            </div>

            <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
              <div className="divide-y divide-slate-100">
                {mockEnquiries.map((enquiry) => (
                  <div key={enquiry.id} className={`p-4 md:p-5 flex flex-col md:flex-row gap-4 hover:bg-slate-50 transition-colors cursor-pointer ${enquiry.unread ? 'bg-primary/5' : ''}`}>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-semibold flex items-center gap-2 ${enquiry.unread ? 'text-foreground' : 'text-slate-700'}`}>
                          {enquiry.name}
                          {enquiry.unread && <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>}
                        </h4>
                        <span className="text-xs text-muted-foreground">{enquiry.date}</span>
                      </div>
                      <p className="text-sm font-medium text-slate-600 mb-2 truncate">Re: {enquiry.property}</p>
                      <p className={`text-sm line-clamp-2 ${enquiry.unread ? 'font-medium text-slate-800' : 'text-slate-500'}`}>
                        {enquiry.message}
                      </p>
                    </div>
                    <div className="flex md:flex-col gap-2 shrink-0 md:justify-center md:items-end">
                      <Button size="sm" variant="outline" className="flex-1 md:flex-none border-primary text-primary hover:bg-primary/5">
                        <Mail className="h-4 w-4 mr-2" /> Reply
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                        <Phone className="h-4 w-4 mr-2" /> Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="m-0 border-0 p-0 animate-in fade-in duration-300">
            <div className="mb-6">
              <h1 className="text-2xl font-heading font-bold">Profile & Settings</h1>
              <p className="text-muted-foreground text-sm">Manage your account details</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-slate-200 shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-6 mb-6">
                    <Avatar className="h-20 w-20 border-2 border-slate-200">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-2xl bg-slate-100">JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Photo</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue="john@example.com" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input defaultValue="08012345678" type="tel" />
                    </div>
                    <div className="space-y-2">
                      <Label>Agency Name (Optional)</Label>
                      <Input defaultValue="JD Properties Ltd" />
                    </div>
                  </div>
                  <Button className="mt-4 font-bold shadow-sm">Save Changes</Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-slate-200 shadow-sm rounded-2xl bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" /> Verification Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">Your account is not fully verified yet. Buyers and renters are more likely to trust verified agents.</p>
                    <Link href="/verification">
                      <Button variant="outline" className="w-full font-bold border-primary text-primary hover:bg-primary/10">
                        Get Verified
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
                
                <Card className="border-slate-200 shadow-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input type="password" />
                    </div>
                    <Button variant="outline" className="w-full">Update Password</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}
