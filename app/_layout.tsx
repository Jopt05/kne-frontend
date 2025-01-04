import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AppState>
      <Stack screenOptions={{
        headerShown: false,
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
