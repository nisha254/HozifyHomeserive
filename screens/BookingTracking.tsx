import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Image, Dimensions } from 'react-native';
import { Text, Surface, Avatar } from 'react-native-paper';
import { 
  Bike, 
  Home, 
  ArrowLeft, 
  Star, 
  MessageSquare, 
  Phone, 
  Check, 
  ShieldCheck, 
  BadgeCheck, 
  CheckCircle2, 
  AlertOctagon, 
  Headphones 
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../constants/Theme';

// Note: In a real environment, user would run 'npm install react-native-maps'
// We are implementing the UI with a high-fidelity "Map Simulation" style
// that is ready for the real MapView component.

const { width, height } = Dimensions.get('window');

const STATUS_FLOW = [
  { title: 'Booking Placed', desc: 'Securely received by Hozify', icon: 'file-check-outline', time: '10:00 AM' },
  { title: 'Provider Assigned', desc: 'Rahul Kumar is on the way', icon: 'account-hard-hat-outline', time: '10:15 AM' },
  { title: 'Service In Progress', desc: 'Provide OTP to professional', icon: 'tools', time: 'Pending' },
  { title: 'Service Completed', desc: 'Final walkthrough & payment', icon: 'check-circle-outline', time: 'Pending' },
];

export const BookingTrackingScreen = ({ route, navigation }: any) => {
  const bookingId = route.params?.bookingId || '123456';
  const [statusIndex, setStatusIndex] = useState(1); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusIndex(2); 
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* MAP SECTION (Simulated High-Fidelity Google Maps) */}
      <View style={styles.mapContainer}>
        <Image 
          source={{ uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/77.2090,28.6139,13,0/600x600?access_token=pk.mock' }} 
          style={StyleSheet.absoluteFillObject}
          defaultSource={require('../assets/logo1.png')}
        />
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
        
        {/* Mock Markers */}
        <View style={[styles.marker, { top: '30%', left: '40%' }]}>
           <View style={styles.markerPulse}>
              <Bike size={20} color="#FFFFFF" />
           </View>
           <View style={styles.markerArrow} />
        </View>

        <View style={[styles.marker, { top: '60%', left: '55%' }]}>
           <View style={[styles.markerPulse, { backgroundColor: Theme.colors.primary }]}>
              <Home size={20} color="#FFFFFF" />
           </View>
           <View style={[styles.markerArrow, { borderTopColor: Theme.colors.primary }]} />
        </View>

        {/* Floating Back Button over Map */}
        <SafeAreaView style={styles.floatingHeader}>
            <TouchableOpacity style={styles.roundBackBtn} onPress={() => navigation.goBack()}>
                <ArrowLeft size={24} color={Theme.colors.text.primary} strokeWidth={2.5} />
            </TouchableOpacity>
        </SafeAreaView>
      </View>

      {/* BOTTOM SHEET INFO */}
      <ScrollView 
        style={styles.bottomSheet} 
        contentContainerStyle={styles.bsContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bsHandle} />
        
        <View style={styles.statusHeader}>
            <View>
                <Text style={styles.idLabel}>SERVICE ID: #{bookingId}</Text>
                <Text style={styles.etaText}>Arriving in <Text style={{color: Theme.colors.primary}}>12 mins</Text></Text>
            </View>
            <View style={styles.statusPill}>
                <View style={styles.pulseDot} />
                <Text style={styles.statusPillText}>LIVE TRACKING</Text>
            </View>
        </View>

        <View style={styles.providerCard}>
            <View style={styles.providerMain}>
                <Avatar.Image 
                    size={56} 
                    source={{ uri: 'https://i.pravatar.cc/150?u=rahul' }} 
                />
                <View style={styles.providerMeta}>
                    <Text style={styles.providerName}>Rahul Kumar</Text>
                    <View style={styles.ratingRow}>
                        <Star size={14} color="#FBBF24" fill="#FBBF24" />
                        <Text style={styles.ratingValue}>4.9 (120+ jobs)</Text>
                    </View>
                </View>
                <View style={styles.actionRow}>
                   <TouchableOpacity style={styles.iconAction} activeOpacity={0.7}>
                      <MessageSquare size={22} color={Theme.colors.primary} strokeWidth={2.5} />
                   </TouchableOpacity>
                   <TouchableOpacity style={[styles.iconAction, { backgroundColor: Theme.colors.text.primary }]} activeOpacity={0.7}>
                      <Phone size={22} color="#FFFFFF" strokeWidth={2.5} />
                   </TouchableOpacity>
                </View>
            </View>
        </View>

        <View style={styles.journeyWrapper}>
            <Text style={styles.sectionTitle}>Journey Status</Text>
            {STATUS_FLOW.map((item, idx) => {
                const isActive = idx <= statusIndex;
                const isCurrent = idx === statusIndex;
                return (
                    <View key={idx} style={styles.timelineItem}>
                        <View style={styles.timelineLeft}>
                            <View style={[styles.timelineDot, isActive && { backgroundColor: idx === 3 ? '#10B981' : Theme.colors.primary, borderColor: 'transparent' }]}>
                                {isActive && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                            </View>
                            {idx < 3 && <View style={[styles.timelineLine, isActive && { backgroundColor: Theme.colors.primary }]} />}
                        </View>
                        <View style={styles.timelineRight}>
                            <Text style={[styles.itemTitle, !isActive && { color: Theme.colors.text.muted }]}>{item.title}</Text>
                            <Text style={styles.itemDesc}>{item.desc}</Text>
                        </View>
                        {isCurrent && <Text style={styles.activeLabel}>NOW</Text>}
                    </View>
                );
            })}
        </View>

        {statusIndex === 1 && (
            <View style={styles.otpSection}>
                <View style={styles.otpHeader}>
                    <ShieldCheck size={24} color={Theme.colors.primary} strokeWidth={2.5} />
                    <Text style={styles.otpLabel}>Start Service PIN</Text>
                </View>
                <View style={styles.otpCode}>
                    <Text style={[styles.otpDigit, { borderRadius: 12 }]}>4</Text>
                    <Text style={[styles.otpDigit, { borderRadius: 12 }]}>8</Text>
                    <Text style={[styles.otpDigit, { borderRadius: 12 }]}>2</Text>
                    <Text style={[styles.otpDigit, { borderRadius: 12 }]}>9</Text>
                </View>
                <Text style={styles.otpHint}>Provide this 4-digit code to start the service.</Text>
            </View>
        )}

        {statusIndex === 2 && (
            <View style={[styles.otpSection, { borderColor: '#10B981', backgroundColor: '#ECFDF5' }]}>
                <View style={styles.otpHeader}>
                    <BadgeCheck size={24} color="#10B981" strokeWidth={2.5} />
                    <Text style={[styles.otpLabel, { color: '#065F46' }]}>Completion OTP Handshake</Text>
                </View>
                <View style={styles.otpCode}>
                    <Text style={[styles.otpDigit, { borderColor: '#A7F3D0', color: '#065F46' }]}>7</Text>
                    <Text style={[styles.otpDigit, { borderColor: '#A7F3D0', color: '#065F46' }]}>3</Text>
                    <Text style={[styles.otpDigit, { borderColor: '#A7F3D0', color: '#065F46' }]}>1</Text>
                    <Text style={[styles.otpDigit, { borderColor: '#A7F3D0', color: '#065F46' }]}>0</Text>
                </View>
                <Text style={[styles.otpHint, { color: '#059669' }]}>Ask the professional for this code after inspecting the work.</Text>
            </View>
        )}

        {statusIndex === 3 && (
            <View style={styles.completionSuccess}>
                <CheckCircle2 size={48} color="#10B981" strokeWidth={2.5} />
                <Text style={styles.completionTitle}>Service Completed!</Text>
                <Text style={styles.completionSub}>Thank you for choosing Hozify. Your invoice has been sent to your email.</Text>
                <TouchableOpacity style={styles.rateBtn} onPress={() => navigation.navigate('Main')}>
                    <Text style={styles.rateBtnText}>Rate Service & Close</Text>
                </TouchableOpacity>
            </View>
        )}
      </ScrollView>

      <View style={styles.footerActions}>
          <TouchableOpacity style={styles.sosButton} onPress={() => navigation.navigate('SOS')}>
              <AlertOctagon size={24} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.chatSupport} 
            onPress={() => navigation.navigate('SOS')}
          >
              <Headphones size={24} color={Theme.colors.text.primary} strokeWidth={2.5} />
              <Text style={styles.chatText}>Lively Help</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  mapContainer: {
      height: height * 0.45,
      width: '100%',
      backgroundColor: '#F1F5F9',
  },
  floatingHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: 16,
  },
  roundBackBtn: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: '#F1F5F9',
  },
  marker: {
      position: 'absolute',
      alignItems: 'center',
  },
  markerPulse: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: Theme.colors.text.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: '#FFFFFF',
  },
  markerArrow: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 8,
      borderRightWidth: 8,
      borderTopWidth: 10,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: Theme.colors.text.primary,
      marginTop: -2,
  },

  bottomSheet: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 36,
      borderTopRightRadius: 36,
      marginTop: -30,
  },
  bsContent: {
      paddingBottom: 120,
      paddingHorizontal: 24,
  },
  bsHandle: {
      width: 40,
      height: 5,
      borderRadius: 4,
      backgroundColor: '#E2E8F0',
      alignSelf: 'center',
      marginTop: 12,
      marginBottom: 24,
  },
  statusHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
  },
  idLabel: { fontSize: 11, fontWeight: '900', color: Theme.colors.text.muted, letterSpacing: 1 },
  etaText: { fontSize: 24, fontWeight: '900', color: Theme.colors.text.primary, letterSpacing: -1, marginTop: 4 },
  statusPill: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 100,
      backgroundColor: '#F8FAFC',
      gap: 8,
      borderWidth: 1,
      borderColor: '#F1F5F9',
  },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Theme.colors.primary },
  statusPillText: { fontSize: 10, fontWeight: '900', color: Theme.colors.primary, letterSpacing: 0.5 },

  providerCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      padding: 20,
      marginBottom: 32,
      borderWidth: 1,
      borderColor: '#F1F5F9',
  },
  providerMain: { flexDirection: 'row', alignItems: 'center' },
  providerMeta: { flex: 1, marginLeft: 16 },
  providerName: { fontSize: 18, fontWeight: '900', color: Theme.colors.text.primary, marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingValue: { fontSize: 13, color: Theme.colors.text.secondary, fontWeight: '700' },
  actionRow: { flexDirection: 'row', gap: 10 },
  iconAction: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: '#FFF7ED',
      justifyContent: 'center',
      alignItems: 'center',
  },

  journeyWrapper: { marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: Theme.colors.text.primary, marginBottom: 24, letterSpacing: -0.5 },
  timelineItem: { flexDirection: 'row', gap: 16, paddingBottom: 24 },
  timelineLeft: { alignItems: 'center', width: 24 },
  timelineDot: { 
      width: 24, 
      height: 24, 
      borderRadius: 12, 
      backgroundColor: '#FFFFFF', 
      borderWidth: 2, 
      borderColor: '#E2E8F0', 
      zIndex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  timelineLine: { width: 2, height: '100%', backgroundColor: '#F1F5F9', position: 'absolute', top: 24 },
  timelineRight: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: '900', color: Theme.colors.text.primary, marginBottom: 4, letterSpacing: -0.3 },
  itemDesc: { fontSize: 13, color: Theme.colors.text.muted, fontWeight: '600', lineHeight: 18 },
  activeLabel: { fontSize: 10, fontWeight: '900', color: Theme.colors.primary, backgroundColor: '#FFF7ED', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },

  otpSection: {
      backgroundColor: '#F8F9FA',
      borderRadius: 28,
      padding: 24,
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: '#E9ECEF',
      borderStyle: 'dashed',
  },
  otpHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  otpLabel: { fontSize: 16, fontWeight: '900', color: Theme.colors.text.primary },
  otpCode: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  otpDigit: { fontSize: 32, fontWeight: '900', color: Theme.colors.text.primary, backgroundColor: '#FFFFFF', width: 50, height: 64, textAlign: 'center', textAlignVertical: 'center', borderRadius: 12, borderWidth: 1, borderColor: '#E9ECEF' },
  otpHint: { fontSize: 12, color: Theme.colors.text.muted, fontWeight: '700' },

  completionSuccess: {
      alignItems: 'center',
      backgroundColor: '#F0FDF4',
      padding: 32,
      borderRadius: 32,
      borderWidth: 1.5,
      borderColor: '#DCFCE7',
      marginTop: 8,
  },
  completionTitle: { fontSize: 24, fontWeight: '900', color: '#166534', marginTop: 16, letterSpacing: -0.5 },
  completionSub: { fontSize: 14, color: '#15803D', textAlign: 'center', marginTop: 8, lineHeight: 22, fontWeight: '600' },
  rateBtn: { 
      backgroundColor: '#166534', 
      paddingHorizontal: 32, 
      height: 52, 
      borderRadius: 16, 
      justifyContent: 'center', 
      marginTop: 24 
  },
  rateBtnText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16 },

  footerActions: {
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? 40 : 20,
      left: 20,
      right: 20,
      flexDirection: 'row',
      gap: 16,
  },
  sosButton: {
      flex: 1,
      height: 60,
      backgroundColor: '#EF4444',
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
  },
  sosText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16 },
  chatSupport: {
      flex: 2,
      height: 60,
      backgroundColor: '#F8FAFC',
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      borderColor: '#E2E8F0',
      borderWidth: 1,
  },
  chatText: { color: Theme.colors.text.primary, fontWeight: '900', fontSize: 16 },
});
