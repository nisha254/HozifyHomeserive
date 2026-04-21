import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Animated, StatusBar, TextInput } from 'react-native';
import { Text } from 'react-native-paper';
import { Theme } from '../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useStore } from '../store/useStore';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LocationSetupScreen = ({ route, navigation }: any) => {
  const phone = route.params?.phone || '1234567890';
  const { setLocation, login } = useStore();
  const [manualMode, setManualMode] = useState(false);
  const [fullAddress, setFullAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true })
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [loading]);

  const completeSetup = (city: string, area: string) => {
    setLocation({ city, area });
    // Note: login({ phone }) is already handled in OTPVerificationScreen
    navigation.replace('Main');
  };

  const handleAutoDetect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      completeSetup('Mumbai', 'Bandra West');
    }, 1500);
  };

  const handleManualSubmit = () => {
    if (fullAddress.trim().length > 5) {
      completeSetup('Custom City', fullAddress);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView style={styles.content}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={styles.inner}>
            <View style={styles.heroSection}>
              <View style={styles.indicatorWrapper}>
                <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }], opacity: loading ? 0.6 : 0.2 }]} />
                <View style={styles.mainIconBox}>
                  <MaterialCommunityIcons name="map-marker-radius" size={44} color={Theme.colors.primary} />
                </View>
              </View>
              <Text style={styles.heroTitle}>Delivery Location</Text>
              <Text style={styles.heroSubtitle}>
                Where should we send our professionals? We'll show you services available in your area.
              </Text>
            </View>

            {!manualMode ? (
              <View style={styles.actionView}>
                <TouchableOpacity
                  style={styles.primaryLocBtn}
                  onPress={handleAutoDetect}
                  disabled={loading}
                  activeOpacity={0.9}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <>
                      <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#FFFFFF" />
                      <Text style={styles.primaryLocText}>Use Current Location</Text>
                    </>
                  )}
                </TouchableOpacity>

                <View style={styles.dividerRow}>
                  <View style={styles.hLine} />
                  <Text style={styles.dividerLabel}>SEARCH MANUALLY</Text>
                  <View style={styles.hLine} />
                </View>

                <TouchableOpacity
                  style={styles.secondaryLocBtn}
                  onPress={() => setManualMode(true)}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons name="magnify" size={24} color={Theme.colors.text.secondary} />
                  <Text style={styles.secondaryLocText}>Search for your area manually</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.formView}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Enter full address</Text>
                  <View style={styles.textAreaBox}>
                    <TextInput
                      style={styles.textArea}
                      placeholder="e.g. A-101, Hozify Tower, Landmark, city, pincode"
                      placeholderTextColor={Theme.colors.text.muted}
                      value={fullAddress}
                      onChangeText={setFullAddress}
                      multiline
                      numberOfLines={4}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.confirmBtn, fullAddress.trim().length < 5 && styles.confirmBtnDisabled]}
                  disabled={fullAddress.trim().length < 5}
                  onPress={handleManualSubmit}
                  activeOpacity={0.8}
                >
                  <Text style={styles.confirmBtnText}>Confirm Location</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backLink} onPress={() => setManualMode(false)}>
                  <Text style={styles.backLinkText}>Go back to auto-detection</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <View style={styles.securityBadge}>
        <MaterialCommunityIcons name="shield-check" size={14} color="#64748B" />
        <Text style={styles.securityText}>Your location is safe with us</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 24, paddingTop: 40 },

  heroSection: { alignItems: 'center', marginBottom: 52 },
  indicatorWrapper: { width: 120, height: 120, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  pulseCircle: { position: 'absolute', width: 100, height: 100, borderRadius: 50, backgroundColor: Theme.colors.primary },
  mainIconBox: { width: 88, height: 88, borderRadius: 32, backgroundColor: '#FFF7F2', justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#FFEDD5' },

  heroTitle: { fontSize: 28, fontWeight: '900', color: Theme.colors.text.primary, marginBottom: 12, letterSpacing: -0.5 },
  heroSubtitle: { fontSize: 15, fontWeight: '600', color: Theme.colors.text.secondary, textAlign: 'center', lineHeight: 22, paddingHorizontal: 10 },

  actionView: { flex: 1 },
  primaryLocBtn: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.primary,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  primaryLocText: { color: '#FFFFFF', fontWeight: '900', fontSize: 17, letterSpacing: -0.3 },

  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 40, gap: 16 },
  hLine: { flex: 1, height: 1.5, backgroundColor: '#F1F5F9' },
  dividerLabel: { fontSize: 11, fontWeight: '900', color: Theme.colors.text.muted, letterSpacing: 1.5 },

  secondaryLocBtn: {
    flexDirection: 'row',
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: '#F1F5F9',
    backgroundColor: '#F8FAFC',
  },
  secondaryLocText: { color: Theme.colors.text.secondary, fontWeight: '800', fontSize: 15 },

  formView: { flex: 1 },
  inputWrapper: { marginBottom: 32 },
  inputLabel: { fontSize: 14, fontWeight: '900', color: Theme.colors.text.primary, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.5 },
  textAreaBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    minHeight: 120,
    padding: 16,
  },
  textArea: { fontSize: 16, fontWeight: '600', color: Theme.colors.text.primary, textAlignVertical: 'top' },

  confirmBtn: { backgroundColor: Theme.colors.text.primary, height: 60, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  confirmBtnDisabled: { opacity: 0.5 },
  confirmBtnText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16 },

  backLink: { marginTop: 24, alignSelf: 'center', padding: 10 },
  backLinkText: { fontSize: 14, fontWeight: '800', color: Theme.colors.primary },

  securityBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingBottom: 40, opacity: 0.6 },
  securityText: { fontSize: 12, fontWeight: '700', color: '#64748B' },
});
