import { Github } from "lucide-react";

const A6rronIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
  >
    <rect x="2" y="2" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M14.5 8.5C13.5 7.5 12 7.5 11 8C10 8.5 9.5 9.5 9.5 10.5C9.5 11 9.7 11.5 10 12C10.5 12.7 11.2 13 12 13C12.5 13 13 12.8 13.5 12.5C14.5 11.8 15 10.8 15 9.8C15 8.5 14.8 8 14.5 8.5ZM12 8C13.5 8 14.8 9 15.3 10.5C15.5 11.2 15.5 12 15.3 12.8C15 13.8 14.3 14.5 13.5 15C12.5 15.5 11.5 15.7 10.5 15.5C9.3 15.3 8.5 14.5 8.2 13.5C8 13 8 12.5 8.2 12C8.5 10.8 9.3 10 10.3 9.5C10.8 9.2 11.4 9 12 9V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 text-gray-400">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>Open Source</span>
          </a>
          <span className="text-gray-600">|</span>
          <a 
            href="https://a6rron.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <A6rronIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
