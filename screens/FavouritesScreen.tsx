import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import { ScreenHeader } from '../components/ScreenHeader';
import { Theme } from '../constants/Theme';

export const FavouritesScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ── Header ── */}
      <ScreenHeader
        title="Favourites"
        onBack={() => navigation.goBack()}
      />

      {/* ── Empty State Content ── */}
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <Image
            source={{ uri: "https://www.shutterstock.com/image-vector/my-favorite-lettering-valentines-day-260nw-1258320484.jpg" }} // We'll place the generated image here or use a mock path
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.emptyTitle}>
            Add locations that you frequently visit for quick access
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddressManagement')}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>Add Favourites</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: -40, // Visual offset for centering against header
  },
  illustrationContainer: {
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginBottom: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#475569',
    textAlign: 'center',
    lineHeight: 26,
  },
  addButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
});
