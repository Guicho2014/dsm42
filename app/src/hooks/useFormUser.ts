import { useReducer } from "react";
import { useUserApi } from "./useUserApi";

export interface FormUserData {
  id_user:    number;
  username:   string;
  email:      string;
  password:   string;
  image:      string;
  location:   string;
}

interface UseFormUser {
  state: FormUserData;
  handleInputChange: ( fieldName: keyof FormUserData, value: string | number ) => void;
  handleSubmit: () => void;
  handleDelete: () => void;
}

const initialForm: FormUserData = {
  id_user:    0,
  username:   '',
  email:      '',
  password:   '',
  image:      '',
  location:   ''
}

type Action = { type: 'handleInputChange', payload: { fieldName: keyof FormUserData, value: string | number } };

const formReducer = (state: FormUserData, action: Action) => {
  switch( action.type ){
    case 'handleInputChange':
      return {
        ...state,
        [ action.payload.fieldName ] : action.payload.value
      }
    default:
      return state;
  }
}

export const useFormUser = (): UseFormUser => {

  const [ state, dispatch ] = useReducer( formReducer, initialForm);
  const { createUser, updateUser, deleteUser } = useUserApi();

  const handleInputChange = ( fieldName: keyof FormUserData, value: string | number ) => {
    const preview = typeof value === 'string' ? value.substring(0, 30) : value;
    console.log(`handleInputChange: ${fieldName} = ${preview}${typeof value === 'string' && value.length > 30 ? '...' : ''}`);
    dispatch({ type: 'handleInputChange', payload:{ fieldName, value } });
  }

  const handleSubmit = () => {
    console.log('Enviando al backend:', JSON.stringify({
      ...state,
      image: state.image ? `[${state.image.length} chars]` : '(vacío)'
    }, null, 2));

    if( state.id_user == 0 ){
      createUser( state );
    }else {
      updateUser( state );
    }
  }

  const handleDelete = () => deleteUser(state);

  return { state, handleInputChange, handleSubmit, handleDelete };

}