import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, StatusBar, Modal, Share } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { Theme } from '../constants/Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Share2, Star, Tag, Menu, X } from 'lucide-react-native';
import { LucideIcon } from '../components/LucideIcon';
const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 40 - 36) / 4; // 20 padding each side, 3 gaps of 12

const DEMO_ITEMS = [
  { id: '1', title: 'Super saver\npackages', type: 'offer' },
  { id: '2', title: 'Waxing &\nthreading', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=300' },
  { id: '3', title: 'Korean facial', image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=300' },
  { id: '4', title: 'Signature\nfacial', image: 'https://images.unsplash.com/photo-1508296695146-257a814050b4?auto=format&fit=crop&q=80&w=300' },
  { id: '5', title: 'Cleanup', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=300' },
  { id: '6', title: 'Pedicure\nmanicure', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=300' },
  { id: '7', title: 'Bleach\ndetan', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=300' },
];

export const SubcategoryScreen = ({ navigation, route }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Gracefully handle undefined route params in case it's opened differently
  const category = route?.params?.category || { title: 'Salon Prime', rating: 4.85, bookingsCount: '17.1 M', sections: [] };
  const insets = useSafeAreaInsets();

  const tempItems = category?.sections?.flatMap((sec: any) => sec.items) || [];
  const itemsToDisplay = tempItems.length > 0 ? tempItems : DEMO_ITEMS;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Book expert services from ${category.title === 'Salon & Spa Services' ? 'Salon Prime' : category.title || 'Salon Prime'} on Hozify!`,
      });
    } catch (error: any) {
      console.log('Error sharing:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={category?.heroImages?.[0] ? 
              (typeof category.heroImages[0] === 'string' ? { uri: category.heroImages[0] } : category.heroImages[0]) : 
              { uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800' }
            }
            style={styles.heroImage}
          />
          {/* Gradient Overlay for text readability */}
          <View style={styles.heroGradient} />

          {/* Header Overlay */}
          <View style={[styles.headerOverlay, { paddingTop: Math.max(insets.top, 20) }]}>
            <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.goBack()}>
              <ArrowLeft size={20} color="#0F172A" />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.iconCircle}>
                <Search size={20} color="#0F172A" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconCircle} onPress={handleShare}>
                <Share2 size={20} color="#0F172A" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.heroBottomTextContainer}>
            <Text style={styles.heroBottomText}>Chia & flax seed mask for skin barrier</Text>
          </View>

          {/* Progress Bar (Stories like) */}
          <View style={styles.progressContainer}>
            <View style={styles.progressActive} />
            <View style={styles.progressInactive} />
          </View>
        </View>

        {/* Salon Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.salonTitle}>{category.title === 'Salon & Spa Services' ? 'Salon Prime' : category.title || 'Salon Prime'}</Text>
          <View style={styles.ratingRow}>
            <Star size={16} color="#0F172A" fill="#0F172A" />
            <Text style={styles.ratingText}>
              <Text style={{ fontWeight: '800' }}>{category.rating || '4.85'} </Text>
              <Text style={styles.bookingsText}>({category.bookingsCount || '17.1 M'} bookings)</Text>
            </Text>
          </View>
          <View style={styles.dottedLine} />
        </View>

        {/* Offers Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.offersContainer}
        >
          <Surface style={styles.offerCard} elevation={0}>
            <View style={styles.offerIconWrap}>
              <Tag size={18} color="#059669" />
            </View>
            <View>
              <Text style={styles.offerTitle}>Get 25% off upto 200</Text>
              <Text style={styles.offerSubtitle}>For new salon users</Text>
            </View>
          </Surface>

          <Surface style={styles.offerCard} elevation={0}>
            <View style={styles.offerIconWrap}>
              <Tag size={18} color="#059669" />
            </View>
            <View>
              <Text style={styles.offerTitle}>Get ₹50 coupon</Text>
              <Text style={styles.offerSubtitle}>After first service</Text>
            </View>
          </Surface>
        </ScrollView>

        <View style={styles.divider} />

        {/* Services Grid */}
        <View style={styles.gridContainer}>
          {itemsToDisplay.map((item: any, index: number) => (
            <TouchableOpacity
              key={item.id || item.title || index}
              style={styles.gridItem}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ServiceListing', { subcategory: item })}
            >
              <View style={styles.gridItemImageWrap}>
                {item.type === 'offer' ? (
                  <View style={styles.offerGridItem}>
                    <Text style={styles.offerGridUpto}>Upto</Text>
                    <Text style={styles.offerGridValue}>25%</Text>
                    <Text style={styles.offerGridOff}>OFF</Text>
                  </View>
                ) : (item.image || item.localIcon) ? (
                  <Image source={typeof (item.image || item.localIcon) === 'string' ? { uri: (item.image || item.localIcon) } : (item.image || item.localIcon)} style={styles.gridItemImage} />
                ) : (
                  <View style={styles.iconFallbackContainer}>
                    <LucideIcon name={item.icon || 'HelpCircle'} size={32} color={Theme.colors.primary} strokeWidth={1.5} />
                  </View>
                )}
              </View>
              <Text style={styles.gridItemLabel}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Floating Menu Button */}
      <TouchableOpacity
        style={styles.floatingMenuBtn}
        activeOpacity={0.9}
        onPress={() => setIsMenuOpen(true)}
      >
        <Menu size={20} color="#FFFFFF" />
        <Text style={styles.floatingMenuText}>Menu</Text>
      </TouchableOpacity>

      {/* Bottom Sticky Bar */}
      <View style={[styles.bottomStickyBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View style={styles.bottomBanner}>
          <Tag size={16} color="#059669" />
          <Text style={styles.bottomBannerText}>Get 25% off upto 200 for new salon users</Text>
        </View>

        <View style={styles.cartRow}>
          <Text style={styles.cartPrice}>₹1,148</Text>
          <TouchableOpacity style={styles.viewCartBtn} onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.viewCartBtnText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Modal */}
      <Modal
        visible={isMenuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setIsMenuOpen(false)}
          />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalGrid}>
                {itemsToDisplay.map((item: any, index: number) => (
                  <TouchableOpacity
                    key={item.id || item.title || index}
                    style={styles.modalGridItem}
                    onPress={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    <View style={styles.modalGridImageWrap}>
                      {item.type === 'offer' ? (
                        <View style={styles.offerGridItem}>
                          <Text style={styles.offerGridUpto}>Upto</Text>
                          <Text style={styles.offerGridValue}>25%</Text>
                          <Text style={styles.offerGridOff}>OFF</Text>
                        </View>
                      ) : item.image ? (
                        <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.gridItemImage} />
                      ) : (
                        <View style={styles.iconFallbackContainer}>
                          <MaterialCommunityIcons name={item.icon || 'tools'} size={32} color={Theme.colors.primary} />
                        </View>
                      )}
                    </View>
                    <Text style={styles.modalGridLabel}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setIsMenuOpen(false)}
            >
              <X size={24} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 180 }, // give enough space for floating elements

  heroSection: { height: 280, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },

  headerOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerRight: { flexDirection: 'row', gap: 12 },
  iconCircle: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
  },

  heroBottomTextContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20, right: 20,
    alignItems: 'center',
  },
  heroBottomText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  progressContainer: {
    position: 'absolute',
    bottom: 12,
    left: 20, right: 20,
    flexDirection: 'row',
    gap: 8,
  },
  progressActive: { flex: 1, height: 3, backgroundColor: '#FFFFFF', borderRadius: 2 },
  progressInactive: { flex: 1, height: 3, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 2 },

  detailsContainer: { paddingHorizontal: 20, paddingTop: 20 },
  salonTitle: { fontSize: 26, fontWeight: '900', color: '#0F172A', marginBottom: 8, letterSpacing: -0.5 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, color: '#0F172A' },
  bookingsText: { color: '#64748B', fontWeight: '500' },
  dottedLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#94A3B8',
    borderStyle: 'dashed',
    width: 110, // approximate width under '17.1 M bookings'
    marginLeft: 32, // align somewhat under the "(17.1..."
    marginTop: 2,
  },

  offersContainer: { paddingHorizontal: 20, paddingVertical: 20, gap: 12 },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minWidth: 220,
  },
  offerIconWrap: { marginTop: 2, marginRight: 8 },
  offerTitle: { fontSize: 14, fontWeight: '800', color: '#0F172A', marginBottom: 2 },
  offerSubtitle: { fontSize: 12, color: '#64748B', fontWeight: '500' },

  divider: { height: 8, backgroundColor: '#F8FAFC', width: '100%' },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 12,
  },
  gridItem: { width: ITEM_WIDTH, alignItems: 'center', marginBottom: 16 },
  gridItemImageWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#F1F5F9', // placeholder
  },
  gridItemImage: { width: '100%', height: '100%' },
  offerGridItem: {
    flex: 1,
    backgroundColor: '#ECFDF5', // pale green
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  offerGridUpto: { fontSize: 10, color: '#059669', fontWeight: '700' },
  offerGridValue: { fontSize: 22, color: '#059669', fontWeight: '900', lineHeight: 26 },
  offerGridOff: { fontSize: 12, color: '#059669', fontWeight: '900' },

  iconFallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },

  gridItemLabel: { fontSize: 11.5, fontWeight: '600', color: '#1E293B', textAlign: 'center', lineHeight: 15 },

  // Floating Menu
  floatingMenuBtn: {
    position: 'absolute',
    bottom: 120, // above the sticky bar
    alignSelf: 'center',
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    elevation: 5,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8,
  },
  floatingMenuText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },

  // Bottom Sticky Bar
  bottomStickyBar: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 8,
  },
  bottomBanner: {
    backgroundColor: '#ECFDF5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  bottomBannerText: { color: '#059669', fontSize: 12, fontWeight: '600' },

  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  cartPrice: { fontSize: 20, fontWeight: '900', color: '#0F172A' },
  viewCartBtn: {
    backgroundColor: '#6366F1', // purple from image
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  viewCartBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width - 40,
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
  },
  modalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  modalGridItem: {
    width: (width - 120) / 3, // container width - padding - gap
    alignItems: 'center',
    marginBottom: 16,
  },
  modalGridImageWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#F1F5F9',
  },
  modalGridLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 14,
  },
  modalCloseBtn: {
    marginTop: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
