// Responsive Design System
// Screen size breakpoints and utilities for mobile, tablet, and desktop

export const SCREEN_SIZES = {
  // Small - Mobile phones (320px - 639px)
  S: {
    breakpoint: 320,
    name: 'small',
    fontSize: {
      h1: 'text-[20px] sm:text-[24px]',
      h2: 'text-[18px] sm:text-[22px]',
      h3: 'text-[16px] sm:text-[20px]',
      body: 'text-[14px] sm:text-[16px]',
      small: 'text-[12px] sm:text-[14px]',
    },
    padding: {
      container: 'px-4 sm:px-6',
      section: 'py-8 sm:py-12',
      card: 'p-4 sm:p-6',
    },
    gap: {
      xs: 'gap-2',
      sm: 'gap-3',
      md: 'gap-4',
    },
    height: {
      hero: 'h-[100vh] sm:h-[100vh]',
      section: 'min-h-[100dvh] sm:min-h-screen',
    },
  },

  // Medium - Tablets (640px - 1023px)
  M: {
    breakpoint: 640,
    name: 'medium',
    fontSize: {
      h1: 'md:text-[32px] lg:text-[48px]',
      h2: 'md:text-[24px] lg:text-[32px]',
      h3: 'md:text-[20px] lg:text-[24px]',
      body: 'md:text-[16px] lg:text-[18px]',
      small: 'md:text-[14px] lg:text-[16px]',
    },
    padding: {
      container: 'md:px-8 lg:px-12',
      section: 'md:py-14 lg:py-20',
      card: 'md:p-6 lg:p-8',
    },
    gap: {
      xs: 'md:gap-4',
      sm: 'md:gap-6',
      md: 'md:gap-8',
    },
    height: {
      hero: 'md:h-[100vh]',
      section: 'md:min-h-screen',
    },
  },

  // Large - Desktops (1024px - 1535px)
  L: {
    breakpoint: 1024,
    name: 'large',
    fontSize: {
      h1: 'lg:text-[64px]',
      h2: 'lg:text-[40px]',
      h3: 'lg:text-[28px]',
      body: 'lg:text-[18px]',
      small: 'lg:text-[16px]',
    },
    padding: {
      container: 'lg:px-16',
      section: 'lg:py-24',
      card: 'lg:p-8',
    },
    gap: {
      xs: 'lg:gap-6',
      sm: 'lg:gap-8',
      md: 'lg:gap-12',
    },
    height: {
      hero: 'lg:h-[100vh]',
      section: 'lg:min-h-screen',
    },
  },

  // Extra Large - Large Desktops (1536px+)
  XL: {
    breakpoint: 1536,
    name: 'extra-large',
    fontSize: {
      h1: 'xl:text-[80px]',
      h2: 'xl:text-[56px]',
      h3: 'xl:text-[32px]',
      body: 'xl:text-[20px]',
      small: 'xl:text-[18px]',
    },
    padding: {
      container: 'xl:px-24',
      section: 'xl:py-32',
      card: 'xl:p-12',
    },
    gap: {
      xs: 'xl:gap-8',
      sm: 'xl:gap-10',
      md: 'xl:gap-16',
    },
    height: {
      hero: 'xl:h-[100vh]',
      section: 'xl:min-h-screen',
    },
  },
} as const;

// Helper function to get responsive classes
export const getResponsiveClass = (
  small: string,
  medium: string,
  large: string,
  extraLarge: string
): string => {
  return `${small} ${medium} ${large} ${extraLarge}`;
};

// Export combined responsive classes for common patterns
export const RESPONSIVE_CLASSES = {
  heroTitle: 'text-[20px] sm:text-[28px] md:text-[48px] lg:text-[64px] xl:text-[80px]',
  sectionTitle: 'text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px] xl:text-[56px]',
  cardTitle: 'text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[28px]',
  bodyText: 'text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px]',
  smallText: 'text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[18px]',
  
  containerPadding: 'px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24',
  sectionPadding: 'py-8 sm:py-10 md:py-14 lg:py-20 xl:py-32',
  cardPadding: 'p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12',
  
  gridGap: 'gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-12',
} as const;

// Get current screen size
export const getCurrentScreenSize = (): keyof typeof SCREEN_SIZES | null => {
  if (typeof window === 'undefined') return null;
  
  const width = window.innerWidth;
  
  if (width < 640) return 'S';
  if (width < 1024) return 'M';
  if (width < 1536) return 'L';
  return 'XL';
};

export default SCREEN_SIZES;
