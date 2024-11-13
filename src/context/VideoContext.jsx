// src/context/VideoContext.jsx
import { createContext, useContext, useState } from 'react';

const VideoContext = createContext(null);

const initialFolders = ['All', 'Cats'];

export function VideoProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [folders] = useState(initialFolders);
  const [selectedFolder, setSelectedFolder] = useState('All');

  const addVideo = (videoData) => {
    const newVideo = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...videoData
    };
    setVideos(prev => [...prev, newVideo]);
  };

  return (
    <VideoContext.Provider value={{ 
      videos, 
      folders, 
      selectedFolder,
      setSelectedFolder,
      addVideo 
    }}>
      {children}
    </VideoContext.Provider>
  );
}

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};