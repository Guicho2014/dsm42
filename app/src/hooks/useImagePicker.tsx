import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

interface UseImagePicker {
  image64: string | null;
  pickImage: () => void;
}

export const useImagePicker = (): UseImagePicker => {

  const [ image64, setImage64 ] = useState<string | null>(null);

  const pickImage = async () => {

  
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permisos requeridos",
        "Se requieren permisos para usar la galería",
        [{ text: "Aceptar" }]
      );
      return;
    }

    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      base64: true,          
    });

    if (!result.canceled && result.assets[0].base64) {
      setImage64(result.assets[0].base64);
      console.log('Imagen cargada, tamaño base64:', result.assets[0].base64.length);
    } else {
      console.log('No se obtuvo base64 de la imagen');
    }
  };

  return { image64, pickImage };
};