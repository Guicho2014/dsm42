import { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ConfigContextProps {
  ip: string;
  ipGuardada: boolean;
  actualizarIP: (nuevaIP: string) => void;
}

const IP_DEFAULT = '192.168.100.139';
const STORAGE_KEY = '@dsm42/servidor_ip';

export const ConfigContext = createContext({} as ConfigContextProps);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [ip, setIp] = useState(IP_DEFAULT);
  const [ipGuardada, setIpGuardada] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const guardada = await AsyncStorage.getItem(STORAGE_KEY);
        if (guardada && guardada.trim().length > 0) {
          setIp(guardada);
          setIpGuardada(true);
        }
      } catch (e) {
        console.warn('No se pudo leer la IP guardada:', e);
      }
    })();
  }, []);

  const actualizarIP = useCallback((nuevaIP: string) => {
    const limpia = nuevaIP.trim();
    setIp(limpia);
    setIpGuardada(true);
    AsyncStorage.setItem(STORAGE_KEY, limpia).catch((e) =>
      console.warn('No se pudo guardar la IP:', e)
    );
  }, []);

  return (
    <ConfigContext.Provider value={{ ip, ipGuardada, actualizarIP }}>
      {children}
    </ConfigContext.Provider>
  );
};