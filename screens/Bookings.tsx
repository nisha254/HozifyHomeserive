import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground
} from 'react-native';
import { Text } from 'react-native-paper';
import {
  Bike,
  Truck,
  ChevronRight,
  HelpCircle,
} from 'lucide-react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { Theme } from '../constants/Theme';

// ── Filter tabs ─────────────────────────────────────────────────────
const FILTERS = ['All', 'Completed', 'Progress', 'Pending', 'Ongoing', 'Cancelled'];

// ── Mock ride data ──────────────────────────────────────────────────
const RIDES = [
  { id: '1', type: 'parcel', address: '22, Musakhedi Main Rd', date: '05 Apr 2026', time: '10:06 PM', price: '₹0.0', status: 'Cancelled' },
  { id: '2', type: 'parcel', address: '22, Musakhedi Main Rd', date: '05 Apr 2026', time: '10:04 PM', price: '₹0.0', status: 'Cancelled' },
  { id: '3', type: 'bike', address: 'OrthoSquare Dental Clinic - Scheme No 140', date: '29 Mar 2026', time: '12:57 PM', price: '₹0.0', status: 'Cancelled' },
  { id: '4', type: 'bike', address: 'OrthoSquare Dental Clinic - Scheme No 140', date: '29 Mar 2026', time: '12:45 PM', price: '₹0.0', status: 'Cancelled' },
  { id: '5', type: 'bike', address: 'OrthoSquare Dental Clinic - Scheme No 140', date: '29 Mar 2026', time: '12:41 PM', price: '₹0.0', status: 'Cancelled' },
  { id: '6', type: 'bike', address: '7-108, Tiruchanoor Rd', date: '08 Apr 2026', time: '11:16 AM', price: '₹19', status: 'Completed' },
];

// ── Vehicle icon helper ─────────────────────────────────────────────
const RideIcon = ({ type }: { type: string }) => {
  if (type === 'parcel') {
    return <Truck size={26} color={Theme.colors.text.secondary} strokeWidth={1.5} />;
  }
  return <Bike size={26} color={Theme.colors.text.secondary} strokeWidth={1.5} />;
};

export const BookingsScreen = ({ navigation }: any) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? RIDES
    : RIDES.filter(r => r.status.toLowerCase() === activeFilter.toLowerCase());

  return (
    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />


      {/* ── Header ─────────────────────────────────────────── */}
      <ScreenHeader
        title="Booking History"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Filter chips ────────────────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map(f => {
            const active = activeFilter === f;
            return (
              <TouchableOpacity
                key={f}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setActiveFilter(f)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{f}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── Ride list ───────────────────────────────────── */}
        <View style={styles.listCard}>
          {filtered.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No rides found</Text>
            </View>
          ) : (
            filtered.map((ride, index) => (
              <View key={ride.id}>
                <TouchableOpacity
                  style={styles.rideRow}
                  activeOpacity={0.6}
                  onPress={() => { }}
                >
                  {/* Vehicle icon */}
                  <View style={styles.rideIconWrap}>
                    <RideIcon type={ride.type} />
                  </View>

                  {/* Info */}
                  <View style={styles.rideInfo}>
                    <Text style={styles.rideAddress} numberOfLines={2}>
                      {ride.address}
                    </Text>
                    <Text style={styles.rideMeta}>
                      {ride.date}  •  {ride.time}
                    </Text>
                    <Text style={styles.rideStatus}>
                      {ride.price}  •  {ride.status}
                    </Text>
                  </View>

                  <ChevronRight size={20} color={Theme.colors.text.muted} strokeWidth={2.5} />
                </TouchableOpacity>

                {/* Divider between rows */}
                {index < filtered.length - 1 && <View style={styles.divider} />}
              </View>
            ))
          )}
        </View>

        {/* ── Older rides banner ──────────────────────────── */}
        <View style={styles.olderCard}>
          <View style={styles.olderRow}>
            <HelpCircle size={22} color={Theme.colors.text.secondary} strokeWidth={1.6} />
            <Text style={styles.olderText}>Looking for bookings older than 90 days?</Text>
          </View>
          <TouchableOpacity style={styles.requestBtn} activeOpacity={0.8}>
            <Text style={styles.requestBtnText}>Request Booking History</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  scrollContent: { paddingBottom: 48 },

  /* Filter chips */
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.surface,
  },
  chipActive: {
    backgroundColor: Theme.colors.brandBlue,
    borderColor: Theme.colors.brandBlue,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.text.secondary,
  },
  chipTextActive: {
    color: Theme.colors.white,
    fontWeight: '700',
  },

  /* Ride list — flat, no outer card bg needed */
  listCard: {
    // backgroundColor: '#FFFFFF',
  },

  rideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 16,
  },
  rideIconWrap: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rideInfo: { flex: 1 },
  rideAddress: {
    fontSize: 15,
    fontWeight: '800',
    color: Theme.colors.text.primary,
    marginBottom: 4,
    lineHeight: 20,
  },
  rideMeta: {
    fontSize: 13,
    color: Theme.colors.text.secondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  rideStatus: {
    fontSize: 13,
    color: Theme.colors.text.secondary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    // backgroundColor: '#F1F5F9',
    marginHorizontal: 20,
  },

  /* Empty state */
  emptyBox: { paddingVertical: 60, alignItems: 'center' },
  emptyText: { fontSize: 16, color: Theme.colors.text.muted, fontWeight: '600' },

  /* Older rides card */
  olderCard: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: Theme.colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Theme.colors.borderLight,
    padding: 20,
    gap: 16,
  },
  olderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  olderText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: Theme.colors.text.primary,
  },
  requestBtn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.surface,
  },
  requestBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.text.primary,
  },
});