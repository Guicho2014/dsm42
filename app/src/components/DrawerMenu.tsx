import { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { DrawerContentScrollView, DrawerContentComponentProps } from "@react-navigation/drawer";
import { ConfigContext } from "../context/ConfigContext";
import { pandoraApi } from "../api/pandoraApi";

interface BtnProps {
  action: () => void;
  text:   string;
  isLogout?: boolean;
}

const BtnMenu = ( { action, text, isLogout }:BtnProps ) => {
  return (
    <TouchableOpacity onPress={ action }>
      <View style={[ 
        style.textBg, 
        isLogout && { backgroundColor: '#FFE4E1', borderColor: '#EF4444' } 
      ]}>
        <Text style={[ 
          style.text, 
          isLogout && { color: '#EF4444' } 
        ]}>
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

  const { ip } = useContext(ConfigContext);

  const handleLogout = () => {
    navigation.getParent()?.navigate('Login');
  };

  const deleteAccount = async () => {
    try {
      await pandoraApi.delete(`http://${ip}:3000/users/${user.id_user}`);
      Alert.alert('Cuenta eliminada', 'Tu cuenta y tus datos fueron eliminados.');
      navigation.getParent()?.navigate('Login');
    } catch {
      Alert.alert(
        'No se pudo eliminar',
        'Verifica tu conexión con el servidor e inténtalo de nuevo.'
      );
    }
  };

  const handleDeleteAccount = () => {
    if (!user?.id_user) return;
    Alert.alert(
      'Eliminar mi cuenta',
      'Se borrarán tu cuenta y tus datos (nombre de usuario, correo, contraseña y foto). Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: deleteAccount },
      ]
    );
  };

  // Los usuarios sin foto se guardan con la cadena 'default'.
  const hasPhoto = !!user?.image && user.image !== 'default';
  const imageSource = hasPhoto
    ? { uri: `data:image/png;base64,${user.image}` }
    : require('../../assets/default-avatar.png');

  return (
    <DrawerContentScrollView 
      contentContainerStyle={style.scrollContainer}
    >
      <View style={style.container}>
        <View style={style.avatarBorder}>
          <Image style={style.avatar} source={imageSource} />
        </View>
        
        <Text style={style.username}>
          { user?.username || 'Usuario' }
        </Text>
        
        <View style={style.container}>
          <BtnMenu text="Pokedex" action={ () => navigation.navigate('PokemonNavigator') } />
          <BtnMenu text="Palitos y bolitas" action={ () => navigation.navigate('StackNavigator') } />
          <BtnMenu text="Formulario" action={ () => navigation.navigate('FormScreen') } />
          <BtnMenu text="ImagePickerScreen" action={ () => navigation.navigate('ImagePickerScreen') } />
          <BtnMenu text="Localización" action={ () => navigation.navigate('LocationScreen') } />
          <BtnMenu text="Gestión de Usuarios" action={ () => navigation.navigate('UserStackNavigator') } />
          <BtnMenu text="Tareas" action={ () => navigation.navigate('TareaStackNavigator') } />
          <BtnMenu text="Monitor Sensor" action={ () => navigation.navigate('DataResponseScreen') } />
          <BtnMenu text="Empleados" action={ () => navigation.navigate('EmpleadosScreen') } />
          <BtnMenu text="Ajustes de Red" action={ () => navigation.navigate('ConfigScreen') } />
        </View>
      </View>

      <View style={style.logoutContainer}>
        <BtnMenu text="Cerrar Sesión" action={ handleLogout } isLogout={true} />
        { !!user?.id_user && (
          <BtnMenu text="Eliminar mi cuenta" action={ handleDeleteAccount } isLogout={true} />
        )}
      </View>
    </DrawerContentScrollView>
  );
}

const style = StyleSheet.create({
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: 'space-between', 
    paddingBottom: 20 
  },
  container: { 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  textBg: { 
    backgroundColor: 'white', 
    borderColor: 'violet', 
    borderRadius: 10, 
    borderWidth: 5, 
    marginTop: 10, 
    width: 240 
  },
  text: { 
    color: "black", 
    fontSize: 20, 
    textAlign: 'center',
    paddingVertical: 5 
  },
  avatar: { 
    borderColor: 'gray', 
    borderRadius: 100, 
    borderWidth: 10, 
    height: 120, 
    width: 120 
  },
  avatarBorder: { 
    borderColor: 'white', 
    borderRadius: 100, 
    borderWidth: 10, 
    height: 140, 
    width: 140,
    marginTop: 10
  },
  username: { 
    fontSize: 30, 
    color: "white", 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  logoutContainer: {
    marginTop: 20, 
    alignItems: 'center'
  }
});