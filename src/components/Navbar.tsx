import { Button } from "./ui/button";
import { useState } from "react";
import { HelpCircle, MessageCircle, Bot, Database, Globe, FileImage, MessageSquare, Calendar, MapPin, AlertTriangle, X } from "lucide-react";

export function Navbar() {
  const phoneNumber = '917304483935' // country code +91 and number without + or spaces
  const message = `1. *Event Name*:\n2. *Date and Time*:\n3. *Location*:\n4. *Map Link*:\n`
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  const [showModal, setShowModal] = useState(false)

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
            <Button
              className="bg-gray-700 text-white hover:bg-gray-600 rounded-full p-2"
              onClick={() => setShowModal(true)}
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 text-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <div className="bg-blue-600 rounded-full p-2">
                        <HelpCircle className="h-6 w-6" />
                      </div>
                      How It Works
                    </h2>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    {/* Flow Diagram */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
                      <h3 className="text-xl font-semibold text-center mb-4 text-blue-400">Real-time Flow Process</h3>
                      <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
                        <div className="flex flex-col items-center">
                          <div className="bg-green-600 rounded-full p-3 mb-2 shadow-lg">
                            <MessageCircle className="h-6 w-6" />
                          </div>
                          <span className="font-medium">User</span>
                          <span className="text-xs text-gray-400">WhatsApp</span>
                        </div>
                        <div className="text-2xl text-gray-400">→</div>
                        <div className="flex flex-col items-center">
                          <div className="bg-blue-600 rounded-full p-3 mb-2 shadow-lg">
                            <Bot className="h-6 w-6" />
                          </div>
                          <span className="font-medium">AI Bot</span>
                          <span className="text-xs text-gray-400">Processes</span>
                        </div>
                        <div className="text-2xl text-gray-400">→</div>
                        <div className="flex flex-col items-center">
                          <div className="bg-purple-600 rounded-full p-3 mb-2 shadow-lg">
                            <Database className="h-6 w-6" />
                          </div>
                          <span className="font-medium">Supabase</span>
                          <span className="text-xs text-gray-400">Database</span>
                        </div>
                        <div className="text-2xl text-gray-400">→</div>
                        <div className="flex flex-col items-center">
                          <div className="bg-orange-600 rounded-full p-3 mb-2 shadow-lg">
                            <Globe className="h-6 w-6" />
                          </div>
                          <span className="font-medium">Website</span>
                          <span className="text-xs text-gray-400">Live Updates</span>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-300 mb-2">
                          Add events via WhatsApp → AI Bot processes → Website updates instantly
                        </p>
                        <p className="text-xs text-gray-500">
                          Powered by advanced AI for accurate event extraction and real-time synchronization
                        </p>
                      </div>
                    </div>

                    {/* Event Types */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-green-400 flex items-center gap-2">
                        <FileImage className="h-5 w-5" />
                        Supported Event Types
                      </h3>
                      <p className="text-gray-300">Our AI bot automatically detects and processes different types of food events:</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <FileImage className="h-8 w-8 text-blue-400 mt-1" />
                            <div>
                              <h4 className="font-semibold text-blue-300 mb-1">Poster (OCR)</h4>
                              <p className="text-sm text-gray-300">Scans wedding invitations, party flyers, and event posters using advanced optical character recognition technology</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-500/30 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <MessageSquare className="h-8 w-8 text-green-400 mt-1" />
                            <div>
                              <h4 className="font-semibold text-green-300 mb-1">Text Message</h4>
                              <p className="text-sm text-gray-300">Parses casual messages like "Marriage at MES Hall tomorrow 5 PM" with natural language processing</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/20 border border-purple-500/30 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Calendar className="h-8 w-8 text-purple-400 mt-1" />
                            <div>
                              <h4 className="font-semibold text-purple-300 mb-1">Catering Schedule</h4>
                              <p className="text-sm text-gray-300">Extracts venue, date, and timing from WhatsApp group catering announcements and schedules</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-500/30 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <MapPin className="h-8 w-8 text-red-400 mt-1" />
                            <div>
                              <h4 className="font-semibold text-red-300 mb-1">Live Photo/Video</h4>
                              <p className="text-sm text-gray-300">Verifies event locations using GPS metadata from uploaded photos and videos</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 border border-yellow-500/30 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-5 w-5" />
                        Helpful Tips
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-0.5">•</span>
                          <span><strong>Today's events</strong> appear first, followed by upcoming ones sorted by date</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-0.5">•</span>
                          <span><strong>Click event locations</strong> to open the exact spot in Google Maps for easy navigation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-0.5">•</span>
                          <span><strong>Location permission</strong> is requested to show events near you (Aluva, Kerala by default)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-0.5">•</span>
                          <span><strong>At Your Risk</strong>: Enjoy free food responsibly and verify event details when possible</span>
                        </li>
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
