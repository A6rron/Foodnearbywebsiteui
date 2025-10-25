import { EventCard } from "./EventCard";
import { useMemo } from "react";

interface Event {
  name: string;
  location: string;
  lat: number;
  lng: number;
  time: string;
  category: string;
  verified: boolean;
}

interface EventListingsProps {
  userLocation: { lat: number; lng: number } | null;
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function EventListings({ userLocation }: EventListingsProps) {
  // Sample events with coordinates (Aluva, Kerala area)
  const todayEventsData: Event[] = [
    {
      name: "Wedding Reception",
      location: "Bethany Convention Centre, Aluva",
      lat: 10.1106,
      lng: 76.3525,
      time: "Today, 5:00 PM",
      category: "Wedding Ceremony",
      verified: true
    },
    {
      name: "Temple Sadya",
      location: "Aluva Shiva Temple, Manappuram",
      lat: 10.1088,
      lng: 76.3509,
      time: "Today, 6:30 PM",
      category: "Temple Feast",
      verified: true
    },
    {
      name: "Wedding Ceremony",
      location: "Cochin Palace Auditorium, Aluva",
      lat: 10.1076,
      lng: 76.3495,
      time: "Today, 7:00 PM",
      category: "Wedding Ceremony",
      verified: false
    }
  ];

  const upcomingEventsData: Event[] = [
    {
      name: "Wedding Reception",
      location: "Lourdes Matha Convention Centre, Aluva",
      lat: 10.1133,
      lng: 76.3501,
      time: "Oct 22, 6:00 PM",
      category: "Wedding Ceremony",
      verified: true
    },
    {
      name: "Wedding Feast",
      location: "St. Sebastian's Church Hall, Aluva",
      lat: 10.1095,
      lng: 76.3468,
      time: "Oct 23, 12:30 PM",
      category: "Wedding Ceremony",
      verified: false
    },
    {
      name: "Reception Party",
      location: "Metro Tower Convention Hall, Aluva",
      lat: 10.1062,
      lng: 76.3522,
      time: "Oct 24, 7:00 PM",
      category: "Wedding Ceremony",
      verified: true
    },
    {
      name: "Temple Feast",
      location: "Sri Krishna Temple Hall, Aluva East",
      lat: 10.1118,
      lng: 76.3558,
      time: "Oct 25, 12:00 PM",
      category: "Temple Feast",
      verified: false
    }
  ];

  // Sort events by distance from user location
  const sortedTodayEvents = useMemo(() => {
    // Use default location if user location is not available (Aluva, Kerala)
    const location = userLocation || { lat: 10.1081, lng: 76.3525 };
    
    return [...todayEventsData]
      .map(event => ({
        ...event,
        distance: calculateDistance(location.lat, location.lng, event.lat, event.lng)
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [userLocation]);

  const sortedUpcomingEvents = useMemo(() => {
    // Use default location if user location is not available (Aluva, Kerala)
    const location = userLocation || { lat: 10.1081, lng: 76.3525 };
    
    return [...upcomingEventsData]
      .map(event => ({
        ...event,
        distance: calculateDistance(location.lat, location.lng, event.lat, event.lng)
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [userLocation]);

  return (
    <section className="py-8 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Today Events */}
        <div id="live-events" className="mb-12">
          <div className="mb-6">
            <h2 className="text-white">
              Today
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {sortedTodayEvents.map((event, index) => (
              <EventCard 
                key={index} 
                name={event.name}
                location={event.location}
                distance={`${event.distance.toFixed(1)} km away`}
                time={event.time}
                category={event.category}
                verified={event.verified}
                isToday={true} 
              />
            ))}
          </div>
        </div>

        {/* Future Events */}
        <div id="upcoming-events">
          <div className="mb-6">
            <h2 className="text-white">
              Future Events
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {sortedUpcomingEvents.map((event, index) => (
              <EventCard 
                key={index} 
                name={event.name}
                location={event.location}
                distance={`${event.distance.toFixed(1)} km away`}
                time={event.time}
                category={event.category}
                verified={event.verified}
                isToday={false} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
