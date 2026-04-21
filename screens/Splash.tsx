import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  Easing,
  ImageBackground,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export const SplashScreen = ({ onFinish }: any) => {

  // ── Animated values ──────────────────────────────────────────────────────
  const logoScale = useRef(new Animated.Value(0.25)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(-12)).current;

  const wordmarkOpacity = useRef(new Animated.Value(0)).current;
  const wordmarkTranslateY = useRef(new Animated.Value(22)).current;

  useEffect(() => {

    // 1 — Logo pops in with spring
    Animated.sequence([
      Animated.delay(120),
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 820,
          easing: Easing.out(Easing.back(1.7)),
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 560, useNativeDriver: true }),
        Animated.timing(logoRotate, {
          toValue: 0,
          duration: 820,
          easing: Easing.out(Easing.back(1.3)),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 2 — HOZIFY wordmark slides up
    Animated.sequence([
      Animated.delay(680),
      Animated.parallel([
        Animated.timing(wordmarkOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(wordmarkTranslateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 3 — Done
    const t = setTimeout(() => onFinish?.(), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/backimg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar style="dark" />

      {/* ── Center container ── */}
      <View style={styles.centerContainer}>

        {/* ── Circular logo ── */}
        <Animated.View
          style={[
            styles.logoWrap,
            { opacity: logoOpacity },
          ]}
        >
          <Image
            source={require('../assets/logo/HozifyLogo.png')}
            style={styles.logoImg}
            resizeMode="contain"
          />
        </Animated.View>

        {/* ── HOZIFY wordmark ── */}
        <Animated.View
          style={{
            opacity: wordmarkOpacity,
            transform: [{ translateY: wordmarkTranslateY }],
            marginBottom: 12,
          }}
        >
          <Image
            source={require('../assets/logo/HozifyText.png')}
            style={styles.wordmark}
            resizeMode="contain"
          />
        </Animated.View>

      </View>

    </ImageBackground>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrap: {
    width: width * 0.60,
    height: width * 0.60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },
  wordmark: {
    width: width * 0.52,
    height: 54,
  },
});