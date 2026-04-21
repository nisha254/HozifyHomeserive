import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, CalendarCheck, Wallet, UserCircle } from 'lucide-react-native';
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { Theme } from '../constants/Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeScreen } from '../screens/Home';
import { ProfileScreen } from '../screens/Profile';
import { WalletScreen } from '../screens/Wallet';
import { BookingsScreen } from '../screens/Bookings';

const Tab = createBottomTabNavigator();

const ACTIVE_COLOR = '#1B3E6F';
const INACTIVE_COLOR = '#94A3B8';

const TABS = [
  { name: 'Home', label: 'Home', Icon: Home, Screen: HomeScreen },
  { name: 'Bookings', label: 'Bookings', Icon: CalendarCheck, Screen: BookingsScreen },
  { name: 'Wallet', label: 'Wallet', Icon: Wallet, Screen: WalletScreen },
  { name: 'Profile', label: 'Profile', Icon: UserCircle, Screen: ProfileScreen },
];

export const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  const bottomPad = insets.bottom > 0 ? insets.bottom : 10;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const tab = TABS.find(t => t.name === route.name);
        const IconComp = tab?.Icon ?? Home;

        return {
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <IconComp
                size={22}
                color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
                strokeWidth={focused ? 2.2 : 1.8}
              />
            </View>
          ),
          tabBarLabel: ({ focused, children }) => (
            <Text
              style={[
                styles.tabLabel,
                { color: focused ? ACTIVE_COLOR : INACTIVE_COLOR },
                focused && styles.tabLabelActive,
              ]}
            >
              {children}
            </Text>
          ),
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: [styles.tabBar, { paddingBottom: bottomPad }],
        };
      }}
    >
      {TABS.map(({ name, label, Screen }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={Screen}
          options={{
            tabBarLabel: label,
            ...(name === 'Profile' && {
              tabBarStyle: { display: 'none' },
            }),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 64,
    paddingTop: 8,
    borderTopWidth: 0,
    // Shadow — Android
    elevation: 14,
    // Shadow — iOS
    shadowColor: '#1B3E6F',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
  },
  iconWrap: {
    width: 40,
    height: 28,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapActive: {
    backgroundColor: '#EEF2FF',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.2,
    marginTop: 2,
  },
  tabLabelActive: {
    fontWeight: '800',
  },
});
