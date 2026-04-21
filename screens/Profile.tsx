import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import { Text, Surface } from 'react-native-paper';
import {
  HelpCircle,
  Wallet,
  History,
  ShieldCheck,
  Gift,
  Award,
  Ticket,
  Coins,
  Bell,
  Shield,
  Settings,
  ChevronRight,
  Star,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store/useStore';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');
const ICON_COLOR = '#757575';
const ICON_SIZE = 22;

const menuItems = [
  { id: '1', title: 'Help', Icon: HelpCircle, route: 'Help' },
  { id: '2', title: 'Payment', Icon: Wallet, route: 'Wallet' },
  { id: '3', title: 'My Bookings', Icon: History, route: 'Bookings' },
  { id: '4', title: 'Safety', Icon: ShieldCheck, route: 'SOS' },
  { id: '5', title: 'Refer and Earn', Icon: Gift, route: 'Referral', subTitle: 'Get ₹50' },
  { id: '6', title: 'My Rewards', Icon: Award, route: 'Rewards' },
  { id: '7', title: 'Power Pass', Icon: Ticket, route: 'PowerPass' },
  { id: '8', title: 'Hozify Coins', Icon: Coins, route: 'Coins' },
  { id: '9', title: 'Notifications', Icon: Bell, route: 'NotificationScreen' },
  { id: '10', title: 'Settings', Icon: Settings, route: 'Settings' },
];

export const ProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useStore();

  return (
    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.root}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* ── HEADER ─────────────────────────────────────── */}
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </SafeAreaView>
      {/* ── USER CARD ──────────────────────────────────── */}
      <View style={styles.userCardWrap}>
        <Surface style={styles.userCard} elevation={0}>
          <TouchableOpacity
            style={styles.userInfoRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('EditProfile')}
          >
            {/* Avatar */}
            <View style={styles.avatarWrap}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/100?img=3' }}
                style={styles.avatar}
              />
              {/* Online dot */}
              <View style={styles.onlineDot} />
            </View>

            {/* Name + Phone */}
            <View style={styles.userDetails}>
              <Text style={styles.userName}>
                {user?.firstName || 'Ujjwal'}{user?.lastName ? ` ${user.lastName}` : ' Kumar'}
              </Text>
              <Text style={styles.userPhone}>{user?.phone || '9573447204'}</Text>
            </View>

            {/* Rating badge */}
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingNum}>{user?.rating || '5.0'}</Text>
              <Star size={14} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
              <Text style={styles.ratingLabel}>Ratings</Text>
            </View>

            <ChevronRight size={18} color="#94A3B8" strokeWidth={2.5} />
          </TouchableOpacity>
        </Surface>
      </View>

      {/* ── MENU SHEET ─────────────────────────────────── */}
      <View style={styles.sheet}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {menuItems.map((item, index) => {
            const { Icon } = item;
            return (
              <View key={item.id}>
                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.55}
                  onPress={() => navigation.navigate(item.route)}
                >
                  <View style={styles.iconWrap}>
                    <Icon size={ICON_SIZE} color={ICON_COLOR} strokeWidth={1.6} />
                  </View>

                  <View style={styles.menuLabelWrap}>
                    <Text style={styles.menuLabel}>{item.title}</Text>
                    {item.subTitle ? (
                      <Text style={styles.menuSubLabel}>{item.subTitle}</Text>
                    ) : null}
                  </View>

                  <ChevronRight size={18} color="#94A3B8" strokeWidth={2.5} />
                </TouchableOpacity>

                {index < menuItems.length - 1 && (
                  <View style={styles.listDivider} />
                )}
              </View>
            );
          })}

          {/* ── Logout ───────────────────────────────────── */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={logout}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  /* ── Root ─────────────────────────────────────────── */
  root: {
    flex: 1,
  },

  /* ── Header ───────────────────────────────────────── */
  header: {
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.8,
  },

  /* ── User card ────────────────────────────────────── */
  userCardWrap: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  userCard: {
    // backgroundColor: '#FFFFFF',
    // borderRadius: 18,
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: '#E8EEF4',
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  avatarWrap: {
    position: 'relative',
    width: 52,
    height: 52,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#003B95',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userDetails: { flex: 1 },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 3,
  },
  userPhone: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },

  /* Rating badge */
  ratingBadge: {
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#FFEDD5',
    marginRight: 8,
  },
  ratingNum: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  ratingLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 1,
  },

  /* ── White menu sheet ─────────────────────────────── */
  sheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 48,
  },

  /* Menu items */
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 16,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  menuLabelWrap: { flex: 1 },
  menuLabel: {
    fontSize: 15,
    fontWeight: '5  00',
    color: '#757575',
  },
  menuSubLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  listDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 20,
  },

  /* Logout */
  logoutBtn: {
    marginTop: 24,
    marginHorizontal: 20,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#FFF1F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#EF4444',
  },
});