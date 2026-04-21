import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Platform, ImageBackground, StatusBar } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  CalendarDays, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  CreditCard,
  ChevronRight,
  Info,
  ArrowRight
} from 'lucide-react-native';
import { Theme } from '../constants/Theme';
import { ScreenHeader } from '../components/ScreenHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useStore } from '../store/useStore';

export const BookingSummaryScreen = ({ navigation }: any) => {
  const { cart } = useStore();
  
  // For demo, we assume first cart item or a default service
  const service = cart[0] || {
    name: 'Home Deep Cleaning',
    price: 3499,
    duration: '4-6 hrs',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop'
  };

  const total = service.price + 49; 

  return (
    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.root}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <ScreenHeader
        title="Booking Summary"
        subTitle="Review details and pay"
        onBack={() => navigation.goBack()}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Service Details */}
        <View style={styles.card}>
          <View style={styles.serviceRow}>
            <Image source={{ uri: service.image }} style={styles.serviceImg} />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <View style={styles.metaRow}>
                <Clock size={12} color="#64748B" />
                <Text style={styles.serviceMeta}>{service.duration} Service Duration</Text>
              </View>
              <Text style={styles.servicePrice}>₹{service.price}</Text>
            </View>
          </View>
        </View>

        {/* Schedule & Location Section */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.infoRow} activeOpacity={0.7}>
            <View style={styles.iconBox}>
              <CalendarDays size={20} color={Theme.colors.primary} strokeWidth={2.5} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>SCHEDULED FOR</Text>
              <Text style={styles.infoValue}>Mon, 12 Apr · 10:00 AM</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.cardDivider} />

          <TouchableOpacity style={styles.infoRow} activeOpacity={0.7}>
            <View style={styles.iconBox}>
              <MapPin size={20} color={Theme.colors.primary} strokeWidth={2.5} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>SERVICE ADDRESS</Text>
              <Text style={styles.infoValue} numberOfLines={1}>C-24, Green Park, New Delhi...</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Payment Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Summary</Text>
          
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Total</Text>
            <Text style={styles.billValue}>₹{service.price}</Text>
          </View>
          
          <View style={styles.billRow}>
            <View style={styles.rowWithIcon}>
              <Text style={styles.billLabel}>Service Fee</Text>
              <Info size={12} color="#94A3B8" />
            </View>
            <Text style={styles.billValue}>₹49</Text>
          </View>

          <View style={styles.billLine} />

          <View style={[styles.billRow, { marginTop: 8 }]}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>₹{total}</Text>
          </View>
        </View>

        {/* Trust Banner */}
        <View style={styles.trustBanner}>
          <ShieldCheck size={18} color="#166534" strokeWidth={2.5} />
          <Text style={styles.trustText}>Covered by Hozify Safe Service Promise</Text>
        </View>

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.footerLabel}>TOTAL AMOUNT</Text>
          <Text style={styles.footerPrice}>₹{total}</Text>
        </View>
        <TouchableOpacity 
          style={styles.bookBtn} 
          onPress={() => navigation.navigate('BookingConfirmation')}
          activeOpacity={0.8}
        >
          <Text style={styles.bookBtnText}>Confirm Booking</Text>
          <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Theme.colors.background },
  scrollContent: { padding: 16, paddingBottom: 120 },
  
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
    marginLeft: 2,
  },
  
  serviceRow: { flexDirection: 'row', gap: 16 },
  serviceImg: { width: 72, height: 72, borderRadius: 14 },
  serviceInfo: { flex: 1, justifyContent: 'center' },
  serviceName: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  serviceMeta: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  servicePrice: { fontSize: 16, fontWeight: '900', color: Theme.colors.primary },

  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 4 },
  iconBox: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center', alignItems: 'center',
  },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 10, color: '#64748B', fontWeight: '800', letterSpacing: 1, marginBottom: 2 },
  infoValue: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  cardDivider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 12, marginLeft: 54 },

  billRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  rowWithIcon: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  billLabel: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  billValue: { fontSize: 14, color: '#0F172A', fontWeight: '700' },
  billLine: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 4, borderStyle: 'dashed', borderRadius: 1 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  totalValue: { fontSize: 22, fontWeight: '900', color: Theme.colors.primary },

  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#F0FDF4',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    marginTop: 8,
  },
  trustText: { fontSize: 13, color: '#166534', fontWeight: '700' },

  footer: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  footerInfo: { gap: 2 },
  footerLabel: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1 },
  footerPrice: { fontSize: 24, fontWeight: '900', color: '#0F172A' },
  bookBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Theme.colors.primary,
    height: 56,
    borderRadius: 28,
  },
  bookBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
