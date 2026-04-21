import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../constants/Theme';
import { MuiHeader } from '../components/MuiHeader';
import { PrimaryButton } from '../components/PrimaryButton';

const MOCK_ADDRESSES = [
  {
    id: 'adr1',
    type: 'Home',
    fullAddress: 'C-24, Green Park, New Delhi, 110016',
    isDefault: true,
  },
  {
    id: 'adr2',
    type: 'Office',
    fullAddress: 'Tower B, 4th Floor, Tech Park, Sector 62, Noida',
    isDefault: false,
  }
];

export const AddressManagementScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <MuiHeader title="Saved Addresses" onBack={() => navigation.goBack()} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {MOCK_ADDRESSES.map((item) => (
            <Surface key={item.id} style={styles.addressCard} elevation={0}>
              <View style={styles.cardHeader}>
                <View style={styles.titleRow}>
                  <MaterialCommunityIcons 
                    name={item.type === 'Home' ? 'home-variant' : 'office-building'} 
                    size={22} 
                    color={Theme.colors.primary} 
                  />
                  <Text style={styles.addressType}>{item.type}</Text>
                  {item.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>DEFAULT</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                  <MaterialCommunityIcons name="pencil-outline" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.fullAddress}>{item.fullAddress}</Text>

              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionText}>Remove</Text>
                </TouchableOpacity>
                {!item.isDefault && (
                  <TouchableOpacity style={styles.actionBtn}>
                    <Text style={[styles.actionText, { color: Theme.colors.primary }]}>Set as Default</Text>
                  </TouchableOpacity>
                )}
              </View>
            </Surface>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.addNewCard} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AddressForm')}
        >
          <MaterialCommunityIcons name="plus-circle-outline" size={24} color={Theme.colors.primary} />
          <Text style={styles.addNewText}>Add New Address</Text>
        </TouchableOpacity>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
          <Text style={styles.footerHint}>Stored addresses help in faster booking checkouts.</Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { paddingBottom: 40 },
  listContainer: { padding: 20 },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  addressType: { fontSize: 16, fontWeight: '900', color: '#0F172A' },
  defaultBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: { fontSize: 10, fontWeight: '900', color: '#64748B', letterSpacing: 0.5 },
  fullAddress: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
  },
  actionBtn: {},
  actionText: { fontSize: 14, fontWeight: '800', color: '#EF4444' },
  
  addNewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Theme.colors.primary,
    backgroundColor: 'rgba(0, 59, 149, 0.03)',
  },
  addNewText: { fontSize: 16, fontWeight: '900', color: Theme.colors.primary },
  
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerHint: { fontSize: 12, color: '#94A3B8', fontWeight: '600', textAlign: 'center' },
});
