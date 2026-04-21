import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  SlidersHorizontal,
  ShoppingCart,
  ArrowRight,
  SearchX,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react-native';
import { ServiceCard } from '../components/ServiceCard';
import { useStore } from '../store/useStore';
import { SERVICES } from '../data/servicesMock';
import { Theme } from '../constants/Theme';
import { ScreenHeader } from '../components/ScreenHeader';

const { width } = Dimensions.get('window');

const SORT_OPTIONS = ['Recommended', 'Price: Low–High', 'Price: High–Low', 'Top Rated'];

export const ServiceListingScreen = ({ navigation, route }: any) => {
  const { subcategory } = route.params;
  const { cart, addToCart, cartTotal } = useStore();
  const [activeSort, setActiveSort] = useState('Recommended');
  const [showSortBar, setShowSortBar] = useState(false);

  const displayServices = SERVICES.slice(0, 8); // Mock limitation

  const renderHeader = () => (
    <View style={styles.listHeaderContainer}>
      {/* ── Guarantee Banner ── */}
      <View style={styles.trustBanner}>
        <View style={styles.trustIconWrap}>
          <ShieldCheck size={22} color="#10B981" strokeWidth={2.5} />
        </View>
        <View style={styles.trustTextWrap}>
          <Text style={styles.trustTitle}>Hozify Safe & Verified</Text>
          <Text style={styles.trustSub}>Background checked professionals</Text>
        </View>
      </View>

      <View style={styles.activeFilterRow}>
        <Text style={styles.activeFilterTitle}>Showing Services</Text>
        <View style={styles.activeFilterPill}>
          <Text style={styles.activeFilterText}>Sorted: {activeSort}</Text>
        </View>
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

      {/* ── Header ──────────────────────────────────────── */}
      <ScreenHeader
        title={subcategory?.title || 'Services'}
        subTitle={`${displayServices.length} expert services available`}
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity
            style={[styles.filterBtn, showSortBar && styles.filterBtnActive]}
            onPress={() => setShowSortBar((p) => !p)}
            activeOpacity={0.8}
          >
            <SlidersHorizontal size={20} color={showSortBar ? Theme.colors.brandBlue : Theme.colors.white} strokeWidth={2.5} />
          </TouchableOpacity>
        }
      />

      {/* ── Overlapping Sort Bar ── */}
      {showSortBar && (
        <View style={styles.sortBarWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sortChipsScroll}
          >
            {SORT_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[styles.chip, activeSort === opt && styles.chipActive]}
                onPress={() => { setActiveSort(opt); setShowSortBar(false); }}
                activeOpacity={0.85}
              >
                {activeSort === opt && <CheckCircle2 size={14} color="#3D47B0" strokeWidth={3} style={{ marginRight: 4 }} />}
                <Text style={[styles.chipText, activeSort === opt && styles.chipTextActive]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* ── List ── */}
      <FlatList
        data={displayServices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop: showSortBar ? 48 : 16 },
          cart.length > 0 && { paddingBottom: 130 }
        ]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <SearchX size={44} color="#94A3B8" strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyTitle}>No services found</Text>
            <Text style={styles.emptySub}>Try adjusting your filters or search.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ServiceCard
              name={item.name}
              price={item.price}
              originalPrice={item.originalPrice}
              rating={item.rating || 4.5}
              ratingCount={item.ratingCount || '100'}
              image={item.image}
              duration={item.duration || '1 hr'}
              onPress={() => navigation.navigate('ServiceDetail', { subcategory: item })}
              onAdd={() => addToCart(item)}
              added={cart.some((c) => c.id === item.id)}
            />
          </View>
        )}
      />

      {/* ── Floating Cart Bar ── */}
      {cart.length > 0 && (
        <View style={styles.floatingCartWrap}>
          <TouchableOpacity
            style={styles.floatingCartPill}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Cart')}
          >
            <LinearGradient
              colors={['#2D3580', '#4F46E5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cartGradient}
            >
              <View style={styles.cartLeft}>
                <View style={styles.cartCountCircle}>
                  <Text style={styles.cartCountNum}>{cart.length}</Text>
                </View>
                <View style={styles.cartTextData}>
                  <Text style={styles.cartTotalLabel}>Total Estimate</Text>
                  <Text style={styles.cartTotalValue}>₹{cartTotal()}</Text>
                </View>
              </View>

              <View style={styles.cartRight}>
                <Text style={styles.cartBtnText}>View Cart</Text>
                <View style={styles.cartArrowWrap}>
                  <ArrowRight size={16} color="#4F46E5" strokeWidth={3} />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Theme.colors.background },

  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBtnActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },

  // ── Overlapping Sort Bar ──
  sortBarWrapper: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 145 : 125, // Adjusted for ScreenHeader height
    left: 0,
    right: 0,
    zIndex: 10,
  },
  sortChipsScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  chipActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#3D47B0',
  },
  chipText: {
    ...Theme.typography.presets.caption,
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  chipTextActive: {
    color: '#3D47B0',
  },

  // ── List & Header Components ──
  listContent: {
    paddingHorizontal: 0,
    paddingBottom: 40,
  },
  listHeaderContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    marginBottom: 20,
  },
  trustIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  trustTextWrap: { flex: 1 },
  trustTitle: { ...Theme.typography.presets.bodySm, fontWeight: '800', color: '#065F46', marginBottom: 2 },
  trustSub: { ...Theme.typography.presets.caption, fontWeight: '600', color: '#059669' },

  activeFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  activeFilterTitle: {
    ...Theme.typography.presets.category,
    color: '#0F172A',
  },
  activeFilterPill: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  activeFilterText: {
    ...Theme.typography.presets.tiny,
    fontSize: 11,
    color: '#475569',
    textTransform: 'uppercase',
  },

  cardWrapper: {
    marginBottom: 4,
  },

  // ── Empty State ──
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: { ...Theme.typography.presets.h4, color: '#334155', marginBottom: 8 },
  emptySub: { fontSize: 14, fontWeight: '500', color: '#64748B' },

  // ── Floating Cart Bar ──
  floatingCartWrap: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 24,
    left: 20,
    right: 20,
    zIndex: 50,
  },
  floatingCartPill: {
    shadowColor: '#3D47B0',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 16,
    borderRadius: 24,
    overflow: 'hidden',
  },
  cartGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  cartLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartCountCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountNum: {
    ...Theme.typography.presets.body,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  cartTextData: {
    justifyContent: 'center',
  },
  cartTotalLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  cartTotalValue: {
    ...Theme.typography.presets.h4,
    color: '#FFFFFF',
  },
  cartRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cartBtnText: {
    ...Theme.typography.presets.bodySm,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  cartArrowWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});