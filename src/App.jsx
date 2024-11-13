// src/App.jsx
import Navbar from './components/layout/navbar';
import Sidebar from './components/layout/sidebar';
import MainContent from './components/layout/media-grid';

export default function App() {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <MainContent>
          <h2 className="text-2xl font-bold mb-4">Welcome to Your App</h2>
          <p>Start building your content here!</p>
        </MainContent>
      </div>
    </div>
  );
}