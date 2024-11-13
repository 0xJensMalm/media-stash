// src/components/layout/media-grid.jsx
import { useVideo } from '../../context/VideoContext';
import { GRID_CONFIG, getVideoThumbnail } from '../../config/config';

export default function MediaGrid() {
  const { videos, selectedFolder } = useVideo();

  const filteredVideos = selectedFolder === 'All' 
    ? videos 
    : videos.filter(video => video.folder === selectedFolder);

  return (
    <main className="main-content mx-auto px-4">
      {/* Header with count */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-400">
          <span>Videos</span>
          <span>/</span>
          <span className="text-white">{selectedFolder}</span>
        </div>
        <div className="text-sm text-gray-400">
          {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'}
        </div>
      </div>

      {/* Video Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredVideos.map(video => (
            <a 
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-dark-primary aspect-square relative hover:ring-1 hover:ring-blue-500 transition-all"
            >
              {/* Thumbnail/Placeholder */}
              {getVideoThumbnail(video.url) ? (
                <img 
                  src={getVideoThumbnail(video.url)}
                  alt={video.title || 'Video thumbnail'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-dark-surface">
                  <svg 
                    className="w-12 h-12 text-gray-500"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}

              {/* Hover Overlay with Title and Tags */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-all flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100">
                {/* Title at the top */}
                <h3 className="text-sm font-medium text-white line-clamp-2">
                  {video.title || 'Untitled Video'}
                </h3>

                {/* Tags at the bottom */}
                {video.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {video.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-0.5 bg-dark-surface bg-opacity-90 text-xs text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      ) : (
        // Empty state
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <svg 
            className="w-16 h-16 mb-4" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-lg font-medium">No videos in this folder</p>
          <p className="text-sm">Click "Add Video" to get started</p>
        </div>
      )}
    </main>
  );
}