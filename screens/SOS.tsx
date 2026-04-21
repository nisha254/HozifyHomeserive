import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar, Alert, ImageBackground } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { ChevronRight } from 'lucide-react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import * as Contacts from 'expo-contacts';

export const SOSScreen = ({ navigation }: any) => {

  const handleAddContact = async () => {
    // Request permission from the OS
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      Alert.alert(
        'Permission Granted',
        'We have access to Contacts! You can now select a contact from your phonebook to add as a trusted connection.',
        [{ text: 'Great!' }]
      );
    } else {
      Alert.alert(
        'Permission Denied',
        'We need access to your contacts to add a trusted contact. Please enable it in your phone settings.',
        [{ text: 'OK' }]
      );
    }
  };

  return (

    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScreenHeader
        title="Safety toolkit"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        <View style={styles.introSection}>
          <Text style={styles.introDesc}>
            At Hozify, your safety comes first. Here are some measures and provisions to ensure your safety.
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.knowMore}>Know more</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
        >
          <View style={styles.carouselItem}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=300&auto=format&fit=crop' }}
              style={styles.carouselImage}
            />
            <Text style={styles.carouselTitle}>Proactive safety checks</Text>
            <View style={styles.indicatorActive} />
          </View>

          <View style={styles.carouselItem}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=300&auto=format&fit=crop' }}
              style={styles.carouselImage}
            />
            <Text style={styles.carouselTitle}>Share live tracking</Text>
            {/* Invisible indicator to keep heights matching */}
            <View style={[styles.indicatorActive, { opacity: 0 }]} />
          </View>
        </ScrollView>

        <View style={styles.settingsSection}>
          <Text style={styles.settingsHeader}>Settings</Text>

          <Surface style={styles.settingCard} elevation={0}>
            <TouchableOpacity style={styles.settingRow} activeOpacity={0.7} onPress={handleAddContact}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>New trusted contacts</Text>
                <Text style={styles.settingSub}>share ride trip details with your loved ones in a single tap</Text>
              </View>
              <ChevronRight size={20} color="#0F172A" strokeWidth={2.5} />
            </TouchableOpacity>
          </Surface>
        </View>

      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFF' },
  scrollContent: { paddingBottom: 40 },
  introSection: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 },
  introDesc: { fontSize: 16, color: '#334155', lineHeight: 24, fontWeight: '600', marginBottom: 6 },
  knowMore: { fontSize: 15, color: '#2563EB', fontWeight: '700' },
  carouselContainer: { paddingHorizontal: 20, paddingBottom: 30, gap: 16 },
  carouselItem: { width: 260 },
  carouselImage: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: '#E2E8F0',
  },
  carouselTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A', textAlign: 'center', marginBottom: 6 },
  indicatorActive: {
    width: 24,
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    alignSelf: 'center'
  },
  settingsSection: { paddingHorizontal: 20 },
  settingsHeader: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 16 },
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9'
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  settingInfo: { flex: 1 },
  settingTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
  settingSub: { fontSize: 14, color: '#64748B', fontWeight: '500', lineHeight: 20 },

});
