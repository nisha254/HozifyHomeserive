import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { Check, MapPin, ChevronRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../constants/Theme';
import { PrimaryButton } from '../components/PrimaryButton';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';

export const BookingConfirmationScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.successSection}>
          <Animated.View entering={ZoomIn.duration(600)}>
            <Surface style={styles.checkCircle} elevation={4}>
              <Check size={60} color="#FFFFFF" strokeWidth={3.5} />
            </Surface>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(300)} style={styles.textCenter}>
            <Text style={styles.title}>Booking Confirmed!</Text>
            <Text style={styles.subtitle}>
              Hang tight! We're assigning the best expert for your service.
            </Text>
          </Animated.View>
        </View>

        <Animated.View entering={FadeInUp.delay(500)} style={styles.detailsSection}>
          <Surface style={styles.detailCard} elevation={0}>
            <View style={styles.detailRow}>
               <Text style={styles.label}>Booking ID</Text>
               <Text style={styles.value}>#HZ10245</Text>
            </View>
            <View style={styles.detailRow}>
               <Text style={styles.label}>Date</Text>
               <Text style={styles.value}>Mon, 12 Apr</Text>
            </View>
            <View style={styles.detailRow}>
               <Text style={styles.label}>Time Slot</Text>
               <Text style={styles.value}>10:00 AM - 10:30 AM</Text>
            </View>
          </Surface>

          <TouchableOpacity style={styles.trackingBtn} activeOpacity={0.7} onPress={() => navigation.navigate('BookingTracking')}>
             <MapPin size={24} color={Theme.colors.primary} strokeWidth={2.5} />
             <Text style={styles.trackingText}>Track Booking & Provider</Text>
             <ChevronRight size={24} color={Theme.colors.primary} strokeWidth={2.5} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(700)} style={styles.adSection}>
           <Surface style={styles.adCard} elevation={0}>
              <View style={styles.adTextCol}>
                 <Text style={styles.adTitle}>Earn ₹50 on next service!</Text>
                 <Text style={styles.adSub}>Refer a friend and get instant credit.</Text>
              </View>
              <TouchableOpacity style={styles.referBtn} onPress={() => navigation.navigate('Referral')}>
                 <Text style={styles.referBtnText}>Refer</Text>
              </TouchableOpacity>
           </Surface>
        </Animated.View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <PrimaryButton 
          label="Back to Home" 
          onPress={() => navigation.navigate('Main')} 
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 100 },
  successSection: {
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 59, 149, 0.02)',
  },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  textCenter: { alignItems: 'center', paddingHorizontal: 40 },
  title: { fontSize: 28, fontWeight: '900', color: '#0F172A', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#64748B', textAlign: 'center', fontWeight: '600', lineHeight: 22 },

  detailsSection: { padding: 24 },
  detailCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  label: { fontSize: 14, color: '#64748B', fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },
  value: { fontSize: 15, fontWeight: '900', color: '#1E293B' },

  trackingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 59, 149, 0.05)',
    borderRadius: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 59, 149, 0.1)',
  },
  trackingText: { flex: 1, fontSize: 15, fontWeight: '900', color: Theme.colors.primary },

  adSection: { paddingHorizontal: 24 },
  adCard: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  adTextCol: { flex: 1 },
  adTitle: { fontSize: 16, fontWeight: '900', color: '#FFFFFF', marginBottom: 4 },
  adSub: { fontSize: 12, color: '#94A3B8', fontWeight: '600' },
  referBtn: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: Theme.colors.primary, borderRadius: 12 },
  referBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },

  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  }
});
