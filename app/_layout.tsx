import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { colors } from "@/constants/styles";

export default function RootLayout() {
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
