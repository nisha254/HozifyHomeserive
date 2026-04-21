import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Circle, Polyline } from 'react-native-svg';
import { Theme } from '../constants/Theme';

const { width } = Dimensions.get('window');

// ─── Types ────────────────────────────────────────────────────────────────────

export type SlotType = 'available' | 'popular' | 'limited' | 'booked';

export interface SlotData {
  time: string;
  type: SlotType;
  spotsLeft?: number;  // for 'limited' — shows "2 left"
  expiresIn?: number;  // seconds — shows live countdown inside card
}

interface TimeSlotCardProps {
  slot: SlotData;
  selected: boolean;
  onPress: () => void;
}

// ─── Slot visual config ───────────────────────────────────────────────────────

const CONFIG: Record<SlotType, {
  bg: string;
  border: string;
  textColor: string;
  selectedBg: string;
  selectedBorder: string;
  badge: { bg: string; text: string; label: string } | null;
}> = {
  available: {
    bg: '#FFFFFF',
    border: '#E2E8F0',
    textColor: '#475569',
    selectedBg: Theme.colors.primary,
    selectedBorder: Theme.colors.primary,
    badge: null,
  },
  popular: {
    bg: '#FFFBEB',
    border: '#FDE68A',
    textColor: '#92400E',
    selectedBg: '#F59E0B',
    selectedBorder: '#F59E0B',
    badge: { bg: '#FDE68A', text: '#92400E', label: '🔥 Popular' },
  },
  limited: {
    bg: '#FFF7ED',
    border: '#FDBA74',
    textColor: '#9A3412',
    selectedBg: '#F97316',
    selectedBorder: '#F97316',
    badge: { bg: '#FED7AA', text: '#9A3412', label: '⚡ Limited' },
  },
  booked: {
    bg: '#F1F5F9',
    border: '#CBD5E1',
    textColor: '#94A3B8',
    selectedBg: '#F1F5F9',
    selectedBorder: '#CBD5E1',
    badge: { bg: '#E2E8F0', text: '#94A3B8', label: 'Booked' },
  },
};

// ─── Per-slot countdown ───────────────────────────────────────────────────────

const SlotTimer = ({ seconds }: { seconds: number }) => {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (left <= 0) return;
    const id = setInterval(() => setLeft(p => p - 1), 1000);
    return () => clearInterval(id);
  }, [left]);

  const mins = Math.floor(left / 60);
  const secs = left % 60;
  const label = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const urgent = left <= 60;

  return (
    <View style={[timerStyles.pill, urgent && timerStyles.pillUrgent]}>
      <Svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke={urgent ? '#DC2626' : '#D97706'} strokeWidth={2.5}>
        <Circle cx="12" cy="12" r="10" />
        <Polyline points="12 6 12 12 16 14" />
      </Svg>
      <Text style={[timerStyles.text, urgent && timerStyles.textUrgent]}>{label}</Text>
    </View>
  );
};

const timerStyles = StyleSheet.create({
  pill: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: '#FEF3C7', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 6, alignSelf: 'flex-start' },
  pillUrgent: { backgroundColor: '#FEE2E2' },
  text: { fontSize: 9, fontWeight: '700', color: '#D97706', fontVariant: ['tabular-nums'] },
  textUrgent: { color: '#DC2626' },
});

// ─── Animated Surface ─────────────────────────────────────────────────────────

const AnimatedSurface = Animated.createAnimatedComponent(Surface);

// ─── Main component ───────────────────────────────────────────────────────────

export const TimeSlotCard = ({ slot, selected, onPress }: TimeSlotCardProps) => {
  const cfg = CONFIG[slot.type];
  const isBooked = slot.type === 'booked';
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => { if (!isBooked) scale.value = withSpring(0.93, { damping: 12 }); };
  const handlePressOut = () => { scale.value = withSpring(1, { damping: 12 }); };

  const hasBadge = cfg.badge !== null;
  const hasTimer = slot.expiresIn !== undefined && !isBooked;
  const hasSpots = slot.type === 'limited' && slot.spotsLeft !== undefined;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={isBooked ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isBooked}
      style={styles.wrapper}
    >
      <AnimatedSurface
        style={[
          styles.container,
          {
            backgroundColor: selected ? cfg.selectedBg : cfg.bg,
            borderColor: selected ? cfg.selectedBorder : cfg.border,
          },
          selected && styles.selectedContainer,
          isBooked && styles.bookedContainer,
          animatedStyle,
        ]}
        elevation={selected ? 4 : 0}
      >
        {/* Time label */}
        <Text
          style={[
            styles.timeText,
            { color: selected ? '#FFFFFF' : cfg.textColor },
            isBooked && styles.timeTextBooked,
          ]}
        >
          {slot.time}
        </Text>

        {/* Badge + spots left — hidden when selected to keep it clean */}
        {(hasBadge || hasSpots) && !selected && (
          <View style={styles.extrasRow}>
            {hasBadge && cfg.badge && (
              <View style={[styles.badge, { backgroundColor: cfg.badge.bg }]}>
                <Text style={[styles.badgeText, { color: cfg.badge.text }]}>
                  {cfg.badge.label}
                </Text>
              </View>
            )}
            {hasSpots && (
              <Text style={styles.spotsText}>{slot.spotsLeft} left</Text>
            )}
          </View>
        )}

        {/* Per-slot countdown — hidden when selected */}
        {hasTimer && !selected && (
          <View style={styles.timerWrap}>
            <SlotTimer seconds={slot.expiresIn!} />
          </View>
        )}

        {/* Booked strikethrough line */}
        {isBooked && <View style={styles.strikeLine} />}
      </AnimatedSurface>
    </TouchableOpacity>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const CARD_WIDTH = (width - 48 - 24) / 3;

const styles = StyleSheet.create({
  wrapper: {
    width: CARD_WIDTH,
    marginBottom: 12,
  },
  container: {
    minHeight: 56,
    borderRadius: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  selectedContainer: {
    borderWidth: 2,
  },
  bookedContainer: {
    opacity: 0.6,
  },

  timeText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  timeTextBooked: {
    textDecorationLine: 'line-through',
  },

  extrasRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  spotsText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#F97316',
  },

  timerWrap: {
    marginTop: 5,
  },

  strikeLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: '#CBD5E1',
    opacity: 0.7,
  },
});