import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Text } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import { useStore } from '../store/useStore';
import { LoadingDialog } from '../components/LoadingDialog';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Search,
  MapPin,
  Crosshair,
  Navigation,
  CheckCircle2,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const INITIAL_REGION = {
  latitude: 19.076,
  longitude: 72.8777,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export const AreaSelectionScreen = ({ navigation }: any) => {
  const { setLocation } = useStore();
  const [region, setRegion] = useState(INITIAL_REGION);
  const [address, setAddress] = useState('Fetching your location...');
  const [subAddress, setSubAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [pinBounce, setPinBounce] = useState(false);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    handleDetectLocation();
  }, []);

  const handleDetectLocation = async () => {
    setIsDetecting(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setAddress('Location permission denied');
        setSubAddress('Please enable location access in Settings');
        setIsDetecting(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      const newRegion = {
        ...INITIAL_REGION,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 900);
      await reverseGeocode(loc.coords.latitude, loc.coords.longitude);
    } catch (e) {
      setAddress('Unable to detect location');
    } finally {
      setIsDetecting(false);
    }
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const result = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (result.length > 0) {
        const item = result[0];
        const main = [item.name, item.street].filter(Boolean).join(', ');
        const sub = [item.district, item.city, item.postalCode].filter(Boolean).join(', ');
        setAddress(main || 'Current Location');
        setSubAddress(sub || '');
      }
    } catch {
      setAddress('Unable to fetch address');
      setSubAddress('');
    }
  };

  const handleRegionChangeComplete = (newRegion: any) => {
    setRegion(newRegion);
    reverseGeocode(newRegion.latitude, newRegion.longitude);
    setPinBounce(false);
  };

  const handleRegionChange = () => {
    setPinBounce(true);
  };

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLocation({ areaType: 'urban', city: subAddress, area: address });
      navigation.replace('Main');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LoadingDialog visible={loading} />

      {/* ── Map ── */}
      <MapView
        ref={mapRef}
        style={styles.map}
        // provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        onRegionChange={handleRegionChange}
        onRegionChangeComplete={handleRegionChangeComplete}
        mapType="none" // Important to hide the blank grid
        showsUserLocation
        showsMyLocationButton={false}
      >
        <UrlTile
          urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
      </MapView>

      {/* ── Center Pin ── */}
      <View style={styles.pinContainer} pointerEvents="none">
        <View style={[styles.pinWrapper, pinBounce && styles.pinBounce]}>
          <View style={styles.pinTop}>
            <MapPin size={36} color="#3D47B0" strokeWidth={2.5} fill="#3D47B0" />
          </View>
          <View style={styles.pinDot} />
        </View>
      </View>

      {/* ── Top Bar ── */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <ArrowLeft size={22} color="#0F172A" strokeWidth={2.5} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.searchBar} activeOpacity={0.8}>
          <Search size={18} color="#94A3B8" strokeWidth={2} />
          <Text style={styles.searchText}>Search area or locality...</Text>
        </TouchableOpacity>
      </View>

      {/* ── Detect Button ── */}
      <TouchableOpacity style={styles.detectBtn} onPress={handleDetectLocation} activeOpacity={0.85}>
        {isDetecting ? (
          <ActivityIndicator color="#3D47B0" size="small" />
        ) : (
          <Navigation size={20} color="#3D47B0" strokeWidth={2.5} />
        )}
        {!isDetecting && <Text style={styles.detectText}>My Location</Text>}
      </TouchableOpacity>

      {/* ── Bottom Card ── */}
      <View style={styles.bottomCard}>
        <View style={styles.handle} />

        <Text style={styles.cardTitle}>Confirm Your Location</Text>
        <Text style={styles.cardSubtitle}>Move the map to adjust pin position</Text>

        {/* Address Row */}
        <View style={styles.addressRow}>
          <LinearGradient
            colors={['#3D47B0', '#5563D4']}
            style={styles.addressIconBox}
          >
            <MapPin size={20} color="#FFFFFF" strokeWidth={2.5} />
          </LinearGradient>

          <View style={styles.addressTexts}>
            <Text style={styles.addressMain} numberOfLines={1}>{address}</Text>
            {subAddress ? <Text style={styles.addressSub} numberOfLines={1}>{subAddress}</Text> : null}
          </View>

          {isDetecting ? (
            <ActivityIndicator size="small" color="#3D47B0" />
          ) : (
            <View style={styles.liveChip}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live</Text>
            </View>
          )}
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmBtn} onPress={handleContinue} activeOpacity={0.88}>
          <LinearGradient
            colors={['#2D3580', '#3D47B0', '#5563D4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.confirmGradient}
          >
            <CheckCircle2 size={20} color="#FFFFFF" strokeWidth={2.5} />
            <Text style={styles.confirmText}>Confirm & Proceed</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CARD_HEIGHT = 260;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2FF' },
  map: { flex: 1 },

  // ── Pin ──
  pinContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    bottom: CARD_HEIGHT - 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  pinWrapper: {
    alignItems: 'center',
    marginBottom: 4,
  },
  pinBounce: {
    transform: [{ translateY: -6 }],
  },
  pinTop: {
    shadowColor: '#3D47B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  pinDot: {
    width: 8,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(61,71,176,0.25)',
    marginTop: 2,
  },

  // ── Top Bar ──
  topBar: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 8 : 56,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchBar: {
    flex: 1,
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  searchText: { fontSize: 14, color: '#94A3B8', fontWeight: '500' },

  // ── Detect Button ──
  detectBtn: {
    position: 'absolute',
    bottom: CARD_HEIGHT + 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  detectText: { fontSize: 13, fontWeight: '700', color: '#3D47B0' },

  // ── Bottom Card ──
  bottomCard: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: CARD_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    shadowColor: '#1A1F4B',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 12,
  },
  handle: {
    width: 40, height: 4, backgroundColor: '#E2E8F0',
    borderRadius: 4, alignSelf: 'center', marginBottom: 18,
  },
  cardTitle: { fontSize: 18, fontWeight: '900', color: '#1A1F4B', letterSpacing: 0.1 },
  cardSubtitle: { fontSize: 12, color: '#94A3B8', fontWeight: '500', marginTop: 3, marginBottom: 18 },

  // Address
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E8EAFF',
    marginBottom: 16,
    gap: 12,
  },
  addressIconBox: {
    width: 44, height: 44, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
  },
  addressTexts: { flex: 1 },
  addressMain: { fontSize: 14, fontWeight: '800', color: '#1A1F4B', lineHeight: 20 },
  addressSub: { fontSize: 12, color: '#64748B', fontWeight: '500', marginTop: 2 },
  liveChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#ECFDF5', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981' },
  liveText: { fontSize: 11, fontWeight: '700', color: '#10B981' },

  // Confirm
  confirmBtn: { borderRadius: 16, overflow: 'hidden' },
  confirmGradient: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  confirmText: { fontSize: 15, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.4 },
});