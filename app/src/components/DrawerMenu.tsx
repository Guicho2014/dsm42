import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerContentComponentProps } from "@react-navigation/drawer";

interface BtnProps {
  action: () => void;
  text:   string;
  isLogout?: boolean;
}

const BtnMenu = ( { action, text, isLogout }:BtnProps ) => {
  return (
    <TouchableOpacity onPress={ action }>
      <View style={[ style.textBg, isLogout && { backgroundColor: '#FFE4E1', borderColor: '#EF4444' } ]}>
        <Text style={[ style.text, isLogout && { color: '#EF4444' } ]}>
          { text }
        </Text>
      </View>
    </TouchableOpacity>
  );
}

interface Props extends DrawerContentComponentProps {
  user?: any;
}

export const DrawerMenu = ( { navigation, user }: Props ) => {

  const handleLogout = () => {
    navigation.getParent()?.navigate('Login');
  };

  const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkeEo_JMBF7RZeBZEZdlDMuV7Eyp6Xt1YlNGG0UrUWhyys3bmgGb9SIUs&s=10';
  const imageUri = user?.image ? `data:image/png;base64,${user.image}` : defaultImage;

  return (
    <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={ style.container }>
        <View style={ style.avatarBorder }>
          <Image style={ style.avatar } source={{ uri: imageUri }} />
        </View>
        <Text style={ style.username }>
          { user?.username || 'Usuario' }
        </Text>
        
        <View style={ style.container }>
          <BtnMenu text="Pokedex" action={ () => navigation.navigate('PokemonNavigator') } />
          <BtnMenu text="Palitos y bolitas" action={ () => navigation.navigate('StackNavigator') } />
          <BtnMenu text="Formulario" action={ () => navigation.navigate('FormScreen') } />
          <BtnMenu text="ImagePickerScreen" action={ () => navigation.navigate('ImagePickerScreen') } />
          <BtnMenu text="Localización" action={ () => navigation.navigate('LocationScreen') } />
          <BtnMenu text="Gestión de Usuarios" action={ () => navigation.navigate('UserStackNavigator') } />
          <BtnMenu text="Tareas" action={ () => navigation.navigate('TareaStackNavigator') } />
        </View>
      </View>

      <View style={{ flex: 1 }} />

      <View style={{ paddingBottom: 20, alignItems: 'center' }}>
        <BtnMenu text="Cerrar Sesión" action={ handleLogout } isLogout={true} />
      </View>
    </DrawerContentScrollView>
  );
}

const style = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  textBg: { backgroundColor: 'white', borderColor: 'violet', borderRadius: 10, borderWidth: 5, marginTop: 10, width: 240 },
  text: { color: "black", fontSize: 25, textAlign: 'center' },
  avatar: { borderColor: 'gray', borderRadius: 100, borderWidth: 10, height: 180, width: 180 },
  avatarBorder: { borderColor: 'white', borderRadius: 100, borderWidth: 10, height: 200, width: 200 },
  username: { fontSize: 40, color: "white", fontWeight: 'bold', marginBottom: 20 }
});