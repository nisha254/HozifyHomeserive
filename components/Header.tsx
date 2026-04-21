import React from 'react';
import { Appbar } from 'react-native-paper';
import { Theme } from '../constants/Theme';
import { StyleSheet } from 'react-native';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  hideBorder?: boolean;
}

export const Header = ({ title, onBack, rightIcon, onRightPress, hideBorder = false }: HeaderProps) => {
  return (
    <Appbar.Header style={[
      styles.header, 
      { borderBottomWidth: hideBorder ? 0 : 1.5 }
    ]}>
      {onBack && <Appbar.BackAction onPress={onBack} color={Theme.colors.text.primary} size={24} />}
      <Appbar.Content 
        title={title} 
        titleStyle={styles.title} 
      />
      {rightIcon && <Appbar.Action icon={rightIcon} onPress={onRightPress} color={Theme.colors.text.primary} size={24} />}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    elevation: 0,
    borderBottomColor: Theme.colors.border,
    height: 64,
  },
  title: {
    fontWeight: '900',
    fontSize: 20,
    color: Theme.colors.text.primary,
    letterSpacing: -0.5,
  },
});
