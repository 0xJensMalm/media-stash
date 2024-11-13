// src/components/layout/sidebar.jsx
export default function Sidebar() {
    return (
      <aside className="bg-dark-surface w-64 fixed left-0 top-16 bottom-0 z-40 overflow-y-auto border-r border-gray-700">
        <div className="flex flex-col h-full">
          {/* Add New Media Section */}
          <div className="p-4 border-b border-gray-700">
            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Add New Media
            </button>
          </div>
  
          {/* Folders Section */}
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold mb-3">Folders</h2>
            <div className="space-y-2">
              <div className="p-2 hover:bg-dark-primary rounded cursor-pointer flex items-center justify-between">
                <span>All Media</span>
                <span className="text-sm text-gray-400">324</span>
              </div>
              <div className="p-2 hover:bg-dark-primary rounded cursor-pointer flex items-center justify-between">
                <span>Favorites</span>
                <span className="text-sm text-gray-400">42</span>
              </div>
              <div className="p-2 hover:bg-dark-primary rounded cursor-pointer flex items-center justify-between">
                <span>Custom Folder</span>
                <span className="text-sm text-gray-400">128</span>
              </div>
            </div>
          </div>
  
          {/* Tags Section */}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-dark-primary rounded-full text-sm cursor-pointer hover:bg-gray-700 transition-colors">
                tag1
              </span>
              <span className="px-3 py-1 bg-dark-primary rounded-full text-sm cursor-pointer hover:bg-gray-700 transition-colors">
                tag2
              </span>
              <span className="px-3 py-1 bg-dark-primary rounded-full text-sm cursor-pointer hover:bg-gray-700 transition-colors">
                tag3
              </span>
            </div>
          </div>
        </div>
      </aside>
    );
  }