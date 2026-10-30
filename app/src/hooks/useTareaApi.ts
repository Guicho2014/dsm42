import { useEffect, useState } from "react";
import { pandoraApi } from "../api/pandoraApi";
import { TareaResponse } from "../interfaces/pandoraApiRest";
import { FormTareaData } from "./useFormTarea";

interface UseTareaApi {
  isLoading:   boolean;
  listTarea:   TareaResponse[];
  loadTareas:  () => void;
  createTarea: ( data: FormTareaData ) => void;
  updateTarea: ( data: FormTareaData ) => void;
  deleteTarea: ( data: FormTareaData ) => void;
}

export const useTareaApi = (): UseTareaApi => {

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ listTarea, setListTarea ] = useState<TareaResponse[]>([]);
  const urlApi = "http://192.168.7.6:3000/tareas"; // Verifica tu IP aquí

  const loadTareas = async () => {
    setIsLoading(true);
    try {
      const response = await pandoraApi.get<TareaResponse[]>( urlApi );
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
      fecha_vencimiento: data.fecha_vencimiento, // 👈 AGREGADO AQUÍ
    }
    try {
      await pandoraApi.post( urlApi, dataBody );
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
      fecha_vencimiento: data.fecha_vencimiento, // 👈 AGREGADO AQUÍ
    }
    try {
      await pandoraApi.patch( `${urlApi}/${data.id_tarea}`, dataBody );
      await loadTareas();
    } catch (error) {
      console.log('Error al actualizar tarea:', error);
    }
  }

  const deleteTarea = async ( data: FormTareaData ) => {
    try {
      await pandoraApi.delete( `${urlApi}/${data.id_tarea}`);
      await loadTareas();
    } catch (error) {
      console.log('Error al eliminar tarea:', error);
    }
  }

  return { isLoading, listTarea, loadTareas, createTarea, updateTarea, deleteTarea };
}