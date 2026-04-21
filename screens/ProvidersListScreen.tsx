import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopProviderCard, SectionHeader } from '../components/home/HomeComponents';

import { Theme } from '../constants/Theme';

const PROVIDER_CATEGORIES = [
  {
    title: '👷 Electrician Providers',
    providers: [
      { id: '1', name: 'Jackson', role: 'Electrician', rating: '3.9', img: require('../assets/ast/ast1.png') },
      { id: '2', name: 'Emily jani', role: 'Electrician', rating: '4.8', img: require('../assets/ast/ast2.png') },
    ]
  },
  {
    title: '👷 Plumber Providers',
    providers: [
      { id: '3', name: 'Ethan lita', role: 'Plumber', rating: '4.7', img: require('../assets/ast/ast3.png') },
      { id: '4', name: 'Isabella una', role: 'Plumber', rating: '3.9', img: require('../assets/ast/ast4.png') },
    ]
  },
  {
    title: '👷 Carpenter Providers',
    providers: [
      { id: '5', name: 'Aiden', role: 'Carpenter', rating: '3.6', img: require('../assets/ast/ast5.png') },
      { id: '6', name: 'Logan', role: 'Carpenter', rating: '4.4', img: require('../assets/ast/ast6.png') },
    ]
  },
  {
    title: '👷 Painter Providers',
    providers: [
      { id: '7', name: 'Lucas', role: 'Painter', rating: '3.5', img: require('../assets/ast/ast7.png') },
      { id: '8', name: 'Ethan', role: 'Painter', rating: '4.5', img: require('../assets/ast/ast8.png') },
    ]
  },
  {
    title: '👷 Cleaner Providers',
    providers: [
      { id: '9', name: 'Harper', role: 'Cleaner', rating: '3.9', img: require('../assets/ast/ast1.png') },
      { id: '10', name: 'Caleb', role: 'Cleaner', rating: '4.8', img: require('../assets/ast/ast2.png') },
    ]
  }
];

export const ProvidersListScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={Theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Professional Experts</Text>
          <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="magnify" size={24} color={Theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.heroSection}>
             <Text style={styles.heroTitle}>Elite Providers</Text>
             <Text style={styles.heroSub}>Book top-rated experts verified by Hozify.</Text>
          </View>

          {PROVIDER_CATEGORIES.map((section, index) => {
            const cleanTitle = section.title.replace(/^[^\w\s]+/g, '').trim();
            return (
              <View key={index} style={styles.sectionContainer}>
                <View style={styles.sectionHeaderRow}>
                  <View>
                    <Text style={styles.sectionTitle}>{cleanTitle}</Text>
                    <View style={styles.titleLine} />
                  </View>
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('CategoryProvidersScreen', { title: cleanTitle })}
                    activeOpacity={0.7}
                    style={styles.viewAllBtn}
                  >
                    <Text style={styles.viewAllText}>View all</Text>
                    <MaterialCommunityIcons name="chevron-right" size={14} color={Theme.colors.primary} />
                  </TouchableOpacity>
                </View>
                
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false} 
                  contentContainerStyle={styles.providerScroll}
                  snapToInterval={180}
                  decelerationRate="fast"
                >
                  {section.providers.map(item => (
                    <TopProviderCard 
                      key={item.id} 
                      item={item} 
                      onPress={() => navigation.navigate('ServiceListing')} 
                    />
                  ))}
                </ScrollView>
              </View>
            );
          })}
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
  searchBtn: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center' },

  scrollContent: { paddingBottom: 60 },
  
  heroSection: { paddingHorizontal: 24, paddingVertical: 24, marginBottom: 8 },
  heroTitle: { fontSize: 32, fontWeight: '900', color: Theme.colors.text.primary, marginBottom: 4, letterSpacing: -1 },
  heroSub: { fontSize: 15, color: '#64748B', fontWeight: '600' },

  sectionContainer: { marginBottom: 32 },
  sectionHeaderRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 22, fontWeight: '900', color: Theme.colors.text.primary, letterSpacing: -0.5 },
  titleLine: { width: 40, height: 4, backgroundColor: Theme.colors.primary, borderRadius: 2, marginTop: 4 },
  
  viewAllBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF7F2', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  viewAllText: { fontSize: 12, fontWeight: '900', color: Theme.colors.primary, marginRight: 2 },
  
  providerScroll: { paddingLeft: 24, paddingRight: 8, paddingBottom: 10 },
});
