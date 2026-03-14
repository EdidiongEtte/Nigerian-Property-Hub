import { useState } from "react";
import { Link } from "wouter";
import { 
  Building, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  AlertTriangle, 
  Users, 
  Home, 
  Flag, 
  MoreVertical,
  LogOut,
  Search,
  Filter,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Mock Data
const initialListings = [
  { id: "L1", title: "Luxury 5 Bed Duplex", agent: "Chidi Okafor", price: "₦150,000,000", location: "Lekki Phase 1, Lagos", status: "pending", date: "2 hours ago" },
  { id: "L2", title: "Affordable 2 Bed Flat", agent: "Amina Bello", price: "₦1,200,000/yr", location: "Yaba, Lagos", status: "pending", date: "5 hours ago" },
  { id: "L3", title: "Commercial Office Space", agent: "Properties Ltd", price: "₦5,000,000/yr", location: "Wuse 2, Abuja", status: "pending", date: "1 day ago" },
];

const initialVerifications = [
  { id: "V1", name: "Oluwaseun Adewale", type: "Agent", documents: ["NIN Slip", "CAC Certificate"], status: "pending", date: "3 hours ago" },
  { id: "V2", name: "Grace Ekpenyong", type: "Landlord", documents: ["Driver's License"], status: "pending", date: "Yesterday" },
  { id: "V3", name: "Adeola Properties", type: "Agency", documents: ["International Passport", "CAC Certificate"], status: "pending", date: "2 days ago" },
];

const initialReports = [
  { id: "R1", property: "3 Bedroom Flat in Ikeja", agent: "John Doe", reason: "Suspected Scam", details: "Asked for inspection fee before viewing.", status: "open", date: "1 hour ago", reporter: "Anonymous" },
  { id: "R2", property: "Self Contain in Surulere", agent: "Jane Smith", reason: "Unavailable", details: "Agent says property is already rented but still listed.", status: "open", date: "4 hours ago", reporter: "User123" },
  { id: "R3", property: "Luxury Villa Asokoro", agent: "Abuja Homes", reason: "Fake Photos", details: "These photos are from a different listing in Dubai.", status: "open", date: "1 day ago", reporter: "Anonymous" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const [listings, setListings] = useState(initialListings);
  const [verifications, setVerifications] = useState(initialVerifications);
  const [reports, setReports] = useState(initialReports);

  const handleAction = (type: string, id: string, action: string) => {
    toast({
      title: `${action} Successful`,
      description: `Action applied to ${type} ${id}.`,
    });

    if (type === 'listing') {
      setListings(listings.filter(l => l.id !== id));
    } else if (type === 'verification') {
      setVerifications(verifications.filter(v => v.id !== id));
    } else if (type === 'report') {
      setReports(reports.filter(r => r.id !== id));
    }
  };

  const NavLinks = () => (
    <>
      <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1 p-0">
        <TabsTrigger value="overview" className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl">
          <Home className="h-5 w-5 mr-3" /> Dashboard
        </TabsTrigger>
        <TabsTrigger value="listings" className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl">
          <Building className="h-5 w-5 mr-3" /> Listing Approvals
          {listings.length > 0 && <Badge className="ml-auto bg-amber-500 hover:bg-amber-600">{listings.length}</Badge>}
        </TabsTrigger>
        <TabsTrigger value="verifications" className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl">
          <ShieldAlert className="h-5 w-5 mr-3" /> Verifications
          {verifications.length > 0 && <Badge className="ml-auto bg-blue-500 hover:bg-blue-600">{verifications.length}</Badge>}
        </TabsTrigger>
        <TabsTrigger value="reports" className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl">
          <Flag className="h-5 w-5 mr-3" /> Complaints
          {reports.length > 0 && <Badge className="ml-auto bg-red-500 hover:bg-red-600">{reports.length}</Badge>}
        </TabsTrigger>
        <TabsTrigger value="users" className="w-full justify-start px-4 py-3 h-12 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl">
          <Users className="h-5 w-5 mr-3" /> Users Directory
        </TabsTrigger>
      </TabsList>

      <div className="mt-auto p-4 border-t border-slate-100">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-slate-800">
            <LogOut className="h-5 w-5 mr-3" /> Exit Admin
          </Button>
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col bg-white border-r border-slate-200 h-screen sticky top-0 shadow-sm z-10">
        <div className="p-6 border-b border-slate-100 bg-slate-900 text-white">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <ShieldAlert className="h-8 w-8 text-primary" />
            <span className="font-heading font-bold text-2xl tracking-tight">
              Admin<span className="text-primary">Portal</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl border border-slate-700">
            <Avatar className="h-10 w-10 border-2 border-slate-700">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/20 text-primary font-bold">AD</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <h3 className="font-bold text-sm truncate text-slate-100">Super Admin</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                Trust & Safety Team
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
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search listings, users, or reports..." className="pl-10 bg-slate-50 border-transparent focus:bg-white transition-colors h-10 rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full relative">
              <AlertTriangle className="h-4 w-4 text-slate-600" />
              {(reports.length + verifications.length + listings.length) > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </Button>
          </div>
        </header>

        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            
            {/* OVERVIEW TAB */}
            <TabsContent value="overview" className="m-0 border-0 p-0 animate-in fade-in duration-300 space-y-6">
              <div>
                <h1 className="text-3xl font-heading font-bold text-slate-900">Trust & Safety Overview</h1>
                <p className="text-slate-500 text-sm mt-1">Monitor moderation queues and platform health.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden group cursor-pointer" onClick={() => setActiveTab("listings")}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                        <Building className="h-6 w-6 text-amber-600" />
                      </div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Action Needed</Badge>
                    </div>
                    <h3 className="text-slate-500 font-medium text-sm">Pending Listings</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <h2 className="text-3xl font-bold text-slate-900">{listings.length}</h2>
                      <span className="text-sm text-slate-400">awaiting review</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden group cursor-pointer" onClick={() => setActiveTab("verifications")}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                        <ShieldAlert className="h-6 w-6 text-blue-600" />
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Action Needed</Badge>
                    </div>
                    <h3 className="text-slate-500 font-medium text-sm">Pending Verifications</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <h2 className="text-3xl font-bold text-slate-900">{verifications.length}</h2>
                      <span className="text-sm text-slate-400">applications</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden group cursor-pointer" onClick={() => setActiveTab("reports")}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                        <Flag className="h-6 w-6 text-red-600" />
                      </div>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High Priority</Badge>
                    </div>
                    <h3 className="text-slate-500 font-medium text-sm">Open Complaints</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <h2 className="text-3xl font-bold text-slate-900">{reports.length}</h2>
                      <span className="text-sm text-slate-400">unresolved</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden group">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                    </div>
                    <h3 className="text-slate-500 font-medium text-sm">Total Active Users</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <h2 className="text-3xl font-bold text-slate-900">12,450</h2>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Recent Activity Mini-Queue */}
                <Card className="border-slate-200 shadow-sm rounded-2xl">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg">Recent Complaints</CardTitle>
                      <CardDescription>Needs immediate attention</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("reports")} className="text-primary">View All</Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                      {reports.slice(0, 3).map(report => (
                        <div key={report.id} className="p-4 hover:bg-slate-50 flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{report.reason}</h4>
                            <p className="text-xs text-slate-500 truncate mt-1">Re: {report.property}</p>
                            <p className="text-xs font-medium text-slate-700 mt-2">{report.details}</p>
                          </div>
                          <span className="text-xs text-slate-400 shrink-0">{report.date}</span>
                        </div>
                      ))}
                      {reports.length === 0 && (
                        <div className="p-8 text-center text-slate-500">No open complaints! Great job.</div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm rounded-2xl">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg">Pending Verifications</CardTitle>
                      <CardDescription>Review ID documents</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("verifications")} className="text-primary">View All</Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                      {verifications.slice(0, 3).map(v => (
                        <div key={v.id} className="p-4 hover:bg-slate-50 flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-blue-100 text-blue-700">{v.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                              {v.name} <Badge variant="secondary" className="text-[10px] h-4 px-1">{v.type}</Badge>
                            </h4>
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                              <FileText className="h-3 w-3" /> {v.documents.join(", ")}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleAction('verification', v.id, 'Approved')}>
                              <CheckCircle2 className="h-5 w-5" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleAction('verification', v.id, 'Rejected')}>
                              <XCircle className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {verifications.length === 0 && (
                        <div className="p-8 text-center text-slate-500">No pending verifications.</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* LISTING APPROVALS TAB */}
            <TabsContent value="listings" className="m-0 border-0 p-0 animate-in fade-in duration-300 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-heading font-bold">Listing Approvals</h1>
                  <p className="text-slate-500 text-sm">Review new properties before they go live on the platform.</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
                </div>
              </div>

              <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4">Property Details</th>
                        <th className="px-6 py-4">Agent/Lister</th>
                        <th className="px-6 py-4">Submitted</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {listings.map(listing => (
                        <tr key={listing.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-900">{listing.title}</div>
                            <div className="text-slate-500 text-xs mt-1">{listing.location}</div>
                            <div className="text-primary font-medium mt-1">{listing.price}</div>
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-700">{listing.agent}</td>
                          <td className="px-6 py-4 text-slate-500">{listing.date}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="outline" size="sm" className="h-8 bg-white">
                                <Eye className="h-4 w-4 mr-1" /> View
                              </Button>
                              <Button variant="default" size="sm" className="h-8 bg-green-600 hover:bg-green-700 text-white font-medium" onClick={() => handleAction('listing', listing.id, 'Approved')}>
                                Approve
                              </Button>
                              <Button variant="destructive" size="sm" className="h-8 font-medium" onClick={() => handleAction('listing', listing.id, 'Rejected')}>
                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {listings.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3 opacity-50" />
                            <p className="text-lg font-medium">All caught up!</p>
                            <p className="text-sm">There are no pending listings to review.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* VERIFICATIONS TAB */}
            <TabsContent value="verifications" className="m-0 border-0 p-0 animate-in fade-in duration-300 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-heading font-bold">Identity Verifications</h1>
                  <p className="text-slate-500 text-sm">Review government IDs and CAC documents to verify agents.</p>
                </div>
              </div>

              <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Documents Provided</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {verifications.map(v => (
                        <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-900 flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-slate-200">{v.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {v.name}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="outline">{v.type}</Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              {v.documents.map((doc, i) => (
                                <span key={i} className="flex items-center text-xs text-blue-600 bg-blue-50 w-fit px-2 py-1 rounded cursor-pointer hover:bg-blue-100">
                                  <FileText className="h-3 w-3 mr-1" /> {doc}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-500">{v.date}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="default" size="sm" className="h-8 bg-green-600 hover:bg-green-700 text-white font-medium" onClick={() => handleAction('verification', v.id, 'Verified')}>
                                Verify
                              </Button>
                              <Button variant="destructive" size="sm" className="h-8 font-medium" onClick={() => handleAction('verification', v.id, 'Rejected')}>
                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {verifications.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3 opacity-50" />
                            <p className="text-lg font-medium">Queue is empty</p>
                            <p className="text-sm">No pending verification requests.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* REPORTS TAB */}
            <TabsContent value="reports" className="m-0 border-0 p-0 animate-in fade-in duration-300 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-heading font-bold text-red-600">Complaints & Reports</h1>
                  <p className="text-slate-500 text-sm">Manage user reports about scams, fake listings, or bad agents.</p>
                </div>
              </div>

              <div className="space-y-4">
                {reports.map(report => (
                  <Card key={report.id} className="border-red-100 shadow-sm rounded-xl overflow-hidden bg-white">
                    <div className="p-5 flex flex-col md:flex-row gap-6">
                      <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                        <Flag className="h-6 w-6 text-red-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Badge variant="destructive" className="mb-2">{report.reason}</Badge>
                            <h3 className="font-bold text-lg text-slate-900">{report.property}</h3>
                          </div>
                          <span className="text-sm text-slate-500">{report.date}</span>
                        </div>
                        
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
                          <p className="text-sm font-medium text-slate-800">" {report.details} "</p>
                          <p className="text-xs text-slate-500 mt-2">— Reported by {report.reporter}</p>
                        </div>
                        
                        <div className="text-sm text-slate-600 flex items-center gap-2 mb-4">
                          <span className="font-medium text-slate-800">Accused Agent:</span> 
                          <Avatar className="h-6 w-6"><AvatarFallback>{report.agent.charAt(0)}</AvatarFallback></Avatar>
                          {report.agent}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                          <Button variant="destructive" size="sm" className="font-medium" onClick={() => handleAction('report', report.id, 'Listing Banned')}>
                            Remove Listing
                          </Button>
                          <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-50 font-medium" onClick={() => handleAction('report', report.id, 'Agent Warned')}>
                            Warn Agent
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-500 ml-auto" onClick={() => handleAction('report', report.id, 'Report Dismissed')}>
                            Dismiss Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                
                {reports.length === 0 && (
                  <Card className="border-slate-200 shadow-sm rounded-2xl bg-white">
                    <CardContent className="p-12 text-center text-slate-500">
                      <ShieldAlert className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-slate-900 mb-1">No Open Reports</h3>
                      <p>The community is safe and peaceful right now.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </main>
    </div>
  );
}