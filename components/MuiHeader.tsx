import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../constants/Theme';

interface MuiHeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export const MuiHeader = ({ 
  title, 
  onBack, 
  rightAction, 
  transparent 
}: MuiHeaderProps) => {
  return (
    <Surface 
      style={[
        styles.header, 
        transparent && styles.transparentHeader,
        !transparent && styles.border
      ]} 
      elevation={transparent ? 0 : 0}
    >
      <SafeAreaView edges={['top']} style={styles.safeHeader}>
        <View style={styles.container}>
          {onBack ? (
            <TouchableOpacity style={styles.iconBtn} onPress={onBack} activeOpacity={0.7}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#0F172A" />
            </TouchableOpacity>
          ) : (
            <View style={styles.spacer} />
          )}

          <Text style={styles.title} numberOfLines={1}>{title}</Text>

          {rightAction ? (
            <View style={styles.rightActionContainer}>
              {rightAction}
            </View>
          ) : (
            <View style={styles.spacer} />
          )}
        </View>
      </SafeAreaView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    zIndex: 100,
  },
  transparentHeader: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  safeHeader: {
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  container: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  iconBtn: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  spacer: {
    width: 48,
  },
  rightActionContainer: {
    paddingRight: 8,
  },
});
