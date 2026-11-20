import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ConfigContext } from '../context/ConfigContext';

export const ConfigScreen = ({ navigation }: any) => {
  const { ip, actualizarIP } = useContext(ConfigContext);
  const [nuevaIp, setNuevaIp] = useState(ip);

  const handleGuardar = () => {
    if (nuevaIp.trim() === '') {
      Alert.alert('Error', 'Ingresa una IP válida');
      return;
    }
    actualizarIP(nuevaIp.trim());
    Alert.alert('Éxito', 'IP actualizada.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Ajustes de Red</Text>
      <Text style={style.subtitle}>IP actual: {ip}</Text>

      <TextInput
        style={style.input}
        value={nuevaIp}
        onChangeText={setNuevaIp}
        placeholder="192.168.1.50"
        keyboardType="numbers-and-punctuation"
        placeholderTextColor="#64748b"
      />
      
      <TouchableOpacity style={style.button} onPress={handleGuardar}>
        <Text style={style.buttonText}>Guardar IP</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center', 
    backgroundColor: '#0f172a' 
  },
  title: { 
    fontSize: 24, 
    color: '#f1f5f9', 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#94a3b8', 
    marginBottom: 30 
  },
  input: { 
    backgroundColor: '#1e293b', 
    color: '#f1f5f9', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
    fontSize: 16
  },
  button: { 
    backgroundColor: '#3b82f6', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});