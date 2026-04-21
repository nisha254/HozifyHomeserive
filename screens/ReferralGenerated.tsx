import React, { useCallback, memo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  ScrollView,
  Platform,
  Image,
  Share,
  Clipboard,
  Alert,
} from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ChevronRight,
  Gift,
  Copy,
  Share2,
  ArrowRight,
  Ticket,
  CheckCircle2,
} from 'lucide-react-native';

const PRIMARY_BLUE = '#110080';
const TEXT_DARK = '#0F172A';
const TEXT_SECONDARY = '#64748B';
const REFERRAL_CODE = 'USER4582';

// ── Memoized Subcomponents for Avoiding Unnecessary Re-renders ────────────────

const Header = memo(({ onBack, onHelp }: { onBack: () => void; onHelp: () => void }) => (
  <SafeAreaView edges={['top']} style={styles.safeHeader}>
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
        <ArrowLeft size={24} color="#0F172A" strokeWidth={2.5} />
      </TouchableOpacity>
      <View style={styles.headerTitles}>
        <Text style={styles.headerTitle}>Referral Code</Text>
        <Text style={styles.headerSub}>Earn rewards by inviting friends</Text>
      </View>
      <TouchableOpacity style={styles.helpBtn} onPress={onHelp} activeOpacity={0.8}>
        <Text style={styles.helpBtnText}>Help</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
));

const RewardBanner = memo(({ onCopy }: { onCopy: () => void }) => (
  <View style={styles.rewardBannerCard}>
    <View style={styles.rewardBannerTop}>
      <View style={styles.rewardBannerLeft}>
        <View style={styles.pillBadge}>
          <Text style={styles.pillText}>Your Reward</Text>
        </View>
        <Text style={styles.rewardMainTitle}>Flat ₹50 Cashback</Text>
        <Text style={styles.rewardDesc}>
          Get flat ₹50 cashback on first successful service booking by your friend
        </Text>
      </View>
      <View style={styles.rewardBannerRight}>
        <Image
          source={require('../assets/reward.png')}
          style={styles.giftIconImage}
          resizeMode="contain"
        />
      </View>
    </View>

    <View style={styles.codeCard}>
      <View>
        <Text style={styles.codeLabel}>Your Referral Code</Text>
        <Text style={styles.codeValue}>{REFERRAL_CODE}</Text>
      </View>
      <TouchableOpacity style={styles.copyBtn} onPress={onCopy} activeOpacity={0.7}>
        <Copy size={16} color={PRIMARY_BLUE} strokeWidth={2.5} />
        <Text style={styles.copyBtnText}>Copy Code</Text>
      </TouchableOpacity>
    </View>
  </View>
));

const InviteCard = memo(({ onInvite }: { onInvite: () => void }) => (
  <View style={styles.inviteCard}>
    <Gift size={24} color={PRIMARY_BLUE} strokeWidth={2} />
    <View style={styles.inviteTextCol}>
      <Text style={styles.inviteTitle}>Invite Friends to Hozify</Text>
      <Text style={styles.inviteSub}>Share your code and earn rewards</Text>
    </View>
    <TouchableOpacity onPress={onInvite} activeOpacity={0.7} style={styles.inviteBtnRow}>
      <Text style={styles.inviteBtnText}>INVITE</Text>
      <ChevronRight size={16} color={PRIMARY_BLUE} strokeWidth={2.5} />
    </TouchableOpacity>
  </View>
));

const RewardTypeCard = memo(() => (
  <View style={styles.rewardTypeSection}>
    <Text style={styles.sectionTitle}>Your Reward Type</Text>
    <View style={styles.rewardTypeCard}>
      <View style={styles.rewardIconBg}>
        <Ticket size={20} color={PRIMARY_BLUE} strokeWidth={2} />
      </View>
      <View style={styles.rewardTextCol}>
        <Text style={styles.rewardTypeCardTitle}>Flat ₹50 Cashback</Text>
        <Text style={styles.rewardTypeCardSub}>On friend's first successful booking</Text>
      </View>
      <View style={styles.selectedBadge}>
        <Text style={styles.selectedText}>Selected</Text>
        <CheckCircle2 size={14} color="#059669" strokeWidth={2.5} />
      </View>
    </View>
  </View>
));

const ActionFooter = memo(({ onShare, onRefer }: { onShare: () => void; onRefer: () => void }) => (
  <SafeAreaView edges={['bottom']} style={styles.actionFooter}>
    <TouchableOpacity style={styles.outlineBtn} onPress={onShare} activeOpacity={0.7}>
      <Share2 size={20} color={PRIMARY_BLUE} strokeWidth={2.5} />
      <Text style={styles.outlineBtnText}>Share Your Code</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.solidBtn} onPress={onRefer} activeOpacity={0.88}>
      <Text style={styles.solidBtnText}>Refer Now</Text>
      <ArrowRight size={20} color="#FFFFFF" strokeWidth={2.5} />
    </TouchableOpacity>
  </SafeAreaView>
));

// ── Main Screen ────────────────────────────────────────────────────────────────

export const ReferralGenerated = ({ navigation }: any) => {
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleHelp = useCallback(() => {
    Alert.alert('Help', 'Referral program guidelines.');
  }, []);

  const handleCopy = useCallback(() => {
    Clipboard.setString(REFERRAL_CODE);
    Alert.alert('Copied!', `Referral code ${REFERRAL_CODE} copied to clipboard.`);
  }, []);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `Use my referral code ${REFERRAL_CODE} to get ₹50 off on your first Hozify booking!`,
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <ImageBackground source={require('../assets/RectangleBG.png')} style={styles.root} resizeMode="cover">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <Header onBack={handleBack} onHelp={handleHelp} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <RewardBanner onCopy={handleCopy} />
        <InviteCard onInvite={handleShare} />
        <RewardTypeCard />
      </ScrollView>

      <ActionFooter onShare={handleShare} onRefer={handleShare} />
    </ImageBackground>
  );
};

// ── Styles ──────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeHeader: { paddingBottom: 8 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 0,
    paddingBottom: 16,
  },
  backBtn: { padding: 4, marginRight: 12 },
  headerTitles: { flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: '900', color: TEXT_DARK, letterSpacing: -0.5 },
  headerSub: { fontSize: 13, fontWeight: '500', color: '#475569', marginTop: 2 },
  helpBtn: { backgroundColor: '#FF6B35', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  helpBtnText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 60, paddingTop: 8 },

  /* Rewrite / Reward Banner Card */
  rewardBannerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 16,
  },
  rewardBannerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rewardBannerLeft: {
    flex: 1,
    paddingRight: 10,
  },
  pillBadge: {
    backgroundColor: '#EEEDFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  pillText: { fontSize: 12, fontWeight: '800', color: '#4A3DE4' },
  rewardMainTitle: { fontSize: 16, fontWeight: '800', color: TEXT_DARK, marginBottom: 6 },
  rewardDesc: { fontSize: 12, color: TEXT_SECONDARY, lineHeight: 18, fontWeight: '500' },
  rewardBannerRight: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  giftIconImage: { width: '100%', height: '100%' },

  codeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  codeLabel: { fontSize: 12, fontWeight: '800', color: TEXT_DARK, marginBottom: 2 },
  codeValue: { fontSize: 20, fontWeight: '900', color: PRIMARY_BLUE, letterSpacing: 0.5 },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
  },
  copyBtnText: { fontSize: 13, fontWeight: '700', color: TEXT_SECONDARY },

  /* Invite Card */
  inviteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  inviteTextCol: {
    flex: 1,
    paddingHorizontal: 16,
  },
  inviteTitle: { fontSize: 14, fontWeight: '800', color: TEXT_DARK, marginBottom: 4 },
  inviteSub: { fontSize: 12, color: TEXT_SECONDARY, fontWeight: '500' },
  inviteBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  inviteBtnText: { fontSize: 13, fontWeight: '800', color: PRIMARY_BLUE },

  /* Reward Type */
  rewardTypeSection: {
    marginBottom: 24,
  },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: TEXT_DARK, marginBottom: 12, marginLeft: 4 },
  rewardTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  rewardIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rewardTextCol: { flex: 1 },
  rewardTypeCardTitle: { fontSize: 14, fontWeight: '800', color: TEXT_DARK, marginBottom: 4 },
  rewardTypeCardSub: { fontSize: 12, color: TEXT_SECONDARY, fontWeight: '500' },
  selectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  selectedText: { fontSize: 12, fontWeight: '700', color: '#059669' },

  /* Action Footer */
  actionFooter: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 0 : 20,
    gap: 12,
    backgroundColor: 'transparent',
  },
  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderWidth: 1.5,
    borderColor: PRIMARY_BLUE,
    borderRadius: 16,
    gap: 10,
    backgroundColor: '#FFFFFF',
  },
  outlineBtnText: { fontSize: 16, fontWeight: '800', color: PRIMARY_BLUE },
  solidBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 16,
    gap: 10,
    shadowColor: PRIMARY_BLUE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  solidBtnText: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
});