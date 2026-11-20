import { ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigator } from "./src/navigator/DrawerNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { LoginScreen } from "./src/screens/users/LoginScreen";
import { ConfigProvider } from "./src/context/ConfigContext";
import { ConfigScreen } from "./src/screens/ConfigScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AppState>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen 
            name="DrawerNavigator" 
            component={DrawerNavigator} 
          />
          <Stack.Screen 
            name="ConfigScreen" 
            component={ConfigScreen} 
            options={{ 
              headerShown: true,
              title: 'Ajustes de Red',
              headerStyle: { backgroundColor: '#0f172a' }, 
              headerTintColor: '#f1f5f9',                 
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppState>
  );
}

const AppState = ( { children }: { children: ReactNode } ) => {
  return (
    <AuthProvider>
      <ConfigProvider>
        { children }
      </ConfigProvider>
    </AuthProvider>
  );
}

export default App;