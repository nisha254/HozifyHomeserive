import React from 'react';
import { StyleSheet, Text, ActivityIndicator, Pressable, Platform, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { Theme } from '../constants/Theme';
import { LucideIcon } from './LucideIcon';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  labelStyle?: any;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const PrimaryButton = ({ label, onPress, disabled, loading, style, labelStyle }: PrimaryButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(Theme.animation.scaleOnPress, Theme.animation.spring);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, Theme.animation.spring);
  };

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
        style={({ pressed }) => [
          styles.button,
          disabled && styles.disabled,
          !disabled && Platform.OS === 'ios' && pressed && { opacity: 0.9 },
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <>
            <Text style={[styles.label, disabled && styles.disabledLabel, labelStyle]}>
              {label}
            </Text>
            <LucideIcon name="arrow-right" size={20} color="#FFFFFF" />
          </>

        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.geometry.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabled: {
    backgroundColor: '#EEF2F6',
    shadowOpacity: 0,
    elevation: 0,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginRight: 8,
  },
  disabledLabel: {
    color: '#94A3B8',
  },
});
