import { Button } from "./ui/button";
import { useState } from "react";
import { HelpCircle } from "lucide-react";

export function Navbar() {
  const phoneNumber = '917304483935' // country code +91 and number without + or spaces
  const message = `1. *Event Name*:\n2. *Date and Time*:\n3. *Location*:\n4. *Map Link*:\n`
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <nav className="border-b border-gray-800 bg-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="leading-tight">
              <div className="text-white text-lg font-semibold tracking-wide">
                Food Nearby
              </div>
              <div className="text-gray-400 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                - At Your Risk
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Button
                className="bg-gray-700 text-white hover:bg-gray-600 rounded-full p-2"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
              {showTooltip && (
                <div
                  className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-80 max-h-96 overflow-y-auto bg-gray-900 border border-gray-700 text-white p-4 rounded-lg shadow-xl z-50"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">How It Works</h3>

                    <div className="text-sm space-y-2">
                      <p><strong>Flow:</strong> User → WhatsApp → Bot → Supabase → Website (Real-time)</p>
                      <p>Add events like marriages, catering, or free food through WhatsApp. The bot reads messages or posters, extracts details, and updates the website instantly.</p>
                    </div>

                    <div className="text-sm space-y-2">
                      <p><strong>Types:</strong></p>
                      <ul className="space-y-1 text-xs">
                        <li>• Poster (OCR) – Scans invites and flyers</li>
                        <li>• Text Message – Parses messages like "Marriage at MES Hall, 5 PM"</li>
                        <li>• Catering Schedule – Extracts venue, date, and time from group messages</li>
                        <li>• Live Photo/Video – Verifies location using GPS</li>
                      </ul>
                    </div>

                    <div className="text-sm space-y-1 pt-2 border-t border-gray-600">
                      <p><strong>Additional Info:</strong></p>
                      <p>• Today's events appear first, followed by upcoming ones</p>
                      <p>• Click event locations to open in Google Maps</p>
                      <p>• At Your Risk: Enjoy free food responsibly</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button
              asChild
              className="bg-white text-gray-900 hover:bg-gray-100 rounded-full"
            >
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                Add Event
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
