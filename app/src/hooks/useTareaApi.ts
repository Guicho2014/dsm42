import { useEffect, useState, useContext } from "react";
import { pandoraApi } from "../api/pandoraApi";
import { TareaResponse } from "../interfaces/pandoraApiRest";
import { FormTareaData } from "./useFormTarea";
import { ConfigContext } from "../context/ConfigContext";

interface UseTareaApi {
  isLoading:   boolean;
  listTarea:   TareaResponse[];
  loadTareas:  () => void;
  createTarea: ( data: FormTareaData ) => void;
  updateTarea: ( data: FormTareaData ) => void;
  deleteTarea: ( data: FormTareaData ) => void;
}

export const useTareaApi = (): UseTareaApi => {
  const { ip } = useContext(ConfigContext);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ listTarea, setListTarea ] = useState<TareaResponse[]>([]);

  const loadTareas = async () => {
    setIsLoading(true);
    try {
      const response = await pandoraApi.get<TareaResponse[]>(`http://${ip}:3000/tareas`);
      setListTarea( response.data );
    } catch (error) {
      console.log('Error al cargar tareas:', error);
    }
    setIsLoading(false);
  }

  useEffect( () => {
    loadTareas();
  },[]);

  const createTarea = async ( data: FormTareaData ) => {
    const dataBody = {
      titulo:      data.titulo,
      descripcion: data.descripcion,
      estado:      data.estado,
      fecha_vencimiento: data.fecha_vencimiento,
    }
    try {
      await pandoraApi.post( `http://${ip}:3000/tareas`, dataBody );
      await loadTareas();
    } catch (error) {
      console.log('Error al crear tarea:', error);
    }
  }

  const updateTarea = async ( data: FormTareaData ) => {
    const dataBody = {
      titulo:      data.titulo,
      descripcion: data.descripcion,
      estado:      data.estado,
      fecha_vencimiento: data.fecha_vencimiento,
    }
    try {
      await pandoraApi.patch( `http://${ip}:3000/tareas/${data.id_tarea}`, dataBody );
      await loadTareas();
    } catch (error) {
      console.log('Error al actualizar tarea:', error);
    }
  }

  const deleteTarea = async ( data: FormTareaData ) => {
    try {
      await pandoraApi.delete( `http://${ip}:3000/tareas/${data.id_tarea}`);
      await loadTareas();
    } catch (error) {
      console.log('Error al eliminar tarea:', error);
    }
  }

  return { isLoading, listTarea, loadTareas, createTarea, updateTarea, deleteTarea };
}