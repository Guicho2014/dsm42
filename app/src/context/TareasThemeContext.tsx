import { createContext, useContext, useState, ReactNode } from 'react';
import { tareasThemes, TareaThemeName } from '../theme/tareasThemes';

interface TareasThemeContextProps {
  themeName: TareaThemeName;
  theme: typeof tareasThemes.oscuro;
  setTheme: ( name: TareaThemeName ) => void;
}

const TareasThemeContext = createContext({} as TareasThemeContextProps);

export const TareasThemeProvider = ( { children }: { children: ReactNode } ) => {
  const [ themeName, setThemeName ] = useState<TareaThemeName>('oscuro');
  const theme = tareasThemes[ themeName ];

  return (
    <TareasThemeContext.Provider value={{ themeName, theme, setTheme: setThemeName }}>
      { children }
    </TareasThemeContext.Provider>
  );
}

export const useTareasTheme = () => useContext( TareasThemeContext );