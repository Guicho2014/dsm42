import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ListaReservas from './src/screens/ListaReservas';
import FormReservaScreen from './src/screens/FormReservaScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="ListaReservas"
          screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#2c3e50',
            headerTitleStyle: { fontWeight: 'bold' },
            drawerPosition: 'right',
            drawerStyle: { backgroundColor: '#1A1A1A', width: 240 },
            drawerActiveTintColor: '#3498db',
            drawerInactiveTintColor: '#fff',
          }}
        >
          <Drawer.Screen 
            name="ListaReservas" 
            component={ListaReservas} 
            options={{ title: 'Ver Reservas' }}
          />
          <Drawer.Screen 
            name="FormReservaScreen" 
            component={FormReservaScreen} 
            options={{ 
              title: 'Nueva Reserva',
              unmountOnBlur: true // 👈 Clave para que se limpie al salir
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}