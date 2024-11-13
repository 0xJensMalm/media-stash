// src/config/config.jsx

// Grid Layout Configuration
export const GRID_CONFIG = {


    // Sizing
    maxCardWidth: 'max-w-sm', // maximum width for each card
    containerMaxWidth: 'max-w-7xl', // maximum width for the grid container

    // Spacing & Layout
    gridGap: 4,           // Gap between grid items (Tailwind spacing units)
    cardPadding: 3,       // Padding inside cards
    gridPadding: 6,       // Padding around the entire grid
    
    // Responsive Grid Columns
    gridColumns: {
      sm: 2,  // 640px+
      md: 2,  // 768px+
      lg: 3,  // 1024px+
      xl: 4,  // 1280px+
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
      icon: 'youtube',  // If you want to add platform icons later
    }
  };
  
  // Development Mode Configuration
  export const DEV_CONFIG = {
    defaultVideoCount: 5,
    maxRandomVideos: 20,
    sampleYoutubeVideos: [
      { 
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
        title: 'Never Gonna Give You Up',
        tags: ['Music', 'Classic']
      },
      { 
        url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', 
        title: 'Me at the zoo',
        tags: ['Historic', 'First']
      },
      { 
        url: 'https://www.youtube.com/watch?v=_f_BnneFanM', 
        title: 'Super Mario Odyssey Review',
        tags: ['Gaming', 'Review']
      },
      { 
        url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', 
        title: 'Despacito',
        tags: ['Music', 'Popular']
      },
      { 
        url: 'https://www.youtube.com/watch?v=9bZkp7q19f0', 
        title: 'Gangnam Style',
        tags: ['Music', 'Dance']
      },
      { 
        url: 'https://www.youtube.com/watch?v=1w7OgIMMRc4', 
        title: 'Minecraft Gameplay',
        tags: ['Gaming', 'Tutorial']
      },
      { 
        url: 'https://www.youtube.com/watch?v=8jLOx1hD3_o', 
        title: 'Coding Tutorial',
        tags: ['Programming', 'Education']
      },
      { 
        url: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA', 
        title: 'Python for Beginners',
        tags: ['Programming', 'Tutorial']
      }
    ],
    sampleTags: [
      'Music',
      'Gaming',
      'Programming',
      'Tutorial',
      'Review',
      'Vlog',
      'Education',
      'Entertainment',
      'Tech',
      'Science'
    ],
    sampleFolders: [
      'Favorites',
      'Watch Later',
      'Tutorials',
      'Music Videos',
      'Gaming'
    ]
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
  
  // Generate a random video object for development
  export const generateRandomVideo = () => {
    const { sampleYoutubeVideos, sampleTags } = DEV_CONFIG;
    const randomVideo = sampleYoutubeVideos[Math.floor(Math.random() * sampleYoutubeVideos.length)];
    
    // Get 1-3 random tags
    const randomTags = [...sampleTags]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);
  
    return {
      ...randomVideo,
      tags: randomTags,
      id: Date.now() + Math.random(), // Ensure unique ID
      createdAt: new Date().toISOString()
    };
  };