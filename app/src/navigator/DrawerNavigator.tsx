import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackNavigator } from "./StackNavigator";
import { DrawerMenu } from "../components/DrawerMenu";
import { FormScreen } from "../screens/FormScreen";
import { ImagePickerScreen } from "../screens/ImagePickerScreen";
import { LocationScreen } from "../screens/LocationScreen";
import { PokemonNavigator } from "./PokemonNavigator";
import { useWindowDimensions } from "react-native";
import { UserStackNavigator } from "./UserStackNavigator";
import { TareaStackNavigator } from "./TareaStackNavigator";
import { DataResponseScreen } from "../screens/DataResponseScreen"; 
import { EmpleadosScreen } from "../screens/empleados/EmpleadosScreen";
import { ListaEmpleadosScreen } from "../screens/empleados/ListaEmpleadosScreen";
import { ConfigScreen } from "../screens/ConfigScreen"; 

export type RootDrawerParams = {
  FormScreen:           undefined;
  ImagePickerScreen:    undefined;
  LocationScreen:       undefined;
  PokemonNavigator:     undefined;
  StackNavigator:       undefined;
  UserStackNavigator:   undefined;
  TareaStackNavigator:  undefined;
  DataResponseScreen:   undefined; 
  EmpleadosScreen:      undefined;
  ListaEmpleadosScreen: { tipo: 'tecnologia' | 'contratados-2022' } | undefined;
  ConfigScreen:         undefined; 
}

const Drawer = createDrawerNavigator<RootDrawerParams>();

export const DrawerNavigator = ({route}:any) => {

  const { width } = useWindowDimensions();
  const user = route.params?.user;
  
  return (
    <Drawer.Navigator
      initialRouteName='TareaStackNavigator' 
      screenOptions={{
        headerShown: true,
        drawerType: width > 720 ? 'permanent': 'front',
        drawerPosition: 'right',
        overlayColor: 'rgba(157,0,255,0.6)',
        drawerStyle: {
          backgroundColor: 'rgba(0,0,0,0.9)',
          width: width * 0.7
        }
      }}
      drawerContent={ (props) => <DrawerMenu {...props} user={user}/> }
    >
      <Drawer.Screen name='TareaStackNavigator' component={TareaStackNavigator} />
      
      <Drawer.Screen 
        name='DataResponseScreen' 
        component={DataResponseScreen} 
        options={{ 
          title: 'Monitor Sensor',
          headerStyle: { backgroundColor: '#0f172a' }, 
          headerTintColor: '#f1f5f9',                 
        }} 
      />

      <Drawer.Screen 
        name='EmpleadosScreen' 
        component={EmpleadosScreen} 
        options={{ 
          title: 'Monitor Empleados',
          headerStyle: { backgroundColor: '#0f172a' }, 
          headerTintColor: '#f1f5f9',                 
        }} 
      />

      <Drawer.Screen 
        name='ListaEmpleadosScreen' 
        component={ListaEmpleadosScreen} 
        options={{ 
          title: 'Lista Empleados',
          headerStyle: { backgroundColor: '#0f172a' }, 
          headerTintColor: '#f1f5f9',                 
        }} 
      />

      <Drawer.Screen 
        name='ConfigScreen' 
        component={ConfigScreen} 
        options={{ 
          title: 'Ajustes de Red',
          headerStyle: { backgroundColor: '#0f172a' }, 
          headerTintColor: '#f1f5f9',                 
        }} 
      />

      <Drawer.Screen name='StackNavigator' component={StackNavigator} />
      <Drawer.Screen name='PokemonNavigator' component={PokemonNavigator} />
      <Drawer.Screen name='FormScreen' component={FormScreen} />
      <Drawer.Screen name='ImagePickerScreen' component={ImagePickerScreen} />
      <Drawer.Screen name='LocationScreen' component={LocationScreen} />
      <Drawer.Screen name='UserStackNavigator' component={UserStackNavigator} />
    </Drawer.Navigator>
  );
}