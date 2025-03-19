import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
// import { LogtoProvider, LogtoConfig } from '@logto/rn';

// const config: LogtoConfig = {
//   endpoint: 'https://4np7nh.logto.app/',
//   appId: 'qt8hiwre1xga19k2qwjht',
// };


export default function RootLayout() {

  const [loaded, error] = useFonts({
    'Outfit': require('@/assets/fonts/Outfit-Regular.ttf'),
    'Outfit-bold': require('@/assets/fonts/Outfit-Bold.ttf'),
  });


  return (
    // <LogtoProvider config={config}>
      <Stack>
        <Stack.Screen name="landing"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    // </LogtoProvider>
  );
}
