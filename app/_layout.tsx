import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
    name="index"
    options={{
      title: "index",
      headerShown: false,
      animation: "none",
    }}/>
    <Stack.Screen
    name="conditions"
    options={{
      title: "Weather",
      headerBackButtonDisplayMode: "minimal",
      headerTitle: "",
      headerShown: false,
      animation: "fade"
      // headerTintColor: "green"
    }}/>
  </Stack>;
}
