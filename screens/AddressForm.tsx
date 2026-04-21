import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Briefcase,
  MapPin,
  MapPinned,
  ShieldCheck,
  Plus,
  Minus,
} from 'lucide-react-native';
import { Theme } from '../constants/Theme';
import { ScreenHeader } from '../components/ScreenHeader';

type IconName = 'home' | 'briefcase' | 'map-pin';

interface SavedAddress {
  id: string;
  type: string;
  icon: IconName;
  address: string;
  landmark: string;
  isDefault?: boolean;
}

interface AddressType {
  label: string;
  icon: IconName;
}

const SAVED_ADDRESSES: SavedAddress[] = [
  {
    id: '1',
    type: 'Home',
    icon: 'home',
    address: 'B-402, Green Valley Apartments, Sector 12',
    landmark: 'Near City Park',
    isDefault: true,
  },
  {
    id: '2',
    type: 'Office',
    icon: 'briefcase',
    address: 'Tech Hub, 4th Floor, Tower B, Cyber City',
    landmark: 'Opposite Metro Station',
  },
];

const ADDRESS_TYPES: AddressType[] = [
  { label: 'Home', icon: 'home' },
  { label: 'Work', icon: 'briefcase' },
  { label: 'Other', icon: 'map-pin' },
];

// ─── Icon resolver ────────────────────────────────────────────────────────────
const AddrIcon = ({
  icon,
  size = 16,
  color,
}: {
  icon: IconName;
  size?: number;
  color: string;
}) => {
  if (icon === 'home') return <Home size={size} color={color} strokeWidth={1.6} />;
  if (icon === 'briefcase') return <Briefcase size={size} color={color} strokeWidth={1.6} />;
  return <MapPin size={size} color={color} strokeWidth={1.6} />;
};

// ─── AddressCard ──────────────────────────────────────────────────────────────
const AddressCard = ({
  item,
  selected,
  onPress,
}: {
  item: SavedAddress;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.addrCard, selected && styles.addrCardSelected]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <View style={styles.addrHead}>
      <View style={[styles.addrIcon, selected && styles.addrIconSelected]}>
        <AddrIcon
          icon={item.icon}
          size={16}
          color={selected ? Theme.colors.text.onPrimary : Theme.colors.primary}
        />
      </View>

      <View style={styles.addrMeta}>
        <Text style={[styles.addrType, selected && styles.addrTypeSelected]}>
          {item.type}
        </Text>
        {item.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultBadgeText}>Default</Text>
          </View>
        )}
      </View>

      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
    </View>

    <Text style={styles.addrText} numberOfLines={2}>
      {item.address}
    </Text>

    <View style={styles.landmarkRow}>
      <MapPinned size={13} color={Theme.colors.text.muted} strokeWidth={1.5} />
      <Text style={styles.landmarkText}>{item.landmark}</Text>
    </View>
  </TouchableOpacity>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
export const AddressFormScreen = ({ navigation }: { navigation: any }) => {
  const [selectedId, setSelectedId] = useState('1');
  const [showForm, setShowForm] = useState(false);
  const [addrType, setAddrType] = useState('Home');
  const [addrInput, setAddrInput] = useState('');
  const [landmark, setLandmark] = useState('');
  const [addrError, setAddrError] = useState(false);

  const selectedAddr = SAVED_ADDRESSES.find(a => a.id === selectedId);
  const footerLabel = selectedAddr
    ? `${selectedAddr.type} · ${selectedAddr.address.split(',').pop()?.trim()}`
    : '';

  const handleSave = () => {
    if (!addrInput.trim()) {
      setAddrError(true);
      return;
    }
    setAddrError(false);
    setShowForm(false);
    setAddrInput('');
    setLandmark('');
  };

  return (
    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.root}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <ScreenHeader
        title="Select address"
        subTitle="Add details for technician arrival"
        onBack={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero */}
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Where to?</Text>
            <Text style={styles.heroSub}>We'll send our expert team to your door</Text>
          </View>

          {/* Saved Addresses */}
          <Text style={styles.sectionLabel}>Saved addresses</Text>
          <View style={styles.addrList}>
            {SAVED_ADDRESSES.map(item => (
              <AddressCard
                key={item.id}
                item={item}
                selected={selectedId === item.id}
                onPress={() => setSelectedId(item.id)}
              />
            ))}
          </View>

          {/* Add New Trigger */}
          <TouchableOpacity
            style={styles.addTrigger}
            onPress={() => setShowForm(v => !v)}
            activeOpacity={0.8}
          >
            <View style={[styles.addIcon, showForm && styles.addIconActive]}>
              {showForm ? (
                <Minus size={16} color={Theme.colors.text.onPrimary} strokeWidth={2} />
              ) : (
                <Plus size={16} color={Theme.colors.primary} strokeWidth={2} />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.addLabel}>
                {showForm ? 'Hide form' : 'Add a new address'}
              </Text>
              <Text style={styles.addSub}>Pin a new location for your services</Text>
            </View>
          </TouchableOpacity>

          {/* New Address Form */}
          {showForm && (
            <View style={styles.formBox}>
              <Text style={styles.formLbl}>Address type</Text>
              <View style={styles.typeRow}>
                {ADDRESS_TYPES.map(t => {
                  const active = addrType === t.label;
                  return (
                    <TouchableOpacity
                      key={t.label}
                      style={[styles.typeChip, active && styles.typeChipActive]}
                      onPress={() => setAddrType(t.label)}
                      activeOpacity={0.8}
                    >
                      <AddrIcon
                        icon={t.icon}
                        size={13}
                        color={
                          active
                            ? Theme.colors.text.onPrimary
                            : Theme.colors.text.secondary
                        }
                      />
                      <Text
                        style={[
                          styles.typeChipText,
                          active && styles.typeChipTextActive,
                        ]}
                      >
                        {t.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={styles.formLbl}>House / flat / area</Text>
              <TextInput
                style={[styles.field, addrError && styles.fieldError]}
                placeholder="e.g. B-402, Green Valley Apartments"
                placeholderTextColor={Theme.colors.text.muted}
                value={addrInput}
                onChangeText={v => {
                  setAddrInput(v);
                  setAddrError(false);
                }}
              />
              {addrError && (
                <Text style={styles.fieldErrorText}>Address is required</Text>
              )}

              <Text style={[styles.formLbl, { marginTop: Theme.geometry.spacing.md }]}>
                Landmark (optional)
              </Text>
              <TextInput
                style={styles.field}
                placeholder="e.g. Near City Park"
                placeholderTextColor={Theme.colors.text.muted}
                value={landmark}
                onChangeText={setLandmark}
              />

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSave}
                activeOpacity={0.85}
              >
                <Text style={styles.saveBtnText}>Save address</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Privacy Card */}
          <View style={styles.privacyCard}>
            <View style={styles.privacyIconBox}>
              <ShieldCheck
                size={18}
                color={Theme.colors.primary}
                strokeWidth={1.6}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.privacyTitle}>Privacy assurance</Text>
              <Text style={styles.privacyText}>
                Your data is safe with us. We only share details with verified service partners.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer */}
      <SafeAreaView edges={['bottom']} style={styles.footerSafe}>
        <View style={styles.footer}>
          <View style={styles.footerInfo}>
            <Text style={styles.footerLbl}>Delivering to</Text>
            <Text style={styles.footerAddr} numberOfLines={1}>
              {footerLabel}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => navigation.navigate('SlotSelection')}
            activeOpacity={0.85}
          >
            <Text style={styles.confirmBtnText}>Confirm location</Text>
            <ArrowRight
              size={16}
              color={Theme.colors.text.onPrimary}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },

  // Scroll
  scrollContent: {
    paddingBottom: 130,
  },

  // Hero
  hero: {
    paddingHorizontal: Theme.geometry.spacing.lg,
    paddingTop: Theme.geometry.spacing.lg,
    paddingBottom: Theme.geometry.spacing.md,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: Theme.colors.text.primary,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  heroSub: {
    fontSize: 14,
    color: Theme.colors.text.secondary,
  },

  // Section label
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Theme.colors.text.muted,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    paddingHorizontal: Theme.geometry.spacing.lg,
    marginBottom: Theme.geometry.spacing.sm,
  },

  // Address list
  addrList: {
    paddingHorizontal: Theme.geometry.spacing.lg,
    gap: Theme.geometry.spacing.sm,
    marginBottom: Theme.geometry.spacing.md,
  },
  addrCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.geometry.radius.md,
    borderWidth: 0.5,
    borderColor: Theme.colors.border,
    padding: Theme.geometry.spacing.md,
    ...Theme.shadows.soft,
  },
  addrCardSelected: {
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.primaryLight,
  },
  addrHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.geometry.spacing.sm,
    marginBottom: Theme.geometry.spacing.sm,
  },
  addrIcon: {
    width: 36,
    height: 36,
    borderRadius: Theme.geometry.radius.sm,
    backgroundColor: Theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  addrIconSelected: {
    backgroundColor: Theme.colors.primary,
  },
  addrMeta: {
    flex: 1,
  },
  addrType: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.text.primary,
  },
  addrTypeSelected: {
    color: Theme.colors.primary,
  },
  defaultBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Theme.colors.status.success + '22',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Theme.geometry.radius.xs,
    marginTop: 3,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: Theme.colors.status.success,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: Theme.geometry.radius.full,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  radioSelected: {
    borderColor: Theme.colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: Theme.geometry.radius.full,
    backgroundColor: Theme.colors.primary,
  },
  addrText: {
    fontSize: 13,
    color: Theme.colors.text.secondary,
    lineHeight: 20,
    marginBottom: Theme.geometry.spacing.sm,
  },
  landmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  landmarkText: {
    fontSize: 12,
    color: Theme.colors.text.muted,
  },

  // Add trigger
  addTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.geometry.spacing.md,
    paddingHorizontal: Theme.geometry.spacing.lg,
    paddingVertical: Theme.geometry.spacing.md,
    backgroundColor: Theme.colors.surface,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Theme.colors.border,
    marginBottom: Theme.geometry.spacing.md,
  },
  addIcon: {
    width: 38,
    height: 38,
    borderRadius: Theme.geometry.radius.sm,
    backgroundColor: Theme.colors.primaryLight,
    borderWidth: 0.5,
    borderColor: Theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  addIconActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  addLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.text.primary,
    marginBottom: 2,
  },
  addSub: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
  },

  // Form
  formBox: {
    marginHorizontal: Theme.geometry.spacing.lg,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.geometry.radius.md,
    borderWidth: 0.5,
    borderColor: Theme.colors.border,
    padding: Theme.geometry.spacing.md,
    marginBottom: Theme.geometry.spacing.md,
    ...Theme.shadows.soft,
  },
  formLbl: {
    fontSize: 11,
    fontWeight: '600',
    color: Theme.colors.text.muted,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    marginBottom: Theme.geometry.spacing.sm,
  },
  typeRow: {
    flexDirection: 'row',
    gap: Theme.geometry.spacing.sm,
    marginBottom: Theme.geometry.spacing.md,
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Theme.geometry.spacing.md,
    paddingVertical: Theme.geometry.spacing.sm,
    borderRadius: Theme.geometry.radius.sm,
    borderWidth: 0.5,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.background,
  },
  typeChipActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  typeChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.colors.text.secondary,
  },
  typeChipTextActive: {
    color: Theme.colors.text.onPrimary,
  },
  field: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: Theme.colors.border,
    borderRadius: Theme.geometry.radius.sm,
    paddingHorizontal: Theme.geometry.spacing.md,
    paddingVertical: Theme.geometry.spacing.sm + 3,
    fontSize: 14,
    color: Theme.colors.text.primary,
    backgroundColor: Theme.colors.surface,
  },
  fieldError: {
    borderColor: Theme.colors.status.error,
  },
  fieldErrorText: {
    fontSize: 12,
    color: Theme.colors.status.error,
    marginTop: 4,
  },
  saveBtn: {
    marginTop: Theme.geometry.spacing.md,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.geometry.radius.sm,
    paddingVertical: 13,
    alignItems: 'center',
  },
  saveBtnText: {
    color: Theme.colors.text.onPrimary,
    fontSize: 14,
    fontWeight: '600',
  },

  // Privacy
  privacyCard: {
    marginHorizontal: Theme.geometry.spacing.lg,
    marginBottom: Theme.geometry.spacing.md,
    backgroundColor: Theme.colors.primaryLight,
    borderRadius: Theme.geometry.radius.md,
    borderWidth: 0.5,
    borderColor: Theme.colors.border,
    padding: Theme.geometry.spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Theme.geometry.spacing.md,
  },
  privacyIconBox: {
    width: 34,
    height: 34,
    borderRadius: Theme.geometry.radius.sm,
    backgroundColor: Theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  privacyTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.text.primary,
    marginBottom: 3,
  },
  privacyText: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
    lineHeight: 18,
  },

  // Footer
  footerSafe: {
    backgroundColor: Theme.colors.surface,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Theme.geometry.spacing.md,
    paddingHorizontal: Theme.geometry.spacing.lg,
    paddingVertical: Theme.geometry.spacing.md,
    borderTopWidth: 0.5,
    borderTopColor: Theme.colors.border,
    backgroundColor: Theme.colors.surface,
  },
  footerInfo: {
    flex: 1,
  },
  footerLbl: {
    fontSize: 11,
    fontWeight: '600',
    color: Theme.colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 2,
  },
  footerAddr: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.text.primary,
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.geometry.spacing.sm,
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.geometry.spacing.md,
    paddingVertical: Theme.geometry.spacing.sm + 4,
    borderRadius: Theme.geometry.radius.md,
  },
  confirmBtnText: {
    color: Theme.colors.text.onPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});