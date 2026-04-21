import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';
import { Theme } from '../constants/Theme';

interface ServiceCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: string;
  image: string;
  duration: string;
  onPress: () => void;
  onAdd: () => void;
  added?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ServiceCard = ({
  name,
  price,
  originalPrice,
  rating,
  ratingCount,
  image,
  duration,
  onPress,
  onAdd,
  added
}: ServiceCardProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(Theme.animation.scaleOnPress, Theme.animation.spring);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, Theme.animation.spring);
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
    >
      <Surface style={styles.card} elevation={1}>
        <View style={styles.content}>
          <View style={styles.left}>
            <Text style={styles.name} numberOfLines={2}>{name}</Text>
            <View style={styles.ratingRow}>
              <MaterialCommunityIcons name="star" size={14} color="#F59E0B" />
              <Text style={styles.ratingText}>{rating}</Text>
              <Text style={styles.ratingCount}>({ratingCount})</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.price}>₹{price}</Text>
              {originalPrice && (
                <Text style={styles.oldPrice}>₹{originalPrice}</Text>
              )}
              <View style={styles.dot} />
              <Text style={styles.duration}>{duration}</Text>
            </View>
          </View>
          <View style={styles.right}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity
                style={[styles.addButton, added && styles.addedButton]}
                onPress={onAdd}
                activeOpacity={0.8}
              >
                <Text style={[styles.addText, added && styles.addedText]}>
                  {added ? 'ADDED' : 'ADD'}
                </Text>
                {!added && <MaterialCommunityIcons name="plus" size={14} color={Theme.colors.primary} />}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Surface>
    </AnimatedPressable>
  );
};

// Internal Import to avoid circular dependency if needed, but for now we use regular TouchableOpacity for sub-buttons
import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: Theme.geometry.radius.xl,
    padding: 16,
    marginBottom: 2,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    marginRight: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#1E293B',
  },
  ratingCount: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  oldPrice: {
    fontSize: 13,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
    fontWeight: '600',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#94A3B8',
  },
  duration: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  right: {
    alignItems: 'center',
  },
  imageContainer: {
    width: 110,
    height: 110,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
  },
  addButton: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
    elevation: 4,
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addedButton: {
    backgroundColor: Theme.colors.primary,
  },
  addText: {
    fontSize: 13,
    fontWeight: '900',
    color: Theme.colors.primary,
  },
  addedText: {
    color: '#FFFFFF',
  },
});
