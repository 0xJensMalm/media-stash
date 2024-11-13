// src/components/dev/DevControls.jsx
import { useState } from 'react';
import { useVideo } from '../../context/VideoContext';
import { DEV_CONFIG } from '../../config/config';

export function DevModal({ isOpen, onClose }) {
  const { addVideo, selectedFolder } = useVideo();
  const [videoCount, setVideoCount] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const generateRandomVideos = () => {
    const count = parseInt(videoCount) || 5; // Fallback to 5 if no input
    const { sampleYoutubeVideos, sampleTags } = DEV_CONFIG;
    
    for (let i = 0; i < count; i++) {
      const randomVideo = sampleYoutubeVideos[Math.floor(Math.random() * sampleYoutubeVideos.length)];
      const randomTags = DEV_CONFIG.sampleTags
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-dark-surface rounded-lg w-full max-w-md p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Dev Controls</h2>
        
        <div className="space-y-4">
          <div className="rounded-lg bg-dark-primary p-4">
            <h3 className="text-lg mb-2">Populate with Random Videos</h3>
            {!isAdding ? (
              <button
                onClick={() => setIsAdding(true)}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
              >
                Add Random Videos
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  type="number"
                  value={videoCount}
                  onChange={(e) => setVideoCount(e.target.value)}
                  placeholder="Number of videos (default: 5)"
                  className="flex-1 px-3 py-2 bg-dark-bg rounded border border-gray-700 focus:outline-none focus:border-blue-500"
                  min="1"
                  max="20"
                />
                <button
                  onClick={() => setIsAdding(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <button
                  onClick={generateRandomVideos}
                  className="p-2 text-green-500 hover:text-green-400 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}