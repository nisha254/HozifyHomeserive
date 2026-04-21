import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../constants/Theme';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../components/PrimaryButton';
import { LoadingDialog } from '../components/LoadingDialog';
import { useStore } from '../store/useStore';

const { width, height } = Dimensions.get('window');

const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits')
    .required('Phone number is required'),
});

export const LoginScreen = ({ navigation }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = (values: { phone: string }) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigation.navigate('OTPVerification', { phone: values.phone });
    }, 1500);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LoadingDialog visible={isSubmitting} />

      {/* ── GRADIENT BACKGROUND ─────────────────────────── */}
      <LinearGradient
        colors={[
          Colors.loginGradientStart,
          Colors.loginGradientMid,
          Colors.loginGradientEnd,
        ]}
        locations={[0.0, 0.45, 1.0]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.gradient}
      />

      {/* ── HELP BUTTON (top-right, floats over gradient) ── */}
      <SafeAreaView edges={['top']} style={styles.helpRow}>
        <TouchableOpacity
          style={styles.helpBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Help')}
        >
          <MaterialCommunityIcons
            name="help-circle-outline"
            size={20}
            color={Colors.helpBtnText}
          />
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* ── LOGO SECTION (centered in top area) ─────────── */}
      <View style={styles.logoSection}>
        <Image
          source={require('../assets/logo/HozifyLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/logo/HozifyText.png')}
          style={styles.wordmark}
          resizeMode="contain"
        />
      </View>

      {/* ── WHITE FORM SHEET ─────────────────────────────── */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formSheet}
      >
        <Formik
          initialValues={{ phone: '' }}
          validationSchema={loginSchema}
          onSubmit={handleNext}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => {
            const ready = isValid && values.phone.length === 10;

            return (
              <View style={styles.formContent}>

                {/* Title */}
                <Text style={styles.title}>What's your number?</Text>

                {/* Phone input */}
                <Surface style={styles.inputCard} elevation={0}>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.prefix}>+91</Text>
                    <View style={styles.divider} />
                    <TextInput
                      style={styles.input}
                      placeholder="0000000000"
                      keyboardType="number-pad"
                      maxLength={10}
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      placeholderTextColor={Colors.placeholder}
                    />
                  </View>
                </Surface>

                {/* Validation error */}
                {touched.phone && errors.phone ? (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                ) : null}

                <View style={styles.spacer} />

                {/* Agreement */}
                <Text style={styles.agreementText}>
                  By continuing, you confirm that you are 18 years of age and agree to the{' '}
                  <Text style={styles.linkText}>Terms & Conditions</Text>
                  {' '}and{' '}
                  <Text style={styles.linkText}>Privacy Policy</Text>
                </Text>

                {/* Next button */}
                <PrimaryButton
                  label="Next"
                  onPress={handleSubmit}
                  disabled={!ready}
                  style={[styles.nextBtn, !ready && styles.nextBtnDisabled]}
                />
              </View>
            );
          }}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({

  /* ── Root ─────────────────────────────────────────── */
  root: {
    flex: 1,
    backgroundColor: Colors.loginSheetBg,
  },

  /* ── Gradient fills full screen behind everything ─── */
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  /* ── Help button ──────────────────────────────────── */
  helpRow: {
    position: 'absolute',
    top: 0,
    right: 20,
    zIndex: 99,
  },
  helpBtn: {
    backgroundColor: Colors.helpBtnBg,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  helpText: {
    ...Theme.typography.presets.bodySm,
    fontWeight: '700',
    color: Colors.helpBtnText,
  },

  /* ── Logo section ─────────────────────────────────── */
  logoSection: {
    height: height * 0.30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: width * 0.26,
    height: width * 0.26,
  },
  wordmark: {
    width: width * 0.40,
    height: 38,
  },

  /* ── White form sheet ─────────────────────────────── */
  formSheet: {
    flex: 1,
    // backgroundColor: Colors.loginSheetBg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  formContent: {
    flex: 1,
  },

  /* Title */
  title: {
    ...Theme.typography.presets.h2,
    color: Colors.textPrimary,
    marginBottom: 24,
  },

  /* Input */
  inputCard: {
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 60,
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefix: {
    ...Theme.typography.presets.h4,
    color: Colors.inputText,
    marginRight: 12,
  },
  divider: {
    width: 1.5,
    height: 22,
    backgroundColor: Colors.divider,
    marginRight: 14,
  },
  input: {
    flex: 1,
    ...Theme.typography.presets.h3,
    color: Colors.inputText,
    padding: 0,
  },

  /* Error */
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '600',
  },

  /* Spacer */
  spacer: { flex: 1 },

  /* Agreement */
  agreementText: {
    ...Theme.typography.presets.caption,
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  linkText: {
    color: Colors.linkText,
    fontWeight: '700',
  },

  /* Next button */
  nextBtn: {
    marginBottom: Platform.OS === 'ios' ? 36 : 28,
    borderRadius: 14,
  },
  nextBtnDisabled: {
    opacity: Colors.disabledOpacity,
  },
});