import { createContext, useReducer, ReactNode } from "react";
import { authReducer } from "./authReducer";
import { UserRespose } from "../interfaces/pandoraApiRest";

export interface AuthState {
  isLoggedIn: boolean;
  user: UserRespose | null;
}

export const AuthInicialState: AuthState = {
  isLoggedIn: false,
  user: null
}

export interface AuthContextProps {
  authState: AuthState;
  singIn: (user: UserRespose) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ( { children }: { children: ReactNode } ) => {

  const [ authState, dispatch ] = useReducer( authReducer, AuthInicialState );

  const singIn = (user: UserRespose) => dispatch({ type: 'singIn', payload: user });
  const logout = () => dispatch({ type: 'logout' });

  return (
    <AuthContext.Provider
      value={{
        authState,
        singIn,
        logout
      }}
    >
      { children }
    </AuthContext.Provider>
  );

}