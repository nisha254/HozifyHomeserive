import React from 'react';
import { View } from 'react-native';
import { StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '../constants/Theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
}

export const Card = ({ children, style }: Omit<CardProps, 'elevation'>) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: Theme.geometry.radius.lg,
    padding: Theme.geometry.spacing.md,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
});
