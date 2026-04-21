import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../constants/Theme';

interface AvatarPickerProps {
  image?: string;
  onPress?: () => void;
  size?: number;
}

export const AvatarPicker = ({ image, onPress, size = 100 }: AvatarPickerProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Surface style={[styles.avatarSurface, { width: size, height: size, borderRadius: size / 2 }]} elevation={2}>
          {image ? (
            <Image source={{ uri: image }} style={[styles.avatar, { borderRadius: size / 2 }]} />
          ) : (
            <MaterialCommunityIcons name="account" size={size * 0.6} color="#CBD5E1" />
          )}
          <View style={[styles.badge, { right: size * 0.05, bottom: size * 0.05 }]}>
            <MaterialCommunityIcons name="camera" size={16} color="#FFFFFF" />
          </View>
        </Surface>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  avatarSurface: {
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    backgroundColor: Theme.colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 4,
  },
});
