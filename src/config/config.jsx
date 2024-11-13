// Grid Layout Configuration
export const GRID_CONFIG = {
    // Spacing & Layout
    gridGap: 4,           // Gap between grid items (Tailwind spacing units)
    cardPadding: 3,       // Padding inside cards
    gridPadding: 6,       // Padding around the entire grid
    
    // Responsive Grid Columns
    gridColumns: {
      sm: 2,  // 640px+
      md: 3,  // 768px+
      lg: 4,  // 1024px+
      xl: 5,  // 1280px+
      '2xl': 5 // 1536px+
    },
    
    // Card Styling
    aspectRatio: 'square',    // Card aspect ratio (square/video)
    titleLines: 2,            // Number of lines to show in title
    cornerRadius: 'lg',       // Card corner radius (Tailwind size)
    
    // Thumbnails
    thumbnailQuality: 'mqdefault',  // YouTube thumbnail quality
                                   // Options: default, mqdefault, hqdefault, sddefault, maxresdefault
    
    // Icons & Visual Elements
    defaultVideoIconSize: 12,  // Size for the default video icon (Tailwind size)
    tagSize: 'xs',            // Size for tag text
    tagPadding: 2,           // Padding for tags
    
    // Animations & Transitions
    hoverTransitionDuration: 150,  // milliseconds
    hoverScale: 'scale-105',      // Hover scale animation
    
    // Colors (can be overridden by theme)
    colors: {
      cardBackground: 'bg-dark-primary',
      cardHoverRing: 'ring-blue-500',
      tagBackground: 'bg-dark-surface',
      tagText: 'text-gray-200',
    },
    
    // Feature Flags
    features: {
      enableHoverEffects: true,
      enableTags: true,
      enablePlatformIcons: true,
      showVideoCount: true,
    }
  };
  
  // Platform Configuration
  export const SUPPORTED_PLATFORMS = {
    YOUTUBE: {
      name: 'YouTube',
      domains: ['youtube.com', 'youtu.be'],
      color: '#FF0000',
      icon: 'youtube',
    }
  };
  
  // Development Mode Configuration
  export const DEV_CONFIG = {
    defaultVideoCount: 5,
    maxRandomVideos: 20
  };
  
  // Helper Functions
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