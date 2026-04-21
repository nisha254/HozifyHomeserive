import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Modal, Image, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MapPin, ChevronDown, ShoppingCart, Search, X } from 'lucide-react-native';
import { Text, Surface, IconButton } from 'react-native-paper';
import {
  CustomServiceGrid,
} from '../components/home/HomeComponents';
import { Theme } from '../constants/Theme';
import { useStore } from '../store/useStore';
import { CATEGORIES } from '../constants/Categories';
import Animated, { FadeInDown, FadeIn, FadeOut } from 'react-native-reanimated';
import { LucideIcon } from '../components/LucideIcon';

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
            { title: 'Refrigerator', id: '5', image: 'https://cdn-icons-png.flaticon.com/512/869/869502.png' }
          ]
        },
        {
          title: 'Home Repairs',
          items: [
            { title: 'Electrician', id: '3', image: 'https://cdn-icons-png.flaticon.com/512/1904/1904425.png' },
            { title: 'Plumber', id: '4', image: 'https://cdn-icons-png.flaticon.com/512/3201/3201509.png' },
            { title: 'Carpenter', id: '7', image: 'https://cdn-icons-png.flaticon.com/512/6134/6134704.png' }
          ]
        }
      ]
    },
    {
      groupTitle: 'Personal & Home Care',
      sections: [
        {
          title: 'Beauty & Cleaning',
          items: [
            { title: 'Women\'s Salon', id: '2', image: 'https://cdn-icons-png.flaticon.com/512/2665/2665038.png' },
            { title: 'Men\'s Salon', id: 'men-salon', image: 'https://cdn-icons-png.flaticon.com/512/3595/3595460.png' },
            { title: 'Home Cleaning', id: '1', image: 'https://static.vecteezy.com/system/resources/thumbnails/046/841/849/small/woman-house-cleaning-transparent-free-png.png' },
            { title: 'Pest Control', id: '6', image: 'https://cdn-icons-png.flaticon.com/512/2800/2800047.png' }
          ]
        }
      ]
    },
    {
      groupTitle: 'Specialized Services',
      sections: [
        {
          title: 'Agri & Health',
          items: [
            { title: 'Agriculture', id: '10', image: 'https://cdn-icons-png.flaticon.com/512/2816/2816694.png' },
            { title: 'Healthcare', id: '11', image: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png' },
            { title: 'Automobile', id: '9', image: 'https://cdn-icons-png.flaticon.com/512/744/744465.png' }
          ]
        },
        {
          title: 'Rental & Events',
          items: [
            { title: 'Equipment Rental', id: '13', image: 'https://cdn-icons-png.flaticon.com/512/1063/1063346.png' },
            { title: 'Family Events', id: '12', image: 'https://cdn-icons-png.flaticon.com/512/3595/3595460.png' },
            { title: 'Painting', id: '8', image: 'https://cdn-icons-png.flaticon.com/512/2972/2972175.png' }
          ]
        }
      ]
    }
  ]
};

const PROMO_OFFERS = [
  {
    id: '1',
    title: '20% off on your\nfirst AC servicing',
    subtitle: 'Up to ₹100 off',
    image: 'https://png.pngtree.com/png-clipart/20250415/original/pngtree-summer-air-conditioning-refrigeration-evaporative-cooler-hvac-company-png-image_20720031.png'
  },
  {
    id: '2',
    title: 'Flat ₹500 off on\nHome Cleaning',
    subtitle: 'Limitless freshness',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/046/841/849/small/woman-house-cleaning-transparent-free-png.png'
  },
  {
    id: '3',
    title: 'Free consultation\nfor Family Events',
    subtitle: 'Make it memorable',
    image: 'https://png.pngtree.com/png-vector/20250124/ourmid/pngtree-strengthening-communities-with-family-support-services-png-image_15320614.png'
  }
];

export const HomeScreen = ({ navigation }: any) => {
  const { location } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  // Carousel Logic
  const promoRef = React.useRef<FlatList>(null);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentPromoIndex + 1) % PROMO_OFFERS.length;
      setCurrentPromoIndex(nextIndex);
      promoRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 4000); // 4 seconds interval

    return () => clearInterval(timer);
  }, [currentPromoIndex]);

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
      <StatusBar barStyle="light-content" backgroundColor="#1A87E5" />

      <SafeAreaView edges={['top']} style={{ backgroundColor: '#1A87E5' }}>
        <View style={styles.headerSafe}>
          <View style={styles.topHeaderContent}>
            <TouchableOpacity
              style={styles.locationSection}
              onPress={() => navigation.navigate('AreaSelection')}
              activeOpacity={0.7}
            >
              <View style={styles.locationIconWrap}>
                <MapPin size={24} color="#FFFFFF" strokeWidth={2.5} />
              </View>
              <View style={styles.locationTextWrap}>
                <View style={styles.timeRow}>
                  <Text style={styles.timeText}>In 44 minutes</Text>
                </View>
                <View style={styles.timeRow}>
                  <Text style={styles.locationArea} numberOfLines={1}>
                    Durga Nagar - Agarwal Nagar- Ol...
                  </Text>
                  <ChevronDown size={16} color="rgba(255,255,255,0.8)" style={{ marginLeft: 4 }} strokeWidth={2.5} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cartBtn}
              onPress={() => navigation.navigate('Cart')}
            >
              <Surface style={styles.cartIconCircle} elevation={0}>
                <ShoppingCart size={22} color="#0F172A" strokeWidth={2.5} />
                <View style={styles.cartBadge}>
                  <Text style={styles.badgeText}>1</Text>
                </View>
              </Surface>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.inlineSearchBar}
            onPress={() => navigation.navigate('Search')}
            activeOpacity={0.9}
          >
            <Search size={22} color="#64748B" strokeWidth={2.5} />
            <Text style={styles.inlineSearchText}>Search for 'Facial'</Text>
          </TouchableOpacity>

          <View style={styles.promoCarouselContainer}>
            <FlatList
              ref={promoRef}
              data={PROMO_OFFERS}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / width);
                setCurrentPromoIndex(index);
              }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={[styles.promoBannerWrap, { width: width }]}>
                  <View style={styles.promoTextCol}>
                    <Text style={styles.promoBannerTitle}>{item.title}</Text>
                    <Text style={styles.promoBannerSub}>{item.subtitle}</Text>
                  </View>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.promoBannerImage}
                    resizeMode="contain"
                  />
                </View>
              )}
            />
            {/* Pagination Dots */}
            <View style={styles.promoPagination}>
              {PROMO_OFFERS.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.promoDot,
                    currentPromoIndex === i && styles.promoDotActive
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollPadding} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <CustomServiceGrid onNavigate={(item: any) => {
            if (item.id === 'all') {
              handleCategoryPress(ALL_SERVICES_MOCK);
            } else {
              const cat = CATEGORIES.find(c => c.id === item.id);
              if (cat) handleCategoryPress(cat);
            }
          }} />
        </Animated.View>

        {/* <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.nativeCardContainer}>
          <Text style={styles.nativeSectionTitle}>Native Smart Products</Text>
          <TouchableOpacity
            style={styles.nativeCard}
            activeOpacity={0.9}
            onPress={() => { }}
          >
            <View style={styles.nativeCardImageWrap}>
              <Image source={{ uri: 'https://res.cloudinary.com/urbanclap/image/upload/t_high_res_category/w_100,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1679313203487-7f9cb3.jpeg' }} style={styles.nativeCardImage} resizeMode="contain" />
              <Text style={styles.nativeOfferText}>7 years,{'\n'}₹0 cost.</Text>
            </View>
            <Text style={styles.nativeCardLabel}>Native Water{'\n'}Purifier</Text>
          </TouchableOpacity>
        </Animated.View> */}

        {/* Refer and Earn Section */}
        {/* <Animated.View entering={FadeInDown.delay(600).duration(600)}> */}
        <TouchableOpacity
          style={styles.referCard}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Referral')}
        >
          <View style={styles.referTextContainer}>
            <Text style={styles.referTitle}>Refer and get{'\n'}free services</Text>
            <Text style={styles.referSub}>Invite and get ₹100*</Text>
          </View>
          <Image
            source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/053/442/557/small/vibrant-blue-megaphone-announcement-for-refer-a-friend-with-hand-holding-banner-illustration-png.png' }}
            style={styles.referImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {/* </Animated.View> */}
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
        // onPress={closeSheet}
        >
          <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)} style={StyleSheet.absoluteFill}>

            <View style={styles.darkBackground} />
          </Animated.View>

          <Animated.View
            style={styles.sheetContainer}
          >
            <TouchableOpacity style={styles.closeBtn} onPress={closeSheet}>
              <X size={24} color="#0F172A" strokeWidth={2.5} />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetContent}>
              {selectedCategory?.isAllServices ? (
                <>
                  {selectedCategory.groups.map((group: any, gIdx: number) => (
                    <View key={gIdx}>
                      {gIdx > 0 && <View style={styles.groupDivider} />}
                      {group.groupTitle && <Text style={styles.groupTitle}>{group.groupTitle}</Text>}

                      {group.sections.map((sec: any, sIdx: number) => (
                        <View key={sIdx} style={styles.sectionContainer}>
                          <Text style={styles.sectionTitle}>{sec.title}</Text>
                          <View style={styles.subcategoryGrid}>
                            {sec.items.map((sub: any, idx: number) => (
                              <TouchableOpacity
                                key={idx}
                                style={styles.subGridItem}
                                onPress={() => handleSubCategoryPress(sub)}
                              >
                                <Surface style={styles.subIconBox} elevation={0}>
                                  {sub.image || sub.localIcon ? (
                                    <Image source={typeof (sub.image || sub.localIcon) === 'string' ? { uri: (sub.image || sub.localIcon) } : (sub.image || sub.localIcon)} style={styles.subImage} />
                                  ) : (
                                    <LucideIcon name={sub.icon as any || 'HelpCircle'} size={24} color={Theme.colors.primary} strokeWidth={1.5} />
                                  )}
                                  {sub.sale && (
                                    <View style={styles.subSaleBadge}>
                                      <Text style={styles.subSaleBadgeText}>Sale</Text>
                                    </View>
                                  )}
                                  {sub.time && (
                                    <View style={styles.subTimeBadge}>
                                      <Text style={styles.subTimeText}>{sub.time}</Text>
                                    </View>
                                  )}
                                </Surface>
                                <Text style={styles.subLabel} numberOfLines={3}>{sub.title}</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      ))}
                    </View>
                  ))}
                </>
              ) : (
                <>
                  <Text style={styles.sheetTitle}>{selectedCategory?.title || "Services"}</Text>
                          <View style={styles.subcategoryGrid}>
                    {(selectedCategory?.sections?.[0]?.items || []).slice(0, 4).map((sub: any, idx: number) => (
                      <TouchableOpacity
                        key={idx}
                        style={styles.subGridItem}
                        onPress={() => handleSubCategoryPress(sub)}
                      >
                        <Surface style={styles.subIconBox} elevation={0}>
                          {(sub.image || sub.localIcon) ? (
                            <Image source={typeof (sub.image || sub.localIcon) === 'string' ? { uri: (sub.image || sub.localIcon) } : (sub.image || sub.localIcon)} style={styles.subImage} />
                          ) : (
                            <LucideIcon name={sub.icon as any || 'HelpCircle'} size={24} color={Theme.colors.primary} strokeWidth={1.5} />
                          )}
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
                </>
              )}
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerSafe: {
    backgroundColor: '#1A87E5',
    paddingBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  topHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  locationSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationIconWrap: { width: 24, alignItems: 'center', marginRight: 4 },
  locationTextWrap: { flex: 1 },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    ...Theme.typography.presets.h2,
    color: '#FFFFFF',
    marginBottom: 2
  },
  locationArea: {
    ...Theme.typography.presets.caption,
    color: 'rgba(255,255,255,0.85)',
  },
  cartBtn: {
    marginLeft: 10,
  },
  cartIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: '#E73B3B',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1A87E5',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  inlineSearchBar: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 8,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  inlineSearchText: {
    ...Theme.typography.presets.body,
    color: '#64748B',
    marginLeft: 10,
  },
  promoCarouselContainer: {
    height: 140,
    marginBottom: 0,
    position: 'relative'
  },
  promoBannerWrap: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 0,
    minHeight: 120,
    position: 'relative',
    height: 120,
  },
  promoPagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    gap: 4,
  },
  promoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  promoDotActive: {
    backgroundColor: '#FFFFFF',
    width: 14,
  },
  promoTextCol: {
    flex: 1.2,
    paddingBottom: 24,
  },
  promoBannerTitle: {
    color: '#FFFFFF',
    ...Theme.typography.presets.h2,
    lineHeight: 28,
  },
  promoBannerSub: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 8,
    opacity: 0.95
  },
  promoBannerImage: {
    flex: 1,
    height: 130,
    width: 160,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },

  // scrollPadding: { paddingBottom: 100, paddingTop: 16 },
  nativeCardContainer: { paddingHorizontal: 16, marginTop: 24 },
  nativeSectionTitle: { ...Theme.typography.presets.h4, color: '#1E293B', marginBottom: 16 },
  nativeCard: {
    width: 120,
    alignItems: 'center',
  },
  nativeCardImageWrap: {
    width: '100%',
    height: 80,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    position: 'relative',
    overflow: 'hidden'
  },
  nativeCardImage: {
    width: '100%',
    height: '100%',
    opacity: 0.2
  },
  nativeOfferText: {
    position: 'absolute',
    color: '#059669',
    fontWeight: '800',
    fontSize: 14,
    textAlign: 'center',
    transform: [{ rotate: '-10deg' }]
  },
  nativeCardLabel: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 16
  },
  referCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginTop: 32,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderColor: '#F8FAFC',
    alignItems: 'center',
  },
  referTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  referTitle: {
    ...Theme.typography.presets.h2,
    color: '#1E293B',
    lineHeight: 28,
  },
  referSub: {
    ...Theme.typography.presets.bodySm,
    color: '#475569',
    marginTop: 8,
  },
  referImage: {
    width: 140,
    height: 100,
  },

  // Bottom Sheet Styles
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  darkBackground: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: height * 0.9,
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
  sheetContent: { padding: 24, paddingBottom: 60 },
  sheetTitle: { ...Theme.typography.presets.h2, color: '#0F172A', marginBottom: 24 },
  groupDivider: { height: 8, backgroundColor: '#F1F5F9', marginHorizontal: -24, marginBottom: 24, marginTop: 16 },
  groupTitle: { ...Theme.typography.presets.h2, fontSize: 22, color: '#0F172A', marginBottom: 20 },
  sectionContainer: { marginBottom: 28 },
  sectionTitle: { ...Theme.typography.presets.h4, color: '#1E293B', marginBottom: 16 },
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
  subImage: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain'
  },
  subLabel: { ...Theme.typography.presets.label, color: '#1E293B', textAlign: 'center' },
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
  subTimeText: { fontSize: 9, fontWeight: '700', color: '#059669' },
  subSaleBadge: {
    position: 'absolute',
    top: -6,
    left: 4,
    backgroundColor: '#10B981',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  subSaleBadgeText: { fontSize: 8, fontWeight: '800', color: '#FFFFFF' },
});
