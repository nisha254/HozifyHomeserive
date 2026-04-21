import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Dimensions,
  Text,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const OTP_LENGTH = 6;

export const OTPVerificationScreen = ({ navigation, route }: any) => {
  const phone = route.params?.phone || '9573447204';
  const [timer, setTimer] = useState(30);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, '').slice(-1);
    setOtp(newOtp);
    if (text && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const otpFilled = otp.every((d) => d !== '');

  const handleVerify = () => {
    if (!otpFilled) return;
    if (!location) {
      navigation.replace('ProfileSetup', { phone });
    } else {
      navigation.replace('Main');
    }
  };
  //   const handleVerify = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     login({ phone }); // Mark as authenticated

  //     if (!location) {
  //       navigation.replace('ProfileSetup', { phone });
  //     } else {
  //       navigation.replace('Main');
  //     }
  //   }, 1500);
  // };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <SafeAreaView style={styles.safeHeader} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Verify OTP</Text>
          <TouchableOpacity style={styles.helpBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="help-circle-outline" size={18} color="#64748B" />
            <Text style={styles.helpText}>Help</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Enter verification code</Text>
          <Text style={styles.subtitle}>Sent to {phone}</Text>
        </View>

        {/* OTP Inputs — 6 boxes */}
        <View style={styles.otpRow}>
          {Array(OTP_LENGTH).fill(0).map((_, i) => (
            <TextInput
              key={i}
              ref={(ref) => { inputRefs.current[i] = ref; }}
              style={[styles.otpBox, i === 0 && !otp[0] && styles.otpBoxFocused]}
              value={otp[i]}
              onChangeText={(text) => handleOtpChange(text, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              selectionColor="#0F172A"
              autoFocus={i === 0}
            />
          ))}
        </View>

        {/* Resend & WhatsApp buttons */}
        <View style={styles.actionRow}>
          {/* Resend pill */}
          <TouchableOpacity
            style={styles.pillBtn}
            activeOpacity={timer > 0 ? 1 : 0.7}
            onPress={() => { if (timer === 0) setTimer(30); }}
          >
            <MaterialCommunityIcons name="message-outline" size={17} color="#64748B" />
            <Text style={styles.pillBtnText}>
              {timer > 0 ? `Resend in ${timer}s` : 'Resend code'}
            </Text>
          </TouchableOpacity>

          {/* WhatsApp pill */}
          <TouchableOpacity style={styles.pillBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="whatsapp" size={17} color="#25D366" />
            <Text style={styles.pillBtnText}>Send via WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom: disclaimer + Next button */}
      <View style={styles.footer}>
        <Text style={styles.disclaimer}>
          By tapping on "Send via Whatsapp", you agree to receive important communications such as OTP and payment details, over Whatsapp
        </Text>
        <TouchableOpacity
          style={[styles.nextBtn, !otpFilled && styles.nextBtnDisabled]}
          onPress={handleVerify}
          activeOpacity={otpFilled ? 0.85 : 1}
          disabled={!otpFilled}
        >
          <Text style={[styles.nextBtnText, !otpFilled && styles.nextBtnTextDisabled]}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BOX_SIZE = (width - 48 - 5 * 10) / 6; // 6 boxes with 10px gap, 24px side padding each

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  safeHeader: { backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  helpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  helpText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    flexGrow: 1,
  },

  titleSection: { marginBottom: 36 },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '400',
  },

  otpRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
  },
  otpBox: {
    width: BOX_SIZE,
    height: BOX_SIZE + 8,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  otpBoxFocused: {
    borderColor: '#0F172A',
    borderWidth: 2,
  },

  actionRow: {
    gap: 12,
    alignItems: 'flex-start',
  },
  pillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  pillBtnText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    paddingTop: 12,
    gap: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '400',
  },
  nextBtn: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtnDisabled: {
    backgroundColor: '#F1F5F9',
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  nextBtnTextDisabled: {
    color: '#94A3B8',
  },
});