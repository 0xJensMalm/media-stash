// src/components/layout/navbar.jsx
export default function Navbar() {
    return (
      <nav className="bg-dark-surface h-16 fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Media Stash</h1>
        </div>
        
        <div className="flex items-center flex-1 max-w-2xl mx-6">
          <div className="w-full flex space-x-4">
            <input 
              type="text" 
              placeholder="Search media..."
              className="w-full px-4 py-2 bg-dark-primary rounded-lg border border-gray-700 focus:outline-none focus:border-gray-500"
            />
          </div>
        </div>
  
        <div className="flex items-center space-x-4">
          <div className="flex flex-wrap gap-2">
            {/* Placeholder for active filters/tags */}
            <span className="px-3 py-1 text-sm bg-dark-primary rounded-full border border-gray-700">
              Filter 1
            </span>
            <span className="px-3 py-1 text-sm bg-dark-primary rounded-full border border-gray-700">
              Tag 1
            </span>
          </div>
        </div>
      </nav>
    );
  }
  