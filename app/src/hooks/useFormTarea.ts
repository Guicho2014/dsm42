import { useReducer } from "react";
import { useTareaApi } from "./useTareaApi";
import { EstadoTarea } from "../interfaces/pandoraApiRest";

export interface FormTareaData {
  id_tarea:     number;
  titulo:       string;
  descripcion:  string;
  fecha_vencimiento: string;
  estado:       EstadoTarea;
}

interface UseFormTarea {
  state: FormTareaData;
  handleInputChange: ( fieldName: keyof FormTareaData, value: string | number ) => void;
  handleSubmit: () => void;
  handleDelete: () => void;
}

const initialForm: FormTareaData = {
  id_tarea:     0,
  titulo:       '',
  descripcion:  '',
  fecha_vencimiento: '',
  estado:       EstadoTarea.pendiente,
}

type Action = { type: 'handleInputChange', payload: { fieldName: keyof FormTareaData, value: string | number } };

const formReducer = (state: FormTareaData, action: Action) => {
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

export const useFormTarea = (): UseFormTarea => {

  const [ state, dispatch ] = useReducer( formReducer, initialForm );
  const { createTarea, updateTarea, deleteTarea } = useTareaApi();

  const handleInputChange = ( fieldName: keyof FormTareaData, value: string | number ) => {
    dispatch({ type: 'handleInputChange', payload:{ fieldName, value } });
  }

  const handleSubmit = () => {
    if ( state.titulo.trim().length < 3 ) {
      alert('El título debe tener al menos 3 caracteres');
      return;
    }
    if ( state.descripcion.trim().length < 5 ) {
      alert('La descripción debe tener al menos 5 caracteres');
      return;
    }

    const dataToSend = {
      ...state,
      titulo:      state.titulo.trim(),
      descripcion: state.descripcion.trim(),
    };

    if ( dataToSend.id_tarea === 0 ) {
      createTarea( dataToSend );
    } else {
      updateTarea( dataToSend );
    }
  }

  const handleDelete = () => deleteTarea(state);

  return { state, handleInputChange, handleSubmit, handleDelete };

}