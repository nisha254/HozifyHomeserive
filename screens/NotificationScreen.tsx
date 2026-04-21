import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { Theme } from '../constants/Theme';
import { ScreenHeader } from '../components/ScreenHeader';

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'You have a scratch card waiting!',
    message: 'Scratch & win coupons!',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: '2',
    title: 'Dear Rider!',
    message: 'Take this 10-second survey and help us serve you better.',
    time: '8 hours ago',
    unread: true,
  },
  {
    id: '3',
    title: "We're right outside! 📍 🛵",
    message: "Your perfect morning ride is just waiting for you to hit 'Book'. Let's go!🛵",
    time: '11 hours ago',
    unread: true,
  },
  {
    id: '4',
    title: 'Mission Accomplished 🎖️ 🌟',
    message: "You made it through Hump Day. Your extraction vehicle is ready. Let's get you home. 🚁",
    time: '23 hours ago',
    unread: true,
  },
  {
    id: '5',
    title: 'Your Ride Paid Off! 💸',
    message: 'Your total savings: ₹100. More rides = more reasons to smile. 😄',
    time: '1 days ago',
    unread: true,
  },
];

export const NotificationScreen = ({ navigation }: any) => {
  const renderNotification = (item: typeof NOTIFICATIONS[0]) => (
    <View key={item.id}>
      <TouchableOpacity style={styles.item} activeOpacity={0.7}>
        <View style={styles.contentRow}>
          <View style={styles.dotCol}>
            {item.unread && <View style={styles.dot} />}
          </View>
          <View style={styles.textCol}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Divider style={styles.divider} />
    </View>
  );

  return (

    <ImageBackground
      source={require('../assets/RectangleBG.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <ScreenHeader title="Notifications" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {NOTIFICATIONS.map(renderNotification)}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  list: { paddingVertical: 8 },
  item: { paddingVertical: 20, paddingHorizontal: 20 },
  contentRow: { flexDirection: 'row', gap: 12 },
  dotCol: { width: 12, paddingTop: 6 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#0F172A' },
  textCol: { flex: 1 },
  title: { fontSize: 17, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  message: { fontSize: 15, color: '#334155', lineHeight: 22, fontWeight: '600', marginBottom: 8 },
  time: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  divider: {
    // height: 1,
    // backgroundColor: '#a0a6acff'
  },
});
