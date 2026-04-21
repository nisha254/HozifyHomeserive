import React from 'react';
import { View, StyleSheet, ScrollView, Platform, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../constants/Theme';
import { CATEGORIES, Category } from '../constants/Categories';
import { LucideIcon } from '../components/LucideIcon';

export const AllServicesScreen = ({ navigation }: any) => {

  const handleCategoryPress = (category: any) => {
    navigation.navigate('SubcategoryScreen', { category });
  };

  const renderSection = (category: Category) => {
    return (
      <View key={category.id} style={styles.sectionWrap}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{category.title}</Text>
          <View style={styles.titleLine} />
        </View>
        <View style={styles.grid}>
          {category.sections.flatMap(sec => sec.items).map((item: any, index: number) => (
            <TouchableOpacity
              key={`${item.title}-${index}`}
              style={styles.cardContainer}
              onPress={() => handleCategoryPress(category)}
              activeOpacity={0.7}
            >
              <Surface style={styles.cardSurface} elevation={0}>
                <View style={styles.iconWrapper}>
                  {(item.image || item.localIcon) ? (
                    <Image 
                      source={typeof (item.image || item.localIcon) === 'string' ? { uri: (item.image || item.localIcon) } : (item.image || item.localIcon)} 
                      style={styles.cardImg} 
                    />
                  ) : (
                    <LucideIcon 
                      name={item.icon || 'HelpCircle'} 
                      size={24} 
                      color={Theme.colors.primary} 
                      strokeWidth={2}
                    />
                  )}
                </View>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
              </Surface>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView style={styles.headerSafe} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <LucideIcon name="ArrowLeft" size={24} color={Theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Explore Services</Text>
          <TouchableOpacity style={styles.searchBtn} onPress={() => navigation.navigate('Search')} activeOpacity={0.7}>
            <LucideIcon name="Search" size={24} color={Theme.colors.text.primary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollPadding} showsVerticalScrollIndicator={false}>
        <View style={styles.introBox}>
          <Text style={styles.introPreTitle}>SERVICE CATALOG</Text>
          <Text style={styles.introTitle}>All Categories</Text>
          <Text style={styles.introSub}>Find verified professionals for every home need.</Text>
        </View>

        {CATEGORIES.map(renderSection)}
      </ScrollView>

      <View style={[styles.bottomBlur, { backgroundColor: 'transparent' }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerSafe: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    height: 64,
  },
  backBtn: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center' },
  headerText: { fontSize: 18, fontWeight: '900', color: Theme.colors.text.primary, letterSpacing: -0.5 },
  searchBtn: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center' },

  scrollPadding: { paddingTop: 32, paddingBottom: 120 },

  introBox: { paddingHorizontal: 24, marginBottom: 40 },
  introPreTitle: { fontSize: 11, fontWeight: '900', color: Theme.colors.primary, letterSpacing: 1.5, marginBottom: 8 },
  introTitle: { fontSize: 32, fontWeight: '900', color: Theme.colors.text.primary, letterSpacing: -1, marginBottom: 8 },
  introSub: { fontSize: 15, fontWeight: '600', color: Theme.colors.text.secondary, lineHeight: 22 },

  sectionWrap: { marginBottom: 32 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
    gap: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: Theme.colors.text.primary, letterSpacing: -0.2 },
  titleLine: { flex: 1, height: 1.5, backgroundColor: '#F1F5F9' },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },

  cardContainer: {
    width: '33.33%',
    padding: 6,
    marginBottom: 8,
  },
  cardSurface: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Theme.colors.text.primary,
    textAlign: 'center',
    lineHeight: 14,
    paddingHorizontal: 2,
  },
  cardIcon: { marginTop: 4 },
  tagWrap: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 1,
  },
  tagText: { color: '#FFFFFF', fontSize: 8, fontWeight: '900' },
  cardImg: { width: 32, height: 32, resizeMode: 'contain' },

  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignItems: 'center',
  },
  badgeText: { fontSize: 8, fontWeight: '900', color: '#166534' },

  bottomBlur: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
  }
});
