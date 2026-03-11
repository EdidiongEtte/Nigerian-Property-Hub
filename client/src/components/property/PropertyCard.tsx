import { Link } from "wouter";
import { MapPin, Bed, Bath, Grid2X2, CheckCircle2 } from "lucide-react";
import { Property } from "@/lib/data/mock-properties";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // Format price with commas
  const formattedPrice = new Intl.NumberFormat('en-NG').format(property.price);

  return (
    <Link href={`/property/${property.id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg border-slate-200 h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden shrink-0">
          <img 
            src={property.images[0]} 
            alt={property.title} 
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={property.type === 'sale' ? 'default' : 'secondary'} className="font-semibold shadow-sm backdrop-blur-md bg-white/90 text-foreground">
              For {property.type === 'sale' ? 'Sale' : 'Rent'}
            </Badge>
            {property.featured && (
              <Badge className="bg-primary/90 hover:bg-primary font-semibold shadow-sm backdrop-blur-md text-white">
                Featured
              </Badge>
            )}
          </div>
          <div className="absolute bottom-3 right-3">
            <Badge variant="outline" className="bg-black/60 text-white border-none backdrop-blur-sm font-medium">
              {property.propertyType}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-5 flex flex-col flex-1">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-heading font-bold text-2xl text-primary">
              {property.currency}{formattedPrice}
              {property.period && <span className="text-sm font-normal text-muted-foreground">/{property.period}</span>}
            </p>
          </div>
          
          <h3 className="font-semibold text-lg line-clamp-1 mb-2 text-foreground group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-start text-muted-foreground text-sm mb-4">
            <MapPin className="h-4 w-4 mr-1 mt-0.5 shrink-0" />
            <span className="line-clamp-2">{property.location.area}, {property.location.city}</span>
          </div>
          
          <div className="mt-auto flex items-center gap-4 text-sm text-slate-600 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5" title="Bedrooms">
              <Bed className="h-4 w-4 text-slate-400" />
              <span className="font-medium">{property.features.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Bathrooms">
              <Bath className="h-4 w-4 text-slate-400" />
              <span className="font-medium">{property.features.bathrooms}</span>
            </div>
            {property.features.sqm && (
              <div className="flex items-center gap-1.5" title="Square Meters">
                <Grid2X2 className="h-4 w-4 text-slate-400" />
                <span className="font-medium">{property.features.sqm} sqm</span>
              </div>
            )}
            
            <div className="ml-auto text-xs font-medium px-2 py-1 bg-slate-50 rounded-md border border-slate-100 flex items-center gap-1">
              <span className="truncate max-w-[80px]">{property.agent.name}</span>
              {property.agent.verified && <CheckCircle2 className="h-3 w-3 text-primary" />}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
