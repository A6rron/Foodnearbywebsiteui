import { EventCard } from "./EventCard";
import { useMemo, useState, useEffect } from "react";
import { fetchEventsFromSupabase, isSupabaseConfigured } from "../lib/supabase";

interface Event {
  id?: string | number;
  name: string;
  location: string;
  lat: number | null;
  lng: number | null;
  time: string;
  category: string;
  verified?: boolean;
  created_at?: string;
  location_maps_link?: string | null;
}

interface EventListingsProps {
  userLocation: { lat: number; lng: number } | null;
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lng1: number, lat2: number | null, lng2: number | null): number {
  const R = 6371; // Earth's radius in km
  if (lat2 === null || lng2 === null || isNaN(lat2) || isNaN(lng2)) return Infinity;
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
  const [events, setEvents] = useState([] as Event[]);
  const [loading, setLoading] = useState(true as boolean);
  const [supabaseError, setSupabaseError] = useState(null as string | null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // If Supabase isn't configured, avoid calling it and surface a helpful error
      if (!isSupabaseConfigured) {
        setSupabaseError('Supabase is not configured (missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY).')
        setLoading(false)
        return
      }

  console.log('Attempting to fetch events from Supabase (raw rows)...');
  const { data, error } = await fetchEventsFromSupabase({ raw: true });

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error details:', error);
        setSupabaseError(error.message || String(error));
        setLoading(false);
        return;
      }

      console.log('Data received from Supabase:', data);

      if (!data || data.length === 0) {
        // No events in DB — surface message
        setSupabaseError('No events found in Supabase. Please seed the database or add events.')
        setEvents([])
      } else {
        console.log('Setting events from Supabase:', data.length, 'events');
        // Accept raw Supabase rows. We'll read multiple possible field names when rendering.
        setEvents(data as any[]);
        setSupabaseError(null);
      }
    } catch (error) {
      console.error('Exception during fetch:', error);
      setSupabaseError(String(error));
    } finally {
      setLoading(false);
    }
  };

  // No local fallback: we only source events from Supabase per project requirements.
  // Helper to read multiple possible fields from raw Supabase row
  const getField = (e: any, names: string[]) => {
    for (const n of names) {
      if (e[n] !== undefined && e[n] !== null) return e[n]
    }
    return ''
  }

  const getNumber = (e: any, names: string[]) => {
    const v = getField(e, names)
    if (v === '' || v === null || v === undefined) return null
    const n = Number(v)
    return Number.isFinite(n) ? n : null
  }

  // Format date and time together. db may store `time` or split `date` and `time` columns.
  const formatDateTime = (e: any) => {
    const timeVal = getField(e, ['time', 'event_time'])
    const dateVal = getField(e, ['date', 'event_date'])
    if (dateVal && timeVal) return `${String(dateVal).trim()} ${String(timeVal).trim()}`
    if (dateVal) return String(dateVal).trim()
    if (timeVal) return String(timeVal).trim()
    return ''
  }

  // Parse a date object from event fields (best-effort). Returns null if unable or if event is in the past.
  const parseEventDate = (e: any): Date | null => {
    const now = new Date()
    // Set now to start of current day for date comparisons
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    const dateRaw = getField(e, ['date', 'event_date', 'eventDate'])
    const timeRaw = getField(e, ['time', 'event_time'])

    if (!dateRaw && !timeRaw) return null

    // Try to parse the date
    const date = new Date()
    
    // Handle dates with explicit years like "25 Oct 2025" or without years like "25 Oct"
    if (dateRaw) {
      const s = String(dateRaw).trim()
      
      // First try to detect if there's a year in the date
      const hasYear = /\b(\d{4})\b/.test(s)
      
      // Try parsing both "DD Month [YYYY]" and "Month DD [YYYY]" formats
      const monthMatch = s.match(/(?:(\d{1,2})\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*(?:\s*(\d{4}))?)|(?:(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*(\d{1,2})(?:\s*(\d{4}))?)/i)
      
      if (monthMatch) {
        let day, monthStr, yearStr;
        if (monthMatch[1] && monthMatch[2]) {
          // "DD Month [YYYY]" format
          day = parseInt(monthMatch[1])
          monthStr = monthMatch[2]
          yearStr = monthMatch[3]
        } else {
          // "Month DD [YYYY]" format
          day = parseInt(monthMatch[5])
          monthStr = monthMatch[4]
          yearStr = monthMatch[6]
        }
        
        const month = new Date(Date.parse(`${monthStr} 1, 2000`)).getMonth()
        date.setMonth(month)
        date.setDate(day)
        
        // If year was explicitly provided, use it
        if (yearStr) {
          date.setFullYear(parseInt(yearStr))
        } else {
          // No explicit year: use current year
          date.setFullYear(now.getFullYear())
          // If date would be in the past, use next year
          if (date < todayStart) {
            date.setFullYear(now.getFullYear() + 1)
          }
        }
      } else {
        // Try other date formats as fallback
        const parsed = Date.parse(s)
        if (!isNaN(parsed)) {
          date.setTime(parsed)
          // For dates without explicit year that would be in the past
          if (!hasYear && date < todayStart) {
            date.setFullYear(now.getFullYear() + 1)
          }
        } else {
          return null
        }
      }
    }

    // Parse and set the time if available
    if (timeRaw) {
      const t = parseTimeString(String(timeRaw))
      if (t) {
        date.setHours(t.hours, t.minutes, 0, 0)
      }
    } else {
      // If no time specified, assume start of day
      date.setHours(0, 0, 0, 0)
    }

    // If the resulting date is in the past, return null
    return date.getTime() >= now.getTime() ? date : null
  }

  // Parse time like '11:00 AM' or '11.00' into hours/minutes
  const parseTimeString = (s: string): { hours: number; minutes: number } | null => {
    const trimmed = s.trim()
    // Match HH:MM AM/PM
    const ampm = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(trimmed)
    if (ampm) {
      let h = Number(ampm[1])
      const m = Number(ampm[2])
      const ampmPart = ampm[3].toUpperCase()
      if (ampmPart === 'PM' && h < 12) h += 12
      if (ampmPart === 'AM' && h === 12) h = 0
      return { hours: h, minutes: m }
    }
    // Match HH.MM or HH:MM without AM/PM (assume 24h)
    const colon = /^(\d{1,2})[:.](\d{2})$/.exec(trimmed)
    if (colon) {
      return { hours: Number(colon[1]), minutes: Number(colon[2]) }
    }
    // Match HHa/pm like 9AM
    const compact = /^(\d{1,2})\s*(AM|PM)$/i.exec(trimmed)
    if (compact) {
      let h = Number(compact[1])
      const ampmPart = compact[2].toUpperCase()
      if (ampmPart === 'PM' && h < 12) h += 12
      if (ampmPart === 'AM' && h === 12) h = 0
      return { hours: h, minutes: 0 }
    }
    return null
  }

  const isSameDay = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()

  const formatForDisplay = (e: any) => {
    const dt = parseEventDate(e)
    if (!dt) return formatDateTime(e) || ''

    const now = new Date()
    const isToday = isSameDay(dt, now)

    if (isToday) {
      // For today's events, add "Today" prefix and time only
      return `Today at ${dt.toLocaleTimeString(undefined, { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      })}`
    }

    // For future events, show date (without year) and time
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short'
    }
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }
    
    // Format as "30 Oct at 11:00 PM"
    return `${dt.toLocaleDateString(undefined, dateOptions)} at ${dt.toLocaleTimeString(undefined, timeOptions)}`
  }

  // Separate and sort events by distance from user location
  const { sortedTodayEvents, sortedUpcomingEvents } = useMemo(() => {
    if (loading || events.length === 0) {
      return { sortedTodayEvents: [], sortedUpcomingEvents: [] };
    }

    // Use default location if user location is not available (Aluva, Kerala)
    const location = userLocation || { lat: 10.1081, lng: 76.3525 };


    const now = new Date();
    
    // Process all events and filter out past events
    const processedEvents = events.map((event: any) => {
      const eventDate = parseEventDate(event);
      // Skip events without valid dates or past events
      if (!eventDate) {
        return null;
      }

      // Calculate if event is today
      const isToday = isSameDay(eventDate, now);

      return {
        ...event,
        distance: calculateDistance(
          location.lat,
          location.lng,
          getNumber(event, ['lat','latitude','gps_latitude','gps_lat']),
          getNumber(event, ['lng','longitude','gps_longitude','gps_lng'])
        ),
        _eventDate: eventDate,
        _displayTime: formatForDisplay(event),
        isToday: isToday
      };
    }).filter((event: any): event is NonNullable<typeof event> => event !== null);

    // Sort all events by time
    processedEvents.sort((a: any, b: any) => {
      const aTime = a._eventDate.getTime();
      const bTime = b._eventDate.getTime();
      if (aTime !== bTime) return aTime - bTime;
      return (a.distance ?? Infinity) - (b.distance ?? Infinity);
    });

    // Separate into today and upcoming events
    const sortedToday = processedEvents.filter((event: any) => event.isToday);
    const sortedUpcoming = processedEvents.filter((event: any) => !event.isToday);

    return { sortedTodayEvents: sortedToday, sortedUpcomingEvents: sortedUpcoming };
  }, [events, userLocation, loading]);

  if (loading) {
    return (
      <section className="py-8 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <p>Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  // If there was a Supabase error and no events, show a helpful UI to retry
  if (!loading && supabaseError && events.length === 0) {
    return (
      <section className="py-8 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <p className="mb-4">{supabaseError}</p>
            <div className="flex items-center justify-center gap-3">
              <button
                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white"
                onClick={() => {
                  setLoading(true)
                  setSupabaseError(null)
                  fetchEvents()
                }}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }



  return (
    <section className="py-8 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Today's Events */}
        {sortedTodayEvents.length > 0 && (
          <div id="live-events" className="mb-12">
            <div className="mb-6">
              <h2 className="text-white">
                Today ({new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short' })})
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {sortedTodayEvents.map((event: any, index: number) => (
                <EventCard
                  key={event.id || index}
                  name={(event.event_name ?? event.name) as string}
                  location={(event.location ?? event.place ?? '') as string}
                  distance={Number.isFinite(event.distance) ? `${event.distance.toFixed(1)} km away` : 'Location only'}
                  time={event._displayTime}
                  category={(event.category ?? event.food_type ?? '') as string}
                  verified={event.verified === true || event.verified === 'true' || event.verified === 't'}
                  isToday={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        {sortedUpcomingEvents.length > 0 && (
          <div id="upcoming-events">
            <div className="mb-6">
              <h2 className="text-white">
                Upcoming Events
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {sortedUpcomingEvents.map((event: any, index: number) => (
                <EventCard
                  key={event.id || index}
                  name={(event.event_name ?? event.name) as string}
                  location={(event.location ?? event.place ?? '') as string}
                  distance={Number.isFinite(event.distance) ? `${event.distance.toFixed(1)} km away` : 'Location only'}
                  time={event._displayTime}
                  category={(event.category ?? event.food_type ?? '') as string}
                  verified={event.verified === true || event.verified === 'true' || event.verified === 't'}
                  isToday={false}
                />
              ))}
            </div>
          </div>
        )}

        {sortedTodayEvents.length === 0 && sortedUpcomingEvents.length === 0 && (
          <div className="text-center text-white">
            <p>No upcoming events found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
