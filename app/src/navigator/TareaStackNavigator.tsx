import { createStackNavigator } from "@react-navigation/stack";
import { HomeTarea } from "../screens/tareas/HomeTarea";
import { FormTarea } from "../screens/tareas/FormTarea";
import { TareaResponse } from "../interfaces/pandoraApiRest";
import { TareasThemeProvider } from "../context/TareasThemeContext";

export type TareaStackParams = {
  HomeTarea: undefined;
  FormTarea: TareaResponse;
}

const Stack = createStackNavigator<TareaStackParams>();

export const TareaStackNavigator = () => {
  return(
    <TareasThemeProvider>
      <Stack.Navigator
        initialRouteName="HomeTarea"
        screenOptions={{
          headerMode: 'float',
          headerShown: false
        }}
      >
        <Stack.Screen name="HomeTarea" component={HomeTarea} />
        <Stack.Screen name="FormTarea" component={FormTarea} />
      </Stack.Navigator>
    </TareasThemeProvider>
  );
}