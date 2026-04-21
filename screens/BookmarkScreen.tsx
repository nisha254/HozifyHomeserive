import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { ArrowLeft, Search } from 'lucide-react-native';
import { Theme } from '../constants/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ServiceMarketplaceCard } from '../components/ServiceMarketplaceCard';

const CATEGORIES = ["All", "Cleaning", "Repairing", "Painting", "Plumbing"];

const BOOKMARKS = [
  { id: '1', provider: 'Jenny Wilson', service: 'House Cleaning', price: 24, rating: 4.8, reviews: '8,289', category: 'Cleaning', img: require('../assets/ast/ast1.png') },
  { id: '2', provider: 'Rayford Chenail', service: 'AC Repairing', price: 26, rating: 4.9, reviews: '6,182', category: 'Repairing', img: require('../assets/ast/ast5.png') },
  { id: '3', provider: 'Janetta Rotolo', service: 'Laundry Services', price: 19, rating: 4.7, reviews: '7,938', category: 'Cleaning', img: require('../assets/ast/ast2.png') },
  { id: '4', provider: 'Freida Vames', service: 'Motorcycle Repairing', price: 23, rating: 4.9, reviews: '6,182', category: 'Repairing', img: require('../assets/ast/ast8.png') },
];

export const BookmarkScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredBookmarks = activeTab === "All" 
    ? BOOKMARKS 
    : BOOKMARKS.filter(b => b.category === activeTab);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <ArrowLeft size={24} color={Theme.colors.text.primary} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Saved Experts</Text>
          <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
            <Search size={24} color={Theme.colors.primary} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.introSection}>
             <Text style={styles.introTitle}>Bookmarks</Text>
             <Text style={styles.introSub}>Review and book your favorite professionals.</Text>
          </View>

          <View style={styles.tabsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
              {CATEGORIES.map(cat => {
                const isActive = activeTab === cat;
                return (
                  <TouchableOpacity 
                    key={cat} 
                    style={[styles.tabChip, isActive && styles.tabChipActive]}
                    onPress={() => setActiveTab(cat)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{cat}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.listContainer}>
            {filteredBookmarks.map((item) => (
              <ServiceMarketplaceCard
                key={item.id}
                item={{
                  id: item.id,
                  name: item.service,
                  price: item.price * 80,
                  rating: item.rating.toString(),
                  reviews: item.reviews,
                  image: item.img,
                  description: 'Saved expert ' + item.provider + ' available for ' + item.service
                }}
                onAdd={() => navigation.navigate('Cart')}
                onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    height: 64,
  },
  backBtn: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: Theme.colors.text.primary, letterSpacing: -0.5 },

  scrollContent: { paddingBottom: 60 },
  introSection: { paddingHorizontal: 24, paddingVertical: 24 },
  introTitle: { fontSize: 32, fontWeight: '900', color: Theme.colors.text.primary, marginBottom: 4, letterSpacing: -1 },
  introSub: { fontSize: 15, color: '#64748B', fontWeight: '600' },

  tabsContainer: { marginBottom: 24 },
  tabsScroll: { paddingHorizontal: 24, gap: 10 },
  tabChip: {
    paddingHorizontal: 20, paddingVertical: 10, borderRadius: 14,
    borderWidth: 1.5, borderColor: '#F1F5F9', backgroundColor: '#F8FAFC',
    justifyContent: 'center',
  },
  tabChipActive: { backgroundColor: Theme.colors.text.primary, borderColor: Theme.colors.text.primary },
  tabText: { fontSize: 14, fontWeight: '800', color: '#64748B' },
  tabTextActive: { color: '#FFFFFF' },

  listContainer: { paddingHorizontal: 24 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
  },
  cardImg: {
    width: 100,
    height: 100,
    borderRadius: 18,
    marginRight: 16,
    backgroundColor: '#F8FAFC'
  },
  cardContent: { flex: 1 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  categoryLabel: { fontSize: 9, fontWeight: '900', color: Theme.colors.primary, letterSpacing: 1 },
  providerName: { fontSize: 13, color: '#64748B', fontWeight: '700', marginBottom: 2 },
  serviceTitle: { fontSize: 17, fontWeight: '900', color: Theme.colors.text.primary, letterSpacing: -0.5, marginBottom: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  servicePrice: { fontSize: 19, fontWeight: '900', color: Theme.colors.text.primary },
  priceSub: { fontSize: 11, fontWeight: '700', color: '#94A3B8' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFF7F2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { fontSize: 13, fontWeight: '900', color: Theme.colors.primary },
});
