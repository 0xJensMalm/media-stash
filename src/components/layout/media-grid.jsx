// src/components/layout/media-grid.jsx
export default function MainContent() {
    // Placeholder data for the grid
    const placeholderItems = Array(12).fill(null).map((_, i) => ({
      id: i,
      title: `Media Item ${i + 1}`,
      type: i % 2 === 0 ? 'video' : 'image'
    }));
  
    return (
      <main className="main-content">
        {/* Current Path/Location */}
        <div className="mb-6 flex items-center space-x-2 text-gray-400">
          <span>All Media</span>
          <span>/</span>
          <span>Custom Folder</span>
        </div>
  
        {/* Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {placeholderItems.map(item => (
            <div 
              key={item.id}
              className="aspect-video bg-dark-primary rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">
                  {item.type === 'video' ? '🎥' : '🖼️'} {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }