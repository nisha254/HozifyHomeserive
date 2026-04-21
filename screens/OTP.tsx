import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../constants/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

export const OTPScreen = ({ navigation, route }: any) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);
  const phone = route.params?.phone || '';

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join('').length === 6) {
      navigation.replace('LocationSetup');
    }
  };

  const isOtpComplete = otp.join('').length === 6;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView style={styles.headerSafe} edges={['top']}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={Theme.colors.text.primary} />
          </TouchableOpacity>
          <Image
            source={require('../assets/logo1.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View style={{ width: 48 }} />
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.introSection}>
            <Surface style={styles.iconCircle} elevation={0}>
              <MaterialCommunityIcons name="shield-check" size={32} color={Theme.colors.primary} />
            </Surface>

            <Text style={styles.title}>Account Verification</Text>
            <Text style={styles.subtitle}>
              We've sent a 6-digit secure code to your WhatsApp/SMS at <Text style={styles.phoneHighlight}>+91 {phone}</Text>
            </Text>
          </View>

          <View style={styles.otpSection}>
            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <Surface key={index} style={[
                  styles.otpInputSurface,
                  digit ? styles.otpInputActive : null
                ]} elevation={0}>
                  <TextInput
                    ref={(ref) => { inputs.current[index] = ref; }}
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    autoFocus={index === 0}
                    selectionColor={Theme.colors.primary}
                  />
                </Surface>
              ))}
            </View>
          </View>

          <View style={styles.timerContainer}>
            <MaterialCommunityIcons name="clock-outline" size={18} color="#94A3B8" />
            <Text style={styles.timerText}>Resend code in <Text style={styles.countText}>0:28s</Text></Text>
          </View>

          <View style={{ height: 48 }} />

          <TouchableOpacity
            style={[styles.verifyBtn, !isOtpComplete && styles.verifyBtnDisabled]}
            onPress={handleVerify}
            disabled={!isOtpComplete}
            activeOpacity={0.9}
          >
            <Text style={styles.verifyBtnLabel}>Verify Account</Text>
            <View style={[styles.btnIconBox, !isOtpComplete && styles.disabledIconBox]}>
              <MaterialCommunityIcons name="check" size={20} color={isOtpComplete ? Theme.colors.primary : '#94A3B8'} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resendBtn} activeOpacity={0.7}>
            <Text style={styles.resendText}>Didn't receive code? <Text style={styles.resendLink}>Resend Now</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerSafe: {
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  headerLogo: { width: 110, height: 36 },
  backBtn: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 40,
  },
  introSection: {
    marginBottom: 44,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 24,
    backgroundColor: Theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: Theme.colors.text.primary,
    marginBottom: 12,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: Theme.colors.text.secondary,
    lineHeight: 24,
    fontWeight: '600',
  },
  phoneHighlight: {
    color: Theme.colors.text.primary,
    fontWeight: '900',
  },
  otpSection: {
    marginBottom: 32,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  otpInputSurface: {
    flex: 1,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInputActive: {
    borderColor: Theme.colors.primary,
    backgroundColor: '#FFF7F2',
  },
  otpInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900',
    color: Theme.colors.text.primary,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F8FAFC',
    paddingVertical: 10,
    borderRadius: 12,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.text.muted,
  },
  countText: {
    color: Theme.colors.text.primary,
    fontWeight: '900',
  },
  verifyBtn: {
    height: 64,
    backgroundColor: Theme.colors.text.primary,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  verifyBtnDisabled: {
    backgroundColor: '#E2E8F0',
  },
  verifyBtnLabel: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  btnIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledIconBox: {
    backgroundColor: 'transparent',
  },
  resendBtn: {
    marginTop: 32,
    alignSelf: 'center',
    padding: 12,
  },
  resendText: {
    fontSize: 14,
    color: Theme.colors.text.muted,
    fontWeight: '700',
  },
  resendLink: {
    color: Theme.colors.primary,
    fontWeight: '900',
    textDecorationLine: 'underline',
  },
});
