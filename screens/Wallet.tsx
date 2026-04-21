import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Text } from 'react-native-paper';
import {
  ArrowLeft,
  HelpCircle,
  Wallet,
  Plus,
  Tag,
  QrCode,
  Banknote,
  BookOpen,
  ChevronRight,
} from 'lucide-react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { Theme } from '../constants/Theme';

// ── Small badge for payment logos (replaces external SVG images) ────
const LogoBadge = ({ label, bg, color }: { label: string; bg: string; color: string }) => (
  <View style={[styles.logoBadge, { backgroundColor: bg }]}>
    <Text style={[styles.logoBadgeText, { color }]}>{label}</Text>
  </View>
);

// ── Offer info row (tag icon + gray text) ───────────────────────────
const OfferRow = ({ text }: { text: string }) => (
  <View style={styles.offerRow}>
    <Tag size={15} color={Theme.colors.text.muted} strokeWidth={1.6} style={{ marginTop: 1 }} />
    <Text style={styles.offerText}>{text}</Text>
  </View>
);

// ── Section title ───────────────────────────────────────────────────
const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

// ── Divider ─────────────────────────────────────────────────────────
const Divider = () => <View style={styles.divider} />;

export const WalletScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.surface} />

      {/* ── Header ─────────────────────────────────────────── */}
      <ScreenHeader
        title="Payments"
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity style={styles.helpPill} onPress={() => navigation.navigate('Help')} activeOpacity={0.8}>
            <HelpCircle size={18} color={Theme.colors.text.primary} strokeWidth={1.8} />
            <Text style={styles.helpText}>Help</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ════════════════════════════════════════════════
            WALLETS
        ════════════════════════════════════════════════ */}
        <View style={styles.section}>
          <SectionTitle title="Wallets" />

          {/* Hozify Wallet */}
          <View style={styles.itemRow}>
            <View style={styles.itemLeft}>
              <View style={styles.iconBox}>
                <Wallet size={22} color={Theme.colors.text.primary} strokeWidth={1.6} />
              </View>
              <View>
                <Text style={styles.itemName}>Hozify Wallet</Text>
                <Text style={styles.lowBalance}>Low Balance: ₹0.0</Text>
              </View>
            </View>
          </View>

          {/* Add Money button */}
          <TouchableOpacity style={styles.addMoneyBtn} activeOpacity={0.7}>
            <Plus size={16} color={Theme.colors.text.primary} strokeWidth={2.5} />
            <Text style={styles.addMoneyText}>Add Money</Text>
          </TouchableOpacity>

          <Divider />

          {/* AmazonPay */}
          <View style={styles.itemRow}>
            <View style={styles.itemLeft}>
              <LogoBadge label="pay" bg="#1A1A1A" color="#FF9900" />
              <Text style={styles.itemName}>AmazonPay</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.linkText}>LINK</Text>
            </TouchableOpacity>
          </View>

          <OfferRow text="Cashback behind scratch card upto ₹25, assured ₹5 | min order value of ₹39 | once per month" />
        </View>

        {/* ════════════════════════════════════════════════
            UPI
        ════════════════════════════════════════════════ */}
        <View style={styles.section}>
          <View style={styles.upiHeader}>
            {/* UPI text logo */}
            <View style={styles.upiLogoBox}>
              <Text style={styles.upiLogoText}>UPI</Text>
              <View style={styles.upiStripe} />
            </View>
            <Text style={styles.sectionTitle}>Pay by any UPI app</Text>
          </View>

          {/* Paytm */}
          <View style={styles.itemRow}>
            <View style={styles.itemLeft}>
              <LogoBadge label="P" bg="#002970" color="#FFFFFF" />
              <Text style={styles.itemName}>Paytm</Text>
            </View>
          </View>
          <OfferRow text="Flat ₹20 Cashback | Min. payment ₹29 | Once per user | 1-30 April | Offer valid for users who have not used Paytm UPI anywhere in the last 60 days." />

          <Divider />

          {/* GPay */}
          <View style={styles.itemRow}>
            <View style={styles.itemLeft}>
              <LogoBadge label="G" bg="#FFFFFF" color="#4285F4" />
              <Text style={styles.itemName}>GPay</Text>
            </View>
          </View>

          <Divider />

          {/* PhonePe */}
          <View style={styles.itemRow}>
            <View style={styles.itemLeft}>
              <LogoBadge label="Pe" bg="#5F259F" color="#FFFFFF" />
              <Text style={styles.itemName}>PhonePe</Text>
            </View>
          </View>
        </View>

        {/* ════════════════════════════════════════════════
            PAY LATER
        ════════════════════════════════════════════════ */}
        <View style={styles.section}>
          <SectionTitle title="Pay Later" />

          {/* Pay at drop */}
          <View style={styles.itemRow}>
            <View style={styles.itemLeft}>
              <View style={styles.iconBox}>
                <QrCode size={22} color={Theme.colors.text.primary} strokeWidth={1.6} />
              </View>
              <Text style={styles.itemName}>Pay at drop</Text>
            </View>
          </View>
          <OfferRow text="Go cashless, after ride pay by scanning QR code" />

          <Divider />

          {/* Simpl */}
          <View style={styles.itemRow}>
            <View style={styles.itemLeft}>
              <LogoBadge label="S" bg="#0A0A0A" color="#FFFFFF" />
              <Text style={styles.itemName}>Simpl</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.linkText}>LINK</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ════════════════════════════════════════════════
            OTHERS
        ════════════════════════════════════════════════ */}
        <View style={styles.section}>
          <SectionTitle title="Others" />
          <View style={styles.itemRow}>
            <View style={styles.itemLeft}>
              <View style={styles.iconBox}>
                <Banknote size={22} color={Theme.colors.text.primary} strokeWidth={1.6} />
              </View>
              <Text style={styles.itemName}>Cash</Text>
            </View>
          </View>
        </View>

        {/* ════════════════════════════════════════════════
            SHOW PASSBOOK
        ════════════════════════════════════════════════ */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.passbookRow} activeOpacity={0.7}>
            <View style={styles.itemLeft}>
              <View style={styles.iconBox}>
                <BookOpen size={22} color={Theme.colors.text.primary} strokeWidth={1.6} />
              </View>
              <Text style={styles.itemName}>Show Passbook</Text>
            </View>
            <ChevronRight size={20} color={Theme.colors.text.muted} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.surface },

  /* Header helpers */
  helpPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
  },
  helpText: { fontSize: 14, fontWeight: '700', color: Theme.colors.text.primary },

  scrollContent: { paddingBottom: 48 },

  /* Section */
  section: { paddingHorizontal: 20, paddingTop: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: Theme.colors.text.primary,
    marginBottom: 14,
  },

  /* Item row */
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },

  /* Square icon box */
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Payment logo badge */
  logoBadge: {
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  logoBadgeText: { fontSize: 13, fontWeight: '900' },

  itemName: { fontSize: 16, fontWeight: '800', color: Theme.colors.text.primary },
  lowBalance: { fontSize: 12, color: Theme.colors.status.error, fontWeight: '700', marginTop: 2 },
  linkText: { fontSize: 14, fontWeight: '900', color: Theme.colors.brandBlue },

  /* Add Money button */
  addMoneyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    marginLeft: 56,
    marginBottom: 14,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
  },
  addMoneyText: { fontSize: 14, fontWeight: '800', color: Theme.colors.text.primary },

  /* Offer row */
  offerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: Theme.colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 4,
  },
  offerText: {
    flex: 1,
    fontSize: 12,
    color: Theme.colors.text.secondary,
    fontWeight: '500',
    lineHeight: 18,
  },

  /* UPI header */
  upiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  upiLogoBox: { position: 'relative', paddingBottom: 2 },
  upiLogoText: {
    fontSize: 16,
    fontWeight: '900',
    color: Theme.colors.text.primary,
    letterSpacing: 1,
    fontStyle: 'italic',
  },
  upiStripe: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2.5,
    borderRadius: 1,
    backgroundColor: Theme.colors.gold,
  },

  /* Passbook row */
  passbookRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },

  /* Divider */
  divider: { height: 1, backgroundColor: Theme.colors.borderLight },
});