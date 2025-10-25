import { MapPin, Loader2, MapPinOff } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface HeroProps {
  locationStatus: "loading" | "success" | "error";
  onRequestLocation: () => void;
}

export function Hero({ locationStatus, onRequestLocation }: HeroProps) {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          {locationStatus === "loading" ? (
            <Loader2 className="h-20 w-20 mx-auto text-gray-300 animate-spin" />
          ) : locationStatus === "success" ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onRequestLocation}
                    type="button"
                    className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
                    aria-label="Refresh location"
                  >
                    <MapPin className="h-20 w-20 mx-auto text-green-500" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to refresh location</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onRequestLocation}
                    type="button"
                    className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
                    aria-label="Request location access"
                  >
                    <MapPinOff className="h-20 w-20 mx-auto text-gray-500" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to enable location access</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <h1 className="text-white mb-3">
          Find Free Food Near You
        </h1>
        
        <p className="text-gray-400 max-w-2xl mx-auto">
          {locationStatus === "loading" 
            ? "Detecting your location..."
            : locationStatus === "success"
            ? "Events sorted by distance from your location"
            : "Showing events near Aluva"}
        </p>
      </div>
    </section>
  );
}
