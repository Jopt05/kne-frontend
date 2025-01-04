import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen'
import { AuthProvider } from "../context/AuthContext";
import { colors } from "@/constants/styles";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'Inter_Black': require('../assets/fonts/Inter_Bold.ttf'),
    'Inter_Regular': require('../assets/fonts/Inter_Regular.ttf'),
    'Inter_Light': require('../assets/fonts/Inter_Light.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
    <AppState>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.primary
        },
        statusBarBackgroundColor: colors.secondary
      }}>
      </Stack>
    </AppState>
  );
}

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
