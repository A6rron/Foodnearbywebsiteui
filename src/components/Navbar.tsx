import { Button } from "./ui/button";

export function Navbar() {
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
            className="bg-white text-gray-900 hover:bg-gray-100 rounded-full"
          >
            <a href="#add-event">
              Add Event
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
