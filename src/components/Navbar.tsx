import { Button } from "./ui/button";
import { useState } from "react";
import { HelpCircle, MessageCircle, Bot, Database, Globe, FileImage, MessageSquare, Calendar, MapPin, AlertTriangle, X } from "lucide-react";

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
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center p-4"
                  onClick={() => setShowTooltip(false)}
                >
                  <div
                    className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-gray-900 border border-gray-700 text-white p-4 sm:p-5 md:p-6 rounded-xl shadow-2xl animate-in fade-in-50 zoom-in-95 duration-300 max-h-[80vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg sm:text-xl flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                    How It Works
                    </h3>
                      <button
                        onClick={() => setShowTooltip(false)}
                        className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-lg"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-4">

                    {/* Flow Diagram */}
                    <div className="bg-gray-800 rounded-lg p-2 sm:p-3">
                      <p className="text-xs sm:text-sm font-semibold text-center mb-2">Real-time Flow:</p>
                      <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs">
                        <div className="flex flex-col items-center">
                          <div className="bg-green-600 rounded-full p-2 mb-1">
                            <MessageCircle className="h-4 w-4" />
                          </div>
                          <span>User</span>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="flex flex-col items-center">
                          <div className="bg-blue-600 rounded-full p-2 mb-1">
                            <Bot className="h-4 w-4" />
                          </div>
                          <span>WhatsApp Bot</span>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="flex flex-col items-center">
                          <div className="bg-purple-600 rounded-full p-2 mb-1">
                            <Database className="h-4 w-4" />
                          </div>
                          <span>Supabase</span>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="flex flex-col items-center">
                          <div className="bg-orange-600 rounded-full p-2 mb-1">
                            <Globe className="h-4 w-4" />
                          </div>
                          <span>Website</span>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                      <p className="text-xs sm:text-sm text-gray-300">
                          <strong>Flow:</strong> User → WhatsApp → Bot → Supabase → Website (Real-time)
                        </p>
                      <p className="text-xs sm:text-sm text-gray-300">
                          Add events like marriages, catering, or free food through WhatsApp.
                          The bot reads messages or posters, extracts details, and updates the website instantly.
                        </p>
                      </div>
                    </div>

                    {/* Event Types */}
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-semibold">Supported Event Types:</p>
                      <p className="text-xs text-gray-400 mb-2">Our AI bot automatically detects and processes different types of food events:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-start gap-2 bg-gray-800 rounded p-2">
                          <FileImage className="h-4 w-4 text-blue-400 mt-0.5" />
                          <div className="text-xs">
                            <div className="font-medium">Poster (OCR)</div>
                            <div className="text-gray-400">Scans wedding invitations, party flyers, and event posters using optical character recognition</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 bg-gray-800 rounded p-2">
                          <MessageSquare className="h-4 w-4 text-green-400 mt-0.5" />
                          <div className="text-xs">
                            <div className="font-medium">Text Message</div>
                            <div className="text-gray-400">Parses casual messages like "Marriage at MES Hall tomorrow 5 PM"</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 bg-gray-800 rounded p-2">
                          <Calendar className="h-4 w-4 text-purple-400 mt-0.5" />
                          <div className="text-xs">
                            <div className="font-medium">Catering Schedule</div>
                            <div className="text-gray-400">Extracts venue, date, and timing from WhatsApp group catering announcements</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 bg-gray-800 rounded p-2">
                          <MapPin className="h-4 w-4 text-red-400 mt-0.5" />
                          <div className="text-xs">
                            <div className="font-medium">Live Photo/Video</div>
                            <div className="text-gray-400">Verifies event locations using GPS metadata from uploaded media</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="border-t border-gray-600 pt-2 sm:pt-3 space-y-1 sm:space-y-2">
                      <p className="text-xs sm:text-sm font-semibold flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                        Additional Info:
                      </p>
                      <p className="text-xs text-gray-400 mb-1 sm:mb-2">Helpful tips for using Food Nearby effectively:</p>
                      <ul className="text-xs space-y-1 text-gray-300">
                        <li>• <strong>Today's events</strong> appear first, followed by upcoming ones sorted by date</li>
                        <li>• <strong>Click event locations</strong> to open the exact spot in Google Maps for easy navigation</li>
                        <li>• <strong>Location permission</strong> is requested to show events near you (Aluva, Kerala by default)</li>
                        <li>• <strong>At Your Risk</strong>: Enjoy free food responsibly and verify event details when possible</li>
                      </ul>
                    </div>
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
