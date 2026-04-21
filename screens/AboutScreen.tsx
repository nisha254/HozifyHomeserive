import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import { ArrowLeft, HelpCircle, ChevronRight } from 'lucide-react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { Theme } from '../constants/Theme';

interface AboutRowProps {
  label: string;
  onPress: () => void;
  isLast?: boolean;
}

const AboutRow = ({ label, onPress, isLast }: AboutRowProps) => {
  return (
    <View style={styles.rowWrapper}>
      <TouchableOpacity
        style={styles.row}
        onPress={onPress}
        activeOpacity={0.6}
      >
        <Text style={styles.rowLabel}>{label}</Text>
        <ChevronRight size={20} color={Theme.colors.text.muted} strokeWidth={2.5} />
      </TouchableOpacity>
      {!isLast && <View style={styles.divider} />}
    </View>
  );
};

export const AboutScreen = ({ navigation }: any) => {
  return (
    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />


      {/* ── Header ── */}
      <ScreenHeader
        title="About"
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => navigation.navigate('Help')}
            activeOpacity={0.8}
          >
            <HelpCircle size={18} color={Theme.colors.text.primary} strokeWidth={2} />
            <Text style={styles.helpText}>Help</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listContainer}>
          <AboutRow
            label="Privacy Policy"
            onPress={() => { }}
          />
          <AboutRow
            label="Terms and conditions"
            onPress={() => { }}
          />
          <AboutRow
            label="Join the team"
            onPress={() => { }}
          />
          <AboutRow
            label="Blog"
            onPress={() => { }}
          />
          <AboutRow
            label="Software Licences"
            onPress={() => { }}
            isLast
          />
          {/* Bottom Hairline for the last item as seen in image */}
          <View style={styles.divider} />
        </View>
      </ScrollView>

      {/* ── Footer ── */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>Version 8.102.1</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Theme.colors.surface,
  },
  /* Header helpers */
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.surface,
  },
  helpText: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.text.primary,
  },
  scrollContent: {
    // paddingTop: 32,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  rowWrapper: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 8,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: Theme.colors.text.primary,
  },
  divider: {
    height: 1,
    // backgroundColor: Theme.colors.borderLight,
    width: '100%',
  },
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text.muted,
  },
});
