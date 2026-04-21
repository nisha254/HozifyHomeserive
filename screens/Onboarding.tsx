import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, Platform, Animated } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../constants/Theme';
import { useStore } from '../store/useStore';
import { StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Beauty parlour\nat your home',
    description: 'Professional stylists and beauticians delivered to your doorstep within 60 minutes.',
    person: require('../assets/img.png'),
    pillColor: '#FFF2EB',
  },
  {
    id: '2',
    title: 'Expert repairs\nfor your home',
    description: 'Certified plumbers, electricians, and technicians at transparent fixed prices.',
    person: require('../assets/image 2355.png'),
    pillColor: '#FFF2EB',
  },
  {
    id: '3',
    title: 'Premium home\ncleaning',
    description: 'Eco-friendly deep cleaning for every corner of your living space.',
    person: require('../assets/Rectangle 4366.png'),
    pillColor: '#FFF2EB',
  }
];

export const OnboardingScreen = ({ navigation }: any) => {
  const { completeOnboarding } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      completeOnboarding();
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    navigation.replace('Login');
  };

  const renderItem = ({ item }: { item: typeof SLIDES[0] }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageSection}>
          <Surface style={[styles.pillContainer, { backgroundColor: item.pillColor }]} elevation={0}>
            <Image source={item.person} style={styles.personImage} />
          </Surface>
        </View>

        <View style={styles.textSection}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <View style={styles.paginationStatic}>
            {SLIDES.map((_, dotIndex) => (
              <View 
                key={dotIndex} 
                style={[
                  styles.dot, 
                  dotIndex === currentIndex && styles.activeDot
                ]} 
              />
            ))}
          </View>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip} activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={SLIDES}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            scrollEventThrottle={32}
            snapToInterval={width}
            decelerationRate="fast"
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.nextBtn} 
            onPress={handleNext} 
            activeOpacity={0.9}
          >
            <Text style={styles.nextBtnLabel}>
              {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next Step'}
            </Text>
            <View style={styles.btnIconBox}>
                <MaterialCommunityIcons 
                name={currentIndex === SLIDES.length - 1 ? "check" : "arrow-right"} 
                size={22} 
                color={Theme.colors.primary} 
                />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    height: 60,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
  },
  skipText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  paginationStatic: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: Theme.colors.primary,
    width: 24,
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  imageSection: {
    height: '58%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  pillContainer: {
    width: width * 0.82,
    height: width * 0.92,
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
  },
  personImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textSection: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: Theme.colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: -1.5,
    lineHeight: 40,
  },
  description: {
    fontSize: 16,
    color: Theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '600',
    paddingHorizontal: 10,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
  },
  nextBtn: {
    backgroundColor: Theme.colors.text.primary,
    height: 64,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  nextBtnLabel: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  btnIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
