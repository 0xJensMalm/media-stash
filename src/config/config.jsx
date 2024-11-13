// src/config/config.jsx

export const GRID_CONFIG = {
    // Spacing
    gridGap: 1, // Tailwind spacing units (1 = 0.25rem)
    cardPadding: 3, // Padding inside cards
    gridPadding: 6, // Padding around the entire grid
    
    // Layout
    gridColumns: {
      sm: 2,  // 640px+
      md: 2,  // 768px+
      lg: 3,  // 1024px+
      xl: 4,  // 1280px+
      '2xl': 5 // 1536px+
    },
    
    // Card
    aspectRatio: 'video', // Use Tailwind's aspect-video class
    titleLines: 1, // Number of lines to show in title
    
    // YouTube
    thumbnailQuality: 'maxresdefault', // Options: default, mqdefault, hqdefault, sddefault, maxresdefault
    
    // Icons
    defaultVideoIconSize: 12, // Size for the default video icon (when no thumbnail)
    
    // Animations
    hoverTransitionDuration: 150, // ms
    
    // Feature flags
    enablePlatformIcons: true, // Show platform-specific icons
  };
  
  export const SUPPORTED_PLATFORMS = {
    YOUTUBE: {
      name: 'YouTube',
      domains: ['youtube.com', 'youtu.be'],
      color: '#FF0000',
    }
  };
  
  // Helper functions for platform detection and URL parsing
  export const getVideoPlatform = (url) => {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.toLowerCase();
      
      return Object.entries(SUPPORTED_PLATFORMS).find(
        ([_, platform]) => platform.domains.some(d => domain.includes(d))
      )?.[0] || null;
    } catch {
      return null;
    }
  };
  
  // YouTube URL parser
  export const getYouTubeID = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com')) {
        return urlObj.searchParams.get('v');
      }
      if (urlObj.hostname.includes('youtu.be')) {
        return urlObj.pathname.slice(1);
      }
      return null;
    } catch {
      return null;
    }
  };
  
  // Get video thumbnail
  export const getVideoThumbnail = (url) => {
    const platform = getVideoPlatform(url);
    if (platform === 'YOUTUBE') {
      const videoId = getYouTubeID(url);
      return videoId 
        ? `https://img.youtube.com/vi/${videoId}/${GRID_CONFIG.thumbnailQuality}.jpg`
        : null;
    }
    return null;
  };