import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  ScrollView,
  Platform,
  Modal,
  Dimensions,
  Animated,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ChevronRight,
  Gift,
  UserPlus,
  CheckCircle2,
  ArrowRight,
  Ticket,
  Banknote,
  Plus,
  Link,
  Search,
  Upload,
  Info,
  User,
  Video,
  FileText,
  Camera,
  PlaySquare,
  Globe,
  X,
} from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Theme } from '../constants/Theme';
import { ScreenHeader } from '../components/ScreenHeader';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Existing Rewards logic remains...
const REWARDS = [
  {
    id: '1',
    title: 'Select your reward',
    subtitle: 'Get flat ₹50 cashback on first successful service booking by your friends',
    icon: <Banknote size={20} color="#5C45EE" />,
    iconBg: '#F3EFFF',
  },
  {
    id: '2',
    title: '₹75 Off Coupon',
    subtitle: 'Get ₹75 off on your next booking when your friend books their first service',
    icon: <Ticket size={20} color="#10B981" />,
    iconBg: '#ECFDF5',
  },
  {
    id: '3',
    title: 'Select your reward',
    subtitle: 'Get flat ₹50 cashback on first successful service booking by your friends',
    icon: <Banknote size={20} color="#5C45EE" />,
    iconBg: '#F3EFFF',
  },
];

export const ReferralScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'User' | 'Influencer'>('User');
  const [selectedRewardId, setSelectedRewardId] = useState<string | null>(null);
  const [showRewardSheet, setShowRewardSheet] = useState(false);

  // Influencer Form State
  const [platform, setPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [metrics, setMetrics] = useState({
    followers: '',
    subscribers: '',
    avgViews: '',
    engagement: '',
  });
  const [about, setAbout] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [channelImage, setChannelImage] = useState<string | null>(null);

  const selectedReward = REWARDS.find((r) => r.id === selectedRewardId);

  // ── Handlers ──────────────────────────────────────────────

  const handlePickImage = (type: 'profile' | 'channel') => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Something went wrong');
          return;
        }

        const asset = response.assets?.[0];
        if (asset?.uri) {
          if (type === 'profile') setProfileImage(asset.uri);
          else setChannelImage(asset.uri);
        }
      }
    );
  };

  // ── Render Helpers ──────────────────────────────────────────

  const renderUserReferralContent = () => (
    <ScrollView contentContainerStyle={styles.scrollContentUser} showsVerticalScrollIndicator={false}>
      {/* ── Top Section ──────────────────────────────── */}
      <View style={styles.rewardHeader}>
        <View style={styles.rewardHeaderLeft}>
          <Text style={styles.rewardTitleText}>Your Reward</Text>
          <Text style={styles.rewardSubText}>Choose a reward to unlock</Text>
        </View>
        <TouchableOpacity style={styles.chooseRewardBtn} onPress={() => setShowRewardSheet(true)} activeOpacity={0.7}>
          <Text style={styles.chooseRewardText}>Choose reward</Text>
          <ChevronRight size={14} color={Theme.colors.brandBlue} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {/* ── Big Icon ────────────────────────────────── */}
      <View style={styles.bigIconContainer}>
        <View style={styles.bigIconBg}>
          <Gift size={46} color={Theme.colors.brandBlue} strokeWidth={2} />
        </View>
      </View>

      {/* ── Conditional State ───────────────────────── */}
      {!selectedRewardId ? (
        <>
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateTitle}>No reward selected yet</Text>
            <Text style={styles.emptyStateSub}>
              Select a reward and generate your referral{'\n'}code to start earning.
            </Text>
          </View>

          <TouchableOpacity style={styles.generateBtnDisabled} activeOpacity={1}>
            <Text style={styles.generateBtnDisabledText}>Generate Referral Code</Text>
            <ArrowRight size={20} color={Theme.colors.text.muted} strokeWidth={2.5} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateTitle}>{selectedReward?.title}</Text>
            <Text style={styles.emptyStateSub}>{selectedReward?.subtitle}</Text>
          </View>

          <TouchableOpacity style={styles.generateBtnActive} activeOpacity={0.88} onPress={() => navigation.navigate('ReferralGenerated')}>
            <Text style={styles.generateBtnActiveText}>Generate Referral Code</Text>
            <ArrowRight size={20} color={Theme.colors.white} strokeWidth={2.5} />
          </TouchableOpacity>
        </>
      )}

      {/* ── How it works ────────────────────────────── */}
      <View style={styles.howItWorksContainer}>
        <View style={styles.howItWorksHeader}>
          <Text style={styles.partyEmoji}>🎉</Text>
          <Text style={styles.howItWorksTitle}>How it works</Text>
        </View>

        <View style={styles.stepRow}>
          <UserPlus size={20} color={Theme.colors.text.secondary} strokeWidth={2} />
          <Text style={styles.stepText}>Invite your friends using your referral code</Text>
        </View>

        <View style={styles.stepRow}>
          <CheckCircle2 size={20} color={Theme.colors.text.secondary} strokeWidth={2} />
          <Text style={styles.stepText}>Your friend completes their first booking</Text>
        </View>

        <View style={styles.stepRow}>
          <Gift size={20} color={Theme.colors.text.secondary} strokeWidth={2} />
          <Text style={styles.stepText}>You both earn the reward you selected!</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderInfluencerFormContent = () => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

      {/* ── Platform Details ─────────────────────────── */}
      <View style={styles.formCard}>
        <Text style={styles.formCardTitle}>Platform Details</Text>

        <View style={styles.inputRow}>
          <Globe size={18} color={Theme.colors.text.muted} />
          <TextInput
            style={styles.formInput}
            placeholder="Select Platform"
            placeholderTextColor={Theme.colors.text.muted}
            value={platform}
            onChangeText={setPlatform}
          />
        </View>
        <View style={styles.inputRow}>
          <Camera size={18} color={Theme.colors.text.muted} />
          <TextInput
            style={styles.formInput}
            placeholder="channel / username"
            placeholderTextColor={Theme.colors.text.muted}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={[styles.inputRow, { borderBottomWidth: 0 }]}>
          <Link size={18} color={Theme.colors.text.muted} />
          <TextInput
            style={styles.formInput}
            placeholder="Channel Link / Profile URL"
            placeholderTextColor={Theme.colors.text.muted}
            value={profileUrl}
            onChangeText={setProfileUrl}
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* ── Audience Metrics ────────────────────────── */}
      <View style={styles.formCard}>
        <Text style={styles.formCardTitle}>Audience Metrics</Text>

        {/* Audience Metrics Map with Inputs */}
        {[
          { label: 'Followers', key: 'followers' },
          { label: 'Subscribers', key: 'subscribers' },
          { label: 'Average Views', key: 'avgViews' },
          { label: 'Engagement Rate (%)', key: 'engagement' },
        ].map((item, idx) => (
          <View key={item.key} style={[styles.metricRow, idx === 3 && { borderBottomWidth: 0 }]}>
            <Text style={styles.metricLabel}>{item.label}</Text>
            <View style={styles.metricRight}>
              <View style={styles.metricDivider} />
              <TextInput
                style={styles.metricInput}
                placeholder="Enter Count"
                placeholderTextColor={Theme.colors.text.muted}
                value={metrics[item.key as keyof typeof metrics]}
                onChangeText={(val) => setMetrics({ ...metrics, [item.key]: val })}
                keyboardType="numeric"
              />
            </View>
          </View>
        ))}

        <View style={styles.verificationNote}>
          <Info size={14} color={Theme.colors.brandBlue} />
          <Text style={styles.verificationNoteText}>
            This section metrics help us verify your profile faster.
          </Text>
        </View>
      </View>

      {/* ── Upload Proof ────────────────────────────── */}
      <View style={styles.uploadSection}>
        <Text style={styles.formCardTitle}>Upload Proof</Text>
        <View style={styles.uploadRow}>
          <TouchableOpacity
            style={[styles.uploadBox, profileImage ? styles.uploadBoxActive : null]}
            onPress={() => handlePickImage('profile')}
            activeOpacity={0.7}
          >
            {profileImage ? (
              <>
                <Image source={{ uri: profileImage }} style={styles.previewImage} />
                <TouchableOpacity
                  style={styles.removeImgBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    setProfileImage(null);
                  }}
                >
                  <X size={12} color={Theme.colors.white} strokeWidth={3} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.uploadIconCircle}>
                  <Upload size={24} color={Theme.colors.brandBlue} />
                </View>
                <Text style={styles.uploadBoxTitle}>Upload Profile Image</Text>
                <Text style={styles.uploadBoxSub}>(JPG, PNG) up to 2 MB</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.uploadBox, channelImage ? styles.uploadBoxActive : null]}
            onPress={() => handlePickImage('channel')}
            activeOpacity={0.7}
          >
            {channelImage ? (
              <>
                <Image source={{ uri: channelImage }} style={styles.previewImage} />
                <TouchableOpacity
                  style={styles.removeImgBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    setChannelImage(null);
                  }}
                >
                  <X size={12} color={Theme.colors.white} strokeWidth={3} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.uploadIconCircle}>
                  <Upload size={24} color={Theme.colors.brandBlue} />
                </View>
                <Text style={styles.uploadBoxTitle}>Upload Channel Image</Text>
                <Text style={styles.uploadBoxSub}>(JPG, PNG) up to 5 MB</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* ── About Channel ───────────────────────────── */}
      <View style={styles.formCard}>
        <Text style={styles.formCardTitle}>About Your Channel</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Tell us about your content, audience and platform."
          placeholderTextColor={Theme.colors.text.muted}
          value={about}
          onChangeText={setAbout}
          multiline
          textAlignVertical="top"
        />
      </View>

      {/* ── Additional Platform ─────────────────────── */}
      <TouchableOpacity style={styles.addPlatformBtn}>
        <View style={styles.addPlatformIcon}>
          <Plus size={14} color={Theme.colors.brandBlue} strokeWidth={3} />
        </View>
        <Text style={styles.addPlatformText}>Add another Platform</Text>
      </TouchableOpacity>

      {/* ── Final Submit ────────────────────────────── */}
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => navigation.navigate('InfluencerStatus')}
        activeOpacity={0.8}
      >
        <Text style={styles.submitBtnText}>Submit for Review</Text>
        <ArrowRight size={20} color={Theme.colors.white} strokeWidth={2.5} />
      </TouchableOpacity>

    </ScrollView>
  );

  return (
    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.root}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* ── Header ──────────────────────────────────────── */}
      <ScreenHeader
        title={activeTab === 'User' ? "Referral Code" : "Become an Influencer"}
        subTitle={activeTab === 'User' ? "Earn rewards by inviting friends" : "Submit your details for verification"}
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity style={styles.helpBtn} activeOpacity={0.8}
            onPress={() => navigation.navigate('Help')}>
            <Text style={styles.helpBtnText}>Help</Text>
          </TouchableOpacity>
        }
      />

      {/* ── Segmented Control ─────────────────────────── */}
      <View style={styles.segControl}>
        <TouchableOpacity
          style={[styles.segTab, activeTab === 'User' && styles.segTabActive]}
          onPress={() => setActiveTab('User')}
          activeOpacity={0.8}
        >
          <Text style={[styles.segTabText, activeTab === 'User' && styles.segTabTextActive]}>User</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.segTab, activeTab === 'Influencer' && styles.segTabActive]}
          onPress={() => setActiveTab('Influencer')}
          activeOpacity={0.8}
        >
          <Text style={[styles.segTabText, activeTab === 'Influencer' && styles.segTabTextActive]}>Influencer</Text>
        </TouchableOpacity>
      </View>

      {/* ── Main content area ─────────────────────────── */}
      <View style={styles.mainSheet}>
        {activeTab === 'User' ? renderUserReferralContent() : renderInfluencerFormContent()}
      </View>

      {/* ── Reward Bottom Sheet (Modal) ────────────────── */}
      <Modal visible={showRewardSheet} animationType="slide" transparent={true} onRequestClose={() => setShowRewardSheet(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalDismissArea} activeOpacity={1} onPress={() => setShowRewardSheet(false)} />

          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />

            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Select your reward</Text>
              <Text style={styles.sheetSub}>Choose one reward to continue</Text>
            </View>

            <ScrollView style={styles.rewardList} showsVerticalScrollIndicator={false}>
              {REWARDS.map((reward) => (
                <TouchableOpacity
                  key={reward.id}
                  style={styles.rewardCard}
                  activeOpacity={0.7}
                  onPress={() => setSelectedRewardId(reward.id)}
                >
                  <View style={[styles.rewardIconWrap, { backgroundColor: reward.iconBg }]}>
                    {reward.icon}
                  </View>
                  <View style={styles.rewardContent}>
                    <Text style={styles.rewardCardTitle}>{reward.title}</Text>
                    <Text style={styles.rewardCardSub}>{reward.subtitle}</Text>
                  </View>
                  <View style={styles.radioOuter}>
                    {selectedRewardId === reward.id && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <SafeAreaView edges={['bottom']}>
              <TouchableOpacity
                style={styles.sheetGenerateBtn}
                activeOpacity={0.85}
                onPress={() => {
                  setShowRewardSheet(false);
                  if (!selectedRewardId && REWARDS.length > 0) {
                    setSelectedRewardId(REWARDS[0].id);
                  }
                }}
              >
                <Text style={styles.sheetGenerateBtnText}>Generate Referral Code</Text>
                <ArrowRight size={20} color={Theme.colors.white} strokeWidth={2.5} />
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </View>
      </Modal>

    </ImageBackground>
  );
};

/* ── Styles ───────────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeHeader: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 0,
    paddingBottom: 24,
  },
  backBtn: {
    padding: 4,
    marginRight: 12,
  },
  headerTitles: {
    flex: 1,
  },
  helpBtn: {
    backgroundColor: Theme.colors.orange,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  helpBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.white,
  },

  segControl: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.surface,
    borderRadius: 30,
    padding: 6,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  segTab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segTabActive: {
    backgroundColor: Theme.colors.brandBlue,
  },
  segTabText: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.text.primary,
  },
  segTabTextActive: {
    color: Theme.colors.white,
  },

  mainSheet: {
    flex: 1,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  scrollContentUser: {
    padding: 24,
    paddingBottom: 100,
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  /* Top Section inside sheet */
  rewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  rewardHeaderLeft: {
    flex: 1,
  },
  rewardTitleText: {
    fontSize: 16,
    fontWeight: '800',
    color: Theme.colors.text.primary,
    marginBottom: 2,
  },
  rewardSubText: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.colors.text.secondary,
  },
  chooseRewardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 4,
    backgroundColor: Theme.colors.surface,
  },
  chooseRewardText: {
    fontSize: 13,
    fontWeight: '800',
    color: Theme.colors.brandBlue,
  },

  /* Big Icon */
  bigIconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  bigIconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EEF0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Empty State / Active State */
  emptyStateContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Theme.colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSub: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },

  generateBtnDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.border,
    height: 54,
    borderRadius: 16,
    gap: 10,
    marginBottom: 40,
  },
  generateBtnDisabledText: {
    fontSize: 15,
    fontWeight: '800',
    color: Theme.colors.text.muted,
  },

  generateBtnActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.brandBlue,
    height: 54,
    borderRadius: 16,
    gap: 10,
    marginBottom: 40,
    shadowColor: Theme.colors.brandBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  generateBtnActiveText: {
    fontSize: 15,
    fontWeight: '800',
    color: Theme.colors.white,
  },

  /* How it works */
  howItWorksContainer: {
    gap: 18,
  },
  howItWorksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  partyEmoji: {
    fontSize: 20,
  },
  howItWorksTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: Theme.colors.text.primary,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: Theme.colors.text.secondary,
    lineHeight: 20,
  },

  /* Modal overlay / Bottom Sheet */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalDismissArea: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: Theme.colors.surface,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    maxHeight: SCREEN_HEIGHT * 0.8,
  },
  sheetHandle: {
    width: 48,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 24,
  },
  sheetHeader: {
    marginBottom: 24,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Theme.colors.text.primary,
    marginBottom: 4,
  },
  sheetSub: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.colors.text.secondary,
  },
  rewardList: {
    marginBottom: 16,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1.5,
    borderColor: Theme.colors.borderLight,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: Theme.colors.surface,
  },
  rewardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rewardContent: {
    flex: 1,
  },
  rewardCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Theme.colors.text.primary,
    marginBottom: 4,
  },
  rewardCardSub: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
    fontWeight: '500',
    lineHeight: 18,
    paddingRight: 10,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Theme.colors.brandBlue,
  },

  sheetGenerateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.brandBlue,
    height: 56,
    borderRadius: 16,
    gap: 10,
    marginTop: 8,
  },
  sheetGenerateBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: Theme.colors.white,
  },

  /* ── Influencer Form Styles ────────────────── */
  formCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  formCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Theme.colors.text.primary,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderLight,
  },
  placeholderLabel: {
    fontSize: 14,
    color: Theme.colors.text.muted,
    fontWeight: '500',
  },
  formInput: {
    flex: 1,
    fontSize: 14,
    color: Theme.colors.text.primary,
    fontWeight: '500',
    paddingVertical: 0,
  },
  metricInput: {
    fontSize: 14,
    color: Theme.colors.text.primary,
    fontWeight: '600',
    paddingVertical: 0,
    textAlign: 'right',
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderLight,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.text.primary,
  },
  metricRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metricDivider: {
    width: 1,
    height: 14,
    backgroundColor: Theme.colors.border,
  },
  metricValue: {
    fontSize: 14,
    color: Theme.colors.text.muted,
    fontWeight: '500',
  },
  verificationNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  verificationNoteText: {
    fontSize: 11,
    fontWeight: '500',
    color: Theme.colors.text.secondary,
  },
  uploadSection: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  uploadRow: {
    flexDirection: 'row',
    gap: 16,
  },
  uploadBox: {
    flex: 1,
    height: 140,
    backgroundColor: Theme.colors.surface,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Theme.colors.brandBlue,
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  uploadBoxActive: {
    borderStyle: 'solid',
    borderColor: Theme.colors.border,
    padding: 0,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    resizeMode: 'cover',
  },
  removeImgBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  uploadIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadBoxTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  uploadBoxSub: {
    fontSize: 10,
    color: Theme.colors.text.muted,
    fontWeight: '600',
  },
  textArea: {
    height: 120,
    backgroundColor: Theme.colors.background,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Theme.colors.borderLight,
    fontSize: 14,
    color: Theme.colors.text.primary,
    fontWeight: '500',
  },
  addPlatformBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Theme.colors.background,
    borderRadius: 16,
    paddingVertical: 18,
    borderWidth: 1.5,
    borderColor: Theme.colors.brandBlue,
    borderStyle: 'dashed',
    marginBottom: 24,
  },
  addPlatformIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Theme.colors.brandBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlatformText: {
    fontSize: 15,
    fontWeight: '800',
    color: Theme.colors.brandBlue,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.brandBlue,
    height: 60,
    borderRadius: 20,
    gap: 12,
    marginBottom: 40,
    shadowColor: Theme.colors.brandBlue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: '900',
    color: Theme.colors.white,
    letterSpacing: 0.5,
  },
});