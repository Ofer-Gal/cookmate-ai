import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { UserContext, RecipeContext } from "@/context/UserContext";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
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
    const[user, setUser] = useState(null);
    const [recipe, setRecipe] = useState(null);
  
  
  return (
    // <LogtoProvider config={config}>
    <UserContext.Provider value={{ user, setUser }}>
      <RecipeContext.Provider value={{ recipe, setRecipe }}>
      <Stack>
        <Stack.Screen name="landing"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="(tabs)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="recipe-by-category/index"
          options={{
            headerTransparent : true, headerTitle:''
          }}
        />
        <Stack.Screen name="recipe-detail/index"
          options={{
            headerTitle: 'Detail',
            headerRight: () => (
              <Ionicons name="share" size={24} color="black" />
            )
          }}
        />
        </Stack>
      </RecipeContext.Provider>
    </UserContext.Provider>
    // </LogtoProvider>
  );
}
