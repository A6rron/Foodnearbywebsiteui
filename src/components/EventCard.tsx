import { MapPin, Clock, CheckCircle2, ExternalLink } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface EventCardProps {
  name: string;
  location: string;
  distance: string;
  time: string;
  category: string;
  isToday?: boolean;
  verified?: boolean;
  locationMapsLink?: string | null;
  // allow extra props (like React key) to avoid type errors when JSX types are not fully available
  [key: string]: any;
}

export function EventCard({ name, location, distance, time, category, isToday, verified, locationMapsLink }: EventCardProps) {
  // Prefer a maps link if supplied by the backend, otherwise build a Google maps search URL
  const googleMapsUrl = locationMapsLink ? locationMapsLink : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  
  return (
    <Card className="p-5 rounded-2xl bg-gray-800 border-gray-700 hover:border-gray-600 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between gap-4">
        {/* Left side: Event details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="text-white">
              {name}
            </h3>
            {isToday && (
              <Badge variant="destructive" className="rounded-full bg-red-500">
                Today
              </Badge>
            )}
            {verified && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Verified by admin</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <p className="text-gray-400 mb-3">
            {category}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white hover:underline transition-colors inline-flex items-center gap-1.5 group"
                aria-label="Open in Google Maps"
              >
                <MapPin className="h-4 w-4 flex-shrink-0 group-hover:text-white transition-colors" />
                <span>{location}</span>
                <ExternalLink className="h-3.5 w-3.5 group-hover:text-white transition-colors" />
              </a>
              <span className="text-gray-500">• {distance}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
