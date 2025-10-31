import { Button } from "./ui/button";

export function Navbar() {
  const phoneNumber = '917304483935' // country code +91 and number without + or spaces
  const message = `Add Event Format:\nPlease fill in the details to add food events.\n1. Event Name:\n2. Date and Time:\n3. Location:\n4. Map Link:\n5. Category (e.g., Wedding Ceremony, Temple Feast):`
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

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

          <Button
            asChild
            className="bg-gray-800 text-white hover:bg-gray-700 rounded-full border border-gray-600"
          >
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              Add Event
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
