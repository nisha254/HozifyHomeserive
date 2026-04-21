import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
  TextInput as RNTextInput,
  Modal,
  KeyboardAvoidingView,
  Pressable,
  ImageBackground,
} from 'react-native';
import { Text } from 'react-native-paper';
import {
  ArrowLeft,
  HelpCircle,
  User,
  PhoneCall,
  Mail,
  UserCheck,
  CalendarDays,
  Award,
  BellRing,
  ChevronRight,
  X,
  UserCircle,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DatePickerModal } from 'react-native-paper-dates';
import * as Contacts from 'expo-contacts';
import { useStore } from '../store/useStore';
import { PrimaryButton } from '../components/PrimaryButton';
import { en, registerTranslation } from 'react-native-paper-dates';
import { Theme } from '../constants/Theme';
registerTranslation('en', en);

import { ScreenHeader } from '../components/ScreenHeader';

const ICON_SIZE = 22;

export const EditProfileScreen = ({ navigation }: any) => {
  const { user, updateProfile } = useStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState<'name' | 'email' | 'emergency' | null>(null);
  const [tempData, setTempData] = useState({
    firstName: '', lastName: '', email: '',
    emergencyName: '', emergencyPhone: '',
  });
  const [dateModalVisible, setDateModalVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setTempData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        emergencyName: user.emergencyContact?.name || '',
        emergencyPhone: user.emergencyContact?.phone || '',
      });
    }
  }, [user]);

  const showModal = (field: 'name' | 'email' | 'emergency') => {
    setEditingField(field);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setEditingField(null);
  };

  const handleSave = () => {
    if (editingField === 'name') {
      updateProfile({ firstName: tempData.firstName, lastName: tempData.lastName });
    } else if (editingField === 'email') {
      updateProfile({ email: tempData.email });
    } else if (editingField === 'emergency') {
      updateProfile({ emergencyContact: { name: tempData.emergencyName, phone: tempData.emergencyPhone } });
    }
    hideModal();
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleDateConfirm = (params: any) => {
    setDateModalVisible(false);
    updateProfile({ dob: params.date.toISOString().split('T')[0] });
    Alert.alert('Success', 'Date of Birth updated');
  };

  const pickContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      try {
        const result = await (Contacts as any).presentContactPickerAsync();
        if (result) {
          const name = result.name;
          const phone = result.phoneNumbers?.[0]?.number;
          if (name && phone) {
            updateProfile({ emergencyContact: { name, phone } });
            Alert.alert('Success', 'Emergency contact updated');
          }
        }
      } catch {
        showModal('emergency');
      }
    } else {
      showModal('emergency');
    }
  };

  // ── Modal title helper ────────────────────────────────────────────
  const modalTitle = editingField === 'name'
    ? 'Edit Name'
    : editingField === 'email'
      ? 'Edit Email'
      : 'Edit Emergency Contact';

  // ── Reusable profile row ──────────────────────────────────────────
  const FieldRow = ({
    IconComp,
    label,
    value,
    onPress,
    isRequired = false,
    showAdd = false,
  }: {
    IconComp: React.FC<any>;
    label: string;
    value?: string;
    onPress?: () => void;
    isRequired?: boolean;
    showAdd?: boolean;
  }) => (
    <TouchableOpacity
      style={styles.fieldItem}
      onPress={onPress}
      activeOpacity={onPress ? 0.6 : 1}
      disabled={!onPress}
    >
      <View style={styles.fieldLeft}>
        <View style={styles.iconBox}>
          <IconComp size={ICON_SIZE} color={Theme.colors.iconGray} strokeWidth={1.6} />
        </View>
        <View style={styles.fieldContent}>
          <Text style={styles.fieldLabel}>{label}</Text>
          <Text style={[styles.fieldValue, (!value && isRequired) && styles.requiredText]}>
            {value || (isRequired ? 'Required' : 'Not set')}
          </Text>
        </View>
      </View>

      {showAdd && (
        <Text style={styles.addText}>Add</Text>
      )}
      {!showAdd && onPress && (
        <ChevronRight size={20} color={Theme.colors.text.muted} strokeWidth={2.5} />
      )}
    </TouchableOpacity>
  );

  // ── Input box used inside modal ───────────────────────────────────
  const InputBox = ({
    IconComp,
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
    autoCapitalize = 'words',
  }: any) => (
    <View style={styles.inputBox}>
      <IconComp size={20} color={Theme.colors.iconGray} strokeWidth={1.6} style={{ marginRight: 12 }} />
      <RNTextInput
        style={styles.inputText}
        placeholder={placeholder}
        placeholderTextColor={Theme.colors.text.muted}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {value?.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <X size={16} color={Theme.colors.text.muted} strokeWidth={2} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.root}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* ── Header ─────────────────────────────────────────── */}
      <ScreenHeader
        title="Edit Profile"
        subTitle="Keep your profile up to date"
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity
            style={styles.helpPill}
            onPress={() => navigation.navigate('Help')}
            activeOpacity={0.8}
          >
            {/* <HelpCircle size={18} color={Theme.colors.text.primary} strokeWidth={1.8} /> */}
            <Text style={styles.helpText}>Help</Text>
          </TouchableOpacity>
        }
      />

      {/* ── Field list ─────────────────────────────────────── */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        <FieldRow IconComp={User} label="Name" value={`${user?.firstName || ''} ${user?.lastName || ''}`.trim() || undefined} onPress={() => showModal('name')} isRequired />
        <View style={styles.rowDivider} />

        <FieldRow IconComp={PhoneCall} label="Phone Number" value={`+91 ${user?.phone || '8305724284'}`} />
        <View style={styles.rowDivider} />

        <FieldRow IconComp={Mail} label="Email" value={user?.email} onPress={() => showModal('email')} isRequired />
        <View style={styles.rowDivider} />

        <FieldRow IconComp={UserCheck} label="Gender" value={user?.gender || 'Male'} />
        <View style={styles.rowDivider} />

        <FieldRow IconComp={CalendarDays} label="Date of Birth" value={user?.dob} onPress={() => setDateModalVisible(true)} isRequired />
        <View style={styles.rowDivider} />

        <FieldRow IconComp={Award} label="Member Since" value="April 2026" />
        <View style={styles.rowDivider} />

        <FieldRow
          IconComp={BellRing}
          label="Emergency contact"
          value={user?.emergencyContact?.name}
          onPress={pickContact}
          isRequired
          showAdd={!user?.emergencyContact}
        />

      </ScrollView>

      {/* ── Date Picker ────────────────────────────────────── */}
      <DatePickerModal
        locale="en"
        mode="single"
        visible={dateModalVisible}
        onDismiss={() => setDateModalVisible(false)}
        date={user?.dob ? new Date(user.dob) : undefined}
        onConfirm={handleDateConfirm}
        label="Select Date of Birth"
      />

      {/* ── Bottom Sheet Modal ─────────────────────────────── */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={hideModal}
        statusBarTranslucent
      >
        {/* Dim overlay */}
        <Pressable style={styles.overlay} onPress={hideModal} />

        {/* Floating close button — sits ABOVE the sheet */}
        <View style={styles.floatingClose}>
          <TouchableOpacity style={styles.closeCircle} onPress={hideModal} activeOpacity={0.8}>
            <X size={20} color="#0F172A" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        {/* Sheet */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.sheetWrapper}
        >
          <View style={styles.sheet}>
            {/* Drag handle */}
            <View style={styles.dragHandle} />

            <Text style={styles.sheetTitle}>{modalTitle}</Text>

            <View style={styles.inputSection}>
              {editingField === 'name' && (
                <>
                  <InputBox
                    IconComp={UserCircle}
                    placeholder="First Name"
                    value={tempData.firstName}
                    onChangeText={(t: string) => setTempData({ ...tempData, firstName: t })}
                  />
                  <View style={{ height: 14 }} />
                  <InputBox
                    IconComp={UserCircle}
                    placeholder="Last Name"
                    value={tempData.lastName}
                    onChangeText={(t: string) => setTempData({ ...tempData, lastName: t })}
                  />
                </>
              )}

              {editingField === 'email' && (
                <InputBox
                  IconComp={Mail}
                  placeholder="Email address"
                  value={tempData.email}
                  onChangeText={(t: string) => setTempData({ ...tempData, email: t })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}

              {editingField === 'emergency' && (
                <>
                  <InputBox
                    IconComp={User}
                    placeholder="Contact Name"
                    value={tempData.emergencyName}
                    onChangeText={(t: string) => setTempData({ ...tempData, emergencyName: t })}
                  />
                  <View style={{ height: 14 }} />
                  <InputBox
                    IconComp={PhoneCall}
                    placeholder="Phone Number"
                    value={tempData.emergencyPhone}
                    onChangeText={(t: string) => setTempData({ ...tempData, emergencyPhone: t })}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                  />
                </>
              )}
            </View>

            <PrimaryButton
              label="Save Changes"
              onPress={handleSave}
              style={styles.saveBtn}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Theme.colors.background },

  /* Header styles (if any needed for helpPill) */
  helpPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1.5,
    backgroundColor: Theme.colors.orange,
    borderColor: Theme.colors.border,
  },
  helpText: { fontSize: 14, fontWeight: '700', color: Theme.colors.white },

  scrollContent: { paddingVertical: 8 },

  /* Field row */
  fieldItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
    minHeight: 76,
  },
  fieldLeft: { flexDirection: 'row', alignItems: 'center', gap: 16, flex: 1 },
  iconBox: { width: 28, alignItems: 'center' },
  fieldContent: { flex: 1 },
  fieldLabel: { fontSize: 15, fontWeight: '800', color: Theme.colors.text.primary, marginBottom: 3 },
  fieldValue: { fontSize: 14, color: Theme.colors.text.secondary, fontWeight: '500' },
  requiredText: { color: Theme.colors.orange, fontWeight: '600' },
  addText: { fontSize: 15, fontWeight: '900', color: Theme.colors.brandBlue },
  rowDivider: {
    height: 1,
    // backgroundColor: Theme.colors.borderLight,
    marginHorizontal: 20
  },

  /* ── Modal overlay ─────────────────────────────────────── */
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.colors.overlay,
  },

  /* Floating × above the sheet */
  floatingClose: {
    position: 'absolute',
    right: 16,
    bottom: 310,           // sits just above the sheet top edge
    zIndex: 10,
  },
  closeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },

  /* Sheet */
  sheetWrapper: { justifyContent: 'flex-end', flex: 1 },
  sheet: {
    backgroundColor: Theme.colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    minHeight: 300,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Theme.colors.text.muted,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Theme.colors.text.primary,
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  inputSection: { marginBottom: 28 },

  /* Input box */
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 58,
    backgroundColor: Theme.colors.surface,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text.primary,
  },

  saveBtn: { borderRadius: 14 },
});