// Provide a minimal ImportMeta typing for this file so TypeScript in the workspace
// doesn't complain about `import.meta.env`. In a full project you may want to
// centralize these types (e.g. `env.d.ts`) and provide a stricter shape.
declare global {
  interface ImportMetaEnv {
    [key: string]: any
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// Only log credential presence in development to avoid leaking info in production
if (import.meta.env.MODE === 'development') {
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Key exists:', !!supabaseAnonKey)
  if (!isSupabaseConfigured) {
    console.warn('Missing Supabase credentials! Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env')
  }
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

// Helper to fetch events and normalise numeric fields (lat/lng) which may come back as strings
export async function fetchEventsFromSupabase(options: { raw?: boolean } = { raw: true }) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new Error('Supabase not configured') }
  }

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return { data: null, error }
  }

  if (!data || !Array.isArray(data)) {
    return { data: [], error: null }
  }

  // If raw is requested, return the rows exactly as Supabase returned them
  if (options.raw) {
    return { data, error: null }
  }

  // Otherwise return a normalized shape for backward compatibility
  const parsed = data.map((row: any) => ({
    id: row.id,
    name: row.event_name ?? row.name ?? row.eventName ?? '',
    location: row.location ?? row.place ?? '',
    time: row.time ?? (row.date ? `${row.date}${row.time ? ` ${row.time}` : ''}` : ''),
    category: row.category ?? row.food_type ?? row.type ?? '',
    verified: row.verified === true || row.verified === 'true' || row.verified === 't',
    created_at: row.created_at,
    updated_at: row.updated_at,
    sender_number: row.sender_number ?? row.phone ?? null,
    media_url: row.media_url ?? null,
    raw_text: row.raw_text ?? null,
    confidence_scores: row.confidence_scores ?? null,
    location_maps_link: row.location_maps_link ?? row.maps_link ?? null,
    __raw: row,
    lat: (row.lat ?? row.latitude ?? row.gps_latitude ?? row.gps_lat) !== null && (row.lat ?? row.latitude ?? row.gps_latitude ?? row.gps_lat) !== undefined ? Number(row.lat ?? row.latitude ?? row.gps_latitude ?? row.gps_lat) : null,
    lng: (row.lng ?? row.longitude ?? row.gps_longitude ?? row.gps_lng) !== null && (row.lng ?? row.longitude ?? row.gps_longitude ?? row.gps_lng) !== undefined ? Number(row.lng ?? row.longitude ?? row.gps_longitude ?? row.gps_lng) : null,
  }))

  return { data: parsed, error: null }
}
