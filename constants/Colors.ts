export const Colors = {
  primary: '#003B95',
  primaryLight: '#E6EFFF',
  primaryDark: '#002570',

  loginGradientStart: '#89CFF0',
  loginGradientMid: '#B8E896',
  loginGradientEnd: '#FFFFFF',
  loginSheetBg: '#FFFFFF',

  background: '#F8FAFC',
  surface: '#FFFFFF',

  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textOnPrimary: '#FFFFFF',

  border: '#E2E8F0',
  divider: '#CBD5E1',

  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  helpBtnBg: '#FF6B35',       // orange-coral (screenshot se match)
  helpBtnText: '#FFFFFF',     // white text
  inputBorder: '#CBD5E1',
  inputText: '#1E293B',
  placeholder: '#CBD5E1',
  linkText: '#003B95',
  disabledOpacity: 0.45,

  shadowColor: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0,0,0,0.4)',
  glass: 'rgba(255,255,255,0.7)',
} as const;

export type ColorKey = keyof typeof Colors;