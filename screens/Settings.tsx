import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Alert,
} from 'react-native';
import { Text, Divider } from 'react-native-paper';
import {
  User,
  Heart,
  SlidersHorizontal,
  Smartphone,
  Info,
  Bug,
  LogOut,
  Trash2,
  ChevronRight,
  HelpCircle,
} from 'lucide-react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { Theme } from '../constants/Theme';

import { useStore } from '../store/useStore';

const ICON_SIZE = 22;

// ── Typed row definition ────────────────────────────────────────────
type SettingRow = {
  id: string;
  Icon: React.FC<any>;
  title: string;
  subTitle?: string;
  onPress?: () => void;
  iconColor?: string;
};

export const SettingsScreen = ({ navigation }: any) => {
  const { user, logout } = useStore();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: logout, style: 'destructive' },
    ]);
  };

  // ── Section data ──────────────────────────────────────────────────
  const generalItems: SettingRow[] = [
    {
      id: 'profile',
      Icon: User,
      title: 'Profile',
      subTitle: `+91 ${user?.phone || '8305724284'}`,
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      id: 'favourites',
      Icon: Heart,
      title: 'Favourites',
      subTitle: 'Manage favourite locations',
      onPress: () => navigation.navigate('Favourites'),
    },
    {
      id: 'preferences',
      Icon: SlidersHorizontal,
      title: 'Preferences',
      subTitle: 'Manage preferences',
      onPress: () => navigation.navigate('Preferences'),
    },
    {
      id: 'shortcuts',
      Icon: Smartphone,
      title: 'App shortcuts',
      subTitle: 'Create shortcuts on home launcher',
    },
  ];

  const otherItems: SettingRow[] = [
    {
      id: 'about',
      Icon: Info,
      title: 'About',
      subTitle: '8.102.1',
      onPress: () => navigation.navigate('About'),
    },
    {
      id: 'beta',
      Icon: Bug,
      title: 'Subscribe to Beta',
      subTitle: 'Get early access to latest features',
    },
    {
      id: 'logout',
      Icon: LogOut,
      title: 'Logout',
      onPress: handleLogout,
    },
    {
      id: 'delete',
      Icon: Trash2,
      title: 'Delete Account',
      iconColor: Theme.colors.status.error,           // only the icon is red
      onPress: () => { },
    },
  ];

  // ── Reusable row ──────────────────────────────────────────────────
  const SettingItem = ({ item, isLast }: { item: SettingRow; isLast: boolean }) => {
    const { Icon, title, subTitle, onPress, iconColor } = item;
    return (
      <>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.6}
          onPress={onPress}
        >
          <View style={styles.itemLeft}>
            <View style={styles.iconBox}>
              <Icon
                size={ICON_SIZE}
                color={iconColor ?? Theme.colors.text.secondary}
                strokeWidth={1.6}
              />
            </View>
            <View style={styles.itemTextCol}>
              <Text style={styles.itemTitle}>{title}</Text>
              {subTitle ? (
                <Text style={styles.itemSub}>{subTitle}</Text>
              ) : null}
            </View>
          </View>
          <ChevronRight size={20} color={Theme.colors.text.muted} strokeWidth={2.5} />
        </TouchableOpacity>
        {!isLast && <View style={styles.rowDivider} />}
      </>
    );
  };

  return (
    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.root}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />


      {/* ── Header ─────────────────────────────────────────── */}
      <ScreenHeader
        title="Setting"
        subTitle="Edit the options"
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity style={styles.helpBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Help')} >
            <Text style={styles.helpText}>Help</Text>
          </TouchableOpacity>
        }
      />

      {/* ── Scrollable content ──────────────────────────────── */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* GENERAL */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>GENERAL</Text>
          <View style={styles.card}>
            {generalItems.map((item, i) => (
              <SettingItem key={item.id} item={item} isLast={i === generalItems.length - 1} />
            ))}
          </View>
        </View>

        {/* OTHERS */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>OTHERS</Text>
          <View style={styles.card}>
            {otherItems.map((item, i) => (
              <SettingItem key={item.id} item={item} isLast={i === otherItems.length - 1} />
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: { flex: 1, backgroundColor: '#EEF2F7' },
  /* Help pill (right action passed to ScreenHeader) */
  helpBtn: {
    backgroundColor: Theme.colors.orange,
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
    color: Theme.colors.white,
  },

  /* ── Scroll ─────────────────────────────────────────────── */
  scrollContent: { paddingBottom: 48 },

  /* ── Section ────────────────────────────────────────────── */
  section: { paddingHorizontal: 16, paddingTop: 24 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: Theme.colors.brandBlue,
    letterSpacing: 0.8,
    marginBottom: 12,
    marginLeft: 4,
  },

  /* ── Card ───────────────────────────────────────────────── */
  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Theme.colors.borderLight,
  },

  /* ── Row ────────────────────────────────────────────────── */
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 18,
    minHeight: 72,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTextCol: { flex: 1 },
  itemTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Theme.colors.text.primary,
    marginBottom: 2,
  },
  itemSub: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.colors.text.secondary,
    lineHeight: 18,
  },
  rowDivider: {
    height: 1,
    backgroundColor: Theme.colors.borderLight,
    marginLeft: 74,          // aligns with text, not icon
  },
});