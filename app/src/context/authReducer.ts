import { AuthState } from "./AuthContext";
import { UserRespose } from "../interfaces/pandoraApiRest";

type Actions = 
  | { type: 'singIn', payload: UserRespose }
  | { type: 'logout' };

export const authReducer = ( state: AuthState, action: Actions ) => {

  switch( action.type ){
    case 'singIn':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      }
    case 'logout':
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    default:
      return state;
  }

}