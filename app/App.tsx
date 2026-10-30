import { ReactNode } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigator } from "./src/navigator/DrawerNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { LoginScreen } from "./src/screens/users/LoginScreen";

LogBox.ignoreLogs([
  'Non-serializable values were found',
  'Each child in a list should have a unique "key" prop',
]);

const Stack = createStackNavigator();

const App = () => {
  return (
    <AppState>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* La app arranca aquí: el Login */}
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* Si el login es exitoso, replace() nos manda al Drawer (y este a Tareas) */}
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppState>
  );
}

const AppState = ( { children }: { children: ReactNode } ) => {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  );
}

export default App;