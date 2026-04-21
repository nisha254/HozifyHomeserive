import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Surface, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../constants/Theme';

const { width } = Dimensions.get('window');

interface ServiceMarketplaceCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    rating?: string;
    reviews?: string;
    image?: any;
    description?: string;
    quantity?: number;
  };
  onAdd: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onPress?: () => void;
}

export const ServiceMarketplaceCard = ({ 
  item, 
  onAdd, 
  onIncrement, 
  onDecrement, 
  onPress 
}: ServiceMarketplaceCardProps) => {
  const quantity = item.quantity || 0;

  return (
    <Surface style={styles.card} elevation={0}>
      <TouchableOpacity 
        style={styles.container} 
        onPress={onPress} 
        activeOpacity={0.9}
      >
        <View style={styles.infoSection}>
          <View style={styles.headerRow}>
            <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
          </View>
          
          <View style={styles.ratingRow}>
            <View style={styles.starBadge}>
              <MaterialCommunityIcons name="star" size={14} color="#FBBF24" />
              <Text style={styles.ratingText}>{item.rating || '4.8'}</Text>
            </View>
            {item.reviews && (
              <Text style={styles.reviewText}>({item.reviews} reviews)</Text>
            )}
          </View>

          <View style={styles.priceContainer}>
             <Text style={styles.priceSymbol}>₹</Text>
             <Text style={styles.priceValue}>{item.price}</Text>
          </View>

          {item.description && (
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
          )}
        </View>

        <View style={styles.imageSection}>
          <Image 
            source={item.image || require('../assets/Rectangle 4366.png')} 
            style={styles.serviceImage} 
          />
          
          <View style={styles.buttonContainer}>
            {quantity === 0 ? (
              <TouchableOpacity style={styles.addBtn} onPress={onAdd} activeOpacity={0.8}>
                <Text style={styles.addBtnText}>ADD</Text>
                <MaterialCommunityIcons name="plus" size={16} color={Theme.colors.primary} />
              </TouchableOpacity>
            ) : (
              <Surface style={styles.quantityControls} elevation={0}>
                <TouchableOpacity style={styles.qtyBtn} onPress={onDecrement}>
                  <MaterialCommunityIcons name="minus" size={18} color={Theme.colors.primary} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={onIncrement}>
                  <MaterialCommunityIcons name="plus" size={18} color={Theme.colors.primary} />
                </TouchableOpacity>
              </Surface>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    minHeight: 140,
  },
  infoSection: {
    flex: 1,
    paddingRight: 12,
    justifyContent: 'center',
  },
  headerRow: {
    marginBottom: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
    color: Theme.colors.text.primary,
    letterSpacing: -0.5,
    lineHeight: 22,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  starBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#92400E',
  },
  reviewText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  priceSymbol: {
    fontSize: 14,
    fontWeight: '900',
    color: Theme.colors.text.primary,
    marginRight: 2,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '900',
    color: Theme.colors.text.primary,
  },
  description: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    fontWeight: '500',
  },
  imageSection: {
    width: 120,
    height: 120,
    borderRadius: 18,
    position: 'relative',
    backgroundColor: '#F8FAFC',
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    resizeMode: 'cover',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: -12,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
    minWidth: 80,
    justifyContent: 'center',
    gap: 4,
  },
  addBtnText: {
    color: Theme.colors.primary,
    fontWeight: '900',
    fontSize: 14,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
    overflow: 'hidden',
  },
  qtyBtn: {
    padding: 8,
    paddingHorizontal: 12,
  },
  quantityText: {
    fontSize: 15,
    fontWeight: '900',
    color: Theme.colors.text.primary,
    minWidth: 20,
    textAlign: 'center',
  },
});
