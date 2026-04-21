import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import { Theme } from '../constants/Theme';
import { Button } from '../components/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import { SafeAreaView } from 'react-native-safe-area-context';

const PAYMENT_METHODS = [
  { id: 'upi', name: 'Google Pay / PhonePe (UPI)', icon: 'qrcode-scan', desc: 'Secure one-click payment' },
  { id: 'card', name: 'Credit / Debit Card', icon: 'credit-card-outline', desc: 'Visa, Mastercard, RuPay' },
  { id: 'wallet', name: 'Hozify Wallet', icon: 'wallet-outline', desc: 'Balance: ₹0.00' },
  { id: 'paylater', name: 'Pay After Service', icon: 'cash', desc: 'Cash or Online after work' },
];

export const PaymentScreen = ({ navigation }: any) => {
  const [selectedMethod, setSelectedMethod] = useState('paylater');
  const { cartTotal, clearCart, cart } = useStore();
  const [loading, setLoading] = useState(false);

  const subtotal = cartTotal();
  const convenienceFee = subtotal > 0 ? 49 : 0;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + convenienceFee + taxes;

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      clearCart();
      navigation.replace('BookingConfirmation');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <SafeAreaView style={styles.headerSafe} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={Theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{ width: 48 }} />
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.introBox}>
          <Text style={styles.introTitle}>Payment</Text>
          <Text style={styles.introSub}>Complete your booking securely.</Text>
        </View>

        <View style={styles.billCard}>
           <View style={styles.billHeader}>
               <Text style={styles.billTitle}>Bill Summary</Text>
               <MaterialCommunityIcons name="file-document-outline" size={20} color={Theme.colors.primary} />
           </View>
           
           <View style={styles.billRow}>
               <Text style={styles.billLabel}>Item Total</Text>
               <Text style={styles.billValue}>₹{subtotal}</Text>
           </View>
           <View style={styles.billRow}>
               <Text style={styles.billLabel}>Convenience Fee</Text>
               <Text style={styles.billValue}>₹{convenienceFee}</Text>
           </View>
           <View style={styles.billRow}>
               <Text style={styles.billLabel}>Taxes & GST</Text>
               <Text style={styles.billValue}>₹{taxes}</Text>
           </View>
           
           <Divider style={styles.billDivider} />
           
           <View style={styles.totalRow}>
               <Text style={styles.totalLabel}>Grand Total</Text>
               <Text style={styles.totalValue}>₹{total}</Text>
           </View>
        </View>

        <View style={styles.sectionHeader}>
           <Text style={styles.subHeaderText}>PAYMENT METHOD</Text>
        </View>

        <View style={styles.methodList}>
          {PAYMENT_METHODS.map(method => (
            <TouchableOpacity 
              key={method.id} 
              activeOpacity={0.9}
              onPress={() => setSelectedMethod(method.id)}
              style={[
                styles.methodCard, 
                selectedMethod === method.id && styles.selectedMethodCard
              ]}
            >
                <View style={[
                  styles.iconBox,
                  { backgroundColor: selectedMethod === method.id ? Theme.colors.primary : '#F8FAFC' }
                ]}>
                  <MaterialCommunityIcons 
                    name={method.icon as any} 
                    size={22} 
                    color={selectedMethod === method.id ? '#FFFFFF' : '#64748B'} 
                  />
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodName}>{method.name}</Text>
                  <Text style={styles.methodDesc}>{method.desc}</Text>
                </View>
                <View style={[styles.radioOuter, selectedMethod === method.id && styles.radioOuterSelected]}>
                  {selectedMethod === method.id && <View style={styles.radioInner} />}
                </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.secureContainer}>
          <View style={styles.secureBadge}>
            <MaterialCommunityIcons name="shield-check" size={20} color="#059669" />
            <Text style={styles.secureText}>100% SECURE TRANSACTIONS</Text>
          </View>
          <Text style={styles.secureSub}>Your data is safe with our encrypted payment systems.</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <SafeAreaView edges={['bottom']} style={styles.footerSafe}>
            <View style={styles.footerLayout}>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>TOTAL PAYABLE</Text>
                    <Text style={styles.priceValue}>₹{total}</Text>
                </View>
                <TouchableOpacity 
                    style={[styles.payBtn, loading && styles.disabledBtn]} 
                    onPress={handlePay}
                    disabled={loading}
                    activeOpacity={0.9}
                >
                    <Text style={styles.payBtnText}>{loading ? 'Processing...' : 'Place Order'}</Text>
                    <MaterialCommunityIcons name="lock-outline" size={18} color="#FFF" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerSafe: { 
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    height: 64,
  },
  backBtn: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: Theme.colors.text.primary, letterSpacing: -0.5 },

  scrollContent: { paddingBottom: 160 },
  introBox: { paddingHorizontal: 24, paddingVertical: 24 },
  introTitle: { fontSize: 32, fontWeight: '900', color: Theme.colors.text.primary, marginBottom: 4, letterSpacing: -1 },
  introSub: { fontSize: 15, color: '#64748B', fontWeight: '600' },

  billCard: { 
    marginHorizontal: 24, backgroundColor: '#FFFFFF', borderRadius: 28, padding: 24, marginBottom: 32,
    borderWidth: 1.5, borderColor: '#F1F5F9'
  },
  billHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  billTitle: { fontSize: 18, fontWeight: '900', color: Theme.colors.text.primary, letterSpacing: -0.5 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  billLabel: { fontSize: 14, color: '#64748B', fontWeight: '600' },
  billValue: { fontSize: 14, fontWeight: '800', color: Theme.colors.text.primary },
  billDivider: { height: 1.5, backgroundColor: '#F1F5F9', marginVertical: 16 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 16, fontWeight: '900', color: Theme.colors.text.primary },
  totalValue: { fontSize: 24, fontWeight: '900', color: Theme.colors.primary },

  sectionHeader: { paddingHorizontal: 24, marginBottom: 16 },
  subHeaderText: { fontSize: 11, fontWeight: '900', color: '#64748B', letterSpacing: 1 },

  methodList: { paddingHorizontal: 24 },
  methodCard: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 20, borderRadius: 24, 
    marginBottom: 16, borderWidth: 1.5, borderColor: '#F1F5F9' 
  },
  selectedMethodCard: { borderColor: Theme.colors.primary, backgroundColor: '#FFFFFF' },
  iconBox: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  methodInfo: { marginLeft: 16, flex: 1 },
  methodName: { fontSize: 17, fontWeight: '900', color: Theme.colors.text.primary, letterSpacing: -0.5 },
  methodDesc: { fontSize: 13, color: '#64748B', fontWeight: '600', marginTop: 2 },
  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' },
  radioOuterSelected: { borderColor: Theme.colors.primary },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: Theme.colors.primary },

  secureContainer: { alignItems: 'center', marginTop: 16, paddingHorizontal: 24 },
  secureBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  secureText: { color: '#059669', fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },
  secureSub: { fontSize: 12, color: '#94A3B8', fontWeight: '600', textAlign: 'center' },

  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    backgroundColor: '#FFFFFF', borderTopLeftRadius: 32, borderTopRightRadius: 32,
    borderTopWidth: 1.5, borderTopColor: '#F1F5F9'
  },
  footerSafe: { padding: 24 },
  footerLayout: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceContainer: { flex: 1 },
  priceLabel: { fontSize: 10, color: '#64748B', fontWeight: '900', letterSpacing: 1, marginBottom: 4 },
  priceValue: { fontSize: 28, fontWeight: '900', color: Theme.colors.text.primary },
  payBtn: { 
    flex: 1.2, height: 56, backgroundColor: Theme.colors.text.primary, borderRadius: 18, flexDirection: 'row', 
    alignItems: 'center', justifyContent: 'center', gap: 10
  },
  payBtnText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16 },
  disabledBtn: { opacity: 0.7 },
});
