import { Search, MapPin, Home, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SearchBar() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 max-w-4xl mx-auto w-full backdrop-blur-md">
      <Tabs defaultValue="buy" className="w-full">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-4 px-2 pt-2">
          <TabsList className="grid w-full sm:w-[240px] grid-cols-2">
            <TabsTrigger value="buy" className="font-semibold">Buy</TabsTrigger>
            <TabsTrigger value="rent" className="font-semibold">Rent</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input 
              type="text" 
              placeholder="E.g. Lekki, Abuja, Port Harcourt..." 
              className="pl-10 h-14 border-slate-200 bg-slate-50 hover:bg-slate-100/50 focus-visible:bg-white text-base rounded-xl transition-colors"
            />
          </div>
          
          <Select>
            <SelectTrigger className="h-14 w-full md:w-[160px] border-slate-200 bg-slate-50 hover:bg-slate-100/50 text-base rounded-xl transition-colors">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Property Type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="house">Houses</SelectItem>
              <SelectItem value="apartment">Apartments/Flats</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="h-14 w-full md:w-[140px] border-slate-200 bg-slate-50 hover:bg-slate-100/50 text-base rounded-xl transition-colors">
              <div className="flex items-center gap-2">
                <SelectValue placeholder="Max Price" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Price</SelectItem>
              <SelectItem value="500k">Up to ₦500,000</SelectItem>
              <SelectItem value="1m">Up to ₦1 Million</SelectItem>
              <SelectItem value="5m">Up to ₦5 Million</SelectItem>
              <SelectItem value="20m">Up to ₦20 Million</SelectItem>
              <SelectItem value="50m">Up to ₦50 Million</SelectItem>
              <SelectItem value="100m+">₦100 Million +</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="h-14 w-14 border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-xl shrink-0">
              <SlidersHorizontal className="h-5 w-5 text-slate-700" />
            </Button>
            <Button className="h-14 px-8 text-base font-bold rounded-xl flex-1 md:flex-none shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
