-- Create events table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  time TEXT NOT NULL,
  category TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on location for faster queries
CREATE INDEX idx_events_location ON events (location);

-- Create index on category for filtering
CREATE INDEX idx_events_category ON events (category);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access to all authenticated users
CREATE POLICY "Allow public read access" ON events
  FOR SELECT USING (true);

-- Create policy to allow insert/update/delete for authenticated users (adjust as needed)
CREATE POLICY "Allow authenticated users to manage events" ON events
  FOR ALL USING (auth.role() = 'authenticated');
