import React from 'react';
import { TextInput as PaperInput, HelperText } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Theme } from '../constants/Theme';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  placeholder?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  left?: React.ReactNode;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
}

export const Input = ({
  label,
  value,
  onChangeText,
  onBlur,
  onFocus,
  error,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  placeholder,
  rightIcon,
  onRightIconPress,
  left,
  maxLength,
  multiline,
  numberOfLines
}: InputProps) => {
  return (
    <View style={styles.container}>
      <PaperInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        onFocus={onFocus}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        error={!!error}
        placeholder={placeholder}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={numberOfLines}
        outlineColor={Theme.colors.border}
        activeOutlineColor={Theme.colors.primary}
        outlineStyle={{ borderRadius: Theme.geometry.radius.md, borderWidth: 1.5 }}
        style={styles.input}
        placeholderTextColor={Theme.colors.text.muted}
        textColor={Theme.colors.text.primary}
        left={left}
        right={rightIcon ? <PaperInput.Icon icon={rightIcon} onPress={onRightIconPress} color={Theme.colors.text.muted} /> : null}
      />
      {error ? (
        <HelperText type="error" visible={true} style={styles.errorText}>
          {error}
        </HelperText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  input: {
    backgroundColor: Theme.colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '700',
    color: Theme.colors.status.error,
    marginTop: 2,
  }
});
