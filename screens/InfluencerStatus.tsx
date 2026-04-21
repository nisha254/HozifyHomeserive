import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { Text } from 'react-native-paper';
import {
  Check,
  Hourglass,
  Clock,
  ShieldCheck,
  UserCheck,
  Video,
  Bell,
  ArrowRight,
  HelpCircle,
} from 'lucide-react-native';
import { Theme } from '../constants/Theme';
import { ScreenHeader } from '../components/ScreenHeader';

// ─── Step Indicator ───────────────────────────────────────────────────────────
const StatusSteps = () => {
  return (
    <View style={styles.stepsContainer}>
      <View style={styles.stepItem}>
        <View style={[styles.stepCircle, styles.stepCompleted]}>
          <Check size={16} color={Theme.colors.white} strokeWidth={3} />
        </View>
        <Text style={styles.stepLabel}>Details Submitted</Text>
        <Text style={styles.stepStatus}>Completed</Text>
      </View>

      <View style={styles.stepLine} />

      <View style={styles.stepItem}>
        <View style={[styles.stepCircle, styles.stepActive]}>
          <Hourglass size={16} color={Theme.colors.primary} strokeWidth={2.5} />
        </View>
        <Text style={styles.stepLabel}>Under Review</Text>
        <Text style={[styles.stepStatus, { color: Theme.colors.primary }]}>In Progress</Text>
      </View>

      <View style={styles.stepLine} />

      <View style={styles.stepItem}>
        <View style={styles.stepCircle}>
          <Text style={styles.stepNumber}>3</Text>
        </View>
        <Text style={styles.stepLabel}>Approved/Rejected</Text>
        <Text style={styles.stepStatus}>Pending</Text>
      </View>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
export const InfluencerStatus = ({ navigation }: any) => {
  return (
    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.root}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <ScreenHeader
        title="Verification Status"
        subTitle="We're reviewing your profile"
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity 
            style={styles.helpBtn}
            onPress={() => navigation.navigate('Help')}
          >
            <Text style={styles.helpBtnText}>Help</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Progress ── */}
        <StatusSteps />

        {/* ── Main Status Card ── */}
        <View style={styles.statusCard}>
          <View style={styles.iconContainer}>
            <View style={styles.hourglassWrapper}>
               <Hourglass size={48} color={Theme.colors.primary} strokeWidth={1.5} />
            </View>
          </View>
          
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>Your Profile is under review</Text>
            <Text style={styles.statusDesc}>
              Our team is verifying your details and platform information.
            </Text>
          </View>

          <View style={styles.timeInfoBox}>
            <Clock size={16} color={Theme.colors.primary} strokeWidth={2.5} />
            <View style={{ flex: 1 }}>
              <Text style={styles.timeLabel}>This usually takes 24-48 hours</Text>
              <Text style={styles.timeSubText}>We'll notify you once your profile is approved.</Text>
            </View>
          </View>
        </View>

        {/* ── Checklist Section ── */}
        <View style={styles.checklistCard}>
          <Text style={styles.checklistTitle}>What we're checking</Text>
          
          <View style={styles.checkItem}>
            <View style={styles.checkIconBox}>
              <ShieldCheck size={18} color={Theme.colors.primary} />
            </View>
            <View style={styles.checkTextContent}>
              <Text style={styles.checkLabel}>Platform Authenticity</Text>
              <Text style={styles.checkDesc}>Verifying your social media channels and profile links.</Text>
            </View>
          </View>

          <View style={styles.checkItem}>
            <View style={styles.checkIconBox}>
              <UserCheck size={18} color={Theme.colors.primary} />
            </View>
            <View style={styles.checkTextContent}>
              <Text style={styles.checkLabel}>Audience Metrics</Text>
              <Text style={styles.checkDesc}>Checking your followers, engagement and audience quality.</Text>
            </View>
          </View>

          <View style={styles.checkItem}>
            <View style={styles.checkIconBox}>
              <Video size={18} color={Theme.colors.primary} />
            </View>
            <View style={styles.checkTextContent}>
              <Text style={styles.checkLabel}>Content Quality</Text>
              <Text style={styles.checkDesc}>Reviewing your content and niche relevance.</Text>
            </View>
          </View>
        </View>

        {/* ── Notification Info ── */}
        <View style={styles.notificationPill}>
          <View style={styles.bellIconBox}>
            <Bell size={18} color={Theme.colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.notificationText}>You'll get notified via app and WhatsApp</Text>
            <Text style={styles.notificationSub}>Once your profile status is updated.</Text>
          </View>
        </View>
      </ScrollView>

      {/* ── Footer ── */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.homeBtn}
          onPress={() => navigation.navigate('Main')}
          activeOpacity={0.8}
        >
          <Text style={styles.homeBtnText}>Go To Home</Text>
          <ArrowRight size={20} color={Theme.colors.white} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Theme.colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 120 },
  
  helpBtn: {
    backgroundColor: '#FF7F50', // Orange as per screenshot
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  helpBtnText: {
    color: Theme.colors.white,
    fontWeight: '700',
    fontSize: 14,
  },

  // Steps
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  stepItem: {
    alignItems: 'center',
    width: 90,
  },
  stepCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: 8,
  },
  stepCompleted: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  stepActive: {
    borderColor: Theme.colors.primary,
    borderWidth: 1.5,
  },
  stepLine: {
    width: 40,
    height: 1,
    backgroundColor: Theme.colors.border,
    marginTop: 22,
  },
  stepLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: 2,
  },
  stepStatus: {
    fontSize: 9,
    color: Theme.colors.text.muted,
    textAlign: 'center',
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.text.muted,
  },

  // Main Status Card
  statusCard: {
    backgroundColor: '#F5F7FF', // Light blue/purple tint
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E1E8FF',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  hourglassWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(23, 6, 162, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: Theme.colors.text.primary,
    marginBottom: 8,
  },
  statusDesc: {
    fontSize: 14,
    color: Theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  timeInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Theme.colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0FF',
  },
  timeLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: Theme.colors.primary,
    marginBottom: 2,
  },
  timeSubText: {
    fontSize: 11,
    color: Theme.colors.text.secondary,
  },

  // Checklist Card
  checklistCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    ...Theme.shadows.soft,
  },
  checklistTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: Theme.colors.text.primary,
    marginBottom: 20,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 16,
  },
  checkIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(23, 6, 162, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkTextContent: {
    flex: 1,
  },
  checkLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.text.primary,
    marginBottom: 4,
  },
  checkDesc: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
    lineHeight: 18,
  },

  // Notification Pill
  notificationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(23, 6, 162, 0.04)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  bellIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(23, 6, 162, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 13,
    fontWeight: '700',
    color: Theme.colors.text.primary,
    marginBottom: 2,
  },
  notificationSub: {
    fontSize: 11,
    color: Theme.colors.text.secondary,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  homeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: Theme.colors.primary,
    height: 56,
    borderRadius: 16,
  },
  homeBtnText: {
    color: Theme.colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
