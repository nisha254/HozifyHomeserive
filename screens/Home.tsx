import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  Image,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, ChevronDown, ShoppingCart, Search, X } from 'lucide-react-native';
import { Text, Surface } from 'react-native-paper';
import { CustomServiceGrid } from '../components/home/HomeComponents';
import { Theme } from '../constants/Theme';
import { useStore } from '../store/useStore';
import { CATEGORIES } from '../constants/Categories';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const ALL_SERVICES_MOCK = {
  id: 'all',
  isAllServices: true,
  groups: [
    {
      groupTitle: 'Appliance & Repairs',
      sections: [
        {
          title: 'Appliances',
          items: [
            { title: 'AC Repair', id: '5', image: 'https://cdn-icons-png.flaticon.com/512/910/910114.png' },
            { title: 'Washing Machine', id: '5', image: 'https://cdn-icons-png.flaticon.com/512/3003/3003984.png' },
            { title: 'Refrigerator', id: '5', image: 'https://cdn-icons-png.flaticon.com/512/869/869502.png' },
          ],
        },
        {
          title: 'Home Repairs',
          items: [
            { title: 'Electrician', id: '3', image: 'https://cdn-icons-png.flaticon.com/512/1904/1904425.png' },
            { title: 'Plumber', id: '4', image: 'https://cdn-icons-png.flaticon.com/512/3201/3201509.png' },
            { title: 'Carpenter', id: '7', image: 'https://cdn-icons-png.flaticon.com/512/6134/6134704.png' },
          ],
        },
      ],
    },
    {
      groupTitle: 'Personal & Home Care',
      sections: [
        {
          title: 'Beauty & Cleaning',
          items: [
            { title: "Women's Salon", id: '2', image: 'https://cdn-icons-png.flaticon.com/512/2665/2665038.png' },
            { title: "Men's Salon", id: 'men-salon', image: 'https://cdn-icons-png.flaticon.com/512/3595/3595460.png' },
            { title: 'Home Cleaning', id: '1', image: 'https://static.vecteezy.com/system/resources/thumbnails/046/841/849/small/woman-house-cleaning-transparent-free-png.png' },
            { title: 'Pest Control', id: '6', image: 'https://cdn-icons-png.flaticon.com/512/2800/2800047.png' },
          ],
        },
      ],
    },
  ],
};

const PROMO_OFFERS = [
  {
    id: '1',
    discount: '20% Off',
    title: 'On your first women salon',
    subtitle: 'up to ₹100 off',
    btnLabel: 'Claim now',
    bg: '#FFF7ED',
    accent: '#FF6B35',
  },
  {
    id: '2',
    discount: '₹500 Off',
    title: 'On Home Cleaning',
    subtitle: 'Limitless freshness',
    btnLabel: 'Claim now',
    bg: '#EFF6FF',
    accent: '#3B82F6',
  },
  {
    id: '3',
    discount: 'Free',
    title: 'Consultation for Family Events',
    subtitle: 'Make it memorable',
    btnLabel: 'Claim now',
    bg: '#F0FDF4',
    accent: '#10B981',
  },
];

export const HomeScreen = ({ navigation }: any) => {
  const { location, user } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const promoRef = React.useRef<FlatList>(null);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentPromoIndex + 1) % PROMO_OFFERS.length;
      setCurrentPromoIndex(nextIndex);
      promoRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 4000);
    return () => clearInterval(timer);
  }, [currentPromoIndex]);

  const handleCategoryPress = (category: any) => {
    setSelectedCategory(category);
    setIsSheetVisible(true);
  };

  const closeSheet = () => setIsSheetVisible(false);

  const handleSubCategoryPress = (subcategory: any) => {
    setIsSheetVisible(false);
    navigation.navigate('SubcategoryScreen', {
      category: selectedCategory,
      subcategoryTitle: subcategory.title,
    });
  };

  return (
    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.root}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* ── HEADER ─────────────────────────────────────── */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: 'transparent' }}>
        <View style={styles.headerContent}>

          {/* Greeting + Cart */}
          <View style={styles.greetRow}>
            <View>
              <Text style={styles.greetSub}>Hi {user?.firstName || 'John'},</Text>
              <Text style={styles.greetTitle}>Welcome back!</Text>
            </View>
            <TouchableOpacity
              style={styles.cartBtn}
              onPress={() => navigation.navigate('Cart')}
            >
              <View style={styles.cartCircle}>
                <ShoppingCart size={22} color="#89CFF0" strokeWidth={1.5} />
                <View style={styles.cartBadge}>
                  <Text style={styles.badgeText}>1</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Location row */}
          <TouchableOpacity
            style={styles.locationRow}
            onPress={() => navigation.navigate('AreaSelection')}
            activeOpacity={0.7}
          >
            <MapPin size={18} color="#003B95" strokeWidth={2.5} />
            <View style={styles.locationTexts}>
              <Text style={styles.locationName}>Rajwada</Text>
              <Text style={styles.locationSub} numberOfLines={1}>
                Tilak Path- Indore- Madhya Prades...
              </Text>
            </View>
            <ChevronDown size={18} color="#64748B" strokeWidth={2.5} />
          </TouchableOpacity>

        </View>
      </SafeAreaView>

      {/* ── WHITE SHEET ────────────────────────────────── */}
      <View style={styles.sheet}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* Search bar */}
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate('Search')}
            activeOpacity={0.9}
          >
            <Search size={20} color="#94A3B8" strokeWidth={2} />
            <Text style={styles.searchText}>Search for "Women Salon"</Text>
          </TouchableOpacity>

          {/* Promo carousel */}
          <View style={styles.promoWrap}>
            <FlatList
              ref={promoRef}
              data={PROMO_OFFERS}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / (width - 32));
                setCurrentPromoIndex(index);
              }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={[styles.promoBanner, { backgroundColor: item.bg, width: width - 32 }]}>
                  <View>
                    <Text style={[styles.promoDiscount, { color: item.accent }]}>{item.discount}</Text>
                    <Text style={styles.promoTitle}>{item.title}</Text>
                    <Text style={styles.promoSub}>{item.subtitle}</Text>
                    <TouchableOpacity
                      style={[styles.promoBtn, { backgroundColor: item.accent }]}
                    >
                      <Text style={styles.promoBtnText}>{item.btnLabel}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            {/* Dots */}
            <View style={styles.promoDots}>
              {PROMO_OFFERS.map((_, i) => (
                <View
                  key={i}
                  style={[styles.dot, currentPromoIndex === i && styles.dotActive]}
                />
              ))}
            </View>
          </View>

          {/* Services grid */}
          <Text style={styles.sectionTitle}>Services</Text>
          <CustomServiceGrid
            onNavigate={(item: any) => {
              if (item.id === 'all') {
                handleCategoryPress(ALL_SERVICES_MOCK);
              } else {
                const cat = CATEGORIES.find((c) => c.id === item.id);
                if (cat) handleCategoryPress(cat);
              }
            }}
          />

          {/* Refer & Earn */}
          <TouchableOpacity
            style={styles.referCard}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Referral')}
          >
            <View style={styles.referText}>
              <Text style={styles.referTitle}>Refer and get{'\n'}free services</Text>
              <Text style={styles.referSub}>Invite and get ₹100*</Text>
            </View>
            <Image
              source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/053/442/557/small/vibrant-blue-megaphone-announcement-for-refer-a-friend-with-hand-holding-banner-illustration-png.png' }}
              style={styles.referImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

        </ScrollView>
      </View>

      {/* ── BOTTOM SHEET MODAL ─────────────────────────── */}
      <Modal
        visible={isSheetVisible}
        transparent
        animationType="none"
        onRequestClose={closeSheet}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1}>
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            style={StyleSheet.absoluteFill}
          >
            <View style={styles.darkBg} />
          </Animated.View>

          <Animated.View style={styles.sheetContainer}>
            <TouchableOpacity style={styles.closeBtn} onPress={closeSheet}>
              <X size={24} color="#0F172A" strokeWidth={2.5} />
            </TouchableOpacity>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.sheetScroll}
            >
              {selectedCategory?.isAllServices ? (
                selectedCategory.groups.map((group: any, gIdx: number) => (
                  <View key={gIdx}>
                    {gIdx > 0 && <View style={styles.groupDivider} />}
                    {group.groupTitle && (
                      <Text style={styles.groupTitle}>{group.groupTitle}</Text>
                    )}
                    {group.sections.map((sec: any, sIdx: number) => (
                      <View key={sIdx} style={styles.sectionContainer}>
                        <Text style={styles.secTitle}>{sec.title}</Text>
                        <View style={styles.subGrid}>
                          {sec.items.map((sub: any, idx: number) => (
                            <TouchableOpacity
                              key={idx}
                              style={styles.subItem}
                              onPress={() => handleSubCategoryPress(sub)}
                            >
                              <Surface style={styles.subIconBox} elevation={0}>
                                <Image
                                  source={{ uri: sub.image }}
                                  style={styles.subImage}
                                />
                              </Surface>
                              <Text style={styles.subLabel} numberOfLines={2}>
                                {sub.title}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    ))}
                  </View>
                ))
              ) : (
                <>
                  <Text style={styles.sheetTitle}>{selectedCategory?.title}</Text>
                  <View style={styles.subGrid}>
                    {(selectedCategory?.sections?.[0]?.items || []).map(
                      (sub: any, idx: number) => (
                        <TouchableOpacity
                          key={idx}
                          style={styles.subItem}
                          onPress={() => handleSubCategoryPress(sub)}
                        >
                          <Surface style={styles.subIconBox} elevation={0}>
                            <Image source={{ uri: sub.image }} style={styles.subImage} />
                          </Surface>
                          <Text style={styles.subLabel} numberOfLines={2}>
                            {sub.title}
                          </Text>
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                </>
              )}
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  /* ── Root ─────────────────────────────────────────── */
  root: {
    flex: 1,
  },

  /* ── Header ───────────────────────────────────────── */
  headerContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  greetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  greetSub: {
    fontSize: 16,
    fontWeight: '500',
    color: Theme.colors.text.secondary,
  },
  greetTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: Theme.colors.text.primary,
    letterSpacing: -0.6,
    marginTop: 2,
  },
  cartBtn: {},
  cartCircle: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: Theme.colors.glass,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: Theme.colors.status.error,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Theme.colors.white,
  },
  badgeText: {
    color: Theme.colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationTexts: { flex: 1 },
  locationName: {
    fontSize: 15,
    fontWeight: '700',
    color: Theme.colors.text.primary,
  },
  locationSub: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
    fontWeight: '400',
  },

  /* ── White sheet ──────────────────────────────────── */
  sheet: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 60,
  },

  /* Search */
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
    marginHorizontal: 16,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    gap: 10,
    marginBottom: 16,
  },
  searchText: {
    fontSize: 15,
    color: Theme.colors.text.muted,
    fontWeight: '400',
  },

  /* Promo */
  promoWrap: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  promoBanner: {
    borderRadius: 16,
    padding: 20,
    minHeight: 110,
    justifyContent: 'center',
  },
  promoDiscount: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.text.primary,
    marginBottom: 2,
  },
  promoSub: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
    marginBottom: 12,
  },
  promoBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  promoBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Theme.colors.white,
  },
  promoDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Theme.colors.text.muted,
  },
  dotActive: {
    backgroundColor: Theme.colors.brandBlue,
    width: 14,
  },

  /* Section title */
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Theme.colors.text.primary,
    marginHorizontal: 16,
    marginBottom: 14,
    letterSpacing: -0.3,
  },

  /* Refer card */
  referCard: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.brandBlueLight,
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  referText: { flex: 1 },
  referTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: Theme.colors.text.primary,
    lineHeight: 24,
  },
  referSub: {
    fontSize: 13,
    color: Theme.colors.text.secondary,
    marginTop: 6,
  },
  referImage: {
    width: 110,
    height: 80,
  },

  /* Modal */
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  darkBg: { ...StyleSheet.absoluteFillObject, backgroundColor: Theme.colors.overlay },
  sheetContainer: {
    backgroundColor: Theme.colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: height * 0.9,
    minHeight: 300,
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.surface,
    position: 'absolute',
    top: -60,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  sheetScroll: { padding: 24, paddingBottom: 60 },
  sheetTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Theme.colors.text.primary,
    marginBottom: 24,
  },
  groupDivider: {
    height: 8,
    backgroundColor: Theme.colors.borderLight,
    marginHorizontal: -24,
    marginBottom: 24,
    marginTop: 16,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Theme.colors.text.primary,
    marginBottom: 20,
  },
  sectionContainer: { marginBottom: 28 },
  secTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 14,
  },
  subGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  subItem: { width: (width - 48 - 36) / 4, alignItems: 'center' },
  subIconBox: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Theme.colors.borderLight,
  },
  subImage: { width: '60%', height: '60%', resizeMode: 'contain' },
  subLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Theme.colors.text.primary,
    textAlign: 'center',
  },
});