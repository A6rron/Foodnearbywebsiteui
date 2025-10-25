import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { EventListings } from "./components/EventListings";
import { Footer } from "./components/Footer";
import { useState, useEffect } from "react";

export default function App() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<"loading" | "success" | "error">("loading");

  const detectLocation = () => {
    if ("geolocation" in navigator) {
      setLocationStatus("loading");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationStatus("success");
        },
        (error) => {
          console.log("Geolocation error:", error);
          // Use default location (Aluva, Kerala)
          setLocationStatus("error");
          setUserLocation({ lat: 10.1081, lng: 76.3525 });
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    } else {
      setLocationStatus("error");
      setUserLocation({ lat: 10.1081, lng: 76.3525 });
    }
  };

  useEffect(() => {
    // Set default location immediately (Aluva, Kerala)
    const defaultLocation = { lat: 10.1081, lng: 76.3525 };
    setUserLocation(defaultLocation);
    
    // Try to detect location automatically after a small delay
    const timer = setTimeout(() => {
      detectLocation();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <Hero locationStatus={locationStatus} onRequestLocation={detectLocation} />
      <EventListings userLocation={userLocation} />
      <Footer />
    </div>
  );
}
