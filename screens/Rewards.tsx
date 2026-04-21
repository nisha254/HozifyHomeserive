import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Text,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, {
  Rect,
  Circle,
  Path,
  G,
  Ellipse,
  Line,
  Polyline,
} from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 48 - 12) / 2; // 2 cols, 24px side padding, 12px gap

// Scratch card with wavy border rendered in SVG
const ScratchCard = () => (
  <View style={styles.scratchCardWrap}>
    <Svg width={CARD_SIZE} height={CARD_SIZE * 1.1} viewBox="0 0 160 176">
      {/* Wavy/scalloped border background */}
      <Path
        d={wavyBorderPath(160, 176, 12)}
        fill="#9EC8F5"
      />
      {/* Inner card fill */}
      <Path
        d={wavyBorderPath(160, 176, 12)}
        fill="#A8D4F8"
      />
      {/* Confetti dots */}
      <Circle cx="20" cy="28" r="4" fill="#7BB8EE" opacity="0.7" />
      <Circle cx="140" cy="32" r="3" fill="#7BB8EE" opacity="0.6" />
      <Circle cx="30" cy="145" r="4" fill="#7BB8EE" opacity="0.7" />
      <Circle cx="135" cy="148" r="3.5" fill="#7BB8EE" opacity="0.6" />
      <Circle cx="80" cy="18" r="2.5" fill="#7BB8EE" opacity="0.5" />
      <Circle cx="148" cy="90" r="3" fill="#7BB8EE" opacity="0.5" />
      <Circle cx="12" cy="88" r="2.5" fill="#7BB8EE" opacity="0.5" />
      {/* Stars */}
      <Path d="M50 155 l2 6 6 0 -5 4 2 6 -5-4 -5 4 2-6 -5-4 6 0z" fill="#7BB8EE" opacity="0.5" />
      <Path d="M118 22 l1.5 4.5 4.5 0 -3.5 3 1.5 4.5 -4-3 -4 3 1.5-4.5 -3.5-3 4.5 0z" fill="#7BB8EE" opacity="0.5" />
      {/* Squiggles */}
      <Path d="M22 60 q8-8 16 0 q8 8 16 0" stroke="#7BB8EE" strokeWidth="2" fill="none" opacity="0.6" />
      <Path d="M106 150 q8-6 16 0 q8 6 16 0" stroke="#7BB8EE" strokeWidth="2" fill="none" opacity="0.6" />
      <Path d="M22 118 q8-6 16 0" stroke="#7BB8EE" strokeWidth="2" fill="none" opacity="0.5" />
      {/* Gift circle background */}
      <Ellipse cx="80" cy="94" rx="46" ry="50" fill="#6AAEE8" />
      {/* Gift box body */}
      <Rect x="56" y="100" width="48" height="36" rx="3" fill="#2563EB" />
      {/* Gift box lid */}
      <Rect x="52" y="92" width="56" height="14" rx="3" fill="#1D4ED8" />
      {/* Gift ribbon vertical */}
      <Rect x="76" y="92" width="8" height="44" fill="#3B82F6" opacity="0.9" />
      {/* Gift ribbon horizontal */}
      <Rect x="52" y="97" width="56" height="4" fill="#3B82F6" opacity="0.9" />
      {/* Gift bow left loop */}
      <Ellipse cx="72" cy="90" rx="10" ry="7" fill="#60A5FA" transform="rotate(-30 72 90)" />
      {/* Gift bow right loop */}
      <Ellipse cx="88" cy="90" rx="10" ry="7" fill="#60A5FA" transform="rotate(30 88 90)" />
      {/* Gift bow center */}
      <Circle cx="80" cy="91" r="5" fill="#93C5FD" />
      {/* Herringbone lines on gift body */}
      <Line x1="56" y1="110" x2="104" y2="110" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" />
      <Line x1="56" y1="118" x2="104" y2="118" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" />
      <Line x1="56" y1="126" x2="104" y2="126" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" />
    </Svg>
  </View>
);

// Generates a wavy scalloped rectangle path
function wavyBorderPath(w: number, h: number, r: number): string {
  const steps = 8;
  const amp = 7;
  // Top edge
  let d = `M ${r} 0 `;
  for (let i = 0; i <= steps; i++) {
    const x = r + (i * (w - 2 * r)) / steps;
    const y = i % 2 === 0 ? 0 : -amp;
    d += `L ${x} ${y} `;
  }
  // Right edge
  d += `L ${w} ${r} `;
  for (let i = 0; i <= steps; i++) {
    const y = r + (i * (h - 2 * r)) / steps;
    const x = i % 2 === 0 ? w : w + amp;
    d += `L ${x} ${y} `;
  }
  // Bottom edge
  d += `L ${w - r} ${h} `;
  for (let i = 0; i <= steps; i++) {
    const x = w - r - (i * (w - 2 * r)) / steps;
    const y = i % 2 === 0 ? h : h + amp;
    d += `L ${x} ${y} `;
  }
  // Left edge
  d += `L 0 ${h - r} `;
  for (let i = 0; i <= steps; i++) {
    const y = h - r - (i * (h - 2 * r)) / steps;
    const x = i % 2 === 0 ? 0 : -amp;
    d += `L ${x} ${y} `;
  }
  d += 'Z';
  return d;
}

export const RewardsScreen = ({ navigation }: any) => {
  const cards = [0, 1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBBF24" />

      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        {/* Yellow header section */}
        <View style={styles.yellowSection}>
          <SafeAreaView edges={['top']}>
            {/* Header row */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                <MaterialCommunityIcons name="arrow-left" size={26} color="#0F172A" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Rewards</Text>
              <TouchableOpacity style={styles.helpBtn} activeOpacity={0.7}>
                <MaterialCommunityIcons name="help-circle-outline" size={18} color="#334155" />
                <Text style={styles.helpText}>Help</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Decorative gift/coin illustrations in yellow area */}
          <View style={styles.decorRow}>
            <MaterialCommunityIcons name="star-four-points" size={36} color="#F59E0B" style={{ opacity: 0.6 }} />
            <MaterialCommunityIcons name="gift" size={52} color="#F59E0B" style={{ opacity: 0.5 }} />
            <MaterialCommunityIcons name="triangle" size={36} color="#FBBF24" style={{ opacity: 0.5 }} />
            <MaterialCommunityIcons name="star" size={40} color="#F59E0B" style={{ opacity: 0.4 }} />
          </View>
        </View>

        {/* White summary card overlapping yellow */}
        <View style={styles.summaryCardWrap}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Coins</Text>
              <View style={styles.summaryValueRow}>
                <Text style={styles.summaryNum}>0</Text>
                <View style={styles.coinIcon}>
                  <MaterialCommunityIcons name="circle-slice-8" size={20} color="#F59E0B" />
                </View>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Vouchers</Text>
              <Text style={styles.summaryNum}>0</Text>
            </View>
          </View>
        </View>

        {/* Scratch cards grid */}
        <View style={styles.gridSection}>
          <View style={styles.grid}>
            {cards.map((_, i) => (
              <TouchableOpacity key={i} activeOpacity={0.85}>
                <ScratchCard />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },

  yellowSection: {
    backgroundColor: '#FCD34D',
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  helpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  helpText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  decorRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 8,
    height: 70,
  },

  summaryCardWrap: {
    marginTop: -36,
    marginHorizontal: 20,
    zIndex: 10,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
    paddingVertical: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  summaryValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  summaryNum: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
  },
  coinIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
  },

  gridSection: {
    marginTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  scratchCardWrap: {
    width: CARD_SIZE,
    borderRadius: 16,
    overflow: 'hidden',
  },
});