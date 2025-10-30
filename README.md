
  # Food Nearby Website UI

This is a code bundle for Food Nearby Website UI. The original project is available at https://www.figma.com/design/uWwigPFn8JO2ekqVaI4Dq3/Food-Nearby-Website-UI.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Go to Settings > API to get your project URL and anon key
3. Update the `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 3. Database Setup

Run the SQL migration to create the events table:

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the following SQL:

```sql
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
```

### 4. Seed Data

Insert sample events data:

```sql
INSERT INTO events (name, location, lat, lng, time, category, verified) VALUES
('Wedding Reception', 'Bethany Convention Centre, Aluva', 10.1106, 76.3525, 'Today, 5:00 PM', 'Wedding Ceremony', true),
('Temple Sadya', 'Aluva Shiva Temple, Manappuram', 10.1088, 76.3509, 'Today, 6:30 PM', 'Temple Feast', true),
('Wedding Ceremony', 'Cochin Palace Auditorium, Aluva', 10.1076, 76.3495, 'Today, 7:00 PM', 'Wedding Ceremony', false),
('Wedding Reception', 'Lourdes Matha Convention Centre, Aluva', 10.1133, 76.3501, 'Oct 22, 6:00 PM', 'Wedding Ceremony', true),
('Wedding Feast', 'St. Sebastian''s Church Hall, Aluva', 10.1095, 76.3468, 'Oct 23, 12:30 PM', 'Wedding Ceremony', false),
('Reception Party', 'Metro Tower Convention Hall, Aluva', 10.1062, 76.3522, 'Oct 24, 7:00 PM', 'Wedding Ceremony', true),
('Temple Feast', 'Sri Krishna Temple Hall, Aluva East', 10.1118, 76.3558, 'Oct 25, 12:00 PM', 'Temple Feast', false);
```

### 5. Test Database Connection

Open `test-db.html` in your browser and update the Supabase credentials to test the connection.

## Running the Application

```bash
npm run dev
```

The application will start at `http://localhost:5173` and display nearby food events based on your location.
  