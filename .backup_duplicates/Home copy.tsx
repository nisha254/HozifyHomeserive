import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Surface, IconButton } from 'react-native-paper';
import {
  FloatingSearchBar,
  SectionHeader,
  CustomServiceGrid,
  HeroCarousel
} from '../components/home/HomeComponents';
import { Theme } from '../constants/Theme';
import { useStore } from '../store/useStore';
import { CATEGORIES } from '../constants/Categories';
import Animated, { FadeInDown, SlideInDown, SlideOutDown, FadeIn, FadeOut } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export const HomeScreen = ({ navigation }: any) => {
  const { location } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const handleCategoryPress = (category: any) => {
    setSelectedCategory(category);
    setIsSheetVisible(true);
  };

  const closeSheet = () => {
    setIsSheetVisible(false);
  };

  const handleSubCategoryPress = (subcategory: any) => {
    setIsSheetVisible(false);
    // Passing both the main category and subcategory index/data
    navigation.navigate('SubcategoryScreen', {
      category: selectedCategory,
      subcategoryTitle: subcategory.title
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Theme.colors.primary} />

      <SafeAreaView style={styles.headerSafe} edges={['top']}>
        <View style={styles.topHeaderContent}>
          <TouchableOpacity
            style={styles.locationSection}
            onPress={() => navigation.navigate('AreaSelection')}
            activeOpacity={0.7}
          >
            <View style={styles.locationIconWrap}>
              <MaterialCommunityIcons name="map-marker" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.locationTextWrap}>
              <View style={styles.timeRow}>
                <Text style={styles.timeText}>In 14 minutes</Text>
                <MaterialCommunityIcons name="chevron-down" size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.locationArea} numberOfLines={1}>
                Home - {location?.area || '510, JP Nagar 7th Phas...'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => navigation.navigate('Cart')}
          >
            <Surface style={styles.cartIconCircle} elevation={0}>
              <MaterialCommunityIcons name="cart-outline" size={26} color="#0F172A" />
              <View style={styles.cartBadge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </Surface>
          </TouchableOpacity>
        </View>

        <FloatingSearchBar
          placeholder="Search for 'Kitchen cleaning'"
          onPress={() => navigation.navigate('Search')}
        />
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollPadding} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={{ marginTop: 10 }}>
          <HeroCarousel />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(600)}>
          <SectionHeader
            title="Explore all services"
            onSeeAll={() => navigation.navigate('CategoryListScreen')}
          />
          <CustomServiceGrid onNavigate={(category: any) => handleCategoryPress(category)} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(600)} style={styles.referCardContainer}>
          <TouchableOpacity
            style={styles.referCard}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Referral')}
          >
            <View style={styles.referCardContent}>
              <Text style={styles.referCardTitle}>Refer & earn ₹100</Text>
              <Text style={styles.referCardSub}>Get ₹100 when your friend completes their first service</Text>
              <View style={styles.referCardBtn}>
                <Text style={styles.referCardBtnText}>Refer now</Text>
              </View>
            </View>
            <MaterialCommunityIcons name="gift-outline" size={80} color={Theme.colors.primary} style={styles.referCardImage} />
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Subcategory Bottom Sheet */}
      <Modal
        visible={isSheetVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeSheet}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeSheet}
        >
          <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)} style={StyleSheet.absoluteFill}>
            <View style={styles.darkBackground} />
          </Animated.View>

          <Animated.View
            // entering={SlideInDown.springify().damping(20)}
            // exiting={SlideOutDown.duration(300)}
            style={styles.sheetContainer}
          >
            <TouchableOpacity style={styles.closeBtn} onPress={closeSheet}>
              <MaterialCommunityIcons name="close" size={24} color="#000000" />
            </TouchableOpacity>

            <View style={styles.sheetContent}>
              <Text style={styles.sheetTitle}>{selectedCategory?.title || "Services"}</Text>

              <View style={styles.subcategoryGrid}>
                {selectedCategory?.sections[0]?.items.slice(0, 4).map((sub: any, idx: number) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.subGridItem}
                    onPress={() => handleSubCategoryPress(sub)}
                  >
                    <Surface style={styles.subIconBox} elevation={0}>
                      <MaterialCommunityIcons name={sub.icon as any} size={32} color={Theme.colors.primary} />
                      {sub.badge && (
                        <View style={styles.subTimeBadge}>
                          <Text style={styles.subTimeText}>{Math.floor(Math.random() * 30 + 10)} mins</Text>
                        </View>
                      )}
                    </Surface>
                    <Text style={styles.subLabel} numberOfLines={2}>{sub.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerSafe: {
    backgroundColor: Theme.colors.primary,
    paddingBottom: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  topHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 20,
  },
  locationSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationIconWrap: { width: 24, alignItems: 'center' },
  locationTextWrap: { flex: 1 },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  locationArea: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  cartBtn: {
    marginLeft: 10,
  },
  cartIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },

  scrollPadding: { paddingBottom: 100 },
  referCardContainer: { paddingHorizontal: 20, marginTop: 20 },
  referCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  referCardContent: { flex: 1 },
  referCardTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A', marginBottom: 8 },
  referCardSub: { fontSize: 13, color: '#64748B', lineHeight: 18, marginBottom: 16, fontWeight: '500' },
  referCardBtn: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  referCardBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  referCardImage: { marginLeft: 12, opacity: 0.1 },

  // Bottom Sheet Styles
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  darkBackground: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingBottom: 40,
    minHeight: 300,
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: -60,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  sheetContent: { padding: 24 },
  sheetTitle: { fontSize: 28, fontWeight: '900', color: '#0F172A', marginBottom: 24 },
  subcategoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  subGridItem: { width: (width - 48 - 36) / 4, alignItems: 'center' },
  subIconBox: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  subLabel: { fontSize: 11, fontWeight: '700', color: '#1E293B', textAlign: 'center', lineHeight: 15 },
  subTimeBadge: {
    position: 'absolute',
    bottom: -4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
  },
  subTimeText: { fontSize: 8, fontWeight: '800', color: '#059669' },
});
