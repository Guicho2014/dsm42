import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

interface UseImagePicker {
  image64: string | null;
  pickImage: () => void;
}

export const useImagePicker = (): UseImagePicker => {

  const [ image64, setImage64 ] = useState<string | null>(null);

  const pickImage = async () => {

    // El selector de fotos del sistema no necesita permisos de galería.
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setImage64(result.assets[0].base64);
    }
  };

  return { image64, pickImage };
};