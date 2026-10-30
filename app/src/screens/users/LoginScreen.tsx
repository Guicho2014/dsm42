import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { useLogin } from '../../hooks/useLogin';
import { useImagePicker } from '../../hooks/useImagePicker';
import { useNavigation } from '@react-navigation/native';
import { loginTheme as style } from '../../theme/loginTheme';

export const LoginScreen = () => {
  const { 
    email, setEmail, 
    password, setPassword, 
    username, setUsername, 
    isLoading, error, 
    login, register, resetForm 
  } = useLogin();
  
  const { image64, pickImage } = useImagePicker();
  const navigation = useNavigation<any>();
  
  const [isLoginTab, setIsLoginTab] = useState(true);

  useEffect(() => {
    resetForm();
  }, [isLoginTab]);

  const handleAction = () => {
    if (isLoginTab) {
      login((user) => {
        navigation.replace('DrawerNavigator', { user }); 
      });
    } else {
      register(image64, () => {
        alert('¡Usuario creado exitosamente!'); 
        setIsLoginTab(true);
      });
    }
  };

  return (
    <ImageBackground 
      source={require('../../../assets/fondo.jpeg')}
      style={style.mainContainer}
      resizeMode="cover"
    >
      <View style={style.overlay}>
        <View style={style.darkSection}>
          
          <View style={style.tabsContainer}>
            <TouchableOpacity 
              style={[style.tab, isLoginTab && style.activeTab]}
              onPress={() => setIsLoginTab(true)}
            >
              <Text style={[style.tabText, isLoginTab && style.activeTabText]}>Iniciar Sesión</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[style.tab, !isLoginTab && style.activeTab]}
              onPress={() => setIsLoginTab(false)}
            >
              <Text style={[style.tabText, !isLoginTab && style.activeTabText]}>Registrarse</Text>
            </TouchableOpacity>
          </View>

          {error && <Text style={style.errorText}>{error}</Text>}

          <View style={style.formContainer}>
            {!isLoginTab && (
              <>
                <View style={style.inputContainer}>
                  <Text style={style.label}>Nombre de Usuario</Text>
                  <TextInput
                    style={style.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Ej. JuanPerez"
                    placeholderTextColor="#888"
                  />
                </View>

                <TouchableOpacity style={style.imagePickerBtn} onPress={pickImage}>
                  {image64 ? (
                    <Image source={{ uri: `data:image/png;base64,${image64}` }} style={style.avatar} />
                  ) : (
                    <Text style={style.imagePickerText}>+ Subir Foto</Text>
                  )}
                </TouchableOpacity>
              </>
            )}

            <View style={style.inputContainer}>
              <Text style={style.label}>Correo Electrónico</Text>
              <TextInput
                style={style.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                placeholder="correo@ejemplo.com"
                placeholderTextColor="#888"
              />
            </View>

            <View style={style.inputContainer}>
              <Text style={style.label}>Contraseña</Text>
              <TextInput
                style={style.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholder="********"
                placeholderTextColor="#888"
              />
            </View>
          </View>

          <TouchableOpacity 
            style={style.button} 
            onPress={handleAction}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#1A1A1A" />
            ) : (
              <Text style={style.buttonText}>{isLoginTab ? 'Iniciar Sesión' : 'Registrarse'}</Text>
            )}
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
};