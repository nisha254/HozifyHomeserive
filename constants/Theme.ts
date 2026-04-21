import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive helper functions
const wp = (percentage: number) => {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(value);
};

const hp = (percentage: number) => {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(value);
};

export const Theme = {
  colors: {
    // ── Core Brand ────────────────────────────────────────
    primary: '#1706A2',       // Default brand blue (old)
    brandBlue: '#1B3E6F',     // Main brand blue used across screens
    brandBlueLight: '#EEF2FF',// Light tint of brand blue
    primaryLight: '#E6EFFF',
    urbanPurple: '#673AB7',
    secondary: '#0F172A',
    accent: '#0047AB',
    orange: '#EA580C',        // CTA / Accent colour (Required text)
    gold: '#F5A623',          // Coins / rewards colour
    white: '#FFFFFF',
    transparent: 'transparent',
    overlay: 'rgba(0, 0, 0, 0.45)',

    // ── Calendar / Misc ───────────────────────────────────
    calendarAccent: '#FFC107',

    // ── Backgrounds ───────────────────────────────────────
    background: '#F8FAFC',
    backgroundAlt: '#EEF2F7', // Slightly deeper off-white
    surface: '#FFFFFF',

    // ── Text ──────────────────────────────────────────────
    text: {
      primary: '#0F172A',
      secondary: '#64748B',
      muted: '#94A3B8',
      onPrimary: '#FFFFFF',
    },

    // ── Icon defaults ─────────────────────────────────────
    iconGray: '#64748B',      // Default icon colour

    // ── Status ────────────────────────────────────────────
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },

    // ── Borders & Glass ───────────────────────────────────
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    glass: 'rgba(255, 255, 255, 0.7)',
    glassDark: 'rgba(15, 23, 42, 0.05)',
  },

  layout: {
    window: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    },
    isSmallDevice: SCREEN_WIDTH < 375,
    hp,
    wp,
  },

  geometry: {
    radius: {
      xs: 6,
      sm: 10,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
      full: 9999,
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 40,
    },
  },

  shadows: {
    soft: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    },
    heavy: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 8,
    },
  },

  animation: {
    spring: {
      damping: 20,
      stiffness: 150,
      mass: 0.8,
    },
    stagger: 0.1,
    scaleOnPress: 0.96,
  },

  typography: {
    // Basic Scale
    size: {
      tiny: 10,
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      huge: 32,
    },
    // Standard Weights
    weight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      black: '900',
    },
    // Common Presets (Handy for quick styling)
    presets: {
      h1: {
        fontSize: 32,
        fontWeight: '900',
        letterSpacing: -0.5,
      },
      h2: {
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: -0.3,
      },
      h3: {
        fontSize: 20,
        fontWeight: '700',
      },
      h4: {
        fontSize: 18,
        fontWeight: '700',
      },
      category: {
        fontSize: 17,
        fontWeight: '900',
      },
      body: {
        fontSize: 16,
        fontWeight: '500',
      },
      bodySm: {
        fontSize: 14,
        fontWeight: '500',
      },
      caption: {
        fontSize: 12,
        fontWeight: '500',
      },
      label: {
        fontSize: 11,
        fontWeight: '700',
        lineHeight: 15,
      },
      tiny: {
        fontSize: 9,
        fontWeight: '700',
      }
    }
  }
};
