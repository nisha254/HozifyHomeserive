import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Path, Polyline } from 'react-native-svg';

export type SlotType = 'available' | 'popular' | 'limited' | 'booked';

export interface SlotData {
    time: string;
    type: SlotType;
    spotsLeft?: number;   // for 'limited'
    expiresIn?: number;   // seconds until slot expires (optional per-slot timer)
}

interface TimeSlotCardProps {
    slot: SlotData;
    selected: boolean;
    onPress: () => void;
}

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
        <View style={[slotTimerStyles.pill, urgent && slotTimerStyles.pillUrgent]}>
            <Svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke={urgent ? '#DC2626' : '#D97706'} strokeWidth={2.5}>
                <Circle cx="12" cy="12" r="10" />
                <Polyline points="12 6 12 12 16 14" />
            </Svg>
            <Text style={[slotTimerStyles.text, urgent && slotTimerStyles.textUrgent]}>{label}</Text>
        </View>
    );
};

const slotTimerStyles = StyleSheet.create({
    pill: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: '#FEF3C7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
    pillUrgent: { backgroundColor: '#FEE2E2' },
    text: { fontSize: 9, fontWeight: '700', color: '#D97706', fontVariant: ['tabular-nums'] },
    textUrgent: { color: '#DC2626' },
});

// ─── Slot config map ──────────────────────────────────────────────────────────

const CONFIG: Record<SlotType, {
    bg: string; border: string; textColor: string;
    badgeBg: string; badgeText: string; badgeLabel: string;
    selectedBg: string; selectedBorder: string;
    checkColor: string;
}> = {
    available: {
        bg: '#F8FAFC', border: '#E2E8F0',
        textColor: '#1E293B',
        badgeBg: '#DCFCE7', badgeText: '#166534', badgeLabel: 'Available',
        selectedBg: '#EFF6FF', selectedBorder: '#3B82F6',
        checkColor: '#3B82F6',
    },
    popular: {
        bg: '#FFFBEB', border: '#FDE68A',
        textColor: '#92400E',
        badgeBg: '#FDE68A', badgeText: '#92400E', badgeLabel: '🔥 Popular',
        selectedBg: '#FEF3C7', selectedBorder: '#F59E0B',
        checkColor: '#F59E0B',
    },
    limited: {
        bg: '#FFF7ED', border: '#FDBA74',
        textColor: '#9A3412',
        badgeBg: '#FED7AA', badgeText: '#9A3412', badgeLabel: '⚡ Limited',
        selectedBg: '#FFEDD5', selectedBorder: '#F97316',
        checkColor: '#F97316',
    },
    booked: {
        bg: '#F1F5F9', border: '#CBD5E1',
        textColor: '#94A3B8',
        badgeBg: '#E2E8F0', badgeText: '#94A3B8', badgeLabel: 'Booked',
        selectedBg: '#F1F5F9', selectedBorder: '#CBD5E1',
        checkColor: '#CBD5E1',
    },
};

// ─── Check icon ───────────────────────────────────────────────────────────────

const CheckIcon = ({ color }: { color: string }) => (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3}>
        <Polyline points="20 6 9 17 4 12" />
    </Svg>
);

// ─── Main component ───────────────────────────────────────────────────────────

export const TimeSlotCard: React.FC<TimeSlotCardProps> = ({ slot, selected, onPress }) => {
    const cfg = CONFIG[slot.type];
    const isBooked = slot.type === 'booked';
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        if (isBooked) return;
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.94, duration: 80, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
        ]).start();
        onPress();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                activeOpacity={isBooked ? 1 : 0.85}
                onPress={handlePress}
                disabled={isBooked}
                style={[
                    styles.card,
                    { backgroundColor: selected ? cfg.selectedBg : cfg.bg, borderColor: selected ? cfg.selectedBorder : cfg.border },
                    selected && styles.cardSelected,
                    isBooked && styles.cardBooked,
                ]}
            >
                {/* Check indicator */}
                <View style={[styles.checkCircle, selected && { backgroundColor: cfg.selectedBorder }]}>
                    {selected && <CheckIcon color="#fff" />}
                </View>

                {/* Time */}
                <Text style={[styles.timeText, { color: cfg.textColor }, isBooked && styles.timeTextBooked]}>
                    {slot.time}
                </Text>

                {/* Bottom row: badge + timer */}
                <View style={styles.bottomRow}>
                    <View style={[styles.badge, { backgroundColor: cfg.badgeBg }]}>
                        <Text style={[styles.badgeText, { color: cfg.badgeText }]}>{cfg.badgeLabel}</Text>
                    </View>

                    {slot.type === 'limited' && slot.spotsLeft !== undefined && (
                        <Text style={styles.spotsText}>{slot.spotsLeft} left</Text>
                    )}
                </View>

                {/* Per-slot countdown timer */}
                {slot.expiresIn !== undefined && !isBooked && (
                    <View style={styles.timerRow}>
                        <SlotTimer seconds={slot.expiresIn} />
                    </View>
                )}

                {/* Strikethrough overlay for booked */}
                {isBooked && <View style={styles.strikeOverlay} />}
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 110,
        borderRadius: 16,
        borderWidth: 1.5,
        padding: 12,
        position: 'relative',
        overflow: 'hidden',
    },
    cardSelected: {
        borderWidth: 2,
    },
    cardBooked: {
        opacity: 0.6,
    },
    checkCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#CBD5E1',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        alignSelf: 'flex-end',
    },
    timeText: {
        fontSize: 14,
        fontWeight: '800',
        marginBottom: 8,
        letterSpacing: -0.3,
    },
    timeTextBooked: {
        textDecorationLine: 'line-through',
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        flexWrap: 'wrap',
    },
    badge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
    spotsText: {
        fontSize: 9,
        fontWeight: '700',
        color: '#F97316',
    },
    timerRow: {
        marginTop: 6,
    },
    strikeOverlay: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: 1.5,
        backgroundColor: '#CBD5E1',
        opacity: 0.6,
    },
});