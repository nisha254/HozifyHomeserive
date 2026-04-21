import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../constants/Theme';

const { width } = Dimensions.get('window');

// Map generic backgrounds similar to the home screen
const BG_MAP: Record<string, string> = {
  'Home Cleaning': '#F3E8DC',
  'Salon & Spa': '#FCE7F3',
  'Electrician': '#F0F0F0',
  'Plumbing': '#E8F1FF',
  'Appliance Repair': '#FCE7F3', // Soft pink
  'Pest Control': '#E6F4EA',
  'Carpenter': '#FDF2D0',
  'Painting & Makeover': '#F3E8DC',
  'Automobile': '#F0F0F0',
  'Agriculture': '#E6F4EA',
  'Healthcare': '#FEE2E2', // Soft red
  'Family Events': '#FEF3C7', // Soft yellow
  'Machinery Rental': '#FFEDD5', // Soft orange
};

export const CategoryCard = ({ item, onPress }: any) => {
  const bg = BG_MAP[item.title] || '#F3F4F6';

  return (
    <Surface style={[styles.cardSurface, { backgroundColor: bg }]} elevation={1}>
      <TouchableOpacity style={styles.cardTouchable} onPress={onPress} activeOpacity={0.8}>
        <Text variant="titleSmall" style={styles.title}>{item.title}</Text>
        
        {item.localIcon ? (
          <Image source={item.localIcon} style={styles.image} />
        ) : (
          <View style={styles.iconFallback}>
            <MaterialCommunityIcons name={item.icon || 'toolbox'} size={40} color={item.iconColor || Theme.colors.primary} />
          </View>
        )}
      </TouchableOpacity>
    </Surface>
  );
};

const styles = StyleSheet.create({
  cardSurface: {
    width: (width - 32 - 16) / 2, // 2 columns, padding 16 screen, gap 16
    height: 120,
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardTouchable: {
    flex: 1,
    padding: 12,
    position: 'relative',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    zIndex: 2,
    maxWidth: '80%',
  },
  image: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 90,
    height: 90,
    resizeMode: 'contain',
    zIndex: 1,
  },
  iconFallback: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    opacity: 0.8,
    zIndex: 1,
  }
});
