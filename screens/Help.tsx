import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ImageBackground,
} from 'react-native';
import { Text } from 'react-native-paper';
import {
  Ticket,
  Truck,
  History,
  Search,
  ChevronRight,
} from 'lucide-react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { useStore } from '../store/useStore';
import { Theme } from '../constants/Theme';

// ── Topic rows — emoji icon inside a gray circle ────────────────────
const topics = [
  { id: '1', emoji: '🛵', title: 'Booking related Issues' },
  { id: '2', emoji: '🪖', title: 'Captain and Vehicle related issues' },
  { id: '3', emoji: '💵', title: 'Pass and Payment related Issues' },
  { id: '4', emoji: '📦', title: 'Parcel Related Issues' },
  { id: '5', emoji: '📱', title: 'Other Topics' },
];

export const HelpScreen = ({ navigation }: any) => {
  const { isAuthenticated } = useStore();
  const [search, setSearch] = useState('');

  const filtered = topics.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />


      {/* ── Header ─────────────────────────────────────────── */}
      <ScreenHeader
        title="Help"
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity style={styles.ticketPill} activeOpacity={0.8}>
            <Ticket size={18} color={Theme.colors.text.primary} strokeWidth={1.8} />
            <Text style={styles.ticketText}>Tickets</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Your last ride ──────────────────────────────── */}
        {isAuthenticated && (
          <>
            <Text style={styles.sectionTitle}>Your last Booking</Text>

            <View style={styles.card}>
              {/* Ride row */}
              <View style={styles.rideRow}>
                <View style={styles.rideIconBox}>
                  <Truck size={24} color={Theme.colors.text.secondary} strokeWidth={1.6} />
                </View>
                <View style={styles.rideInfo}>
                  <Text style={styles.rideAddress}>7-108, Tiruchanoor Rd</Text>
                  <Text style={styles.rideMeta}>08 Apr 2026  •  11:16 AM</Text>
                  <Text style={styles.rideStatus}>₹19  •  Completed</Text>
                </View>
              </View>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Full ride history */}
              <TouchableOpacity
                style={styles.historyRow}
                activeOpacity={0.6}
                onPress={() => navigation.navigate('Bookings')}
              >
                <View style={styles.historyLeft}>
                  <History size={20} color={Theme.colors.text.secondary} strokeWidth={1.6} />
                  <Text style={styles.historyText}>Full Booking history</Text>
                </View>
                <ChevronRight size={20} color={Theme.colors.text.muted} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* ── Help topics ─────────────────────────────────── */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Help topics</Text>

        <View style={styles.card}>
          {/* Search bar inside card */}
          <View style={styles.searchRow}>
            <Search size={20} color={Theme.colors.text.secondary} strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Help Topics"
              placeholderTextColor={Theme.colors.text.muted}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* Divider under search */}
          <View style={styles.divider} />

          {/* Topic list */}
          {filtered.map((topic, index) => (
            <View key={topic.id}>
              <TouchableOpacity style={styles.topicRow} activeOpacity={0.6}>
                {/* Emoji inside a gray circle — matches Rapido screenshot */}
                <View style={styles.emojiCircle}>
                  <Text style={styles.emoji}>{topic.emoji}</Text>
                </View>

                <Text style={styles.topicLabel}>{topic.title}</Text>

                <ChevronRight size={20} color={Theme.colors.text.muted} strokeWidth={2.5} />
              </TouchableOpacity>

              {index < filtered.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  ticketPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.surface,
  },
  ticketText: { ...Theme.typography.presets.bodySm, fontWeight: '700', color: Theme.colors.text.primary },

  scrollContent: { padding: 16, paddingBottom: 48 },

  /* Section title */
  sectionTitle: {
    ...Theme.typography.presets.category,
    color: Theme.colors.text.primary,
    marginBottom: 12,
    marginLeft: 2,
  },

  /* White card */
  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Theme.colors.borderLight,
  },

  /* Ride row */
  rideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  rideIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Theme.colors.brandBlueLight,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rideInfo: { flex: 1 },
  rideAddress: { ...Theme.typography.presets.body, fontWeight: '800', color: Theme.colors.text.primary, marginBottom: 4 },
  rideMeta: { fontSize: 13, color: Theme.colors.text.secondary, fontWeight: '500', marginBottom: 3 },
  rideStatus: { fontSize: 13, color: Theme.colors.text.secondary, fontWeight: '700' },

  /* History row */
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  historyLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  historyText: { ...Theme.typography.presets.bodySm, fontWeight: '700', color: Theme.colors.text.primary },

  /* Search bar */
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: Theme.colors.background,
  },
  searchInput: {
    flex: 1,
    ...Theme.typography.presets.bodySm,
    fontWeight: '600',
    color: Theme.colors.text.primary,
  },

  /* Topic row */
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },

  /* Gray circle with emoji — matches the screenshot icons */
  emojiCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.colors.brandBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  emoji: { fontSize: 24 },
  topicLabel: { flex: 1, ...Theme.typography.presets.bodySm, fontWeight: '700', color: Theme.colors.text.primary },

  /* Shared divider */
  divider: { height: 1, backgroundColor: Theme.colors.borderLight },
});