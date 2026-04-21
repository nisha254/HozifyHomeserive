import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../constants/Theme';
import { PrimaryButton } from './PrimaryButton';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  buttonLabel?: string;
  onPress?: () => void;
  image?: any;
}

export const EmptyState = ({ icon, title, description, buttonLabel, onPress, image }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      {image ? (
        <Image source={image} style={styles.image} resizeMode="contain" />
      ) : (
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name={icon as any} size={48} color={Theme.colors.primary} />
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      
      {buttonLabel && onPress && (
        <PrimaryButton 
          label={buttonLabel} 
          onPress={onPress} 
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  iconCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'rgba(0, 59, 149, 0.05)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    fontWeight: '600',
  },
  button: {
    width: '100%',
    maxWidth: 240,
  },
});
