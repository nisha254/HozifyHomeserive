import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image, Dimensions } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { Theme } from '../constants/Theme';
import { MuiHeader } from '../components/MuiHeader';
import { CATEGORIES } from '../constants/Categories';
import { LucideIcon } from '../components/LucideIcon';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48 - 32) / 3;

export const CategoryListScreen = ({ navigation }: any) => {

  const renderCategoryItem = (item: any) => {
    const mainItem = item.sections[0]?.items[0];
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.categoryItem}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('SubcategoryScreen', { category: item })}
      >
        <Surface style={styles.iconSurface} elevation={0}>
          {(mainItem?.image || mainItem?.localIcon) ? (
            <Image 
              source={typeof (mainItem.image || mainItem.localIcon) === 'string' ? { uri: (mainItem.image || mainItem.localIcon) } : (mainItem.image || mainItem.localIcon)} 
              style={styles.catImg} 
            />
          ) : (
            <LucideIcon
              name={mainItem?.icon as any || 'HelpCircle'}
              size={32}
              color={Theme.colors.primary}
              strokeWidth={1.5}
            />
          )}
        </Surface>
        <Text style={styles.catLabel} numberOfLines={2}>{item.title.split(' ')[0]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <MuiHeader
        title="All Services"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {CATEGORIES.map(renderCategoryItem)}
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingVertical: 24, paddingHorizontal: 24 },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 16,
  },
  categoryItem: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    marginBottom: 24,
  },
  iconSurface: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  catLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 18,
  },
  catImg: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  bottomSpace: { height: 100 },
});
