import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Theme } from '../constants/Theme';

interface ButtonProps {
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  icon?: string;
  color?: string;
}

export const Button = ({
  mode = 'contained',
  onPress,
  title,
  loading = false,
  disabled = false,
  style,
  labelStyle,
  icon,
  color,
}: ButtonProps) => {
  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={[
        styles.button, 
        style
      ]}
      labelStyle={[styles.label, labelStyle]}
      icon={icon}
      buttonColor={mode === 'contained' ? (color || Theme.colors.primary) : undefined}
      textColor={mode === 'outlined' || mode === 'text' ? (color || Theme.colors.primary) : undefined}
      contentStyle={styles.content}
    >
      {title}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Theme.geometry.radius.lg,
    marginVertical: 10,
    height: 56,
    justifyContent: 'center',
  },
  content: {
    height: 56,
  },

  label: {
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
