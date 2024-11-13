// src/App.jsx
import { VideoProvider } from './context/VideoContext';
import Navbar from './components/layout/navbar';
import Sidebar from './components/layout/sidebar';
import MainContent from './components/layout/media-grid';

export default function App() {
  return (
    <VideoProvider>
      <div className="layout-container">
        <Navbar />
        <div className="flex flex-1 pt-16">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </VideoProvider>
  );
}