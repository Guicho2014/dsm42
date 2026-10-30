import { useState } from 'react';
import { pandoraApi } from '../api/pandoraApi';
import { UserRespose } from '../interfaces/pandoraApiRest';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const urlLogin = "http://192.168.7.6:3000/users/login";
  const urlRegister = "http://192.168.7.6:3000/users";

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setError(null);
  };

  const login = async (onSuccess: (user: UserRespose) => void) => {
    if (!email || !password) {
      setError('Por favor, llena todos los campos');
      return;
    }
    setIsLoading(true);
    setError(null);

    console.log('Datos que viajan al backend:', { email, password });

    try {
      const response = await pandoraApi.post<UserRespose | false>(urlLogin, { email, password });
      if (response.data) {
        onSuccess(response.data);
      } else {
        setError('Correo o contraseña incorrectos');
      }
    } catch (err: any) {
      setError('Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (image64: string | null, onSuccess: () => void) => {
    if (!email || !password || !username) {
      setError('Por favor, llena todos los campos');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      await pandoraApi.post(urlRegister, {
        username,
        email,
        password,
        location: 'Ubicación por defecto',
        image: image64 || 'default'
      });
      onSuccess();
    } catch (err: any) {
      console.log(err);
      setError('Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    email, setEmail, 
    password, setPassword, 
    username, setUsername,
    isLoading, error, 
    login, register, resetForm 
  };
};