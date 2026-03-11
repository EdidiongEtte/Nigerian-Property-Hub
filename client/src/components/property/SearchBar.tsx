import { Search, MapPin, Home, SlidersHorizontal, Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { cityAreas } from "@/lib/data/locations";

export default function SearchBar() {
  const [city, setCity] = useState<string>("all");
  const [area, setArea] = useState<string>("all");

  const availableAreas = city !== "all" && cityAreas[city] ? cityAreas[city] : [];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 max-w-5xl mx-auto w-full backdrop-blur-md">
      <Tabs defaultValue="buy" className="w-full">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-4 px-2 pt-2">
          <TabsList className="grid w-full sm:w-[240px] grid-cols-2">
            <TabsTrigger value="buy" className="font-semibold">Buy</TabsTrigger>
            <TabsTrigger value="rent" className="font-semibold">Rent</TabsTrigger>
          </TabsList>
          <Button variant="ghost" size="sm" className="hidden sm:flex text-primary hover:text-primary hover:bg-primary/5 font-semibold gap-2">
            <MapIcon className="h-4 w-4" /> View on Map
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto_auto] gap-2">
          
          {/* City Selection */}
          <Select value={city} onValueChange={(val) => { setCity(val); setArea("all"); }}>
            <SelectTrigger className="h-14 w-full border-slate-200 bg-slate-50 hover:bg-slate-100/50 text-base rounded-xl transition-colors">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <SelectValue placeholder="City" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {Object.keys(cityAreas).map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Area Selection */}
          <Select value={area} onValueChange={setArea} disabled={city === "all"}>
            <SelectTrigger className="h-14 w-full border-slate-200 bg-slate-50 hover:bg-slate-100/50 text-base rounded-xl transition-colors disabled:opacity-50">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder={city === "all" ? "Select City First" : "Area/Neighborhood"} />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              {availableAreas.map(a => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Property Type */}
          <Select>
            <SelectTrigger className="h-14 w-full md:w-[150px] border-slate-200 bg-slate-50 hover:bg-slate-100/50 text-base rounded-xl transition-colors">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Type" />
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

          {/* Price */}
          <Select>
            <SelectTrigger className="h-14 w-full md:w-[130px] border-slate-200 bg-slate-50 hover:bg-slate-100/50 text-base rounded-xl transition-colors">
              <div className="flex items-center gap-2">
                <SelectValue placeholder="Max Price" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Price</SelectItem>
              <SelectItem value="500k">Up to ₦500k</SelectItem>
              <SelectItem value="1m">Up to ₦1m</SelectItem>
              <SelectItem value="5m">Up to ₦5m</SelectItem>
              <SelectItem value="20m">Up to ₦20m</SelectItem>
              <SelectItem value="50m">Up to ₦50m</SelectItem>
              <SelectItem value="100m+">₦100m +</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Action Buttons */}
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
        
        {/* Mobile View Map Button */}
        <div className="mt-2 sm:hidden px-2 pb-2">
          <Button variant="outline" className="w-full text-primary border-primary/20 bg-primary/5">
            <MapIcon className="h-4 w-4 mr-2" /> View on Map
          </Button>
        </div>
      </Tabs>
    </div>
  );
}
