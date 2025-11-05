import { Button } from "./ui/button";
import { useState } from "react";
import { HelpCircle, MessageCircle, Bot, Database, Globe, FileImage, MessageSquare, Calendar, MapPin, AlertTriangle, X, ChevronRight, Zap, Shield, MapIcon } from "lucide-react";

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
                  className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-300"
                  onClick={() => setShowTooltip(false)}
                >
                  <div
                    className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 text-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                          <HelpCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">How It Works</h2>
                          <p className="text-gray-400 text-sm">Discover how Food Nearby brings you free food events</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowTooltip(false)}
                        className="text-gray-400 hover:text-white transition-all duration-200 p-2 hover:bg-gray-800 rounded-xl hover:rotate-90"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
                      {/* Hero Section */}
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                          <Zap className="h-4 w-4" />
                          Real-time AI-Powered System
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          Connect your WhatsApp to instantly discover free food events in your area.
                          Our AI processes everything automatically.
                        </p>
                      </div>

                      {/* Flow Process */}
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                          <ChevronRight className="h-5 w-5 text-blue-400" />
                          The Process
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="group bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-500/30 rounded-xl p-4 hover:scale-105 transition-all duration-300">
                            <div className="bg-green-500 rounded-full p-3 w-fit mb-3 group-hover:shadow-lg group-hover:shadow-green-500/25 transition-shadow">
                              <MessageCircle className="h-5 w-5 text-white" />
                            </div>
                            <h4 className="font-semibold text-green-300 mb-2">1. Send Message</h4>
                            <p className="text-sm text-gray-300">Share event details via WhatsApp</p>
                          </div>

                          <div className="group bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-500/30 rounded-xl p-4 hover:scale-105 transition-all duration-300">
                            <div className="bg-blue-500 rounded-full p-3 w-fit mb-3 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-shadow">
                              <Bot className="h-5 w-5 text-white" />
                            </div>
                            <h4 className="font-semibold text-blue-300 mb-2">2. AI Processing</h4>
                            <p className="text-sm text-gray-300">Bot extracts event information</p>
                          </div>

                          <div className="group bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-500/30 rounded-xl p-4 hover:scale-105 transition-all duration-300">
                            <div className="bg-purple-500 rounded-full p-3 w-fit mb-3 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-shadow">
                              <Database className="h-5 w-5 text-white" />
                            </div>
                            <h4 className="font-semibold text-purple-300 mb-2">3. Database</h4>
                            <p className="text-sm text-gray-300">Events stored securely</p>
                          </div>

                          <div className="group bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-500/30 rounded-xl p-4 hover:scale-105 transition-all duration-300">
                            <div className="bg-orange-500 rounded-full p-3 w-fit mb-3 group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-shadow">
                              <Globe className="h-5 w-5 text-white" />
                            </div>
                            <h4 className="font-semibold text-orange-300 mb-2">4. Live Updates</h4>
                            <p className="text-sm text-gray-300">Website updates instantly</p>
                          </div>
                        </div>
                      </div>

                      {/* Event Types */}
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                          <ChevronRight className="h-5 w-5 text-green-400" />
                          Supported Event Types
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4 hover:border-blue-400/40 transition-colors">
                            <div className="flex items-start gap-4">
                              <div className="bg-blue-500/20 p-2 rounded-lg">
                                <FileImage className="h-5 w-5 text-blue-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-blue-300 mb-1">📄 Poster (OCR)</h4>
                                <p className="text-sm text-gray-300">Advanced optical character recognition scans wedding invitations, party flyers, and event posters</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 hover:border-green-400/40 transition-colors">
                            <div className="flex items-start gap-4">
                              <div className="bg-green-500/20 p-2 rounded-lg">
                                <MessageSquare className="h-5 w-5 text-green-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-green-300 mb-1">💬 Text Messages</h4>
                                <p className="text-sm text-gray-300">Natural language processing understands casual messages like "Marriage at MES Hall tomorrow 5 PM"</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-xl p-4 hover:border-purple-400/40 transition-colors">
                            <div className="flex items-start gap-4">
                              <div className="bg-purple-500/20 p-2 rounded-lg">
                                <Calendar className="h-5 w-5 text-purple-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-purple-300 mb-1">🍽️ Catering Events</h4>
                                <p className="text-sm text-gray-300">Extracts venue, date, and timing from WhatsApp group catering announcements and schedules</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl p-4 hover:border-red-400/40 transition-colors">
                            <div className="flex items-start gap-4">
                              <div className="bg-red-500/20 p-2 rounded-lg">
                                <MapPin className="h-5 w-5 text-red-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-red-300 mb-1">📍 Live Media</h4>
                                <p className="text-sm text-gray-300">GPS metadata verification for photos and videos to ensure accurate location data</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tips Section */}
                      <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                          <Shield className="h-5 w-5 text-amber-400" />
                          Important Tips
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <MapIcon className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                              <p className="text-sm text-gray-300">Click event locations to open in Google Maps for easy navigation</p>
                            </div>
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                              <p className="text-sm text-gray-300">Location permission helps show events near you (defaults to Aluva, Kerala)</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <Calendar className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                              <p className="text-sm text-gray-300">Today's events appear first, followed by upcoming ones</p>
                            </div>
                            <div className="flex items-start gap-3">
                              <Shield className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                              <p className="text-sm text-gray-300">At Your Risk: Enjoy free food responsibly and verify details</p>
                            </div>
                          </div>
                        </div>
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
