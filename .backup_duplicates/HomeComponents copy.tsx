import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { Text, Surface, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LayoutGrid } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { Theme } from '../../constants/Theme';
import { CATEGORIES } from '../../constants/Categories';

const { width } = Dimensions.get('window');

export const SectionHeader = ({ title, onSeeAll }: any) => (
  <View style={styles.headerRow}>
    <Text style={styles.headerTitle}>{title}</Text>
    {onSeeAll && (
      <TouchableOpacity onPress={onSeeAll} activeOpacity={0.6}>
        <Text style={styles.viewAllText}>View all</Text>
      </TouchableOpacity>
    )}
  </View>
);

const HERO_BANNERS = [
  {
    id: '1',
    brand: 'InstaHelp',
    title: 'Try at ₹99/hr*',
    sub: '*Valid for first 5 bookings',
    bg: ['#6366F1', '#4338CA'], // Indigo gradient feel
    img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '2',
    brand: 'Premium Care',
    title: 'Professional Salon',
    sub: 'Services at your doorstep',
    bg: ['#F43F5E', '#BE123C'], // Rose gradient
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '3',
    brand: 'Quick Fix',
    title: 'AC & Appliances',
    sub: 'Verified experts in 45 mins',
    bg: ['#0EA5E9', '#0369A1'], // Sky blue
    img: 'https://images.unsplash.com/photo-1621905252507-b354bcadcabc?q=80&w=400&auto=format&fit=crop'
  },
];

export const HeroCarousel = () => {
  const scrollX = useSharedValue(0);

  const renderItem = ({ item }: any) => (
    <View style={styles.heroItem}>
      <Surface style={[styles.heroCard, { backgroundColor: item.bg[0] }]} elevation={0}>
        <View style={styles.heroContent}>
          <Text style={styles.heroBrand}>{item.brand}</Text>
          <Text style={styles.heroMainTitle}>{item.title}</Text>
          <Text style={styles.heroSub}>{item.sub}</Text>
          <TouchableOpacity style={styles.heroBtn}>
            <MaterialCommunityIcons name="arrow-right" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Image source={{ uri: item.img }} style={styles.heroImage} />
      </Surface>
    </View>
  );

  return (
    <View style={styles.heroWrapper}>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={HERO_BANNERS}
        keyExtractor={item => item.id}
        onScroll={(e) => {
          scrollX.value = e.nativeEvent.contentOffset.x;
        }}
        renderItem={renderItem}
      />
      <View style={styles.pagination}>
        {HERO_BANNERS.map((_, i) => {
          const dotStyle = useAnimatedStyle(() => {
            const opacity = interpolate(
              scrollX.value,
              [(i - 1) * width, i * width, (i + 1) * width],
              [0.3, 1, 0.3],
              Extrapolate.CLAMP
            );
            const scale = interpolate(
              scrollX.value,
              [(i - 1) * width, i * width, (i + 1) * width],
              [0.8, 1.2, 0.8],
              Extrapolate.CLAMP
            );
            return { opacity, transform: [{ scale }] };
          });
          return <Animated.View key={i} style={[styles.dot, dotStyle]} />;
        })}
      </View>
    </View>
  );
};

export const FloatingSearchBar = ({ onPress, placeholder }: any) => (
  <View style={styles.searchWrap}>
    <Surface style={styles.searchBar} elevation={0}>
      <TouchableOpacity style={styles.searchBarTouchable} onPress={onPress} activeOpacity={0.9}>
        <MaterialCommunityIcons name="magnify" size={22} color="#64748B" />
        <Text style={styles.searchText}>{placeholder || "Search for services..."}</Text>
      </TouchableOpacity>
    </Surface>
  </View>
);

export const CustomServiceGrid = ({ onNavigate }: any) => {
  const GRID_ITEMS = [
    { title: "Salon &\nSpa", id: '2', icon: 'https://cdn-icons-png.flaticon.com/512/2665/2665038.png' },
    { title: 'Home\nCleaning', id: '1', icon: 'https://cdn-icons-png.flaticon.com/512/2097/2097732.png' },
    { title: 'AC & Appliance\nRepair', id: '5', icon: 'https://cdn-icons-png.flaticon.com/512/910/910114.png', time: '44 mins', sale: true },
    { title: 'Electrician', id: '3', icon: 'https://cdn-icons-png.flaticon.com/512/1904/1904425.png', time: '44 mins' },
    { title: 'Plumber', id: '4', icon: 'https://cdn-icons-png.flaticon.com/512/3201/3201509.png' },
    { title: 'Pest\nControl', id: '6', icon: 'https://cdn-icons-png.flaticon.com/512/2800/2800047.png' },
    { title: 'Agriculture', id: '10', icon: 'https://cdn-icons-png.flaticon.com/512/2816/2816694.png' },
    { title: 'Healthcare', id: '11', icon: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png' },
    { title: 'Automobile', id: '9', icon: 'https://cdn-icons-png.flaticon.com/512/744/744465.png' },
    { title: 'Carpenter', id: '7', icon: 'https://cdn-icons-png.flaticon.com/512/6134/6134704.png' },
    { title: 'Painting &\nMakeover', id: '8', icon: 'https://cdn-icons-png.flaticon.com/512/2972/2972175.png' },
    { title: 'All services', id: 'all', isAllServices: true },
  ];

  return (
    <View style={styles.gridContainer}>
      <View style={styles.modernGrid}>
        {GRID_ITEMS.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.gridItem}
            activeOpacity={0.7}
            onPress={() => onNavigate(item)}
          >
            <View style={styles.gridIconBox}>
              {item.isAllServices ? (
                <LayoutGrid size={32} color="#0F172A" strokeWidth={1.5} />
              ) : (
                <Image source={{ uri: item.icon }} style={styles.gridIcon} />
              )}
              {item.sale && (
                <View style={styles.saleBadge}>
                  <Text style={styles.saleBadgeText}>Sale</Text>
                </View>
              )}
              {item.time && (
                <View style={styles.timeBadge}>
                  <Text style={styles.timeBadgeText}>{item.time}</Text>
                </View>
              )}
            </View>
            <Text style={styles.gridLabel}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 24,
    paddingHorizontal: 24
  },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#0F172A', letterSpacing: -0.5 },
  viewAllText: { fontSize: 14, fontWeight: '800', color: Theme.colors.primary },

  heroWrapper: { width: width, marginBottom: 20 },
  heroItem: { width: width, paddingHorizontal: 20 },
  heroCard: {
    height: 180,
    borderRadius: 24,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 24,
  },
  heroContent: { flex: 1, justifyContent: 'center' },
  heroBrand: { color: '#FFFFFF', fontSize: 15, fontWeight: '800', fontStyle: 'italic', marginBottom: 4 },
  heroMainTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '900', marginBottom: 8 },
  heroSub: { color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: '600' },
  heroBtn: {
    marginTop: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  heroImage: { width: 140, height: 180, position: 'absolute', right: 0, bottom: 0 },

  pagination: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Theme.colors.primary },

  searchWrap: { paddingHorizontal: 24, marginTop: -24, zIndex: 10, marginBottom: 12 },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 56,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  searchBarTouchable: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingHorizontal: 16 },
  searchText: { flex: 1, marginLeft: 12, fontSize: 15, color: '#94A3B8', fontWeight: '500' },

  gridContainer: { paddingHorizontal: 16 },
  modernGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: (width - 48) / 3, alignItems: 'center', marginBottom: 24 },
  gridIconBox: {
    width: '100%',
    aspectRatio: 1.2,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    position: 'relative',
  },
  gridIcon: { width: '90%', height: '90%', resizeMode: 'contain' },
  gridLabel: { fontSize: 13, fontWeight: '500', color: '#1E293B', textAlign: 'center', lineHeight: 18 },
  timeBadge: {
    position: 'absolute',
    bottom: -6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  timeBadgeText: { fontSize: 9, fontWeight: '600', color: '#059669' },
  saleBadge: {
    position: 'absolute',
    top: -6,
    left: 8,
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  saleBadgeText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
});
