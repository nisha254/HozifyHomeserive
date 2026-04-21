import { AppNavigator } from './navigation/AppNavigator';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { Theme } from './constants/Theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Theme.colors.primary,
    secondary: Theme.colors.secondary,
    error: Theme.colors.status.error,
    background: Theme.colors.background,
    surface: Theme.colors.surface,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
