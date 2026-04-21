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
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store/useStore';
import { Colors } from '../constants/Colors';
import { LucideIcon } from '../components/LucideIcon';
import { PrimaryButton } from '../components/PrimaryButton';

const { width, height } = Dimensions.get('window');
const OTP_LENGTH = 6;

export const OTPVerificationScreen = ({ navigation, route }: any) => {
  const phone = route.params?.phone || '9573447204';
  const [timer, setTimer] = useState(30);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { login, completeOnboarding } = useStore();

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

  const handleVerify = async () => {
    if (!otpFilled) return;
    completeOnboarding();
    login({ phone });
  };

  return (
    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.root}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* ── HEADER ───────── */}
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <LucideIcon name="arrow-left" size={22} color="#0F172A" />
          </TouchableOpacity>

          <View style={styles.titleBlock}>
            <Text style={styles.headerTitle}>Verify OTP</Text>
            <Text style={styles.headerSub}>Complete this to login</Text>
          </View>

          <TouchableOpacity style={styles.helpBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Help')} >
            <MaterialCommunityIcons name="help-circle-outline" size={18} color="#FFFFFF" />
            <Text style={styles.helpText}>Help</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* ── WHITE CARD ───────────────────────────────── */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.card}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Title */}
            <View style={styles.titleSection}>
              <Text style={styles.title}>
                Enter Verification code<Text style={styles.required}>*</Text>
              </Text>
              <Text style={styles.subtitle}>Sent to {phone}</Text>
            </View>

            {/* ── OTP: single underline input like screenshot ── */}
            <View style={styles.otpRow}>
              {Array(OTP_LENGTH).fill(0).map((_, i) => (
                <View key={i} style={styles.otpCell}>
                  <TextInput
                    ref={(ref) => { inputRefs.current[i] = ref; }}
                    style={[
                      styles.otpInput,
                      otp[i] ? styles.otpInputFilled : null,
                    ]}
                    value={otp[i]}
                    onChangeText={(text) => handleOtpChange(text, i)}
                    onKeyPress={(e) => handleKeyPress(e, i)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    selectionColor="#003B95"
                    autoFocus={i === 0}
                  />
                  {/* Underline bar */}
                  <View
                    style={[
                      styles.otpUnderline,
                      otp[i] ? styles.otpUnderlineFilled : null,
                    ]}
                  />
                </View>
              ))}
            </View>

            {/* Resend & WhatsApp */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.pillBtn}
                activeOpacity={timer > 0 ? 1 : 0.7}
                onPress={() => { if (timer === 0) setTimer(30); }}
              >
                <LucideIcon name="message-outline" size={17} color="#64748B" />
                <Text style={styles.pillBtnText}>
                  {timer > 0 ? `Resend code in ${timer}s` : 'Resend code'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.pillBtn} activeOpacity={0.7}>
                <LucideIcon name="whatsapp" size={17} color="#25D366" />
                <Text style={styles.pillBtnText}>Send via WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>

            <PrimaryButton
              label="Next"
              onPress={handleVerify}
              disabled={!otpFilled}
            // style={[styles.nextBtn, !otpFilled && styles.nextBtnDisabled]}
            />
            {/* <TouchableOpacity
              style={[styles.nextBtn, !otpFilled && styles.nextBtnDisabled]}
              onPress={handleVerify}
              activeOpacity={otpFilled ? 0.85 : 1}
              disabled={!otpFilled}
            >
              <Text style={[styles.nextBtnText, !otpFilled && styles.nextBtnTextDisabled]}>
                Next →
              </Text>
            </TouchableOpacity> */}
            <Text style={styles.disclaimer}>
              By tapping on "Send via Whatsapp", you agree to receive important
              communications such as OTP and payment details, over Whatsapp
            </Text>

          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const BOX_SIZE = (width - 48 - 5 * 16) / 6;

const styles = StyleSheet.create({

  root: {
    flex: 1,
  },

  safeArea: {
    zIndex: 10,
  },

  /* ── Header ─────────────────────────────────────── */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBlock: {
    flex: 1,
    paddingLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  headerSub: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
    marginTop: 2,
  },
  helpBtn: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 99,
  },
  helpText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* ── White card ──────────────────────────────────── */
  keyboardAvoid: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    maxHeight: height * 0.75,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    flexGrow: 1,
  },

  /* Title */
  titleSection: { marginBottom: 36 },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    letterSpacing: -0.4,
  },
  required: {
    color: '#EF4444',
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '400',
  },

  /* ── OTP underline style (like screenshot) ───────── */
  otpRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 36,
    justifyContent: 'center',
  },
  otpCell: {
    alignItems: 'center',
    width: BOX_SIZE,
  },
  otpInput: {
    width: BOX_SIZE,
    height: BOX_SIZE + 4,
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    backgroundColor: 'transparent',
    padding: 0,
  },
  otpInputFilled: {
    color: '#003B95',
  },
  otpUnderline: {
    width: '100%',
    height: 2,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    marginTop: 2,
  },
  otpUnderlineFilled: {
    backgroundColor: '#003B95',
    height: 2.5,
  },

  /* Pills */
  actionRow: {
    gap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pillBtnText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },

  /* Footer */
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 12,
    gap: 14,
    backgroundColor: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
  },
  nextBtn: {
    backgroundColor: '#003B95',
    borderRadius: 12,
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
    letterSpacing: 0.3,
  },
  nextBtnTextDisabled: {
    color: '#94A3B8',
  },
});