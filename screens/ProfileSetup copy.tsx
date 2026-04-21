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
  Modal,
  Text as RNText,
  Image,
  Alert,
} from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useStore } from '../store/useStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingDialog } from '../components/LoadingDialog';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Theme } from '../constants/Theme';
import { CalendarPicker } from '../components/CalendarPicker';

import {
  ArrowLeft,
  Camera,
  User,
  Mail,
  CalendarDays,
  MapPin,
  Tag,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  ImagePlus,
} from 'lucide-react-native';

// ── Validation ─────────────────────────────────────────────────────────────────
const profileSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too short').required('First Name is required'),
  lastName: Yup.string().min(1, 'Too short').required('Last Name is required'),
  dob: Yup.string(),
  email: Yup.string().email('Invalid email').required('Email is required'),
  fullAddress: Yup.string().min(10, 'Please provide more detail').required('Full Address is required'),
});

// ── Date helper ────────────────────────────────────────────────────────────────
const formatDate = (date: Date) => {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

// ── Main Component ─────────────────────────────────────────────────────────────
export const ProfileSetupScreen = ({ navigation }: any) => {
  const { updateProfile } = useStore();
  const [loading, setLoading] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // Date picker state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2000, 0, 1));
  const [tempDate, setTempDate] = useState<Date>(new Date(2000, 0, 1));


  const openCamera = async () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        cameraType: 'front',
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Camera error');
          return;
        }

        if (response.assets && response.assets.length > 0) {
          setPhotoUri(response.assets[0].uri || null);
        }
      }
    );
  };

  const openGallery = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Gallery error');
          return;
        }

        if (response.assets && response.assets.length > 0) {
          setPhotoUri(response.assets[0].uri || null);
        }
      }
    );
  };

  const handlePhotoPress = () => {
    Alert.alert(
      'Profile Photo',
      'Choose how you want to add your photo',
      [
        { text: 'Take Photo', onPress: openCamera },
        { text: 'Choose from Gallery', onPress: openGallery },
        photoUri ? { text: 'Remove Photo', style: 'destructive', onPress: () => setPhotoUri(null) } : null,
        { text: 'Cancel', style: 'cancel' },
      ].filter(Boolean) as any[],
    );
  };

  // ── Save ──────────────────────────────────────────────────────────────────────
  const handleSave = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateProfile({ ...values, photoUri });
      navigation.navigate('AreaSelection');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LoadingDialog visible={loading} />

      {/* ── Simple Header ── */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backBtnInner} onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <ArrowLeft size={20} color="#0F172A" strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile Setup</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* ── Avatar ── */}
          <View style={styles.avatarSection}>
            <TouchableOpacity style={styles.avatarWrapper} activeOpacity={0.85} onPress={handlePhotoPress}>
              <View style={styles.avatarRing}>
                {photoUri ? (
                  <Image source={{ uri: photoUri }} style={styles.avatarImage} />
                ) : (
                  <Avatar.Icon
                    size={100}
                    icon="account"
                    color="#FFFFFF"
                    style={{ backgroundColor: Theme.colors.border }}
                  />
                )}
              </View>
              {/* Camera badge */}
              <View style={styles.cameraBadge}>
                {photoUri
                  ? <Camera size={16} color="#FFFFFF" strokeWidth={2.5} />
                  : <ImagePlus size={16} color="#FFFFFF" strokeWidth={2.5} />
                }
              </View>
            </TouchableOpacity>

            <Text style={styles.avatarLabel}>
              {photoUri ? 'Tap to change photo' : 'Tap to upload photo'}
            </Text>
          </View>
        </SafeAreaView>
      </View>

      {/* ── Form ── */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Formik
          initialValues={{ firstName: '', lastName: '', dob: '', email: '', fullAddress: '', referral: '' }}
          validationSchema={profileSchema}
          onSubmit={handleSave}
        >
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.card}>

                {/* Section header */}
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionAccent} />
                  <Text style={styles.sectionTitle}>Basic Information</Text>
                </View>

                {/* First + Last Name */}
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <FieldLabel label="First Name" />
                    <InputBox hasError={!!(touched.firstName && errors.firstName)} errorText={errors.firstName} icon={<User size={18} color={touched.firstName && errors.firstName ? '#EF4444' : '#3D47B0'} strokeWidth={2} />}>
                      <TextInput placeholder="John" placeholderTextColor="#A0AEC0" value={values.firstName} onChangeText={handleChange('firstName')} onBlur={handleBlur('firstName')} style={styles.input} />
                    </InputBox>
                  </View>
                  <View style={{ width: 14 }} />
                  <View style={{ flex: 1 }}>
                    <FieldLabel label="Last Name" />
                    <InputBox hasError={!!(touched.lastName && errors.lastName)} errorText={errors.lastName} icon={<User size={18} color={touched.lastName && errors.lastName ? '#EF4444' : '#3D47B0'} strokeWidth={2} />}>
                      <TextInput placeholder="Doe" placeholderTextColor="#A0AEC0" value={values.lastName} onChangeText={handleChange('lastName')} onBlur={handleBlur('lastName')} style={styles.input} />
                    </InputBox>
                  </View>
                </View>

                {/* Email */}
                <FieldLabel label="Email Address" />
                <InputBox hasError={!!(touched.email && errors.email)} errorText={errors.email} icon={<Mail size={18} color={touched.email && errors.email ? '#EF4444' : '#3D47B0'} strokeWidth={2} />}>
                  <TextInput placeholder="john@example.com" placeholderTextColor="#A0AEC0" keyboardType="email-address" autoCapitalize="none" value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} style={styles.input} />
                </InputBox>

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

                {/* Full Address */}
                <FieldLabel label="Full Address" />
                <InputBox hasError={!!(touched.fullAddress && errors.fullAddress)} errorText={errors.fullAddress} icon={<MapPin size={18} color={touched.fullAddress && errors.fullAddress ? '#EF4444' : '#3D47B0'} strokeWidth={2} />} multiline>
                  <TextInput placeholder="House, Street, City, State..." placeholderTextColor="#A0AEC0" multiline numberOfLines={3} value={values.fullAddress} onChangeText={handleChange('fullAddress')} onBlur={handleBlur('fullAddress')} style={[styles.input, styles.textAreaInput]} textAlignVertical="top" />
                </InputBox>

                {/* Referral */}
                <View style={styles.referralWrapper}>
                  <Tag size={16} color="#3D47B0" strokeWidth={2} />
                  <Text style={styles.referralLabel}>Have a referral code?</Text>
                </View>
                <InputBox icon={<Tag size={18} color="#3D47B0" strokeWidth={2} />}>
                  <TextInput placeholder="COUPON100" placeholderTextColor="#A0AEC0" autoCapitalize="characters" value={values.referral} onChangeText={handleChange('referral')} style={styles.input} />
                </InputBox>

                {/* Submit */}
                <TouchableOpacity style={styles.submitBtn} onPress={() => handleSubmit()} activeOpacity={0.88}>
                  <Text style={styles.submitText}>Save & Continue</Text>
                  <ChevronRight size={20} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>


            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
};

// ── Sub-components ─────────────────────────────────────────────────────────────
const FieldLabel = ({ label }: { label: string }) => (
  <Text style={styles.fieldLabel}>{label}</Text>
);

const InputBox = ({
  children,
  hasError,
  errorText,
  icon,
  multiline,
}: {
  children: React.ReactNode;
  hasError?: boolean;
  errorText?: string;
  icon?: React.ReactNode;
  multiline?: boolean;
}) => (
  <View style={styles.inputGroupWrapper}>
    <View style={[styles.inputContainer, multiline && styles.multilineContainer, hasError && styles.inputError]}>
      {icon && <View style={styles.fieldIcon}>{icon}</View>}
      {children}
    </View>
    {hasError && errorText && (
      <View style={styles.errorRow}>
        <AlertCircle size={13} color="#EF4444" strokeWidth={2} />
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
    )}
  </View>
);

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  header: { borderBottomWidth: 1, borderBottomColor: Theme.colors.border, backgroundColor: '#FFFFFF', paddingBottom: 24 },
  headerRow: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 8 },
  headerTitle: { fontSize: 18, fontWeight: '900', color: Theme.colors.text.primary, letterSpacing: -0.5 },
  backBtnInner: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Theme.colors.border },

  avatarSection: { alignItems: 'center', marginTop: 12 },
  avatarWrapper: { position: 'relative' },
  avatarRing: { borderRadius: 60, overflow: 'hidden', borderWidth: 1, borderColor: Theme.colors.border },
  avatarImage: { width: 100, height: 100, borderRadius: 50 },
  cameraBadge: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: Theme.colors.primary, width: 34, height: 34, borderRadius: 17,
    justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FFFFFF',
  },
  avatarLabel: { marginTop: 12, fontSize: 14, fontWeight: '700', color: Theme.colors.text.secondary },

  scrollContent: { paddingVertical: 24, paddingHorizontal: 20 },
  card: { gap: 4 },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  sectionAccent: { width: 4, height: 20, backgroundColor: Theme.colors.primary, borderRadius: 4, marginRight: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: Theme.colors.text.primary },

  row: { flexDirection: 'row', marginBottom: 4 },
  fieldLabel: { fontSize: 14, fontWeight: '800', color: Theme.colors.text.primary, marginBottom: 8, marginLeft: 2 },

  inputGroupWrapper: { marginBottom: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', height: 56, borderRadius: 16, borderWidth: 1.5, borderColor: '#F1F5F9', backgroundColor: '#F8FAFC', paddingHorizontal: 16 },
  multilineContainer: { height: 100, alignItems: 'flex-start', paddingVertical: 14 },
  inputError: { borderColor: Theme.colors.status.error, backgroundColor: '#FFF5F5' },
  fieldIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15, fontWeight: '700', color: Theme.colors.text.primary, padding: 0 },
  textAreaInput: { paddingTop: 2, lineHeight: 22 },

  dateField: { justifyContent: 'space-between' },
  dateText: { flex: 1, fontSize: 15, fontWeight: '700', color: Theme.colors.text.primary },
  placeholder: { color: '#94A3B8', fontWeight: '600' },

  errorRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, marginLeft: 4 },
  errorText: { fontSize: 13, color: Theme.colors.status.error, marginLeft: 6, fontWeight: '700' },

  referralWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, marginLeft: 2 },
  referralLabel: { fontSize: 14, fontWeight: '800', color: Theme.colors.text.primary, marginLeft: 8 },

  submitBtn: {
    marginTop: 20,
    height: 58,
    borderRadius: 16,
    backgroundColor: Theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  submitText: { fontSize: 16, fontWeight: '900', color: '#FFFFFF' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  pickerSheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingBottom: 40 },
  pickerHandle: { width: 40, height: 5, borderRadius: 4, backgroundColor: '#E2E8F0', alignSelf: 'center', marginTop: 12 },
  pickerHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  pickerTitle: { fontSize: 18, fontWeight: '900', color: Theme.colors.text.primary },
  pickerCancel: { fontSize: 16, fontWeight: '700', color: Theme.colors.text.secondary },
  pickerDone: { fontSize: 16, fontWeight: '900', color: Theme.colors.primary },
});