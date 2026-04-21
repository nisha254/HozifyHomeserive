import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../constants/Theme';
import { MuiHeader } from '../components/MuiHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useStore } from '../store/useStore';

const { width } = Dimensions.get('window');

export const ServiceDetailScreen = ({ navigation, route }: any) => {
  const { subcategory } = route.params;
  const { addToCart, cart } = useStore();

  // Mock service data for detail (found by subcategory)
  const service = {
    id: subcategory?.id || 'ser_default',
    name: subcategory?.title || 'Home Deep Cleaning',
    price: 3499,
    originalPrice: 4299,
    duration: '4-6 hrs',
    rating: 4.88,
    ratingCount: '45K',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop',
    description: 'A comprehensive cleaning service that covers every inch of your space. We use professional-grade machines and eco-certified chemicals to ensure a spotless and healthy environment.',
    inclusions: [
      'Deep cleaning of all rooms & balconies',
      'Kitchen degreasing & cabinet cleaning',
      'Bathroom deep cleaning & descaling',
      'Floor scrubbing with industrial machine',
      'Window panes & fan cleaning'
    ],
    exclusions: [
      'Removal of heavy construction debris',
      'External windows above 10ft',
      'Internal cupboard cleaning (available as add-on)'
    ]
  };

  const isInCart = cart.some(item => item.id === service.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart({
        id: service.id,
        name: service.name,
        price: service.price,
        image: service.image,
        duration: service.duration,
        originalPrice: service.originalPrice
      });
    }
    navigation.navigate('SlotSelection');
  };

  return (
    <View style={styles.container}>
      <MuiHeader title="Service Details" onBack={() => navigation.goBack()} transparent />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: service.image }} style={styles.heroImage} />
        
        <View style={styles.mainContent}>
          <View style={styles.titleSection}>
            <Text style={styles.name}>{service.name}</Text>
            <View style={styles.metaRow}>
              <View style={styles.badge}>
                <MaterialCommunityIcons name="star" size={14} color="#FFFFFF" />
                <Text style={styles.badgeText}>{service.rating}</Text>
              </View>
              <Text style={styles.ratingCount}>({service.ratingCount} reviews)</Text>
              <View style={styles.dot} />
              <Text style={styles.duration}>{service.duration}</Text>
            </View>
            <View style={styles.priceRow}>
                <Text style={styles.price}>₹{service.price}</Text>
                {service.originalPrice && (
                    <Text style={styles.oldPrice}>₹{service.originalPrice}</Text>
                )}
                <View style={styles.discountBadge}>
                   <Text style={styles.discountText}>Save 20%</Text>
                </View>
            </View>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>About the service</Text>
             <Text style={styles.description}>{service.description}</Text>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>What's included</Text>
             {service.inclusions.map((item, idx) => (
                <View key={idx} style={styles.listItem}>
                   <MaterialCommunityIcons name="check-circle" size={18} color="#059669" />
                   <Text style={styles.listText}>{item}</Text>
                </View>
             ))}
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>What's excluded</Text>
             {service.exclusions.map((item, idx) => (
                <View key={idx} style={styles.listItem}>
                   <MaterialCommunityIcons name="close-circle" size={18} color="#EF4444" />
                   <Text style={styles.listText}>{item}</Text>
                </View>
             ))}
          </View>

          <View style={styles.trustBanner}>
              <Surface style={styles.trustCard} elevation={0}>
                 <MaterialCommunityIcons name="shield-check" size={32} color={Theme.colors.primary} />
                 <View style={styles.trustTextCol}>
                    <Text style={styles.trustTitle}>Hozify Guarantee</Text>
                    <Text style={styles.trustDesc}>Free re-service if you're not satisfied with the results.</Text>
                 </View>
              </Surface>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
         <View style={styles.footerInner}>
            <View style={styles.footerPriceCol}>
               <Text style={styles.footerTotal}>₹{service.price}</Text>
               <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                  <Text style={styles.viewCartText}>View Details</Text>
               </TouchableOpacity>
            </View>
            <PrimaryButton 
               label={isInCart ? "Schedule Again" : "Book Service"} 
               onPress={handleAddToCart}
               style={styles.footerBtn}
            />
         </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 120 },
  heroImage: { width: width, height: 300 },
  mainContent: {
    marginTop: -24,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
  titleSection: { marginBottom: 20 },
  name: { fontSize: 26, fontWeight: '900', color: '#0F172A', marginBottom: 12, letterSpacing: -1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  badge: { 
    backgroundColor: '#059669', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6,
    gap: 4
  },
  badgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
  ratingCount: { fontSize: 13, color: '#64748B', fontWeight: '700' },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#CBD5E1' },
  duration: { fontSize: 13, color: '#64748B', fontWeight: '700' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  price: { fontSize: 24, fontWeight: '900', color: '#0F172A' },
  oldPrice: { fontSize: 16, color: '#94A3B8', textDecorationLine: 'line-through', fontWeight: '600' },
  discountBadge: { backgroundColor: 'rgba(5, 150, 105, 0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  discountText: { color: '#059669', fontSize: 12, fontWeight: '900' },

  divider: { marginVertical: 8, backgroundColor: '#F1F5F9' },
  section: { paddingVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A', marginBottom: 16, letterSpacing: -0.5 },
  description: { fontSize: 15, color: '#475569', lineHeight: 24, fontWeight: '500' },
  
  listItem: { flexDirection: 'row', gap: 12, marginBottom: 12, alignItems: 'center' },
  listText: { fontSize: 14, color: '#1E293B', fontWeight: '600', flex: 1 },

  trustBanner: { marginTop: 12 },
  trustCard: { 
    backgroundColor: 'rgba(0, 59, 149, 0.05)', 
    padding: 20, 
    borderRadius: 24, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 59, 149, 0.1)'
  },
  trustTextCol: { flex: 1 },
  trustTitle: { fontSize: 16, fontWeight: '900', color: Theme.colors.primary, marginBottom: 2 },
  trustDesc: { fontSize: 13, color: '#475569', fontWeight: '600', lineHeight: 18 },

  footer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerInner: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  footerPriceCol: { flex: 1 },
  footerTotal: { fontSize: 22, fontWeight: '900', color: '#0F172A' },
  viewCartText: { fontSize: 13, color: Theme.colors.primary, fontWeight: '900', marginTop: 2 },
  footerBtn: { flex: 1.5 },
});
