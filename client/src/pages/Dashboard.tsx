import { useState, useEffect } from "react";
import { Link } from "wouter";
import { mockProperties } from "@/lib/data/mock-properties";
import { useAuth } from "@/lib/auth-context";
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
  Menu,
  TrendingUp,
  Heart,
  Zap,
  ShieldCheck,
  AlertCircle,
  BarChart3,
  Bell,
  X,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useMockDb } from "@/lib/mock-db";

const chartData = [
  { name: 'Mon', views: 120 },
  { name: 'Tue', views: 180 },
  { name: 'Wed', views: 250 },
  { name: 'Thu', views: 210 },
  { name: 'Fri', views: 290 },
  { name: 'Sat', views: 380 },
  { name: 'Sun', views: 420 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, logout } = useAuth();
  const { getUserNotifications, markNotificationRead, getUserVerifications } = useMockDb();
  
  // Get notifications for this user
  const notifications = user ? getUserNotifications(user.id) : [];
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Check verification status
  const verifications = user ? getUserVerifications(user.id) : [];
  const verificationStatus = verifications.length > 0 ? verifications[0].status : 'unverified';
  const isVerified = verificationStatus === 'verified';
  
  // Mock data for the dashboard
  const myProperties = mockProperties.slice(0, 3);
  const totalViews = 1850;
  const totalSaves = 142;
  const activeEnquiries = 8;
  const listingsCount = myProperties.length;
  const maxFreeListings = 3;
  
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
          value="overview" 
          className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl"
        >
          <BarChart3 className="h-5 w-5 mr-3" /> Overview
        </TabsTrigger>
        <TabsTrigger 
          value="listings" 
          className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl"
        >
          <Home className="h-5 w-5 mr-3" /> My Listings
          <Badge className="ml-auto bg-slate-100 text-slate-600 hover:bg-slate-200">{listingsCount}</Badge>
        </TabsTrigger>
        <TabsTrigger 
          value="enquiries" 
          className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl relative"
        >
          <MessageSquare className="h-5 w-5 mr-3" /> Enquiries
          <Badge className="absolute right-4 ml-auto bg-red-500 hover:bg-red-600 rounded-full px-2 py-0.5 text-xs">{activeEnquiries}</Badge>
        </TabsTrigger>
        <TabsTrigger 
          value="notifications" 
          className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl relative"
        >
          <Bell className="h-5 w-5 mr-3" /> Notifications
          {unreadCount > 0 && <Badge className="absolute right-4 ml-auto bg-primary rounded-full px-2 py-0.5 text-xs">{unreadCount}</Badge>}
        </TabsTrigger>
        <TabsTrigger 
          value="profile" 
          className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl"
        >
          <Settings className="h-5 w-5 mr-3" /> Settings
        </TabsTrigger>
      </TabsList>
      
      {!isVerified && verificationStatus !== 'pending' && (
        <div className="mt-6 mx-4 p-4 bg-amber-50 border border-amber-200 rounded-xl relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10">
            <ShieldCheck className="h-24 w-24 text-amber-500" />
          </div>
          <h4 className="font-bold text-amber-800 text-sm mb-1 relative z-10">Get Verified</h4>
          <p className="text-xs text-amber-700/80 mb-3 relative z-10">Build trust and get 3x more leads.</p>
          <Link href="/verification">
            <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-sm relative z-10">
              Verify Account
            </Button>
          </Link>
        </div>
      )}

      <div className="mt-auto p-4 border-t border-slate-100">
        <Link href="/">
          <Button variant="ghost" onClick={logout} className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
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
          <SheetContent side="left" className="p-0 flex flex-col w-[280px]">
            <div className="p-6 pb-2 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{user?.name || 'Agent'}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 capitalize">
                    {isVerified ? (
                      <><CheckCircle2 className="h-3 w-3 text-primary" /> Verified {user?.type}</>
                    ) : (
                      <>{user?.type}</>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col h-full w-full">
              <div className="flex-1 p-2 flex flex-col">
                <NavLinks />
              </div>
            </Tabs>
          </SheetContent>
        </Sheet>
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
              <AvatarFallback className="bg-primary/10 text-primary font-bold">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <h3 className="font-bold text-sm truncate">{user?.name || 'Agent'}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 capitalize">
                {isVerified ? (
                  <><CheckCircle2 className="h-3 w-3 text-primary" /> Verified {user?.type}</>
                ) : (
                  <>{user?.type}</>
                )}
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
          
          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="m-0 border-0 p-0 animate-in fade-in duration-300 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
                <p className="text-muted-foreground text-sm mt-1">Here's how your properties are performing.</p>
              </div>
              <Link href="/post-listing">
                <Button className="font-bold rounded-xl shadow-md w-full sm:w-auto">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Property
                </Button>
              </Link>
            </div>
            
            {/* Notifications Alert Banner */}
            {unreadCount > 0 && (
              <div 
                className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => setActiveTab("notifications")}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">You have {unreadCount} unread notification{unreadCount !== 1 && 's'}</h4>
                    <p className="text-sm text-slate-600">Click to view updates from the admin team.</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-primary font-medium">View</Button>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden group">
                <CardContent className="p-5 relative">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-slate-500">Active Listings</p>
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Home className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-heading font-bold">{listingsCount}</h2>
                    <span className="text-sm text-muted-foreground font-medium">/ {maxFreeListings} Free</span>
                  </div>
                  <Progress value={(listingsCount / maxFreeListings) * 100} className="h-1.5 mt-3" />
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden group">
                <CardContent className="p-5 relative">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-slate-500">Total Views</p>
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Eye className="h-4 w-4 text-blue-500" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-heading font-bold">
                      {new Intl.NumberFormat('en-US').format(totalViews)}
                    </h2>
                  </div>
                  <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> +12.5% from last week
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden group">
                <CardContent className="p-5 relative">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-slate-500">Property Saves</p>
                    <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                      <Heart className="h-4 w-4 text-red-500" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-heading font-bold">{totalSaves}</h2>
                  </div>
                  <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> +4 this week
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden group">
                <CardContent className="p-5 relative">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-slate-500">Enquiries</p>
                    <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                      <MessageSquare className="h-4 w-4 text-orange-500" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-heading font-bold">{activeEnquiries}</h2>
                  </div>
                  <p className="text-xs text-orange-600 font-medium mt-2">
                    2 pending replies
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Chart & Performance */}
              <Card className="lg:col-span-2 border-slate-200 shadow-sm rounded-2xl bg-white">
                <CardHeader>
                  <CardTitle>Performance Over Time</CardTitle>
                  <CardDescription>Views across all your active listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
                        <CartesianGrid stroke="#f1f5f9" strokeDasharray="5 5" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Action Cards */}
              <div className="space-y-6">
                {/* Upgrade Prompt */}
                <Card className="border-none shadow-sm rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Zap className="h-24 w-24" />
                  </div>
                  <CardHeader className="pb-2">
                    <Badge className="w-fit bg-yellow-500 hover:bg-yellow-600 text-black border-none font-bold mb-2">PRO</Badge>
                    <CardTitle className="text-xl">Boost Your Reach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-300 mb-6">
                      Upgrade to a premium plan to list more properties and get up to 10x more leads.
                    </p>
                    <Link href="/pricing">
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold border-none shadow-md">
                        View Pricing Plans
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Verification Status */}
                {verificationStatus === 'unverified' && (
                  <Card className="border-amber-200 shadow-sm rounded-2xl bg-amber-50">
                    <CardContent className="p-5 flex gap-4">
                      <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                        <AlertCircle className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-900 text-sm mb-1">Action Required</h4>
                        <p className="text-xs text-amber-800/80 mb-3">Your account is not verified. Verified agents get more trust from clients.</p>
                        <Link href="/verification">
                          <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 bg-white hover:bg-amber-50 h-8">
                            Verify Now
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {verificationStatus === 'pending' && (
                  <Card className="border-blue-200 shadow-sm rounded-2xl bg-blue-50">
                    <CardContent className="p-5 flex gap-4 items-center">
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <ShieldCheck className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 text-sm mb-1">Under Review</h4>
                        <p className="text-xs text-blue-800/80">Your documents are currently under review by admin.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {verificationStatus === 'rejected' && (
                  <Card className="border-red-200 shadow-sm rounded-2xl bg-red-50">
                    <CardContent className="p-5 flex gap-4 items-center">
                      <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                        <X className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-red-900 text-sm mb-1">Verification Rejected</h4>
                        <p className="text-xs text-red-800/80 mb-2">Please submit clear and valid ID documents.</p>
                        <Link href="/verification">
                          <Button size="sm" variant="outline" className="border-red-300 text-red-700 bg-white hover:bg-red-50 h-8">
                            Try Again
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {isVerified && (
                  <Card className="border-green-200 shadow-sm rounded-2xl bg-green-50">
                    <CardContent className="p-5 flex gap-4 items-center">
                      <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                        <ShieldCheck className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-green-900 text-sm mb-1">Identity Verified</h4>
                        <p className="text-xs text-green-800/80">Your verified badge is active on all your listings.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
            
            {/* Recent Enquiries Preview */}
            <Card className="border-slate-200 shadow-sm rounded-2xl bg-white mt-6">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
                <CardTitle className="text-lg">Recent Enquiries</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("enquiries")} className="text-primary hover:text-primary hover:bg-primary/5">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {mockEnquiries.slice(0, 3).map((enquiry) => (
                    <div key={enquiry.id} className={`p-4 flex flex-col md:flex-row gap-4 hover:bg-slate-50 transition-colors cursor-pointer ${enquiry.unread ? 'bg-primary/5' : ''}`}>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-semibold flex items-center gap-2 ${enquiry.unread ? 'text-foreground' : 'text-slate-700'}`}>
                            {enquiry.name}
                            {enquiry.unread && <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>}
                          </h4>
                          <span className="text-xs text-muted-foreground">{enquiry.date}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-600 mb-1 truncate">Re: {enquiry.property}</p>
                        <p className={`text-sm line-clamp-1 ${enquiry.unread ? 'font-medium text-slate-800' : 'text-slate-500'}`}>
                          {enquiry.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LISTINGS TAB */}
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
                    <div className="w-full sm:w-56 h-48 sm:h-auto shrink-0 relative">
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
                              <Link href="/pricing">
                                <DropdownMenuItem className="text-yellow-600 font-medium"><Zap className="h-4 w-4 mr-2" /> Boost Listing</DropdownMenuItem>
                              </Link>
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
                      
                      <div className="flex items-center gap-4 text-xs font-medium border-t border-slate-100 pt-3 mt-auto flex-wrap">
                        <span className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                          <Eye className="h-4 w-4" /> 432 Views
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                          <Heart className="h-4 w-4" /> 24 Saves
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                          <MessageSquare className="h-4 w-4" /> 5 Enquiries
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-500 ml-auto sm:ml-0 md:ml-auto pt-2 sm:pt-0">
                          <Calendar className="h-4 w-4" /> Listed Oct 12
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {myProperties.length >= maxFreeListings && (
              <div className="mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
                <h3 className="font-bold text-lg mb-2 text-primary">You've reached your free listing limit</h3>
                <p className="text-muted-foreground mb-4">Upgrade to a Pro or Agency plan to add unlimited properties.</p>
                <Link href="/pricing">
                  <Button className="font-bold shadow-sm">View Upgrade Plans</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          {/* ENQUIRIES TAB */}
          <TabsContent value="enquiries" className="m-0 border-0 p-0 animate-in fade-in duration-300">
            <div className="mb-6">
              <h1 className="text-2xl font-heading font-bold">Client Enquiries</h1>
              <p className="text-muted-foreground text-sm">Messages from potential buyers and renters</p>
            </div>

            <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
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
                      <Button size="sm" variant="outline" className="flex-1 md:flex-none bg-white">
                        <Phone className="h-4 w-4 mr-2" /> Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* NOTIFICATIONS TAB */}
          <TabsContent value="notifications" className="m-0 border-0 p-0 animate-in fade-in duration-300">
            <div className="mb-6">
              <h1 className="text-2xl font-heading font-bold">Notifications</h1>
              <p className="text-muted-foreground text-sm">Updates and messages from the admin team</p>
            </div>

            <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
              <div className="divide-y divide-slate-100">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`p-5 flex gap-4 ${!notif.read ? 'bg-primary/5' : ''}`}>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                      notif.type === 'error' ? 'bg-red-100 text-red-600' : 
                      notif.type === 'warning' ? 'bg-orange-100 text-orange-600' : 
                      notif.type === 'success' ? 'bg-green-100 text-green-600' : 
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {notif.type === 'error' ? <AlertCircle className="h-5 w-5" /> : 
                       notif.type === 'warning' ? <AlertTriangle className="h-5 w-5" /> : 
                       notif.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : 
                       <Bell className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`font-bold ${!notif.read ? 'text-slate-900' : 'text-slate-700'}`}>
                          {notif.title}
                          {!notif.read && <span className="ml-2 w-2 h-2 rounded-full bg-primary inline-block"></span>}
                        </h4>
                        <span className="text-xs text-slate-500">{new Date(notif.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{notif.message}</p>
                      {!notif.read && (
                        <Button variant="outline" size="sm" onClick={() => markNotificationRead(notif.id)} className="h-7 text-xs">
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <div className="p-12 text-center text-slate-500">
                    <Bell className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-lg font-medium">No Notifications</p>
                    <p className="text-sm">You're all caught up!</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* PROFILE/SETTINGS TAB */}
          <TabsContent value="profile" className="m-0 border-0 p-0 animate-in fade-in duration-300">
            <div className="mb-6">
              <h1 className="text-2xl font-heading font-bold">Settings</h1>
              <p className="text-muted-foreground text-sm">Manage your account details and subscription</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-slate-200 shadow-sm rounded-2xl bg-white">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-6 mb-6">
                      <Avatar className="h-20 w-20 border-2 border-slate-200">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-2xl bg-slate-100">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" className="bg-white">Change Photo</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input defaultValue={user?.name || "Agent"} />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input defaultValue="agent@example.com" type="email" />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input defaultValue="08012345678" type="tel" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Agency Name</Label>
                          {isVerified && <Badge variant="secondary" className="text-[10px] h-4">Verified</Badge>}
                        </div>
                        <Input 
                          defaultValue={verifications.length > 0 && verifications[0].agencyName ? verifications[0].agencyName : "Properties Ltd"} 
                          disabled={isVerified || verificationStatus === 'pending'} 
                          title={(isVerified || verificationStatus === 'pending') ? "Agency names cannot be changed directly while verified or under review" : ""}
                        />
                        {(isVerified || verificationStatus === 'pending') && (
                          <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> To change agency name, <Link href="/verification"><span className="underline cursor-pointer">submit new documents</span></Link>
                          </p>
                        )}
                      </div>
                    </div>
                    <Button className="mt-4 font-bold shadow-sm">Save Changes</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-slate-200 shadow-sm rounded-2xl bg-white">
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-lg">Basic (Free)</span>
                        <Badge variant="outline" className="bg-white">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{listingsCount} of {maxFreeListings} listings used</p>
                    </div>
                    <Link href="/pricing">
                      <Button className="w-full bg-primary hover:bg-primary/90 font-bold shadow-sm">
                        Upgrade Plan
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
                
                <Card className="border-slate-200 shadow-sm rounded-2xl bg-white">
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start bg-white">
                      <Settings className="mr-2 h-4 w-4" /> Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 bg-white">
                      <Trash className="mr-2 h-4 w-4" /> Delete Account
                    </Button>
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