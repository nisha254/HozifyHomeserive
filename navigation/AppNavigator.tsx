import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useStore } from '../store/useStore';

// Screen Imports
import { TabNavigator } from './TabNavigator';
import { SplashScreen } from '../screens/Splash';
import { OnboardingScreen } from '../screens/Onboarding';
import { LoginScreen } from '../screens/Login';
import { SignUpScreen } from '../screens/SignUp';
import { LocationSetupScreen } from '../screens/LocationSetup';
import { ProfileSetupScreen } from '../screens/ProfileSetup';
import { AreaSelectionScreen } from '../screens/AreaSelection';
import { FavouritesScreen } from '../screens/FavouritesScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { ServiceListingScreen } from '../screens/ServiceListing';
import { AllServicesScreen } from '../screens/AllServices';
import { CartScreen } from '../screens/Cart';
import { SlotSelectionScreen } from '../screens/SlotSelection';
import { AddressFormScreen } from '../screens/AddressForm';
import { PaymentScreen } from '../screens/Payment';
import { BookingSummaryScreen } from '../screens/BookingSummary';
import { EditProfileScreen } from '../screens/EditProfile';
import { AddressManagementScreen } from '../screens/AddressManagement';
import { BookingConfirmationScreen } from '../screens/BookingConfirmation';
import { BookingTrackingScreen } from '../screens/BookingTracking';
import { OTPVerificationScreen } from '../screens/OTPVerification';
import { SOSScreen } from '../screens/SOS';
import { ReferralScreen } from '../screens/Referral';
import { SearchScreen } from '../screens/SearchScreen';
import { CategoryListScreen } from '../screens/CategoryListScreen';
import { SubcategoryScreen } from '../screens/SubcategoryScreen';
import { ServiceDetailScreen } from '../screens/ServiceDetail';
import { NotificationScreen } from '../screens/NotificationScreen';
import { BookmarkScreen } from '../screens/BookmarkScreen';
import { ProvidersListScreen } from '../screens/ProvidersListScreen';
import { CategoryProvidersScreen } from '../screens/CategoryProvidersScreen';
import { HelpScreen } from '../screens/Help';
import { WalletScreen } from '../screens/Wallet';
import { BookingsScreen } from '../screens/Bookings';
import { SettingsScreen } from '../screens/Settings';
import { RewardsScreen } from '../screens/Rewards';
import { RatingScreen } from '../screens/RatingScreen';
import { CoinsScreen } from "../screens/CoinsScreen";
import { PreferencesScreen } from '../screens/Preferences';
import { ReferralGenerated } from '../screens/ReferralGenerated';
import { InfluencerStatus } from '../screens/InfluencerStatus';
const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { isAuthenticated, user, location, hasCompletedOnboarding } = useStore();
  const [isSplashDone, setIsSplashDone] = React.useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        {!isSplashDone ? (
          <Stack.Screen name="Splash">
            {(props) => <SplashScreen {...props} onFinish={() => setIsSplashDone(true)} />}
          </Stack.Screen>
        ) : (
          <>
            {!hasCompletedOnboarding ? (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
              </>
              // <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            ) : !isAuthenticated ? (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
              </>
            ) : !user?.firstName ? (
              <>
                <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
                <Stack.Screen name="Referral" component={ReferralScreen} />
              </>
            ) : !location?.areaType ? (
              <Stack.Screen name="AreaSelection" component={AreaSelectionScreen} />
            ) : (
              <>
                <Stack.Screen name="Main" component={TabNavigator} />
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="ServiceListing" component={ServiceListingScreen} />
                <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
                <Stack.Screen name="AllServices" component={AllServicesScreen} options={{ presentation: 'modal' }} />
                <Stack.Screen name="CategoryListScreen" component={CategoryListScreen} />
                <Stack.Screen name="SubcategoryScreen" component={SubcategoryScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="SlotSelection" component={SlotSelectionScreen} />
                <Stack.Screen name="BookingSummary" component={BookingSummaryScreen} />
                <Stack.Screen name="AddressManagement" component={AddressManagementScreen} />
                <Stack.Screen name="AddressForm" component={AddressFormScreen} />
                <Stack.Screen name="Payment" component={PaymentScreen} />
                <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
                <Stack.Screen name="BookingTracking" component={BookingTrackingScreen} />
                <Stack.Screen name="Rating" component={RatingScreen} />
                <Stack.Screen name="SOS" component={SOSScreen} />
                <Stack.Screen name="Referral" component={ReferralScreen} />
                <Stack.Screen name="ReferralGenerated" component={ReferralGenerated} />
                <Stack.Screen name="InfluencerStatus" component={InfluencerStatus} />
                <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
                <Stack.Screen name="BookmarkScreen" component={BookmarkScreen} />
                <Stack.Screen name="ProvidersListScreen" component={ProvidersListScreen} />
                <Stack.Screen name="CategoryProvidersScreen" component={CategoryProvidersScreen} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                <Stack.Screen name="Wallet" component={WalletScreen} />
                <Stack.Screen name="Bookings" component={BookingsScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Favourites" component={FavouritesScreen} />
                <Stack.Screen name="About" component={AboutScreen} />
                <Stack.Screen name="Rewards" component={RewardsScreen} />
                <Stack.Screen name="Coins" component={CoinsScreen} />
                <Stack.Screen name="Preferences" component={PreferencesScreen} />
              </>
            )}
            <Stack.Screen name="Help" component={HelpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

