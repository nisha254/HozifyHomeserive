import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../constants/Theme';
import { MuiHeader } from '../components/MuiHeader';

export const RatingScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <MuiHeader title="My Rating" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.illustrationWrap}>
            <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1598128558393-70ff21433be0?q=80&w=400&auto=format&fit=crop' }} 
                style={styles.illustration}
                resizeMode="contain"
            />
        </View>

        <View style={styles.content}>
            <Text style={styles.mainTitle}>How is your rating calculated?</Text>
            <Text style={styles.description}>
                Rating is calculated as an average of all your past ratings and is measured out of 5 stars. Ratings are 100% anonymous, so either you or your captain will never see rating for an individual ride.
            </Text>

            <Text style={styles.subTitle}>Understanding Ratings</Text>
            <Text style={styles.description}>
                To foster mutual respect Hozify partners and customers can rate each other on a scale of 1-5. Read on to understand how you can be a 5 star customer
            </Text>

            <View style={styles.sectionWrap}>
                <View style={styles.sectionItem}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name="chat-processing-outline" size={32} color="#0EA5E9" />
                    </View>
                    <View style={styles.sectionText}>
                        <Text style={styles.sectionTitle}>Know your Expert</Text>
                        <Text style={styles.sectionDesc}>
                            Knowing a little more about the things that affect a expert's happiness can help you be a 5-star rider.
                        </Text>
                    </View>
                </View>

                <View style={styles.sectionItem}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name="clock-outline" size={32} color="#F59E0B" />
                    </View>
                    <View style={styles.sectionText}>
                        <Text style={styles.sectionTitle}>Timely</Text>
                        <Text style={styles.sectionDesc}>
                            Check your service address and make sure that it is accurate. Reach the pickup spot on time. This helps the expert get you your service on time.
                        </Text>
                    </View>
                </View>

                <View style={styles.sectionItem}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name="shield-check-outline" size={32} color="#8B5CF6" />
                    </View>
                    <View style={styles.sectionText}>
                        <Text style={styles.sectionTitle}>Safety</Text>
                        <Text style={styles.sectionDesc}>
                            Your safety is our priority. Be sure to follow all safety guidelines during the service.
                        </Text>
                    </View>
                </View>
            </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 60 },
  illustrationWrap: {
      height: 240,
      backgroundColor: '#F8FAFC',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
  },
  illustration: { width: '80%', height: '80%' },

  content: { padding: 24 },
  mainTitle: { fontSize: 24, fontWeight: '900', color: Theme.colors.primary, marginBottom: 16 },
  description: { fontSize: 16, color: '#334155', lineHeight: 26, fontWeight: '600', marginBottom: 24 },
  subTitle: { fontSize: 22, fontWeight: '900', color: '#0F172A', marginBottom: 16 },

  sectionWrap: { marginTop: 12, gap: 32 },
  sectionItem: { flexDirection: 'row', gap: 20 },
  iconCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: '#F1F5F9',
      justifyContent: 'center',
      alignItems: 'center',
  },
  sectionText: { flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A', marginBottom: 8 },
  sectionDesc: { fontSize: 15, color: '#64748B', lineHeight: 22, fontWeight: '500' },
});
