import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, StatusBar } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Timer, Info } from 'lucide-react-native';
import { Theme } from '../constants/Theme';
import { ScreenHeader } from '../components/ScreenHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { CalendarPicker } from '../components/CalendarPicker';
import { TimeSlotCard } from '../components/TimeSlotCard';

// ─── Slot data with type + optional per-slot timer ────────────────────────────

const MORNING_SLOTS: SlotData[] = [
  { time: '08:00 AM', type: 'available' },
  { time: '09:00 AM', type: 'popular', expiresIn: 420 },
  { time: '10:00 AM', type: 'limited', spotsLeft: 2, expiresIn: 185 },
  { time: '11:00 AM', type: 'booked' },
];

const AFTERNOON_SLOTS: SlotData[] = [
  { time: '12:00 PM', type: 'booked' },
  { time: '01:00 PM', type: 'available' },
  { time: '02:00 PM', type: 'popular', expiresIn: 600 },
  { time: '03:00 PM', type: 'limited', spotsLeft: 1, expiresIn: 90 },
  { time: '04:00 PM', type: 'available' },
];

const EVENING_SLOTS: SlotData[] = [
  { time: '05:00 PM', type: 'available' },
  { time: '06:00 PM', type: 'popular', expiresIn: 310 },
  { time: '07:00 PM', type: 'booked' },
  { time: '08:00 PM', type: 'available' },
];

const GLOBAL_TIMER = 600; // 10 min global hold

// ─── Legend item ──────────────────────────────────────────────────────────────

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

// ─── Screen ───────────────────────────────────────────────────────────────────

export const SlotSelectionScreen = ({ navigation }: any) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState(GLOBAL_TIMER);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) { setIsExpired(true); return; }
    const id = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const urgent = timeLeft <= 120 && !isExpired;

  const renderGroup = (label: string, slots: MORNING_SLOTS) => (
    <View style={styles.slotGroup}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupLabel}>{label}</Text>
        <Text style={styles.groupCount}>
          {slots.filter(s => s.type !== 'booked').length} available
        </Text>
      </View>
      <View style={styles.grid}>
        {slots.map(slot => (
          <TimeSlotCard
            key={slot.time}
            slot={slot}
            selected={selectedSlot === slot.time}
            onPress={() => setSelectedSlot(slot.time)}
          />
        ))}
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.root}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScreenHeader
        title="Select Slot"
        subTitle="Pick a convenient time for your service"
        onBack={() => navigation.goBack()}
      />

      {/* ── Global timer banner ── */}
      <View style={[
        styles.timerBanner,
        isExpired && styles.timerBannerExpired,
        urgent && styles.timerBannerUrgent,
      ]}>
        <View style={styles.timerRow}>
          <Timer
            size={18}
            color={isExpired ? '#DC2626' : urgent ? '#D97706' : Theme.colors.primary}
            strokeWidth={2.5}
          />
          <Text style={[
            styles.timerText,
            isExpired && styles.timerTextExpired,
            urgent && styles.timerTextUrgent,
          ]}>
            {isExpired ? 'Slots have been released' : 'Slots held for'}
          </Text>
        </View>
        <View style={[
          styles.timeCapsule,
          isExpired && styles.timeCapsuleExpired,
          urgent && styles.timeCapsuleUrgent,
        ]}>
          <Text style={[
            styles.timeDigits,
            isExpired && styles.timeDigitsExpired,
            urgent && styles.timeDigitsUrgent,
          ]}>
            {isExpired ? '00:00' : formatTime(timeLeft)}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Calendar ── */}
        <View style={styles.calendarSection}>
          <Text style={styles.sectionTitle}>When should we arrive?</Text>
          <CalendarPicker
            label="Booking Date"
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </View>

        {/* ── Legend ── */}
        <View style={styles.legendRow}>
          <LegendDot color="#22C55E" label="Available" />
          <LegendDot color="#F59E0B" label="Popular" />
          <LegendDot color="#F97316" label="Limited" />
          <LegendDot color="#CBD5E1" label="Booked" />
        </View>

        {/* ── Slot groups ── */}
        <View style={styles.slotsSection}>
          <Text style={styles.sectionTitle}>Pick a time slot</Text>
          {renderGroup('Morning', MORNING_SLOTS)}
          {renderGroup('Afternoon', AFTERNOON_SLOTS)}
          {renderGroup('Evening', EVENING_SLOTS)}
        </View>

        {/* ── Info card ── */}
        <Surface style={styles.guaranteeCard} elevation={0}>
          <Info size={16} color={Theme.colors.primary} strokeWidth={2.5} />
          <Text style={styles.guaranteeText}>
            Experts arrive within a 30-minute window of the selected slot.
            Slots with a timer may expire — book quickly!
          </Text>
        </Surface>
      </ScrollView>

      {/* ── Footer CTA ── */}
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        {selectedSlot && !isExpired && (
          <View style={styles.selectionSummary}>
            <Text style={styles.summaryLabel}>Selected</Text>
            <Text style={styles.summaryValue}>{selectedSlot}</Text>
          </View>
        )}
        <PrimaryButton
          label={isExpired ? 'Refresh Slots' : 'Review Summary'}
          onPress={() => {
            if (isExpired) {
              setTimeLeft(GLOBAL_TIMER);
              setIsExpired(false);
            } else {
              navigation.navigate('BookingSummary');
            }
          }}
          disabled={!isExpired && (!selectedDate || !selectedSlot)}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Theme.colors.background },

  // Global timer banner
  timerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#EFF6FF',
    borderBottomWidth: 1,
    borderBottomColor: '#DBEAFE',
  },
  timerBannerUrgent: { backgroundColor: '#FFFBEB', borderBottomColor: '#FDE68A' },
  timerBannerExpired: { backgroundColor: '#FEF2F2', borderBottomColor: '#FEE2E2' },
  timerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  timerText: { fontSize: 13, fontWeight: '700', color: '#1E40AF' },
  timerTextUrgent: { color: '#B45309' },
  timerTextExpired: { color: '#B91C1C' },
  timeCapsule: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  timeCapsuleUrgent: { borderColor: '#FDE68A' },
  timeCapsuleExpired: { borderColor: '#FECACA' },
  timeDigits: { fontSize: 14, fontWeight: '800', color: Theme.colors.primary, fontVariant: ['tabular-nums'] },
  timeDigitsUrgent: { color: '#D97706' },
  timeDigitsExpired: { color: '#EF4444' },

  scrollContent: { paddingBottom: 120 },

  calendarSection: {
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 20,
    letterSpacing: -0.5,
  },

  // Legend
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, fontWeight: '600', color: '#64748B' },

  slotsSection: { padding: 24 },

  slotGroup: { marginBottom: 28 },
  groupHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  groupLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  groupCount: {
    fontSize: 11,
    fontWeight: '600',
    color: '#22C55E',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },

  guaranteeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    margin: 24,
    marginTop: 0,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  guaranteeText: {
    fontSize: 13,
    color: '#0369A1',
    fontWeight: '600',
    flex: 1,
    lineHeight: 19,
  },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 10,
  },
  selectionSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  summaryLabel: { fontSize: 12, fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 },
  summaryValue: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
});