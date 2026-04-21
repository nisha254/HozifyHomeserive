import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
  Zap,
  CalendarClock,
  Info,
  Tag,
  ShieldCheck,
  ArrowRight,
  PackageX,
} from 'lucide-react-native';
import { useStore } from '../store/useStore';
import { Theme } from '../constants/Theme';
import { ScreenHeader } from '../components/ScreenHeader';

// ─── Types ────────────────────────────────────────────────────────────────────
interface CartItem {
  id: string;
  name: string;
  meta: string;
  price: number;
  quantity: number;
  emoji: string;
  tag?: string;
}

// ─── ServiceCard ──────────────────────────────────────────────────────────────
const ServiceCard = ({
  item,
  onIncrement,
  onDecrement,
}: {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
}) => (
  <View style={styles.serviceCard}>
    <View style={styles.serviceEmoji}>
      <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
    </View>

    <View style={styles.serviceInfo}>
      <View style={styles.serviceNameRow}>
        <Text style={styles.serviceName}>{item.name}</Text>
        {item.tag && (
          <View style={styles.tagPill}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
        )}
      </View>
      <Text style={styles.serviceMeta}>{item.meta}</Text>
      <Text style={styles.servicePrice}>₹{item.price}</Text>
    </View>

    <View style={styles.qtyCtrl}>
      <TouchableOpacity style={styles.qtyBtn} onPress={onDecrement} activeOpacity={0.7}>
        <Minus size={14} color={Theme.colors.text.secondary} strokeWidth={2.5} />
      </TouchableOpacity>
      <Text style={styles.qtyNum}>{item.quantity}</Text>
      <TouchableOpacity style={[styles.qtyBtn, styles.qtyBtnAdd]} onPress={onIncrement} activeOpacity={0.7}>
        <Plus size={14} color={Theme.colors.primary} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  </View>
);

// ─── BookingCard ──────────────────────────────────────────────────────────────
const BookingCard = ({
  type,
  active,
  onPress,
}: {
  type: 'instant' | 'slot';
  active: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.bookingCard, active && styles.bookingCardActive]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={[styles.bookingIconBox, active && styles.bookingIconBoxActive]}>
      {type === 'instant'
        ? <Zap size={18} color={active ? '#FFFFFF' : Theme.colors.text.secondary} strokeWidth={2.5} />
        : <CalendarClock size={18} color={active ? '#FFFFFF' : Theme.colors.text.secondary} strokeWidth={2.5} />
      }
    </View>
    <Text style={[styles.bookingTitle, active && styles.bookingTitleActive]}>
      {type === 'instant' ? 'Instant' : 'Scheduled'}
    </Text>
    <Text style={[styles.bookingSub, active && styles.bookingSubActive]}>
      {type === 'instant'
        ? 'Expert arrives in 30–45 mins'
        : 'Pick a date & time'}
    </Text>
    {active && <View style={styles.bookingActiveDot} />}
  </TouchableOpacity>
);

// ─── Section Label ────────────────────────────────────────────────────────────
const SectionLabel = ({ text }: { text: string }) => (
  <Text style={styles.sectionLabel}>{text}</Text>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
export const CartScreen = ({ navigation }: { navigation: any }) => {
  const { cart, updateQuantity, cartTotal } = useStore();
  const [bookingType, setBookingType] = useState<'instant' | 'slot'>('instant');

  const updateQty = (id: string, delta: number) => {
    const item = cart.find((i: CartItem) => i.id === id);
    if (!item) return;
    updateQuantity(id, Math.max(1, item.quantity + delta));
  };

  const subtotal = cartTotal();
  const convenienceFee = subtotal > 0 ? 5 : 0;
  const taxes = Math.round(subtotal * 0.1);
  const total = subtotal + convenienceFee + taxes;

  // ── Empty ──
  if (cart.length === 0) {
    return (
      <ImageBackground source={require('../assets/RectangleBG.png')} style={styles.root} resizeMode="cover">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <ScreenHeader
          title="My Cart"
          onBack={() => navigation.goBack()}
        />

        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBox}>
            <PackageX size={48} color={Theme.colors.primary} strokeWidth={1.5} />
          </View>
          <Text style={styles.emptyTitle}>Cart is empty</Text>
          <Text style={styles.emptySub}>
            You haven't added any services yet.
          </Text>
          <TouchableOpacity 
            style={styles.exploreBtn} 
            onPress={() => navigation.navigate('Main')} 
            activeOpacity={0.8}
          >
            <Text style={styles.exploreBtnText}>Explore Services</Text>
            <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  // ── Filled Cart ──
  return (
    <ImageBackground source={require('../assets/RectangleBG.png')} style={styles.root} resizeMode="cover">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* ── Header ── */}
      <ScreenHeader
        title="Checkout"
        subTitle={`${cart.length} service${cart.length > 1 ? 's' : ''}`}
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity
            style={styles.headerBtnAdd}
            onPress={() => navigation.navigate('Main')}
            activeOpacity={0.7}
          >
            <Plus size={22} color={Theme.colors.primary} strokeWidth={2.5} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Services ── */}
        <View style={styles.section}>
          <SectionLabel text="SELECTED SERVICES" />
          <View style={styles.itemsWrapper}>
            {cart.map((item: CartItem, idx: number) => (
              <React.Fragment key={item.id}>
                <ServiceCard
                  item={item}
                  onIncrement={() => updateQty(item.id, 1)}
                  onDecrement={() => updateQty(item.id, -1)}
                />
                {idx < cart.length - 1 && <View style={styles.itemDivider} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* ── Booking Type ── */}
        <View style={styles.section}>
          <SectionLabel text="BOOKING TYPE" />
          <View style={styles.bookingRow}>
            <BookingCard type="instant" active={bookingType === 'instant'} onPress={() => setBookingType('instant')} />
            <BookingCard type="slot" active={bookingType === 'slot'} onPress={() => setBookingType('slot')} />
          </View>
        </View>

        {/* ── Invoice ── */}
        <View style={styles.section}>
          <SectionLabel text="BILLING DETAILS" />
          <View style={styles.invoiceCard}>
            <View style={styles.invoiceRow}>
              <Text style={styles.invLabel}>Item Total</Text>
              <Text style={styles.invVal}>₹{subtotal}</Text>
            </View>
            <View style={styles.invoiceRow}>
              <View style={styles.rowWithIcon}>
                <Text style={styles.invLabel}>Convenience fee</Text>
                <Info size={12} color={Theme.colors.text.muted} strokeWidth={2} />
              </View>
              <Text style={styles.invVal}>₹{convenienceFee}</Text>
            </View>
            <View style={styles.invoiceRow}>
              <Text style={styles.invLabel}>Taxes & GST</Text>
              <Text style={styles.invVal}>₹{taxes}</Text>
            </View>

            <View style={styles.invoiceLine} />

            <View style={[styles.invoiceRow, { paddingTop: 16 }]}>
              <Text style={styles.invLabelLg}>Total to Pay</Text>
              <Text style={styles.invValLg}>₹{total}</Text>
            </View>
          </View>

          {/* Savings pill */}
          <View style={styles.savingsPill}>
            <Tag size={14} color={Theme.colors.status.success} strokeWidth={2} />
            <Text style={styles.savingsText}>You're saving ₹15 with this professional booking</Text>
          </View>
        </View>

        {/* ── Cancellation Policy ── */}
        <View style={styles.section}>
          <View style={styles.policyCard}>
            <View style={styles.policyHeader}>
              <ShieldCheck size={16} color={Theme.colors.status.success} strokeWidth={2.5} />
              <Text style={styles.policyTitle}>Cancellation Policy</Text>
            </View>
            <Text style={styles.policyText}>
              {bookingType === 'instant'
                ? 'Free cancellation until 15 mins before technician arrival.'
                : 'Free cancellation up to 4 hours before your scheduled slot.'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* ── Footer ── */}
      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerLabel}>GRAND TOTAL</Text>
          <Text style={styles.footerValue}>₹{total}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate(bookingType === 'instant' ? 'AddressForm' : 'SlotSelection')}
        >
          <Text style={styles.bookBtnText}>
            {bookingType === 'instant' ? 'Confirm Booking' : 'Select Slot'}
          </Text>
          <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Theme.colors.background },

  // Header Buttons
  headerBtnAdd: {
    padding: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
  },

  // Empty
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyIconBox: {
    width: 90, height: 90, borderRadius: 30,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center', alignItems: 'center', marginBottom: 24,
  },
  emptyTitle: { fontSize: 22, fontWeight: '900', color: '#0F172A', marginBottom: 8 },
  emptySub: { fontSize: 15, color: '#64748B', textAlign: 'center', marginBottom: 32 },
  exploreBtn: { 
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 32, paddingVertical: 16, borderRadius: 28,
  },
  exploreBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },

  // Scroll
  scrollContent: { paddingBottom: 140, paddingTop: 12 },
  section: { paddingHorizontal: 16, marginBottom: 28 },
  sectionLabel: { 
    fontSize: 12, fontWeight: '900', color: '#1E3A8A', 
    letterSpacing: 1, marginBottom: 12, marginLeft: 4 
  },

  // Service card items wrapper
  itemsWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  serviceCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    padding: 16,
  },
  itemDivider: { 
    height: 1, backgroundColor: '#F1F5F9', marginHorizontal: 16 
  },
  serviceEmoji: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center', alignItems: 'center',
  },
  serviceInfo: { flex: 1 },
  serviceNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  serviceName: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  tagPill: {
    backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6,
  },
  tagText: { fontSize: 10, fontWeight: '800', color: '#92400E' },
  serviceMeta: { fontSize: 12, color: '#64748B', marginBottom: 6 },
  servicePrice: { fontSize: 16, fontWeight: '900', color: Theme.colors.primary },
  qtyCtrl: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 32, height: 32, borderRadius: 10,
    borderWidth: 1.5, borderColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center',
  },
  qtyBtnAdd: {
    borderColor: '#EFF6FF',
    backgroundColor: '#EFF6FF',
  },
  qtyNum: { fontSize: 15, fontWeight: '800', color: '#0F172A', minWidth: 18, textAlign: 'center' },

  // Booking
  bookingRow: { flexDirection: 'row', gap: 12 },
  bookingCard: {
    flex: 1, padding: 16, borderRadius: 20,
    borderWidth: 2, borderColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  bookingCardActive: {
    borderColor: Theme.colors.primary,
    backgroundColor: '#F0F7FF',
  },
  bookingIconBox: {
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  bookingIconBoxActive: { backgroundColor: Theme.colors.primary },
  bookingTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
  bookingTitleActive: { color: Theme.colors.primary },
  bookingSub: { fontSize: 11, color: '#64748B', lineHeight: 16, fontWeight: '500' },
  bookingSubActive: { color: Theme.colors.primary, opacity: 0.8 },
  bookingActiveDot: {
    position: 'absolute', top: 12, right: 12,
    width: 8, height: 8, borderRadius: 4, backgroundColor: Theme.colors.primary,
  },

  // Invoice
  invoiceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1, borderColor: '#F1F5F9',
    padding: 16,
  },
  invoiceRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 10,
  },
  rowWithIcon: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  invoiceLine: { 
    height: 1, backgroundColor: '#F1F5F9', 
    marginTop: 10, borderStyle: 'dashed', borderRadius: 1 
  },
  invLabel: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  invVal: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  invLabelLg: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  invValLg: { fontSize: 24, fontWeight: '900', color: Theme.colors.primary },

  savingsPill: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16,
    backgroundColor: '#F0FDF4', paddingHorizontal: 16, paddingVertical: 12,
    borderRadius: 16, borderWidth: 1, borderColor: '#DCFCE7',
  },
  savingsText: { fontSize: 13, color: '#166534', fontWeight: '700', flex: 1 },

  // Policy
  policyCard: {
    backgroundColor: '#FFFFFF', borderRadius: 20,
    borderWidth: 1, borderColor: '#F1F5F9', padding: 18,
  },
  policyHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  policyTitle: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  policyText: { fontSize: 13, color: '#64748B', lineHeight: 22, fontWeight: '500' },

  // Footer
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', gap: 20,
    paddingHorizontal: 16, paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1, borderTopColor: '#F1F5F9',
  },
  footerTotal: { gap: 2 },
  footerLabel: {
    fontSize: 10, fontWeight: '900', color: '#94A3B8',
    letterSpacing: 1,
  },
  footerValue: { fontSize: 28, fontWeight: '900', color: '#0F172A' },
  bookBtn: {
    flex: 1, flexDirection: 'row', 
    alignItems: 'center', justifyContent: 'center',
    gap: 8, height: 56, borderRadius: 28,
    backgroundColor: Theme.colors.primary,
  },
  bookBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});