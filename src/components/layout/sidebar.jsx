// src/components/layout/sidebar.jsx
import { useState } from 'react';
import { useVideo } from '../../context/VideoContext';
import { AddVideoModal } from '../modals/AddVideoModal';

export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { folders, videos } = useVideo();

  // Calculate video count for each folder
  const getFolderCount = (folderName) => {
    if (folderName === 'All') {
      return videos.length;
    }
    return videos.filter(video => video.folder === folderName).length;
  };

  // Get all unique tags from videos
  const getAllTags = () => {
    const tagSet = new Set();
    videos.forEach(video => {
      video.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  };

  return (
    <>
      <aside className="bg-dark-surface w-64 fixed left-0 top-16 bottom-0 z-40 overflow-y-auto border-r border-gray-700">
        <div className="flex flex-col h-full">
          {/* Add Video Section */}
          <div className="p-4 border-b border-gray-700">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Add Video
            </button>
          </div>

          {/* Folders Section */}
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold mb-3">Folders</h2>
            <div className="space-y-2">
              {folders.map(folder => (
                <div 
                  key={folder}
                  className="p-2 hover:bg-dark-primary rounded cursor-pointer flex items-center justify-between group"
                >
                  <span className="group-hover:text-white transition-colors">
                    {folder}
                  </span>
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {getFolderCount(folder)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags Section */}
          <div className="p-4 flex-1">
            <h2 className="text-lg font-semibold mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {getAllTags().map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-dark-primary rounded-full text-sm cursor-pointer hover:bg-gray-700 transition-colors flex items-center space-x-1"
                >
                  <span>{tag}</span>
                  <span className="text-xs text-gray-400">
                    {videos.filter(v => v.tags?.includes(tag)).length}
                  </span>
                </span>
              ))}
              {getAllTags().length === 0 && (
                <span className="text-sm text-gray-400">
                  No tags yet
                </span>
              )}
            </div>
          </div>
        </div>
      </aside>

      <AddVideoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}