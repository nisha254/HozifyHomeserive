import React, { useRef, useState } from 'react';
import { View, StyleSheet, TextInput, Keyboard } from 'react-native';
import { Theme } from '../constants/Theme';

interface ModernOTPInputProps {
  length: number;
  onCodeFilled: (code: string) => void;
}

export const ModernOTPInput = ({ length, onCodeFilled }: ModernOTPInputProps) => {
  const [code, setCode] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<TextInput[]>([]);

  const handleInputChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every(digit => digit !== '')) {
      onCodeFilled(newCode.join(''));
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => { if (ref) inputRefs.current[index] = ref; }}
          style={[styles.input, digit ? styles.inputFocused : null]}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={text => handleInputChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          selectionColor={Theme.colors.primary}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  input: {
    width: 48,
    height: 64,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    backgroundColor: '#F8FAFC',
  },
  inputFocused: {
    borderColor: Theme.colors.primary,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});
