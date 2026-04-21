import React, { useState } from 'react';
import {
    View, StyleSheet, TouchableOpacity, ScrollView,
    TextInput, Platform, StatusBar, Keyboard,
} from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../constants/Theme';
import { ServiceCard } from '../components/ServiceCard';
import { SERVICES } from '../data/servicesMock';
import { useStore } from '../store/useStore';

const TRENDING = [
    'Professional cleaning',
    'Salon',
    'Electricians',
    'Carpenters',
    'Spa for women',
    'Washing machine repair',
    'Refrigerator repair',
    'Ro repair',
    'Geyser repair',
    'Microwave repair',
];

export const SearchScreen = ({ navigation }: any) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const { cart, addToCart } = useStore();

    const handleSearch = () => {
        Keyboard.dismiss();
        if (query.length > 0) setHasSearched(true);
    };

    const filteredServices = SERVICES.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* ── HEADER ── */}
            <SafeAreaView edges={['top']} style={styles.headerSafe}>
                <View style={styles.headerRow}>
                    {/* Search bar WITH back arrow inside */}
                    <View style={[styles.searchBar, isFocused && styles.searchBarFocused]}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backInsideBtn}
                            activeOpacity={0.7}
                        >
                            <MaterialCommunityIcons name="arrow-left" size={22} color="#0F172A" />
                        </TouchableOpacity>

                        <TextInput
                            style={styles.input}
                            placeholder="Look for services"
                            placeholderTextColor="#94A3B8"
                            value={query}
                            onChangeText={(t) => {
                                setQuery(t);
                                if (t.length === 0) setHasSearched(false);
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onSubmitEditing={handleSearch}
                            autoFocus
                            returnKeyType="search"
                        />

                        {query.length > 0 && (
                            <TouchableOpacity onPress={() => { setQuery(''); setHasSearched(false); }}>
                                <MaterialCommunityIcons name="close-circle" size={20} color="#CBD5E1" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </SafeAreaView>

            {/* ── BODY ── */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {!hasSearched ? (
                    <View style={styles.trendingSection}>
                        <Text style={styles.sectionTitle}>Trending searches</Text>

                        <View style={styles.chipsWrap}>
                            {TRENDING.map((item, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={styles.chip}
                                    activeOpacity={0.7}
                                    onPress={() => { setQuery(item); setHasSearched(true); }}
                                >
                                    <MaterialCommunityIcons
                                        name="trending-up"
                                        size={16}
                                        color="#94A3B8"
                                        style={styles.chipIcon}
                                    />
                                    <Text style={styles.chipText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ) : (
                    <View style={styles.resultsSection}>
                        <Text style={styles.resultsLabel}>
                            {filteredServices.length} results found
                        </Text>
                        {filteredServices.length > 0 ? (
                            filteredServices.map((service) => (
                                <View key={service.id} style={styles.cardBuffer}>
                                    <ServiceCard
                                        name={service.name}
                                        price={service.price}
                                        originalPrice={service.originalPrice}
                                        rating={service.rating}
                                        ratingCount={service.ratingCount}
                                        image={service.image}
                                        duration={service.duration}
                                        onPress={() => navigation.navigate('ServiceDetail', { service })}
                                        onAdd={() => addToCart(service)}
                                        added={cart.some(c => c.id === service.id)}
                                    />
                                </View>
                            ))
                        ) : (
                            <View style={styles.emptyState}>
                                <MaterialCommunityIcons name="text-search-variant" size={80} color="#E2E8F0" />
                                <Text style={styles.emptyTitle}>No services found</Text>
                                <Text style={styles.emptySub}>
                                    Try searching for something else like "AC Service" or "Cleaning".
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    /* ── Header ── */
    headerSafe: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    headerRow: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },

    /* Search bar — arrow inside */
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
    },
    searchBarFocused: {
        borderColor: Theme.colors.primary,   // purple/blue from your theme
    },
    backInsideBtn: {
        padding: 4,
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#0F172A',
        padding: 0,
    },

    /* ── Trending ── */
    scrollContent: {
        paddingBottom: 48,
    },
    trendingSection: {
        paddingHorizontal: 20,
        paddingTop: 28,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 24,
    },
    chipsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 11,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        backgroundColor: '#FFFFFF',
    },
    chipIcon: {
        marginRight: 8,
    },
    chipText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
    },

    /* ── Results ── */
    resultsSection: {
        padding: 20,
    },
    resultsLabel: {
        fontSize: 13,
        fontWeight: '900',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 20,
    },
    cardBuffer: {
        marginBottom: 16,
    },

    /* ── Empty state ── */
    emptyState: {
        alignItems: 'center',
        paddingTop: 80,
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#0F172A',
        marginTop: 24,
        marginBottom: 8,
    },
    emptySub: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 22,
        fontWeight: '600',
    },
});