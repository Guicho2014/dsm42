import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface Props {
  image64: string | null;
  onChange: (base64: string) => void;
  label: string;
}

export const ImagePickerSection = ({ image64, onChange, label }: Props) => {

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Se necesitan permisos para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      onChange(result.assets[0].base64);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imagePickerBtn} onPress={pickImage}>
        {image64 ? (
          <Image source={{ uri: `data:image/png;base64,${image64}` }} style={styles.avatar} />
        ) : (
          <Text style={styles.imagePickerText}>{label}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 15 },
  imagePickerBtn: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#2A2A2A', width: 100, height: 100, borderRadius: 10, overflow: 'hidden', borderWidth: 2, borderColor: '#3498db' },
  imagePickerText: { color: '#fff', fontSize: 12, textAlign: 'center' },
  avatar: { width: 100, height: 100 },
});