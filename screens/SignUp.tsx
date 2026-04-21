import React from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, StatusBar } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Theme } from '../constants/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .required('First name is required'),
  lastName: Yup.string()
    .min(1, 'Too Short!')
    .required('Last name is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
});

export const SignUpScreen = ({ navigation }: any) => {
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
          <View style={{ width: 44 }} />
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Formik
          initialValues={{ firstName: '', lastName: '', phone: '', email: '' }}
          validationSchema={signUpSchema}
          onSubmit={(values) => {
            navigation.navigate('OTPVerification', { phone: values.phone });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              <View style={styles.introSection}>
                <Surface style={styles.iconCircle} elevation={0}>
                  <MaterialCommunityIcons name="account-plus-outline" size={32} color={Theme.colors.primary} />
                </Surface>

                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>
                  Join Hozify today and experience premium home services at your fingertips.
                </Text>
              </View>

              <View style={styles.formSection}>
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <Input
                      label="FIRST NAME"
                      placeholder="John"
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      error={touched.firstName && errors.firstName ? errors.firstName : undefined}
                    />
                  </View>
                  <View style={{ width: 12 }} />
                  <View style={{ flex: 1 }}>
                    <Input
                      label="LAST NAME"
                      placeholder="Doe"
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      error={touched.lastName && errors.lastName ? errors.lastName : undefined}
                    />
                  </View>
                </View>

                <View style={{ height: 16 }} />

                <Input
                  label="PHONE NUMBER"
                  placeholder="9998887776"
                  keyboardType="number-pad"
                  maxLength={10}
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  left={<View style={styles.prefixWrapper}><Text style={styles.prefixText}>+91</Text></View>}
                  error={touched.phone && errors.phone ? errors.phone : undefined}
                />

                <View style={{ height: 16 }} />

                <Input
                  label="EMAIL ADDRESS"
                  placeholder="john@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email && errors.email ? errors.email : undefined}
                />

                <View style={{ height: 32 }} />

                <TouchableOpacity
                  style={[styles.signUpBtn, (!isValid || !values.phone) && styles.signUpBtnDisabled]}
                  onPress={() => handleSubmit()}
                  disabled={!isValid || !values.phone}
                  activeOpacity={0.9}
                >
                  <Text style={styles.signUpBtnLabel}>Register Account</Text>
                  <View style={[styles.btnIconBox, (!isValid || !values.phone) && styles.disabledIconBox]}>
                    <MaterialCommunityIcons
                      name="arrow-right"
                      size={20}
                      color={(isValid && values.phone.length === 10) ? Theme.colors.primary : '#94A3B8'}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.footerLink}
                  onPress={() => navigation.navigate('Login')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.footerText}>
                    Already have an Account? <Text style={styles.link}>Sign in instead</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </Formik>
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
    paddingHorizontal: 24,
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
  formSection: {
    marginBottom: 32,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start' },

  prefixWrapper: {
    paddingLeft: 16,
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: Theme.colors.border,
    justifyContent: 'center',
    height: '100%',
  },
  prefixText: { fontSize: 15, fontWeight: '800', color: Theme.colors.text.primary },

  signUpBtn: {
    height: 64,
    backgroundColor: Theme.colors.text.primary,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  signUpBtnDisabled: {
    backgroundColor: '#E2E8F0',
  },
  signUpBtnLabel: {
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
  footerLink: { marginTop: 16, alignSelf: 'center' },
  footerText: { fontSize: 14, color: Theme.colors.text.muted, fontWeight: '700' },
  link: { color: Theme.colors.text.primary, fontWeight: '900', textDecorationLine: 'underline' },
});
