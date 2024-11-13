// src/components/dev/DevControls.jsx
import { useState, useEffect } from 'react';
import { useVideo } from '../../context/VideoContext';
import { DEV_CONFIG } from '../../config/config';

export function DevModal({ isOpen, onClose }) {
  const { addVideo, selectedFolder } = useVideo();
  const [videoCount, setVideoCount] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [sampleData, setSampleData] = useState(null);

  useEffect(() => {
    if (isOpen && !sampleData) {
      fetch('/src/config/yt_urls.json')
        .then(response => response.json())
        .then(data => setSampleData(data))
        .catch(error => console.error('Error loading sample data:', error));
    }
  }, [isOpen]);

  const generateRandomVideos = () => {
    if (!sampleData) return;

    const count = parseInt(videoCount) || DEV_CONFIG.defaultVideoCount;
    const maxVideos = Math.min(count, DEV_CONFIG.maxRandomVideos);
    
    for (let i = 0; i < maxVideos; i++) {
      const randomVideo = sampleData.videos[Math.floor(Math.random() * sampleData.videos.length)];
      const randomTags = sampleData.sampleTags
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 1);
      
      addVideo({
        url: randomVideo.url,
        title: randomVideo.title,
        folder: selectedFolder,
        tags: randomTags
      });
    }
    
    setIsAdding(false);
    setVideoCount('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-dark-surface rounded-xl w-full max-w-xl p-6 shadow-2xl border border-gray-800">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">Dev Controls</h2>
          <p className="text-gray-400 mt-1">Development tools and utilities</p>
        </div>
        
        {/* Content */}
        <div className="space-y-6">
          {/* Random Videos Section */}
          <div className="bg-dark-primary rounded-lg overflow-hidden border border-gray-800">
            {/* Section Header */}
            <div className="p-4 border-b border-gray-800 bg-dark-primary/50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">Random Videos</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Populate the current folder with sample YouTube videos
                  </p>
                </div>
                {/* Status Indicator */}
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                  Ready
                </span>
              </div>
            </div>

            {/* Section Content */}
            <div className="p-4">
              {!isAdding ? (
                <button
                  onClick={() => setIsAdding(true)}
                  className="w-full py-2.5 px-4 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-lg transition-colors border border-blue-500/30 hover:border-blue-500/50 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Random Videos
                </button>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={videoCount}
                      onChange={(e) => setVideoCount(e.target.value)}
                      placeholder={`Number of videos (max: ${DEV_CONFIG.maxRandomVideos})`}
                      className="w-full px-4 py-2.5 bg-dark-bg rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 text-gray-200 placeholder-gray-500"
                      min="1"
                      max={DEV_CONFIG.maxRandomVideos}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                      videos
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAdding(false)}
                    className="p-2.5 text-gray-400 hover:text-gray-300 bg-dark-bg rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                    title="Cancel"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button
                    onClick={generateRandomVideos}
                    className="p-2.5 text-emerald-400 hover:text-emerald-300 bg-dark-bg rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                    disabled={!sampleData}
                    title="Confirm"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6 pt-6 border-t border-gray-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>Close</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}