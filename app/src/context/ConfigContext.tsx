import { createContext, useState, ReactNode } from 'react';

interface ConfigContextProps {
  ip: string;
  actualizarIP: (nuevaIP: string) => void;
}

const IP_DEFAULT = '192.168.100.139';

export const ConfigContext = createContext({} as ConfigContextProps);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [ip, setIp] = useState(IP_DEFAULT);

  const actualizarIP = (nuevaIP: string) => {
    setIp(nuevaIP);
  };

  return (
    <ConfigContext.Provider value={{ ip, actualizarIP }}>
      {children}
    </ConfigContext.Provider>
  );
};