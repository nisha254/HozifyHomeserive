import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ImageBackground,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useStore } from '../store/useStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingDialog } from '../components/LoadingDialog';
import { CalendarPicker } from '../components/CalendarPicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ArrowLeft, ChevronRight, Gift } from 'lucide-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

const profileSchema = Yup.object().shape({
  fullName: Yup.string().min(2, 'Too short').required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits').required('Phone is required'),
  dob: Yup.string(),
});

const formatDate = (date: Date) => {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

export const ProfileSetupScreen = ({ navigation }: any) => {
  const { updateProfile } = useStore();
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [emergencyContacts, setEmergencyContacts] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2000, 0, 1));

  const handleSave = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      const nameParts = values.fullName?.trim().split(' ') || [];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      updateProfile({ ...values, firstName, lastName, gender });
      navigation.navigate('AreaSelection');
    }, 1500);
  };

  const handleAddEmergency = () => {
    Alert.alert('Add Emergency Contact', 'Enter contact number', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Add',
        onPress: () => {
          setEmergencyContacts((prev) => [...prev, '+91 XXXXXXXXXX']);
        },
      },
    ]);
  };

  return (
    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.root}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LoadingDialog visible={loading} />

      {/* ── HEADER ─────────────────────────────────────── */}
      <SafeAreaView edges={['top']}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color="#0F172A" strokeWidth={2.5} />
          </TouchableOpacity>

          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle}>Add Profile</Text>
            <Text style={styles.headerSub}>Add your personal details</Text>
          </View>

          {/* Help button */}
          <TouchableOpacity style={styles.helpBtn} activeOpacity={0.8}>
            <MaterialCommunityIcons name="help-circle-outline" size={16} color="#FFFFFF" />
            <Text style={styles.helpText}>Help</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* ── Referral Banner ──────────────────────────── */}
      <TouchableOpacity style={styles.referralBanner} activeOpacity={0.85}>
        <View style={styles.referralIcon}>
          <Gift size={20} color="#FFFFFF" strokeWidth={2} />
        </View>
        <View style={styles.referralTexts}>
          <Text style={styles.referralTitle}>Earn rewards with referrals</Text>
          <Text style={styles.referralSub}>Generate your referral code & invite friends</Text>
        </View>
        <ChevronRight size={18} color="#FFFFFF" strokeWidth={2.5} />
      </TouchableOpacity>

      {/* ── WHITE SHEET ────────────────────────────────── */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <View style={styles.sheet}>



          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Formik
              initialValues={{ fullName: '', email: '', phone: '', dob: '' }}
              validationSchema={profileSchema}
              onSubmit={handleSave}
            >
              {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                <View style={styles.form}>

                  {/* Full Name */}
                  <Field
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={values.fullName}
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    error={touched.fullName && errors.fullName ? errors.fullName : ''}
                  />

                  {/* Email */}
                  <Field
                    label="Email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={touched.email && errors.email ? errors.email : ''}
                  />

                  {/* Phone */}
                  <Field
                    label="Phone"
                    placeholder="Enter your phone number"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    keyboardType="number-pad"
                    maxLength={10}
                    error={touched.phone && errors.phone ? errors.phone : ''}
                  />

                  {/* Gender */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>Gender</Text>
                    <View style={styles.genderRow}>
                      <TouchableOpacity
                        style={styles.radioOption}
                        onPress={() => setGender('male')}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.radioCircle, gender === 'male' && styles.radioSelected]}>
                          {gender === 'male' && <View style={styles.radioDot} />}
                        </View>
                        <Text style={styles.radioLabel}>Male</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.radioOption}
                        onPress={() => setGender('female')}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.radioCircle, gender === 'female' && styles.radioSelected]}>
                          {gender === 'female' && <View style={styles.radioDot} />}
                        </View>
                        <Text style={styles.radioLabel}>Female</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Date of Birth */}
                  <CalendarPicker
                    label="Date of Birth"
                    value={selectedDate}
                    onChange={(date) => {
                      if (date) {
                        setSelectedDate(date);
                        setFieldValue('dob', formatDate(date));
                      }
                    }}
                  />

                  {/* Emergency Contacts */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>
                      Add Emergency contact{' '}
                      <Text style={styles.optionalText}>(Optional)</Text>
                    </Text>

                    {/* Added contacts */}
                    {emergencyContacts.map((contact, idx) => (
                      <View key={idx} style={styles.emergencyContact}>
                        <MaterialCommunityIcons name="phone" size={16} color="#003B95" />
                        <Text style={styles.emergencyContactText}>{contact}</Text>
                      </View>
                    ))}

                    {/* Add button — dashed border */}
                    <TouchableOpacity
                      style={styles.addEmergencyBtn}
                      onPress={handleAddEmergency}
                      activeOpacity={0.7}
                    >
                      <MaterialCommunityIcons name="plus" size={18} color="#003B95" />
                      <Text style={styles.addEmergencyText}>Add Emergency Contact</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Save button */}
                  <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={() => handleSubmit()}
                    activeOpacity={0.88}
                  >
                    <Text style={styles.saveBtnText}>Save & Continue</Text>
                    <ChevronRight size={20} color="#FFFFFF" strokeWidth={2.5} />
                  </TouchableOpacity>

                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

/* ── Field Component ──────────────────────────────────────── */
const Field = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  keyboardType,
  autoCapitalize,
  maxLength,
  error,
}: any) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      style={[styles.input, error ? styles.inputError : null]}
      placeholder={placeholder}
      placeholderTextColor="#CBD5E1"
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      keyboardType={keyboardType || 'default'}
      autoCapitalize={autoCapitalize || 'words'}
      maxLength={maxLength}
    />
    {!!error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

/* ── Styles ───────────────────────────────────────────────── */
const styles = StyleSheet.create({

  root: {
    flex: 1,
  },

  /* Header */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitles: { flex: 1 },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  headerSub: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
    marginTop: 1,
  },
  helpBtn: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 99,
  },
  helpText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* Keyboard + sheet */
  keyboardView: {
    flex: 1,
  },
  sheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginHorizontal: 20,
    overflow: 'hidden',
  },

  /* Referral banner */
  referralBanner: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#003B95',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 12,
  },
  referralIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  referralTexts: { flex: 1 },
  referralTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  referralSub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '400',
    marginTop: 2,
  },

  /* Scroll */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  form: { gap: 4 },

  /* Field */
  fieldGroup: { marginBottom: 20 },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  optionalText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#94A3B8',
  },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '500',
    color: '#0F172A',
    backgroundColor: '#FAFAFA',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '600',
    marginTop: 4,
    marginLeft: 2,
  },

  /* Gender */
  genderRow: {
    flexDirection: 'row',
    gap: 24,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#003B95',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#003B95',
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0F172A',
  },

  /* Emergency contact */
  emergencyContact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  emergencyContactText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#003B95',
  },
  addEmergencyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    borderRadius: 12,
    height: 50,
    backgroundColor: '#FAFAFA',
  },
  addEmergencyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#003B95',
  },

  /* Save button */
  saveBtn: {
    height: 54,
    borderRadius: 14,
    backgroundColor: '#003B95',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});