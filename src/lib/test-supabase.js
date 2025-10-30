// Test script to verify Supabase connection and populate events
import { supabase } from './supabase.js';

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');

    // Test connection by fetching events
    const { data, error } = await supabase.from('events').select('*');

    if (error) {
      console.error('Connection error:', error);
      return;
    }

    console.log('Connection successful. Current events:', data);

    // If no events, insert sample data
    if (!data || data.length === 0) {
      console.log('No events found. Inserting sample data...');

      const sampleEvents = [
        {
          name: 'Wedding Reception',
          location: 'Bethany Convention Centre, Aluva',
          lat: 10.1106,
          lng: 76.3525,
          time: 'Today, 5:00 PM',
          category: 'Wedding Ceremony',
          verified: true
        },
        {
          name: 'Temple Sadya',
          location: 'Aluva Shiva Temple, Manappuram',
          lat: 10.1088,
          lng: 76.3509,
          time: 'Today, 6:30 PM',
          category: 'Temple Feast',
          verified: true
        },
        {
          name: 'Wedding Ceremony',
          location: 'Cochin Palace Auditorium, Aluva',
          lat: 10.1076,
          lng: 76.3495,
          time: 'Today, 7:00 PM',
          category: 'Wedding Ceremony',
          verified: false
        },
        {
          name: 'Wedding Reception',
          location: 'Lourdes Matha Convention Centre, Aluva',
          lat: 10.1133,
          lng: 76.3501,
          time: 'Oct 22, 6:00 PM',
          category: 'Wedding Ceremony',
          verified: true
        },
        {
          name: 'Wedding Feast',
          location: 'St. Sebastian\'s Church Hall, Aluva',
          lat: 10.1095,
          lng: 76.3468,
          time: 'Oct 23, 12:30 PM',
          category: 'Wedding Ceremony',
          verified: false
        }
      ];

      const { data: insertedData, error: insertError } = await supabase
        .from('events')
        .insert(sampleEvents)
        .select();

      if (insertError) {
        console.error('Error inserting events:', insertError);
      } else {
        console.log('Sample events inserted successfully:', insertedData);
      }
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testConnection();
