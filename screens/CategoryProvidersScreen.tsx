import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TopProviderCard } from '../components/home/HomeComponents';
import { Theme } from '../constants/Theme';

const { width } = Dimensions.get('window');

const MOCK_PROVIDERS = [
  { id: '1', name: 'Jackson', role: 'Electrician', rating: '4.9', img: require('../assets/ast/ast1.png') },
  { id: '2', name: 'Logan', role: 'Electrician', rating: '5.0', img: require('../assets/ast/ast2.png') },
  { id: '3', name: 'Ethan lita', role: 'Electrician', rating: '4.4', img: require('../assets/ast/ast3.png') },
  { id: '4', name: 'Isabella una', role: 'Electrician', rating: '4.3', img: require('../assets/ast/ast4.png') },
  { id: '5', name: 'Panama', role: 'Electrician', rating: '4.9', img: require('../assets/ast/ast5.png') },
  { id: '6', name: 'Jamalo', role: 'Electrician', rating: '4.7', img: require('../assets/ast/ast6.png') },
  { id: '7', name: 'Mehram', role: 'Electrician', rating: '4.8', img: require('../assets/ast/ast7.png') },
  { id: '8', name: 'Shatem', role: 'Electrician', rating: '3.9', img: require('../assets/ast/ast8.png') },
  { id: '9', name: 'Kunail', role: 'Electrician', rating: '3.9', img: require('../assets/ast/ast3.png') },
  { id: '10', name: 'Barbeta', role: 'Electrician', rating: '3.7', img: require('../assets/ast/ast1.png') },
];

export const CategoryProvidersScreen = ({ route, navigation }: any) => {
  const { title = 'Electrician Providers' } = route.params || {};

  // Clean emoji from title if passed from ProvidersListScreen
  const cleanTitle = title.replace(/^[^\w\s]+/g, '').trim();

  // Optionally override roles based on title
  const roleName = cleanTitle.split(' ')[0] || 'Provider';
  const displayProviders = MOCK_PROVIDERS.map(p => ({ ...p, role: roleName }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={Theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{cleanTitle}</Text>
          <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="tune-variant" size={24} color={Theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.introSection}>
             <Text style={styles.introTitle}>{cleanTitle}</Text>
             <View style={styles.resultsBadge}>
                 <Text style={styles.resultsText}>{displayProviders.length} EXPERTS AVAILABLE</Text>
             </View>
          </View>

          <View style={styles.grid}>
            {displayProviders.map(item => (
              <TopProviderCard 
                key={item.id} 
                item={item} 
                style={styles.cardOverride}
                onPress={() => navigation.navigate('ServiceListing')} 
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
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#64748B', flex: 1, textAlign: 'center', letterSpacing: -0.5 },
  searchBtn: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center' },

  scrollContent: { paddingBottom: 60, paddingTop: 12, paddingHorizontal: 24 },
  
  introSection: { marginBottom: 32 },
  introTitle: { fontSize: 32, fontWeight: '900', color: Theme.colors.text.primary, letterSpacing: -1, marginBottom: 8 },
  resultsBadge: { backgroundColor: '#F8FAFC', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: '#F1F5F9' },
  resultsText: { fontSize: 11, fontWeight: '900', color: '#64748B', letterSpacing: 0.5 },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  cardOverride: {
    width: (width - 48 - 12) / 2,
    marginRight: 0,
    marginBottom: 0,
  }
});
