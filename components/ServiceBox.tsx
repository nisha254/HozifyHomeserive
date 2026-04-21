import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../constants/Theme';

const { width } = Dimensions.get('window');
// Calculate box size to fit 3 columns with padding
const PADDING = 24;
const GAP = 12;
const GRID_BOX_SIZE = (width - (2 * PADDING) - (2 * GAP)) / 3;
export const HORIZONTAL_BOX_SIZE = width * 0.28;

interface ServiceBoxProps {
  title: string;
  icon?: string;
  localIcon?: any;
  badge?: string;
  badgeType?: 'sale' | 'time' | 'new';
  onPress: () => void;
  horizontal?: boolean;
}

export const ServiceBox = ({ title, icon, localIcon, badge, badgeType, onPress, horizontal }: ServiceBoxProps) => {
  const boxSize = horizontal ? HORIZONTAL_BOX_SIZE : GRID_BOX_SIZE;
  
  return (
    <TouchableOpacity 
      style={[styles.container, { width: boxSize }, horizontal && { marginBottom: 0, marginRight: 16 }]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={[styles.iconBox, { width: boxSize, height: boxSize }]}>
        <View style={styles.innerBox}>
            {localIcon ? (
              <Image source={localIcon} style={styles.iconImage} />
            ) : (
              <MaterialCommunityIcons name={icon as any || 'toolbox'} size={28} color={Theme.colors.primary} />
            )}
        </View>
        
        {badge && (
          <View style={[styles.badge, badgeType === 'sale' ? styles.saleBadge : styles.newBadge]}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  innerBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    margin: 4,
  },
  iconImage: {
    width: '55%',
    height: '55%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 11,
    fontWeight: '800',
    color: Theme.colors.text.primary,
    lineHeight: 14,
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 10,
  },
  saleBadge: {
    backgroundColor: '#FEE2E2',
  },
  newBadge: {
    backgroundColor: '#F0FDF4',
  },
  badgeText: {
    fontSize: 8,
    fontWeight: '900',
    color: Theme.colors.primary,
  },
});
