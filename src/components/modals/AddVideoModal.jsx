// src/components/modals/AddVideoModal.jsx
import { useState } from 'react';
import { useVideo } from '../../context/VideoContext';

export function AddVideoModal({ isOpen, onClose }) {
  const { folders, addVideo } = useVideo();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addVideo({
      url,
      title,
      folder: selectedFolder,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
    });
    onClose();
    // Reset form
    setUrl('');
    setTitle('');
    setSelectedFolder('All');
    setTags('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-dark-surface rounded-lg w-full max-w-md p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Add New Video</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Video URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 bg-dark-primary rounded border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="https://..."
              required
            />
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-dark-primary rounded border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter video title"
              required
            />
          </div>

          {/* Folder Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Folder</label>
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="w-full px-3 py-2 bg-dark-primary rounded border border-gray-700 focus:outline-none focus:border-blue-500"
            >
              {folders.map(folder => (
                <option key={folder} value={folder}>{folder}</option>
              ))}
            </select>
          </div>

          {/* Tags Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 bg-dark-primary rounded border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="funny, cats, gaming"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              Add Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}