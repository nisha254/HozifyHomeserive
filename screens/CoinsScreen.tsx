import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Switch,
    ImageBackground
} from 'react-native';
import { Text } from 'react-native-paper';
import {
    ChevronRight,
    Tag,
    Sparkles,
} from 'lucide-react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { useStore } from '../store/useStore';
import { Theme } from '../constants/Theme';

export const CoinsScreen = ({ navigation }: any) => {
    const { user } = useStore();
    const [alwaysUse, setAlwaysUse] = useState(false);
    const coinBalance = user?.coins ?? 0;

    return (
        <ImageBackground
            source={require('../assets/RectangleBG.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <ScreenHeader
                title="Hozify Coins"
                onBack={() => navigation.goBack()}
            />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.heroSection}>
                    {/* Decorative arc */}
                    <View style={styles.arcDecor} />

                    {/* Left text */}
                    <View style={styles.heroLeft}>
                        <Text style={styles.heroTitle}>Use Hozify coins</Text>
                        <Text style={styles.heroSubTitle}>& get discounts on rides!</Text>

                        <View style={styles.heroBullets}>
                            <View style={styles.bulletRow}>
                                <Text style={styles.bulletEmoji}>🪙</Text>
                                <Text style={styles.bulletText}>1 coin equals ₹1</Text>
                            </View>
                            <View style={styles.bulletRow}>
                                <Tag size={16} color={Theme.colors.text.secondary} strokeWidth={1.8} />
                                <Text style={styles.bulletText}>Use with coupons</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.learnMoreRow} activeOpacity={0.7}>
                            <Text style={styles.learnMoreText}>LEARN MORE</Text>
                            <ChevronRight size={14} color={Theme.colors.brandBlue} strokeWidth={2.5} />
                        </TouchableOpacity>
                    </View>

                    {/* Right — coin illustration */}
                    <View style={styles.heroRight}>
                        <Text style={styles.sparkleTop}>✦  ✦</Text>
                        <Text style={styles.coinBig}>🪙</Text>
                        <Text style={styles.sparkleBot}>✦</Text>
                    </View>
                </View>

                {/* ── Balance card ─────────────────────────────────── */}
                <View style={styles.balanceCard}>
                    {/* Card header row */}
                    <View style={styles.balanceHeader}>
                        <Text style={styles.balanceLabel}>Hozify Coin Balance</Text>
                        <View style={styles.balanceRight}>
                            <Text style={styles.balanceNum}>{coinBalance}</Text>
                            <Text style={styles.coinIcon}>🪙</Text>
                        </View>
                    </View>

                    {/* Inner gray box */}
                    <View style={styles.innerBox}>
                        {/* Toggle row */}
                        <View style={styles.toggleRow}>
                            <Text style={styles.toggleLabel}>Always use Hozify Coins</Text>
                            <Switch
                                value={alwaysUse}
                                onValueChange={setAlwaysUse}
                                trackColor={{ false: Theme.colors.text.muted, true: Theme.colors.gold }}
                                thumbColor={Theme.colors.white}
                            />
                        </View>

                        {/* Info text */}
                        <View style={styles.infoRow}>
                            <Sparkles size={16} color={Theme.colors.gold} fill={Theme.colors.gold} strokeWidth={0} />
                            <Text style={styles.infoText}>
                                Use Hozify coins and get discounts on your rides
                            </Text>
                        </View>
                    </View>
                </View>

                {/* ── Coin transactions section ────────────────────── */}
                <View style={styles.txSection}>
                    {/* Section label */}
                    <View style={styles.txHeader}>
                        <Tag size={16} color={Theme.colors.brandBlue} fill={Theme.colors.brandBlue} strokeWidth={0} />
                        <Text style={styles.txLabel}>COIN TRANSACTIONS</Text>
                    </View>

                    {/* View all row */}
                    <View style={styles.txCard}>
                        <TouchableOpacity
                            style={styles.txRow}
                            activeOpacity={0.6}
                            onPress={() => { }}
                        >
                            <Text style={styles.txRowText}>View all transactions</Text>
                            <ChevronRight size={20} color={Theme.colors.text.muted} strokeWidth={2.5} />
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Theme.colors.surface },
    scrollContent: { paddingBottom: 48 },
    heroSection: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingTop: 28,
        paddingBottom: 28,
        overflow: 'hidden',
        position: 'relative',
    },

    arcDecor: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        top: -60,
        right: -40,
    },

    heroLeft: { flex: 1, paddingRight: 12 },
    heroTitle: {
        fontSize: 26,
        fontWeight: '900',
        color: Theme.colors.text.primary,
        letterSpacing: -0.5,
        lineHeight: 30,
    },
    heroSubTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: Theme.colors.text.secondary,
        marginBottom: 20,
        marginTop: 2,
    },
    heroBullets: { gap: 10, marginBottom: 20 },
    bulletRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    bulletEmoji: { fontSize: 18 },
    bulletText: { fontSize: 14, fontWeight: '600', color: Theme.colors.text.secondary },

    learnMoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    learnMoreText: {
        fontSize: 13,
        fontWeight: '900',
        color: Theme.colors.brandBlue,
        letterSpacing: 0.5,
    },

    heroRight: {
        width: 110,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
    },
    sparkleTop: { fontSize: 14, color: Theme.colors.gold, marginBottom: 4, letterSpacing: 8 },
    coinBig: { fontSize: 72 },
    sparkleBot: { fontSize: 20, color: Theme.colors.gold, marginTop: 4 },

    balanceCard: {
        marginHorizontal: 16,
        backgroundColor: Theme.colors.surface,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Theme.colors.borderLight,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    balanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    balanceLabel: { fontSize: 16, fontWeight: '800', color: Theme.colors.text.primary },
    balanceRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    balanceNum: { fontSize: 22, fontWeight: '900', color: Theme.colors.text.primary },
    coinIcon: { fontSize: 22 },

    /* Inner gray box */
    innerBox: {
        backgroundColor: Theme.colors.background,
        borderRadius: 14,
        padding: 18,
        gap: 16,
        borderWidth: 1,
        borderColor: Theme.colors.borderLight,
    },
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    toggleLabel: { fontSize: 15, fontWeight: '700', color: Theme.colors.text.primary, flex: 1 },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: Theme.colors.brandBlue,
        lineHeight: 20,
    },
    txSection: {
        marginTop: 24,
        paddingTop: 24,
        paddingBottom: 24,
        paddingHorizontal: 20,
    },
    txHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },
    txLabel: {
        fontSize: 13,
        fontWeight: '900',
        color: Theme.colors.brandBlue,
        letterSpacing: 0.8,
    },
    txCard: {
        backgroundColor: Theme.colors.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Theme.colors.borderLight,
        overflow: 'hidden',
    },
    txRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 18,
    },
    txRowText: { fontSize: 15, fontWeight: '700', color: Theme.colors.text.primary },
});