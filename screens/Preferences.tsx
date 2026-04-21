import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import { Check } from 'lucide-react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { Theme } from '../constants/Theme';

interface PreferenceItemProps {
  label: string;
  isEnabled: boolean;
  onToggle: () => void;
  isLast?: boolean;
}

const PreferenceItem = ({ label, isEnabled, onToggle, isLast }: PreferenceItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.itemRow, !isLast && styles.itemBorder]}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <Text style={styles.itemLabel}>{label}</Text>
      <View style={[styles.checkbox, isEnabled && styles.checkboxActive]}>
        {isEnabled && <Check size={16} color="#FFFFFF" strokeWidth={3} />}
      </View>
    </TouchableOpacity>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

export const PreferencesScreen = ({ navigation }: any) => {
  const [preferences, setPreferences] = useState({
    promoEmails: true,
    invoiceEmails: true,
    invoiceSMS: true,
    promoSMS: true,
    whatsappUpdates: false,
    pushPromos: true,
    pushService: true,
  });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />


      <ScreenHeader
        title="Preferences"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollPadding}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="EMAIL" />
        <View style={styles.card}>
          <PreferenceItem
            label="Allow emails for promotions and offers"
            isEnabled={preferences.promoEmails}
            onToggle={() => togglePreference('promoEmails')}
          />
          <PreferenceItem
            label="Allow emails for invoice"
            isEnabled={preferences.invoiceEmails}
            onToggle={() => togglePreference('invoiceEmails')}
            isLast
          />
        </View>

        <SectionHeader title="SMS & WHATSAPP" />
        <View style={styles.card}>
          <PreferenceItem
            label="Allow SMS for invoice"
            isEnabled={preferences.invoiceSMS}
            onToggle={() => togglePreference('invoiceSMS')}
          />
          <PreferenceItem
            label="Allow promotional SMS offers"
            isEnabled={preferences.promoSMS}
            onToggle={() => togglePreference('promoSMS')}
          />
          <PreferenceItem
            label="Allow updates to be sent on WhatsApp"
            isEnabled={preferences.whatsappUpdates}
            onToggle={() => togglePreference('whatsappUpdates')}
            isLast
          />
        </View>

        <SectionHeader title="PUSH NOTIFICATIONS" />
        <View style={styles.card}>
          <PreferenceItem
            label="Allow push notifications for promotions"
            isEnabled={preferences.pushPromos}
            onToggle={() => togglePreference('pushPromos')}
          />
          <PreferenceItem
            label="Allow service related notifications"
            isEnabled={preferences.pushService}
            onToggle={() => togglePreference('pushService')}
            isLast
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollPadding: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1E3A8A', // A deeper blue for headers
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 40,
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
    marginRight: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
});
